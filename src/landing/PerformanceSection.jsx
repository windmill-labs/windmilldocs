import React from 'react';
import { BenchmarkCard } from './DeveloperExperienceSection';

export default function PerformanceSection() {
	return (
		<div className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
			<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
				The fastest orchestrator in the industry
			</h2>
			<p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
				Scale from a single-node VPS to 1,000-node K8s clusters. Engineers configure dedicated worker groups, GPU workers and autoscaling policies to match their infrastructure needs.
			</p>
			<BenchmarkCard />
		</div>
	);
}
