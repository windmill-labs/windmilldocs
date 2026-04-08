import React, { useState } from 'react';
import Link from '@docusaurus/Link';
import { ArrowRight, Code, LayoutDashboard, GitFork, Bot, Workflow, Clock } from 'lucide-react';

const allUseCases = [
	{ label: 'Scripts', subtitle: 'Write scripts in TypeScript, Python, Go, Bash, SQL and trigger them from webhooks, schedules, queues or the auto-generated UI.', to: '/use-cases/scripts', cover: '/img/money-pages/scripts-preview.webp', icon: Code },
	{ label: 'Workflows', subtitle: 'Chain scripts into flows with approval steps, parallel branches, loops and conditional logic.', to: '/use-cases/workflows', cover: '/img/money-pages/parallel-branches.webp', icon: Workflow },
	{ label: 'Internal apps', subtitle: 'Build production-grade internal apps with backend scripts, data tables and React, Vue or Svelte frontends.', to: '/use-cases/internal-apps', cover: '/img/money-pages/frontend.webp', icon: LayoutDashboard },
	{ label: 'Data pipelines', subtitle: 'Orchestrate ETL jobs with parallel branches, DuckDB queries and connections to any database or S3 bucket.', to: '/use-cases/data-pipelines', cover: '/img/money-pages/data-pipelines-card.webp', icon: GitFork },
	{ label: 'AI agents', subtitle: 'Build AI agents with tool-calling, DAG orchestration, sandboxes and direct access to your scripts and resources.', to: '/use-cases/ai-agents', cover: '/img/money-pages/ai-agent-card.webp', icon: Bot },
	{ label: 'Scheduled tasks', subtitle: 'Run cron jobs with a visual builder, execution history, error handlers, recovery handlers and alerting.', to: '/use-cases/scheduled-tasks', cover: '/img/money-pages/cron-schedule.webp', icon: Clock },
];

export default function WhatYouCanBuild() {
	const [active, setActive] = useState(0);
	const item = allUseCases[active];

	return (
		<div className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
			<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
				Build all your internal software on Windmill
			</h2>
			<p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
				From small scripts to heavy data pipelines, Windmill provides the infrastructure and integrations to build internal software with no overhead, and the <Link to="/platform/workers" className="text-blue-600 dark:text-blue-400 hover:underline">workers</Link> to run them at any scale.
			</p>

			<div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
				<div className="flex flex-col gap-1">
					{allUseCases.map((uc, i) => (
						<button
							key={uc.label}
							onClick={() => setActive(i)}
							className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all cursor-pointer ${
								i === active
									? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
									: 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-gray-200'
							}`}
							style={{ border: 'none' }}
						>
							<uc.icon className={`w-4 h-4 flex-shrink-0 ${i === active ? 'text-blue-500' : 'text-gray-400 dark:text-gray-500'}`} />
							<span className="text-sm font-medium">{uc.label}</span>
						</button>
					))}
				</div>
				<div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 overflow-hidden">
					<div className="h-64 sm:h-80 overflow-hidden bg-gray-100 dark:bg-gray-800">
						<img
							src={item.cover}
							alt={item.label}
							className="w-full h-full object-cover object-top transition-all duration-300"
						/>
					</div>
					<div className="p-6">
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{item.label}</h3>
						<p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-3">{item.subtitle}</p>
						<Link
							to={item.to}
							className="text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline !no-underline inline-flex items-center gap-1"
						>
							Learn more about {item.label.toLowerCase()} <ArrowRight className="w-3.5 h-3.5" />
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
