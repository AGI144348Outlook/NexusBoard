import test from "node:test";
import assert from "node:assert/strict";
import {validateMindmapCommit,permittedMcpTools} from "../src/core.mjs";
const shape=(id="shape-a")=>({id,type:"rectangle",x:12,y:14,width:200,height:120,strokeColor:"#333",isDeleted:false});
const arrow=(id="arrow-b")=>({id,type:"arrow",x:50,y:55,width:130,height:20,
  points:[[0,0],[130,20]],endArrowhead:"arrow",isDeleted:false});
const input=()=>({
  map_id:"map_550e8400-e29b-41d4-a716-446655440000",
  commit_id:"commit_350e8400-e29b-41d4-a716-446655440000",
  expected_revision:0,name:"Echo's evidence map",
  source_graph_id:"neon:echo:concept:bird",
  source_node_ids:["concept:bird","concept:wing"],source_relation_ids:["edge:wing-bird"],
  scene:{elements:[shape(),arrow()]}
});
test("mindmap snapshot retains original evidence refs but visual links are proposals",()=>{
  const x=validateMindmapCommit(input());
  assert.deepEqual(x.source_node_ids,["concept:bird","concept:wing"]);
  assert.deepEqual(x.source_relation_ids,["edge:wing-bird"]);
  assert.equal(x.visual_links.length,1);
  assert.equal(x.visual_links[0].semantic_predicate,null);
  assert.equal(x.visual_links[0].epistemic_state,"proposed_visual_connection");
  assert.equal(x.epistemic_state,"proposed");
  assert.equal(x.scene.elements.length,2);
});
test("revision and commit validation fail closed",()=>{
  assert.throws(()=>validateMindmapCommit({...input(),expected_revision:-1}),/revision/);
  assert.throws(()=>validateMindmapCommit({...input(),commit_id:"!"}),/Invalid/);
  assert.throws(()=>validateMindmapCommit({...input(),scene:{elements:[shape(),shape()]}}),/Duplicate/);
  assert.throws(()=>validateMindmapCommit({...input(),source_node_ids:["x","x"]}),/Duplicate/);
});
test("unsupported binary-image and deleted elements do not enter catalog",()=>{
  assert.throws(()=>validateMindmapCommit({...input(),scene:{elements:[{...shape(),type:"image",fileId:"asset"}]}}),/Unsupported/);
  assert.throws(()=>validateMindmapCommit({...input(),scene:{elements:[{...shape(),isDeleted:true}]}}),/Deleted/);
  assert.throws(()=>validateMindmapCommit({...input(),scene:{elements:[{...shape(),fileId:"private-attachment"}]}}),/binary/);
});
test("bad arrow geometry and missing/empty diagram are rejected",()=>{
  assert.throws(()=>validateMindmapCommit({...input(),scene:{elements:[]}}),/between/);
  assert.throws(()=>validateMindmapCommit({...input(),scene:{elements:[shape(),{...arrow(),points:[[0,NaN]]}]}}),/points/);
  assert.throws(()=>validateMindmapCommit({...input(),scene:{elements:[shape()],files:{data:"abc"}}}),/only an elements/);
});
test("Echo memory commit and recovery are discoverable via MCP",()=>{
  const names=permittedMcpTools().map(x=>x.name);
  assert.ok(names.includes("mindmap.commit"));
  assert.ok(names.includes("mindmap.list"));
  assert.ok(names.includes("mindmap.read"));
});
