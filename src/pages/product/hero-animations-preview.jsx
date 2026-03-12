import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
	FileCode, ArrowLeftRight, Terminal, Check, Plus, Pencil,
	Code2, MessageSquare, Zap, ChevronRight, Play, CheckCircle, Loader2,
	GitBranch, Upload, Download, Bot, RefreshCcw
} from 'lucide-react';
import { SiTypescript, SiVisualstudiocode } from 'react-icons/si';

import LandingHeader from '../../landing/LandingHeader';
import Footer from '../../landing/Footer';
import RadialBlur from '../../landing/RadialBlur';
import LayoutProvider from '@theme/Layout/Provider';

// ─── Animation 1: SyncBridge ───────────────────────────────────────────────────

const initialRemoteFiles = [
	{ name: 'process_orders.ts', type: 'script' },
	{ name: 'slack_notify.ts', type: 'script' },
	{ name: 'daily_report.yaml', type: 'flow' },
	{ name: 'onboarding.yaml', type: 'flow' },
];


function FileRow({ name, badge, animateFrom, delay = 0, dark = false }) {
	const badgeStyles = dark ? {
		modified: 'bg-yellow-900/40 text-yellow-400',
		new: 'bg-green-900/40 text-green-400',
		synced: 'bg-blue-900/40 text-blue-400',
		pushed: 'bg-green-900/40 text-green-400',
	} : {
		modified: 'bg-yellow-100 text-yellow-700',
		new: 'bg-green-100 text-green-700',
		synced: 'bg-blue-100 text-blue-700',
		pushed: 'bg-green-100 text-green-700',
	};

	return (
		<motion.div
			className="flex items-center gap-2.5 py-2 px-3 rounded-md"
			initial={{ opacity: 0, x: animateFrom === 'left' ? -20 : animateFrom === 'right' ? 20 : 0, y: animateFrom ? 0 : 5 }}
			animate={{ opacity: 1, x: 0, y: 0 }}
			transition={{ duration: 0.3, delay }}
		>
			<FileCode className={`w-3.5 h-3.5 flex-shrink-0 ${dark ? 'text-gray-500' : 'text-gray-400'}`} />
			<span className={`text-xs truncate ${dark ? 'text-gray-300' : 'text-gray-600'}`}>{name}</span>
			{badge && (
				<motion.span
					className={`text-[10px] font-medium px-2 py-0.5 rounded-full ml-auto flex-shrink-0 ${badgeStyles[badge] || ''}`}
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.2, delay: delay + 0.1 }}
				>
					{badge}
				</motion.span>
			)}
		</motion.div>
	);
}

function SyncBridgeAnimation() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.3 });
	const [phase, setPhase] = useState(0);

	// Phases:
	// 1 - Cards fade in. Windmill has 4 files. Local is empty.
	// 2 - Pull sync (spinner in Local card).
	// 3 - Pull done: files appear in Local (file list visible).
	// 4 - File opens: code snippet (original) replaces file list.
	// 5 - Code edit: old line → new line, file gets "modified" badge.
	// 6 - Snippet closes, file list returns.
	// 7 - Push sync (spinner in Windmill card).
	// 8 - Done: Windmill shows "updated" badge, checkmark.

	useEffect(() => {
		if (!isInView) return;
		const timers = [
			setTimeout(() => setPhase(1), 400),
			setTimeout(() => setPhase(2), 1400),
			setTimeout(() => setPhase(3), 2800),
			setTimeout(() => setPhase(4), 4200),
			setTimeout(() => setPhase(5), 5200),
			setTimeout(() => setPhase(6), 6400),
			setTimeout(() => setPhase(7), 7200),
			setTimeout(() => setPhase(8), 8200),
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
					style={{ width: 560 }}
				>
					{/* ── Two columns: Windmill | Local ── */}
					<div className="flex items-stretch gap-4">
						{/* Left card: Windmill workspace */}
						<div className="flex-1 min-w-0">
							<div className="rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden" style={{ height: 320 }}>
								<div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
									<img src="/img/windmill.svg" alt="Windmill" className="w-4 h-4" />
									<span className="text-sm font-semibold text-gray-700">Windmill</span>
								</div>
								<div className="px-3 py-3">
									{/* Push syncing: spinner inside Windmill card */}
									{phase === 7 ? (
										<div className="flex flex-col items-center justify-center" style={{ minHeight: 160 }}>
											<motion.div
												initial={{ opacity: 0 }}
												animate={{ opacity: 1 }}
												transition={{ duration: 0.2 }}
											>
												<motion.div
													animate={{ rotate: 360 }}
													transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
												>
													<RefreshCcw className="w-6 h-6 text-blue-400" />
												</motion.div>
											</motion.div>
											<span className="text-[10px] text-gray-400 mt-2">Syncing...</span>
										</div>
									) : (
										<div className="space-y-0.5">
											{initialRemoteFiles.map((f, i) => (
												<motion.div
													key={f.name}
													className="flex items-center gap-2.5 py-2 px-3 rounded-md"
													initial={{ opacity: 0 }}
													animate={phase >= 1 ? { opacity: 1 } : {}}
													transition={{ duration: 0.3, delay: i * 0.08 }}
												>
													<FileCode className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
													<span className="text-xs text-gray-600 truncate">{f.name}</span>
													{phase >= 8 && i === 0 && (
														<motion.span
															className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 ml-auto flex-shrink-0"
															initial={{ opacity: 0, scale: 0.8 }}
															animate={{ opacity: 1, scale: 1 }}
															transition={{ duration: 0.2 }}
														>
															new version
														</motion.span>
													)}
												</motion.div>
											))}
										</div>
									)}
								</div>
							</div>
						</div>

						{/* Right card: Local (dark terminal style) */}
						<div className="flex-1 min-w-0">
							<div className="rounded-xl border border-gray-700 bg-gray-950 shadow-lg overflow-hidden" style={{ height: 320 }}>
								<div className="px-4 py-3 border-b border-gray-800 flex items-center gap-2">
									<img src="/img/cursor-white.svg" alt="Cursor" className="w-4 h-4" />
									<span className="text-sm font-semibold text-gray-300">Local</span>
								</div>
								<div className="px-3 py-3">
									{phase < 2 ? (
										<div className="flex items-center justify-center h-full">
											<span className="text-[11px] text-gray-600 italic">empty</span>
										</div>
									) : phase === 2 ? (
										/* Pull syncing: spinner inside Local card */
										<div className="flex flex-col items-center justify-center" style={{ minHeight: 160 }}>
											<motion.div
												initial={{ opacity: 0 }}
												animate={{ opacity: 1 }}
												transition={{ duration: 0.2 }}
											>
												<motion.div
													animate={{ rotate: 360 }}
													transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
												>
													<RefreshCcw className="w-6 h-6 text-emerald-400" />
												</motion.div>
											</motion.div>
											<span className="text-[10px] text-gray-500 mt-2">Syncing...</span>
										</div>
									) : (
										<div className="space-y-0.5">
											{initialRemoteFiles.map((f, i) => {
												// When snippet is open (phases 4–5), only show the edited file
												if (phase >= 4 && phase <= 5 && i > 0) return null;
												return (
													<FileRow
														key={f.name}
														name={f.name}
														badge={phase >= 5 && i === 0 ? (phase >= 8 ? 'pushed' : 'modified') : null}
														animateFrom="right"
														delay={i * 0.08}
														dark
													/>
												);
											})}

											{/* Inline code editor: opens on phase 4, closes after phase 5 */}
											<AnimatePresence>
											{phase >= 4 && phase <= 5 && (
												<motion.div
													key="code-snippet"
													className="mt-2 mx-1 rounded-md border border-gray-700 bg-gray-900 overflow-hidden"
													initial={{ opacity: 0, height: 0 }}
													animate={{ opacity: 1, height: 'auto' }}
													exit={{ opacity: 0, height: 0 }}
													transition={{ duration: 0.3 }}
												>
													{/* File tab */}
													<div className="flex items-center gap-1.5 px-2.5 py-1.5 border-b border-gray-800">
														<FileCode className="w-3 h-3 text-gray-500" />
														<span className="text-[10px] text-gray-400 font-mono">process_orders.ts</span>
													</div>
													{/* Code lines */}
													<div className="px-2.5 py-2 font-mono text-[10px] leading-[1.7]">
														<div className="text-gray-500">
															<span className="text-gray-600 select-none mr-2">3</span>
															<span className="text-purple-400">export async function </span>
															<span className="text-blue-300">main</span>
															<span>(limit) {'{'}</span>
														</div>
														{phase < 5 ? (
															<div className="text-gray-500">
																<span className="text-gray-600 select-none mr-2">4</span>
																<span>{'  '}const rows = db.query(q, [limit]);</span>
															</div>
														) : (
															<motion.div
																initial={{ opacity: 0 }}
																animate={{ opacity: 1 }}
																transition={{ duration: 0.3 }}
															>
																<div className="text-red-400/60 line-through">
																	<span className="text-gray-600 select-none mr-2">4</span>
																	<span>{'  '}const rows = db.query(q, [limit]);</span>
																</div>
																<div className="text-green-400 bg-green-950/30 rounded-sm">
																	<span className="text-gray-600 select-none mr-2">4</span>
																	<span>{'  '}const rows = db.query(q, [limit, offset]);</span>
																</div>
															</motion.div>
														)}
														<div className="text-gray-500">
															<span className="text-gray-600 select-none mr-2">5</span>
															<span>{'  '}return rows;</span>
														</div>
													</div>
												</motion.div>
											)}
											</AnimatePresence>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>

					{/* Sync complete bar */}
					{phase >= 8 && (
						<motion.div
							className="mt-3 mx-auto flex items-center justify-center gap-2 text-[11px] text-gray-500"
							initial={{ opacity: 0, y: 5 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.3 }}
						>
							<Check className="w-3.5 h-3.5 text-green-500" />
							<span>Workspaces in sync</span>
						</motion.div>
					)}
				</motion.div>
			</div>
		</div>
	);
}

// ─── Animation 2: DevToolkit ────────────────────────────────────────────────────

const cliFiles = ['process_orders.ts', 'process_orders.script.yaml', 'process_orders.schema.json'];

function DevToolkitAnimation() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.3 });
	const [phase, setPhase] = useState(0);

	useEffect(() => {
		if (!isInView) return;
		const timers = [
			setTimeout(() => setPhase(1), 400),
			setTimeout(() => setPhase(2), 1000),
			setTimeout(() => setPhase(3), 1800),
			setTimeout(() => setPhase(4), 2600),
			setTimeout(() => setPhase(5), 3200),
		];
		return () => timers.forEach(clearTimeout);
	}, [isInView]);

	return (
		<div ref={ref} className="relative" style={{ height: 480 }}>
			<div className="relative overflow-hidden h-full flex items-center justify-center">
				<div className="relative" style={{ width: 520, height: 420 }}>
					{/* Central script card */}
					<motion.div
						className="absolute left-1/2 -translate-x-1/2 top-0 z-10"
						initial={{ opacity: 0, scale: 0.9 }}
						animate={phase >= 1 ? { opacity: 1, scale: 1 } : {}}
						transition={{ duration: 0.4 }}
					>
						<div className="rounded-xl border border-gray-200 bg-white shadow-lg px-5 py-3 flex items-center gap-3">
							<div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
								<SiTypescript className="w-4 h-4 text-[#3178C6]" />
							</div>
							<div>
								<div className="text-sm font-semibold text-gray-800">process_orders.ts</div>
								<div className="text-[10px] text-gray-400">f/orders/process_orders</div>
							</div>
							{phase >= 5 && (
								<motion.span
									className="ml-3 text-[10px] font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-700 flex items-center gap-1"
									initial={{ opacity: 0, scale: 0.8 }}
									animate={{ opacity: 1, scale: [0.8, 1.1, 1] }}
									transition={{ duration: 0.4 }}
								>
									<Check className="w-2.5 h-2.5" /> deployed
								</motion.span>
							)}
						</div>
					</motion.div>

					{/* Connecting lines */}
					{phase >= 5 && (
						<svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ overflow: 'visible' }}>
							<motion.line x1="260" y1="60" x2="120" y2="130" stroke="#e5e7eb" strokeWidth="1.5" strokeDasharray="4 3"
								initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.4 }} />
							<motion.line x1="260" y1="60" x2="260" y2="130" stroke="#e5e7eb" strokeWidth="1.5" strokeDasharray="4 3"
								initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.4, delay: 0.1 }} />
							<motion.line x1="260" y1="60" x2="400" y2="130" stroke="#e5e7eb" strokeWidth="1.5" strokeDasharray="4 3"
								initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.4, delay: 0.2 }} />
						</svg>
					)}

					{/* CLI card */}
					<motion.div
						className="absolute left-0 z-10"
						style={{ top: 130, width: 170 }}
						initial={{ opacity: 0, x: -30 }}
						animate={phase >= 2 ? { opacity: 1, x: 0 } : {}}
						transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
					>
						<div className="rounded-xl border border-blue-200 bg-white shadow-md overflow-hidden">
							<div className="bg-blue-50 px-3 py-2 flex items-center gap-2 border-b border-blue-100">
								<Terminal className="w-3.5 h-3.5 text-blue-500" />
								<span className="text-[11px] font-semibold text-blue-700">CLI</span>
							</div>
							<div className="px-3 py-2.5 bg-gray-900 font-mono text-[10px] leading-relaxed">
								<div className="text-gray-400">$ wmill script bootstrap</div>
								<div className="text-green-400 mt-1">Created:</div>
								{cliFiles.map((f, i) => (
									<motion.div
										key={f}
										className="text-gray-300 pl-2"
										initial={{ opacity: 0 }}
										animate={phase >= 2 ? { opacity: 1 } : {}}
										transition={{ duration: 0.2, delay: 0.2 + i * 0.1 }}
									>
										{f}
									</motion.div>
								))}
							</div>
						</div>
					</motion.div>

					{/* VS Code card */}
					<motion.div
						className="absolute left-1/2 -translate-x-1/2 z-10"
						style={{ top: 130, width: 180 }}
						initial={{ opacity: 0, y: 30 }}
						animate={phase >= 3 ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
					>
						<div className="rounded-xl border border-purple-200 bg-white shadow-md overflow-hidden">
							<div className="bg-purple-50 px-3 py-2 flex items-center gap-2 border-b border-purple-100">
								<SiVisualstudiocode className="w-3.5 h-3.5 text-purple-500" />
								<span className="text-[11px] font-semibold text-purple-700">VS Code</span>
							</div>
							<div className="px-3 py-2.5 text-[10px]">
								{/* Mini code */}
								<div className="bg-gray-50 rounded p-2 font-mono text-[9px] leading-relaxed mb-2">
									<span className="text-purple-500">export async function </span>
									<span className="text-blue-600">main</span>
									<span className="text-gray-500">(</span>
									<br />
									<span className="text-gray-500">  limit: </span>
									<span className="text-green-600">number</span>
									<span className="text-gray-500">)</span>
								</div>
								{/* Preview */}
								<div className="border border-gray-200 rounded p-2 flex items-center gap-2">
									<div className="flex-1">
										<div className="text-[9px] text-gray-400 mb-0.5">limit</div>
										<div className="bg-gray-100 rounded px-1.5 py-0.5 text-[9px] text-gray-600">100</div>
									</div>
									<motion.div
										className="w-6 h-6 rounded-md bg-blue-500 flex items-center justify-center"
										animate={phase >= 3 ? { scale: [1, 1.1, 1] } : {}}
										transition={{ duration: 0.5, delay: 0.3 }}
									>
										<Play className="w-3 h-3 text-white" fill="white" />
									</motion.div>
								</div>
							</div>
						</div>
					</motion.div>

					{/* AI card */}
					<motion.div
						className="absolute right-0 z-10"
						style={{ top: 130, width: 170 }}
						initial={{ opacity: 0, x: 30 }}
						animate={phase >= 4 ? { opacity: 1, x: 0 } : {}}
						transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
					>
						<div className="rounded-xl border border-amber-200 bg-white shadow-md overflow-hidden">
							<div className="bg-amber-50 px-3 py-2 flex items-center gap-2 border-b border-amber-100">
								<Bot className="w-3.5 h-3.5 text-amber-600" />
								<span className="text-[11px] font-semibold text-amber-700">AI assistant</span>
							</div>
							<div className="px-3 py-2.5 space-y-2">
								<div className="bg-gray-100 rounded-lg rounded-tl-none px-2.5 py-1.5 text-[10px] text-gray-600">
									Add pagination to process_orders
								</div>
								<motion.div
									className="bg-amber-50 rounded-lg rounded-tr-none px-2.5 py-1.5 text-[10px] text-amber-800 flex items-start gap-1.5"
									initial={{ opacity: 0, y: 5 }}
									animate={phase >= 4 ? { opacity: 1, y: 0 } : {}}
									transition={{ duration: 0.3, delay: 0.3 }}
								>
									<Check className="w-3 h-3 text-amber-600 mt-0.5 flex-shrink-0" />
									<span>Added offset param & updated query</span>
								</motion.div>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</div>
	);
}

// ─── Animation 3: LocalLoop ────────────────────────────────────────────────────

const pipelineSteps = [
	{
		label: 'Initialize',
		detail: 'wmill init && wmill sync pull',
		icon: Download,
		color: 'blue',
	},
	{
		label: 'Edit locally',
		detail: null, // inline diff
		icon: Pencil,
		color: 'purple',
	},
	{
		label: 'Test',
		detail: '{ orders: 42 }',
		icon: Play,
		color: 'emerald',
	},
	{
		label: 'Deploy',
		detail: 'wmill sync push',
		icon: Upload,
		color: 'orange',
	},
];

const colorMap = {
	blue: { bg: 'bg-blue-50', text: 'text-blue-600', ring: 'ring-blue-200', activeBg: 'bg-blue-500' },
	purple: { bg: 'bg-purple-50', text: 'text-purple-600', ring: 'ring-purple-200', activeBg: 'bg-purple-500' },
	emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', ring: 'ring-emerald-200', activeBg: 'bg-emerald-500' },
	orange: { bg: 'bg-orange-50', text: 'text-orange-600', ring: 'ring-orange-200', activeBg: 'bg-orange-500' },
};

const miniDiff = [
	{ type: 'ctx', text: 'export async function main(limit = 100) {' },
	{ type: 'del', text: '  const rows = await db.query(q, [limit]);' },
	{ type: 'add', text: '  const rows = await db.query(q, [limit, offset]);' },
];

function LocalLoopAnimation() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.3 });
	const [phase, setPhase] = useState(0);

	useEffect(() => {
		if (!isInView) return;
		const timers = [
			setTimeout(() => setPhase(1), 300),
			setTimeout(() => setPhase(2), 800),
			setTimeout(() => setPhase(3), 1600),
			setTimeout(() => setPhase(4), 2400),
			setTimeout(() => setPhase(5), 3200),
			setTimeout(() => setPhase(6), 3800),
		];
		return () => timers.forEach(clearTimeout);
	}, [isInView]);

	// step i is active at phase i+2
	const activeStep = phase >= 2 ? Math.min(phase - 2, 3) : -1;

	return (
		<div ref={ref} className="relative" style={{ height: 480 }}>
			<div className="relative overflow-hidden h-full flex items-center justify-center">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={phase >= 1 ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.5 }}
					style={{ width: 500 }}
				>
					<div className="rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden">
						<div className="px-5 py-3.5 border-b border-gray-100 flex items-center gap-2">
							<img src="/img/windmill.svg" alt="Windmill" className="w-4 h-4" />
							<span className="text-sm font-semibold text-gray-800">Local development workflow</span>
						</div>

						<div className="px-5 py-4 space-y-0">
							{pipelineSteps.map((step, i) => {
								const colors = colorMap[step.color];
								const state = i < activeStep ? 'done' : i === activeStep ? 'active' : 'pending';
								const Icon = step.icon;

								return (
									<div key={step.label}>
										<motion.div
											className={`flex items-start gap-3 p-3 rounded-lg transition-colors duration-300 ${
												state === 'active' ? colors.bg : ''
											}`}
											initial={{ opacity: 0.3 }}
											animate={phase >= 1 ? { opacity: state === 'pending' ? 0.4 : 1 } : {}}
											transition={{ duration: 0.3 }}
										>
											{/* Icon circle */}
											<div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
												state === 'done' ? 'bg-green-500' : state === 'active' ? colors.activeBg : 'bg-gray-200'
											}`}>
												{state === 'done' ? (
													<Check className="w-3.5 h-3.5 text-white" />
												) : state === 'active' ? (
													<motion.div
														animate={{ rotate: 360 }}
														transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
													>
														<Loader2 className="w-3.5 h-3.5 text-white" />
													</motion.div>
												) : (
													<Icon className="w-3.5 h-3.5 text-gray-400" />
												)}
											</div>

											{/* Content */}
											<div className="flex-1 min-w-0">
												<div className="flex items-center gap-2">
													<span className={`text-[12px] font-semibold ${
														state === 'pending' ? 'text-gray-400' : 'text-gray-800'
													}`}>
														{step.label}
													</span>
													{state === 'done' && (
														<motion.span
															className="text-[9px] font-medium text-green-600"
															initial={{ opacity: 0 }}
															animate={{ opacity: 1 }}
														>
															done
														</motion.span>
													)}
													{/* Deploy badge */}
													{i === 3 && phase >= 5 && (
														<motion.span
															className="text-[9px] font-medium px-1.5 py-0.5 rounded-full bg-green-100 text-green-700"
															initial={{ opacity: 0, scale: 0.8 }}
															animate={{ opacity: 1, scale: 1 }}
															transition={{ duration: 0.3 }}
														>
															v14 deployed
														</motion.span>
													)}
												</div>

												{/* Detail content */}
												{state !== 'pending' && (
													<motion.div
														initial={{ opacity: 0, height: 0 }}
														animate={{ opacity: 1, height: 'auto' }}
														transition={{ duration: 0.3 }}
														className="overflow-hidden"
													>
														{i === 1 ? (
															/* Inline diff */
															<div className="mt-1.5 rounded bg-gray-950 p-2 font-mono text-[10px] leading-relaxed">
																{miniDiff.map((line, j) => (
																	<div key={j} className={
																		line.type === 'del' ? 'text-red-400 bg-red-950/30' :
																		line.type === 'add' ? 'text-green-400 bg-green-950/30' :
																		'text-gray-400'
																	}>
																		<span className="select-none mr-2 text-gray-600">
																			{line.type === 'del' ? '-' : line.type === 'add' ? '+' : ' '}
																		</span>
																		{line.text}
																	</div>
																))}
															</div>
														) : i === 2 ? (
															<div className="mt-1.5 flex items-center gap-2">
																<code className="text-[10px] bg-gray-100 rounded px-2 py-1 text-gray-700 font-mono">
																	result: {step.detail}
																</code>
																<span className="text-[9px] text-gray-400 bg-gray-50 rounded px-1.5 py-0.5">200ms</span>
															</div>
														) : (
															<code className="text-[10px] text-gray-500 font-mono mt-0.5 block">{step.detail}</code>
														)}
													</motion.div>
												)}
											</div>
										</motion.div>

										{/* Connecting line */}
										{i < pipelineSteps.length - 1 && (
											<div className="ml-[18px] w-px h-2 bg-gray-200" />
										)}
									</div>
								);
							})}
						</div>

						{/* Git bar */}
						{phase >= 6 && (
							<motion.div
								className="border-t border-gray-100 px-5 py-2.5 flex items-center gap-2 bg-gray-50"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.3 }}
							>
								<GitBranch className="w-3 h-3 text-gray-400" />
								<span className="text-[10px] text-gray-500 font-mono">main</span>
								<span className="text-[10px] text-gray-400">·</span>
								<span className="text-[10px] text-gray-500">synced with workspace</span>
								<Check className="w-3 h-3 text-green-500 ml-auto" />
							</motion.div>
						)}
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
							Hero animation proposals
						</h1>
						<p className="text-gray-500 text-center mb-16">Local development page hero candidates</p>

						{/* Animation 1 */}
						<section className="mb-24">
							<h2 className="!text-2xl !font-semibold text-gray-800 text-center mb-2">1. SyncBridge</h2>
							<p className="text-sm text-gray-500 text-center mb-8">Two-panel workspace sync</p>
							<SyncBridgeAnimation />
						</section>

						{/* Animation 2 */}
						<section className="mb-24">
							<h2 className="!text-2xl !font-semibold text-gray-800 text-center mb-2">2. DevToolkit</h2>
							<p className="text-sm text-gray-500 text-center mb-8">Three-tool card fan</p>
							<DevToolkitAnimation />
						</section>

						{/* Animation 3 */}
						<section className="mb-24">
							<h2 className="!text-2xl !font-semibold text-gray-800 text-center mb-2">3. LocalLoop</h2>
							<p className="text-sm text-gray-500 text-center mb-8">Vertical pipeline</p>
							<LocalLoopAnimation />
						</section>
					</div>
				</div>
				<Footer />
			</main>
		</LayoutProvider>
	);
}
