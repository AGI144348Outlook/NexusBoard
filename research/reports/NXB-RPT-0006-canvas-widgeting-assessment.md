# NXB-RPT-0006 — Canvas Widgeting Freedom and NexusBoard Workbench Assessment

**Date:** 2026-11-25  
**Classification:** architectural assessment / source-grounded synthesis  
**Status:** proposed recommendations; no code, deployment, database, or usability test performed for this report  
**Prepared by:** ChatGPT  
**Report branch:** `research/canvas-widgeting-assessment`

## Scope and source pins

This assessment examines the requested widgeting design and the NexusBoard architecture as they relate to a free-form, nested-canvas notebook workbench.

| Source | Revision / reference | Evidence class |
|---|---|---|
| Echo Green Future — `widgeting-experiment` | branch snapshot `cddcfe2866aee79da1d0115201454d62333a45ce` | observed source |
| Echo widget continuation notes | `WIDGETING_PROGRESS.md` at the above snapshot | documented status and limits |
| Echo widget manager | `pwa/js/widgets.js` at the above snapshot | observed source |
| Echo canvas/store/app/panels | `pwa/js/store.js`, `app.js`, `panels.js` at the above snapshot | observed source |
| NexusBoard main | `4efa69d1e5c22eb0561790a59598b2c47b4b9a54` | documented proposed architecture |
| NexusBoard switchboard/OpenDiagram integration branch | `feature/system-entity-switchboard-neon-opendiagram`, commit `6d4baafec38da53ddc6198b21ce74126ee133d35` | observed source; implementation branch |
| NexusBoard README, ARCHITECTURE, STATUS, ROADMAP and evidence/visualization guides | main at the source pin above | documented design and status |

Primary links:
- [Echo Green Future — widgeting-experiment](https://github.com/AGI144348Outlook/Echo_Green_Future/tree/widgeting-experiment)
- [Echo WIDGETING_PROGRESS.md](https://github.com/AGI144348Outlook/Echo_Green_Future/blob/widgeting-experiment/WIDGETING_PROGRESS.md)
- [Echo widget manager](https://github.com/AGI144348Outlook/Echo_Green_Future/blob/widgeting-experiment/pwa/js/widgets.js)
- [NexusBoard architecture](https://github.com/AGI144348Outlook/NexusBoard/blob/main/ARCHITECTURE.md)
- [NexusBoard status](https://github.com/AGI144348Outlook/NexusBoard/blob/main/STATUS.md)
- [NexusBoard OpenDiagram switchboard adapter](https://github.com/AGI144348Outlook/NexusBoard/tree/feature/system-entity-switchboard-neon-opendiagram/integrations/system-entity-switchboard)

## Executive assessment

**The right direction is not a sequence of rigidly nested pages. It is a spatial workspace in which canvases are first-class, freely arranged, stateful widgets—and each canvas widget can itself contain a navigable spatial canvas.**

Echo's widgeting branch provides the strongest interaction precedent: independently identified windows, a registry of widget types, move/resize/dock/minimize/maximize/focus, layout serialization, binding to underlying objects, and explicit actor ownership. It demonstrates the kind of workspace freedom being sought.

NexusBoard contributes the semantic and governance constraints that keep this freedom coherent: persistent identity, independently attributable evidence, separate authority/work/evidence/feedback flows, read-only projections of persisted evidence, and the rule that visual geometry is not semantic truth.

The synthesis should preserve the freedom of Echo's workspace while applying NexusBoard's identity, provenance and authorization discipline. Neither repository should be copied wholesale into the notebook frontend.

## 1. What Echo's widgeting branch reveals about the desired freedom

### 1.1 Widgets are independent workspace objects

**Observed:** `pwa/js/widgets.js` maintains a widget map keyed by widget-instance ID and a type registry whose entries provide title/icon/build behavior. The window manager exposes operations for opening, closing, focusing, moving, resizing, docking, minimizing, maximizing, binding, saving and restoring layouts.

This is more expressive than a fixed sidebar or a card grid. A user can assemble a personal arrangement of simultaneous work surfaces instead of being forced through one prescribed navigation sequence.

### 1.2 Widget identity is not the identity of its content

**Observed/documented:** Echo distinguishes:
- the semantic resident/canonical identity,
- the Canvas Presentiation identity,
- the widget instance identity.

A widget may bind to a resident or a Presentiation. Moving or closing the widget does not delete or move the bound object. Changing its renderer does not change semantic identity.

**Assessment:** Apply this separation directly to the notebook:
- `canvas_id`: persistent identity of the actual canvas/document;
- `widget_instance_id`: one visual occurrence of that canvas in a parent workspace;
- `card_id + revision`: identity of a source/evidence card;
- `layout_id`: a named arrangement of widget instances.

A canvas may appear in several places or views without duplicating its underlying identity. Closing a preview should close the widget instance, not delete the canvas.

### 1.3 The workspace supports spatial manipulation, not just opening

**Observed:** Echo's window shell supports header dragging, corner resizing, focus/z-order, dock/float, minimize/expand and maximize/restore. New windows cascade to avoid landing exactly on top of one another. Layouts can be serialized and restored.

**Assessment:** A nested canvas should have a **pre-open widget state**. Before entering it, the user should be able to:
- see its title, visual thumbnail or miniature canvas, summary and visible child objects;
- move it anywhere on the parent canvas;
- resize it to expose more or less of its preview;
- focus, minimize, dock or maximize it;
- open/enter it when desired;
- keep it open as a floating workspace while continuing to work elsewhere.

The nested canvas must not be forced to open immediately when clicked once. Separate selection/focus from enter/open.

### 1.4 Widget types are extensible

**Observed:** Echo uses a widget-type registry and per-type builders rather than a single hard-coded window body. The app registers distinct types such as inspector, audit, status, registry and data surfaces.

**Assessment:** The notebook should define a small stable host contract and allow new widget types to be added as independent modules. A canvas widget, evidence inspector, source viewer, MCP capability panel, branch explorer and notebook card viewer should share the same window/workspace machinery without being flattened into one monolithic component.

### 1.5 Ownership and action policy are enforced in the manager

**Observed:** Echo records an owner/actor and rejects several Echo actions against user-owned widgets, including moving, resizing, docking, minimizing, maximizing, closing and rebinding. The branch notes describe additional checks against unknown types, missing targets, invalid geometry and attempts to override Echo ownership.

**Assessment:** Preserve user control as a first-class invariant. An assistant may propose or open a new surface, but it should not silently rearrange or close a user-owned workspace. Make assistant actions visible and reversible.

**Limit:** These checks are in browser-side JavaScript in this snapshot. They are useful interaction safeguards, not a security boundary for remote services or database authority.

### 1.6 The branch is not a completed universal widget specification

**Documented in `WIDGETING_PROGRESS.md`:** the continuation is based on existing PWA widget source and is independent of notebook 0.4 and the blank dev-suite surface. The notes identify an explicit Canvas WidgetSpec schema, registry-reference resolution, responsive registry updates, and touch/keyboard drag/drop testing as next work. Full browser pointer interaction was not yet verified in that continuation note.

The PWA README also identifies limitations such as missing widget tab-stacking and a text-to-widget compiler.

**Assessment:** Treat the branch as a strong working interaction reference, not a finalized universal specification or a production-ready nested-canvas engine.

## 2. What NexusBoard adds—and why it matters to the canvas

### 2.1 Persistent identity should survive visual changes

**Documented in NexusBoard ARCHITECTURE / System Entity guide:** the System Entity, Agent, seat, operator and MCP endpoint are distinct. The organization and its durable records survive model/operator replacement.

**UI conclusion:** canvas IDs, source IDs, card revisions and widget IDs must not be derived from their current title, coordinates, parent location or model-generated labels. Renaming, moving, resizing, changing the preview renderer or opening a canvas must not change its identity.

### 2.2 Keep the four flows visually distinct

NexusBoard's System Entity guide distinguishes:
- **Authority** — who may approve or perform an action;
- **Work** — mission/task dispatch and execution;
- **Evidence** — source capture, interpretation and review;
- **Feedback** — outcomes and proposals for revision.

**UI conclusion:** do not represent every relationship with the same line or connector. If these flows appear in a canvas, use distinct typed connectors and labels. A task route is not an evidence edge; an evidence edge is not an authorization grant.

### 2.3 A drawn connection is not automatically an accepted fact

**Documented in NexusBoard's Two Evidence Networks guide:** first-order evidence and relations are separate from second-order assessments about who proposed or evaluated a relation, source independence, methods, dissent and revision. A stored edge is not by itself proof.

**Observed in the switchboard integration source:** the read-only evidence projection renders persisted nodes and edges, omits edges whose endpoints are missing, and explicitly states that rendered relations are a database projection—not a truth guarantee.

**UI conclusion:** canvas editing should have distinct modes/states:
- source-backed persisted relation;
- user-drawn draft connector;
- relation proposal awaiting assessment;
- denied or stale relation;
- committed/accepted relation;
- independently verified relation.

Dragging two nodes near each other must not create a semantic relation. Drawing a line should create a draft visual relation until the user explicitly submits a typed proposal through an authorized path.

### 2.4 Logical organization does not require a rigid visual hierarchy

NexusBoard separates the twenty corporate seats from the seven components of an Agent and distinguishes logical service boundaries from physical isolation.

**UI conclusion:** avoid hard-coding one fixed canvas hierarchy as the only representation of the notebook. A canvas can have multiple views, multiple parent placements, or cross-links to other canvases while retaining its canonical identity. Parent-child nesting is one relationship among several, not the only possible topology.

## 3. Proposed workbench interaction model

### 3.1 Canvas widget lifecycle

Recommended states:

`CREATED → PREVIEW → FOCUSED → ENTERED`

with independent workspace states:

`FLOATING ↔ DOCKED`, `MINIMIZED`, `MAXIMIZED`, `CLOSED`

- **Created:** a new canvas or reference is instantiated with stable ID.
- **Preview:** it is visible as a widget on the parent canvas, showing a miniature view and useful metadata.
- **Focused:** selection, inspector and available actions become visible; focus does not automatically enter.
- **Entered:** the nested canvas becomes the active navigation level. The parent remains in the navigation stack and its widget state is preserved.
- **Closed:** closes the visual instance only, unless the user explicitly chooses to delete the underlying canvas.

### 3.2 What a canvas widget should preview before entering

The pre-open widget should show as much context as its current size allows:
- canvas title and description;
- miniature spatial map of its children;
- child canvas count and evidence/card count;
- last updated/revision and source status;
- optional badges for documented, observed, proposed, contested, blocked or unknown;
- one clear enter/open affordance plus ordinary widget controls.

The miniature is a live or revision-pinned projection, not a second editable copy of the canvas semantics. At small sizes it can simplify; at larger sizes it can expose real content and child widgets.

### 3.3 Nested canvases remain canvases, not modal pages

When entering a nested canvas:
- push its `canvas_id` onto a navigation stack;
- retain parent camera, widget geometry, z-order, selection and layout;
- provide breadcrumbs or a spatial “return to parent” action;
- allow sibling canvases to remain open as widgets;
- permit cross-canvas links without pretending that a linked canvas is a child;
- support opening the same canvas in another widget instance without cloning its data.

### 3.4 Workspace persistence and event history

Persist workspace state separately from evidence/semantic state.

**Workspace state:** widget positions/sizes, z-order, dock/minimize/maximize state, preview scale, camera transform, selected layout and navigation path.

**Semantic state:** canvas identity, cards, evidence relations, assessments, revisions and source provenance.

Record workspace actions as attributable events with actor, timestamp, action, target, prior/new values and result. Use idempotent identifiers for operations that eventually write to a server. Layout save/restore should be explicit and reversible.

## 4. Recommended architecture for the frontend

### Layer A — Spatial host
A single workspace manager owns the canvas viewport, widget layer, focus/z-order, pointer/keyboard interaction, docking, resize constraints and responsive bounds.

### Layer B — Canvas widget contract
A typed widget specification should include:
- stable widget instance ID and widget type;
- target `canvas_id` or source binding;
- owner/actor and permitted actions;
- initial geometry and optional layout;
- preview strategy and renderer version;
- persistence scope and lifecycle callbacks.

Keep the contract explicit rather than relying on arbitrary unvalidated object properties.

### Layer C — Canvas document model
Each canvas has stable identity, its own content/relations, a camera and a version. A child canvas is referenced by ID, not embedded as an opaque JSON blob in its parent's layout. Parent membership, cross-canvas links and multiple appearances are separately typed relationships.

### Layer D — Source/evidence adapter
Read canonical card/evidence records through a read-only projection. Visual nodes retain source IDs and revisions. Draft edits are staged and only become persisted semantic changes through a permitted, explicit commit flow.

### Layer E — Assistant/operator adapter
Assistant-generated widgets and proposed actions carry actor, purpose and provenance. The host enforces workspace ownership policy; the backend separately enforces authority for data or MCP actions. UI discoverability is never permission.

## 5. Specific recommendations for the current notebook frontend

1. **Promote the nested-canvas node into a real CanvasWidget.** Its parent-canvas appearance should be a miniature interactive preview, not only a title card with an “open” button.
2. **Separate select from enter.** Click/tap selects; a distinct action enters. Double-click may enter as a configurable shortcut, but must not be the only route.
3. **Allow free widget composition.** Users should be able to arrange several canvas previews, source windows, evidence inspectors and notes simultaneously.
4. **Add multiple saved layouts.** Examples: research overview, evidence review, source comparison, and one layout per canvas. Do not overwrite the default layout when creating a new one.
5. **Make canvas preview zoom independent.** A widget can zoom its miniature without changing the actual nested canvas camera.
6. **Support a parent-preserving navigation stack.** Returning from a child restores the parent's exact viewport and widget arrangement.
7. **Keep workspace and evidence commits separate.** Moving a canvas or source card is a layout action; connecting evidence is a semantic proposal.
8. **Expose provenance in the preview.** A canvas with only proposed/unverified content should not look equivalent to one whose cards and relations are independently reviewed.
9. **Use a widget registry.** Add future surfaces by registering a typed renderer/behavior instead of extending one giant conditional.
10. **Protect user-owned workspace state.** Assistant suggestions should be additive and reversible; user-created widgets should not be silently moved, closed, rebound or deleted.

## 6. Risks and failure modes

| Risk | Why it matters | Mitigation |
|---|---|---|
| Widget ID conflated with canvas ID | closing one appearance could delete or duplicate the document | separate stable canvas and widget-instance IDs |
| Preview becomes a second mutable copy | preview and canonical canvas drift | preview is a projection; explicit enter/edit/commit |
| Geometry treated as evidence | spatial proximity or drawn arrows appear factual | typed draft vs persisted relation states |
| Assistant rearranges user's space | breaks trust and loses working context | actor/owner policy, proposal-first behavior, undo |
| Nested state stored recursively as blobs | deep canvases become hard to query, version and link | normalized canvas identity and typed membership |
| Browser-side policy mistaken for authorization | malicious clients can bypass it | enforce remote permissions at service/database |
| Too many windows overwhelm small screens | poor touch usability | viewport bounds, minimize/dock, focus mode, keyboard access |
| Preview labels imply verified status | visual certainty exceeds evidence | explicit evidence-state legend and provenance |

## 7. Priority plan

### P0 — Preserve core freedom
- typed CanvasWidget with preview and enter actions;
- independent canvas/widget identities;
- move, resize, focus, minimize, dock, maximize;
- parent-preserving nested navigation;
- per-canvas camera and layout state;
- user/assistant ownership rules and undo.

### P1 — Make it notebook-native
- preview children and evidence/card counts;
- multiple saved layouts;
- source and evidence state overlays;
- cross-canvas references and link navigation;
- provenance inspector reachable without entering the canvas.

### P2 — Extend the widget ecosystem
- registry-based source, card, MCP capability and branch widgets;
- responsive registry/entity updates;
- touch and keyboard drag/drop;
- optional widget tab stacks or grouping;
- import/export of layout specifications with validation.

### P3 — Governed persistence
- workspace event log and revisioned layouts;
- server-side authorization for semantic commits;
- idempotent receipts, conflict handling and rollback;
- independently reviewed usability tests before claiming the experience is verified.

## 8. Overall judgment

**Echo Green Future supplies the interaction grammar for freedom; NexusBoard supplies the identity, evidence and authority grammar for keeping that freedom safe and meaningful.**

The target experience should feel like a personal, manipulable spatial environment—not a folder tree dressed up as a canvas. Each canvas should be visible and useful before entry, capable of living as a widget on another canvas, and able to become a full work surface without destroying the context from which it was opened.

This is a synthesis and implementation recommendation. It is not a claim that Echo's branch has completed its WidgetSpec or that NexusBoard's proposed architecture is already deployed and verified.

## Verification boundary

- Echo branch source and continuation notes were inspected at the pinned snapshot; the continuation notes themselves state that full browser pointer interaction remained to be tested.
- NexusBoard main and the switchboard integration branch were inspected as repository documentation/source. NexusBoard's own STATUS marks its overall architecture as proposed and says no deployment audit or tests were performed for those claims.
- No repository tests, CI runs, deployments, Neon changes, schema changes, permission changes or merges were initiated for this assessment.
