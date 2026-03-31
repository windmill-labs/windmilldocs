import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SiKubernetes, SiHelm } from 'react-icons/si';

const K8S_BLUE = '#326CE5';

const deployments = [
	{ key: 'server', label: 'windmill-server', sublabel: 'Deployment', replicas: 1 },
	{ key: 'workers', label: 'windmill-workers', sublabel: 'Deployment', replicas: 3 },
	{ key: 'lsp', label: 'windmill-lsp', sublabel: 'Deployment', replicas: 1 },
];

export default function K8sHelmDiagram() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.3 });

	return (
		<div ref={ref} className="flex items-center justify-center">
			<motion.div
				className="relative rounded-xl border-2 border-dashed p-6 pt-10 pb-6"
				style={{ borderColor: K8S_BLUE }}
				initial={{ opacity: 0, scale: 0.9 }}
				animate={isInView ? { opacity: 1, scale: 1 } : {}}
				transition={{ duration: 0.5 }}
			>
				{/* K8s badge */}
				<motion.div
					className="absolute -top-3 left-4 flex items-center gap-1.5 bg-white dark:bg-gray-900 px-2 py-0.5 rounded text-xs font-semibold"
					style={{ color: K8S_BLUE }}
					initial={{ opacity: 0, y: 5 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ delay: 0.3 }}
				>
					<SiKubernetes size={16} color={K8S_BLUE} />
					Kubernetes cluster
				</motion.div>

				{/* Helm badge */}
				<motion.div
					className="absolute -top-3 right-4 flex items-center gap-1.5 bg-white dark:bg-gray-900 px-2 py-0.5 rounded text-xs font-semibold text-[#0F1689] dark:text-blue-400"
					initial={{ opacity: 0, y: 5 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ delay: 0.4 }}
				>
					<SiHelm size={16} className="text-[#0F1689] dark:text-blue-400" />
					Helm
				</motion.div>

				<div className="flex flex-col gap-3 min-w-[320px]">
					{deployments.map((dep, i) => (
						<motion.div
							key={dep.key}
							className="flex items-center justify-between gap-4 px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
							initial={{ opacity: 0, x: -20 }}
							animate={isInView ? { opacity: 1, x: 0 } : {}}
							transition={{ duration: 0.4, delay: 0.2 + i * 0.15 }}
						>
							<div className="flex items-center gap-3">
								<img src="/img/windmill.svg" alt="Windmill" className="w-6 h-6" />
								<div>
									<div className="text-sm font-semibold text-gray-800 dark:text-gray-200">{dep.label}</div>
									<div className="text-[10px] text-gray-500 dark:text-gray-400">{dep.sublabel}</div>
								</div>
							</div>
							{dep.replicas > 1 && (
								<motion.span
									className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300"
									initial={{ opacity: 0, scale: 0.5 }}
									animate={isInView ? { opacity: 1, scale: 1 } : {}}
									transition={{ delay: 0.6 + i * 0.1, type: 'spring', stiffness: 300 }}
								>
									×{dep.replicas}
								</motion.span>
							)}
						</motion.div>
					))}
				</div>
			</motion.div>
		</div>
	);
}
