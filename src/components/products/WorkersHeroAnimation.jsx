import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Database, Server, CheckCircle, Loader2 } from 'lucide-react';
import { SiTypescript, SiGo, SiGnubash, SiPhp, SiRust } from 'react-icons/si';

function PythonColored({ className }) {
	return (
		<svg viewBox="0 0 256 255" className={className} xmlns="http://www.w3.org/2000/svg">
			<defs>
				<linearGradient id="pyA" x1="12.96%" y1="12.07%" x2="79.64%" y2="78.8%">
					<stop offset="0%" stopColor="#387EB8" />
					<stop offset="100%" stopColor="#366994" />
				</linearGradient>
				<linearGradient id="pyB" x1="19.13%" y1="20.58%" x2="90.43%" y2="88.01%">
					<stop offset="0%" stopColor="#FFE052" />
					<stop offset="100%" stopColor="#FFC331" />
				</linearGradient>
			</defs>
			<path d="M126.916.072c-64.832 0-60.784 28.115-60.784 28.115l.072 29.128h61.868v8.745H41.631S.145 61.355.145 126.77c0 65.417 36.21 63.097 36.21 63.097h21.61v-30.356s-1.165-36.21 35.632-36.21h61.362s34.475.557 34.475-33.319V33.97S194.67.072 126.916.072ZM92.802 19.66a11.12 11.12 0 1 1 0 22.24 11.12 11.12 0 0 1 0-22.24Z" fill="url(#pyA)" />
			<path d="M128.757 254.126c64.832 0 60.784-28.115 60.784-28.115l-.072-29.127H127.6v-8.745h86.441s41.486 4.705 41.486-60.712c0-65.416-36.21-63.096-36.21-63.096h-21.61v30.355s1.165 36.21-35.632 36.21h-61.362s-34.475-.557-34.475 33.32v56.013s-5.235 33.897 62.518 33.897Zm34.114-19.586a11.12 11.12 0 1 1 0-22.24 11.12 11.12 0 0 1 0 22.24Z" fill="url(#pyB)" />
		</svg>
	);
}

const jobQueue = [
	{ name: 'process_orders.ts', Icon: SiTypescript, iconColor: 'text-[#3178C6]' },
	{ name: 'train_model.py', Icon: PythonColored, iconColor: '' },
	{ name: 'sync_inventory.ts', Icon: SiTypescript, iconColor: 'text-[#3178C6]' },
	{ name: 'pg_migrate.go', Icon: SiGo, iconColor: 'text-[#00ADD8]' },
	{ name: 'send_invoices.py', Icon: PythonColored, iconColor: '' },
	{ name: 'resize_images.rs', Icon: SiRust, iconColor: 'text-[#DEA584]' },
	{ name: 'aggregate_logs.sh', Icon: SiGnubash, iconColor: 'text-[#4EAA25]' },
	{ name: 'daily_report.php', Icon: SiPhp, iconColor: 'text-[#777BB4]' },
];

const workerTags = {
	default: { label: 'default', classes: 'bg-blue-100 text-blue-600' },
	dedicated: { label: 'dedicated', classes: 'bg-purple-100 text-purple-600' },
	native: { label: 'native', classes: 'bg-green-100 text-green-600' },
	agent: { label: 'agent', classes: 'bg-amber-100 text-amber-600' },
	windows: { label: 'windows', classes: 'bg-rose-100 text-rose-600' },
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
			{ id: 'W3', tag: 'native', status: 'idle', job: null, result: null },
			{ id: 'W4', tag: 'agent', status: 'idle', job: null, result: null },
			{ id: 'W5', tag: 'windows', status: 'idle', job: null, result: null },
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
			w[2] = { id: 'W3', tag: 'native', status: 'processing', job: 5, result: null };
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
					<div className="rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden">
						{/* Header */}
						<div className="px-5 py-3.5 border-b border-gray-100 flex items-center gap-2">
							<Database className="w-4 h-4 text-gray-400" />
							<span className="text-sm font-semibold text-gray-700">Job execution</span>
							{phase >= 7 && (
								<motion.span
									className="ml-auto text-[10px] text-gray-400 font-mono"
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
							<div className="flex-1 border-r border-gray-100 px-4 py-3 overflow-hidden">
								<div className="text-[10px] uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-1.5">
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
													className="flex items-center gap-2 rounded-full px-3 py-1.5 bg-gray-50 border border-gray-200"
													initial={{ opacity: 0, y: -8 }}
													animate={{ opacity: 1, y: 0 }}
													exit={{ opacity: 0, x: 80, transition: { duration: 0.3 } }}
													transition={{ duration: 0.25, delay: i * 0.06 }}
												>
													<LangIcon className={`w-3 h-3 flex-shrink-0 ${job.iconColor}`} />
													<span className="text-[10px] font-mono text-gray-600 truncate">{job.name}</span>
												</motion.div>
											);
										})}
									</AnimatePresence>
									{phase >= 7 && visibleJobs.length === 0 && (
										<motion.div
											className="text-[10px] text-gray-300 italic text-center py-4"
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
								<div className="text-[10px] uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-1.5">
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
														? 'border-blue-300 bg-blue-50/50 shadow-[0_0_12px_rgba(59,130,246,0.08)]'
														: w.status === 'done'
														? 'border-green-300 bg-green-50/50'
														: 'border-gray-200 bg-gray-50'
												}`}
												initial={{ opacity: 0, scale: 0.9 }}
												animate={{ opacity: 1, scale: 1 }}
												transition={{ duration: 0.3, delay: i === 2 ? 0.1 : 0 }}
											>
												<Server className={`w-3.5 h-3.5 flex-shrink-0 ${
													w.status === 'processing' ? 'text-blue-500' :
													w.status === 'done' ? 'text-green-500' : 'text-gray-400'
												}`} />
												<span className="text-[11px] font-mono text-gray-600">{w.id}</span>
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
																<Loader2 className="w-3 h-3 text-blue-500" />
															</motion.div>
															{w.job !== null && (
																<span className="text-[9px] font-mono text-gray-400">{jobQueue[w.job]?.name}</span>
															)}
														</>
													)}
													{w.status === 'done' && (
														<motion.div
															className="flex items-center gap-1"
															initial={{ opacity: 0, scale: 0.8 }}
															animate={{ opacity: 1, scale: 1 }}
														>
															<CheckCircle className="w-3 h-3 text-green-500" />
															{w.result && <span className="text-[9px] font-mono text-green-500/70">{w.result}</span>}
														</motion.div>
													)}
													{w.status === 'idle' && (
														<span className="text-[9px] text-gray-300">idle</span>
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
