import test from "node:test";
import assert from "node:assert/strict";
import {bearerAuthorized,clampLimit,evidenceProjection,makePairMatrix,MCP_VERSION,permittedMcpTools,routeEligible,validateId} from "../src/core.mjs";

test("identity names are bounded and do not accept arbitrary SQL",()=>{
  assert.equal(validateId("agent:resources"),"agent:resources");
  assert.throws(()=>validateId("x';DROP TABLE a;"),/Invalid/);
});
test("bootstrap bearer auth fails closed, including missing configuration",()=>{
  const secret="super-secret-long-bootstrap-token";
  assert.equal(bearerAuthorized("Bearer "+secret,secret),true);
  assert.equal(bearerAuthorized("Bearer "+secret,undefined),false);
  assert.equal(bearerAuthorized("Bearer wrong",secret),false);
  assert.equal(bearerAuthorized("Basic "+secret,secret),false);
});
test("a discovered/proposed connection cannot be called active",()=>{
  const p={status:"proposed",from_app:"n",to_app:"d",auth_policy:{required_scope:"evidence:read"}};
  assert.deepEqual(routeEligible(p,["evidence:read"]),{ok:false,reason:"protocol_not_verified"});
  assert.equal(routeEligible({...p,status:"verified"},["seat:route"]).ok,false);
  assert.equal(routeEligible({...p,status:"verified"},["evidence:read"]).ok,true);
});
test("matrix preserves directed pair differences",()=>{
  const a=[{app_id:"diagram"},{app_id:"neon"}];
  const p=[{from_app:"neon",to_app:"diagram",protocol_id:"read",title:"Read",effect_class:"read",status:"proposed",steps:[],auth_policy:{}},
           {from_app:"diagram",to_app:"neon",protocol_id:"proposal",title:"Proposal",effect_class:"proposal",status:"disabled",steps:[],auth_policy:{}}];
  const cells=makePairMatrix(a,p).cells;
  assert.equal(cells.length,2);
  assert.equal(cells.find(c=>c.from==="neon").bindings[0].id,"read");
  assert.equal(cells.find(c=>c.from==="diagram").bindings[0].id,"proposal");
});
test("evidence cover copies only persisted nodes and links",()=>{
  const nodes=[{node_id:"w",node_kind:"concept",label:"Wing",details:{},evidence_state:"provisional",attribution_ref:"wordnet:wing"},
               {node_id:"b",node_kind:"concept",label:"Bird",details:{},evidence_state:"reviewed",attribution_ref:"wordnet:bird"}];
  const edges=[{edge_id:"e1",source_node:"w",target_node:"b",relation_type:"part_of",relation_domain:"lexical",evidence_state:"proposed",source_ref:"wordnet:wing"},
               {edge_id:"e2",source_node:"w",target_node:"unseen",relation_type:"is_a",relation_domain:"lexical",evidence_state:"proposed"}];
  const g=evidenceProjection(nodes,edges,[],"graph-1");
  assert.equal(g.nodes.length,2);
  assert.equal(g.relations.length,1);
  assert.equal(g.relations[0].predicate,"part_of");
  assert.equal(g.producer,"neon_evidence_snapshot");
  assert.deepEqual(g.relations[0].source_refs,["wordnet:wing"]);
});
test("minimum MCP discoverability and limits are explicit",()=>{
  assert.equal(MCP_VERSION,"2025-06-18");
  const tools=permittedMcpTools();
  assert.ok(tools.some(t=>t.name==="switchboard.matrix"));
  assert.ok(tools.some(t=>t.name==="agent.checkpoint"));
  assert.equal(clampLimit(9999,120),120);
});
