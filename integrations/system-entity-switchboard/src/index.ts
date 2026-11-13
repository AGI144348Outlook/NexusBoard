import { DurableObject } from "cloudflare:workers";
import { neon } from "@neondatabase/serverless";
import {
  bearerAuthorized,clampLimit,evidenceProjection,makePairMatrix,
  MCP_VERSION,permittedMcpTools,routeEligible,validateId,
} from "./core.mjs";

/** Bootstrap-owner-only; replace with OAuth and per-seat service principals before production. */
interface Env {
  SYSTEM_ENTITY: DurableObjectNamespace<SystemEntity>;
  CORPORATE_AGENT: DurableObjectNamespace<CorporateAgent>;
  NEXUS_DATABASE_URL: string;
  NEXUS_OPERATOR_TOKEN: string;
  NEXUS_ENTITY_ID: string;
  NEXUS_ALLOWED_ORIGINS?: string;
}
type Row = Record<string, any>;
function json(data: unknown, status=200): Response {
  return new Response(JSON.stringify(data),{
    status,headers:{"content-type":"application/json; charset=utf-8","cache-control":"no-store",
      "x-content-type-options":"nosniff"},
  });
}
function sqlClient(env:Env) {
  if (!env.NEXUS_DATABASE_URL) throw new Error("Neon backend not configured");
  return neon(env.NEXUS_DATABASE_URL);
}
async function query(env:Env, statement:string, values:unknown[]=[]):Promise<Row[]> {
  const sql=sqlClient(env);
  // Fixed, positional statements only. Untrusted callers cannot submit SQL.
  return await sql(statement, values) as Row[];
}
function bodyObject(x:unknown):Record<string,any> {
  if(!x||typeof x!=="object"||Array.isArray(x)) throw new Error("Expected JSON object");
  return x as Record<string,any>;
}
function identityStub(env:Env) {
  const id=env.SYSTEM_ENTITY.idFromName("system:"+validateId(env.NEXUS_ENTITY_ID||"nexusboard"));
  return env.SYSTEM_ENTITY.get(id);
}
async function internal(stub:DurableObjectStub,endpoint:string,payload?:unknown) {
  const response=await stub.fetch(new Request("https://internal"+endpoint,{
    method:payload===undefined?"GET":"POST",
    headers:{"content-type":"application/json"},
    body:payload===undefined?undefined:JSON.stringify(payload),
  }));
  const data=await response.json() as Row;
  if(!response.ok) throw new Error(data.error??"Durable Object request failed");
  return data;
}
async function queryGraph(env:Env,args:Record<string,any>) {
  const nodeId=validateId(args.node_id,"node ID");
  const limit=clampLimit(args.limit,120);
  const root=await query(env,"SELECT node_id,node_kind,label,details,attribution_ref,evidence_state FROM evidence_net.nodes WHERE node_id=$1",[nodeId]);
  if(!root.length) throw new Error("Evidence node does not exist");
  const edges=await query(env,
    "SELECT edge_id,source_node,target_node,relation_type,relation_domain,evidence_state, supporting_card_id,supporting_card_revision,source_ref FROM evidence_net.edges WHERE source_node=$1 OR target_node=$1 ORDER BY recorded_at,edge_id LIMIT $2",
    [nodeId,limit]);
  const ids=Array.from(new Set([nodeId,...edges.flatMap(e=>[e.source_node,e.target_node])]));
  const nodes=await query(env,
    "SELECT node_id,node_kind,label,details,attribution_ref,evidence_state FROM evidence_net.nodes WHERE node_id=ANY($1::text[]) ORDER BY node_id",
    [ids]);
  const cardIds=Array.from(new Set(edges.map(e=>e.supporting_card_id).filter(Boolean)));
  const cards=cardIds.length?
    await query(env,
      "SELECT card_id,revision,title,body,provenance,review_state FROM card_protocol.card_revisions WHERE card_id=ANY($1::text[]) ORDER BY card_id,revision LIMIT 100",
      [cardIds]):[];
  return evidenceProjection(nodes,edges,cards,"neon:"+nodeId);
}
async function queryMatrix(env:Env) {
  const [apps,protocols,positions,agents,authority]=await Promise.all([
    query(env,"SELECT app_id,label,kind,lifecycle,notes FROM switchboard.apps ORDER BY label"),
    query(env,"SELECT protocol_id,from_app,to_app,title,effect_class,steps,status,auth_policy,version FROM switchboard.protocols ORDER BY protocol_id"),
    query(env,"SELECT id,title,node_id,reports_to FROM nb.positions ORDER BY title"),
    query(env,"SELECT id,label,engine FROM nb.agents ORDER BY label"),
    query(env,"SELECT parent_id,child_id,tool FROM nb.authority ORDER BY parent_id,child_id LIMIT 500"),
  ]);
  return {applications:makePairMatrix(apps,protocols),
    corporate:{positions,registered_agents:agents,authority_edges:authority,
      warning:"A position is not necessarily a running Agent Durable Object; unregistered seats are not callable."},
    source:"Existing NexusBoard Neon development records; no claim of deployed connections"};
}
async function readCatalog(env:Env,args:Record<string,any>) {
  const cardId=validateId(args.card_id,"card ID");
  let rows:Row[];
  if(args.revision!==undefined){
    const rev=Number(args.revision);
    if(!Number.isSafeInteger(rev)||rev<1) throw new Error("Invalid revision");
    rows=await query(env,
      "SELECT card_id,revision,card_kind,title,body,provenance,review_state FROM card_protocol.card_revisions WHERE card_id=$1 AND revision=$2 LIMIT 1",
      [cardId,rev]);
  } else {
    rows=await query(env,
      "SELECT card_id,revision,card_kind,title,body,provenance,review_state FROM card_protocol.card_revisions WHERE card_id=$1 ORDER BY revision DESC LIMIT 1",
      [cardId]);
  }
  if(!rows.length) throw new Error("Catalog card revision not found");
  return {record:rows[0],source:"Neon card_protocol.card_revisions"};
}
async function agentStub(env:Env,agentId:string){
  const id=validateId(agentId,"registered agent");
  const registered=await query(env,"SELECT id,label,engine FROM nb.agents WHERE id=$1 LIMIT 1",[id]);
  if(!registered.length) throw new Error("Agent not registered in authoritative Neon nb.agents");
  return {stub:env.CORPORATE_AGENT.get(env.CORPORATE_AGENT.idFromName("agent:"+id)),registered:registered[0]};
}
async function executeTool(env:Env,name:string,args:Record<string,any>){
  switch(name){
    case "corporate.status": {
      const identity=await internal(identityStub(env),"/identity");
      const [positions,agents]=await Promise.all([
        query(env,"SELECT count(*)::integer AS count FROM nb.positions"),
        query(env,"SELECT count(*)::integer AS count FROM nb.agents"),
      ]);
      return {identity,position_count:positions[0]?.count,registered_agent_count:agents[0]?.count,
        declaration:"Persistent DO identity is not proof of a running AI reasoning model"};
    }
    case "switchboard.matrix":return await queryMatrix(env);
    case "evidence.graph.read":return await queryGraph(env,args);
    case "catalog.card.read":return await readCatalog(env,args);
    case "agent.inspect":{
      const {stub,registered}=await agentStub(env,args.agent_id);
      return {registered,local:await internal(stub,"/state?agent_id="+encodeURIComponent(registered.id))};
    }
    case "agent.checkpoint":{
      if(!args.checkpoint||typeof args.checkpoint!=="object"||Array.isArray(args.checkpoint))
        throw new Error("Checkpoint must be object");
      const key=validateId(args.idempotency_key,"idempotency key");
      if(JSON.stringify(args.checkpoint).length>16384)throw new Error("Checkpoint exceeds local size bound");
      const {stub,registered}=await agentStub(env,args.agent_id);
      return await internal(stub,"/checkpoint",{agent_id:registered.id,idempotency_key:key,
        checkpoint:args.checkpoint});
    }
    case "agent.message.route":{
      const from=validateId(args.from_agent,"caller agent");
      const to=validateId(args.to_agent,"destination agent");
      const tool=validateId(args.tool,"corporate service tool");
      const key=validateId(args.idempotency_key,"idempotency key");
      if(from===to)throw new Error("Self-routing requires a separately authorized protocol");
      if(typeof args.purpose!=="string"||args.purpose.trim().length<3)
        throw new Error("Purpose-of-use required");
      if(!args.payload||typeof args.payload!=="object"||Array.isArray(args.payload)||
          JSON.stringify(args.payload).length>16384)
        throw new Error("Missing or oversized message payload");
      const [source,permission,service]=await Promise.all([
        query(env,"SELECT id FROM nb.agents WHERE id=$1 LIMIT 1",[from]),
        query(env,"SELECT tool FROM nb.authority WHERE parent_id=$1 AND child_id=$2 AND tool=$3 LIMIT 1",[from,to,tool]),
        query(env,"SELECT enabled FROM nb.services WHERE node_id=$1 AND tool=$2 AND enabled=true LIMIT 1",[to,tool]),
      ]);
      if(!source.length||!permission.length||!service.length)
        throw new Error("Corporate route denied: missing registered caller, direct charter authority or enabled destination service");
      const {stub}=await agentStub(env,to);
      const reply=await internal(stub,"/mcp",{
        jsonrpc:"2.0",id:key,method:"tools/call",params:{
          name:"seat.message.accept",arguments:{agent_id:to,from_agent:from,
            purpose:args.purpose,source_tool:tool,payload:args.payload,idempotency_key:key},
        },
      });
      if(reply.result?.isError)throw new Error("Destination agent refused the message");
      return {operation_state:"accepted_for_seat_local_processing",
        from_agent:from,to_agent:to,tool,receipt:reply.result};
    }
    case "protocol.route":{
      if(args.action!=="connect"&&args.action!=="disconnect")throw new Error("Unknown route action");
      const pid=validateId(args.protocol_id,"protocol ID");
      const key=validateId(args.idempotency_key,"idempotency key");
      const row=await query(env,
        "SELECT protocol_id,from_app,to_app,status,auth_policy FROM switchboard.protocols WHERE protocol_id=$1 LIMIT 1",[pid]);
      if(!row.length)throw new Error("Unknown protocol");
      if(args.action==="connect"){
        const checked=routeEligible(row[0],["evidence:read","seat:route"]);
        if(!checked.ok)throw new Error("Route denied: "+checked.reason);
      }
      return await internal(identityStub(env),"/route",{action:args.action,protocol_id:pid,
        route_id:args.route_id??null,idempotency_key:key});
    }
    default:throw new Error("Unknown or undiscoverable MCP tool");
  }
}
function mcpErr(id:unknown,code:number,message:string){
  return {jsonrpc:"2.0",id:id??null,error:{code,message}};
}
async function handleMcp(req:Request,env:Env) {
  if(req.method!=="POST")return json({error:"MCP endpoint only accepts POST"},405);
  const raw=await req.text();
  if(raw.length>100000)return json({error:"Request too large"},413);
  let msg:Row;
  try{msg=bodyObject(JSON.parse(raw))}catch{return json(mcpErr(null,-32700,"Parse error"),400)}
  if(msg.jsonrpc!=="2.0"||typeof msg.method!=="string")
    return json(mcpErr(msg.id,-32600,"Invalid request"),400);
  if(msg.method.startsWith("notifications/"))return new Response(null,{status:202});
  const id=msg.id??null;
  const p=msg.params&&typeof msg.params==="object"?msg.params:{};
  if(msg.method==="initialize")
    return json({jsonrpc:"2.0",id,result:{protocolVersion:MCP_VERSION,
      capabilities:{tools:{listChanged:false}},serverInfo:{name:"nexusboard-system-entity-switchboard",version:"0.1.0"}}});
  if(req.headers.get("MCP-Protocol-Version")!==MCP_VERSION)
    return json(mcpErr(id,-32600,"Unsupported or missing MCP-Protocol-Version"),400);
  if(msg.method==="ping")return json({jsonrpc:"2.0",id,result:{}});
  if(msg.method==="tools/list")return json({jsonrpc:"2.0",id,result:{tools:permittedMcpTools()}});
  if(msg.method==="tools/call"){
    try{
      const name=validateId(p.name,"tool name");
      if(!permittedMcpTools().some(t=>t.name===name))throw new Error("Tool not in allowlist");
      const out=await executeTool(env,name,bodyObject(p.arguments??{}));
      return json({jsonrpc:"2.0",id,result:{content:[{type:"text",text:JSON.stringify(out)}],isError:false}});
    }catch(error){
      return json({jsonrpc:"2.0",id,result:{content:[{type:"text",
        text:error instanceof Error?error.message:"Tool error"}],isError:true}});
    }
  }
  return json(mcpErr(id,-32601,"Method not found"),404);
}
export default {
  async fetch(req:Request,env:Env):Promise<Response>{
    try{
      const origin=req.headers.get("Origin");
      if(origin&&!(env.NEXUS_ALLOWED_ORIGINS??"").split(",").map(v=>v.trim()).includes(origin))
        return json({error:"Origin not allowed"},403);
      if(!bearerAuthorized(req.headers.get("Authorization"),env.NEXUS_OPERATOR_TOKEN))
        return json({error:"Unauthorized"},401);
      const url=new URL(req.url);
      if(url.pathname==="/mcp")return await handleMcp(req,env);
      if(req.method==="GET"&&url.pathname==="/v1/identity")
        return json(await internal(identityStub(env),"/identity"));
      if(req.method==="GET"&&url.pathname==="/v1/matrix")
        return json(await queryMatrix(env));
      if(req.method==="GET"&&url.pathname==="/v1/evidence/graph")
        return json(await queryGraph(env,{node_id:url.searchParams.get("node_id"),limit:Number(url.searchParams.get("limit")||40)}));
      if(req.method==="GET"&&url.pathname==="/v1/catalog/card")
        return json(await readCatalog(env,{card_id:url.searchParams.get("card_id"),
          ...(url.searchParams.has("revision")?{revision:url.searchParams.get("revision")}:{})}));
      return json({error:"Unknown endpoint"},404);
    }catch(error){
      const reason=error instanceof Error?error.message:"Unknown error";
      return json({error:reason},/not found|does not exist|not registered|Unknown/i.test(reason)?404:400);
    }
  }
};

/** Named singleton DO for constitutional System Entity identity and severable logical routes. */
export class SystemEntity extends DurableObject<Env>{
  async fetch(req:Request):Promise<Response>{
    const url=new URL(req.url);
    let identity=await this.ctx.storage.get<Row>("identity");
    if(!identity){
      identity={entity_id:validateId(this.env.NEXUS_ENTITY_ID||"nexusboard"),identity_version:1,
        identity_kind:"system_entity",created_at:new Date().toISOString()};
      await this.ctx.storage.put("identity",identity);
    }
    if(url.pathname==="/identity")return json(identity);
    if(url.pathname!=="/route"||req.method!=="POST")return json({error:"Unknown DO path"},404);
    const x=bodyObject(await req.json());
    const p=validateId(x.protocol_id,"protocol ID"), key=validateId(x.idempotency_key,"idempotency key");
    const seen=await this.ctx.storage.get<Row>("request:"+key);
    if(seen)return json(seen);
    if(x.action==="connect"){
      const id="route:"+crypto.randomUUID();
      const r={route_id:id,protocol_id:p,state:"active",opened_at:new Date().toISOString(),
        expires_at:new Date(Date.now()+15*60000).toISOString(),
        note:"Logical lease only; not a persistent app socket or completed tool invocation"};
      await this.ctx.storage.put("route:"+id,r);
      await this.ctx.storage.put("request:"+key,r);
      return json(r);
    }
    if(x.action==="disconnect"){
      const id=validateId(x.route_id,"route ID");
      const r=await this.ctx.storage.get<Row>("route:"+id);
      if(!r||r.protocol_id!==p)return json({error:"Route/protocol mismatch"},404);
      const stopped={...r,state:"disconnected",closed_at:new Date().toISOString()};
      await this.ctx.storage.put("route:"+id,stopped);
      await this.ctx.storage.put("request:"+key,stopped);
      return json(stopped);
    }
    return json({error:"Unsupported route action"},400);
  }
}

/** Per registered agent independent persistent state, NOT an implicit reasoning model. */
export class CorporateAgent extends DurableObject<Env>{
  async fetch(req:Request):Promise<Response>{
    const url=new URL(req.url),data=req.method==="POST"?bodyObject(await req.json()):{};
    const id=validateId(url.searchParams.get("agent_id")||data.agent_id||data.params?.arguments?.agent_id,"agent ID");
    const recorded=await this.ctx.storage.get<string>("agent_identity");
    if(recorded&&recorded!==id)return json({error:"Agent identity mismatch"},403);
    if(!recorded)await this.ctx.storage.put("agent_identity",id);
    if(url.pathname==="/mcp"&&req.method==="POST"){
      const requestId=data.id??null;
      if(data.method==="initialize")
        return json({jsonrpc:"2.0",id:requestId,result:{
          protocolVersion:MCP_VERSION,capabilities:{tools:{listChanged:false}},
          serverInfo:{name:"nexusboard-corporate-agent:"+id,version:"0.1.0"}}});
      if(data.method==="tools/list")
        return json({jsonrpc:"2.0",id:requestId,result:{tools:[
          {name:"seat.identity",description:"Read this particular Agent Durable Object identity and local state.",inputSchema:{type:"object",properties:{agent_id:{type:"string"}},required:["agent_id"]}},
          {name:"seat.message.accept",description:"Persist a charter-authorized message envelope; does not auto-reason or approve source facts.",inputSchema:{type:"object",properties:{agent_id:{type:"string"},from_agent:{type:"string"},purpose:{type:"string"},source_tool:{type:"string"},payload:{type:"object"},idempotency_key:{type:"string"}},required:["agent_id","from_agent","purpose","source_tool","payload","idempotency_key"]}},
        ]}});
      if(data.method==="tools/call"){
        const args=bodyObject(data.params?.arguments??{});
        if(data.params?.name==="seat.identity"){
          const checkpoint=await this.ctx.storage.get<Row>("checkpoint");
          return json({jsonrpc:"2.0",id:requestId,result:{content:[
            {type:"text",text:JSON.stringify({agent_id:id,checkpoint:checkpoint??null})}],isError:false}});
        }
        if(data.params?.name==="seat.message.accept"){
          const key=validateId(args.idempotency_key,"message idempotency key");
          const before=await this.ctx.storage.get<Row>("message:"+key);
          const receipt=before??{agent_id:id,from_agent:validateId(args.from_agent),
            source_tool:validateId(args.source_tool),purpose:String(args.purpose),
            saved_at:new Date().toISOString(),status:"received_not_interpreted",
            envelope:args.payload,idempotency_key:key};
          if(!before)await this.ctx.storage.put("message:"+key,receipt);
          return json({jsonrpc:"2.0",id:requestId,result:{content:[
            {type:"text",text:JSON.stringify(receipt)}],isError:false}});
        }
      }
      return json({jsonrpc:"2.0",id:requestId,error:{code:-32601,message:"Unknown Agent MCP operation"}},404);
    }
    if(url.pathname==="/state"){
      const checkpoint=await this.ctx.storage.get<Row>("checkpoint");
      return json({agent_id:id,identity_persistent:true,checkpoint:checkpoint??null,
        note:"No independent reasoning model is claimed by this state service"});
    }
    if(url.pathname==="/checkpoint"&&req.method==="POST"){
      const key=validateId(data.idempotency_key,"idempotency key");
      const existing=await this.ctx.storage.get<Row>("receipt:"+key);
      if(existing)return json(existing);
      const receipt={agent_id:id,operation:"checkpoint",saved_at:new Date().toISOString(),
        checkpoint:data.checkpoint,idempotency_key:key};
      await this.ctx.storage.put("checkpoint",receipt);
      await this.ctx.storage.put("receipt:"+key,receipt);
      return json(receipt);
    }
    return json({error:"Unsupported agent operation"},404);
  }
}
