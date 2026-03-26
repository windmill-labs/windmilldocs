import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
	SiAmazonaws,
	SiGooglecloud,
	SiMicrosoftazure,
	SiHetzner,
	SiRender,
	SiDigitalocean,
} from 'react-icons/si';
import { Plane, Check } from 'lucide-react';

const providers = [
	{ key: 'aws', label: 'AWS', Icon: SiAmazonaws, color: '#FF9900' },
	{ key: 'gcp', label: 'GCP', Icon: SiGooglecloud, color: '#4285F4' },
	{ key: 'azure', label: 'Azure', Icon: SiMicrosoftazure, color: '#0078D4' },
	{ key: 'hetzner', label: 'Hetzner', Icon: SiHetzner, color: '#D50C2D' },
	{ key: 'flyio', label: 'Fly.io', Icon: Plane, color: '#7B3FE4' },
	{ key: 'render', label: 'Render', Icon: SiRender, color: '#46E3B7' },
	{ key: 'digitalocean', label: 'DigitalOcean', Icon: SiDigitalocean, color: '#0080FF' },
];

export default function CloudProvidersDiagram() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.3 });

	return (
		<div ref={ref} className="flex items-center justify-center h-80">
			<div className="flex flex-col items-center gap-4 w-full max-w-md">
				{/* Windmill deploys on label */}
				<motion.div
					className="text-xs uppercase tracking-wider text-gray-400 dark:text-gray-500"
					initial={{ opacity: 0 }}
					animate={isInView ? { opacity: 1 } : {}}
					transition={{ duration: 0.3 }}
				>
					Deploy Windmill on
				</motion.div>

				{/* Two rows of providers sliding in from alternate sides */}
				<div className="flex flex-col gap-3 w-full">
					{[providers.slice(0, 4), providers.slice(4)].map((row, rowIdx) => (
						<div key={rowIdx} className="flex justify-center gap-3">
							{row.map((p, i) => (
								<motion.div
									key={p.key}
									className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
									initial={{ opacity: 0, x: rowIdx === 0 ? -30 : 30 }}
									animate={isInView ? { opacity: 1, x: 0 } : {}}
									transition={{ duration: 0.4, delay: 0.2 + (rowIdx * 4 + i) * 0.08 }}
								>
									<p.Icon size={20} style={{ color: p.color }} />
									<span className="text-xs font-medium text-gray-700 dark:text-gray-300">{p.label}</span>
								</motion.div>
							))}
						</div>
					))}
				</div>

				{/* Checkmark */}
				<motion.div
					className="flex items-center gap-1.5 mt-1"
					initial={{ opacity: 0 }}
					animate={isInView ? { opacity: 1 } : {}}
					transition={{ delay: 0.9 }}
				>
					<Check className="w-3.5 h-3.5 text-green-500" />
					<span className="text-[11px] text-gray-500 dark:text-gray-400">Same binary, any cloud</span>
				</motion.div>
			</div>
		</div>
	);
}
