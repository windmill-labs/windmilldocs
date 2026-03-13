import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Shield, Lock, Database, Server, Cpu, Globe, Webhook, Calendar, CheckCircle } from 'lucide-react';

const vpcNodes = [
	{ id: 'server', label: 'Server', Icon: Server, x: 30, y: 60 },
	{ id: 'workers', label: 'Workers', Icon: Cpu, x: 30, y: 130 },
	{ id: 'pg', label: 'PostgreSQL', Icon: Database, LockIcon: Lock, x: 30, y: 200 },
];

const externalSources = [
	{ id: 'webhook', label: 'Webhook', Icon: Webhook },
	{ id: 'api', label: 'API', Icon: Globe },
	{ id: 'cron', label: 'Cron', Icon: Calendar },
];

export default function SelfHostHeroAnimationB() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.3 });
	const [phase, setPhase] = useState(0);
	const [cycle, setCycle] = useState(0);

	useEffect(() => {
		if (!isInView) return;
		const timers = [
			setTimeout(() => setPhase(1), 400),
			setTimeout(() => setPhase(2), 1200),
			setTimeout(() => setPhase(3), 2200),
			setTimeout(() => setPhase(4), 3200),
			setTimeout(() => setPhase(5), 4600),
			setTimeout(() => setPhase(6), 6000),
			setTimeout(() => {
				setPhase(0);
				setCycle(c => c + 1);
			}, 7500),
		];
		return () => timers.forEach(clearTimeout);
	}, [isInView, cycle]);

	return (
		<div ref={ref} className="relative" style={{ height: 380 }}>
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
							<Shield className="w-4 h-4 text-gray-400" />
							<span className="text-sm font-semibold text-gray-700">Data sovereignty</span>
						</div>

						{/* Content */}
						<div className="flex" style={{ height: 290 }}>
							{/* Left: VPC region */}
							<div className="relative flex-[65] px-4 py-3 overflow-hidden">
								{/* VPC dashed border */}
								{phase >= 1 && (
									<motion.div
										className="absolute inset-2 rounded-xl border-2 border-dashed border-blue-300/50"
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transition={{ duration: 0.4 }}
									>
										<div className="absolute top-2 left-3 flex items-center gap-1">
											<Lock className="w-3 h-3 text-blue-400" />
											<span className="text-[9px] uppercase tracking-wider font-medium text-blue-400/80">
												Your VPC
											</span>
										</div>
									</motion.div>
								)}

								{/* VPC nodes */}
								{phase >= 2 && (
									<div className="relative pt-6" style={{ height: 260 }}>
										{/* SVG connector lines */}
										<svg className="absolute inset-0 pointer-events-none" style={{ width: '100%', height: '100%' }}>
											<motion.line
												x1={46} y1={82} x2={46} y2={122}
												stroke="#d1d5db" strokeWidth={1.5}
												initial={{ opacity: 0 }} animate={{ opacity: 1 }}
												transition={{ duration: 0.3, delay: 0.1 }}
											/>
											<motion.line
												x1={46} y1={152} x2={46} y2={192}
												stroke="#d1d5db" strokeWidth={1.5}
												initial={{ opacity: 0 }} animate={{ opacity: 1 }}
												transition={{ duration: 0.3, delay: 0.2 }}
											/>

											{/* Animated data dot traveling down */}
											{phase >= 4 && phase < 6 && (
												<motion.circle
													cx={46}
													r={4}
													fill="#3b82f6"
													initial={{ cy: 60, opacity: 0 }}
													animate={{
														cy: phase >= 5 ? 200 : 130,
														opacity: 1,
													}}
													transition={{ duration: 1.2, ease: 'easeInOut' }}
												/>
											)}
										</svg>

										{vpcNodes.map((node, i) => {
											const NodeIcon = node.Icon;
											const isActive = phase >= 4 && (
												(node.id === 'server' && phase >= 4) ||
												(node.id === 'workers' && phase >= 5) ||
												(node.id === 'pg' && phase >= 5)
											);
											return (
												<motion.div
													key={node.id}
													className="absolute flex items-center gap-2"
													style={{ left: node.x, top: node.y }}
													initial={{ opacity: 0, scale: 0.8 }}
													animate={{ opacity: 1, scale: 1 }}
													transition={{ duration: 0.3, delay: i * 0.2 }}
												>
													<div className={`rounded-lg border px-3 py-1.5 flex items-center gap-2 transition-colors duration-300 ${
														isActive ? 'border-blue-300 bg-blue-50/50' : 'border-gray-200 bg-gray-50'
													}`}>
														<NodeIcon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-500' : 'text-gray-400'}`} />
														<span className="text-[11px] font-mono text-gray-600">{node.label}</span>
														{node.LockIcon && (
															<node.LockIcon className="w-3 h-3 text-gray-300" />
														)}
													</div>

													{/* DB insert label */}
													{node.id === 'pg' && phase >= 5 && (
														<motion.span
															className="text-[9px] font-mono text-green-500 ml-1"
															initial={{ opacity: 0 }}
															animate={{ opacity: 1 }}
															transition={{ delay: 0.5 }}
														>
															3 rows inserted
														</motion.span>
													)}
												</motion.div>
											);
										})}
									</div>
								)}

								{/* Shield overlay */}
								{phase >= 6 && (
									<motion.div
										className="absolute inset-2 rounded-xl flex items-center justify-center"
										style={{ background: 'rgba(34, 197, 94, 0.05)' }}
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transition={{ duration: 0.5 }}
									>
										<div className="flex flex-col items-center gap-2">
											<motion.div
												initial={{ scale: 0 }}
												animate={{ scale: 1 }}
												transition={{ duration: 0.4, type: 'spring' }}
											>
												<div className="relative">
													<Shield className="w-10 h-10 text-green-500" />
													<motion.div
														className="absolute -inset-2 rounded-full"
														style={{ boxShadow: '0 0 20px rgba(34, 197, 94, 0.3)' }}
														animate={{ opacity: [0.5, 1, 0.5] }}
														transition={{ duration: 2, repeat: Infinity }}
													/>
												</div>
											</motion.div>
											<motion.span
												className="text-[10px] font-medium text-green-600 text-center max-w-[160px]"
												initial={{ opacity: 0, y: 5 }}
												animate={{ opacity: 1, y: 0 }}
												transition={{ delay: 0.3 }}
											>
												Your data never leaves your infrastructure
											</motion.span>
										</div>
									</motion.div>
								)}
							</div>

							{/* Right: External sources */}
							<div className="flex-[35] border-l border-gray-100 px-4 py-3 overflow-hidden">
								<div className="text-[10px] uppercase tracking-wider text-gray-400 mb-3">
									External sources
								</div>

								{phase >= 3 && (
									<div className="space-y-2.5">
										{externalSources.map((source, i) => {
											const SourceIcon = source.Icon;
											const isDimmed = phase >= 6;
											return (
												<motion.div
													key={source.id}
													className={`rounded-lg border px-3 py-2 flex items-center gap-2 transition-opacity duration-500 ${
														isDimmed ? 'opacity-30' : 'opacity-100'
													} ${phase >= 4 && !isDimmed ? 'border-blue-200 bg-blue-50/30' : 'border-gray-200 bg-gray-50'}`}
													initial={{ opacity: 0, x: 10 }}
													animate={{ opacity: isDimmed ? 0.3 : 1, x: 0 }}
													transition={{ duration: 0.3, delay: i * 0.15 }}
												>
													<SourceIcon className={`w-3.5 h-3.5 ${isDimmed ? 'text-gray-300' : 'text-gray-500'}`} />
													<span className={`text-[11px] font-mono ${isDimmed ? 'text-gray-300' : 'text-gray-600'}`}>
														{source.label}
													</span>

													{/* Animated arrow */}
													{phase >= 4 && phase < 6 && (
														<motion.span
															className="ml-auto text-blue-400 text-xs"
															animate={{ x: [0, -4, 0] }}
															transition={{ duration: 1, repeat: Infinity }}
														>
															←
														</motion.span>
													)}

													{phase >= 6 && (
														<CheckCircle className="w-3 h-3 ml-auto text-green-400" />
													)}
												</motion.div>
											);
										})}
									</div>
								)}
							</div>
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	);
}
