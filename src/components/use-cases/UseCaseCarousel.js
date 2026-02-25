import React, { useRef } from 'react';
import Link from '@docusaurus/Link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const fadeIn = {
	initial: { opacity: 0, y: 30 },
	whileInView: { opacity: 1, y: 0 },
	viewport: { once: true },
	transition: { duration: 0.5 },
};

const allUseCases = [
	{ label: 'Internal tools', subtitle: 'Build production-grade internal tools with backend scripts, data tables and React, Vue or Svelte frontends.', to: '/use-cases/internal-tools', cover: '/img/money-pages/frontend.png' },
	{ label: 'Data pipelines', subtitle: 'Orchestrate ETL jobs with parallel branches, DuckDB queries and connections to any database or S3 bucket.', to: '/use-cases/data-pipelines', cover: '/img/money-pages/data-pipelines-card.png' },
	{ label: 'AI agents', subtitle: 'Build AI agents with tool-calling, DAG orchestration, sandboxes and direct access to your scripts and resources.', to: '/use-cases/ai-agents', cover: '/img/money-pages/ai-agent-card.webp' },
	// { label: 'Workflow automation', subtitle: 'Chain scripts into flows with approval steps, parallel branches, loops and conditional logic.', to: '/use-cases/workflow-automation', cover: '/img/money-pages/parallel-branches.webp' },
	{ label: 'Scheduled tasks', subtitle: 'Run scripts on cron schedules, webhooks or custom triggers with retries and error handlers built in.', to: '/use-cases/scheduled-tasks', cover: '/img/money-pages/cron-schedules-card.png' },
];

export default function UseCaseCarousel({ current, subtitle }) {
	const carouselRef = useRef(null);
	const useCases = allUseCases.filter((uc) => uc.to !== `/use-cases/${current}`);

	const scroll = (dir) => {
		if (!carouselRef.current) return;
		const card = carouselRef.current.querySelector('a');
		const w = card ? card.offsetWidth + 16 : 300;
		carouselRef.current.scrollBy({ left: dir * w, behavior: 'smooth' });
	};

	return (
		<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
			<motion.div {...fadeIn} className="mb-8">
				<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
					More you can build on Windmill
				</h2>
				{subtitle && (
					<p className="text-lg text-gray-600 dark:text-gray-300">{subtitle}</p>
				)}
			</motion.div>

			<div className="relative">
				<button
					onClick={() => scroll(-1)}
					className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors hidden sm:flex"
					aria-label="Previous"
				>
					<ArrowRight className="w-4 h-4 text-gray-600 dark:text-gray-300 rotate-180" />
				</button>
				<button
					onClick={() => scroll(1)}
					className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors hidden sm:flex"
					aria-label="Next"
				>
					<ArrowRight className="w-4 h-4 text-gray-600 dark:text-gray-300" />
				</button>

				<div
					ref={carouselRef}
					className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 -mx-4 px-4"
					style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
				>
					{useCases.map((item) => (
						<Link
							key={item.label}
							to={item.to}
							className="flex flex-col rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-md transition-all !no-underline group overflow-hidden snap-start flex-shrink-0 w-[340px] sm:w-[380px]"
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
		</div>
	);
}
