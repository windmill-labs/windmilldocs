import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { PenLine, Rocket, GitBranch, Terminal, Monitor, Github, ChevronRight } from 'lucide-react';

function SyncFlowStep({ icon: Icon, label, auto, isInView, delay }) {
	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.8 }}
			animate={isInView ? { opacity: 1, scale: 1 } : {}}
			transition={{ duration: 0.3, delay }}
			className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/5 dark:bg-gray-900/50"
		>
			<Icon className="w-4 h-4 text-gray-500 flex-shrink-0" />
			<span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-normal break-words">{label}</span>
			{auto && (
				<span className="ml-auto text-[10px] font-medium px-1.5 py-0.5 rounded flex-shrink-0 text-green-600 bg-green-50 dark:bg-green-900/20">
					auto
				</span>
			)}
		</motion.div>
	);
}

function DownArrow() {
	return (
		<div className="flex justify-center">
			<svg width="12" height="12" viewBox="0 0 12 12" className="text-gray-400">
				<path d="M6 2 L6 10 M3 7 L6 10 L9 7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
			</svg>
		</div>
	);
}

function BranchColumn({ label, steps, alignBottom, isInView, baseDelay }) {
	return (
		<div className="flex-1 flex flex-col gap-1.5">
			<span className="text-[10px] font-semibold uppercase tracking-wider text-center text-gray-400 mb-1">{label}</span>
			{alignBottom && <div className="flex-1" />}
			{steps.map((step, i) => (
				<React.Fragment key={step.label}>
					<SyncFlowStep {...step} isInView={isInView} delay={baseDelay + i * 0.12} />
					{i < steps.length - 1 && <DownArrow />}
				</React.Fragment>
			))}
		</div>
	);
}

const flows = [
	{
		label: 'From local to remote',
		first: { icon: PenLine, label: 'Change locally', auto: false },
		branches: [
			{
				label: 'Git sync on',
				steps: [
					{ icon: GitBranch, label: 'git commit & push', auto: false },
					{ icon: Github, label: 'GitHub Action: wmill sync push', auto: true },
				],
			},
			{
				label: 'No git sync',
				steps: [
					{ icon: Terminal, label: 'wmill sync push', auto: false },
				],
			},
		],
		last: { icon: Rocket, label: 'Deployed on Windmill', auto: true },
	},
	{
		label: 'From remote to local',
		first: { icon: Monitor, label: 'Deploy from the UI', auto: false },
		branches: [
			{
				label: 'Git sync on',
				steps: [
					{ icon: GitBranch, label: 'Commit to Git', auto: true },
					{ icon: Terminal, label: 'git pull', auto: false },
				],
			},
			{
				label: 'No git sync',
				alignBottom: true,
				steps: [
					{ icon: Terminal, label: 'wmill sync pull', auto: false },
				],
			},
		],
		last: { icon: PenLine, label: 'Files updated locally', auto: true },
	},
];

export default function SyncFlows() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: '-40px' });
	const d = 0.2;

	return (
		<div ref={ref} className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
			{flows.map((flow, fi) => {
				const baseDelay = d + fi * 0.4;
				return (
					<motion.div
						key={flow.label}
						initial={{ opacity: 0, y: 12 }}
						animate={isInView ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.35, delay: baseDelay }}
						className="p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/5 dark:bg-gray-900/50"
					>
						<p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">
							{flow.label}
						</p>
						<div className="flex flex-col gap-1.5">
							<SyncFlowStep {...flow.first} isInView={isInView} delay={baseDelay + 0.1} />

							{/* Split curves (hidden on mobile) */}
							<svg className="w-full hidden sm:block" height="28" viewBox="0 0 400 28" preserveAspectRatio="xMidYMid meet">
								<path d="M200,0 L200,4 C200,16 100,16 100,28" fill="none" stroke="currentColor" strokeWidth="1" className="text-gray-300" />
								<path d="M200,0 L200,4 C200,16 300,16 300,28" fill="none" stroke="currentColor" strokeWidth="1" className="text-gray-300" />
							</svg>
							<DownArrow />

							{/* Two branches: stacked on mobile, side by side on sm+ */}
							<div className="flex flex-col sm:flex-row gap-2">
								{flow.branches.map((branch, bi) => (
									<BranchColumn
										key={branch.label}
										label={branch.label}
										steps={branch.steps}
										alignBottom={branch.alignBottom}
										isInView={isInView}
										baseDelay={baseDelay + 0.22 + bi * 0.08}
									/>
								))}
							</div>

							{/* Merge curves (hidden on mobile) */}
							<svg className="w-full hidden sm:block" height="28" viewBox="0 0 400 28" preserveAspectRatio="xMidYMid meet">
								<path d="M100,0 C100,12 200,12 200,24 L200,28" fill="none" stroke="currentColor" strokeWidth="1" className="text-gray-300" />
								<path d="M300,0 C300,12 200,12 200,24 L200,28" fill="none" stroke="currentColor" strokeWidth="1" className="text-gray-300" />
							</svg>
							<DownArrow />

							<SyncFlowStep {...flow.last} isInView={isInView} delay={baseDelay + 0.5} />
						</div>
					</motion.div>
				);
			})}
		</div>
	);
}
