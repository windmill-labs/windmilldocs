import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SiAmazons3, SiMicrosoftazure, SiGooglecloud } from 'react-icons/si';

const backends = [
	{ key: 's3', Icon: SiAmazons3, label: 'S3', color: '#569A31' },
	{ key: 'azure', Icon: SiMicrosoftazure, label: 'Azure Blob', color: '#0078D4' },
	{ key: 'gcs', Icon: SiGooglecloud, label: 'GCS', color: '#4285F4' },
];

export default function PersistentVolumesDiagram() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.3 });

	return (
		<div ref={ref} className="flex items-center justify-center">
			<div className="flex items-center gap-8">
				{backends.map((b, i) => (
					<motion.div
						key={b.key}
						className="flex flex-col items-center gap-3 px-8 py-6 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
						initial={{ opacity: 0, y: 15, scale: 0.8 }}
						animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
						transition={{
							duration: 0.4,
							delay: 0.15 + i * 0.12,
							type: 'spring',
							stiffness: 250,
							damping: 20,
						}}
					>
						<b.Icon size={48} style={{ color: b.color }} />
						<span className="text-sm font-medium text-gray-600 dark:text-gray-400">{b.label}</span>
					</motion.div>
				))}
			</div>
		</div>
	);
}
