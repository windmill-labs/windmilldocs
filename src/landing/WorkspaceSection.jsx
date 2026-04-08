import React from 'react';
import Link from '@docusaurus/Link';

export default function WorkspaceSection() {
	return (
		<div className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
			<div className="mb-12">
				<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
					Shared workspaces for your entire team
				</h2>
				<p className="text-lg text-gray-600 dark:text-gray-300">
					Everything your team builds lives in <Link to="/platform/rbac">workspaces</Link> with granular permissions, shared resources and built-in databases.
				</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
				<div className="rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-5">
					<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
						Roles and permissions
					</h3>
					<p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
						Built-in roles from operator to superadmin. Organize with groups and folders, control who can build or execute thanks to <Link to="/platform/rbac" className="text-blue-600 dark:text-blue-400 hover:underline">path-based ACLs</Link>.
					</p>
					{/* placeholder: screenshot showing the RBAC UI — role assignment panel, groups and folder permissions */}
					<div className="rounded-lg bg-gray-100 dark:bg-gray-800 aspect-video" />
				</div>
				<div className="rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-5">
					<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
						Resources
					</h3>
					<p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
						Share API keys, credentials and connections across your team. Encrypted at rest, scoped by folder, accessible only to authorized users.
					</p>
					{/* placeholder: screenshot showing the resources panel — list of resources (API keys, OAuth tokens, DB connections) with folder scoping */}
					<div className="rounded-lg bg-gray-100 dark:bg-gray-800 aspect-video" />
				</div>
				<div className="rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-5">
					<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
						Databases
					</h3>
					<p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
						Set up <Link to="/platform/datatables" className="text-blue-600 dark:text-blue-400 hover:underline">PostgreSQL databases</Link> at the workspace level so team members can build scripts, workflows and apps on top of shared data.
					</p>
					{/* placeholder: screenshot showing the data tables UI — spreadsheet view with columns, rows and query panel */}
					<div className="rounded-lg bg-gray-100 dark:bg-gray-800 aspect-video" />
				</div>
			</div>
		</div>
	);
}
