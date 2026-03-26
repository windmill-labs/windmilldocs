import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Database, Globe, Cpu, ArrowRight } from 'lucide-react';

const fade = (delay = 0) => ({
	initial: { opacity: 0, y: 12 },
	whileInView: { opacity: 1, y: 0 },
	viewport: { once: true },
	transition: { duration: 0.4, delay },
});

const nodes = [
	{ id: 'server', label: 'Server', sub: 'API + UI', Icon: Globe },
	{ id: 'pg', label: 'PostgreSQL', sub: 'State + queue', Icon: Database },
	{ id: 'workers', label: 'Workers', sub: 'Job execution', Icon: Cpu },
];

export default function ArchitectureDiagram() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.3 });

	return (
		<div ref={ref} className="flex items-center justify-center">
			<div className="flex items-center gap-0">
				{nodes.map((node, i) => (
					<React.Fragment key={node.id}>
						<motion.div
							className="flex flex-col items-center gap-2.5 px-6 py-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
							style={{ width: 155 }}
							{...fade(i * 0.15)}
						>
							<node.Icon className="w-8 h-8 text-gray-500 dark:text-gray-400" />
							<div className="text-base font-semibold text-gray-800 dark:text-gray-200">{node.label}</div>
							<div className="text-sm text-gray-500 dark:text-gray-400 text-center">{node.sub}</div>
						</motion.div>
						{i < nodes.length - 1 && (
							<motion.div
								className="flex items-center px-3"
								initial={{ opacity: 0, scaleX: 0 }}
								animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
								transition={{ duration: 0.3, delay: 0.2 + i * 0.15 }}
							>
								<ArrowRight className="w-5 h-5 text-gray-300 dark:text-gray-600" />
							</motion.div>
						)}
					</React.Fragment>
				))}
			</div>
		</div>
	);
}
