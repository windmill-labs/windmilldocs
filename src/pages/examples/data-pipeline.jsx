import React from 'react';
import ExampleLayout from '../../landing/ExampleLayout';

export default function DataPipelineExample() {
	return (
		<ExampleLayout
			title="Data Pipeline"
			description="A complete ETL pipeline that extracts data from multiple sources, transforms it according to your business logic, and loads it into your data warehouse. Monitor runs, track data quality, and handle errors gracefully."
			iframeUrl="" // Placeholder - replace with actual Windmill app URL
		>
			<div className="space-y-4">
				<div>
					<h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
						Features
					</h3>
					<ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
						<li>Multi-source data extraction</li>
						<li>Scheduled pipeline runs</li>
						<li>Data transformation & validation</li>
						<li>Error handling & retries</li>
					</ul>
				</div>
				<div>
					<h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
						Built with
					</h3>
					<div className="flex flex-wrap gap-2">
						<span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">
							Python
						</span>
						<span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">
							PostgreSQL
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
