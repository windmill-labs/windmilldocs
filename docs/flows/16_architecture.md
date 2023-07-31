# Architecture and Data Exchange

In Windmill, a workflow is a JSON serializable value in the [OpenFlow](../openflow/index.md) format that consists of an input spec (similar to [Scripts](../getting_started/0_scripts_quickstart/index.mdx)), and a linear sequence of steps, also referred to as modules. Each step consists of either:

- Reference to a Script from the [Hub](https://hub.windmill.dev/).
- Reference to a Script in your [workspace](../core_concepts/16_roles_and_permissions/index.mdx#workspace).
- Inlined Script in [TypeScript](../getting_started/0_scripts_quickstart/1_typescript_quickstart/index.mdx) (Deno), [Python](../getting_started/0_scripts_quickstart/2_python_quickstart/index.mdx), [Go](../getting_started/0_scripts_quickstart/3_go_quickstart/index.mdx), [Bash](../getting_started/0_scripts_quickstart/3_go_quickstart/index.mdx), [SQL](../getting_started/0_scripts_quickstart/5_sql_quickstart/index.mdx) or [non-supported languages](../advanced/7_docker/index.md).
- [Trigger Scripts](./10_flow_trigger.md) which are a kind of Scripts that are meant to be first step of a scheduled Flow, that watch for external events and early exit the Flow if there is no new events.
- [For loop](./12_flow_loops.md) that iterates over elements and triggers the execution of an embedded flow for each element. The list is calculated dynamically as an [input transform](#input-transform).
- [Branch](./13_flow_branches.md#branch-one) to the first subflow that has a truthy predicate (evaluated in-order).
- [Branches to all](./13_flow_branches.md#branch-all) subflows and collect the results of each branch into an array.
- [Approval/Suspend steps](./11_flow_approval.md) which suspend the flow at no cost until it is resumed by getting an approval/resume signal.
- Inner flows.

## Input Transform

With the mechanism of input transforms, the input of any step can be the output of any previous step, hence every Flow is actually a [Directed Acyclic Graph (DAG)](https://en.wikipedia.org/wiki/Directed_acyclic_graph) rather than simple sequences. You can refer to the result of any step using its ID.

Every step has an input transform that maps from:

- the Flow input
- any step's result, not only the previous step's result
- [Resource](../core_concepts/3_resources_and_types/index.mdx)/[Variable](../core_concepts/2_variables_and_secrets/index.mdx).

to the different parameters of this specific step.

It does that using a JavaScript expression that operates in a more restricted
setting. That JavaScript is using a restricted subset of the standard library
and a few more functions which are the following:

- `flow_input`: the dict/object containing the different parameters of the Flow
  itself.
- `results.{id}`: the result of the step with given ID.
- `resource(path)`: the Resource at path.
- `variable(path)`: the Variable at path.

Using JavaScript in this manner, for every parameter, is extremely flexible and
allows Windmill to be extremely generic in the kind of modules it runs.

For each field, one has the option to write the JavaScript directly or to use
the quick connect button if the field map one to one with a field of the
`flow_input`, a field of the `previous_result` or of any steps.

From the editor, you can directly get:
- [Static inputs](./3_editor_components.mdx#static-inputs): you can find them on top of the side menu. This tab centralizes the static inputs of every steps. It is akin to a file containing all constants. Modifying a value here modify it in the step input directly.
- Dynamic inputs:
  - using the id associated with the step
  - clicking on the plug logo that will let you pick flow inputs or previous steps' results (after testing flow or step).

![Static & Dynamic Inputs](../getting_started/6_flows_quickstart/static_and_dynamic_inputs.png)

## States

A state is an object stored as a resource of the resource type `state` which is meant to persist across distinct
executions of the same Script. This is what enables Flows to watch for changes
in most event watching scenarios. The pattern is as follows:

- Retrieve the last state or, if undefined, assume it is the first
  execution.
- Retrieve the current state in the external system you are watching, e.g. the
  list of users having starred your repo or the maximum ID of posts on Hacker
  News.
- Calculate the difference between the current state and the last internal
  state. This difference is what you will want to act upon.
- Set the new state so that you do not process the
  elements you just processed.
- Return the differences calculated previously so that you can process them in
  the next steps. You will likely want to [forloop](./12_flow_loops.md) over the items and trigger
  one Flow per item. This is exactly the pattern used when your Flow is in the
  mode of "Watching changes regularly".

The convenience functions do this in TypeScript are:

- `getState` which retrieves a JSON object stored as a resource of type `state` at a path determined by `getStatePath`, which is unique the trigger (username or schedule path), the embedding flow's path (if any), and the step's or script's path.
- `setState` which sets the new state.

The states can be seen in the [Resources](../core_concepts/3_resources_and_types/index.mdx) section with a
[Resource Type](../core_concepts/3_resources_and_types/index.mdx#create-a-resource-type) of `state`.
