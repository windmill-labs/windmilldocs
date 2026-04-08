import React from 'react';
import Link from '@docusaurus/Link';
import LazyVideo from '../components/products/LazyVideo';
import { BenchmarkCard } from './DeveloperExperienceSection';

export default function RunAtScale() {
	return (
		<div className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
			<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
				Run at any scale with full observability
			</h2>
			<p className="text-lg text-gray-600 dark:text-gray-300 mb-12">
				We engineered Windmill to be the fastest orchestrator in the industry. From a single-node VPS to 1,000-node K8s clusters, auto-scale on demand with dedicated worker groups.
			</p>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
				<div className="rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
					<LazyVideo
						src="/img/platform/observability/platform-observability-runs-dashboard.webm"
						className="w-full"
					/>
				</div>
				<div>
					<h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
						Full observability on every execution
					</h3>
					<p className="text-lg text-gray-600 dark:text-gray-300">
						Every job is <Link to="/platform/observability">logged, tracked and searchable</Link>. Monitor runs from a central dashboard with granular filtering, track every action with audit logs, and get alerts on Slack, email or Teams when things go wrong.
					</p>
				</div>
			</div>

			<BenchmarkCard />
		</div>
	);
}
