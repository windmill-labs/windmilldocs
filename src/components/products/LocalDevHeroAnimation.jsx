import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FileCode, Check, RefreshCcw } from 'lucide-react';

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
		pushed: 'bg-green-900/40 text-green-400',
	} : {
		modified: 'bg-yellow-100 text-yellow-700',
		new: 'bg-green-100 text-green-700',
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

export default function LocalDevHeroAnimation() {
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
	// 8 - Done: Windmill shows "new version" badge.

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
								<div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
									<img src="/img/windmill.svg" alt="Windmill" className="w-4 h-4" />
									<span className="text-sm font-semibold text-gray-700">Windmill</span>
								</div>
								<div className="px-3 py-3">
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
													<div className="flex items-center gap-1.5 px-2.5 py-1.5 border-b border-gray-800">
														<FileCode className="w-3 h-3 text-gray-500" />
														<span className="text-[10px] text-gray-400 font-mono">process_orders.ts</span>
													</div>
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
