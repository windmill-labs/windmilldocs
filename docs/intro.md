# Introduction

Windmill is an **<a href="https://github.com/windmill-labs/windmill" target="_blank">open-source</a>** alternative to Retool, Airplane and n8n to **build all your internal tools (endpoints, workflows, UIs) through simple scripts** - in Typescript, Python, Go & Bash - and low code builders.

Start building now using our **<a href="https://app.windmill.dev/" rel="nofollow" target="_blank">Cloud App</a>** (no card required) or **<a href="/docs/advanced/self_host" target="_blank">Self-Host</a>** yourself.

## Learn about Windmill

<div class="text-xl mb-2 font-semibold"></div>
<div class="grid grid-cols-2 gap-2 mb-4">
  <a href="/docs/misc/note_of_intent" class="rounded-md p-6 border border-gray-200 hover:border-blue-500 transition-all cursor-pointer flex flex-col gap-2 !no-underline" target="_blank">
   <div class="text-lg font-semibold text-gray-800">Note of Intent</div>
    <div class="text-sm text-gray-500">Windmill bridges the gap between no-code/low-code services and traditional programming, offering a versatile solution for developing endpoints, workflows, and internal apps.</div>
  </a>
    <a href="/docs/getting_started/how_to_use_windmill" class="rounded-md p-6 border border-gray-200 hover:border-blue-500 transition-all cursor-pointer flex flex-col gap-2 !no-underline" target="_blank">
   <div class="text-lg font-semibold text-gray-800">How to Use Windmill</div>
    <div class="text-sm text-gray-500">Get started in 30 seconds.</div>
  </a>
</div>

## Quick Overview of Windmill

<div class="text-xl mb-2 font-semibold"></div>
<div class="grid grid-cols-2 gap-2 mb-4">
  <a href="/docs/getting_started/scripts_quickstart/typescript" class="rounded-md p-6 border border-gray-200 hover:border-blue-500 transition-all cursor-pointer flex flex-col gap-2 !no-underline" target="_blank">
   <div class="text-lg font-semibold text-gray-800">Scripts Quickstart</div>
    <div class="text-sm text-gray-500">Scripts are the basic building blocks that can be written in various languages, run as standalone, or combined in Workflows or Apps.</div>
  </a>
  <a href="/docs/getting_started/flows_quickstart" class="rounded-md p-6 border border-gray-200 hover:border-teal-500 transition-all cursor-pointer flex flex-col gap-2 !no-underline" target="_blank">
   <div class="text-lg font-semibold text-gray-800">Flows Quickstart</div>
    <div class="text-sm text-gray-500">Flows are a sequences of scripts that can automate tasks, manage complex processes, and exchange data between steps for powerful automation solutions.</div>
  </a>
  <a href="/docs/getting_started/apps_quickstart" class="rounded-md p-6 border border-gray-200 hover:border-orange-500 transition-all cursor-pointer flex flex-col gap-2 !no-underline" target="_blank">
   <div class="text-lg font-semibold text-gray-800">Apps Quickstart</div>
    <div class="text-sm text-gray-500"> Apps are customized, user-friendly interfaces that allow non-technical users to interact with custom-made workflows, built using a drag-and-drop editor.</div>
  </a>
  <a href="/docs/integrations/integrations_on_windmill" class="rounded-md p-6 border border-gray-200 hover:border-blue-500 transition-all cursor-pointer flex flex-col gap-2 !no-underline" target="_blank">
   <div class="text-lg font-semibold text-gray-800">Integrations</div>
    <div class="text-sm text-gray-500">Windmill provides a framework to easily add integrations.</div>
  </a>
</div>

## Core Concepts

<div class="text-xl mb-2 font-semibold"></div>
<div class="grid grid-cols-2 gap-2 mb-4">
  <a href="/docs/getting_started/trigger_scripts" class="rounded-md p-6 border border-gray-200 hover:border-blue-500 transition-all cursor-pointer flex flex-col gap-2 !no-underline" target="_blank">
   <div class="text-lg font-semibold text-gray-800">Triggering Scripts</div>
    <div class="text-sm text-gray-500">Trigger flows on-demand, by schedule or on external events.</div>
  </a>
  <a href="/docs/core_concepts/auto_generated_uis" class="rounded-md p-6 border border-gray-200 hover:border-blue-500 transition-all cursor-pointer flex flex-col gap-2 !no-underline" target="_blank">
   <div class="text-lg font-semibold text-gray-800">Auto-generated UIs</div>
    <div class="text-sm text-gray-500">Auto-Generated UIs create user interfaces for scripts and flows based on their parameters.</div>
  </a>
  <a href="/docs/core_concepts/scheduling" class="rounded-md p-6 border border-gray-200 hover:border-blue-500 transition-all cursor-pointer flex flex-col gap-2 !no-underline" target="_blank">
   <div class="text-lg font-semibold text-gray-800">Scheduling</div>
    <div class="text-sm text-gray-500">Scheduling allows you to define schedules for Scripts and Flows, automatically running them at set frequencies.</div>
  </a>
  <a href="/docs/core_concepts/monitor_past_and_future_runs" class="rounded-md p-6 border border-gray-200 hover:border-blue-500 transition-all cursor-pointer flex flex-col gap-2 !no-underline" target="_blank">
   <div class="text-lg font-semibold text-gray-800">Monitor Past and Future Runs</div>
    <div class="text-sm text-gray-500">Get an aggregated view on past and future runs on your workspace.</div>
  </a>
  <a href="/docs/core_concepts/variables_and_secrets" class="rounded-md p-6 border border-gray-200 hover:border-blue-500 transition-all cursor-pointer flex flex-col gap-2 !no-underline" target="_blank">
   <div class="text-lg font-semibold text-gray-800">Variables and Secrets</div>
    <div class="text-sm text-gray-500">Variables and Secrets are encrypted, dynamic values used for reusing information and securely passing sensitive data within scripts.</div>
  </a>
  <a href="/docs/core_concepts/resources_and_types" class="rounded-md p-6 border border-gray-200 hover:border-blue-500 transition-all cursor-pointer flex flex-col gap-2 !no-underline" target="_blank">
   <div class="text-lg font-semibold text-gray-800">Resources and Resource Types</div>
    <div class="text-sm text-gray-500">Resources are structured configurations and connections to third-party systems, with Resource Types defining the schema for each Resource.</div>
  </a>
  <a href="/docs/core_concepts/groups_and_folders" class="rounded-md p-6 border border-gray-200 hover:border-blue-500 transition-all cursor-pointer flex flex-col gap-2 !no-underline" target="_blank">
   <div class="text-lg font-semibold text-gray-800">Groups and Folders</div>
    <div class="text-sm text-gray-500">Groups and Folders enable efficient permission management by grouping users with similar access levels.</div>
  </a>
  <a href="/docs/core_concepts/worker_groups" class="rounded-md p-6 border border-gray-200 hover:border-blue-500 transition-all cursor-pointer flex flex-col gap-2 !no-underline" target="_blank">
   <div class="text-lg font-semibold text-gray-800">Worker Groups</div>
    <div class="text-sm text-gray-500">Worker Groups allow users to run scripts and flows on different machines with varying specifications.</div>
  </a>
  <a href="/docs/core_concepts/persistent_storage" class="rounded-md p-6 border border-gray-200 hover:border-blue-500 transition-all cursor-pointer flex flex-col gap-2 !no-underline" target="_blank">
   <div class="text-lg font-semibold text-gray-800">Persistent Storage</div>
    <div class="text-sm text-gray-500">Ensure that your data is safely stored and easily accessible whenever required.</div>
  </a>
  <a href="/docs/misc/code_autocompletion" class="rounded-md p-6 border border-gray-200 hover:border-blue-500 transition-all cursor-pointer flex flex-col gap-2 !no-underline" target="_blank">
   <div class="text-lg font-semibold text-gray-800">Auto-Complete Code with AI</div>
    <div class="text-sm text-gray-500">Have AI suggest code on Windmill for you.</div>
  </a>
</div>

<br/>

<a href="/docs/getting_started/flows_quickstart" class="rounded-md p-6 mb-4 border border-gray-200 hover:border-teal-500 transition-all cursor-pointer flex flex-col gap-2 !no-underline" target="_blank">
  <div class="text-lg font-semibold text-gray-800">Flows</div>
  <div class="text-m text-gray-800">Build complex workflows with flexibility.</div>
  <div class="grid grid-cols-2 gap-2 mt-4">
    <a href="/docs/getting_started/trigger_flows" class="rounded-md p-6 border border-gray-200 hover:border-teal-500 transition-all cursor-pointer flex flex-col gap-2 !no-underline" target="_blank">
      <div class="text-sm font-semibold text-gray-800">Triggering flows</div>
      <div class="text-sm text-gray-500">Trigger flows on-demand, by schedule or on external events.</div>
    </a>
    <a href="/docs/core_concepts/error_handling_in_flows" class="rounded-md p-6 border border-gray-200 hover:border-teal-500 transition-all cursor-pointer flex flex-col gap-2 !no-underline" target="_blank">
      <div class="text-sm font-semibold text-gray-800">Error Handling in Flows</div>
      <div class="text-sm text-gray-500">Error Handling can be managed using Retries, Early Stop/Break and Error Handlers scripts.</div>
    </a>
    <a href="/docs/flows/sleep" class="rounded-md p-6 border border-gray-200 hover:border-teal-500 transition-all cursor-pointer flex flex-col gap-2 !no-underline" target="_blank">
      <div class="text-sm font-semibold text-gray-800">Sleep / Delays in Flows</div>
      <div class="text-sm text-gray-500">Suspend executions within a flow for a specified time.</div>
    </a> 
    <a href="/docs/flows/flow_approval" class="rounded-md p-6 border border-gray-200 hover:border-teal-500 transition-all cursor-pointer flex flex-col gap-2 !no-underline" target="_blank">
      <div class="text-sm font-semibold text-gray-800">Approval Steps in Flows</div>
      <div class="text-sm text-gray-500">Suspend a flow until specific event(s) are received, such as approvals or cancellations.</div>
    </a>
    <a href="/docs/flows/flow_branches" class="rounded-md p-6 border border-gray-200 hover:border-teal-500 transition-all cursor-pointer flex flex-col gap-2 !no-underline" target="_blank">
      <div class="text-sm font-semibold text-gray-800">Branches</div>
      <div class="text-sm text-gray-500">Split the execution of the flow based on a condition.</div>
    </a>
    <a href="/docs/flows/flow_loops" class="rounded-md p-6 border border-gray-200 hover:border-teal-500 transition-all cursor-pointer flex flex-col gap-2 !no-underline" target="_blank">
      <div class="text-sm font-semibold text-gray-800">For loops</div>
      <div class="text-sm text-gray-500">Iterate a series of tasks.</div>
    </a>
  </div>
</a>

<br/>

<a href="/docs/getting_started/apps_quickstart" class="rounded-md p-6 border border-gray-200 hover:border-orange-500 transition-all cursor-pointer flex flex-col gap-2 !no-underline" target="_blank">
  <div class="text-lg font-semibold text-gray-800">Apps</div>
  <div class="text-m text-gray-800">Create your own UIs using drag-and-drop components along with custom scripts and flows.</div>
  <div class="grid grid-cols-2 gap-2 mt-4">
    <a href="/docs/apps/app_component_library" class="rounded-md p-6 border border-gray-200 hover:border-orange-500 transition-all cursor-pointer flex flex-col gap-2 !no-underline" target="_blank">
      <div class="text-sm font-semibold text-gray-800">List of components</div>
      <div class="text-sm text-gray-500">Use prebuilt interface elements to display data, and manipulate or interact with it based on user actions.</div>
    </a>
    <a href="/docs/apps/app-runnable" class="rounded-md p-6 border border-gray-200 hover:border-orange-500 transition-all cursor-pointer flex flex-col gap-2 !no-underline" target="_blank">
      <div class="text-sm font-semibold text-gray-800">Link your App to scripts and flows</div>
      <div class="text-sm text-gray-500">Run any script or flow for your UI.</div>
    </a>
    <a href="/docs/apps/app_styling" class="rounded-md p-6 border border-gray-200 hover:border-orange-500 transition-all cursor-pointer flex flex-col gap-2 !no-underline" target="_blank">
      <div class="text-sm font-semibold text-gray-800">Styling</div>
      <div class="text-sm text-gray-500">Customize the your App according to your own graphical standards.</div>
    </a>
    <a href="/docs/apps/app_e-commerce" class="rounded-md p-6 border border-gray-200 hover:border-orange-500 transition-all cursor-pointer flex flex-col gap-2 !no-underline" target="_blank">
      <div class="text-sm font-semibold text-gray-800">Example: E-commerce CRM app</div>
      <div class="text-sm text-gray-500">Tutorial on how to build a CRM with Windmill.</div>
    </a>
  </div>
</a>


## Comparisions

<div class="text-xl mb-2 font-semibold"></div>
<div class="grid grid-cols-2 gap-2 mb-4">
  <a href="/docs/misc/benchmarks" class="rounded-md p-6 border border-gray-200 hover:border-blue-500 transition-all cursor-pointer flex flex-col gap-2 !no-underline" target="_blank">
   <div class="text-lg font-semibold text-gray-800">Benchmarks</div>
    <div class="text-sm text-gray-500">Windmill has about same the performance as AWS Lambda for heavier workloads, slower on cold starts for medium compute.</div>
  </a>
    <a href="/docs/misc/windmill_compared_to_peers" class="rounded-md p-6 border border-gray-200 hover:border-blue-500 transition-all cursor-pointer flex flex-col gap-2 !no-underline" target="_blank">
   <div class="text-lg font-semibold text-gray-800">Windmill Compared to Peers</div>
    <div class="text-sm text-gray-500">Our subjective impression on other players you might come across.</div>
  </a>
</div>