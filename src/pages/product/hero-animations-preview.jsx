import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Rocket, History, GitBranch, FileCode, RotateCcw, GitMerge, CheckCircle2, ChevronRight, Terminal, Monitor, ArrowDown } from 'lucide-react';
import { SiTypescript } from 'react-icons/si';

import LandingHeader from '../../landing/LandingHeader';
import Footer from '../../landing/Footer';
import RadialBlur from '../../landing/RadialBlur';
import LayoutProvider from '@theme/Layout/Provider';

const fadeIn = {
	initial: { opacity: 0, y: 30 },
	whileInView: { opacity: 1, y: 0 },
	viewport: { once: true },
	transition: { duration: 0.5 }
};

// ══════════════════════════════════════════════════════
// Concept 1: Deploy lifecycle
// Draft → Deploy → v12 → edit → v13 with diff flash
// ══════════════════════════════════════════════════════

function DeployLifecycle() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.3 });
	const [phase, setPhase] = useState(0);

	useEffect(() => {
		if (!isInView) return;
		const timers = [
			setTimeout(() => setPhase(1), 400),   // script card appears with code
			setTimeout(() => setPhase(2), 1400),   // deploy button click
			setTimeout(() => setPhase(3), 2000),   // diff view + v13 badge
		];
		return () => timers.forEach(clearTimeout);
	}, [isInView]);

	const version = phase >= 3 ? 'v13' : null;
	const isDraft = phase >= 1 && phase < 2;
	const isDeploying = phase === 2;
	const showDiff = phase >= 3;

	const diffLines = [
		{ type: 'ctx', text: 'import { getResource } from "windmill-client";' },
		{ type: 'ctx', text: '' },
		{ type: 'del', text: 'export async function main(limit = 100) {' },
		{ type: 'add', text: 'export async function main(limit = 100, offset = 0) {' },
		{ type: 'ctx', text: '  const db = await getResource("f/orders/pg");' },
		{ type: 'del', text: '  const rows = await db.query(' },
		{ type: 'del', text: '    `SELECT * FROM orders LIMIT $1`,' },
		{ type: 'del', text: '    [limit]' },
		{ type: 'del', text: '  );' },
		{ type: 'add', text: '  const rows = await db.query(' },
		{ type: 'add', text: '    `SELECT * FROM orders LIMIT $1 OFFSET $2`,' },
		{ type: 'add', text: '    [limit, offset]' },
		{ type: 'add', text: '  );' },
		{ type: 'ctx', text: '  return rows;' },
		{ type: 'ctx', text: '}' },
	];

	return (
		<div ref={ref} className="relative" style={{ height: 480 }}>
			<div className="relative overflow-hidden h-full flex items-center justify-center">
				<motion.div
					style={{ width: 560 }}
					initial={{ opacity: 0, y: 20 }}
					animate={phase >= 1 ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.5 }}
				>
					<div className="rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden">
						{/* Title bar */}
						<div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50">
							<div className="flex items-center gap-2.5">
								<SiTypescript className="w-4 h-4 text-[#3178C6] flex-shrink-0" />
								<span className="text-sm font-semibold text-gray-800">fetch_orders.ts</span>
								{version && (
									<motion.span
										className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700"
										initial={{ opacity: 0, scale: 0.8 }}
										animate={{ opacity: 1, scale: 1 }}
										key={version}
										transition={{ duration: 0.3 }}
									>
										{version}
									</motion.span>
								)}
								{isDraft && (
									<motion.span
										className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-yellow-100 text-yellow-700"
										initial={{ opacity: 0, scale: 0.8 }}
										animate={{ opacity: 1, scale: 1 }}
										transition={{ duration: 0.3 }}
									>
										Draft
									</motion.span>
								)}
								</div>
							{/* Right side: buttons or diff label */}
							{showDiff ? (
								<motion.div
									className="flex items-center gap-2"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 0.3 }}
								>
									<span className="text-[11px] font-semibold text-gray-600">v12 → v13</span>
									<span className="text-red-500 font-mono text-[10px]">-4</span>
									<span className="text-green-500 font-mono text-[10px]">+5</span>
								</motion.div>
							) : (
								<motion.div
									className={`px-3 py-1 rounded-lg text-[11px] font-semibold ${
										isDeploying
											? 'bg-blue-600 text-white'
											: 'bg-blue-500 text-white'
									}`}
									animate={isDeploying ? { scale: [1, 0.92, 1] } : {}}
									transition={{ duration: 0.3 }}
								>
									<div className="flex items-center gap-1.5">
										<Rocket className="w-3 h-3" />
										Deploy
									</div>
								</motion.div>
							)}
						</div>

						{/* Content: code or diff */}
						<div className="relative overflow-hidden" style={{ height: 340 }}>
							{/* Code view */}
							<motion.div
								className="px-4 py-3 font-mono text-[11px] leading-6 text-gray-600 space-y-0"
								animate={showDiff ? { opacity: 0, position: 'absolute', pointerEvents: 'none' } : { opacity: 1 }}
								transition={{ duration: 0.3 }}
							>
								<div><span className="text-purple-600">import</span> {'{ getResource }'} <span className="text-purple-600">from</span> <span className="text-green-700">"windmill-client"</span>;</div>
								<div className="h-3" />
								<div><span className="text-purple-600">export async function</span> <span className="text-blue-600">main</span>(limit = 100, offset = 0) {'{'}</div>
								<div>{'  '}<span className="text-purple-600">const</span> db = <span className="text-purple-600">await</span> getResource(<span className="text-green-700">"f/orders/pg"</span>);</div>
								<div>{'  '}<span className="text-purple-600">const</span> rows = <span className="text-purple-600">await</span> db.query(</div>
								<div>{'    '}<span className="text-green-700">`SELECT * FROM orders LIMIT $1 OFFSET $2`</span>,</div>
								<div>{'    '}[limit, offset]</div>
								<div>{'  '});</div>
								<div>{'  '}<span className="text-purple-600">return</span> rows;</div>
								<div>{'}'}</div>
							</motion.div>

							{/* Diff view (replaces code) */}
							{showDiff && (
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 0.4, delay: 0.15 }}
								>
									<div className="font-mono text-[10px] leading-[20px]">
										{diffLines.map((line, i) => (
											<motion.div
												key={i}
												className={`flex ${
													line.type === 'del' ? 'bg-red-50' :
													line.type === 'add' ? 'bg-green-50' :
													''
												}`}
												initial={{ opacity: 0 }}
												animate={{ opacity: 1 }}
												transition={{ duration: 0.1, delay: 0.2 + i * 0.04 }}
											>
												<span className={`w-6 text-right pr-1 select-none flex-shrink-0 ${
													line.type === 'del' ? 'text-red-300' :
													line.type === 'add' ? 'text-green-300' :
													'text-gray-300'
												}`}>
													{line.type !== 'add' ? i + 1 : ''}
												</span>
												<span className={`w-6 text-right pr-1 select-none flex-shrink-0 ${
													line.type === 'del' ? 'text-red-300' :
													line.type === 'add' ? 'text-green-300' :
													'text-gray-300'
												}`}>
													{line.type !== 'del' ? i + 1 : ''}
												</span>
												<span className={`w-4 text-center select-none flex-shrink-0 ${
													line.type === 'del' ? 'text-red-400' :
													line.type === 'add' ? 'text-green-400' :
													'text-gray-300'
												}`}>
													{line.type === 'del' ? '-' : line.type === 'add' ? '+' : ' '}
												</span>
												<span className={`pr-3 whitespace-pre ${
													line.type === 'del' ? 'text-red-700' :
													line.type === 'add' ? 'text-green-700' :
													'text-gray-500'
												}`}>{line.text}</span>
											</motion.div>
										))}
									</div>
								</motion.div>
							)}
						</div>

						{/* Status bar */}
						{phase >= 4 && (
							<motion.div
								className="flex items-center justify-between px-4 py-2 border-t border-gray-100 bg-gray-50"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.3 }}
							>
								<div className="flex items-center gap-2">
									<CheckCircle2 className="w-3 h-3 text-green-500" />
									<span className="text-[10px] text-green-600 font-medium">Deployed</span>
									{phase >= 3 && (
										<motion.span
											className="text-[10px] font-mono text-gray-400"
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
										>
											a3f7c2e
										</motion.span>
									)}
								</div>
							</motion.div>
						)}
					</div>
				</motion.div>
			</div>
		</div>
	);
}


// ══════════════════════════════════════════════════════
// Concept 2: Git sync loop
// Windmill ↔ Git bidirectional sync
// ══════════════════════════════════════════════════════

function GitSyncLoop() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.3 });
	const [phase, setPhase] = useState(0);

	useEffect(() => {
		if (!isInView) return;
		const timers = [
			setTimeout(() => setPhase(1), 400),   // panels appear
			setTimeout(() => setPhase(2), 1200),   // change in Windmill
			setTimeout(() => setPhase(3), 2000),   // ball travels Windmill → Git
			setTimeout(() => setPhase(4), 3000),   // commit appears in Git
			setTimeout(() => setPhase(5), 4000),   // change in Git
			setTimeout(() => setPhase(6), 4800),   // ball travels Git → Windmill
			setTimeout(() => setPhase(7), 5800),   // synced in Windmill
		];
		return () => timers.forEach(clearTimeout);
	}, [isInView]);

	return (
		<div ref={ref} className="relative" style={{ height: 440 }}>
			<div className="relative overflow-hidden h-full flex items-center justify-center">
				<div style={{ width: 520 }}>
					<div className="flex gap-4 items-stretch">
						{/* Windmill panel */}
						<motion.div
							className="flex-1 rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden"
							initial={{ opacity: 0, x: -20 }}
							animate={phase >= 1 ? { opacity: 1, x: 0 } : {}}
							transition={{ duration: 0.5 }}
						>
							<div className="px-3 py-2.5 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
								<Monitor className="w-3.5 h-3.5 text-blue-500" />
								<span className="text-[11px] font-semibold text-gray-700">Windmill</span>
							</div>
							<div className="p-3 space-y-2">
								{/* Script item */}
								<div className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-gray-50 text-[11px]">
									<FileCode className="w-3 h-3 text-gray-400" />
									<span className="text-gray-700 font-medium">fetch_orders.ts</span>
									<span className="ml-auto text-[9px] text-gray-400 font-mono">v12</span>
								</div>

								{/* Change indicator */}
								{phase >= 2 && (
									<motion.div
										className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-blue-50 border border-blue-200 text-[11px]"
										initial={{ opacity: 0, height: 0 }}
										animate={{ opacity: 1, height: 'auto' }}
										transition={{ duration: 0.3 }}
									>
										<Rocket className="w-3 h-3 text-blue-500" />
										<span className="text-blue-700 font-medium">Deployed v13</span>
									</motion.div>
								)}

								{/* Synced from Git */}
								{phase >= 7 && (
									<motion.div
										className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-green-50 border border-green-200 text-[11px]"
										initial={{ opacity: 0, height: 0 }}
										animate={{ opacity: 1, height: 'auto' }}
										transition={{ duration: 0.3 }}
									>
										<GitBranch className="w-3 h-3 text-green-500" />
										<span className="text-green-700 font-medium">Synced: new env var</span>
									</motion.div>
								)}
							</div>
						</motion.div>

						{/* Middle connection area */}
						<div className="flex flex-col items-center justify-center gap-2" style={{ width: 60 }}>
							{/* Forward ball (Windmill → Git) */}
							{(phase === 3) && (
								<motion.div
									className="w-3 h-3 rounded-full bg-blue-400"
									style={{ filter: 'drop-shadow(0 0 6px rgba(96,165,250,0.8))' }}
									initial={{ y: -40, opacity: 0 }}
									animate={{ y: 40, opacity: [0, 1, 1, 0] }}
									transition={{ duration: 0.8, times: [0, 0.1, 0.8, 1] }}
								/>
							)}
							{/* Arrow labels */}
							<div className="text-[9px] text-gray-400 font-medium">auto-commit</div>
							<svg width="40" height="24" viewBox="0 0 40 24">
								<path d="M5 8 L35 8" stroke="#d1d5db" strokeWidth="1" fill="none" markerEnd="url(#arrowR)" />
								<path d="M35 16 L5 16" stroke="#d1d5db" strokeWidth="1" fill="none" markerEnd="url(#arrowL)" />
								<defs>
									<marker id="arrowR" viewBox="0 0 6 6" refX="6" refY="3" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L6,3 L0,6" fill="#d1d5db" /></marker>
									<marker id="arrowL" viewBox="0 0 6 6" refX="0" refY="3" markerWidth="6" markerHeight="6" orient="auto"><path d="M6,0 L0,3 L6,6" fill="#d1d5db" /></marker>
								</defs>
							</svg>
							<div className="text-[9px] text-gray-400 font-medium">sync pull</div>

							{/* Reverse ball (Git → Windmill) */}
							{(phase === 6) && (
								<motion.div
									className="absolute w-3 h-3 rounded-full bg-green-400"
									style={{ filter: 'drop-shadow(0 0 6px rgba(74,222,128,0.8))' }}
									initial={{ y: 40, opacity: 0 }}
									animate={{ y: -40, opacity: [0, 1, 1, 0] }}
									transition={{ duration: 0.8, times: [0, 0.1, 0.8, 1] }}
								/>
							)}
						</div>

						{/* Git panel */}
						<motion.div
							className="flex-1 rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden"
							initial={{ opacity: 0, x: 20 }}
							animate={phase >= 1 ? { opacity: 1, x: 0 } : {}}
							transition={{ duration: 0.5, delay: 0.1 }}
						>
							<div className="px-3 py-2.5 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
								<GitBranch className="w-3.5 h-3.5 text-orange-500" />
								<span className="text-[11px] font-semibold text-gray-700">Git repository</span>
							</div>
							<div className="p-3 space-y-2">
								<div className="text-[10px] text-gray-400 font-mono mb-2">main</div>

								{/* Existing commit */}
								<div className="flex items-center gap-2 px-2 py-1.5 text-[11px]">
									<div className="w-2 h-2 rounded-full bg-gray-300 flex-shrink-0" />
									<span className="text-gray-500 font-mono text-[10px]">b8d1f4a</span>
									<span className="text-gray-600 truncate">initial deploy</span>
								</div>

								{/* Auto-committed */}
								{phase >= 4 && (
									<motion.div
										className="flex items-center gap-2 px-2 py-1.5 text-[11px]"
										initial={{ opacity: 0, x: -10 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ duration: 0.3 }}
									>
										<div className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0" />
										<span className="text-gray-500 font-mono text-[10px]">a3f7c2e</span>
										<span className="text-gray-600 truncate">deploy v13</span>
									</motion.div>
								)}

								{/* External change */}
								{phase >= 5 && (
									<motion.div
										className="flex items-center gap-2 px-2 py-1.5 text-[11px]"
										initial={{ opacity: 0, x: -10 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ duration: 0.3 }}
									>
										<div className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />
										<span className="text-gray-500 font-mono text-[10px]">e9b2d1f</span>
										<span className="text-gray-600 truncate">add env var</span>
									</motion.div>
								)}
							</div>
						</motion.div>
					</div>
				</div>
			</div>
		</div>
	);
}


// ══════════════════════════════════════════════════════
// Concept 3: Version timeline
// Vertical timeline with versions, diff flash, rollback
// ══════════════════════════════════════════════════════

const versions = [
	{ ver: 'v10', hash: 'c4e8a1b', msg: 'Add rate limiter', time: '2h ago' },
	{ ver: 'v11', hash: 'f2d9b3c', msg: 'Fix timeout bug', time: '1h ago' },
	{ ver: 'v12', hash: 'b8d1f4a', msg: 'Add pagination param', time: '30m ago' },
	{ ver: 'v13', hash: 'a3f7c2e', msg: 'Add offset support', time: 'just now' },
];

function VersionTimeline() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.3 });
	const [visibleCount, setVisibleCount] = useState(0);
	const [showDiff, setShowDiff] = useState(false);
	const [showRollback, setShowRollback] = useState(false);

	useEffect(() => {
		if (!isInView) return;
		const timers = [
			setTimeout(() => setVisibleCount(1), 400),
			setTimeout(() => setVisibleCount(2), 800),
			setTimeout(() => setVisibleCount(3), 1200),
			setTimeout(() => setVisibleCount(4), 1600),
			setTimeout(() => setShowDiff(true), 2400),
			setTimeout(() => setShowRollback(true), 3800),
		];
		return () => timers.forEach(clearTimeout);
	}, [isInView]);

	return (
		<div ref={ref} className="relative" style={{ height: 480 }}>
			<div className="relative overflow-hidden h-full flex items-center justify-center">
				<div style={{ width: 500 }} className="flex gap-6">
					{/* Timeline */}
					<div className="relative flex flex-col items-center" style={{ width: 280 }}>
						<div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 self-start flex items-center gap-2">
							<History className="w-3.5 h-3.5" />
							Deployment history
						</div>

						{versions.map((v, i) => {
							const isVisible = i < visibleCount;
							const isLatest = i === versions.length - 1;
							const isRollbackTarget = showRollback && i === 1;

							return (
								<motion.div
									key={v.ver}
									className="flex items-start gap-3 w-full relative"
									initial={{ opacity: 0, y: 10 }}
									animate={isVisible ? { opacity: 1, y: 0 } : {}}
									transition={{ duration: 0.35 }}
								>
									{/* Timeline dot and line */}
									<div className="flex flex-col items-center flex-shrink-0" style={{ width: 16 }}>
										<motion.div
											className={`w-3 h-3 rounded-full border-2 ${
												isLatest ? 'border-blue-500 bg-blue-100' :
												isRollbackTarget ? 'border-amber-500 bg-amber-100' :
												'border-gray-300 bg-white'
											}`}
											animate={isRollbackTarget ? { scale: [1, 1.3, 1] } : {}}
											transition={{ duration: 0.5 }}
										/>
										{i < versions.length - 1 && (
											<div className="w-px h-8 bg-gray-200" />
										)}
									</div>

									{/* Version info */}
									<div className="pb-4 flex-1 min-w-0">
										<div className="flex items-center gap-2">
											<span className="text-xs font-bold text-gray-800">{v.ver}</span>
											<span className="text-[10px] font-mono text-gray-400">{v.hash}</span>
											{isLatest && (
												<span className="text-[9px] font-medium px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-600">latest</span>
											)}
										</div>
										<div className="text-[11px] text-gray-500 mt-0.5">{v.msg}</div>
										<div className="text-[10px] text-gray-400 mt-0.5">{v.time}</div>
									</div>
								</motion.div>
							);
						})}

						{/* Rollback arrow */}
						{showRollback && (
							<motion.div
								className="absolute right-0 flex items-center gap-1.5"
								style={{ top: 120 }}
								initial={{ opacity: 0, x: 10 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.4 }}
							>
								<RotateCcw className="w-3 h-3 text-amber-500" />
								<span className="text-[10px] font-medium text-amber-600">Restore v11</span>
							</motion.div>
						)}
					</div>

					{/* Diff panel */}
					{showDiff && (
						<motion.div
							className="flex-1 rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden self-start"
							initial={{ opacity: 0, x: 15 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5 }}
						>
							<div className="px-3 py-2 border-b border-gray-100 bg-gray-50 text-[11px] font-medium text-gray-500">
								v12 → v13
							</div>
							<div className="font-mono text-[10px] leading-5">
								{[
									{ type: 'ctx', text: '  const db = await getResource(...)' },
									{ type: 'del', text: '- const rows = await db.query(' },
									{ type: 'del', text: '-   `SELECT * LIMIT $1`, [limit]' },
									{ type: 'del', text: '- );' },
									{ type: 'add', text: '+ const rows = await db.query(' },
									{ type: 'add', text: '+   `SELECT * LIMIT $1 OFFSET $2`,' },
									{ type: 'add', text: '+   [limit, offset]' },
									{ type: 'add', text: '+ );' },
									{ type: 'ctx', text: '  return rows;' },
								].map((line, i) => (
									<motion.div
										key={i}
										className={`px-3 ${
											line.type === 'del' ? 'bg-red-50 text-red-700' :
											line.type === 'add' ? 'bg-green-50 text-green-700' :
											'text-gray-500'
										}`}
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transition={{ duration: 0.1, delay: i * 0.05 }}
									>
										{line.text}
									</motion.div>
								))}
							</div>
						</motion.div>
					)}
				</div>
			</div>
		</div>
	);
}


// ══════════════════════════════════════════════════════
// Concept 4: Fork and merge
// Workspace splits into fork, independent changes, merge
// ══════════════════════════════════════════════════════

function ForkAndMerge() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.3 });
	const [phase, setPhase] = useState(0);

	useEffect(() => {
		if (!isInView) return;
		const timers = [
			setTimeout(() => setPhase(1), 400),   // parent workspace
			setTimeout(() => setPhase(2), 1200),   // fork splits off
			setTimeout(() => setPhase(3), 2000),   // commit on parent
			setTimeout(() => setPhase(4), 2600),   // commit on fork
			setTimeout(() => setPhase(5), 3200),   // another commit on fork
			setTimeout(() => setPhase(6), 4000),   // merge arrow
			setTimeout(() => setPhase(7), 4800),   // merged badge
		];
		return () => timers.forEach(clearTimeout);
	}, [isInView]);

	return (
		<div ref={ref} className="relative" style={{ height: 440 }}>
			<div className="relative overflow-hidden h-full flex items-center justify-center">
				<div style={{ width: 500 }} className="space-y-4">
					{/* Parent workspace */}
					<motion.div
						className="rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden"
						initial={{ opacity: 0, y: 20 }}
						animate={phase >= 1 ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.5 }}
					>
						<div className="px-4 py-2.5 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
							<div className="flex items-center gap-2">
								<div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
								<span className="text-[11px] font-semibold text-gray-700">Production workspace</span>
							</div>
							<span className="text-[10px] text-gray-400 font-mono">main</span>
						</div>
						<div className="px-4 py-3 flex items-center gap-2">
							{/* Commit dots */}
							<div className="w-2 h-2 rounded-full bg-gray-300" />
							<div className="w-8 h-px bg-gray-200" />
							<div className="w-2 h-2 rounded-full bg-gray-300" />
							<div className="w-8 h-px bg-gray-200" />
							<div className="w-2 h-2 rounded-full bg-blue-400" />

							{phase >= 3 && (
								<>
									<motion.div
										className="w-8 h-px bg-gray-200"
										initial={{ scaleX: 0 }}
										animate={{ scaleX: 1 }}
										transition={{ duration: 0.2 }}
										style={{ transformOrigin: 'left' }}
									/>
									<motion.div
										className="w-2 h-2 rounded-full bg-blue-400"
										initial={{ scale: 0 }}
										animate={{ scale: 1 }}
										transition={{ duration: 0.3 }}
									/>
									<motion.span
										className="text-[9px] text-gray-400 font-mono ml-1"
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
									>
										fix: rate limit
									</motion.span>
								</>
							)}

							{phase >= 7 && (
								<>
									<motion.div
										className="w-8 h-px bg-gray-200"
										initial={{ scaleX: 0 }}
										animate={{ scaleX: 1 }}
										transition={{ duration: 0.2 }}
										style={{ transformOrigin: 'left' }}
									/>
									<motion.div
										className="w-2.5 h-2.5 rounded-full bg-green-400 border border-green-500"
										initial={{ scale: 0 }}
										animate={{ scale: 1 }}
										transition={{ duration: 0.3, type: 'spring' }}
									/>
									<motion.span
										className="text-[9px] font-medium text-green-600 ml-1"
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
									>
										merged
									</motion.span>
								</>
							)}
						</div>
					</motion.div>

					{/* Fork split line */}
					{phase >= 2 && (
						<motion.div
							className="flex justify-center"
							initial={{ opacity: 0, scaleY: 0 }}
							animate={{ opacity: 1, scaleY: 1 }}
							transition={{ duration: 0.3 }}
							style={{ transformOrigin: 'top', height: 32 }}
						>
							<svg width="200" height="32" viewBox="0 0 200 32">
								<path d="M100,0 C100,16 160,16 160,32" fill="none" stroke="#d1d5db" strokeWidth="1.5" strokeDasharray="4 3" />
							</svg>
						</motion.div>
					)}

					{/* Fork workspace */}
					{phase >= 2 && (
						<motion.div
							className="rounded-xl border border-dashed border-violet-300 bg-violet-50/50 shadow-lg overflow-hidden ml-16"
							initial={{ opacity: 0, y: -10, x: 20 }}
							animate={{ opacity: 1, y: 0, x: 0 }}
							transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
							style={{ width: 380 }}
						>
							<div className="px-4 py-2.5 border-b border-violet-200 bg-violet-50 flex items-center justify-between">
								<div className="flex items-center gap-2">
									<div className="w-2.5 h-2.5 rounded-full bg-violet-500" />
									<span className="text-[11px] font-semibold text-gray-700">Staging fork</span>
								</div>
								<span className="text-[10px] text-violet-500 font-mono">feature/new-auth</span>
							</div>
							<div className="px-4 py-3 flex items-center gap-2">
								<div className="w-2 h-2 rounded-full bg-gray-300" />
								<div className="w-8 h-px bg-gray-200" />
								<div className="w-2 h-2 rounded-full bg-violet-300" />

								{phase >= 4 && (
									<>
										<motion.div
											className="w-8 h-px bg-violet-200"
											initial={{ scaleX: 0 }}
											animate={{ scaleX: 1 }}
											transition={{ duration: 0.2 }}
											style={{ transformOrigin: 'left' }}
										/>
										<motion.div
											className="w-2 h-2 rounded-full bg-violet-400"
											initial={{ scale: 0 }}
											animate={{ scale: 1 }}
											transition={{ duration: 0.3 }}
										/>
										<motion.span
											className="text-[9px] text-gray-400 font-mono ml-1"
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
										>
											new auth flow
										</motion.span>
									</>
								)}

								{phase >= 5 && (
									<>
										<motion.div
											className="w-8 h-px bg-violet-200"
											initial={{ scaleX: 0 }}
											animate={{ scaleX: 1 }}
											transition={{ duration: 0.2 }}
											style={{ transformOrigin: 'left' }}
										/>
										<motion.div
											className="w-2 h-2 rounded-full bg-violet-400"
											initial={{ scale: 0 }}
											animate={{ scale: 1 }}
											transition={{ duration: 0.3 }}
										/>
										<motion.span
											className="text-[9px] text-gray-400 font-mono ml-1"
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
										>
											add tests
										</motion.span>
									</>
								)}
							</div>
						</motion.div>
					)}

					{/* Merge arrow */}
					{phase >= 6 && (
						<motion.div
							className="flex justify-center"
							initial={{ opacity: 0, scaleY: 0 }}
							animate={{ opacity: 1, scaleY: 1 }}
							transition={{ duration: 0.3 }}
							style={{ transformOrigin: 'bottom', height: 32 }}
						>
							<svg width="200" height="32" viewBox="0 0 200 32">
								<path d="M160,0 C160,16 100,16 100,32" fill="none" stroke="#22c55e" strokeWidth="1.5" />
								<motion.circle
									r="4"
									fill="#22c55e"
									initial={{ offsetDistance: '0%' }}
									animate={{ offsetDistance: '100%' }}
									style={{
										offsetPath: "path('M160,0 C160,16 100,16 100,32')",
										filter: 'drop-shadow(0 0 4px rgba(34,197,94,0.6))',
									}}
									transition={{ duration: 0.6, ease: 'easeInOut' }}
								/>
								<polygon points="97,28 100,34 103,28" fill="#22c55e" />
							</svg>
						</motion.div>
					)}
				</div>
			</div>
		</div>
	);
}


// ══════════════════════════════════════════════════════
// Preview page
// ══════════════════════════════════════════════════════

const concepts = [
	{
		title: 'Concept 1: Deploy lifecycle',
		description: 'Script card shows Draft state, deploy button click, version bump, code edit, new version with diff stats and commit hash.',
		Component: DeployLifecycle,
	},
	{
		title: 'Concept 2: Git sync loop',
		description: 'Two panels (Windmill + Git repo). A deploy auto-commits to Git, then an external Git change syncs back to Windmill.',
		Component: GitSyncLoop,
	},
	{
		title: 'Concept 3: Version timeline',
		description: 'Vertical timeline with version nodes appearing one by one. A diff panel opens between v12 and v13, then a rollback arrow points to v11.',
		Component: VersionTimeline,
	},
	{
		title: 'Concept 4: Fork and merge',
		description: 'A workspace splits into a fork. Both get independent commits. The fork merges back with a merge animation.',
		Component: ForkAndMerge,
	},
];

export default function HeroAnimationsPreview() {
	return (
		<LayoutProvider>
			<main className="relative min-h-screen w-full overflow-x-hidden">
				<LandingHeader />
				<RadialBlur />
				<div className="pt-32 max-w-full">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 pb-16">
						<motion.div {...fadeIn} className="text-center mb-16">
							<h1 className="!text-4xl sm:!text-5xl !font-semibold !tracking-tight text-gray-900 dark:text-white mb-4">
								Deployment & versioning hero animation preview
							</h1>
						</motion.div>

						<div className="space-y-24">
							{concepts.map(({ title, description, Component }) => (
								<div key={title}>
									<motion.div {...fadeIn} className="text-center mb-8">
										<h2 className="!text-2xl !font-semibold text-gray-900 dark:text-white mb-2">{title}</h2>
										<p className="text-gray-500 text-sm max-w-lg mx-auto">{description}</p>
									</motion.div>
									<Component />
								</div>
							))}
						</div>
					</div>
				</div>
				<Footer />
			</main>
		</LayoutProvider>
	);
}
