import React from 'react';
import Link from '@docusaurus/Link';
import LazyVideo from '../components/products/LazyVideo';

export default function ObservabilitySection() {
	return (
		<div className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
				<div className="rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
					<LazyVideo
						src="/img/platform/observability/platform-observability-runs-dashboard.webm"
						className="w-full"
					/>
				</div>
				<div>
					<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
						Full observability on every execution
					</h2>
					<p className="text-lg text-gray-600 dark:text-gray-300">
						Every job is <Link to="/platform/observability">logged, tracked and searchable</Link>. Monitor runs from a central dashboard with granular filtering, track every action with audit logs, and get alerts on Slack, email or Teams when things go wrong.
					</p>
				</div>
			</div>
		</div>
	);
}
