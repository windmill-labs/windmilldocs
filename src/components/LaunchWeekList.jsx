import React from 'react';
import Link from '@docusaurus/Link';
import { launchWeeks } from '../data/launch-weeks';

export default function LaunchWeekList({ current }) {
	const others = launchWeeks.filter((lw) => lw.href !== current);
	if (others.length === 0) return null;

	return (
		<div className="mt-16">
			<h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
				Other launch weeks
			</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				{others.map((lw) => (
					<Link
						key={lw.number}
						to={lw.href}
						className="group flex flex-col p-5 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 !no-underline hover:text-current hover:border-gray-400 dark:hover:border-gray-600 transition-colors"
					>
						<span className="text-sm text-gray-400 dark:text-gray-500 mb-1">
							{lw.date}
						</span>
						<span className="text-base font-semibold text-gray-900 dark:text-white">
							{lw.title}
						</span>
						<span className="text-sm text-gray-500 dark:text-gray-400 mt-1">
							{lw.description}
						</span>
					</Link>
				))}
			</div>
		</div>
	);
}
