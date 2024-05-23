/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
	// By default, Docusaurus generates a sidebar from the docs folder structure
	tutorialSidebar: [
		{
			type: 'category',
			label: 'About Windmill',
			items: [
				'intro',
				{
					type: 'doc',
					id: 'getting_started/how_to_use_windmill/index',
					label: 'Getting Started',
				},
				{
					type: 'category',
					label: 'Tutorials',
					collapsed: false,
					items: [
						{
							type: 'category',
							label: 'Scripts',
							link: {
								type: 'doc',
								id: 'getting_started/scripts_quickstart/index'
							},
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
									id: 'getting_started/scripts_quickstart/php_quickstart/index',
									label: 'PHP'
								},
								{
									type: 'doc',
									id: 'getting_started/scripts_quickstart/sql_quickstart/index',
									label: 'SQL & Query languages'
								},
								{
									type: 'doc',
									id: 'getting_started/scripts_quickstart/rest_grapqhql_quickstart/index',
									label: 'Rest / GraphQL'
								}
							]
						},
						{
							type: 'doc',
							id: 'getting_started/flows_quickstart/index',
							label: 'Flows'
						},
						{
							type: 'doc',
							id: 'getting_started/apps_quickstart/index',
							label: 'Apps'
						},
						{
							type: 'category',
							label: 'Guides',
							items: [
								{
									type: 'doc',
									id: 'misc/guides/app_send_email_smtp/index',
									label: 'App that Sends Email with SMTP'
								},
								{
									type: 'doc',
									id: 'misc/guides/aggrid_table/index',
									label: 'AgGrid Table'
								},
								'misc/guides/table/index',
								'misc/guides/sequin/index'
							]
						}
					]
				},
				{
					type: 'category',
					label: 'Examples',
					collapsed: true,
					items: [
						{
							type: 'doc',
							id: 'getting_started/trigger_scripts/index',
							label: 'Triggering Scripts'
						},
						{
							type: 'doc',
							id: 'getting_started/trigger_flows/index',
							label: 'Triggering Flows'
						}
					]
				},
				{
					type: 'category',
					label: 'Compare',
					collapsed: true,
					items: [
						'compared_to/peers',
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
						{
							type: 'doc',
							id: 'misc/note_of_intent/index',
							label: 'Note of Intent'
						},
						{
							type: 'category',
							label: 'Benchmarks',
							items: [
								{
									type: 'doc',
									id: 'misc/benchmarks/competitors/index',
									label: 'vs Airflow vs Prefect vs Temporal'
								},
								'misc/benchmarks/aws_lambda/index'
							]
						}
					]
				},
				'misc/contributing/index'
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
				'misc/architecture/index',
				'core_concepts/auto_generated_uis/index',
				'core_concepts/json_schema_and_parsing/index',
				'core_concepts/instant_preview/index',
				'advanced/imports/index',
				'core_concepts/workflows_as_code/index',
				'core_concepts/draft_and_deploy/index',
				{
					type: 'category',
					label: 'Persistent Storage & Databases',
					link: {
						type: 'doc',
						id: 'core_concepts/persistent_storage/index'
					},
					items: [
						{
							type: 'doc',
							id: 'core_concepts/persistent_storage/within_windmill',
							label: 'Within Windmill (not recommended)'
						},
						{
							type: 'doc',
							id: 'core_concepts/persistent_storage/large_data_files',
							label: 'Object Storage for Large Data (S3)'
						},
						{
							type: 'doc',
							id: 'core_concepts/persistent_storage/structured_databases',
							label: 'Big Structured SQL Data (Postgres)'
						},
						{
							type: 'doc',
							id: 'core_concepts/persistent_storage/key_value_stores',
							label: 'NoSQL and Document Databases'
						}
					]
				},
				'core_concepts/data_pipelines/index',
				'core_concepts/roles_and_permissions/index',
				'core_concepts/authentification/index',
				'core_concepts/error_handling/index',
				'core_concepts/monitor_past_and_future_runs/index',
				'core_concepts/scheduling/index',
				'core_concepts/webhooks/index',
				'core_concepts/variables_and_secrets/index',
				'core_concepts/resources_and_types/index',
				'core_concepts/groups_and_folders/index',
				'core_concepts/worker_groups/index',
				'core_concepts/workspace_secret_encryption/index',
				'core_concepts/caching/index',
				'core_concepts/files_binary_data/index',
				'core_concepts/rich_display_rendering/index',
				'core_concepts/jobs/index',
				'core_concepts/collaboration/index',
				'core_concepts/ai_generation/index',
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
							id: 'integrations/git_repository',
							label: 'Git Repository'
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
							id: 'integrations/microsoft-azure-blob',
							label: 'Microsoft Azure Blob'
						},
						{
							type: 'doc',
							id: 'integrations/mongodb',
							label: 'MongoDB'
						},
						{
							type: 'doc',
							id: 'integrations/mssql',
							label: 'MS SQL'
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
							id: 'integrations/notion',
							label: 'Notion'
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
							id: 'integrations/raycast',
							label: 'Raycast'
						},
						{
							type: 'doc',
							id: 'integrations/redis',
							label: 'Redis'
						},
						{
							type: 'doc',
							id: 'integrations/redshift',
							label: 'Redshift'
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
							id: 'integrations/s3',
							label: 'S3 APIs'
						},
						{
							type: 'doc',
							id: 'integrations/aws-s3',
							label: 'AWS S3'
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
			],
			collapsed: true
		},
		{
			type: 'category',
			label: 'Windmill Editors Suite',
			items: [
				{
					type: 'category',
					label: 'Script Editor',
					collapsed: true,
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
						'script_editor/perpetual_scripts',
						'script_editor/custom_environment_variables',
						'script_editor/custom_response_code',
						'script_editor/multiplayer',
						'script_editor/vs_code_scripts'
					]
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
						'flows/test_flows',
						'flows/ai_flows',
						'flows/editor_components',
						'flows/error_handling',
						'flows/flow_branches',
						'flows/flow_loops',
						'flows/while_loops',
						'flows/flow_error_handler',
						'flows/flow_trigger',
						'flows/retries',
						'flows/concurrency_limit',
						'flows/custom_timeout',
						'flows/priority',
						'flows/lifetime',
						'flows/cache',
						'flows/early_stop',
						'flows/early_return',
						'flows/flow_approval',
						'flows/sleep',
						'flows/step_mocking'
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
						{
							type: 'category',
							label: 'Connecting Components',
							link: {
								type: 'doc',
								id: 'apps/connecting_components/index'
							},
							items: [
								{
									type: 'doc',
									id: 'apps/app-runnable-panel',
									label: 'Runnable Editor (Scripts & Flows)'
								},
								'apps/outputs'],
							collapsed: false
						},
						{
							type: 'category',
							label: 'Component Library',
							link: {
								type: 'doc',
								id: 'apps/app_configuration_settings/app_component_library'
							},
							items: [
								'apps/app_configuration_settings/aggrid_table',
								'apps/app_configuration_settings/agcharts',
								'apps/app_configuration_settings/alert',
								'apps/app_configuration_settings/button',
								'apps/app_configuration_settings/carousel',
								'apps/app_configuration_settings/chartjs',
								'apps/app_configuration_settings/conditional_tabs',
								'apps/app_configuration_settings/container',
								'apps/app_configuration_settings/currency_input',
								'apps/app_configuration_settings/database_studio',
								'apps/app_configuration_settings/date_input',
								'apps/app_configuration_settings/decision_tree',
								'apps/app_configuration_settings/divider_x',
								'apps/app_configuration_settings/divider_y',
								'apps/app_configuration_settings/download_button',
								'apps/app_configuration_settings/drawer',
								'apps/app_configuration_settings/dropdown_menu',
								'apps/app_configuration_settings/email_input',
								'apps/app_configuration_settings/file_input',
								'apps/app_configuration_settings/s3fileinput',
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
								'apps/app_configuration_settings/plotly',
								'apps/app_configuration_settings/range',
								'apps/app_configuration_settings/resource_select',
								'apps/app_configuration_settings/rich_result',
								'apps/app_configuration_settings/rich_text_editor',
								'apps/app_configuration_settings/select_step',
								'apps/app_configuration_settings/select_tab',
								'apps/app_configuration_settings/select',
								'apps/app_configuration_settings/sidebar_tabs',
								'apps/app_configuration_settings/slider',
								'apps/app_configuration_settings/date_slider',
								'apps/app_configuration_settings/statistic_card',
								'apps/app_configuration_settings/stepper',
								'apps/app_configuration_settings/submit_form',
								'apps/app_configuration_settings/table',
								'apps/app_configuration_settings/tabs',
								'apps/app_configuration_settings/text_input',
								'apps/app_configuration_settings/text',
								'apps/app_configuration_settings/textarea',
								'apps/app_configuration_settings/toggle',
								'apps/app_configuration_settings/vega_lite',
								'apps/app_configuration_settings/vertical_split_panes'
							]
						},
						'apps/app_configuration_settings/app_component_configuration',
						'apps/app_configuration_settings/app_styling',
						'apps/app_deployment',
						'apps/app_debugging',
						'apps/troubleshoot_panel/index',
						{
							type: 'doc',
							id: 'apps/download_files',
							label: 'Download Files'
						},
						'apps/public_apps',
						'apps/schedule_reports',
						'apps/app_configuration_settings/components_groups',
						'apps/react_components',
						'apps/default_app/index',
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
			label: 'Hosting and Advanced',
			items: [
				{
					type: 'category',
					label: 'Self Host',
					link: {
						type: 'doc',
						id: 'advanced/self_host/index'
					},
					items: ['advanced/self_host/aws_ecs']
				},
				{
					type: 'category',
					label: 'Local Development',
					collapsed: true,
					link: {
						type: 'doc',
						id: 'advanced/local_development/index'
					},
					items: [
						{
							type: 'doc',
							id: 'cli_local_dev/vscode-extension/index',
							label: 'VS Code Extension'
						},
						'advanced/local_development/run_locally'
					]
				},
				{
					type: 'category',
					label: 'Command Line Interface (CLI)',
					link: {
						type: 'doc',
						id: 'advanced/cli/index'
					},
					items: [
						'advanced/cli/installation',
						'advanced/cli/workspace-management',
						'advanced/cli/sync',
						'advanced/cli/user',
						'advanced/cli/script',
						'advanced/cli/flow',
						'advanced/cli/app',
						'advanced/cli/resource',
						'advanced/cli/variable',
						'advanced/cli/folder'
					]
				},
				{
					type: 'category',
					label: 'Version Control in Windmill',
					link: {
						type: 'doc',
						id: 'advanced/version_control/index'
					},
					items: [
						{
							type: 'doc',
							id: 'advanced/git_sync/index',
							label: 'Git Sync'
						},
						'advanced/git_sync/cli_sync'
					]
				},
				{
					type: 'category',
					label: 'Deploy to Prod',
					link: {
						type: 'doc',
						id: 'advanced/deploy_to_prod/index'
					},
					items: ['advanced/deploy_gh_gl/index', 'core_concepts/staging_prod/index'],
					collapsed: true
				},
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
				'advanced/browser_automation/index',
				'advanced/docker/index',
				'misc/setup_oauth/index',
				'advanced/sharing_common_logic/index',
				'advanced/dependencies_in_typescript/index',
				'advanced/clients/ts_client',
				'advanced/clients/python_client',
				'misc/share_on_hub/index'				
			]
		},

		{
			type: 'category',
			label: 'Enterprise Features',
			items: [
				'misc/plans_details/index',
				'misc/support_and_sla/index',
				'core_concepts/audit_logs/index',
				'misc/worker_group_management_ui/index',
				'core_concepts/concurrency_limits/index',
				'misc/s3_cache/index',
				'core_concepts/oidc/index',
				'misc/saml_and_scim/index',
				'core_concepts/dedicated_workers/index',
				'core_concepts/agent_workers/index',
				'core_concepts/content_search/index',
				'core_concepts/codebases_and_bundles/index',
				'apps/css_editor',
				'core_concepts/multiplayer/index',
				'core_concepts/private_hub/index',
				'misc/white_labelling/index',
				'misc/react_sdk/index'
			]
		}
	]
};

module.exports = sidebars;
