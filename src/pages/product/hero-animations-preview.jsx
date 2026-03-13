import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
	Bot, Shield, CheckCircle, CheckCircle2, Loader2,
	Lock, Key, GitPullRequest
} from 'lucide-react';
import { SiTypescript } from 'react-icons/si';

import LandingHeader from '../../landing/LandingHeader';
import Footer from '../../landing/Footer';
import RadialBlur from '../../landing/RadialBlur';
import LayoutProvider from '@theme/Layout/Provider';

// ─── Animation 1: Agent Sandbox Lifecycle ────────────────────────────────────

const ccLines = [
	{ type: 'prompt', text: '> Fix the failing test in auth.ts' },
	{ type: 'thinking', text: 'Analyzing test failures...' },
	{ type: 'tool', tool: 'Read', detail: 'src/auth.ts' },
	{ type: 'tool', tool: 'Bash', detail: 'npm test -- auth' },
	{ type: 'result', text: '✗ 1 failed', color: 'text-red-400/80' },
	{ type: 'tool', tool: 'Edit', detail: 'src/auth.ts:42' },
	{ type: 'tool', tool: 'Bash', detail: 'npm test -- auth' },
	{ type: 'result', text: '✓ 4 passed', color: 'text-green-400/80' },
];

function AgentLifecycleAnimation() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.3 });
	const [phase, setPhase] = useState(0);

	// Phases:
	// 1 - Card fades in with NSJAIL isolation boundary
	// 2-9 - Claude Code lines appear one by one
	// 10 - Agent completes, summary

	useEffect(() => {
		if (!isInView) return;
		const timers = [
			setTimeout(() => setPhase(1), 400),
			setTimeout(() => setPhase(2), 1400),
			setTimeout(() => setPhase(3), 2200),
			setTimeout(() => setPhase(4), 3000),
			setTimeout(() => setPhase(5), 3800),
			setTimeout(() => setPhase(6), 4400),
			setTimeout(() => setPhase(7), 5200),
			setTimeout(() => setPhase(8), 6000),
			setTimeout(() => setPhase(9), 6600),
			setTimeout(() => setPhase(10), 7800),
		];
		return () => timers.forEach(clearTimeout);
	}, [isInView]);

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
							<Bot className="w-4 h-4 text-gray-500" />
							<span className="text-sm font-semibold text-gray-300">Agent sandbox</span>
							{phase >= 10 && (
								<motion.span
									className="ml-auto text-[10px] text-gray-500 font-mono"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
								>
									1 run · 47s · 12k tokens
								</motion.span>
							)}
						</div>

						<div className="px-5 py-4" style={{ minHeight: 310 }}>
							{/* NSJAIL isolation boundary */}
							<AnimatePresence>
								{phase >= 1 && (
									<motion.div
										className={`rounded-lg border-2 border-dashed p-3 transition-colors duration-500 ${
											phase >= 10 ? 'border-green-500/30' : 'border-amber-500/40'
										}`}
										initial={{ opacity: 0, scaleY: 0.8 }}
										animate={{ opacity: 1, scaleY: 1 }}
										transition={{ duration: 0.4 }}
									>
										{/* Boundary label */}
										<div className="flex items-center gap-1.5 mb-3">
											<Shield className={`w-3 h-3 transition-colors duration-500 ${phase >= 10 ? 'text-green-400' : 'text-amber-400'}`} />
											<span className={`text-[9px] uppercase tracking-wider font-medium transition-colors duration-500 ${phase >= 10 ? 'text-green-400/80' : 'text-amber-400/80'}`}>
												NSJAIL · Isolated sandbox
											</span>
										</div>

										{/* Claude Code terminal */}
										<div className="rounded-md bg-gray-900/50 px-3 py-2.5 font-mono text-[10px]" style={{ minHeight: 200 }}>
											<div className="space-y-1.5">
												{ccLines.map((line, i) => {
													const showAt = i + 2;
													if (phase < showAt) return null;
													if (line.type === 'prompt') {
														return (
															<motion.div
																key={i}
																className="text-gray-200"
																initial={{ opacity: 0 }}
																animate={{ opacity: 1 }}
																transition={{ duration: 0.2 }}
															>
																<span className="text-blue-400">❯ </span>{line.text}
															</motion.div>
														);
													}
													if (line.type === 'thinking') {
														return (
															<motion.div
																key={i}
																className="text-gray-500 italic flex items-center gap-1.5"
																initial={{ opacity: 0 }}
																animate={{ opacity: 1 }}
																transition={{ duration: 0.2 }}
															>
																<span className="not-italic">💭</span> {line.text}
															</motion.div>
														);
													}
													if (line.type === 'tool') {
														return (
															<motion.div
																key={i}
																className="flex items-center gap-1.5"
																initial={{ opacity: 0, x: -5 }}
																animate={{ opacity: 1, x: 0 }}
																transition={{ duration: 0.2 }}
															>
																<span className="text-blue-400/60">▸</span>
																<span className="text-blue-400">{line.tool}</span>
																<span className="text-gray-500">{line.detail}</span>
															</motion.div>
														);
													}
													if (line.type === 'result') {
														return (
															<motion.div
																key={i}
																className={`pl-4 ${line.color}`}
																initial={{ opacity: 0 }}
																animate={{ opacity: 1 }}
																transition={{ duration: 0.2 }}
															>
																{line.text}
															</motion.div>
														);
													}
													return null;
												})}
												{phase >= 2 && phase < 10 && (
													<motion.div
														className="flex items-center gap-1.5 text-gray-600 pt-0.5"
														initial={{ opacity: 0 }}
														animate={{ opacity: 1 }}
													>
														<motion.div
															animate={{ rotate: 360 }}
															transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
														>
															<Loader2 className="w-3 h-3" />
														</motion.div>
													</motion.div>
												)}
												{phase >= 10 && (
													<motion.div
														className="flex items-center gap-1.5 text-green-400/80 pt-0.5"
														initial={{ opacity: 0, scale: 0.9 }}
														animate={{ opacity: 1, scale: 1 }}
													>
														<CheckCircle className="w-3 h-3" />
														<span>Done. Fixed auth token validation.</span>
													</motion.div>
												)}
											</div>
										</div>
									</motion.div>
								)}
							</AnimatePresence>
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	);
}

// ─── Animation 2: Platform Layers ────────────────────────────────────────────

function PlatformLayersAnimation() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.3 });
	const [phase, setPhase] = useState(0);

	// Phases:
	// 1 - Card fades in with RBAC layer (run identity)
	// 2 - Resource injection layer (secrets resolved)
	// 3 - NSJAIL sandbox boundary appears
	// 4 - Agent starts working inside sandbox
	// 5 - More Claude Code output
	// 6 - Agent completes, all layers show green

	useEffect(() => {
		if (!isInView) return;
		const timers = [
			setTimeout(() => setPhase(1), 400),
			setTimeout(() => setPhase(2), 1800),
			setTimeout(() => setPhase(3), 3200),
			setTimeout(() => setPhase(4), 4400),
			setTimeout(() => setPhase(5), 5600),
			setTimeout(() => setPhase(6), 7200),
		];
		return () => timers.forEach(clearTimeout);
	}, [isInView]);

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
						{/* Header */}
						<div className="px-5 py-3.5 border-b border-gray-800 flex items-center gap-2">
							<Shield className="w-4 h-4 text-gray-500" />
							<span className="text-sm font-semibold text-gray-300">Agent sandbox</span>
							{phase >= 6 && (
								<motion.span
									className="ml-auto text-[10px] text-gray-500 font-mono"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
								>
									1 run · 47s · 12k tokens
								</motion.span>
							)}
						</div>

						<div className="px-5 py-4 space-y-2.5" style={{ minHeight: 350 }}>
							{/* Layer 1: RBAC / Identity */}
							{phase >= 1 && (
								<motion.div
									className={`rounded-lg border px-3 py-2.5 transition-colors duration-500 ${
										phase >= 6 ? 'border-green-500/20 bg-green-500/5' : 'border-purple-500/30 bg-purple-500/5'
									}`}
									initial={{ opacity: 0, y: 8 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.3 }}
								>
									<div className="flex items-center gap-2">
										<Lock className={`w-3 h-3 transition-colors duration-500 ${phase >= 6 ? 'text-green-400' : 'text-purple-400'}`} />
										<span className={`text-[9px] uppercase tracking-wider font-medium transition-colors duration-500 ${phase >= 6 ? 'text-green-400/80' : 'text-purple-400/80'}`}>
											RBAC
										</span>
										<div className="ml-auto flex items-center gap-2">
											<span className="text-[10px] font-mono text-gray-400">
												run as <span className="text-purple-400/80">u/coding-agent</span>
											</span>
											{phase >= 6 && (
												<motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
													<CheckCircle className="w-3 h-3 text-green-400" />
												</motion.div>
											)}
										</div>
									</div>
								</motion.div>
							)}

							{/* Layer 2: Resource injection */}
							{phase >= 2 && (
								<motion.div
									className={`rounded-lg border px-3 py-2.5 transition-colors duration-500 ${
										phase >= 6 ? 'border-green-500/20 bg-green-500/5' : 'border-blue-500/30 bg-blue-500/5'
									}`}
									initial={{ opacity: 0, y: 8 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.3 }}
								>
									<div className="flex items-center gap-2">
										<Key className={`w-3 h-3 transition-colors duration-500 ${phase >= 6 ? 'text-green-400' : 'text-blue-400'}`} />
										<span className={`text-[9px] uppercase tracking-wider font-medium transition-colors duration-500 ${phase >= 6 ? 'text-green-400/80' : 'text-blue-400/80'}`}>
											Resources
										</span>
										<div className="ml-auto flex items-center gap-3">
											<span className="text-[10px] font-mono text-gray-500">
												<span className="text-blue-400/60">anthropic</span> → ANTHROPIC_API_KEY
											</span>
											{phase >= 6 ? (
												<motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
													<CheckCircle className="w-3 h-3 text-green-400" />
												</motion.div>
											) : (
												<motion.span
													className="text-[9px] font-medium px-1.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400"
													initial={{ opacity: 0, scale: 0.8 }}
													animate={{ opacity: 1, scale: 1 }}
													transition={{ delay: 0.3 }}
												>
													injected
												</motion.span>
											)}
										</div>
									</div>
								</motion.div>
							)}

							{/* Layer 3: NSJAIL sandbox with Claude Code inside */}
							{phase >= 3 && (
								<motion.div
									className={`rounded-lg border-2 border-dashed p-3 transition-colors duration-500 ${
										phase >= 6 ? 'border-green-500/30' : 'border-amber-500/40'
									}`}
									initial={{ opacity: 0, y: 8 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.4 }}
								>
									{/* Boundary label */}
									<div className="flex items-center gap-1.5 mb-2.5">
										<Shield className={`w-3 h-3 transition-colors duration-500 ${phase >= 6 ? 'text-green-400' : 'text-amber-400'}`} />
										<span className={`text-[9px] uppercase tracking-wider font-medium transition-colors duration-500 ${phase >= 6 ? 'text-green-400/80' : 'text-amber-400/80'}`}>
											NSJAIL · Isolated sandbox
										</span>
										{phase >= 6 && (
											<motion.div className="ml-auto" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
												<CheckCircle className="w-3 h-3 text-green-400" />
											</motion.div>
										)}
									</div>

									{/* Claude Code terminal inside sandbox */}
									<div className="rounded-md bg-gray-900/50 px-3 py-2.5 font-mono text-[10px]" style={{ minHeight: 120 }}>
										<div className="space-y-1.5">
											{phase >= 4 && (
												<motion.div
													className="text-gray-200"
													initial={{ opacity: 0 }}
													animate={{ opacity: 1 }}
												>
													<span className="text-blue-400">❯ </span>Fix the failing test in auth.ts
												</motion.div>
											)}
											{phase >= 4 && (
												<motion.div
													className="flex items-center gap-1.5"
													initial={{ opacity: 0, x: -5 }}
													animate={{ opacity: 1, x: 0 }}
													transition={{ delay: 0.2 }}
												>
													<span className="text-blue-400/60">▸</span>
													<span className="text-blue-400">Read</span>
													<span className="text-gray-500">src/auth.ts</span>
												</motion.div>
											)}
											{phase >= 5 && (
												<motion.div
													className="flex items-center gap-1.5"
													initial={{ opacity: 0, x: -5 }}
													animate={{ opacity: 1, x: 0 }}
												>
													<span className="text-blue-400/60">▸</span>
													<span className="text-blue-400">Edit</span>
													<span className="text-gray-500">src/auth.ts:42</span>
												</motion.div>
											)}
											{phase >= 5 && (
												<motion.div
													className="flex items-center gap-1.5"
													initial={{ opacity: 0, x: -5 }}
													animate={{ opacity: 1, x: 0 }}
													transition={{ delay: 0.15 }}
												>
													<span className="text-blue-400/60">▸</span>
													<span className="text-blue-400">Bash</span>
													<span className="text-gray-500">npm test -- auth</span>
												</motion.div>
											)}
											{phase >= 5 && (
												<motion.div
													className="pl-4 text-green-400/80"
													initial={{ opacity: 0 }}
													animate={{ opacity: 1 }}
													transition={{ delay: 0.3 }}
												>
													✓ 4 passed
												</motion.div>
											)}
											{phase >= 4 && phase < 6 && (
												<motion.div
													className="flex items-center gap-1.5 text-gray-600 pt-0.5"
													initial={{ opacity: 0 }}
													animate={{ opacity: 1 }}
												>
													<motion.div
														animate={{ rotate: 360 }}
														transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
													>
														<Loader2 className="w-3 h-3" />
													</motion.div>
												</motion.div>
											)}
											{phase >= 6 && (
												<motion.div
													className="flex items-center gap-1.5 text-green-400/80 pt-0.5"
													initial={{ opacity: 0, scale: 0.9 }}
													animate={{ opacity: 1, scale: 1 }}
												>
													<CheckCircle className="w-3 h-3" />
													<span>Done. Fixed auth token validation.</span>
												</motion.div>
											)}
										</div>
									</div>
								</motion.div>
							)}
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	);
}

// ─── Animation 3: Flow DAG (Linear → Sandbox → PR) ─────────────────────────

const DAG_CX = 130;
const DAG_NH = 40;
const DAG_W = 230;
const DAG_GAP = 70;

function FlowDagAnimation() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.3 });
	const [phase, setPhase] = useState(0);

	// Phases:
	// 0 - nothing
	// 1 - All nodes + edges appear at once
	// 2 - Ball at Linear, blue glow, issues tooltip
	// 3 - Ball moves to Sandbox, blue glow
	// 4 - NSJAIL panel appears
	// 5 - Ball moves to Result, PR tooltip

	const linearY = 20;
	const sandboxY = linearY + DAG_NH + DAG_GAP;
	const resultY = sandboxY + DAG_NH + DAG_GAP;

	const ballPositions = {
		2: linearY + DAG_NH / 2,
		3: sandboxY + DAG_NH / 2,
		4: sandboxY + DAG_NH / 2,
		5: resultY + DAG_NH / 2,
	};

	useEffect(() => {
		if (!isInView) return;
		const timers = [
			setTimeout(() => setPhase(1), 300),
			setTimeout(() => setPhase(2), 900),
			setTimeout(() => setPhase(3), 2200),
			setTimeout(() => setPhase(4), 2900),
			setTimeout(() => setPhase(5), 6400),
			setTimeout(() => setPhase(6), 7200),
		];
		return () => timers.forEach(clearTimeout);
	}, [isInView]);

	const linearActive = phase >= 2 && phase < 3;
	const sandboxActive = phase >= 3 && phase < 5;
	const resultActive = phase >= 5 && phase <= 6;

	return (
		<div ref={ref} className="relative" style={{ height: 380 }}>
			<div className="relative h-full flex items-start justify-center">
				<div className="relative" style={{ width: DAG_W + 400, height: resultY + DAG_NH + 20 }}>

					{/* SVG edges + ball */}
					{phase >= 1 && (
						<svg className="absolute inset-0 pointer-events-none" style={{ width: '100%', height: '100%' }}>
							<motion.line x1={DAG_CX} y1={linearY + DAG_NH} x2={DAG_CX} y2={sandboxY} stroke="#d1d5db" strokeWidth={1.5} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} />
							<motion.line x1={DAG_CX} y1={sandboxY + DAG_NH} x2={DAG_CX} y2={resultY} stroke="#d1d5db" strokeWidth={1.5} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: 0.05 }} />

							{/* Animated ball */}
							{phase >= 2 && (
								<motion.circle
									cx={DAG_CX}
									r={5}
									fill="#3b82f6"
									initial={{ cy: ballPositions[2], opacity: 0 }}
									animate={{ cy: ballPositions[phase] || ballPositions[5], opacity: phase >= 6 ? 0 : 1 }}
									transition={{ duration: 0.7, ease: 'linear' }}
								/>
							)}
						</svg>
					)}

					{/* Linear node */}
					{phase >= 1 && (
						<motion.div
							className="absolute"
							style={{ left: DAG_CX - DAG_W / 2, top: linearY }}
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.35 }}
						>
							<div className="relative">
								{linearActive && (
									<motion.div className="absolute -inset-1 rounded-xl bg-blue-400/20" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} />
								)}
								<div className={`relative px-4 py-2 rounded-xl border shadow-sm bg-white flex items-center gap-2.5 justify-center transition-colors duration-200 ${linearActive ? 'border-blue-400' : 'border-gray-200'}`} style={{ width: DAG_W, height: DAG_NH }}>
									<SiTypescript className="w-4 h-4 flex-shrink-0 text-[#3178C6]" />
									<span className="text-sm font-medium whitespace-nowrap text-gray-700">Fetch Linear issues</span>
								</div>

								{/* Issues log card */}
								{phase >= 2 && (
									<div className="absolute left-full ml-3 z-20" style={{ top: DAG_NH / 2, transform: 'translateY(-50%)' }}>
										<motion.div
											initial={{ opacity: 0, x: -8 }}
											animate={{ opacity: 1, x: 0 }}
											transition={{ duration: 0.3 }}
										>
											<div className="rounded-lg border border-green-800 bg-gray-900/95 shadow-sm px-3 py-2 whitespace-nowrap" style={{ width: 240 }}>
												<div className="text-[12px] font-mono text-white flex items-center gap-1.5">
													<CheckCircle className="w-3.5 h-3.5 text-green-400" />
													3 issues found
												</div>
											</div>
										</motion.div>
									</div>
								)}
							</div>
						</motion.div>
					)}

					{/* Sandbox node */}
					{phase >= 1 && (
						<motion.div
							className="absolute"
							style={{ left: DAG_CX - DAG_W / 2, top: sandboxY }}
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.35, delay: 0.1 }}
						>
							<div className="relative">
								{sandboxActive && (
									<motion.div className="absolute -inset-1 rounded-xl bg-blue-400/20" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} />
								)}
								<div className={`relative px-4 py-2 rounded-xl border shadow-sm bg-white flex items-center gap-2.5 justify-center transition-colors duration-200 ${sandboxActive ? 'border-blue-400' : 'border-gray-200'}`} style={{ width: DAG_W, height: DAG_NH }}>
									<img src="/third_party_logos/claude.png" alt="" className="w-4 h-4 flex-shrink-0" />
									<span className="text-sm font-medium whitespace-nowrap text-gray-700">Fix issues and open PR</span>
								</div>

								{/* NSJAIL panel: full when active, collapsed after */}
								{phase >= 4 && (
									<div className="absolute left-full ml-3 z-20" style={{ top: DAG_NH / 2, transform: 'translateY(-50%)' }}>
										<AnimatePresence mode="wait">
											{phase < 5 ? (
												<motion.div
													key="full"
													initial={{ opacity: 0, x: -10 }}
													animate={{ opacity: 1, x: 0 }}
													exit={{ opacity: 0 }}
													transition={{ duration: 0.4 }}
												>
													<div className="rounded-lg border-2 border-dashed border-amber-500/40 bg-gray-900/90 p-3" style={{ width: 360 }}>
														<div className="flex items-center gap-1.5 mb-2">
															<Shield className="w-3 h-3 text-amber-400" />
															<span className="text-[9px] uppercase tracking-wider font-medium text-amber-400/80">
																NSJAIL · Isolated sandbox
															</span>
														</div>
														<div className="rounded-md bg-gray-950 border border-gray-700 px-3 py-3 font-mono text-[10px]" style={{ minHeight: 180 }}>
															<div className="space-y-1.5">
																<motion.div className="text-gray-200" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
																	<span className="text-blue-400">❯ </span>Fix WM-142: auth timeout
																</motion.div>
																<motion.div className="text-gray-500 italic flex items-center gap-1.5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
																	<span className="not-italic">💭</span> Analyzing the issue...
																</motion.div>
																<motion.div className="flex items-center gap-1.5" initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }}>
																	<span className="text-blue-400/60">▸</span>
																	<span className="text-blue-400">Read</span>
																	<span className="text-gray-500">src/auth.ts</span>
																</motion.div>
																<motion.div className="flex items-center gap-1.5" initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.0 }}>
																	<span className="text-blue-400/60">▸</span>
																	<span className="text-blue-400">Edit</span>
																	<span className="text-gray-500">src/auth.ts:42</span>
																</motion.div>
																<motion.div className="flex items-center gap-1.5" initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.3 }}>
																	<span className="text-blue-400/60">▸</span>
																	<span className="text-blue-400">Bash</span>
																	<span className="text-gray-500">npm test -- auth</span>
																</motion.div>
																<motion.div className="pl-4 text-green-400/80" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}>
																	✓ 4 passed
																</motion.div>
																<motion.div className="flex items-center gap-1.5" initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.9 }}>
																	<span className="text-blue-400/60">▸</span>
																	<span className="text-blue-400">Bash</span>
																	<span className="text-gray-500">git push origin fix/wm-142</span>
																</motion.div>
																<motion.div className="flex items-center gap-1.5" initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 2.2 }}>
																	<span className="text-blue-400/60">▸</span>
																	<span className="text-blue-400">Bash</span>
																	<span className="text-gray-500">gh pr create</span>
																</motion.div>
																<motion.div className="flex items-center gap-1.5 text-gray-600 pt-0.5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}>
																	<motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
																		<Loader2 className="w-3 h-3" />
																	</motion.div>
																</motion.div>
															</div>
														</div>
													</div>
												</motion.div>
											) : (
												<motion.div
													key="collapsed"
													initial={{ opacity: 0 }}
													animate={{ opacity: 1 }}
													transition={{ duration: 0.3 }}
												>
													<div className="rounded-lg border border-green-800 bg-gray-900/95 shadow-sm px-3 py-2 whitespace-nowrap" style={{ width: 240 }}>
														<div className="text-[12px] font-mono text-white flex items-center gap-1.5">
															<CheckCircle className="w-3.5 h-3.5 text-green-400" />
															Issues fixed and PR opened
														</div>
													</div>
												</motion.div>
											)}
										</AnimatePresence>
									</div>
								)}
							</div>
						</motion.div>
					)}

					{/* Result node */}
					{phase >= 1 && (
						<motion.div
							className="absolute"
							style={{ left: DAG_CX - DAG_W / 2, top: resultY }}
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.35, delay: 0.15 }}
						>
							<div className="relative">
								{resultActive && (
									<motion.div className="absolute -inset-1 rounded-xl bg-blue-400/20" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} />
								)}
								<div className={`relative px-4 py-2 rounded-xl border shadow-sm flex items-center gap-2.5 justify-center bg-gray-50 transition-colors duration-200 ${resultActive ? 'border-blue-400' : 'border-gray-200'}`} style={{ width: DAG_W, height: DAG_NH }}>
									<CheckCircle2 className="w-4 h-4 flex-shrink-0 text-gray-400" />
									<span className="text-sm font-medium whitespace-nowrap text-gray-600">Result</span>
								</div>

								{/* PR output tooltip next to Result */}
								{phase >= 6 && (
									<div className="absolute left-full ml-3 z-30" style={{ top: DAG_NH / 2, transform: 'translateY(-50%)' }}>
										<motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, delay: 0.2 }}>
											<div className="rounded-lg border border-green-800 bg-gray-900/95 shadow-sm px-3 py-2 whitespace-nowrap" style={{ width: 240 }}>
												<div className="text-[12px] font-mono text-white flex items-center gap-1.5">
													<GitPullRequest className="w-3.5 h-3.5 text-blue-400" />
													#284 Fix linear issues
												</div>
											</div>
										</motion.div>
									</div>
								)}
							</div>
						</motion.div>
					)}
				</div>
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
							Sandboxes hero animation proposals
						</h1>
						<p className="text-gray-500 text-center mb-16">Sandboxes page hero candidates</p>

						{/* Animation 1 */}
						<section className="mb-24">
							<h2 className="!text-2xl !font-semibold text-gray-800 text-center mb-2">1. Sandbox only</h2>
							<p className="text-sm text-gray-500 text-center mb-8">Claude Code running inside NSJAIL</p>
							<AgentLifecycleAnimation />
						</section>

						{/* Animation 2 */}
						<section className="mb-24">
							<h2 className="!text-2xl !font-semibold text-gray-800 text-center mb-2">2. Platform layers</h2>
							<p className="text-sm text-gray-500 text-center mb-8">RBAC identity, resource injection, then NSJAIL sandbox</p>
							<PlatformLayersAnimation />
						</section>

						{/* Animation 3 */}
						<section className="mb-24">
							<h2 className="!text-2xl !font-semibold text-gray-800 text-center mb-2">3. Flow integration</h2>
							<p className="text-sm text-gray-500 text-center mb-8">Linear issues in, PRs out</p>
							<FlowDagAnimation />
						</section>
					</div>
				</div>
				<Footer />
			</main>
		</LayoutProvider>
	);
}
