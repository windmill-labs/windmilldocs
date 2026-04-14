import React, { useState } from 'react';
import Link from '@docusaurus/Link';
import { ArrowRight, Code, LayoutDashboard, GitFork, Bot, Workflow, Clock } from 'lucide-react';

const allUseCases = [
	{ label: 'Scripts', subtitle: 'The starting point for most internal work. A single file of TypeScript, Python, Go, Bash or 20+ other languages becomes an API, a triggerable job and an auto-generated form, with no boilerplate in between.', to: '/use-cases/scripts', cover: '/img/money-pages/scripts-preview.webp', video: '/img/platform/script-editor/platform-script-realtime-logs.webm', icon: Code },
	{ label: 'Workflows', subtitle: 'For the processes that span multiple steps, systems or people, and where a single script stops being enough. Chains of scripts with approvals, parallel branches, loops and conditional logic, designed in the DAG editor or written entirely as code.', to: '/use-cases/workflows', cover: '/img/money-pages/parallel-branches.webp', video: '/img/platform/workflow-editor/platform-flow-editor-overview.webm', icon: Workflow },
	{ label: 'Internal apps', subtitle: 'When non-technical teammates need to act on your backend logic directly. Full-code UIs with scripts or workflows as backend and React or Svelte as frontend, without a separate deploy pipeline to maintain.', to: '/use-cases/internal-apps', cover: '/img/money-pages/frontend.webp', video: '/videos/wmill-app-dev.mp4', icon: LayoutDashboard },
	{ label: 'Data pipelines', subtitle: 'An ETL layer without a dedicated ETL stack. Parallel branches, DuckDB queries and native connectors to databases, warehouses and S3 keep pipelines fast, observable and versioned alongside the rest of your code.', to: '/use-cases/data-pipelines', cover: '/img/money-pages/data-pipelines-card.webp', video: '/img/platform/datatables/platform-datatables-asset-tracking.webm', icon: GitFork },
	{ label: 'AI agents', subtitle: 'For LLMs that need to act on your real systems with isolated environments and scoped permissions. Tool-calling, sandboxes and your existing scripts as tools, with visibility into cost, latency and every decision the agent makes.', to: '/use-cases/ai-agents', cover: '/img/money-pages/ai-agent-card.webp', video: '/videos/claude_code_sandbox_new.mp4', icon: Bot },
	{ label: 'Scheduled tasks', subtitle: 'For work that needs to run on a fixed schedule rather than on demand. Any script or flow becomes a recurring job with retries, execution history, alerting and recovery handlers built in.', to: '/use-cases/scheduled-tasks', cover: '/img/money-pages/cron-schedule.webp', video: '/img/platform/triggers/platform-triggers-schedules.webm', icon: Clock },
];

export default function WhatYouCanBuild() {
	const [active, setActive] = useState(0);
	const item = allUseCases[active];

	return (
		<div className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
			<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
				Build and orchestrate all your internal software
			</h2>
			<p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
				In the AI era, every team can now build their custom apps and workflows, from engineering and data to sales, support and marketing. Windmill gives you one platform to build, share and orchestrate them all, with the governance and observability needed at enterprise scale.
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
						{item.video ? (
							<video
								key={item.video}
								src={item.video}
								autoPlay
								loop
								muted
								playsInline
								className="w-full h-full object-cover object-top transition-all duration-300"
							/>
						) : (
							<img
								src={item.cover}
								alt={item.label}
								className="w-full h-full object-cover object-top transition-all duration-300"
							/>
						)}
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
