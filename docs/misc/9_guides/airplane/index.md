import DocCard from '@site/src/components/DocCard';

# Migrate from Airplane to Windmill

The migration from Airplane to Windmill is made easy by the same developer-first approach that both products adopt. The main concepts are very similar, and the vast majority of what you use in Airplane is possible in Windmill.

Windmill offers 3 months of [Enterprise Edtion](/pricing) to Airplane users. To get started, contact us at [ruben@windmill.dev](mailto:ruben@windmill.dev).

The migration from Airplane is included in the Enterprise Edition. Upon subscription, we can organize a migration session from Airplane to Windmill. We can also recreate your scripts, flows, and applications from exports and screenshots of Airplane, in collaboration with you if your instance is self-hosted. If you are interested, contact us at [ruben@windmill.dev](mailto:ruben@windmill.dev).

The following section covers the main concepts of Windmill, starting from those of Airplane. To see all the Core Concepts of Windmill, see:

<div class="grid grid-cols-2 gap-6 mb-4">
	<DocCard
		title="Core Concepts"
		description="The essential principles and features that underpin the platform's capabilities."
		href="/docs/core_concepts/"
	/>
</div>

## Self-hosting

Windmill is [open source](https://github.com/windmill-labs/windmill), and can be [self-hosted](../../../advanced/1_self_host/index.mdx) to access all of its features locally. You have the option to self-host Windmill on your own infrastructure using Docker for smaller setups or a Helm chart for larger, production use-cases.

The platform will continue to operate autonomously, even in the event of a discontinuation of the original software.

<div class="grid grid-cols-2 gap-6 mb-4">
	<DocCard
		title="Self Host Windmill"
		description="Self host Windmill in 2 minutes."
		href="/docs/advanced/self_host#authentication-and-user-management"
	/>
</div>

## Version Control & Deployments

Deploying scripts is simple in both Airplane and Windmill. Basically you write one script (”Task” in Airplane) in an environment, and then you can promote it to another environment. The main advantage you get from this process is that your script can use a [variable](../../../core_concepts/2_variables_and_secrets/index.mdx) / [resource](../../../core_concepts/3_resources_and_types/index.mdx), for example to reference a DB connection / URL, which is present in both environments but with different values.

This way you can test your script in your dev environment on a dummy DB, then once you promote it to prod, it starts running on the real data.

<div className="flex p-4 border border-gray-200 rounded-lg bg-blue-50">
  <img src="/images/airplane_emoji.png" alt="Icon" style={{ width: '20px', height: '20px' }} />
  <div>
    <h4 class="font-bold text-blue-500 dark:text-blue-500">&nbsp;Airplane</h4>
    <p class="dark:text-gray-900"><br/>In Airplane, you declare as many "Environments" as you need, and set one to be the default one. Usually the Prod one. Then for each "asset" (task or view), you manually "promote" them to your Prod environment. <br/> <br/> Effectively, this will copy the content of the script to the prod environment, nothing more.
    <br/><br/>

    
[https://docs.airplane.dev/dev-lifecycle/studio](https://docs.airplane.dev/dev-lifecycle/studio)

[https://docs.airplane.dev/dev-lifecycle/deployments](https://docs.airplane.dev/dev-lifecycle/deployments)
    
</p>

  </div>
</div>

<br/>

Windmill does not have the concept of environment per-se. Here is how you it works in Windmill.

### Deploy to Prod

Deployments in Windmill are commonly done from the same workspace using the [Draft and Deploy](../../../core_concepts/0_draft_and_deploy/index.mdx) buttons.

For finer control, you might want to deploy to a prod workspace from a staging area. Here are the options:

#### Deploy to Staging/Prod Web UI

From a workspace in Windmill, you can deploy a script/flow/resource/variable and all its dependencies to another workspace. This feature implies having at least 2 workspaces.

<video
    className="border-2 rounded-xl object-cover w-full h-full dark:border-gray-800"
    controls
    id="main-video"
    src="/videos/staging_prod.mp4"
/>

<br/>

Deploy to Staging/Prod Web UI is [Cloud plans and Self-Hosted Enterprise Edition](/pricing) only.

More details at:

<div class="grid grid-cols-2 gap-6 mb-4">
	<DocCard
		title="Draft and Deploy"
		description="Develop and cooperate in a structured way."
		href="/docs/core_concepts/draft_and_deploy"
	/>
</div>

#### Deploy to Prod using a Git Workflow

Windmill integration with Git repositories makes it possible to adopt a robust development process for your Windmill scripts, flows and apps. 

The process is as follows:
- Users iterate and make their changes in a "staging" Windmill workspace.
- Every time a Windmill App, Flow or Script is deployed to that workspace (via Windmill's UI), Windmill automatically commits it to this repo and creates one branch per app/flow/script.
- On every commit from Windmill, PRs are automatically created via a GitHub Action. Approved GitHub users can review and merge those PRs.
- Every time a PR is merged, another GitHub Action automatically deploys the change to a "production" Windmill workspace.

This gives the flexibility to fully test new Windmill scripts, flows and apps, while having them version-controlled and deployed in an automated way to the production environment.

Deploy to Prod using a Git Workflow is [Cloud plans and Self-Hosted Enterprise Edition](/pricing) only.

More details at:

<div class="grid grid-cols-2 gap-6 mb-4">
	<DocCard
		title="Deploy to Prod using a Git Workflow"
		description="Windmill integration with Git repositories makes it possible to adopt a robust development process for your Windmill scripts, flows and apps."
		href="/docs/advanced/deploy_gh_gl"
	/>
</div>

#### Using Windmill CLI in GitHub Actions

Finally, you can define your own GitHub Actions to pull Windmill workspace regularly from GitHub using [Windmill CLI](../../../advanced/3_cli/index.mdx). To automatically deploy a PR to the Windmill workspace, the [push-on-merge.yaml](https://github.com/windmill-labs/windmill-sync-example/blob/main/.github/workflows/push-on-merge.yaml) can be used.

And another GitHub Action can be created to regularly pull Windmill workspace to the GitHub repo using Windmill CLI. This action can be run on a schedule to keep the repo and the workspace in sync.

### Version Control

Manage changes to scripts workflows, apps and resources using commits & push on remote repositories.

#### Git Sync

From the workspace settings, you can set a [git_repository](../../../integrations/git_repository.mdx) resource on which the workspace will automatically commit and push scripts, flows and apps to the repository on each [deploy](../../../core_concepts/0_draft_and_deploy/index.mdx).

The first 5 minutes of this video show how to set up a Git repository for a workspace (Git Sync - workspace mode), the rest of the video shows how to use it to deploy to a Prod workspace using GitHub Actions (Git Sync - item mode):

<iframe
	style={{ aspectRatio: '16/9' }}
	src="https://www.youtube.com/embed/es8FUC2M73o?vq=hd1080"
	title="Deploy to a Prod Workspace using a Git Workflow"
	frameBorder="0"
	allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
	allowFullScreen
	className="border-2 rounded-xl object-cover w-full dark:border-gray-800"
></iframe>

<br/>

Git Sync is [Cloud plans and Self-Hosted Enterprise Edition](/pricing) only.

More details at:

<div class="grid grid-cols-2 gap-6 mb-4">
		<DocCard
			title="Git Sync"
			description="Connect the Windmill workspace to a Git repository to automatically commit and push scripts, flows and apps to the repository on each deploy."
			href="/docs/advanced/git_sync"
	/>
</div>

#### CLI Sync

You can use Windmill CLI to sync workspace to a git repository.

More details at:

<div class="grid grid-cols-2 gap-6 mb-4">
	<DocCard
		title="Command-Line Interface - Sync"
		description="Synchronize folders & git repositories to a Windmill instance"
		href="/docs/advanced/cli/sync"
	/>
</div>

## Tasks / Scripts

<div class="flex p-4 border border-gray-200 rounded-lg bg-blue-50">
  <img src="/images/airplane_emoji.png" alt="Icon" style={{ width: '20px', height: '20px' }} />
  <div>
    <h4 class="font-bold text-blue-500 dark:text-blue-500">&nbsp;Airplane</h4>
    <p class="dark:text-gray-900"><br/>Tasks are functions that anyone on your team can execute. A task can be a SQL query, custom TypeScript/JavaScript/Python, or even a wrapper around a REST API call. Users can execute tasks through a simple Airplane-generated UI, complete with rich components and validation.

<br/><br/>


[https://docs.airplane.dev/getting-started/tasks](https://docs.airplane.dev/getting-started/tasks)
    
</p>

  </div>
</div>

<br/>

Windmill’s equivalent of Tasks are Scripts. Scripts are the basis of all major features (they are the steps of [flows](../../../flows/1_flow_editor.mdx), [linked to apps components](../../../apps/3_app-runnable-panel.mdx), or can be [run as standalone](../../../getting_started/8_trigger_scripts/index.mdx)).

A Script can be written in: [TypeScript (Deno & Bun)](https://www.windmill.dev/docs/getting_started/scripts_quickstart/typescript), [Python](https://www.windmill.dev/docs/getting_started/scripts_quickstart/python), [Go](https://www.windmill.dev/docs/getting_started/scripts_quickstart/go), [Bash](https://www.windmill.dev/docs/getting_started/scripts_quickstart/bash) or [SQL](https://www.windmill.dev/docs/getting_started/scripts_quickstart/sql). Its two most important components are the input [JSON Schema](https://www.windmill.dev/docs/core_concepts/json_schema_and_parsing) specification and the [code content](https://www.windmill.dev/docs/code_editor).

Scripts in Windmill must fit Windmill's execution model: a main function with typed parameters used to infer the script's inputs in an [autogenerated UI](https://www.windmill.dev/docs/core_concepts/auto_generated_uis).

Scripts can are created from within Windmill app (cloud or self-hosted). Then can be modified and tested [from the platform](https://www.windmill.dev/docs/getting_started/scripts_quickstart) or [VS Code](https://www.windmill.dev/docs/cli_local_dev/vscode-extension).

<!-- Video on how to migrate a scheduled Task in Airplane to Windmill -->

<div class="grid grid-cols-2 gap-6 mb-4">
	<DocCard
		title="Script Editor"
		description="Scripts are the basic building blocks that can be written in Typescript, Python, Go, Bash, SQL or launch docker containers."
		href="/docs/script_editor"
	/>
    <DocCard
		title="Scripts Quickstart"
		description="Start writing scripts in Python, TypeScript, Go, Bash and Sql."
		href="/docs/getting_started/scripts_quickstart"
	/>
</div>

## Schedules

<div class="flex p-4 border border-gray-200 rounded-lg bg-blue-50">
  <img src="/images/airplane_emoji.png" alt="Icon" style={{ width: '20px', height: '20px' }} />
  <div>
    <h4 class="font-bold text-blue-500 dark:text-blue-500">&nbsp;Airplane</h4>
    <p class="dark:text-gray-900"><br/>Schedules allow you to automatically run tasks on a recurring cadence using CRON expressions.
    <br/><br/>

    
[https://docs.airplane.dev/tasks/schedules](https://docs.airplane.dev/tasks/schedules)

</p>

  </div>
</div>

<br/>

Just like Airplane, Windmill provides [schedules](https://www.windmill.dev/docs/core_concepts/scheduling) that allow to run scripts & flows at a given frequency, just like CRON but with a user interface and control panels.

Schedules are set from the UI, either directly from the scripts and flow settings, or from a dedicated Schedules menu in Windmill platform. For each schedule, the flow or script’s arguments are filled. 

<!-- Picture of schedule within script & flow -->
<!-- Picture of schedule menu -->

All schedules can be attached to a custom Error Handler (or [workspace error handler](https://www.windmill.dev/docs/core_concepts/error_handling#workspace-error-handler)) and Recovery Handler for when the schedule was successful again. Also, Retries can be set for every schedule, they allow to retry execution upon error, either at constant or exponential intervals.

<div class="grid grid-cols-2 gap-6 mb-4">
	<DocCard
		title="Schedules"
		description="Scheduling allows you to define schedules for Scripts and Flows, automatically running them at set frequencies."
		href="/docs/core_concepts/scheduling"
	/>
</div>

## Permissions & RBAC

<div class="flex p-4 border border-gray-200 rounded-lg bg-blue-50">
  <img src="/images/airplane_emoji.png" alt="Icon" style={{ width: '20px', height: '20px' }} />
  <div>
    <h4 class="font-bold text-blue-500 dark:text-blue-500">&nbsp;Airplane</h4>
    <p class="dark:text-gray-900"><br/>

Airplane's permissioning system allows for fine-grained, role-based access control using [groups](https://docs.airplane.dev/platform/groups) and [roles](https://docs.airplane.dev/platform/team-roles).

<br/>

    
[https://docs.airplane.dev/platform/permissions](https://docs.airplane.dev/platform/permissions)

</p>

  </div>
</div>

<br/>

Windmill provides a very similar comprehensive roles and permissions system that allows you to manage access within your Windmill instance and workspaces. Here is how permissions work in Windmill:

1. **Users**: Users are identified by their email and have unique usernames within each workspace they belong to.
2. **Workspace**: Each entity in Windmill, including users, belongs to a workspace. Workspaces are partitioned in Windmill's database to prevent data leakage. A user who creates a workspace becomes its admin and can invite others .
3. **[Roles in Windmill](https://www.windmill.dev/docs/core_concepts/roles_and_permissions)**: Users can have different permission levels:
    - **Superadmin**: Has the highest level of access, managing the entire Windmill instance and all workspaces by default .
    - **Admin**: At the workspace level, they manage specific workspaces and all entities within. At the folder level, they manage access and permissions for folder contents .
    - **Developer**: Can execute, view, and create/edit scripts, flows, and apps within a workspace.
    - **Operator**: Limited access to execute and view scripts, flows, and apps within their allowed paths or folders .
    - **Anonymous app viewers**: Can view Windmill apps without being a user if they have the secret URL but cannot execute scripts and flows .
4. **[Permissions and Access Control](https://www.windmill.dev/docs/core_concepts/roles_and_permissions#permissions-and-access-control)**: Windmill uses an Access Control List (ACL) for fine-grained permissions. Admins, Writers, and Viewers have varying access levels to entities, and ACLs are defined by the item's path, which includes user space and folders .
5. **[Groups and Folders](https://www.windmill.dev/docs/core_concepts/groups_and_folders)**: [Groups](https://www.windmill.dev/docs/core_concepts/groups_and_folders#groups) classify users with shared permissions, while [Folders](https://www.windmill.dev/docs/core_concepts/groups_and_folders#folders) group items and assign role-based access. Groups can be included within folders to manage access control efficiently.

<div class="grid grid-cols-2 gap-6 mb-4">
	<DocCard
		title="Roles and Permissions"
		description="Find out about the roles within a Windmill instance and their respective permissions."
		href="/docs/core_concepts/roles_and_permissions"
	/>
    <DocCard
		title="Authentification"
		description="Windmill provides flexible authentication options to ensure secure access to the platform."
		href="/docs/core_concepts/authentification"
	/>
    <DocCard
		title="Groups and Folders"
		description="Groups and Folders enable efficient permission management by grouping users with similar access levels."
		href="/docs/core_concepts/groups_and_folders"
	/>
</div>

## Workflows

<div class="flex p-4 border border-gray-200 rounded-lg bg-blue-50">
  <img src="/images/airplane_emoji.png" alt="Icon" style={{ width: '20px', height: '20px' }} />
  <div>
    <h4 class="font-bold text-blue-500 dark:text-blue-500">&nbsp;Airplane</h4>
    <p class="dark:text-gray-900"><br/>Airplane Tasks make it possible to orchestrate processes that span multiple steps and engage with human operators, thanks to execution of tasks from within other tasks.
    <br/><br/>

    
[https://docs.airplane.dev/getting-started/orchestration](https://docs.airplane.dev/getting-started/orchestration)

</p>

  </div>
</div>

<br/>


Windmill embeds a native way to create workflows, in the form of [DAGs](https://en.wikipedia.org/wiki/Directed_acyclic_graph) (Directed Acyclic Graphs) that represent [dependencies between steps](https://www.windmill.dev/docs/flows/architecture) in the [OpenFlow](https://www.windmill.dev/docs/openflow) format.

The Windmill [Flow Editor](https://www.windmill.dev/docs/flows/flow_editor) is designed as a low-code builder that allows orchestrating scripts (fetched from the workspace or [WindmillHub](https://hub.windmill.dev/), or written directly inline) with [branches](https://www.windmill.dev/docs/flows/flow_branches) or [for loops](https://www.windmill.dev/docs/flows/flow_loops), and adding configurations to each step or at the flow-level ([human-in-the-loop](https://www.windmill.dev/docs/flows/flow_approval), [retries](https://www.windmill.dev/docs/flows/retries), [cache](https://www.windmill.dev/docs/flows/cache), [concurrency limits](https://www.windmill.dev/docs/flows/concurrency_limit), [error handling](https://www.windmill.dev/docs/flows/flow_error_handler), etc.).

From that, can orchestrate any script together, from a simple [SQL query](https://www.windmill.dev/docs/getting_started/scripts_quickstart/sql) to [sending Slack](https://hub.windmill.dev/scripts/slack/1284/send-message-to-channel-slack) or [Email](https://hub.windmill.dev/scripts/smtp/1318/send-email-smtp) messages, or any type of code [interacting with APIs](https://www.windmill.dev/docs/integrations/integrations_on_windmill).

It is also possible to define the flows as code in YAML through the [VS Code extension](https://www.windmill.dev/docs/cli_local_dev/vscode-extension).

<!-- Video on how to migrate a flow in Airplane to Windmill -->

<div class="grid grid-cols-2 gap-6 mb-4">
	<DocCard
		title="Flow Editor"
		description="Detailed section on Windmill's Flow Editor."
		href="/docs/flows/flow_editor"
	/>
    <DocCard
		title="Flows Quickstart"
		description="Learn how to build flows."
		href="/docs/getting_started/flows_quickstart"
	/>
</div>

## Approval flows & Prompts

<div class="flex p-4 border border-gray-200 rounded-lg bg-blue-50">
  <img src="/images/airplane_emoji.png" alt="Icon" style={{ width: '20px', height: '20px' }} />
  <div>
    <h4 class="font-bold text-blue-500 dark:text-blue-500">&nbsp;Airplane</h4>
    <p class="dark:text-gray-900"><br/>Airplane used prompts to gather input from operators through parameter forms. Approvals can be made conditional by wrapping them in an `if` clause to the prompt reviewer.
    <br/><br/>

    
[https://docs.airplane.dev/tasks/prompts](https://docs.airplane.dev/tasks/prompts)
[https://docs.airplane.dev/tasks/approvals](https://docs.airplane.dev/tasks/approvals)

</p>

  </div>
</div>

<br/>

For approval flows, Windmill uses [Approval Steps](/docs/flows/flow_approval) that will suspend the execution of a flow until it has been approved through the resume endpoints or the approval page by and solely by the recipients of the secret urls.

You can then have a [Windmill equivalent of prompts](/docs/flows/flow_approval#prompts) with a custom form to your approval step that the UI shows to operators when running:

<video
    className="border-2 rounded-xl object-cover w-full h-full"
    controls
    src="/videos/prompt_example.mp4"
/>

<br/>

<div class="grid grid-cols-2 gap-6 mb-4">
	<DocCard
		title="Suspend & Approval / Prompts"
		description="Flows can be suspended until resumed or cancelled event(s) are received"
		href="/docs/flows/flow_approval"
	/>
</div>

## Custom UIs

<div class="flex p-4 border border-gray-200 rounded-lg bg-blue-50">
  <img src="/images/airplane_emoji.png" alt="Icon" style={{ width: '20px', height: '20px' }} />
  <div>
    <h4 class="font-bold text-blue-500 dark:text-blue-500">&nbsp;Airplane</h4>
    <p class="dark:text-gray-900"><br/>Airplane developed Views, which is a React component library that integrates with other Airplane features.
    <br/><br/>Views are defined as code.
    <br/><br/>

    
[https://docs.airplane.dev/views/overview](https://docs.airplane.dev/views/overview)

</p>

  </div>
</div>

<br/>

Windmill also allows for the creation of customized UIs to build internal dashboards, customer-facing apps, etc. Windmill adopts a different approach as the UIs are created in the [App Editor](https://www.windmill.dev/docs/apps/app_editor), a low-code drag-and-drop builder.

The user can pick from a [library of over 60 components](https://www.windmill.dev/docs/apps/app_configuration_settings/app_component_library) and [link them to custom code](https://www.windmill.dev/docs/apps/connecting_components) (scripts in [all covered languages](https://www.windmill.dev/docs/getting_started/scripts_quickstart) or flows).

Users can also [create their own React components](https://www.windmill.dev/docs/apps/react_components) that integrate with the rest of the application. It is also possible to [import your own applications in React, Vue, or Svelte](https://www.windmill.dev/docs/react_vue_svelte_apps/react) and have them interact with all your Windmill elements.

<!-- Video on how to migrate a View in Airplane to Windmill -->

<div class="grid grid-cols-2 gap-6 mb-4">
	<DocCard
		title="Apps"
		description="Apps are customized, user-friendly interfaces built using a drag-and-drop editor."
		href="/docs/getting_started/apps_quickstart"
	/>
     <DocCard
        title="Apps Quickstart"
        description="Learn how to build your first app in a matter of minutes."
        href="/docs/getting_started/apps_quickstart"
    />
    <DocCard
		title="Auto-generated UIs"
		description="Windmill creates auto-generated user interfaces for scripts and flows based on their parameters."
		href="/docs/core_concepts/auto_generated_uis"
	/>
</div>


## Connecting your data

<div class="flex p-4 border border-gray-200 rounded-lg bg-blue-50">
  <img src="/images/airplane_emoji.png" alt="Icon" style={{ width: '20px', height: '20px' }} />
  <div>
    <h4 class="font-bold text-blue-500 dark:text-blue-500">&nbsp;Airplane</h4>
    <p class="dark:text-gray-900"><br/>Airplane uses Resources that allow you to easily configure connections to external systems like databases and APIs and use them in your tasks and runbooks.
    <br/><br/>

    
[https://docs.airplane.dev/resources/overview](https://docs.airplane.dev/resources/overview)

<br/>Secrets are managed through config variables that are stored encrypted at rest.

<br/><br/>

[https://docs.airplane.dev/platform/configs](https://docs.airplane.dev/platform/configs)

</p>

  </div>
</div>

<br/>

Windmill employs the exact same concept of [Resources](https://www.windmill.dev/docs/core_concepts/resources_and_types), which are essentially rich objects in JSON that allow for the storage of configuration and credentials. Each Resource has a Resource Type that defines the schema the resource of this type needs to implement. Schemas implement the [JSON Schema specification](https://json-schema.org/).

The platform contains more than [70 integrations](https://www.windmill.dev/docs/integrations/integrations_on_windmill) created by the community on [WindmillHub](https://hub.windmill.dev/) and approved by the Windmill team. It is very easy to [create your own Resource Types](https://www.windmill.dev/docs/core_concepts/resources_and_types#create-a-resource-type) to interact with new external systems.

Just like Airplane, secrets are handled with [Variables](https://www.windmill.dev/docs/core_concepts/variables_and_secrets). Variables are dynamic values that have a key associated to them and can be retrieved during the execution of a Script or Flow. All Variables (not just secrets) are encrypted with a workspace specific symmetric key to avoid leakage. There are two types of Variables in Windmill: [user-defined](https://www.windmill.dev/docs/core_concepts/variables_and_secrets#user-defined-variables) and [contextual](https://www.windmill.dev/docs/core_concepts/variables_and_secrets#contextual-variables).

Resources can embed variables, for example creating a new [PostgreSQL resource](https://hub.windmill.dev/resource_types/114/postgresql) will create for field password a variable found at the same path.

<div class="grid grid-cols-2 gap-6 mb-4">
	<DocCard
		title="Resources"
		description="Resources are rich objects in JSON that allow to store configuration and credentials."
		href="/docs/core_concepts/resources_and_types"
	/>
    <DocCard
		title="Variables and Secrets"
		description="Variables and Secrets are encrypted, dynamic values used for reusing information and securely passing sensitive data within scripts."
		href="/docs/core_concepts/variables_and_secrets"
	/>
    <DocCard
		title="Integrations"
		description="Windmill provides a framework to easily add integrations."
		href="/docs/integrations/integrations_on_windmill"
	/>
</div>

## Auditing & Observability

<div class="flex p-4 border border-gray-200 rounded-lg bg-blue-50">
  <img src="/images/airplane_emoji.png" alt="Icon" style={{ width: '20px', height: '20px' }} />
  <div>
    <h4 class="font-bold text-blue-500 dark:text-blue-500">&nbsp;Airplane</h4>
    <p class="dark:text-gray-900"><br/>Task executions (runs), changes to resources, changes to team members, and other important events are captured in Airplane's audit log, accessible from Airplane’s Activity page.
    <br/><br/>

    
[https://docs.airplane.dev/platform/audit-logs](https://docs.airplane.dev/platform/audit-logs)

</p>

  </div>
</div>

<br/>

Windmill provides 2 ways to monitor activity.

[**Runs Menu**](https://www.windmill.dev/docs/core_concepts/monitor_past_and_future_runs) that allows to visualise all past, current and future (scheduled) runs with filters (datetime, user, status, argument, results, etc.)

[**Audit Logs**](https://www.windmill.dev/docs/core_concepts/audit_logs) provided for every operation and action that has side-effects. These logs capture the user responsible for the operation and include metadata specific to the type of operation.

By the end of January, Windmill will also support streaming logs to log management services (Datadog, Splunk, AWS CloudWatch etc.)

<div class="grid grid-cols-2 gap-6 mb-4">
    <DocCard
    	title="Monitor Past and Future Runs"
    	description="Get an aggregated view of past and future runs on your workspace."
    	href="/docs/core_concepts/monitor_past_and_future_runs"
    />
    <DocCard
    	title="Audit Logs"
    	description="Windmill provides audit logs for every operation and action that has side-effects."
    	href="/docs/core_concepts/audit_logs"
    />
</div>

## Routing jobs to different VPC / Worker Groups / Queues / Tags

<div class="flex p-4 border border-gray-200 rounded-lg bg-blue-50">
  <img src="/images/airplane_emoji.png" alt="Icon" style={{ width: '20px', height: '20px' }} />
  <div>
    <h4 class="font-bold text-blue-500 dark:text-blue-500">&nbsp;Airplane</h4>
    <p class="dark:text-gray-900"><br/>
    
In Airplane it is possible to assign jobs to a given VPC using [run constraints](https://docs.airplane.dev/platform/execute-rules#run-constraints).
    <br/><br/>

    
[https://docs.airplane.dev/platform/execute-rules#run-constraints](https://docs.airplane.dev/platform/execute-rules#run-constraints)

</p>

  </div>
</div>

<br/>

In Windmill, there is a concept of [Worker groups](https://www.windmill.dev/docs/core_concepts/worker_groups) and tags which correspond to queues. Worker groups are assigned to listen to those different queues.

Tags are assigned to scripts but they can also be dynamically overriden by API or in the UI when the script is executed:

The tag can also be dynamic (tag-$workspace) where $workspace is replaced with the workspace_id so that one can define one worker group that listen to ‘tag-prod’ and another to ‘tag-staging’ even though it is the same tag that is assigned to the script but on different workspaces.


<div class="grid grid-cols-2 gap-6 mb-4">
    <DocCard
    	title="Workers and Worker Groups"
    	description="Worker Groups allow users to run scripts and flows on different machines with varying specifications."
    	href="/docs/core_concepts/worker_groups"
    />
</div>

## Tutorials

### Migrate from Airplane a Scheduled Script Using Secrets

Airplane Tasks have their equivalent in Windmill Scripts. They can be built from the [Script Editor](../../../script_editor/index.mdx) or from [VS Code](../../../cli_local_dev/1_vscode-extension/index.mdx).

[This tutorial](https://www.youtube.com/watch?v=--ZyfCHvvWo) covers how to migrate from Airplane to Windmill a [scheduled](../../../core_concepts/1_scheduling/index.mdx) script connected to Discord using [resources](../../../core_concepts/3_resources_and_types/index.mdx) and [variables](../../../core_concepts/2_variables_and_secrets/index.mdx).

<iframe
	style={{ aspectRatio: '16/9' }}
	src="https://www.youtube.com/embed/--ZyfCHvvWo?vq=hd1080"
	title="Migrate from Airplane a Scheduled Script Using Secrets"
	frameBorder="0"
	allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
	allowFullScreen
	className="border-2 rounded-xl object-cover w-full dark:border-gray-800"
></iframe>

### Migrate an Airplane View to Windmill and Make it an App

In Airplane, views are custom UIs made in react. [This tutorial](https://www.youtube.com/watch?v=jncbSnVZGsU) covers from an Airplane View how to build the equivalent App using Windmill low-code [App Editor](../../../apps/0_app_editor/index.mdx).

<iframe
	style={{ aspectRatio: '16/9' }}
	src="https://www.youtube.com/embed/jncbSnVZGsU?vq=hd1080"
	title="Migrate an Airplane View to Windmill and Make it an App"
	frameBorder="0"
	allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
	allowFullScreen
	className="border-2 rounded-xl object-cover w-full dark:border-gray-800"
></iframe>