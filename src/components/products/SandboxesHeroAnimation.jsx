import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Shield, CheckCircle, CheckCircle2, Loader2, GitPullRequest } from 'lucide-react';
import { SiTypescript } from 'react-icons/si';

const DAG_CX = 130;
const DAG_NH = 40;
const DAG_W = 230;
const DAG_GAP = 70;

export default function SandboxesHeroAnimation() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.3 });
	const [phase, setPhase] = useState(0);

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
			<div className="relative h-full flex items-center justify-center">
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
