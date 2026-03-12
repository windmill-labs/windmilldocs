import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Check, RefreshCcw } from 'lucide-react';

// Code snippet shown in both Windmill and Local cards
const codeLines = [
	{ num: '1', tokens: [{ text: 'import ', color: 'text-purple-400' }, { text: '* as wmill ', color: 'text-blue-300' }, { text: 'from ', color: 'text-purple-400' }, { text: "'windmill'", color: 'text-amber-300' }] },
	{ num: '2', tokens: [] },
	{ num: '3', tokens: [{ text: 'export async function ', color: 'text-purple-400' }, { text: 'main', color: 'text-blue-300' }, { text: '(limit) {', color: 'text-gray-400' }] },
	{ num: '4', tokens: [{ text: '  const rows = db.query(q, [limit]);', color: 'text-gray-400' }] },
	{ num: '5', tokens: [{ text: '  return rows;', color: 'text-gray-400' }] },
	{ num: '6', tokens: [{ text: '}', color: 'text-gray-400' }] },
];

function CodeSnippet({ dark = false, showDiff = false, staggerDelay = 0 }) {
	const bg = dark ? 'text-gray-500' : 'text-gray-500';
	const numColor = dark ? 'text-gray-600' : 'text-gray-400';
	return (
		<div className="font-mono text-[10px] leading-[1.7]">
			{codeLines.map((line, i) => {
				// Line 4 (index 3) gets the diff treatment
				if (i === 3 && showDiff) {
					return (
						<motion.div
							key={i}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.3 }}
						>
							<div className={`${dark ? 'text-red-400/60' : 'text-red-400/60'} line-through`}>
								<span className={`${numColor} select-none mr-2`}>{line.num}</span>
								<span>{'  '}const rows = db.query(q, [limit]);</span>
							</div>
							<div className={`${dark ? 'text-green-400 bg-green-950/30' : 'text-green-600 bg-green-50'} rounded-sm`}>
								<span className={`${numColor} select-none mr-2`}>{line.num}</span>
								<span>{'  '}const rows = db.query(q, [limit, offset]);</span>
							</div>
						</motion.div>
					);
				}
				return (
					<motion.div
						key={i}
						className={bg}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.3, delay: staggerDelay + i * 0.05 }}
					>
						<span className={`${numColor} select-none mr-2`}>{line.num}</span>
						{line.tokens.length === 0 ? (
							<span>&nbsp;</span>
						) : (
							line.tokens.map((token, j) => (
								<span key={j} className={token.color} style={{ whiteSpace: 'pre' }}>{token.text}</span>
							))
						)}
					</motion.div>
				);
			})}
		</div>
	);
}

export default function LocalDevHeroAnimation() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.3 });
	const [phase, setPhase] = useState(0);

	// Phases:
	// 1 - Cards fade in. Windmill shows code snippet. Local is empty.
	// 2 - Sync pull (spinner in Local card).
	// 3 - Code appears in Local card.
	// 4 - Diff appears in Local card (edited code).
	// 5 - Push sync (spinner in Windmill card).
	// 6 - Windmill card updates with new code + "new version" badge.

	useEffect(() => {
		if (!isInView) return;
		const timers = [
			setTimeout(() => setPhase(1), 400),
			setTimeout(() => setPhase(2), 1200),
			setTimeout(() => setPhase(3), 2400),
			setTimeout(() => setPhase(4), 4000),
			setTimeout(() => setPhase(5), 5600),
			setTimeout(() => setPhase(6), 7000),
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
					className="w-full"
				>
					<div className="flex items-stretch gap-4">
						{/* Left card: Windmill workspace */}
						<div className="flex-1 min-w-0">
							<div className="rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden" style={{ height: 320 }}>
								<div className="px-4 py-2.5 border-b border-gray-100">
									<div className="flex items-center gap-2">
										<img src="/img/windmill.svg" alt="Windmill" className="w-4 h-4" />
										<span className="text-sm font-semibold text-gray-700">Windmill UI</span>
										{phase >= 6 && (
											<motion.span
												className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 ml-auto flex-shrink-0"
												initial={{ opacity: 0, scale: 0.8 }}
												animate={{ opacity: 1, scale: 1 }}
												transition={{ duration: 0.2 }}
											>
												new version
											</motion.span>
										)}
									</div>
									<div className="flex items-center gap-1.5 mt-1.5">
										<span className="text-[10px] text-gray-500 font-mono">process_orders.ts</span>
									</div>
								</div>
								<div className="px-3 py-3">
									{phase === 5 ? (
										<div className="flex flex-col items-center justify-center" style={{ minHeight: 200 }}>
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
										<div>
											{phase >= 6 ? (
												<CodeSnippet showDiff />
											) : (
												<CodeSnippet staggerDelay={0} />
											)}
										</div>
									)}
								</div>
							</div>
						</div>

						{/* Right card: Local (dark terminal style) */}
						<div className="flex-1 min-w-0">
							<div className="rounded-xl border border-gray-700 bg-gray-950 shadow-lg overflow-hidden" style={{ height: 320 }}>
								<div className="px-4 py-2.5 border-b border-gray-800">
									<div className="flex items-center gap-2">
										<img src="/img/cursor-white.svg" alt="Cursor" className="w-4 h-4" />
										<span className="text-sm font-semibold text-gray-300">Local dev</span>
										{phase >= 4 && phase < 6 && (
											<motion.span
												className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-yellow-900/40 text-yellow-400 ml-auto flex-shrink-0"
												initial={{ opacity: 0, scale: 0.8 }}
												animate={{ opacity: 1, scale: 1 }}
												transition={{ duration: 0.2 }}
											>
												modified
											</motion.span>
										)}
										{phase >= 6 && (
											<motion.span
												className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-green-900/40 text-green-400 ml-auto flex-shrink-0"
												initial={{ opacity: 0, scale: 0.8 }}
												animate={{ opacity: 1, scale: 1 }}
												transition={{ duration: 0.2 }}
											>
												pushed
											</motion.span>
										)}
									</div>
									{phase >= 3 ? (
										<div className="flex items-center gap-1.5 mt-1.5">
											<span className="text-[10px] text-gray-400 font-mono">process_orders.ts</span>
										</div>
									) : (
										<div className="flex items-center gap-1.5 mt-1.5 h-[16px]">
											<span className="text-[10px] text-gray-600 italic">no file</span>
										</div>
									)}
								</div>
								<div className="px-3 py-3">
									{phase < 2 ? (
										<div className="flex items-center justify-center" style={{ minHeight: 200 }}>
											<span className="text-[11px] text-gray-600 italic">empty</span>
										</div>
									) : phase === 2 ? (
										<div className="flex flex-col items-center justify-center" style={{ minHeight: 200 }}>
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
										<div>
											<CodeSnippet dark showDiff={phase >= 4} staggerDelay={phase === 3 ? 0 : 0} />
										</div>
									)}
								</div>
							</div>
						</div>
					</div>

					{phase >= 6 && (
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
