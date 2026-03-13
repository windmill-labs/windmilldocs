import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Shield, CheckCircle } from 'lucide-react';

// Ordered newest-first (anti-chronological)
const auditRows = [
	{ time: '09:42:35', userName: 'Sam Admin', action: 'permission.change', actionColor: 'bg-amber-50 text-amber-700 border-amber-200', resource: 'f/staging/ +engineering:writer' },
	{ time: '09:42:18', userName: 'Alice Lee', action: 'create', actionColor: 'bg-blue-50 text-blue-700 border-blue-200', resource: 'f/staging/new_flow.yaml' },
	{ time: '09:42:01', userName: 'Tom Kim', action: 'execute', actionColor: 'bg-green-50 text-green-700 border-green-200', resource: 'f/production/deploy.ts' },
	{ time: '09:41:44', userName: 'Mike Jones', action: 'secret.access', actionColor: 'bg-red-50 text-red-700 border-red-200', resource: 'DB_PASSWORD → injected' },
	{ time: '09:41:28', userName: 'Sam Admin', action: 'permission.change', actionColor: 'bg-amber-50 text-amber-700 border-amber-200', resource: 'f/production/ +ops:viewer' },
	{ time: '09:41:15', userName: 'Sam Admin', action: 'deploy', actionColor: 'bg-blue-50 text-blue-700 border-blue-200', resource: 'f/production/deploy.ts' },
	{ time: '09:41:02', userName: 'Alice Lee', action: 'login', actionColor: 'bg-green-50 text-green-700 border-green-200', resource: 'SSO via Okta' },
];

// Number of rows visible initially (the 3 oldest)
const INITIAL_COUNT = 3;

export default function RbacHeroAnimation() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.3 });
	const [phase, setPhase] = useState(0);

	// Phase 1: card + header + 3 oldest rows
	// Phase 2..5: one newer row prepended each
	// Phase 6: summary
	const totalNewRows = auditRows.length - INITIAL_COUNT; // 4

	useEffect(() => {
		if (!isInView) return;
		const timers = [
			setTimeout(() => setPhase(1), 300),
			...Array.from({ length: totalNewRows }, (_, i) =>
				setTimeout(() => setPhase(i + 2), 1000 + i * 500)
			),
			setTimeout(() => setPhase(totalNewRows + 2), 1000 + totalNewRows * 500 + 600),
		];
		return () => timers.forEach(clearTimeout);
	}, [isInView]);

	// How many rows from the top are visible
	// Phase 1: last INITIAL_COUNT rows (indices 4,5,6)
	// Phase 2: index 3 added, Phase 3: index 2, Phase 4: index 1, Phase 5: index 0
	const visibleFromIndex = phase < 1
		? auditRows.length
		: Math.max(0, auditRows.length - INITIAL_COUNT - (phase - 1));

	const visibleRows = auditRows.slice(visibleFromIndex);
	const summaryPhase = totalNewRows + 2;

	return (
		<div ref={ref} className="relative" style={{ height: 420 }}>
			<div className="relative h-full flex items-center justify-center">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={phase >= 1 ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.5 }}
					style={{ width: 540 }}
				>
					<div className="rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden">
						{/* Header with column labels */}
						<div className="px-5 py-3.5 border-b border-gray-200 bg-gray-50 flex items-center gap-3">
							<span className="text-[10px] uppercase tracking-wider font-semibold text-gray-500 w-[62px]">Time</span>
							<span className="text-[10px] uppercase tracking-wider font-semibold text-gray-500 w-[100px]">User</span>
							<span className="text-[10px] uppercase tracking-wider font-semibold text-gray-500 w-[120px]">Action</span>
							<span className="text-[10px] uppercase tracking-wider font-semibold text-gray-500 flex-1">Resource</span>
						</div>

						<div className="px-5 py-3" style={{ height: 340 }}>
							{/* Log rows */}
							<div className="space-y-1">
								<AnimatePresence initial={false}>
									{visibleRows.map((row) => (
										<motion.div
											key={row.time}
											className="flex items-center gap-3 py-1.5 rounded-md px-1"
											initial={{ opacity: 0, y: -10 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ duration: 0.2 }}
											>
											<span className="text-[10px] font-mono text-gray-500 w-[62px]">{row.time}</span>
											<div className="w-[100px]">
												<span className="text-[10px] font-medium text-gray-700 truncate">{row.userName}</span>
											</div>
											<div className="w-[120px]">
												<span className={`text-[10px] font-medium px-1.5 py-0.5 rounded border ${row.actionColor}`}>
													{row.action}
												</span>
											</div>
											<span className="text-[10px] font-mono text-gray-500 flex-1 truncate">{row.resource}</span>
										</motion.div>
									))}
								</AnimatePresence>
							</div>

							{/* Summary */}
							{phase >= summaryPhase && (
								<motion.div
									className="mt-3 pt-2 border-t border-gray-200 flex items-center justify-center gap-1.5"
									initial={{ opacity: 0, y: 5 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.3 }}
								>
									<Shield className="w-3 h-3 text-green-600 flex-shrink-0 relative top-[0.5px]" />
									<CheckCircle className="w-3 h-3 text-green-600 flex-shrink-0 relative top-[0.5px]" />
									<span className="text-[9px] font-medium text-gray-500 leading-none">SOC 2 Type II · Every action recorded</span>
								</motion.div>
							)}
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	);
}
