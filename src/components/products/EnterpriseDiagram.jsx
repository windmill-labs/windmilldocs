import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Shield, GitBranch, ScrollText, WifiOff, Lock } from 'lucide-react';

const fade = (delay = 0) => ({
	initial: { opacity: 0, y: 12 },
	whileInView: { opacity: 1, y: 0 },
	viewport: { once: true },
	transition: { duration: 0.4, delay },
});

const eeFeatures = [
	{ label: 'SAML / SCIM', Icon: Shield },
	{ label: 'Audit logs', Icon: ScrollText },
	{ label: 'Git sync', Icon: GitBranch },
	{ label: 'Air-gapped', Icon: WifiOff },
];

export default function EnterpriseDiagram() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.3 });

	return (
		<div ref={ref} className="w-full max-w-md mx-auto">
			<div className="flex flex-col gap-2 w-full">
				{/* Open-source core — 80% of the product */}
				<motion.div
					className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-6 py-8"
					style={{ minHeight: 160 }}
					{...fade(0)}
				>
					<div className="flex items-center gap-2.5 mb-3">
						<img src="/img/windmill.svg" alt="Windmill" className="w-6 h-6" />
						<span className="text-base font-semibold text-gray-700 dark:text-gray-300">Open-source core</span>
					</div>
					<p className="text-sm text-gray-500 dark:text-gray-400">
						Scripts, flows, apps, scheduling, full API, workers, webhooks, CLI, and more.
					</p>
				</motion.div>

				{/* Enterprise layer — 10% add-on */}
				<motion.div
					className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3"
					{...fade(0.2)}
				>
					<div className="flex items-center gap-2 mb-2">
						<Lock className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
						<span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Enterprise</span>
					</div>
					<div className="flex flex-wrap gap-1.5">
						{eeFeatures.map((f, i) => (
							<motion.div
								key={f.label}
								className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
								initial={{ opacity: 0, scale: 0.9 }}
								animate={isInView ? { opacity: 1, scale: 1 } : {}}
								transition={{ duration: 0.3, delay: 0.4 + i * 0.1 }}
							>
								<f.Icon className="w-3 h-3 text-gray-400 dark:text-gray-500 shrink-0" />
								<span className="text-[11px] text-gray-600 dark:text-gray-400">{f.label}</span>
							</motion.div>
						))}
					</div>
				</motion.div>
			</div>
		</div>
	);
}
