import React from 'react';
import ExampleLayout from '../../landing/ExampleLayout';

export default function PaymentDashboardExample() {
	return (
		<ExampleLayout
			title="Payment Dashboard"
			description="Track payments, revenue metrics, and financial data with an interactive dashboard. Connect to your payment provider to visualize transactions, monitor subscription health, and identify trends in real-time."
			iframeUrl="" // Placeholder - replace with actual Windmill app URL
		>
			<div className="space-y-4">
				<div>
					<h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
						Features
					</h3>
					<ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
						<li>Real-time revenue metrics</li>
						<li>Transaction history & search</li>
						<li>Subscription analytics</li>
						<li>Export & reporting</li>
					</ul>
				</div>
				<div>
					<h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
						Built with
					</h3>
					<div className="flex flex-wrap gap-2">
						<span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">
							React
						</span>
						<span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">
							Stripe
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
