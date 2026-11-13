/**
 * NX-SB-001 pure, authority-independent protocol primitives.
 * Source-of-truth state lives in Neon; these helpers do not create facts.
 */
export const MCP_VERSION = "2025-06-18";

export function validateId(value, name = "identifier") {
  if (typeof value !== "string" || !/^[A-Za-z0-9][A-Za-z0-9_.:-]{0,127}$/.test(value))
    throw new Error("Invalid " + name);
  return value;
}
export function clampLimit(n, max = 120) {
  const v = Number(n);
  if (!Number.isSafeInteger(v) || v < 1) return Math.min(40, max);
  return Math.min(v, max);
}
export function bearerAuthorized(header, expected) {
  if (!expected || typeof expected !== "string" || expected.length < 16) return false;
  if (typeof header !== "string" || !header.startsWith("Bearer ")) return false;
  const actual = header.slice(7);
  // Constant-time within equal-length values; a dev bootstrap token, not OAuth.
  if (actual.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < actual.length; i++) diff |= actual.charCodeAt(i) ^ expected.charCodeAt(i);
  return diff === 0;
}
export function routeEligible(protocol, scopes = []) {
  if (!protocol || protocol.status !== "verified") return {ok:false, reason:"protocol_not_verified"};
  if (!Array.isArray(scopes) || !scopes.includes(protocol.auth_policy?.required_scope))
    return {ok:false, reason:"missing_authorized_scope"};
  if (!protocol.from_app || !protocol.to_app) return {ok:false, reason:"broken_pair"};
  return {ok:true, reason:"authorized"};
}
export function makePairMatrix(apps, protocols) {
  const ordered = [...apps].sort((a,b)=>String(a.app_id).localeCompare(String(b.app_id)));
  const cellRows = [];
  for (const a of ordered) for (const b of ordered) {
    if (a.app_id === b.app_id) continue;
    const pair = protocols.filter(p => p.from_app === a.app_id && p.to_app === b.app_id);
    if (pair.length) cellRows.push({
      from:a.app_id, to:b.app_id,
      bindings:pair.map(p=>({id:p.protocol_id,title:p.title,effect:p.effect_class,status:p.status,
        steps:p.steps,auth_policy:p.auth_policy})),
    });
  }
  return {apps:ordered,cells:cellRows,active_routes:"only in persistent SystemEntity DO"};
}
export function evidenceProjection(nodes, edges, cards = [], id = "neon-graph") {
  const ids = new Set(nodes.map(n=>n.node_id));
  if (ids.size !== nodes.length) throw new Error("Duplicate evidence nodes");
  const vnodes=nodes.map(n=>({
    id:n.node_id,label:n.label,kind:n.node_kind,
    source_refs:n.attribution_ref?[n.attribution_ref]:[],
    epistemic_state:n.evidence_state, details:n.details,
  }));
  const vedges=[];
  for (const e of edges) {
    // Never synthesize missing endpoints, nor convert co-occurrence to is_a.
    if (!ids.has(e.source_node)||!ids.has(e.target_node)) continue;
    vedges.push({id:e.edge_id,from:e.source_node,to:e.target_node,predicate:e.relation_type,
      domain:e.relation_domain, epistemic_state:e.evidence_state,
      source_refs:e.source_ref?[e.source_ref]:[],
      supporting_card:e.supporting_card_id?
        {id:e.supporting_card_id,revision:e.supporting_card_revision}:null});
  }
  return {protocol:"nexusboard.evidence-graph/v1",producer:"neon_evidence_snapshot",
    graph_id:id,source_type:"read_only_db_projection",nodes:vnodes,relations:vedges,cards,
    note:"Rendered relations are exactly persisted evidence_net edges; a displayed link is not proof of truth."};
}

/** Validates a proposed editable mindmap snapshot without treating drawn lines
 * as verified semantic evidence. This is a per-request transport safeguard, not
 * a dictionary/vocabulary or agent-learning operation quota.
 */
export function validateMindmapCommit(input) {
  if (!input || typeof input !== "object" || Array.isArray(input)) throw new Error("Mindmap object required");
  const map_id=validateId(input.map_id,"mindmap ID");
  const commit_id=validateId(input.commit_id,"commit ID");
  if(!map_id.startsWith("map_")||!commit_id.startsWith("commit_"))throw new Error("Invalid mindmap/commit prefix");
  const expected_revision=Number(input.expected_revision);
  if(!Number.isSafeInteger(expected_revision)||expected_revision<0)throw new Error("Invalid expected revision");
  const name=typeof input.name==="string"?input.name.trim():"";
  if(!name||name.length>180)throw new Error("Mindmap title required (up to 180 characters)");
  if(!input.scene||typeof input.scene!=="object"||Array.isArray(input.scene)||
     !Array.isArray(input.scene.elements)||Object.keys(input.scene).some(k=>!["elements"].includes(k)))
    throw new Error("Mindmap scene must contain only an elements array");
  const elements=input.scene.elements;
  if(elements.length<1||elements.length>3000)throw new Error("Mindmap scene must contain between 1 and 3000 elements per commit");
  const types=new Set(["rectangle","ellipse","diamond","text","arrow","line","freedraw","frame"]);
  const ids=new Set();
  for(const e of elements) {
    if(!e||typeof e!=="object"||Array.isArray(e))throw new Error("Invalid canvas element");
    if(!types.has(e.type))throw new Error("Unsupported canvas element type: "+String(e.type));
    validateId(e.id,"scene element ID");
    if(ids.has(e.id))throw new Error("Duplicate scene element ID");
    ids.add(e.id);
    if(e.isDeleted)throw new Error("Deleted canvas element cannot be committed");
    if(!["frame"].includes(e.type)){
      for(const k of ["x","y","width","height"]){
        if(typeof e[k]!=="number"||!Number.isFinite(e[k])||Math.abs(e[k])>1e8)throw new Error("Invalid scene geometry");
      }
    }
    if(e.type==="text"&&typeof e.text!=="string")throw new Error("Text element lacks text");
    if(e.points!==undefined && (!Array.isArray(e.points)||e.points.length>2000||
         e.points.some(p=>!Array.isArray(p)||p.length!==2||p.some(n=>typeof n!=="number"||!Number.isFinite(n)))))
      throw new Error("Invalid line/arrow points");
  }
  const encoded=JSON.stringify(input.scene);
  if(encoded.length>1500000||/"(?:fileId|dataURL|files)"\s*:/.test(encoded))
    throw new Error("Large or binary file-backed scenes are not accepted by mindmap memory");
  function idsOf(name,max=1000){
    const array=input[name]??[];
    if(!Array.isArray(array)||array.length>max)throw new Error("Invalid "+name);
    const found=new Set();
    for(const s of array){validateId(s,name+" identifier");if(found.has(s))throw new Error("Duplicate "+name);found.add(s);}
    return array;
  }
  const source_node_ids=idsOf("source_node_ids");
  const source_relation_ids=idsOf("source_relation_ids");
  const source_graph_id=input.source_graph_id??null;
  if(source_graph_id!==null)validateId(source_graph_id,"source graph ID");
  const visual_nodes=elements.filter(e=>["rectangle","ellipse","diamond","text"].includes(e.type))
    .map(e=>({id:e.id,kind:e.type,label:e.type==="text"?e.text:null,
              x:e.x,y:e.y,width:e.width,height:e.height,epistemic_state:"visual_only"}));
  const visual_links=elements.filter(e=>["arrow","line"].includes(e.type))
    .map(e=>({id:e.id,kind:e.type,points:e.points??[],epistemic_state:"proposed_visual_connection",
              source_relation_id:null,semantic_predicate:null}));
  return {map_id,commit_id,expected_revision,name,source_graph_id,source_node_ids,source_relation_ids,
    scene:{elements},visual_nodes,visual_links,
    epistemic_state:"proposed"};
}

export function permittedMcpTools() {
  return [
    {name:"corporate.status",description:"Read persistent System Entity identity and registered corporate status.",inputSchema:{type:"object",properties:{},additionalProperties:false}},
    {name:"switchboard.matrix",description:"Read directional app protocols and corporate seat roster with explicitly distinct availability statuses.",inputSchema:{type:"object",properties:{},additionalProperties:false}},
    {name:"evidence.graph.read",description:"Read source-attributed Neon evidence network and supporting catalog cards without semantic inference.",inputSchema:{type:"object",properties:{node_id:{type:"string"},domain:{type:"string",enum:["corporate","echo"]},limit:{type:"integer",minimum:1,maximum:120}},required:["node_id"],additionalProperties:false}},
    {name:"catalog.card.read",description:"Retrieve one exact catalog card revision, or latest if revision omitted.",inputSchema:{type:"object",properties:{card_id:{type:"string"},domain:{type:"string",enum:["corporate","echo"]},revision:{type:"integer",minimum:1}},required:["card_id"],additionalProperties:false}},
    {name:"evidence.network.index",description:"List existing evidence-network node IDs and source states for one explicitly selected Neon memory domain.",inputSchema:{type:"object",properties:{domain:{type:"string",enum:["corporate","echo"]},limit:{type:"integer",minimum:1,maximum:100}},additionalProperties:false}},
    {name:"catalog.card.index",description:"List latest revision metadata for existing catalog cards in the chosen memory domain; no fictional records.",inputSchema:{type:"object",properties:{domain:{type:"string",enum:["corporate","echo"]},limit:{type:"integer",minimum:1,maximum:100}},additionalProperties:false}},
    {name:"knowledge.library.index",description:"Discover source-grounded infographic and PDF metadata recorded in the NexusBoard corporate library, with no claim of full-text access.",inputSchema:{type:"object",properties:{kind:{type:"string",enum:["all","infographic","pdf"]},limit:{type:"integer",minimum:1,maximum:100}},additionalProperties:false}},
    {name:"knowledge.glossary.index",description:"Read actual NotebookLM glossary entries if imported; an empty result means no glossary has been provided.",inputSchema:{type:"object",properties:{limit:{type:"integer",minimum:1,maximum:100}},additionalProperties:false}},
    {name:"mindmap.commit",description:"Persist a versioned proposed mindmap to Echo Neon catalog; never promotes visual connectors into evidence_net facts; uses operator gateway identity.",inputSchema:{type:"object",properties:{map_id:{type:"string"},commit_id:{type:"string"},name:{type:"string"},expected_revision:{type:"integer",minimum:0},source_graph_id:{type:"string"},source_node_ids:{type:"array",items:{type:"string"}},source_relation_ids:{type:"array",items:{type:"string"}},scene:{type:"object"}},required:["map_id","commit_id","name","expected_revision","scene"],additionalProperties:false}},
    {name:"mindmap.list",description:"List persisted Echo Neon mindmap catalog entries, latest revisions only.",inputSchema:{type:"object",properties:{limit:{type:"integer",minimum:1,maximum:100}},additionalProperties:false}},
    {name:"mindmap.read",description:"Read one exact or latest saved Echo mindmap revision and its original source references.",inputSchema:{type:"object",properties:{map_id:{type:"string"},revision:{type:"integer",minimum:1}},required:["map_id"],additionalProperties:false}},
    {name:"agent.inspect",description:"Inspect a registered corporate agent seat and its isolated Durable Object checkpoint; does not claim a reasoning model.",inputSchema:{type:"object",properties:{agent_id:{type:"string"}},required:["agent_id"],additionalProperties:false}},
    {name:"agent.checkpoint",description:"Write a checkpoint in one registered agent Durable Object; privileged, audited operator development action.",inputSchema:{type:"object",properties:{agent_id:{type:"string"},checkpoint:{type:"object"},idempotency_key:{type:"string"}},required:["agent_id","checkpoint","idempotency_key"],additionalProperties:false}},
    {name:"agent.message.route",description:"Route a source-attributed envelope between independently registered corporate agents only when nb.authority and target nb.services both permit it.",inputSchema:{type:"object",properties:{from_agent:{type:"string"},to_agent:{type:"string"},tool:{type:"string"},purpose:{type:"string"},payload:{type:"object"},idempotency_key:{type:"string"}},required:["from_agent","to_agent","tool","purpose","payload","idempotency_key"],additionalProperties:false}},
    {name:"protocol.route",description:"Establish or sever a scoped logical route between registered apps; only verified protocols can be opened.",inputSchema:{type:"object",properties:{action:{type:"string",enum:["connect","disconnect"]},protocol_id:{type:"string"},route_id:{type:"string"},idempotency_key:{type:"string"}},required:["action","protocol_id","idempotency_key"],additionalProperties:false}},
  ];
}
