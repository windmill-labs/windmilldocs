# Flow Editor

Windmill's Flow Editor allows you to build flows with a low-code builder.

:::info Workflows

A workflow is a series of connected tasks, events, or processes that occur automatically to achieve a specific goal. These tasks are organized as a sequence of actions or steps: [scripts](../getting_started/0_scripts_quickstart/1_typescript_quickstart/index.md) in the case of Windmill.
:::

<div class="text-xl mb-2 font-semibold"></div>
<div class="grid grid-cols-2 gap-2 mb-4">
    <a href="/docs/getting_started/flows_quickstart" class="rounded-md p-6 border border-gray-200 hover:border-teal-500 transition-all cursor-pointer flex flex-col gap-2 !no-underline" >
      <div class="text-lg font-semibold text-gray-900">Flows Quickstart</div>
      <div class="text-sm text-gray-500">4-minute presentation of our Flow editor.</div>
    </a>
    <a href="/docs/cli_local_dev" class="rounded-md p-6 border border-gray-200 hover:border-blue-500 transition-all cursor-pointer flex flex-col gap-2 !no-underline" >
      <div class="text-lg font-semibold text-gray-900">CLI and Local Development</div>
      <div class="text-sm text-gray-500">Create scripts and flows without low-code builders.</div>
    </a>
</div>

<br/>

The Flow Editor has the following features which are the subject of specific pages:

<div class="text-xl mb-2 font-semibold"></div>
<div class="grid grid-cols-2 gap-2 mb-4">
    <a href="/docs/getting_started/trigger_flows" class="rounded-md p-6 border border-gray-200 hover:border-teal-500 transition-all cursor-pointer flex flex-col gap-2 !no-underline" >
      <div class="text-lg font-semibold text-gray-900">Triggering Flows</div>
      <div class="text-sm text-gray-500">Trigger flows on-demand, by schedule or on external events.</div>
    </a>
    <a href="/docs/flows/flow_branches" class="rounded-md p-6 border border-gray-200 hover:border-teal-500 transition-all cursor-pointer flex flex-col gap-2 !no-underline" >
      <div class="text-lg font-semibold text-gray-900">Branches</div>
      <div class="text-sm text-gray-500">Split the execution of the flow based on a condition.</div>
    </a>
    <a href="/docs/flows/flow_loops" class="rounded-md p-6 border border-gray-200 hover:border-teal-500 transition-all cursor-pointer flex flex-col gap-2 !no-underline" >
      <div class="text-lg font-semibold text-gray-900">For loops</div>
      <div class="text-sm text-gray-500">Iterate a series of tasks.</div>
    </a>
    <a href="/docs/flows/flow_error_handler" class="rounded-md p-6 border border-gray-200 hover:border-teal-500 transition-all cursor-pointer flex flex-col gap-2 !no-underline" >
      <div class="text-lg font-semibold text-gray-900">Error Handler</div>
      <div class="text-sm text-gray-500">Configure a script to handle errors.</div>
    </a>
    <a href="/docs/flows/flow_trigger" class="rounded-md p-6 border border-gray-200 hover:border-teal-500 transition-all cursor-pointer flex flex-col gap-2 !no-underline" >
      <div class="text-lg font-semibold text-gray-900">Trigger Scripts</div>
      <div class="text-sm text-gray-500">Trigger flows upon a given event with a dedicated trigger script.</div>
    </a>
    <a href="/docs/flows/retries" class="rounded-md p-6 border border-gray-200 hover:border-teal-500 transition-all cursor-pointer flex flex-col gap-2 !no-underline" >
      <div class="text-lg font-semibold text-gray-900">Retries</div>
      <div class="text-sm text-gray-500">Re-try a step in case of error.</div>
    </a>
    <a href="/docs/flows/cache" class="rounded-md p-6 border border-gray-200 hover:border-teal-500 transition-all cursor-pointer flex flex-col gap-2 !no-underline" >
      <div class="text-lg font-semibold text-gray-900">Cache for Steps</div>
      <div class="text-sm text-gray-500">Re-use a step's previous results.</div>
    </a>
    <a href="/docs/flows/sleep" class="rounded-md p-6 border border-gray-200 hover:border-teal-500 transition-all cursor-pointer flex flex-col gap-2 !no-underline" >
      <div class="text-lg font-semibold text-gray-900">Early Stop / Break</div>
      <div class="text-sm text-gray-500">Suspend executions within a flow for a specified time.</div>
    </a> 
    <a href="/docs/flows/flow_approval" class="rounded-md p-6 border border-gray-200 hover:border-teal-500 transition-all cursor-pointer flex flex-col gap-2 !no-underline" >
      <div class="text-lg font-semibold text-gray-900">Approval Steps in Flows</div>
      <div class="text-sm text-gray-500">Suspend a flow until specific event(s) are received, such as approvals or cancellations.</div>
    </a>
    <a href="/docs/flows/early_stop" class="rounded-md p-6 border border-gray-200 hover:border-teal-500 transition-all cursor-pointer flex flex-col gap-2 !no-underline" >
      <div class="text-lg font-semibold text-gray-900">Sleep / Delays in Flows</div>
      <div class="text-sm text-gray-500">Stop early a flow based on a step's result.</div>
    </a>
</div>

<br/>

![Example of a flow](../assets/flows/flow_example.png)

> _Example of a [flow](https://hub.windmill.dev/flows/38/automatically-populate-crm-contact-details-from-simple-email) in Windmill._

<br/>


The Flow Builder has the following major components we will detail in a [dedicated page](3_editor_components.md):

- [Toolbar](./3_editor_components.md#toolbar): the toolbar allows you to export the flow, configure the flow settings, and test the flow.
- [Settings](./3_editor_components.md#settings): configure the flow settings.
- [Static Inputs](./3_editor_components.md#static-inputs): view all flow static inputs.
- [Flow Inputs](./3_editor_components.md#flow-inputs): view all flow inputs.
- [Action](./3_editor_components.md#flow-actions): steps are the building blocks of a flow. They are the actions that will be executed when the flow is run.
- [Action editor](./3_editor_components.md#action-editor): configure the action.

## How flows work

### Architecture

 In Windmill, a workflow is a JSON serializable value in the [OpenFlow](../openflow/index.md) format that consists of an input spec (similar to [Scripts](../getting_started/0_scripts_quickstart/index.md)), and a linear sequence of steps, also referred to as modules. Each step consists of either:

- Reference to a Script from the [Hub](https://hub.windmill.dev/).
- Reference to a Script in your [workspace](../reference/index.md#workspace).
- Inlined Script in [TypeScript](../getting_started/0_scripts_quickstart/1_typescript_quickstart/index.md) (Deno), [Python](../getting_started/0_scripts_quickstart/2_python_quickstart/index.md), [Go](../getting_started/0_scripts_quickstart/3_go_quickstart/index.md), [Bash](../getting_started/0_scripts_quickstart/3_go_quickstart/index.md), [SQL](../getting_started/0_scripts_quickstart/5_sql_quickstart/index.md) or [non-supported languages](../advanced/7_docker/index.md).
- [Trigger Scripts](./10_flow_trigger.md) which are a kind of Scripts that are meant to be first step of a scheduled Flow, that watch for external events and early exit the Flow if there is no new events.
- [For loop](./12_flow_loops.md) that iterates over elements and triggers the execution of an embedded flow for each element. The list is calculated dynamically as an [input transform](#input-transform).
- [Branch](./13_flow_branches.md#branch-one) to the first subflow that has a truthy predicate (evaluated in-order).
- [Branches to all](./13_flow_branches.md#branch-all) subflows and collect the results of each branch into an array.
- [Approval/Suspend steps](./11_flow_approval.md) which suspend the flow at no cost until it is resumed by getting an approval/resume signal.
- Inner flows.

With the mechanism of [input transforms](#input-transform), the input of any step can be the output of any previous step, hence every Flow is actually a [Directed Acyclic Graph (DAG)](https://en.wikipedia.org/wiki/Directed_acyclic_graph) rather than simple sequences. You can refer to the result of any step using its ID.

### Input Transform

Every step has an input transform that maps from:

- the Flow input
- any step's result, not only the previous step's result
- [Resource](../core_concepts/3_resources_and_types/index.md)/[Variable](../core_concepts/2_variables_and_secrets/index.md).

to the different parameters of this specific step.

It does that using a JavaScript expression that operates in a more restricted
setting. That JavaScript is using a restricted subset of the standard library
and a few more functions which are the following:

- `flow_input`: The dict/object containing the different parameters of the Flow
  itself
- `results.{id}`: The result of the step with given ID
- `resource(path)`: The Resource at path
- `variable(path)`: The Variable at path

Using JavaScript in this manner, for every parameter, is extremely flexible and
allows Windmill to be extremely generic in the kind of modules it runs.

For each field, one has the option to write the JavaScript directly or to use
the quick connect button if the field map one to one with a field of the
`flow_input`, a field of the `previous_result` or of any steps.

### States

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
- `setState` which sets the new state

The states can be seen in the [Resources](../core_concepts/3_resources_and_types/index.md) section with a
[Resource Type](../core_concepts/3_resources_and_types/index.md#create-a-resource-type) of `state`.