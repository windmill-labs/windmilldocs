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
					label: 'Scripts Quickstarts',
					link: {
						type: 'doc',
						id: 'getting_started/scripts_quickstart/index'
					},
					collapsed: false,
					items: [
						{
							type: 'doc',
							id: 'getting_started/scripts_quickstart/typescript_quickstart/index',
							label: 'TypeScript'
						},
						{
							type: 'doc',
							id: 'getting_started/scripts_quickstart/python_quickstart/index',
							label: 'Python'
						},
						{
							type: 'doc',
							id: 'getting_started/scripts_quickstart/bash_quickstart/index',
							label: 'Bash / PowerShell'
						},
						{
							type: 'doc',
							id: 'getting_started/scripts_quickstart/docker_quickstart/index',
							label: 'Docker'
						},
						{
							type: 'doc',
							id: 'getting_started/scripts_quickstart/go_quickstart/index',
							label: 'Go'
						},
						{
							type: 'doc',
							id: 'getting_started/scripts_quickstart/sql_quickstart/index',
							label: 'PgSQL / MySQL / BigQuery / Snowflake'
						},
						{
							type: 'doc',
							id: 'getting_started/scripts_quickstart/rest_grapqhql_quickstart/index',
							label: 'Rest / GraphQL'
						}
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
			label: 'Editors Manual',
			items: [
				{
					type: 'category',
					label: 'Script Editor',
					link: {
						type: 'doc',
						id: 'script_editor/index'
					},
					items: [
						'script_editor/settings',
						'script_editor/script_kinds',
						'script_editor/customize_ui',
						'script_editor/versioning',
						'script_editor/worker_group_tag',
						'script_editor/concurrency_limit',
						'script_editor/custom_environment_variables',
						'script_editor/custom_response_code',
						'script_editor/multiplayer',
						'script_editor/vs_code_scripts'
					],
					collapsed: true
				},
				{
					type: 'category',
					label: 'Flow Editor',
					link: {
						type: 'doc',
						id: 'flows/flow_editor'
					},
					items: [
						'flows/architecture',
						'openflow/index',
						'flows/editor_components',
						'flows/error_handling',
						'flows/flow_branches',
						'flows/flow_loops',
						'flows/flow_error_handler',
						'flows/flow_trigger',
						'flows/retries',
						'flows/concurrency_limit',
						'flows/cache',
						'flows/step_mocking',
						'flows/early_stop',
						'flows/flow_approval',
						'flows/sleep',
						'flows/custom_timeout'
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
						'apps/app_configuration_settings/app_styling',
						'apps/app_debugging',
						'apps/app_deployment',
						'apps/public_apps',
						{
							type: 'category',
							label: 'Component Library',
							link: {
								type: 'doc',
								id: 'apps/app_configuration_settings/app_component_library',
							},
							items: [
								'apps/app_configuration_settings/aggrid_table',
								'apps/app_configuration_settings/bar_line_chart',
								'apps/app_configuration_settings/button',
								'apps/app_configuration_settings/chartjs',
								'apps/app_configuration_settings/conditional_tabs',
								'apps/app_configuration_settings/container',
								'apps/app_configuration_settings/currency_input',
								'apps/app_configuration_settings/date_input',
								'apps/app_configuration_settings/divider_x',
								'apps/app_configuration_settings/divider_y',
								'apps/app_configuration_settings/download_button',
								'apps/app_configuration_settings/drawer',
								'apps/app_configuration_settings/email_input',
								'apps/app_configuration_settings/file_input',
								'apps/app_configuration_settings/flow_status',
								'apps/app_configuration_settings/form_input',
								'apps/app_configuration_settings/horizontal_split_panes',
								'apps/app_configuration_settings/html',
								'apps/app_configuration_settings/icon',
								'apps/app_configuration_settings/image',
								'apps/app_configuration_settings/invisible_tabs',
								'apps/app_configuration_settings/list',
								'apps/app_configuration_settings/log_display',
								'apps/app_configuration_settings/map',
								'apps/app_configuration_settings/modal_form',
								'apps/app_configuration_settings/modal',
								'apps/app_configuration_settings/multiselect',
								'apps/app_configuration_settings/number_input',
								'apps/app_configuration_settings/password_input',
								'apps/app_configuration_settings/pdf',
								'apps/app_configuration_settings/pie_chart',
								'apps/app_configuration_settings/plotly',
								'apps/app_configuration_settings/range',
								'apps/app_configuration_settings/resource_select',
								'apps/app_configuration_settings/rich_result',
								'apps/app_configuration_settings/rich_text_editor',
								'apps/app_configuration_settings/scatter_chart',
								'apps/app_configuration_settings/select_step',
								'apps/app_configuration_settings/select_tab',
								'apps/app_configuration_settings/select',
								'apps/app_configuration_settings/sidebar_tabs',
								'apps/app_configuration_settings/slider',
								'apps/app_configuration_settings/stepper',
								'apps/app_configuration_settings/submit_form',
								'apps/app_configuration_settings/table',
								'apps/app_configuration_settings/tabs',
								'apps/app_configuration_settings/text_input',
								'apps/app_configuration_settings/text',
								'apps/app_configuration_settings/textarea',
								'apps/app_configuration_settings/timeseries',
								'apps/app_configuration_settings/toggle',
								'apps/app_configuration_settings/vega_lite',
								'apps/app_configuration_settings/vertical_split_panes'
							]
						},
						'apps/app_configuration_settings/app_runnable_triggers',
						'apps/app_configuration_settings/app_component_configuration',
						'apps/app_configuration_settings/components_groups',
						'apps/app_e-commerce'
					],

					collapsed: true
				},
				{
					type: 'category',
					label: 'Code Editor',
					link: {
						type: 'doc',
						id: 'code_editor/index'
					},
					items: [
						'code_editor/parameter_inference',
						'code_editor/add_variables_resources',
						'code_editor/assistants',
						'code_editor/ai_generation'
					],
					collapsed: true
				}
			]
		},
		{
			type: 'category',
			label: 'Core Concepts',

			items: [
				{
					type: 'doc',
					id: 'core_concepts/index',
					label: 'List of Core Concepts'
				},
				'core_concepts/auto_generated_uis/index',
				'core_concepts/json_schema_and_parsing/index',
				'core_concepts/instant_preview/index',
				'advanced/imports/index',
				'core_concepts/ai_generation/index',
				'core_concepts/persistent_storage/index',
				'core_concepts/roles_and_permissions/index',
				'core_concepts/authentification/index',
				'core_concepts/error_handling/index',
				'core_concepts/collaboration/index',
				'core_concepts/monitor_past_and_future_runs/index',
				'core_concepts/scheduling/index',
				'core_concepts/webhooks/index',
				'core_concepts/variables_and_secrets/index',
				'core_concepts/resources_and_types/index',
				'core_concepts/groups_and_folders/index',
				'core_concepts/worker_groups/index',
				'core_concepts/concurrency_limits/index',
				'core_concepts/caching/index',
				'core_concepts/draft_and_deploy/index',
				'core_concepts/files_binary_data/index',
				'core_concepts/rich_display_rendering/index',
				'core_concepts/jobs/index',
			],
			collapsed: false
		},
		{
			type: 'category',
			label: 'Developer',
			items: [
				'advanced/self_host/index',
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
				'advanced/deploy_gh_gl/index',
				'advanced/local_development/index',
				'advanced/preinstall_binaries/index',
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
				'advanced/docker/index',
				'misc/setup_oauth/index',
				'advanced/sharing_common_logic/index',
				'advanced/clients/python_client',
				'advanced/clients/ts_client',

				'cli_local_dev/vscode-extension/index'
			]
		},

		{
			type: 'category',
			label: 'Enterprise Features',
			items: [
				'misc/plans_details/index',
				'misc/support_and_sla/index',
				'core_concepts/audit_logs/index',
				'core_concepts/dedicated_workers/index',
				'misc/worker_group_management_ui/index',
				'core_concepts/staging_prod/index',
				'misc/css_editor/index',
				'core_concepts/multiplayer/index',
				'misc/saml_and_scim/index',
			]
		},
		{
			type: 'category',
			label: 'Integrations',
			items: [
				'integrations/integrations_on_windmill',
				{
					type: 'category',
					label: 'List of Integrations',
					items: [
						{
							type: 'doc',
							id: 'integrations/airtable',
							label: 'Airtable'
						},
						{
							type: 'doc',
							id: 'integrations/appwrite',
							label: 'Appwrite'
						},
						{
							type: 'doc',
							id: 'integrations/aws',
							label: 'AWS'
						},
						{
							type: 'doc',
							id: 'integrations/aws-s3',
							label: 'AWS S3'
						},
						{
							type: 'doc',
							id: 'integrations/s3',
							label: 'S3 APIs'
						},
						{
							type: 'doc',
							id: 'integrations/bigquery',
							label: 'BigQuery'
						},
						{
							type: 'doc',
							id: 'integrations/clickhouse',
							label: 'ClickHouse'
						},
						{
							type: 'doc',
							id: 'integrations/cloudflare-r2',
							label: 'Cloudflare R2'
						},
						{
							type: 'doc',
							id: 'integrations/datadog',
							label: 'Datadog'
						},
						{
							type: 'doc',
							id: 'integrations/discord',
							label: 'Discord'
						},
						{
							type: 'doc',
							id: 'integrations/faunadb',
							label: 'FaunaDB'
						},
						{
							type: 'doc',
							id: 'integrations/funkwhale',
							label: 'Funkwhale'
						},
						{
							type: 'doc',
							id: 'integrations/gcal',
							label: 'Google Calendar'
						},
						{
							type: 'doc',
							id: 'integrations/gcp',
							label: 'Google Cloud Platform'
						},
						{
							type: 'doc',
							id: 'integrations/gdrive',
							label: 'Google Drive'
						},
						{
							type: 'doc',
							id: 'integrations/gmail',
							label: 'Gmail'
						},
						{
							type: 'doc',
							id: 'integrations/gsheets',
							label: 'Google Sheets'
						},
						{
							type: 'doc',
							id: 'integrations/github',
							label: 'GitHub'
						},
						{
							type: 'doc',
							id: 'integrations/gitlab',
							label: 'GitLab'
						},
						{
							type: 'doc',
							id: 'integrations/hubspot',
							label: 'HubSpot'
						},
						{
							type: 'doc',
							id: 'integrations/linkding',
							label: 'Linkding'
						},
						{
							type: 'doc',
							id: 'integrations/linkedin',
							label: 'LinkedIn'
						},
						{
							type: 'doc',
							id: 'integrations/mailchimp',
							label: 'Mailchimp'
						},
						{
							type: 'doc',
							id: 'integrations/mailchimp_mandrill',
							label: 'Mailchimp Mandrill'
						},
						{
							type: 'doc',
							id: 'integrations/mastodon',
							label: 'Mastodon'
						},
						{
							type: 'doc',
							id: 'integrations/matrix',
							label: 'Matrix'
						},
						{
							type: 'doc',
							id: 'integrations/mongodb',
							label: 'MongoDB'
						},
						{
							type: 'doc',
							id: 'integrations/mysql',
							label: 'MySQL'
						},
						{
							type: 'doc',
							id: 'integrations/neon',
							label: 'Neon.tech'
						},
						{
							type: 'doc',
							id: 'integrations/nextcloud',
							label: 'Nextcloud'
						},
						{
							type: 'doc',
							id: 'integrations/openai',
							label: 'OpenAI'
						},
						{
							type: 'doc',
							id: 'integrations/postgresql',
							label: 'PostgreSQL'
						},
						{
							type: 'doc',
							id: 'integrations/redis',
							label: 'Redis'
						},
						{
							type: 'doc',
							id: 'integrations/rss',
							label: 'RSS'
						},
						{
							type: 'doc',
							id: 'integrations/sendgrid',
							label: 'SendGrid'
						},
						{
							type: 'doc',
							id: 'integrations/slack',
							label: 'Slack'
						},
						{
							type: 'doc',
							id: 'integrations/smtp',
							label: 'SMTP'
						},
						{
							type: 'doc',
							id: 'integrations/snowflake',
							label: 'Snowflake'
						},
						{
							type: 'doc',
							id: 'integrations/square',
							label: 'Square'
						},
						{
							type: 'doc',
							id: 'integrations/stripe',
							label: 'Stripe'
						},
						{
							type: 'doc',
							id: 'integrations/supabase',
							label: 'Supabase'
						},
						{
							type: 'doc',
							id: 'integrations/surrealdb',
							label: 'SurrealDB'
						},
						{
							type: 'doc',
							id: 'integrations/telegram',
							label: 'Telegram'
						},
						{
							type: 'doc',
							id: 'integrations/toggl',
							label: 'Toggl'
						},
						{
							type: 'doc',
							id: 'integrations/upstash',
							label: 'Upstash'
						}
					],
					collapsed: true
				}
			]
		},
		{
			type: 'category',
			label: 'Windmill Compared to',
			items: [
				'compared_to/peers',
				{
					type: 'doc',
					id: 'compared_to/airplane',
					label: 'Airplane'
				},
				{
					type: 'doc',
					id: 'compared_to/retool',
					label: 'Retool'
				},
				{
					type: 'doc',
					id: 'compared_to/prefect',
					label: 'Prefect'
				},
			]
		},
		{
			type: 'category',
			label: 'Misceallaneous',
			items: [
				'misc/architecture/index',
				'misc/benchmarks/index',
				'misc/changelog/index',
				'misc/contributing/index',
				'misc/getting_help/index',
				{
					type: 'category',
					label: 'Guides',
					link: {
						type: 'doc',
						id: 'misc/guides/index'
					},
					items: [
						'misc/guides/aggrid_table/index',
						'misc/guides/table/index',
						'misc/guides/sequin/index'
					]
				},
				'misc/note_of_intent/index',
				'misc/share_on_hub/index',
				'misc/white_labelling/index',
			]
		}
	]
};

module.exports = sidebars;
