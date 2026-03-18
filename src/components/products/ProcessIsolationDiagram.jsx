import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Shield, Cpu, HardDrive, WifiOff } from 'lucide-react';

const restrictions = [
	{ key: 'fs', icon: <HardDrive className="w-4 h-4" />, label: 'Filesystem isolation' },
	{ key: 'net', icon: <WifiOff className="w-4 h-4" />, label: 'Network restrictions' },
	{ key: 'cpu', icon: <Cpu className="w-4 h-4" />, label: 'CPU / Memory / Disk limits' },
];

export default function ProcessIsolationDiagram() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.3 });

	return (
		<div ref={ref} className="flex items-center justify-center">
			<motion.div
				className="relative rounded-xl border-2 border-dashed p-6 pt-10 pb-6 border-green-500/60"
				initial={{ opacity: 0, scale: 0.9 }}
				animate={isInView ? { opacity: 1, scale: 1 } : {}}
				transition={{ duration: 0.5 }}
			>
				{/* NSJAIL badge */}
				<motion.div
					className="absolute -top-3 left-4 flex items-center gap-1.5 bg-white dark:bg-gray-900 px-2 py-0.5 rounded text-xs font-semibold text-green-600 dark:text-green-400"
					initial={{ opacity: 0, y: 5 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ delay: 0.3 }}
				>
					<Shield className="w-4 h-4" />
					NSJAIL sandbox
				</motion.div>

				{/* Annotation badge */}
				<motion.div
					className="absolute -top-3 right-4 bg-white dark:bg-gray-900 px-2 py-0.5 rounded font-mono text-[11px] text-gray-500 dark:text-gray-400"
					initial={{ opacity: 0, y: 5 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ delay: 0.4 }}
				>
					// sandbox
				</motion.div>

				<div className="flex flex-col gap-4 min-w-[420px]">
					{/* Script inside the sandbox */}
					<motion.div
						className="flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
						initial={{ opacity: 0, y: -10 }}
						animate={isInView ? { opacity: 1, y: 0 } : {}}
						transition={{ delay: 0.2 }}
					>
						<img src="/img/windmill.svg" alt="Windmill" className="w-6 h-6" />
						<div>
							<div className="text-sm font-semibold text-gray-800 dark:text-gray-200">Your script</div>
							<div className="text-[10px] text-gray-500 dark:text-gray-400">Runs in isolated environment</div>
						</div>
					</motion.div>

					{/* Divider */}
					<motion.div
						className="border-t border-dashed border-gray-300 dark:border-gray-600"
						initial={{ opacity: 0 }}
						animate={isInView ? { opacity: 0.5 } : {}}
						transition={{ delay: 0.4 }}
					/>

					{/* Restriction rows */}
					{restrictions.map((r, i) => (
						<motion.div
							key={r.key}
							className="flex items-center gap-2.5 px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
							initial={{ opacity: 0, x: -15 }}
							animate={isInView ? { opacity: 1, x: 0 } : {}}
							transition={{ duration: 0.35, delay: 0.4 + i * 0.12 }}
						>
							<span className="text-green-500">{r.icon}</span>
							<span className="text-xs font-medium text-gray-700 dark:text-gray-300">{r.label}</span>
						</motion.div>
					))}
				</div>
			</motion.div>
		</div>
	);
}
