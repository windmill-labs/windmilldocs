import React from 'react';
import { Check } from 'lucide-react';
import classNames from 'classnames';

export const sections = [
	{
		name: 'Platform',
		attributes: [
			{
				name: 'Executions per month',
				tiers: {
					'tier-free-selfhost': 'Unlimited',
					'tier-enterprise-selfhost': 'Unlimited',
					'tier-enterprise-cloud': 'Unlimited',
					'tier-free': '1,000',
					'tier-team': '10k per user'
				}
			},
			{
				name: 'Number of workspaces',
				tiers: {
					'tier-free-selfhost': '3',
					'tier-enterprise-selfhost': 'Unlimited',
					'tier-enterprise-cloud': 'Unlimited',
					'tier-free': 'Unlimited',
					'tier-team': 'Plan is at workspace level'
				}
			},
			{
				name: 'Maximum number of users',
				tiers: {
					'tier-free-selfhost': '50',
					'tier-enterprise-selfhost': 'Unlimited',
					'tier-enterprise-cloud': 'Unlimited',
					'tier-free': 'Unlimited unless abuse',
					'tier-team': '10'
				}
			},
			{
				name: 'Variables, resources, scripts, apps, flows',
				tiers: {
					'tier-free-selfhost': 'Unlimited',
					'tier-enterprise-selfhost': 'Unlimited',
					'tier-enterprise-cloud': 'Unlimited',
					'tier-free': 'Unlimited unless abuse',
					'tier-team': 'Unlimited'
				}
			},
			{
				name: 'Groups, folders and granular permissions',
				tiers: {
					'tier-free-selfhost': 'Maximum 4 groups',
					'tier-enterprise-selfhost': 'Unlimited',
					'tier-enterprise-cloud': 'Unlimited',
					'tier-free': 'Unlimited',
					'tier-team': 'Unlimited'
				},
				link: '/docs/core_concepts/roles_and_permissions'
			},
			{
				name: 'All open source features',
				tiers: {
					'tier-free-selfhost': true,
					'tier-enterprise-selfhost': true,
					'tier-enterprise-cloud': true,
					'tier-free': true,
					'tier-team': true
				},
				link: '/docs/core_concepts'
			},
			{
				name: 'Public apps',
				tiers: {
					'tier-free-selfhost': true,
					'tier-enterprise-selfhost': true,
					'tier-enterprise-cloud': true,
					'tier-free': true,
					'tier-team': true
				},
				link: '/docs/apps/public_apps'
			},
			{
				name: 'BigQuery, Snowflake, Oracle DB and MS SQL runtimes as languages',
				tiers: {
					'tier-free-selfhost': false,
					'tier-enterprise-selfhost': true,
					'tier-enterprise-cloud': true,
					'tier-free': true,
					'tier-team': true
				},
				link: '/docs/getting_started/scripts_quickstart/sql'
			},
			{
				name: 'Multiplayer on WebIDE',
				tiers: {
					'tier-free-selfhost': false,
					'tier-enterprise-selfhost': true,
					'tier-enterprise-cloud': true,
					'tier-free': true,
					'tier-team': true
				},
				link: '/docs/core_concepts/multiplayer'
			},
			{
				name: 'Content search',
				tiers: {
					'tier-free-selfhost': false,
					'tier-enterprise-selfhost': true,
					'tier-enterprise-cloud': true,
					'tier-free': true,
					'tier-team': true
				},
				link: '/docs/core_concepts/content_search'
			},
			{
				name: 'Workspace object storage (>50mb upload)',
				tiers: {
					'tier-free-selfhost': false,
					'tier-enterprise-selfhost': true,
					'tier-enterprise-cloud': true,
					'tier-free': true,
					'tier-team': true
				},
				link: '/docs/core_concepts/object_storage_in_windmill'
			},
			{
				name: 'Email triggers',
				tiers: {
					'tier-free-selfhost': 'Max 100 emails per day',
					'tier-enterprise-selfhost': 'Unlimited',
					'tier-enterprise-cloud': 'Unlimited',
					'tier-free': 'Unlimited',
					'tier-team': 'Unlimited'
				},
				link: '/docs/advanced/email_triggers'
			},
			{
				name: 'Postgres triggers',
				tiers: {
					'tier-free-selfhost': true,
					'tier-enterprise-selfhost': true,
					'tier-enterprise-cloud': true,
					'tier-free': false,
					'tier-team': false
				},
				link: '/docs/core_concepts/postgres_triggers',
			},
			{
				name: 'WebSocket triggers',
				tiers: {
					'tier-free-selfhost': true,
					'tier-enterprise-selfhost': true,
					'tier-enterprise-cloud': true,
					'tier-free': false,
					'tier-team': false
				},
				link: '/docs/core_concepts/websocket_triggers',
			},
			{
				name: 'Postgres triggers',
				tiers: {
					'tier-free-selfhost': true,
					'tier-enterprise-selfhost': true,
					'tier-enterprise-cloud': true,
					'tier-free': false,
					'tier-team': false
				},
				link: '/docs/core_concepts/postgres_triggers',
				tooltip: 'Self-hosted only'
			},
			{
				name: 'MQTT triggers',
				tiers: {
					'tier-free-selfhost': true,
					'tier-enterprise-selfhost': true,
					'tier-enterprise-cloud': true,
					'tier-free': false,
					'tier-team': false
				},
				link: '/docs/core_concepts/mqtt_triggers',
				tooltip: 'Self-hosted only'
			},
			{
				name: 'Kafka triggers',
				tiers: {
					'tier-free-selfhost': false,
					'tier-enterprise-selfhost': true,
					'tier-enterprise-cloud': true,
					'tier-free': false,
					'tier-team': false
				},
				link: '/docs/core_concepts/kafka_triggers',
			},
			{
				name: 'NATS triggers',
				tiers: {
					'tier-free-selfhost': false,
					'tier-enterprise-selfhost': true,
					'tier-enterprise-cloud': true,
					'tier-free': false,
					'tier-team': false
				},
				link: '/docs/core_concepts/nats_triggers',
			},
			{
				name: 'SQS triggers',
				tiers: {
					'tier-free-selfhost': false,
					'tier-enterprise-selfhost': true,
					'tier-enterprise-cloud': true,
					'tier-free': false,
					'tier-team': false
				},
				link: '/docs/core_concepts/sqs_triggers',
			},
			{
				name: 'GCP triggers',
				tiers: {
					'tier-free-selfhost': false,
					'tier-enterprise-selfhost': true,
					'tier-enterprise-cloud': true,
					'tier-free': false,
					'tier-team': false
				},
				link: '/docs/core_concepts/gcp_triggers',
			},
			{
				name: 'Private Hub',
				tiers: {
					'tier-free-selfhost': false,
					'tier-enterprise-selfhost': true,
					'tier-enterprise-cloud': true,
					'tier-free': false,
					'tier-team': false
				},
				link: '/docs/core_concepts/private_hub'
			},
			{
				name: 'Commercial licence',
				tiers: {
					'tier-free-selfhost': false,
					'tier-enterprise-selfhost': true,
					'tier-enterprise-cloud': true,
					'tier-free': false,
					'tier-team': false
				}
			}
		]
	},
	{
		name: 'Security & Support',
		attributes: [
			{
				name: 'Number of users with SSO',
				tiers: {
					'tier-free-selfhost': '10',
					'tier-enterprise-selfhost': 'Uncapped (requires seats)',
					'tier-enterprise-cloud': 'Uncapped (requires seats)',
					'tier-free': '10',
					'tier-team': '10 (requires seats)'
				},
				link: '/docs/core_concepts/authentification'
			},
			{
				name: 'Workspace secret custom encryption',
				tiers: {
					'tier-free-selfhost': true,
					'tier-enterprise-selfhost': true,
					'tier-enterprise-cloud': true,
					'tier-free': true,
					'tier-team': true
				},
				link: '/docs/core_concepts/workspace_secret_encryption'
			},
			{
				name: 'Custom OAuth',
				tiers: {
					'tier-free-selfhost': false,
					'tier-enterprise-selfhost': true,
					'tier-enterprise-cloud': true,
					'tier-free': false,
					'tier-team': false
				},
				link: '/docs/misc/setup_oauth#custom-oauth-1'
			},
			{
				name: 'SAML & SCIM support including groups synchronization',
				tiers: {
					'tier-free-selfhost': false,
					'tier-enterprise-selfhost': true,
					'tier-enterprise-cloud': true,
					'tier-free': false,
					'tier-team': false
				},
				link: '/docs/misc/saml_and_scim'
			},
			{
				name: 'External auth with JWT',
				tiers: {
					'tier-free-selfhost': false,
					'tier-enterprise-selfhost': true,
					'tier-enterprise-cloud': true,
					'tier-free': false,
					'tier-team': false
				},
				link: '/docs/advanced/external_auth_with_jwt'
			},
			{
				name: 'Support level',
				tiers: {
					'tier-free-selfhost': 'Community support on Discord',
					'tier-enterprise-selfhost':
						'24/7 Priority support with 3h response and dedicated Slack channel',
					'tier-enterprise-cloud': '24/7 Priority support with 3h response and dedicated Slack',
					'tier-free': 'Community support on Discord',
					'tier-team': 'Priority support on Discord'
				},
				link: '/docs/misc/support_and_sla'
			},
			{
				name: 'SOC 2 Type II report',
				tiers: {
					'tier-enterprise-selfhost': true,
					'tier-enterprise-cloud': true
				},
				link: '/docs/misc/support_and_sla#security'
			},
			{
				name: 'Design partners for roadmap',
				tiers: {
					'tier-free-selfhost': false,
					'tier-enterprise-selfhost': true,
					'tier-enterprise-cloud': true,
					'tier-free': false,
					'tier-team': false
				}
			}
		]
	},
	{
		name: 'Observability',
		attributes: [
			{
				name: 'Audit logs',
				tiers: {
					'tier-free-selfhost': false,
					'tier-enterprise-selfhost': 'Unlimited',
					'tier-enterprise-cloud': 'Unlimited',
					'tier-free': true,
					'tier-team': 'Retained for 7 days'
				},
				link: '/docs/core_concepts/audit_logs'
			},
			{
				name: 'Retention period of jobs runs details',
				tiers: {
					'tier-free-selfhost': '<= 30 days',
					'tier-enterprise-selfhost': 'Unlimited',
					'tier-enterprise-cloud': 'Unlimited',
					'tier-free': '60 days',
					'tier-team': '60 days'
				},
				link: '/docs/core_concepts/scheduling#schedule-error-handler'
			},
			{
				name: 'Schedule error handler',
				tiers: {
					'tier-free-selfhost': false,
					'tier-enterprise-selfhost': true,
					'tier-enterprise-cloud': true,
					'tier-free': true,
					'tier-team': true
				},
				link: '/docs/core_concepts/error_handling'
			},
			{
				name: 'Workspace error handler',
				tiers: {
					'tier-free-selfhost': false,
					'tier-enterprise-selfhost': true,
					'tier-enterprise-cloud': true,
					'tier-free': true,
					'tier-team': true
				},
				link: '/docs/core_concepts/error_handling'
			},
			{
				name: 'Queue metrics',
				tiers: {
					'tier-free-selfhost': false,
					'tier-enterprise-selfhost': true,
					'tier-enterprise-cloud': true,
					'tier-free': false,
					'tier-team': false
				},
				link: '/docs/core_concepts/worker_groups#queue-metrics'
			},
			{
				name: 'Prometheus metrics',
				tiers: {
					'tier-free-selfhost': false,
					'tier-enterprise-selfhost': true,
					'tier-enterprise-cloud': true,
					'tier-free': false,
					'tier-team': false
				}
			}
		]
	},
	{
		name: 'Developers & Deployments',
		attributes: [
			{
				name: 'Deployment on Fargate / Docker / Kubernetes',
				tiers: {
					'tier-free-selfhost': true,
					'tier-enterprise-selfhost': true,
					'tier-enterprise-cloud': false,
					'tier-free': false,
					'tier-team': false
				},
				link: '/docs/advanced/self_host',
				tooltip: 'Self-hosted only'
			},
			{
				name: 'Isolated & dedicated workers and database',
				tiers: {
					'tier-free-selfhost': false,
					'tier-enterprise-selfhost': false,
					'tier-enterprise-cloud': true,
					'tier-free': false,
					'tier-team': false
				},
				tooltip: 'Cloud only'
			},
			{
				name: 'Deploy from GitHub',
				tiers: {
					'tier-free-selfhost': true,
					'tier-enterprise-selfhost': true,
					'tier-enterprise-cloud': true,
					'tier-free': true,
					'tier-team': true
				},
				link: '/docs/advanced/deploy_to_prod'
			},
			{
				name: 'Agent workers',
				tiers: {
					'tier-free-selfhost': false,
					'tier-enterprise-selfhost': true,
					'tier-enterprise-cloud': true,
					'tier-free': false,
					'tier-team': false
				},
				link: '/docs/core_concepts/agent_workers'
			},
			{
				name: 'Sync Windmill to a git repository (Git sync)',
				tiers: {
					'tier-free-selfhost': false,
					'tier-enterprise-selfhost': true,
					'tier-enterprise-cloud': true,
					'tier-free': true,
					'tier-team': true
				},
				link: '/docs/advanced/git_sync'
			},
			{
				name: 'GitHub App',
				tiers: {
					'tier-free-selfhost': false,
					'tier-enterprise-selfhost': true,
					'tier-enterprise-cloud': true,
					'tier-free': true,
					'tier-team': true
				},
				link: '/docs/integrations/git_repository#github-app'
			},
			{
				name: 'Deploy to staging/prod web UI',
				tiers: {
					'tier-free-selfhost': false,
					'tier-enterprise-selfhost': true,
					'tier-enterprise-cloud': true,
					'tier-free': true,
					'tier-team': true
				},
				link: '/docs/core_concepts/staging_prod'
			},
			{
				name: 'OpenID Connect (OIDC)',
				tiers: {
					'tier-free-selfhost': false,
					'tier-enterprise-selfhost': true,
					'tier-enterprise-cloud': true,
					'tier-free': true,
					'tier-team': true
				},
				link: '/docs/core_concepts/oidc'
			},
			{
				name: 'Codebases & bundles',
				tiers: {
					'tier-free-selfhost': false,
					'tier-enterprise-selfhost': true,
					'tier-enterprise-cloud': true,
					'tier-free': false,
					'tier-team': true
				},
				link: '/docs/core_concepts/codebases_and_bundles'
			},
			{
				name: 'Private PyPI repositories & npm registries and packages',
				tiers: {
					'tier-free-selfhost': false,
					'tier-enterprise-selfhost': true,
					'tier-enterprise-cloud': true,
					'tier-free': false,
					'tier-team': false
				},
				link: '/docs/advanced/dependencies_in_typescript#private-npm-registry--private-npm-packages'
			},
			{
				name: 'Distributed dependency cache backed by S3',
				tiers: {
					'tier-free-selfhost': false,
					'tier-enterprise-selfhost': true,
					'tier-enterprise-cloud': true,
					'tier-free': false,
					'tier-team': false
				},
				link: '/docs/misc/s3_cache'
			},
			{
				name: 'Windows workers',
				tiers: {
					'tier-free-selfhost': false,
					'tier-enterprise-selfhost': true,
					'tier-enterprise-cloud': false,
					'tier-free': false,
					'tier-team': false
				},
				link: '/docs/misc/windows_workers',
				tooltip: 'Self-hosted only'
			}
		]
	},
	{
		name: 'Performance',
		attributes: [
			{
				name: 'Worker group management UI (incl. Init scripts)',
				tiers: {
					'tier-free-selfhost': false,
					'tier-enterprise-selfhost': true,
					'tier-enterprise-cloud': false,
					'tier-free': false,
					'tier-team': false
				},
				link: '/docs/core_concepts/worker_groups',
				tooltip: 'Only available on self-hosting and enterprise edition on private clusters'
			},
			{
				name: 'Autoscaling',
				tiers: {
					'tier-free-selfhost': false,
					'tier-enterprise-selfhost': true,
					'tier-enterprise-cloud': false,
					'tier-free': false,
					'tier-team': false
				},
				link: '/docs/core_concepts/autoscaling',
				tooltip: 'Self-hosted only'
			},
			{
				name: 'Critical alerts',
				tiers: {
					'tier-free-selfhost': false,
					'tier-enterprise-selfhost': true,
					'tier-enterprise-cloud': true,
					'tier-free': false,
					'tier-team': false
				},
				link: '/docs/core_concepts/critical_alerts',
			},
			{
				name: 'Script-specific workers (dedicated) / High throughput',
				tiers: {
					'tier-free-selfhost': false,
					'tier-enterprise-selfhost': true,
					'tier-enterprise-cloud': true,
					'tier-free': true,
					'tier-team': true
				},
				link: '/docs/core_concepts/dedicated_workers'
			},
			{
				name: 'Concurrency limits',
				tiers: {
					'tier-free-selfhost': false,
					'tier-enterprise-selfhost': true,
					'tier-enterprise-cloud': true,
					'tier-free': true,
					'tier-team': true
				},
				link: '/docs/core_concepts/concurrency_limits'
			}
		]
	},
	{
		name: 'Flows',
		attributes: [
			{
				name: 'Priority for steps',
				tiers: {
					'tier-free-selfhost': false,
					'tier-enterprise-selfhost': true,
					'tier-enterprise-cloud': false,
					'tier-free': false,
					'tier-team': false
				},
				link: '/docs/flows/priority',
				tooltip: 'Self-hosted only'
			},
			{
				name: 'Restart deployed flows from any node',
				tiers: {
					'tier-free-selfhost': false,
					'tier-enterprise-selfhost': true,
					'tier-enterprise-cloud': true,
					'tier-free': true,
					'tier-team': true
				},
				link: '/blog/launch-week-1/restartable-flows'
			},
			{
				name: 'Lifetime / Delete after use',
				tiers: {
					'tier-free-selfhost': false,
					'tier-enterprise-selfhost': true,
					'tier-enterprise-cloud': true,
					'tier-free': true,
					'tier-team': true
				},
				link: '/docs/flows/lifetime'
			},
			{
				name: 'Approval steps - Adding forms',
				tiers: {
					'tier-free-selfhost': false,
					'tier-enterprise-selfhost': true,
					'tier-enterprise-cloud': true,
					'tier-free': true,
					'tier-team': true
				},
				link: '/docs/flows/flow_approval#form'
			},
			{
				name: 'Approval steps - Adding prompts (self-approval)',
				tiers: {
					'tier-free-selfhost': false,
					'tier-enterprise-selfhost': true,
					'tier-enterprise-cloud': true,
					'tier-free': true,
					'tier-team': true
				},
				link: '/docs/flows/flow_approval#prompts'
			},
			{
				name: 'Approval steps - Require approvers to be logged in',
				tiers: {
					'tier-free-selfhost': false,
					'tier-enterprise-selfhost': true,
					'tier-enterprise-cloud': true,
					'tier-free': true,
					'tier-team': true
				},
				link: '/docs/flows/flow_approval#require-approvers-to-be-logged-in'
			},
			{
				name: 'Approval steps - Disable self-approval',
				tiers: {
					'tier-free-selfhost': false,
					'tier-enterprise-selfhost': true,
					'tier-enterprise-cloud': true,
					'tier-free': true,
					'tier-team': true
				},
				link: '/docs/flows/flow_approval#require-approvers-to-be-members-of-a-group'
			},
			{
				name: 'Approval steps - Require approvers to be members of a group',
				tiers: {
					'tier-free-selfhost': false,
					'tier-enterprise-selfhost': true,
					'tier-enterprise-cloud': true,
					'tier-free': true,
					'tier-team': true
				},
				link: '/docs/flows/flow_approval#require-approvers-to-be-members-of-a-group'
			}
		]
	},
	{
		name: 'Apps',
		attributes: [
			{
				name: 'Global CSS',
				tiers: {
					'tier-free-selfhost': false,
					'tier-enterprise-selfhost': true,
					'tier-enterprise-cloud': true,
					'tier-free': true,
					'tier-team': true
				},
				link: '/docs/apps/css_editor'
			},
			{
				name: 'Send schedule reports of Apps (png or pdf) through Slack, Discord or e-mail',
				tiers: {
					'tier-free-selfhost': false,
					'tier-enterprise-selfhost': true,
					'tier-enterprise-cloud': true,
					'tier-free': true,
					'tier-team': true
				},
				link: '/docs/apps/schedule_reports'
			},
			{
				name: 'Workspace default app',
				tiers: {
					'tier-free-selfhost': false,
					'tier-enterprise-selfhost': true,
					'tier-enterprise-cloud': true,
					'tier-free': true,
					'tier-team': true
				},
				link: '/docs/apps/default_app'
			},
			{
				name: 'Importing custom React components',
				tiers: {
					'tier-free-selfhost': false,
					'tier-enterprise-selfhost': true,
					'tier-enterprise-cloud': true,
					'tier-free': true,
					'tier-team': true
				},
				link: '/docs/apps/react_components'
			}
		]
	}
];

export default function FeatureList({ features, level = 1, id }) {
	return (
		<ul
			className={classNames(
				('mt-8 space-y-3 text-sm leading-6 text-gray-600 xl:mt-10', level === 2 ? '!ml-6' : ''),
				level === 1 ? 'h-80' : ''
			)}
		>
			{features.map((feature) => (
				<React.Fragment key={level + id + JSON.stringify(feature.text)}>
					<li className="flex gap-x-3 py-1">
						<Check className="h-2 w-2 flex-none text-blue-600 mt-2" aria-hidden="true" />
						<span>{feature.text}</span>
					</li>
					{feature?.features && feature.features.length > 0 ? (
						<FeatureList features={feature.features} level={level + 1} id={id} />
					) : null}
				</React.Fragment>
			))}
		</ul>
	);
}
