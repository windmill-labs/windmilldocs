# Introduction

Windmill is an **<a href="https://github.com/windmill-labs/windmill" >open-source</a>**, blazing fast and scalable alternative to Retool, Airplane, Superblocks, n8n, Airflow, Temporal to **build all your internal tools (endpoints, workflows, UIs) through the combination of code** (in Typescript, Python, Go & Bash, or any docker image) and low code builders. It embeds all-in-one:

- an **execution runtime** to execute functions at scale with low-latency and no overhead on a fleet of workers
- an **orchestrator** to compose functions into powerful flows at low-latency built with a low-code builder (or yaml if that's your thing)
- an **app builder** to build application and data-intensive dashboards built with low-code or JS frameworks such a React.

Windmill can be used solely from its UI through its [webIDE](./getting_started/0_scripts_quickstart/1_typescript_quickstart/index.md), and low-code builders but it is also possible to keep using your editor and deploy from a [git repo](./deploy_gh_gl.md) using a [CLI](./cli_local_dev/index.md).

Start building now using our **<a href="https://app.windmill.dev/" rel="nofollow" >Cloud App</a>** (no credit card required) or **<a href="/docs/advanced/self_host" >Self-Host</a>** yourself.

## Learn about Windmill

<div class="text-xl mb-2 font-semibold"></div>
<div class="grid grid-cols-2 gap-2 mb-4">
   <a href="/docs/getting_started/how_to_use_windmill" class="rounded-md p-6 border border-gray-200 hover:border-blue-500 transition-all cursor-pointer flex flex-col gap-2 !no-underline" >
   <div class="text-lg font-semibold text-gray-900">Get Started with Windmill</div>
    <div class="text-sm text-gray-500">Get started in 30 seconds.</div>
  </a>
  <a href="/docs/misc/note_of_intent" class="rounded-md p-6 border border-gray-200 hover:border-blue-500 transition-all cursor-pointer flex flex-col gap-2 !no-underline" >
   <div class="text-lg font-semibold text-gray-900">Note of Intent</div>
    <div class="text-sm text-gray-500">Windmill bridges the gap between no-code/low-code services and traditional programming.</div>
  </a>
</div>

## Quick Overview of Windmill

Windmill is a feature-rich platform that allows you to build endpoints, cron jobs, workflows & UIs. Each of these features can be used standalone.

However the 3 core layers of Windmill, namely Scripts, Flows and Apps are complementary. Scripts are the smallest "unit" of abstraction and workflows and UIs rely on them.

<div class="text-xl mb-2 font-semibold">Quickstarts</div>
<div class="grid grid-cols-2 gap-2 mb-4">
  <a href="/docs/getting_started/scripts_quickstart" class="rounded-md p-6 border border-gray-200 hover:border-blue-500 transition-all cursor-pointer flex flex-col gap-2 !no-underline" >
   <div class="text-lg font-semibold text-gray-900">Scripts</div>
    <div class="text-sm text-gray-500">Scripts are the basic building blocks that can be written in Typescript, Python, Go, Bash or launch docker containers.</div>
  </a>
  <a href="/docs/getting_started/flows_quickstart" class="rounded-md p-6 border border-gray-200 hover:border-teal-500 transition-all cursor-pointer flex flex-col gap-2 !no-underline" >
   <div class="text-lg font-semibold text-gray-900">Flows</div>
    <div class="text-sm text-gray-500">Flows are state machines represented as DAGs that compose steps together to build workflows and ETLs.</div>
  </a>
  <a href="/docs/getting_started/apps_quickstart" class="rounded-md p-6 border border-gray-200 hover:border-orange-500 transition-all cursor-pointer flex flex-col gap-2 !no-underline" >
   <div class="text-lg font-semibold text-gray-900">Apps</div>
    <div class="text-sm text-gray-500"> Apps are customized, user-friendly interfaces built using a drag-and-drop editor.</div>
  </a>
</div>

## Learn more about Windmill

<div class="text-xl mb-2 font-semibold"></div>
<div class="grid grid-cols-2 gap-2 mb-4">
  <a href="/docs/core_concepts/" class="rounded-md p-6 border border-gray-200 hover:border-blue-500 transition-all cursor-pointer flex flex-col gap-2 !no-underline" >
   <div class="text-lg font-semibold text-gray-900">Core Concepts</div>
    <div class="text-sm text-gray-500">The essential principles and features that underpin the platform's capabilities.</div>
  </a>
  <a href="/docs/integrations/integrations_on_windmill" class="rounded-md p-6 border border-gray-200 hover:border-blue-500 transition-all cursor-pointer flex flex-col gap-2 !no-underline" >
   <div class="text-lg font-semibold text-gray-900">Integrations</div>
    <div class="text-sm text-gray-500">Windmill provides a framework to easily add integrations.</div>
  </a>
  <a href="/docs/getting_started/trigger_scripts" class="rounded-md p-6 border border-gray-200 hover:border-blue-500 transition-all cursor-pointer flex flex-col gap-2 !no-underline" >
   <div class="text-lg font-semibold text-gray-900">Triggering Scripts</div>
    <div class="text-sm text-gray-500">Trigger flows on-demand, by schedule or on external events.</div>
  </a>
  <a href="/docs/getting_started/trigger_flows" class="rounded-md p-6 border border-gray-200 hover:border-teal-500 transition-all cursor-pointer flex flex-col gap-2 !no-underline" >
      <div class="text-lg font-semibold text-gray-900">Triggering Flows</div>
      <div class="text-sm text-gray-500">Trigger flows on-demand, by schedule or on external events.</div>
  </a>
  <a href="/docs/flows/flow_editor" class="rounded-md p-6 border border-gray-200 hover:border-teal-500 transition-all cursor-pointer flex flex-col gap-2 !no-underline" >
   <div class="text-lg font-semibold text-gray-900">Flow Editor</div>
    <div class="text-sm text-gray-500">Low-code editor to build workflows.</div>
  </a>
  <a href="/docs/apps/app_editor" class="rounded-md p-6 border border-gray-200 hover:border-orange-500 transition-all cursor-pointer flex flex-col gap-2 !no-underline" >
   <div class="text-lg font-semibold text-gray-900">App Editor</div>
    <div class="text-sm text-gray-500">Drag-and-drop editor to build apps.</div>
  </a>
</div>

## Windmill for Developers

<div class="text-xl mb-2 font-semibold"></div>
<div class="grid grid-cols-2 gap-2 mb-4">
  <a href="/docs/advanced/cli" class="rounded-md p-6 border border-gray-200 hover:border-blue-500 transition-all cursor-pointer flex flex-col gap-2 !no-underline" >
    <div class="text-lg font-semibold text-gray-900">Command-Line Interface</div>
    <div class="text-sm text-gray-500">Interact with Windmill instances right from your terminal.</div>
  </a>
  <a href="/docs/advanced/local_development" class="rounded-md p-6 border border-gray-200 hover:border-blue-500 transition-all cursor-pointer flex flex-col gap-2 !no-underline" >
    <div class="text-lg font-semibold text-gray-900">Local Development</div>
    <div class="text-sm text-gray-500">Develop from various environments such as your terminal, VSCode, and JetBrains IDEs.</div>
  </a>
  <a href="/docs/deploy_gh_gl" class="rounded-md p-6 border border-gray-200 hover:border-blue-500 transition-all cursor-pointer flex flex-col gap-2 !no-underline" >
   <div class="text-lg font-semibold text-gray-900">Deploy from GitHub/GitLab</div>
    <div class="text-sm text-gray-500">Use a GH/GL repo as source of truth for part or all of your Windmill workspace.</div>
  </a>
  <a href="/docs/advanced/docker" class="rounded-md p-6 border border-gray-200 hover:border-blue-500 transition-all cursor-pointer flex flex-col gap-2 !no-underline" >
   <div class="text-lg font-semibold text-gray-900">Run Docker Containers</div>
    <div class="text-sm text-gray-500">Windmill support running any docker container through its bash support.</div>
  </a>
</div>

## Comparisions

<div class="text-xl mb-2 font-semibold"></div>
<div class="grid grid-cols-2 gap-2 mb-4">
  <a href="/docs/misc/benchmarks" class="rounded-md p-6 border border-gray-200 hover:border-blue-500 transition-all cursor-pointer flex flex-col gap-2 !no-underline" >
   <div class="text-lg font-semibold text-gray-900">Benchmarks</div>
    <div class="text-sm text-gray-500">Windmill has about same the performance as AWS Lambda for heavier workloads, slower on cold starts for medium compute.</div>
  </a>
    <a href="/docs/misc/windmill_compared_to_peers" class="rounded-md p-6 border border-gray-200 hover:border-blue-500 transition-all cursor-pointer flex flex-col gap-2 !no-underline" >
   <div class="text-lg font-semibold text-gray-900">Windmill Compared to Peers</div>
    <div class="text-sm text-gray-500">Our subjective impression on other players you might come across.</div>
  </a>
</div>
