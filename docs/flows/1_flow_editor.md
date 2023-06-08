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
