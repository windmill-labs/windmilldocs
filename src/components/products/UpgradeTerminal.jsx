import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const lines = [
	{ text: '$ docker compose pull', color: 'text-gray-100' },
	{ text: 'Pulling windmill-server ...done', color: 'text-gray-500' },
	{ text: 'Pulling windmill-worker ...done', color: 'text-gray-500' },
	{ text: '$ docker compose up -d', color: 'text-gray-100' },
	{ text: 'Running migrations... 3 pending', color: 'text-gray-500' },
	{ text: 'Migration 0142 applied', color: 'text-gray-500' },
	{ text: 'Migration 0143 applied', color: 'text-gray-500' },
	{ text: 'Migration 0144 applied', color: 'text-gray-500' },
	{ text: 'Windmill v1.392.0 ready', color: 'text-gray-100' },
];

export default function UpgradeTerminal() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.3 });

	return (
		<div ref={ref} className="flex items-center justify-center">
			<div className="w-full max-w-lg rounded-xl border border-gray-700 overflow-hidden bg-gray-900 dark:bg-gray-950 shadow-lg">
				{/* Title bar */}
				<div className="flex items-center gap-2 px-4 py-2.5 bg-gray-800 dark:bg-gray-900 border-b border-gray-700">
					<div className="flex gap-1.5">
						<div className="w-3 h-3 rounded-full bg-red-500/80" />
						<div className="w-3 h-3 rounded-full bg-yellow-500/80" />
						<div className="w-3 h-3 rounded-full bg-green-500/80" />
					</div>
					<span className="text-xs text-gray-500 ml-2 font-mono">bash</span>
				</div>
				{/* Lines */}
				<div className="p-4 font-mono text-sm leading-relaxed">
					{lines.map((line, i) => (
						<motion.div
							key={i}
							className={line.color}
							initial={{ opacity: 0 }}
							animate={isInView ? { opacity: 1 } : {}}
							transition={{ duration: 0.15, delay: 0.2 + i * 0.25 }}
						>
							{line.text}
						</motion.div>
					))}
				</div>
			</div>
		</div>
	);
}
