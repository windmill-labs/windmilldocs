import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowDown, Play, CheckCircle, Loader2, Database } from 'lucide-react';

const insertedRows = [
	{ id: 1, customer: 'Alice Martin', amount: '$1,250.00', status: 'active' },
	{ id: 2, customer: 'Bob Chen', amount: '$890.00', status: 'pending' },
	{ id: 3, customer: 'Carol Smith', amount: '$2,100.00', status: 'active' },
	{ id: 4, customer: 'Dan Wilson', amount: '$450.00', status: 'active' },
];

const scriptLines = [
	{ tokens: [{ text: 'import ', color: 'text-purple-400' }, { text: '* as wmill ', color: 'text-blue-300' }, { text: 'from ', color: 'text-purple-400' }, { text: "'windmill-client'", color: 'text-amber-300' }] },
	{ tokens: [] },
	{ tokens: [{ text: 'export async function ', color: 'text-purple-400' }, { text: 'main', color: 'text-blue-300' }, { text: '(', color: 'text-gray-400' }] },
	{ tokens: [{ text: '  name', color: 'text-orange-300' }, { text: ': string, ', color: 'text-gray-400' }, { text: 'amount', color: 'text-orange-300' }, { text: ': number', color: 'text-gray-400' }] },
	{ tokens: [{ text: ') {', color: 'text-gray-400' }] },
	{ tokens: [{ text: '  const ', color: 'text-purple-400' }, { text: 'db ', color: 'text-blue-300' }, { text: '= ', color: 'text-gray-400' }, { text: 'wmill', color: 'text-blue-300' }, { text: '.getResource(', color: 'text-gray-400' }, { text: "'pg'", color: 'text-amber-300' }, { text: ')', color: 'text-gray-400' }] },
	{ tokens: [{ text: '  await ', color: 'text-purple-400' }, { text: 'db', color: 'text-blue-300' }, { text: '.query(', color: 'text-gray-400' }] },
	{ tokens: [{ text: "    `INSERT INTO orders (name, amount)", color: 'text-amber-300' }] },
	{ tokens: [{ text: "     VALUES ($1, $2)`", color: 'text-amber-300' }, { text: ', [name, amount]', color: 'text-gray-400' }] },
	{ tokens: [{ text: '  )', color: 'text-gray-400' }] },
	{ tokens: [{ text: '}', color: 'text-gray-400' }] },
];

export default function DatatablesHeroAnimation() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.3 });
	const [phase, setPhase] = useState(0);

	// Phases:
	// 1  - panels visible + code appears + run 1 starts immediately
	// 2  - run 1: done → row 1 appears
	// 3  - run 2: running
	// 4  - run 2: done → row 2 appears
	// 5  - run 3: running
	// 6  - run 3: done → row 3 appears
	// 7  - run 4: running
	// 8  - run 4: done → row 4 appears

	useEffect(() => {
		if (!isInView) return;
		const timers = [
			setTimeout(() => setPhase(1), 200),
			setTimeout(() => setPhase(2), 1000),
			setTimeout(() => setPhase(3), 1700),
			setTimeout(() => setPhase(4), 2500),
			setTimeout(() => setPhase(5), 3200),
			setTimeout(() => setPhase(6), 4000),
			setTimeout(() => setPhase(7), 4700),
			setTimeout(() => setPhase(8), 5500),
		];
		return () => timers.forEach(clearTimeout);
	}, [isInView]);

	// Odd phases = running, even phases >= 2 = done
	const isRunning = phase >= 1 && phase % 2 === 1;
	const isDone = phase >= 2 && phase % 2 === 0;
	const runState = isRunning ? 'running' : isDone ? 'done' : 'idle';

	// Each even phase >= 2 adds a row
	const visibleRowCount = phase < 2 ? 0 : Math.floor(phase / 2);

	const studioColumns = ['id', 'customer', 'amount', 'status'];

	return (
		<div ref={ref} className="relative">
			<div className="relative overflow-hidden flex items-center justify-center">
				<div className="flex flex-col items-center gap-3" style={{ width: 540 }}>
					{/* Script card */}
					<motion.div
						className="w-full"
						initial={{ opacity: 0, y: 20 }}
						animate={phase >= 1 ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.5 }}
					>
						<div className="rounded-xl border border-gray-200 bg-gray-950 overflow-hidden shadow-lg">
							{/* Title bar */}
							<div className="flex items-center justify-between px-3 py-2 border-b border-gray-800 bg-gray-900">
								<div className="flex items-center gap-2">
									<motion.img
										src="/img/windmill.svg"
										alt="Windmill"
										className="w-3.5 h-3.5"
										animate={isRunning ? { rotate: 360 } : {}}
										transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
									/>
									<span className="text-[10px] font-medium text-gray-400">insert_order.ts</span>
								</div>
								<motion.div
									className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium ${
										runState === 'done'
											? 'bg-green-500/20 text-green-400'
											: runState === 'running'
											? 'bg-blue-500/20 text-blue-400'
											: 'bg-gray-800 text-gray-400'
									}`}
									animate={runState === 'running' ? { scale: [1, 0.95, 1] } : {}}
									transition={{ duration: 0.2 }}
								>
									{runState === 'done' ? (
										<>
											<CheckCircle className="w-3 h-3" />
											<span>Done</span>
										</>
									) : runState === 'running' ? (
										<>
											<motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
												<Loader2 className="w-3 h-3" />
											</motion.div>
											<span>Running</span>
										</>
									) : (
										<>
											<Play className="w-3 h-3" />
											<span>Run</span>
										</>
									)}
								</motion.div>
							</div>

							{/* Code */}
							<div className="p-3 font-mono text-[11px] leading-relaxed">
								{scriptLines.map((line, i) => (
									<motion.div
										key={i}
										className="flex"
										initial={{ opacity: 0 }}
										animate={phase >= 1 ? { opacity: 1 } : {}}
										transition={{ duration: 0.3, delay: i * 0.05 }}
									>
										<span className="text-gray-600 w-4 text-right mr-2 select-none text-[9px]">{i + 1}</span>
										{line.tokens.length === 0 ? (
											<span>&nbsp;</span>
										) : (
											line.tokens.map((token, j) => (
												<span key={j} className={token.color} style={{ whiteSpace: 'pre' }}>{token.text}</span>
											))
										)}
									</motion.div>
								))}
							</div>
						</div>
					</motion.div>

					{/* Down arrow */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={phase >= 1 ? { opacity: 1 } : {}}
						transition={{ duration: 0.4 }}
					>
						<ArrowDown className="w-5 h-5 text-blue-400" />
					</motion.div>

					{/* Database Studio panel (visible from start, empty) */}
					<motion.div
						className="w-full"
						initial={{ opacity: 0, y: 20 }}
						animate={phase >= 1 ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.5, delay: 0.1 }}
					>
						<div className="rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden" style={{ height: 250 }}>
							{/* Title bar */}
							<div className="flex items-center gap-2 px-4 py-2.5 border-b border-gray-100 bg-gray-50/50">
								<img src="/img/windmill.svg" alt="Windmill" className="w-3.5 h-3.5" />
								<span className="text-xs font-semibold text-gray-800">Database Studio</span>
								<span className="text-[10px] text-gray-400 ml-1">/ orders</span>
							</div>

							<div className="p-3">
								{/* Header */}
								<div className="grid grid-cols-4 gap-0 border-b border-gray-200 pb-2 mb-1">
									{studioColumns.map((col) => (
										<div key={col} className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-2">
											{col}
										</div>
									))}
								</div>

								{/* 4 row slots — blank initially, filled as executions complete */}
								{insertedRows.map((row, i) => {
									const isFilled = i < visibleRowCount;
									const isLatest = isFilled && i === visibleRowCount - 1;
									return (
										<div
											key={i}
											className={`grid grid-cols-4 gap-0 py-1.5 border-b rounded-md border items-center ${
												isLatest ? 'bg-blue-50 border-blue-200' : 'border-transparent'
											}`}
										>
											{isFilled ? (
												<>
													<motion.div
														className={`text-[11px] px-2 ${isLatest ? 'text-blue-600 font-medium' : 'text-gray-500'}`}
														initial={{ opacity: 0 }}
														animate={{ opacity: 1 }}
														transition={{ duration: 0.3 }}
													>{row.id}</motion.div>
													<motion.div
														className={`text-[11px] font-medium px-2 ${isLatest ? 'text-blue-700' : 'text-gray-700'}`}
														initial={{ opacity: 0 }}
														animate={{ opacity: 1 }}
														transition={{ duration: 0.3, delay: 0.05 }}
													>{row.customer}</motion.div>
													<motion.div
														className={`text-[11px] px-2 ${isLatest ? 'text-blue-600' : 'text-gray-600'}`}
														initial={{ opacity: 0 }}
														animate={{ opacity: 1 }}
														transition={{ duration: 0.3, delay: 0.1 }}
													>{row.amount}</motion.div>
													<motion.div
														className="px-2"
														initial={{ opacity: 0 }}
														animate={{ opacity: 1 }}
														transition={{ duration: 0.3, delay: 0.15 }}
													>
														<motion.span
															className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${
																row.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
															}`}
															animate={isLatest ? { scale: [1, 1.1, 1] } : {}}
															transition={{ duration: 0.4, delay: 0.2 }}
														>
															{row.status}
														</motion.span>
													</motion.div>
												</>
											) : (
												<>
													<div className="text-[11px] px-2">&nbsp;</div>
													<div className="text-[11px] px-2">&nbsp;</div>
													<div className="text-[11px] px-2">&nbsp;</div>
													<div className="text-[11px] px-2">&nbsp;</div>
												</>
											)}
										</div>
									);
								})}
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</div>
	);
}
