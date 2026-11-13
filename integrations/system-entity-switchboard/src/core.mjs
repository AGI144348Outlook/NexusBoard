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
export function permittedMcpTools() {
  return [
    {name:"corporate.status",description:"Read persistent System Entity identity and registered corporate status.",inputSchema:{type:"object",properties:{},additionalProperties:false}},
    {name:"switchboard.matrix",description:"Read directional app protocols and corporate seat roster with explicitly distinct availability statuses.",inputSchema:{type:"object",properties:{},additionalProperties:false}},
    {name:"evidence.graph.read",description:"Read source-attributed Neon evidence network and supporting catalog cards without semantic inference.",inputSchema:{type:"object",properties:{node_id:{type:"string"},limit:{type:"integer",minimum:1,maximum:120}},required:["node_id"],additionalProperties:false}},
    {name:"catalog.card.read",description:"Retrieve one exact catalog card revision, or latest if revision omitted.",inputSchema:{type:"object",properties:{card_id:{type:"string"},revision:{type:"integer",minimum:1}},required:["card_id"],additionalProperties:false}},
    {name:"agent.inspect",description:"Inspect a registered corporate agent seat and its isolated Durable Object checkpoint; does not claim a reasoning model.",inputSchema:{type:"object",properties:{agent_id:{type:"string"}},required:["agent_id"],additionalProperties:false}},
    {name:"agent.checkpoint",description:"Write a checkpoint in one registered agent Durable Object; privileged, audited operator development action.",inputSchema:{type:"object",properties:{agent_id:{type:"string"},checkpoint:{type:"object"},idempotency_key:{type:"string"}},required:["agent_id","checkpoint","idempotency_key"],additionalProperties:false}},
    {name:"protocol.route",description:"Establish or sever a scoped logical route between registered apps; only verified protocols can be opened.",inputSchema:{type:"object",properties:{action:{type:"string",enum:["connect","disconnect"]},protocol_id:{type:"string"},route_id:{type:"string"},idempotency_key:{type:"string"}},required:["action","protocol_id","idempotency_key"],additionalProperties:false}},
  ];
}
