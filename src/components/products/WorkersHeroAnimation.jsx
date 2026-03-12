import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Database, Server, CheckCircle, Loader2 } from 'lucide-react';
import { SiTypescript, SiPython, SiGo, SiGnubash, SiPhp, SiRust } from 'react-icons/si';

const jobQueue = [
	{ name: 'process_orders.ts', Icon: SiTypescript, iconColor: 'text-[#3178C6]' },
	{ name: 'train_model.py', Icon: SiPython, iconColor: 'text-[#3776AB]' },
	{ name: 'sync_inventory.ts', Icon: SiTypescript, iconColor: 'text-[#3178C6]' },
	{ name: 'pg_migrate.go', Icon: SiGo, iconColor: 'text-[#00ADD8]' },
	{ name: 'send_invoices.py', Icon: SiPython, iconColor: 'text-[#3776AB]' },
	{ name: 'resize_images.rs', Icon: SiRust, iconColor: 'text-[#DEA584]' },
	{ name: 'aggregate_logs.sh', Icon: SiGnubash, iconColor: 'text-[#4EAA25]' },
	{ name: 'daily_report.php', Icon: SiPhp, iconColor: 'text-[#777BB4]' },
];

const workerTags = {
	default: { label: 'default', classes: 'bg-blue-500/20 text-blue-400' },
	dedicated: { label: 'dedicated', classes: 'bg-purple-500/20 text-purple-400' },
	native: { label: 'native', classes: 'bg-green-500/20 text-green-400' },
};

export default function WorkersHeroAnimation() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.3 });
	const [phase, setPhase] = useState(0);
	const [cycle, setCycle] = useState(0);

	useEffect(() => {
		if (!isInView) return;
		const CYCLE_DURATION = 8600;
		const timers = [
			setTimeout(() => setPhase(1), 400),
			setTimeout(() => setPhase(2), 1000),
			setTimeout(() => setPhase(3), 2000),
			setTimeout(() => setPhase(4), 3200),
			setTimeout(() => setPhase(5), 4800),
			setTimeout(() => setPhase(6), 6200),
			setTimeout(() => setPhase(7), 7400),
			setTimeout(() => {
				setPhase(0);
				setCycle(c => c + 1);
			}, CYCLE_DURATION),
		];
		return () => timers.forEach(clearTimeout);
	}, [isInView, cycle]);

	const workerStates = (() => {
		if (phase < 1) return [];
		const w = [
			{ id: 'W1', tag: 'default', status: 'idle', job: null, result: null },
			{ id: 'W2', tag: 'dedicated', status: 'idle', job: null, result: null },
		];

		if (phase >= 3) {
			w[0] = { id: 'W1', tag: 'default', status: 'processing', job: 0, result: null };
		}
		if (phase >= 4) {
			w[0] = { id: 'W1', tag: 'default', status: 'processing', job: 2, result: null };
			w[1] = { id: 'W2', tag: 'dedicated', status: 'processing', job: 1, result: null };
		}
		if (phase >= 5) {
			w[0] = { id: 'W1', tag: 'default', status: 'processing', job: 4, result: null };
			w[1] = { id: 'W2', tag: 'dedicated', status: 'processing', job: 3, result: null };
			w.push({ id: 'W3', tag: 'native', status: 'processing', job: 5, result: null });
		}
		if (phase >= 6) {
			w[0] = { id: 'W1', tag: 'default', status: 'processing', job: 7, result: null };
			w[1] = { id: 'W2', tag: 'dedicated', status: 'processing', job: 6, result: null };
			w[2] = { id: 'W3', tag: 'native', status: 'done', job: 5, result: '87ms' };
		}
		if (phase >= 7) {
			w[0] = { id: 'W1', tag: 'default', status: 'done', job: null, result: '98ms' };
			w[1] = { id: 'W2', tag: 'dedicated', status: 'done', job: null, result: '112ms' };
			w[2] = { id: 'W3', tag: 'native', status: 'done', job: null, result: '91ms' };
		}
		return w;
	})();

	const grabbedJobs = new Set();
	if (phase >= 3) grabbedJobs.add(0);
	if (phase >= 4) { grabbedJobs.add(1); grabbedJobs.add(2); }
	if (phase >= 5) { grabbedJobs.add(3); grabbedJobs.add(4); grabbedJobs.add(5); }
	if (phase >= 6) { grabbedJobs.add(6); grabbedJobs.add(7); }

	const visibleJobs = jobQueue.map((j, i) => ({ ...j, index: i })).filter(j => !grabbedJobs.has(j.index));

	return (
		<div ref={ref} className="relative" style={{ height: 420 }}>
			<div className="relative h-full flex items-center justify-center">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={phase >= 1 ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.5 }}
					className="w-full"
				>
					<div className="rounded-xl border border-gray-700 bg-gray-950 shadow-lg overflow-hidden">
						{/* Header */}
						<div className="px-5 py-3.5 border-b border-gray-800 flex items-center gap-2">
							<Database className="w-4 h-4 text-gray-500" />
							<span className="text-sm font-semibold text-gray-300">Job execution</span>
							{phase >= 7 && (
								<motion.span
									className="ml-auto text-[10px] text-gray-500 font-mono"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
								>
									8 jobs · 97ms avg
								</motion.span>
							)}
						</div>

						{/* Content: Queue | Workers */}
						<div className="flex" style={{ height: 320 }}>
							{/* Left: Queue */}
							<div className="flex-1 border-r border-gray-800 px-4 py-3 overflow-hidden">
								<div className="text-[10px] uppercase tracking-wider text-gray-600 mb-3 flex items-center gap-1.5">
									<Database className="w-3 h-3" />
									Queue
								</div>
								<div className="space-y-1.5">
									<AnimatePresence mode="popLayout">
										{phase >= 2 && visibleJobs.map((job, i) => {
											const LangIcon = job.Icon;
											return (
												<motion.div
													key={job.name + job.index}
													layout
													className="flex items-center gap-2 rounded-full px-3 py-1.5 bg-gray-900 border border-gray-800"
													initial={{ opacity: 0, y: -8 }}
													animate={{ opacity: 1, y: 0 }}
													exit={{ opacity: 0, x: 80, transition: { duration: 0.3 } }}
													transition={{ duration: 0.25, delay: i * 0.06 }}
												>
													<LangIcon className={`w-3 h-3 flex-shrink-0 ${job.iconColor}`} />
													<span className="text-[10px] font-mono text-gray-400 truncate">{job.name}</span>
												</motion.div>
											);
										})}
									</AnimatePresence>
									{phase >= 7 && visibleJobs.length === 0 && (
										<motion.div
											className="text-[10px] text-gray-700 italic text-center py-4"
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
										>
											empty
										</motion.div>
									)}
								</div>
							</div>

							{/* Right: Workers */}
							<div className="flex-1 px-4 py-3 overflow-hidden">
								<div className="text-[10px] uppercase tracking-wider text-gray-600 mb-3 flex items-center gap-1.5">
									<Server className="w-3 h-3" />
									Workers
								</div>
								<div className="space-y-2">
									<AnimatePresence>
										{workerStates.map((w, i) => (
											<motion.div
												key={w.id}
												className={`rounded-lg border p-3 flex items-center gap-2.5 transition-colors duration-300 ${
													w.status === 'processing'
														? 'border-blue-500/50 bg-gray-900 shadow-[0_0_12px_rgba(59,130,246,0.1)]'
														: w.status === 'done'
														? 'border-green-500/30 bg-gray-900'
														: 'border-gray-700 bg-gray-900'
												}`}
												initial={{ opacity: 0, scale: 0.9 }}
												animate={{ opacity: 1, scale: 1 }}
												transition={{ duration: 0.3, delay: i === 2 ? 0.1 : 0 }}
											>
												<Server className={`w-3.5 h-3.5 flex-shrink-0 ${
													w.status === 'processing' ? 'text-blue-400' :
													w.status === 'done' ? 'text-green-400' : 'text-gray-600'
												}`} />
												<span className="text-[11px] font-mono text-gray-400">{w.id}</span>
												<span className={`text-[9px] font-medium px-1.5 py-0.5 rounded-full ${workerTags[w.tag].classes}`}>
													{workerTags[w.tag].label}
												</span>
												<div className="ml-auto flex items-center gap-1.5">
													{w.status === 'processing' && (
														<>
															<motion.div
																animate={{ rotate: 360 }}
																transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
															>
																<Loader2 className="w-3 h-3 text-blue-400" />
															</motion.div>
															{w.job !== null && (
																<span className="text-[9px] font-mono text-gray-600">{jobQueue[w.job]?.name}</span>
															)}
														</>
													)}
													{w.status === 'done' && (
														<motion.div
															className="flex items-center gap-1"
															initial={{ opacity: 0, scale: 0.8 }}
															animate={{ opacity: 1, scale: 1 }}
														>
															<CheckCircle className="w-3 h-3 text-green-400" />
															{w.result && <span className="text-[9px] font-mono text-green-400/70">{w.result}</span>}
														</motion.div>
													)}
													{w.status === 'idle' && (
														<span className="text-[9px] text-gray-700">idle</span>
													)}
												</div>
											</motion.div>
										))}
									</AnimatePresence>
								</div>
							</div>
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	);
}
