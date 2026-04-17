import React from 'react';
import Link from '@docusaurus/Link';
import { Shield, KeyRound, Database, GitBranch, Puzzle, Users } from 'lucide-react';

const features = [
	{
		icon: Users,
		title: 'Roles and permissions',
		description: 'Built-in roles from operator to superadmin. Organize with groups and folders, control access with path-based ACLs.',
		link: '/platform/rbac',
	},
	{
		icon: KeyRound,
		title: 'Resources and secrets',
		description: 'Share API keys, credentials and connections across your team. Encrypted at rest, scoped by folder, accessible only to authorized users.',
		link: '/docs/core_concepts/resources_and_types',
	},
	{
		icon: Database,
		title: 'Built-in databases',
		description: 'Set up PostgreSQL databases at the workspace level so team members can build scripts, workflows and apps on top of shared data.',
		link: '/docs/core_concepts/persistent_storage',
	},
	{
		icon: Shield,
		title: 'Security at scale',
		description: 'SSO, comprehensive audit logs and air-gapped support. Battle-tested reliability in regulated industries.',
		link: '/docs/misc/enterprise_onboarding',
	},
	{
		icon: GitBranch,
		title: 'No lock-in',
		description: 'Open source and self-hostable. Standard code in mainstream languages, no proprietary SDK. Run it locally, port it anytime.',
		link: 'https://github.com/windmill-labs/',
	},
	{
		icon: Puzzle,
		title: '100+ integrations',
		description: 'Every possible integration with external systems is already built-in. PostgreSQL, Snowflake, Kafka, Slack, and more.',
		link: '/docs/integrations/integrations_on_windmill',
	},
];

export default function EnterpriseReady() {
	return (
		<div className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
			<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
				Enterprise-ready from day one
			</h2>
			<p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
				Granular permissions, encrypted secrets, audit logs and SSO. Everything your team needs to run internal software at scale.
			</p>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{features.map((f) => (
					<Link
						key={f.title}
						to={f.link}
						className="rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-5 flex flex-col group hover:border-blue-300 dark:hover:border-blue-700 transition-colors !no-underline"
					>
						<f.icon className="w-5 h-5 text-blue-500 mb-3" />
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
							{f.title}
						</h3>
						<p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
							{f.description}
						</p>
					</Link>
				))}
			</div>
		</div>
	);
}
