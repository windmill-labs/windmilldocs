import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
	Database, Server, CheckCircle, Loader2, TrendingUp,
	Code, Cpu, Zap
} from 'lucide-react';

import LandingHeader from '../../landing/LandingHeader';
import Footer from '../../landing/Footer';
import RadialBlur from '../../landing/RadialBlur';
import LayoutProvider from '@theme/Layout/Provider';

// ─── Animation 1: Queue Drain ─────────────────────────────────────────────────

const jobQueue = [
	{ name: 'process_orders', tag: 'default', color: 'blue' },
	{ name: 'train_model', tag: 'dedicated', color: 'purple' },
	{ name: 'sync_inventory', tag: 'default', color: 'blue' },
	{ name: 'pg_migrate', tag: 'native', color: 'green' },
	{ name: 'send_invoices', tag: 'default', color: 'blue' },
	{ name: 'resize_images', tag: 'dedicated', color: 'purple' },
	{ name: 'aggregate_logs', tag: 'native', color: 'green' },
	{ name: 'daily_report', tag: 'default', color: 'blue' },
];

const tagColors = {
	blue: 'bg-blue-500/20 text-blue-400',
	purple: 'bg-purple-500/20 text-purple-400',
	green: 'bg-green-500/20 text-green-400',
};

function QueueDrainAnimation() {
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

	// Phase 3: W1 grabs job 0
	// Phase 4: W1 done 0, grabs 2. W2 grabs 1.
	// Phase 5: W3 appears. W1 grabs 4, W2 grabs 3, W3 grabs 5.
	// Phase 6: W1 grabs 7, W2 grabs 6. W3 finishing 5.
	// Phase 7: All 8 done.

	// Build worker states per phase
	const workerStates = (() => {
		if (phase < 1) return [];
		const w = [
			{ id: 'W1', status: 'idle', job: null, result: null },
			{ id: 'W2', status: 'idle', job: null, result: null },
		];

		if (phase >= 3) {
			w[0] = { id: 'W1', status: 'processing', job: 0, result: null };
		}
		if (phase >= 4) {
			w[0] = { id: 'W1', status: 'processing', job: 2, result: null };
			w[1] = { id: 'W2', status: 'processing', job: 1, result: null };
		}
		if (phase >= 5) {
			w[0] = { id: 'W1', status: 'processing', job: 4, result: null };
			w[1] = { id: 'W2', status: 'processing', job: 3, result: null };
			w.push({ id: 'W3', status: 'processing', job: 5, result: null });
		}
		if (phase >= 6) {
			w[0] = { id: 'W1', status: 'processing', job: 7, result: null };
			w[1] = { id: 'W2', status: 'processing', job: 6, result: null };
			w[2] = { id: 'W3', status: 'done', job: 5, result: '87ms' };
		}
		if (phase >= 7) {
			w[0] = { id: 'W1', status: 'done', job: null, result: '98ms' };
			w[1] = { id: 'W2', status: 'done', job: null, result: '112ms' };
			w[2] = { id: 'W3', status: 'done', job: null, result: '91ms' };
		}
		return w;
	})();

	// Jobs visible in queue (not yet grabbed)
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
					style={{ width: 540 }}
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
										{phase >= 2 && visibleJobs.map((job, i) => (
											<motion.div
												key={job.name + job.index}
												layout
												className="flex items-center gap-2 rounded-full px-3 py-1.5 bg-gray-900 border border-gray-800"
												initial={{ opacity: 0, y: -8 }}
												animate={{ opacity: 1, y: 0 }}
												exit={{ opacity: 0, x: 80, transition: { duration: 0.3 } }}
												transition={{ duration: 0.25, delay: i * 0.06 }}
											>
												<span className="text-[10px] font-mono text-gray-400 truncate">{job.name}</span>
												<span className={`text-[9px] font-medium px-1.5 py-0.5 rounded-full ml-auto flex-shrink-0 ${tagColors[job.color]}`}>
													{job.tag}
												</span>
											</motion.div>
										))}
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

// ─── Animation 2: Tag Router ──────────────────────────────────────────────────

const routerJobs = [
	{ name: 'process_orders', tag: 'default', color: 'blue', group: 0 },
	{ name: 'train_model', tag: 'dedicated', color: 'purple', group: 1 },
	{ name: 'pg_query', tag: 'native', color: 'green', group: 2 },
];

const workerGroups = [
	{ tag: 'default', icon: Code, color: 'blue', borderColor: 'border-l-blue-500', count: '1x' },
	{ tag: 'dedicated', icon: Cpu, color: 'purple', borderColor: 'border-l-purple-500', count: '1x' },
	{ tag: 'native', icon: Zap, color: 'green', borderColor: 'border-l-green-500', count: '1x' },
];

const groupTagColors = {
	blue: 'text-blue-400',
	purple: 'text-purple-400',
	green: 'text-green-400',
};

const groupBgColors = {
	blue: 'bg-blue-500/10',
	purple: 'bg-purple-500/10',
	green: 'bg-green-500/10',
};

function TagRouterAnimation() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.3 });
	const [phase, setPhase] = useState(0);
	const svgRef = useRef(null);

	useEffect(() => {
		if (!isInView) return;
		const timers = [
			setTimeout(() => setPhase(1), 400),
			setTimeout(() => setPhase(2), 1200),
			setTimeout(() => setPhase(3), 2200),
			setTimeout(() => setPhase(4), 3800),
			setTimeout(() => setPhase(5), 5500),
		];
		return () => timers.forEach(clearTimeout);
	}, [isInView]);

	// Group states
	const groupStates = workerGroups.map((g, i) => {
		if (phase < 2) return { ...g, status: 'dim', count: g.count };
		if (phase >= 5) return { ...g, status: 'done', count: i === 0 ? '3x' : g.count };
		if (phase >= 4) {
			if (i === 0) return { ...g, status: 'done', count: '3x' };
			if (i === 1) return { ...g, status: 'processing', count: g.count };
			if (i === 2) return { ...g, status: 'processing', count: g.count };
		}
		if (phase >= 3) {
			if (i === 0) return { ...g, status: 'processing', count: g.count };
		}
		return { ...g, status: 'ready', count: g.count };
	});

	return (
		<div ref={ref} className="relative" style={{ height: 460 }}>
			<div className="relative h-full flex items-center justify-center">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={phase >= 1 ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.5 }}
					style={{ width: 540 }}
				>
					<div className="rounded-xl border border-gray-700 bg-gray-950 shadow-lg overflow-hidden">
						{/* Queue bar */}
						<div className="px-5 py-3 bg-gray-900 border-b border-gray-800 flex items-center gap-2">
							<Database className="w-4 h-4 text-gray-500" />
							<span className="text-sm font-semibold text-gray-300">Job queue</span>
						</div>

						{/* Queue contents */}
						<div className="px-5 py-3 border-b border-gray-800 relative" style={{ minHeight: 48 }}>
							<div className="flex items-center gap-2 flex-wrap">
								<AnimatePresence>
									{phase >= 3 && phase < 5 && (
										<motion.div
											key="job-default"
											className="flex items-center gap-1.5 rounded-full px-2.5 py-1 bg-gray-900 border border-gray-700"
											initial={{ opacity: 0, y: -8 }}
											animate={{ opacity: 1, y: 0 }}
											exit={{ opacity: 0, y: 20, transition: { duration: 0.4 } }}
											transition={{ duration: 0.25 }}
										>
											<span className="text-[10px] font-mono text-gray-400">process_orders</span>
											<span className={`text-[9px] font-medium px-1.5 py-0.5 rounded-full ${tagColors.blue}`}>default</span>
										</motion.div>
									)}
									{phase >= 4 && phase < 5 && (
										<>
											<motion.div
												key="job-dedicated"
												className="flex items-center gap-1.5 rounded-full px-2.5 py-1 bg-gray-900 border border-gray-700"
												initial={{ opacity: 0, y: -8 }}
												animate={{ opacity: 1, y: 0 }}
												exit={{ opacity: 0, y: 20, transition: { duration: 0.4 } }}
												transition={{ duration: 0.25 }}
											>
												<span className="text-[10px] font-mono text-gray-400">train_model</span>
												<span className={`text-[9px] font-medium px-1.5 py-0.5 rounded-full ${tagColors.purple}`}>dedicated</span>
											</motion.div>
											<motion.div
												key="job-native"
												className="flex items-center gap-1.5 rounded-full px-2.5 py-1 bg-gray-900 border border-gray-700"
												initial={{ opacity: 0, y: -8 }}
												animate={{ opacity: 1, y: 0 }}
												exit={{ opacity: 0, y: 20, transition: { duration: 0.4 } }}
												transition={{ duration: 0.25, delay: 0.1 }}
											>
												<span className="text-[10px] font-mono text-gray-400">pg_query</span>
												<span className={`text-[9px] font-medium px-1.5 py-0.5 rounded-full ${tagColors.green}`}>native</span>
											</motion.div>
										</>
									)}
								</AnimatePresence>
								{phase < 3 && (
									<span className="text-[10px] text-gray-700 italic">waiting for jobs...</span>
								)}
								{phase >= 5 && (
									<motion.span
										className="text-[10px] text-gray-700 italic"
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
									>
										empty
									</motion.span>
								)}
							</div>
						</div>

						{/* Routing area with SVG lines */}
						<div className="relative px-5 py-4" ref={svgRef}>
							{/* SVG routing lines */}
							<svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
								{phase >= 3 && phase < 5 && (
									<motion.line
										x1="110" y1="0" x2="110" y2="28"
										stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="4 3" opacity={0.5}
										initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4 }}
									/>
								)}
								{phase >= 4 && phase < 5 && (
									<>
										<motion.line
											x1="270" y1="0" x2="270" y2="28"
											stroke="#a855f7" strokeWidth="1.5" strokeDasharray="4 3" opacity={0.5}
											initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4 }}
										/>
										<motion.line
											x1="430" y1="0" x2="430" y2="28"
											stroke="#22c55e" strokeWidth="1.5" strokeDasharray="4 3" opacity={0.5}
											initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4, delay: 0.1 }}
										/>
									</>
								)}
							</svg>

							{/* Worker groups */}
							<div className="grid grid-cols-3 gap-3">
								{groupStates.map((g, i) => {
									const Icon = g.icon;
									return (
										<motion.div
											key={g.tag}
											className={`rounded-lg border border-gray-700 bg-gray-900 border-l-4 ${g.borderColor} p-3 transition-all duration-300 ${
												g.status === 'dim' ? 'opacity-40' : ''
											}`}
											initial={{ opacity: 0, y: 10 }}
											animate={phase >= 2 ? { opacity: g.status === 'dim' ? 0.4 : 1, y: 0 } : { opacity: 0 }}
											transition={{ duration: 0.3, delay: i * 0.1 }}
										>
											<div className="flex items-center gap-2 mb-2">
												<Icon className={`w-3.5 h-3.5 ${groupTagColors[g.color]}`} />
												<span className={`text-[11px] font-semibold ${groupTagColors[g.color]}`}>{g.tag}</span>
											</div>
											<div className="flex items-center justify-between">
												<span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${groupBgColors[g.color]} ${groupTagColors[g.color]}`}>
													{g.count}
												</span>
												{g.status === 'processing' && (
													<motion.div
														animate={{ rotate: 360 }}
														transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
													>
														<Loader2 className={`w-3 h-3 ${groupTagColors[g.color]}`} />
													</motion.div>
												)}
												{g.status === 'done' && (
													<motion.div
														initial={{ opacity: 0, scale: 0.8 }}
														animate={{ opacity: 1, scale: 1 }}
													>
														<CheckCircle className="w-3 h-3 text-green-400" />
													</motion.div>
												)}
											</div>
										</motion.div>
									);
								})}
							</div>
						</div>

						{/* Summary */}
						{phase >= 5 && (
							<motion.div
								className="px-5 py-2.5 border-t border-gray-800 flex items-center justify-center gap-4"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.3 }}
							>
								<span className="text-[10px] text-blue-400/70 font-mono">default: 2 jobs</span>
								<span className="text-[10px] text-gray-700">·</span>
								<span className="text-[10px] text-purple-400/70 font-mono">dedicated: 1 job</span>
								<span className="text-[10px] text-gray-700">·</span>
								<span className="text-[10px] text-green-400/70 font-mono">native: 1 job</span>
							</motion.div>
						)}
					</div>
				</motion.div>
			</div>
		</div>
	);
}

// ─── Animation 3: Scale Up ────────────────────────────────────────────────────

function AnimatedCounter({ from, to, duration = 0.8 }) {
	const [value, setValue] = useState(from);
	const animating = useRef(false);

	useEffect(() => {
		if (animating.current && from === value) return;
		animating.current = true;
		const start = performance.now();
		const startVal = from;
		const diff = to - startVal;

		function tick(now) {
			const elapsed = (now - start) / (duration * 1000);
			if (elapsed >= 1) {
				setValue(to);
				animating.current = false;
				return;
			}
			setValue(Math.round(startVal + diff * elapsed));
			requestAnimationFrame(tick);
		}
		requestAnimationFrame(tick);
	}, [to]);

	return <span>{value}</span>;
}

function ScaleUpAnimation() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.3 });
	const [phase, setPhase] = useState(0);

	useEffect(() => {
		if (!isInView) return;
		const timers = [
			setTimeout(() => setPhase(1), 400),
			setTimeout(() => setPhase(2), 1000),
			setTimeout(() => setPhase(3), 2200),
			setTimeout(() => setPhase(4), 3400),
			setTimeout(() => setPhase(5), 4800),
			setTimeout(() => setPhase(6), 6500),
		];
		return () => timers.forEach(clearTimeout);
	}, [isInView]);

	const throughput = phase >= 5 ? 80 : phase >= 4 ? 40 : phase >= 3 ? 20 : phase >= 2 ? 10 : 0;
	const prevThroughput = phase >= 5 ? 40 : phase >= 4 ? 20 : phase >= 3 ? 10 : 0;
	const barPercent = phase >= 5 ? 100 : phase >= 4 ? 50 : phase >= 3 ? 25 : phase >= 2 ? 12.5 : 0;
	const workerCount = phase >= 5 ? 8 : phase >= 4 ? 4 : phase >= 3 ? 2 : phase >= 2 ? 1 : 0;

	return (
		<div ref={ref} className="relative" style={{ height: 420 }}>
			<div className="relative h-full flex items-center justify-center">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={phase >= 1 ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.5 }}
					style={{ width: 540 }}
				>
					<div className="rounded-xl border border-gray-700 bg-gray-950 shadow-lg overflow-hidden">
						{/* Header with counter */}
						<div className="px-5 py-4 border-b border-gray-800">
							<div className="flex items-center gap-3">
								<div className="text-3xl font-bold text-white font-mono">
									<AnimatedCounter from={prevThroughput} to={throughput} duration={0.8} />
									<span className="text-lg text-gray-500 ml-1">jobs/sec</span>
								</div>
								{phase >= 5 && (
									<motion.div
										className="flex items-center gap-1 ml-auto"
										initial={{ opacity: 0, x: -10 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ duration: 0.4 }}
									>
										<TrendingUp className="w-4 h-4 text-blue-400" />
										<span className="text-[11px] text-blue-400 font-medium">Linear scaling</span>
									</motion.div>
								)}
							</div>

							{/* Progress bar */}
							<div className="mt-3 h-1.5 rounded-full bg-gray-800 overflow-hidden">
								<motion.div
									className="h-full rounded-full bg-blue-500"
									initial={{ width: '0%' }}
									animate={{ width: `${barPercent}%` }}
									transition={{ duration: 0.8, ease: 'easeOut' }}
								/>
							</div>
						</div>

						{/* Workers grid */}
						<div className="px-5 py-4">
							<div className="text-[10px] uppercase tracking-wider text-gray-600 mb-3 flex items-center gap-1.5">
								<Server className="w-3 h-3" />
								Workers
							</div>
							<div className="grid grid-cols-4 gap-2">
								{Array.from({ length: 8 }).map((_, i) => {
									const isActive = i < workerCount;
									return (
										<AnimatePresence key={i}>
											{isActive ? (
												<motion.div
													className="w-full aspect-square rounded-lg border border-blue-500/50 bg-gray-900 flex flex-col items-center justify-center gap-1 shadow-[0_0_12px_rgba(59,130,246,0.08)]"
													initial={{ opacity: 0, scale: 0.7 }}
													animate={{ opacity: 1, scale: 1 }}
													transition={{ duration: 0.3, delay: i < 4 ? 0 : (i - 4) * 0.05 }}
												>
													<Server className="w-4 h-4 text-blue-400" />
													<span className="text-[9px] font-mono text-gray-500">W{i + 1}</span>
												</motion.div>
											) : (
												<div className="w-full aspect-square rounded-lg border border-gray-800 bg-gray-900/50 border-dashed" />
											)}
										</AnimatePresence>
									);
								})}
							</div>

							{/* Summary */}
							{phase >= 6 && (
								<motion.div
									className="mt-3 text-center text-[10px] text-gray-600 font-mono"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
								>
									8 workers · ~26M jobs/month each
								</motion.div>
							)}
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	);
}

// ─── Page ───────────────────────────────────────────────────────────────────────

export default function HeroAnimationsPreview() {
	return (
		<LayoutProvider>
			<main className="relative min-h-screen w-full overflow-x-hidden">
				<LandingHeader />
				<RadialBlur />
				<div className="pt-32 max-w-full">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 pb-16">
						<h1 className="!text-4xl sm:!text-5xl !font-semibold !tracking-tight text-gray-900 mb-4 text-center">
							Workers hero animation proposals
						</h1>
						<p className="text-gray-500 text-center mb-16">Workers page hero candidates</p>

						{/* Animation 1 */}
						<section className="mb-24">
							<h2 className="!text-2xl !font-semibold text-gray-800 text-center mb-2">1. Queue Drain</h2>
							<p className="text-sm text-gray-500 text-center mb-8">Workers pull jobs from a PostgreSQL queue</p>
							<QueueDrainAnimation />
						</section>

						{/* Animation 2 */}
						<section className="mb-24">
							<h2 className="!text-2xl !font-semibold text-gray-800 text-center mb-2">2. Tag Router</h2>
							<p className="text-sm text-gray-500 text-center mb-8">Jobs route to worker groups by tag</p>
							<TagRouterAnimation />
						</section>

						{/* Animation 3 */}
						<section className="mb-24">
							<h2 className="!text-2xl !font-semibold text-gray-800 text-center mb-2">3. Scale Up</h2>
							<p className="text-sm text-gray-500 text-center mb-8">More workers, linear throughput scaling</p>
							<ScaleUpAnimation />
						</section>
					</div>
				</div>
				<Footer />
			</main>
		</LayoutProvider>
	);
}
