---
id: editor-state
title: EditorState
sidebar_label: EditorState
---

import {API, Badge} from "./API";

<Badge type="type" />

## Reference
### Properties
<API items={[
  ["nodes", "Record<NodeId, Node>", "A map of all the Nodes in the editor"],
  ["events", "Object", [
    ["selected", "NodeId"],
    ["hovered", "NodeId"],
    ["dragged", "NodeId"],
  ]],
  ["options", "Object", [
    ["resolver", "Map<String, React.ComponentType>", "A map of User Components that will be used in the editor"],
    ["enabled?", "boolaen", "Optional. If set to false, all editing capabilities will be disabled"],
    ["indicator?", 'Record<"success" | "error", String>', "Optional. The colour to use for the drop indicator. The colour set in 'success' will be used when the indicator shows a droppable location; otherwise the colour set in 'error' will be used."],
    ["onRender?", "React.ComponentType<{element: React.ReactElement}>", "Optional. Specify a custom component to render every User Element in the editor."]
  ]]
]} /> 

