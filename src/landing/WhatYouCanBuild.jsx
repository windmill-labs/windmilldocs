import React from 'react';
import Link from '@docusaurus/Link';
import { ArrowRight } from 'lucide-react';
import LazyVideo from '../components/products/LazyVideo';

const allUseCases = [
	{ label: 'Scripts', subtitle: 'Write scripts in TypeScript, Python, Go, Bash, SQL and trigger them from webhooks, schedules, queues or the auto-generated UI.', to: '/use-cases/scripts', cover: '/img/money-pages/scripts-preview.webp' },
	{ label: 'Internal apps', subtitle: 'Build production-grade internal apps with backend scripts, data tables and React, Vue or Svelte frontends.', to: '/use-cases/internal-apps', cover: '/img/money-pages/frontend.webp' },
	{ label: 'Data pipelines', subtitle: 'Orchestrate ETL jobs with parallel branches, DuckDB queries and connections to any database or S3 bucket.', to: '/use-cases/data-pipelines', cover: '/img/money-pages/data-pipelines-card.webp' },
	{ label: 'AI agents', subtitle: 'Build AI agents with tool-calling, DAG orchestration, sandboxes and direct access to your scripts and resources.', to: '/use-cases/ai-agents', cover: '/img/money-pages/ai-agent-card.webp' },
	{ label: 'Workflows', subtitle: 'Chain scripts into flows with approval steps, parallel branches, loops and conditional logic.', to: '/use-cases/workflows', cover: '/img/money-pages/parallel-branches.webp' },
	{ label: 'Scheduled tasks', subtitle: 'Run cron jobs with a visual builder, execution history, error handlers, recovery handlers and alerting.', to: '/use-cases/scheduled-tasks', cover: '/img/money-pages/cron-schedule.webp' },
];

export default function WhatYouCanBuild() {
	return (
		<>
			<div className="max-w-7xl mx-auto px-8 py-16">
				<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
					What you can build
				</h2>
				<p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
					From simple scripts to complex data pipelines, one platform for every internal tool your team needs.
				</p>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
					{allUseCases.map((item) => (
						<Link
							key={item.label}
							to={item.to}
							className="flex flex-col rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-md transition-all !no-underline group overflow-hidden"
						>
							<div className="h-48 overflow-hidden bg-gray-100 dark:bg-gray-800">
								<img src={item.cover} alt={item.label} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300" />
							</div>
							<div className="flex items-center gap-2 px-5 pt-4 pb-1">
								<span className="text-base font-semibold text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{item.label}</span>
								<ArrowRight className="w-4 h-4 text-gray-300 dark:text-gray-600 ml-auto flex-shrink-0 group-hover:text-blue-500 transition-colors" />
							</div>
							<p className="text-sm text-gray-500 dark:text-gray-400 px-5 pb-4 leading-relaxed">{item.subtitle}</p>
						</Link>
					))}
				</div>
			</div>

			<div className="max-w-7xl mx-auto px-8 py-16">
				<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8">
					2 ways to build with Windmill
				</h2>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					<div>
						<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
							In the Windmill UI
						</h3>
						<p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
							Built-in <Link to="/platform/script-editor">script editor</Link>, <Link to="/platform/flow-editor">workflow editor</Link> and <Link to="/platform/app-builder">app builder</Link> with integrated resources, secrets and connections to your stack.
						</p>
						<div className="rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
							<LazyVideo
								src="/img/platform/script-editor/platform-script-realtime-logs.webm"
								className="w-full"
							/>
						</div>
					</div>
					<div>
						<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
							In your local editor
						</h3>
						<p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
							Full <Link to="/platform/local-dev">local dev experience</Link> with the Windmill CLI, VS Code extension, and Claude and Codex skills. Deploy through Git sync.
						</p>
						<div className="rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
							<LazyVideo
								src="/img/platform/local-dev/platform-local-dev-vscode-extension.webm"
								className="w-full"
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
