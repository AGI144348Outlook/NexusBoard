import { neon } from "@neondatabase/serverless";
import { clampLimit, validateId, validateMindmapCommit } from "./core.mjs";

type Row=Record<string,any>;
type EchoEnv={ECHO_DATABASE_URL?:string};
async function query(env:EchoEnv,sql:string,args:unknown[]=[]):Promise<Row[]>{
  if(!env.ECHO_DATABASE_URL)throw new Error("Echo Neon memory backend not configured");
  return await neon(env.ECHO_DATABASE_URL)(sql,args) as Row[];
}
export async function mindmapList(env:EchoEnv,args:Record<string,any>={}){
  const limit=clampLimit(args.limit,100);
  const records=await query(env,
    "SELECT DISTINCT ON(map_id) map_id,revision,name,actor_kind,actor_ref,source_graph_id,epistemic_state,created_at FROM echo_mindmaps.revisions ORDER BY map_id,revision DESC LIMIT $1",
    [limit]);
  return {protocol:"echo.mindmap-catalog/v1",domain:"echo",records,
    source:"Echo Neon echo_mindmaps.revisions",has_more:records.length===limit,
    note:"Versioned source-preserving mindmap snapshots, not reviewed semantic claims"};
}
export async function mindmapRead(env:EchoEnv,args:Record<string,any>){
  const mapId=validateId(args.map_id,"mindmap ID");
  let records:Row[];
  if(args.revision!==undefined){
    const rev=Number(args.revision);
    if(!Number.isSafeInteger(rev)||rev<=0)throw new Error("Invalid mindmap revision");
    records=await query(env,
      "SELECT * FROM echo_mindmaps.revisions WHERE map_id=$1 AND revision=$2 LIMIT 1",
      [mapId,rev]);
  }else{
    records=await query(env,
      "SELECT * FROM echo_mindmaps.revisions WHERE map_id=$1 ORDER BY revision DESC LIMIT 1",
      [mapId]);
  }
  if(!records.length)throw new Error("Echo mindmap revision not found");
  return {domain:"echo",record:records[0],catalog_card_id:"mindmap:"+mapId,
    note:"Visual arrows remain proposed; no evidence_net relations added"};
}
export async function mindmapCommit(
  env:EchoEnv,input:Record<string,any>,
  actor:{kind:"owner_operator"|"authorized_mcp_operator";ref:string}
){
  const x=validateMindmapCommit(input);
  const actorRef=validateId(actor.ref,"operator identity");
  const encoded=JSON.stringify({
    map_id:x.map_id,name:x.name,expected_revision:x.expected_revision,
    actor_kind:actor.kind,actor_ref:actorRef,source_graph_id:x.source_graph_id,
    source_node_ids:x.source_node_ids,source_relation_ids:x.source_relation_ids,scene:x.scene
  });
  const digest=new Uint8Array(await crypto.subtle.digest("SHA-256",new TextEncoder().encode(encoded)));
  const hash=Array.from(digest,b=>b.toString(16).padStart(2,"0")).join("");
  const previous=await query(env,
    "SELECT map_id,revision,commit_id,name,payload_sha256,created_at FROM echo_mindmaps.revisions WHERE commit_id=$1 LIMIT 1",
    [x.commit_id]);
  if(previous.length){
    if(previous[0].payload_sha256!==hash||previous[0].map_id!==x.map_id)
      throw new Error("Commit ID already used for a different payload");
    return {...previous[0],catalog_card_id:"mindmap:"+x.map_id,domain:"echo",
      persisted:true,idempotent_replay:true,epistemic_state:"proposed"};
  }
  if((x.source_node_ids.length||x.source_relation_ids.length)&&!x.source_graph_id)
    throw new Error("Original evidence references require a graph ID");
  if(x.source_graph_id&&!x.source_graph_id.startsWith("neon:echo:"))
    throw new Error("Only Echo-domain source graph IDs are eligible for Echo memory");
  if(x.source_node_ids.length){
    const records=await query(env,"SELECT count(*)::integer AS count FROM evidence_net.nodes WHERE node_id=ANY($1::text[])",
      [x.source_node_ids]);
    if(Number(records[0]?.count)!==x.source_node_ids.length)
      throw new Error("Unknown original Echo evidence node IDs");
  }
  if(x.source_relation_ids.length){
    const records=await query(env,"SELECT count(*)::integer AS count FROM evidence_net.edges WHERE edge_id=ANY($1::text[])",
      [x.source_relation_ids]);
    if(Number(records[0]?.count)!==x.source_relation_ids.length)
      throw new Error("Unknown original Echo relation IDs");
  }
  // The one SQL statement either inserts a new map revision AND its index
  // evidence card together, or writes neither. The comparison protects
  // against overwriting someone else's newer map revision.
  const sql=[
    "WITH previous AS (",
    " SELECT COALESCE(MAX(revision),0)::integer AS rev FROM echo_mindmaps.revisions WHERE map_id=$1",
    "), committed AS (",
    " INSERT INTO echo_mindmaps.revisions(",
    " map_id,revision,commit_id,name,actor_kind,actor_ref,source_graph_id,",
    " source_node_ids,source_relation_ids,scene,visual_nodes,visual_links,epistemic_state,payload_sha256)",
    " SELECT $1,previous.rev+1,$2,$3,$4,$5,$6,$7::jsonb,$8::jsonb,$9::jsonb,$10::jsonb,$11::jsonb,'proposed',$12",
    " FROM previous WHERE previous.rev=$13",
    " RETURNING map_id,revision,commit_id,name,payload_sha256,created_at",
    "), catalog AS (",
    " INSERT INTO card_protocol.card_revisions(card_id,revision,card_kind,title,body,provenance,review_state)",
    " SELECT 'mindmap:'||m.map_id,m.revision,'evidence',m.name,",
    " jsonb_build_object('record_kind','echo_evidence_mindmap',",
    " 'map_id',m.map_id,'revision',m.revision,'source_graph_id',$6::text,",
    " 'source_nodes',$7::jsonb,'source_relations',$8::jsonb,",
    " 'visual_connections_unverified',true),",
    " jsonb_build_object('commit_id',m.commit_id,'actor_kind',$4::text,",
    " 'actor_ref',$5::text,'payload_sha256',m.payload_sha256),'proposed'",
    " FROM committed m RETURNING card_id,revision",
    ")",
    "SELECT c.map_id,c.revision,c.commit_id,c.name,c.payload_sha256,c.created_at,",
    " catalog.card_id AS catalog_card_id FROM committed c JOIN catalog ON catalog.revision=c.revision"
  ].join("\n");
  let records:Row[];
  try{
    records=await query(env,sql,[
      x.map_id,x.commit_id,x.name,actor.kind,actorRef,x.source_graph_id,
      JSON.stringify(x.source_node_ids),JSON.stringify(x.source_relation_ids),
      JSON.stringify(x.scene),JSON.stringify(x.visual_nodes),
      JSON.stringify(x.visual_links),hash,x.expected_revision
    ]);
  }catch(error){
    const msg=String(error);
    if(/23505|duplicate key|unique constraint/i.test(msg))
      throw new Error("Mindmap revision conflict; reload before committing again");
    throw error;
  }
  if(records.length!==1)throw new Error("Mindmap revision conflict; reload before committing again");
  return {...records[0],domain:"echo",persisted:true,idempotent_replay:false,
    epistemic_state:"proposed",relation_admission:"none; source evidence_net unchanged"};
}
