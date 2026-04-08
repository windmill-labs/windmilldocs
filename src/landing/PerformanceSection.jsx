import React from 'react';
import { BenchmarkCard } from './DeveloperExperienceSection';

export default function PerformanceSection() {
	return (
		<div className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
			<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
				Run at any scale with best performance
			</h2>
			<p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
				We engineered Windmill to be the fastest orchestrator in the industry. From a single-node VPS to 1,000-node K8s clusters, auto-scale on demand with dedicated worker groups.
			</p>
			<BenchmarkCard />
		</div>
	);
}
