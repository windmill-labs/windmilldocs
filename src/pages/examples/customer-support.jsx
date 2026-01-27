import React from 'react';
import ExampleLayout from '../../landing/ExampleLayout';

export default function CustomerSupportExample() {
	return (
		<ExampleLayout
			title="Customer Support"
			description="A unified support interface to manage tickets, track response times, and monitor customer satisfaction. Integrate with your existing tools to streamline support workflows and improve team productivity."
			iframeUrl="" // Placeholder - replace with actual Windmill app URL
		>
			<div className="space-y-4">
				<div>
					<h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
						Features
					</h3>
					<ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
						<li>Ticket management & routing</li>
						<li>Response time tracking</li>
						<li>Customer satisfaction scores</li>
						<li>Team performance metrics</li>
					</ul>
				</div>
				<div>
					<h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
						Built with
					</h3>
					<div className="flex flex-wrap gap-2">
						<span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">
							Svelte
						</span>
						<span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">
							Zendesk
						</span>
						<span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">
							Windmill
						</span>
					</div>
				</div>
			</div>
		</ExampleLayout>
	);
}
