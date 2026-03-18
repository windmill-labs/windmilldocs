import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SiPostgresql, SiCaddy } from 'react-icons/si';

const DOCKER_BLUE = '#2496ED';
const PG_BLUE = '#336791';
const CADDY_GREEN = '#22D172';

const layers = [
	{ key: 'caddy', icon: <SiCaddy size={28} color={CADDY_GREEN} />, label: 'Caddy', sublabel: 'Reverse proxy' },
	{ key: 'windmill', icon: <img src="/img/windmill.svg" alt="Windmill" className="w-7 h-7" />, label: 'Windmill', sublabel: 'Server + workers' },
	{ key: 'postgres', icon: <SiPostgresql size={28} color={PG_BLUE} />, label: 'PostgreSQL', sublabel: 'Database' },
];

export default function DockerStackDiagram() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.3 });

	return (
		<div ref={ref} className="flex items-center justify-center">
			<motion.div
				className="relative rounded-xl border-2 border-dashed p-6 pt-10 pb-6"
				style={{ borderColor: DOCKER_BLUE }}
				initial={{ opacity: 0, scale: 0.9 }}
				animate={isInView ? { opacity: 1, scale: 1 } : {}}
				transition={{ duration: 0.5 }}
			>
				{/* Docker badge */}
				<motion.div
					className="absolute -top-3 left-4 flex items-center gap-1.5 bg-white dark:bg-gray-900 px-2 py-0.5 rounded text-xs font-semibold"
					style={{ color: DOCKER_BLUE }}
					initial={{ opacity: 0, y: 5 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ delay: 0.3 }}
				>
					<img src="/img/docker.svg" alt="Docker" className="w-5 h-5" />
					docker compose
				</motion.div>

				<div className="flex flex-col gap-3 min-w-[320px]">
					{layers.map((layer, i) => (
						<React.Fragment key={layer.key}>
							<motion.div
								className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
								initial={{ opacity: 0, x: -20 }}
								animate={isInView ? { opacity: 1, x: 0 } : {}}
								transition={{ duration: 0.4, delay: 0.2 + i * 0.15 }}
							>
								{layer.icon}
								<div>
									<div className="text-sm font-semibold text-gray-800 dark:text-gray-200">{layer.label}</div>
									<div className="text-[10px] text-gray-500 dark:text-gray-400">{layer.sublabel}</div>
								</div>
							</motion.div>
							{i < layers.length - 1 && (
								<motion.div
									className="flex justify-center"
									initial={{ opacity: 0 }}
									animate={isInView ? { opacity: 0.4 } : {}}
									transition={{ delay: 0.5 + i * 0.15 }}
								>
									<svg width="20" height="16" viewBox="0 0 20 16">
										<path d="M10 0 L10 12 M5 8 L10 14 L15 8" stroke="currentColor" fill="none" strokeWidth="1.5" className="text-gray-400 dark:text-gray-500" />
									</svg>
								</motion.div>
							)}
						</React.Fragment>
					))}
				</div>
			</motion.div>
		</div>
	);
}
