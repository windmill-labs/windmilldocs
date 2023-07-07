/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
	// By default, Docusaurus generates a sidebar from the docs folder structure
	tutorialSidebar: [
		{
			type: 'category',
			label: 'Getting Started',
			items: [
				'intro',
				{
					type: 'doc',
					id: 'getting_started/how_to_use_windmill/index'
				},
				{
					type: 'category',
					label: 'Scripts Quickstart',
					link: {
						type: 'doc',
						id: 'getting_started/scripts_quickstart/index'
					},
					items: [
						'getting_started/scripts_quickstart/typescript_quickstart/index',
						'getting_started/scripts_quickstart/python_quickstart/index',
						'getting_started/scripts_quickstart/go_quickstart/index',
						'getting_started/scripts_quickstart/bash_quickstart/index',
						'getting_started/scripts_quickstart/sql_quickstart/index'
					]
				},
				'getting_started/flows_quickstart/index',
				'getting_started/apps_quickstart/index',
				'getting_started/trigger_scripts/index',
				'getting_started/trigger_flows/index'
			]
		},
		{
			type: 'category',
			label: 'Core Concepts',

			items: [
				'core_concepts/auto_generated_uis/index',
				'core_concepts/json_schema_and_parsing/index',
				'advanced/imports/index',
				'core_concepts/roles_and_permissions/index',
				'core_concepts/authentification/index',
				'core_concepts/collaboration/index',
				'core_concepts/scheduling/index',
				'core_concepts/webhooks/index',
				'core_concepts/monitor_past_and_future_runs/index',
				'core_concepts/variables_and_secrets/index',
				'core_concepts/resources_and_types/index',
				'core_concepts/groups_and_folders/index',
				'core_concepts/worker_groups/index',
				'core_concepts/persistent_storage/index',
				{
					type: 'category',
					label: 'Flows concepts',
					items: [
						'core_concepts/error_handling_in_flows/index',
						'flows/sleep',
						'flows/flow_approval'
					]
				}
			],
			collapsed: false
		},
		{
			type: 'category',
			label: 'Editors Manual',
			items: [
				{
					type: 'category',
					label: 'Flow Editor',
					link: {
						type: 'doc',
						id: 'flows/flow_editor'
					},
					items: [
						'flows/editor_components',
						'flows/flow_branches',
						'flows/flow_loops',
						'flows/flow_error_handler',
						'flows/flow_trigger',
						'flows/retries',
						'flows/cache',
						'flows/step_mocking',
						'flows/early_stop',
						'flows/flow_approval',
						'flows/sleep'
					],
					collapsed: true
				},
				{
					type: 'category',
					label: 'App Editor',
					link: {
						type: 'doc',
						id: 'apps/app_editor/index'
					},
					items: [
						'apps/toolbar',
						'apps/canvas',
						'apps/outputs',
						'apps/app-runnable-panel',
						{
							type: 'category',
							label: 'Component Library & Configuration',
							link: {
								type: 'doc',
								id: 'apps/app_configuration-settings/index'
							},
							items: [
								'apps/app_configuration-settings/app_component_library',
								'apps/app_configuration-settings/app_runnable_triggers',
								'apps/app_configuration-settings/app_component_configuration',
								'apps/app_configuration-settings/app_styling'
							]
						},
						'apps/app_debugging',
						'apps/app_deployment',
						'apps/app_e-commerce'
					],

					collapsed: true
				}
			]
		},
		{
			type: 'category',
			label: 'Developer',
			items: [
				{
					type: 'category',
					label: 'Command Line Interface (wmill)',
					link: {
						type: 'doc',
						id: 'advanced/cli/index'
					},
					items: [
						'advanced/cli/installation',
						'advanced/cli/sync',
						'advanced/cli/workspace-management',
						'advanced/cli/user',
						'advanced/cli/flow',
						'advanced/cli/app',
						'advanced/cli/resource',
						'advanced/cli/variable',
						'advanced/cli/folder',
						'advanced/cli/script'
					]
				},
				'advanced/local_development/index',
				'cli_local_dev/vscode-extension/index',
				'deploy_gh_gl',
				{
					type: 'category',
					label: 'React/Vue/Svelte Apps',
					link: {
						type: 'doc',
						id: 'react_vue_svelte_apps/index'
					},
					items: [
						'react_vue_svelte_apps/react',
						'react_vue_svelte_apps/vue',
						'react_vue_svelte_apps/svelte'
					]
				},
				'advanced/self_host/index',
				'advanced/sharing_common_logic/index',
				'advanced/docker/index'
			]
		},

		{
			type: 'category',
			label: 'Enterprise Features',
			items: ['misc/plans_details/index', 'misc/support_and_sla/index', 'core_concepts/audit_logs/index', 'core_concepts/staging_prod/index', 'core_concepts/multiplayer/index']
		},
		{
			type: 'category',
			label: 'Integrations',
			items: [
				'integrations/integrations_on_windmill',
				{
					type: 'category',
					label: 'List of integrations',
					items: [
						'integrations/airtable',
						'integrations/appwrite',
						'integrations/aws',
						'integrations/aws-s3',
						'integrations/clickhouse',
						'integrations/cloudlare-r2',
						'integrations/datadog',
						'integrations/discord',
						'integrations/faunadb',
						'integrations/funkwhale',
						'integrations/gcal',
						'integrations/gcp',
						'integrations/gdrive',
						'integrations/github',
						'integrations/gitlab',
						'integrations/gmail',
						'integrations/gsheets',
						'integrations/hubspot',
						'integrations/linkding',
						'integrations/linkedin',
						'integrations/mailchimp',
						'integrations/mailchimp_mandrill',
						'integrations/mastodon',
						'integrations/matrix',
						'integrations/mongodb',
						'integrations/mysql',
						'integrations/neon',
						'integrations/openai',
						'integrations/postgresql',
						'integrations/redis',
						'integrations/rss',
						'integrations/s3',
						'integrations/sendgrid',
						'integrations/slack',
						'integrations/smtp',
						'integrations/square',
						'integrations/stripe',
						'integrations/supabase',
						'integrations/surrealdb',
						'integrations/telegram',
						'integrations/toggl',
						'integrations/upstash'
					],
					collapsed: true
				}
			]
		},
		{
			type: 'category',
			label: 'Misceallaneous',
			items: [
				'openflow/index',
				'reference/index',
				'misc/architecture/index',
				'misc/code_autocompletion/index',
				'misc/benchmarks/index',
				'misc/changelog/index',
				'misc/contributing/index',
				'core_concepts/draft_and_deploy/index',
				'misc/getting_help/index',
				{
					type: 'category',
					label: 'Guides',
					link: {
						type: 'doc',
						id: 'misc/Guides/index'
					},
					items: ['misc/Guides/AgGrid_Table/index']
				},
				'misc/note_of_intent/index',
				'misc/setup_oauth/index',
				'misc/share_on_hub/index',
				'misc/windmill_compared_to_peers/index'
			]
		}
	]
};

module.exports = sidebars;
