import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Plane, Monitor, CloudCog } from 'lucide-react';
import {
	SiDocker,
	SiKubernetes,
	SiHelm,
	SiTerraform,
	SiAmazonecs,
	SiWindows,
	SiAmazonaws,
	SiGooglecloud,
	SiMicrosoftazure,
	SiHetzner,
	SiRender,
	SiDigitalocean,
} from 'react-icons/si';

const deployMethods = [
	{ id: 'docker', label: 'Docker', Icon: SiDocker, color: '#2496ED' },
	{ id: 'kubernetes', label: 'Kubernetes', Icon: SiKubernetes, color: '#326CE5' },
	{ id: 'helm', label: 'Helm', Icon: SiHelm, color: '#0F1689' },
	{ id: 'ecs', label: 'AWS ECS', Icon: SiAmazonecs, color: '#FF9900' },
	{ id: 'cloudformation', label: 'CloudFormation', Icon: CloudCog, color: '#FF4F8B' },
	{ id: 'terraform', label: 'Terraform', Icon: SiTerraform, color: '#7B42BC' },
	{ id: 'windows', label: 'Windows', Icon: SiWindows, color: '#0078D6' },
];

const infraProviders = [
	{ id: 'local', label: 'Local', Icon: Monitor, color: '#6B7280' },
	{ id: 'aws', label: 'AWS', Icon: SiAmazonaws, color: '#FF9900' },
	{ id: 'gcp', label: 'GCP', Icon: SiGooglecloud, color: '#4285F4' },
	{ id: 'azure', label: 'Azure', Icon: SiMicrosoftazure, color: '#0078D4' },
	{ id: 'hetzner', label: 'Hetzner', Icon: SiHetzner, color: '#D50C2D' },
	{ id: 'flyio', label: 'Fly.io', Icon: Plane, color: '#7B3FE4' },
	{ id: 'render', label: 'Render', Icon: SiRender, color: '#46E3B7' },
	{ id: 'digitalocean', label: 'DigitalOcean', Icon: SiDigitalocean, color: '#0080FF' },
];

const selectedIds = new Set(['docker', 'aws']);

function ProviderCard({ provider, index, showSelected }) {
	const ProviderIcon = provider.Icon;
	const isSelected = showSelected && selectedIds.has(provider.id);
	return (
		<motion.div
			key={provider.id}
			className={`flex flex-col items-center gap-1.5 p-3 rounded-lg border transition-colors duration-200 ${
				isSelected
					? 'border-blue-400 bg-blue-50/60 shadow-sm'
					: 'border-gray-100 bg-gray-50/50'
			}`}
			initial={{ opacity: 0, y: 15, scale: 0.8 }}
			animate={{ opacity: 1, y: 0, scale: 1 }}
			transition={{
				duration: 0.35,
				delay: index * 0.06,
				type: 'spring',
				stiffness: 300,
				damping: 20,
			}}
		>
			<ProviderIcon
				className="w-6 h-6"
				style={{ color: provider.color }}
			/>
			<span className={`text-[10px] font-medium text-center leading-tight ${
				isSelected ? 'text-blue-600' : 'text-gray-500'
			}`}>
				{provider.label}
			</span>
		</motion.div>
	);
}

export default function SelfHostHeroAnimationA2() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.3 });
	const [phase, setPhase] = useState(0);

	useEffect(() => {
		if (!isInView) return;
		const timers = [
			setTimeout(() => setPhase(1), 400),
			setTimeout(() => setPhase(2), 1800),
			setTimeout(() => setPhase(3), 2200),
			setTimeout(() => setPhase(4), 4000),
			setTimeout(() => setPhase(5), 5400),
		];
		return () => timers.forEach(clearTimeout);
	}, [isInView]);

	const CARD_HEIGHT = 380;

	return (
		<div ref={ref} className="relative" style={{ height: CARD_HEIGHT }}>
			<div className="relative h-full flex items-center justify-center">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={phase >= 1 ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.5 }}
					style={{ maxWidth: 520 }}
					className="w-full mx-auto"
				>
					<div className="rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden">
						<div className="relative px-6" style={{ height: CARD_HEIGHT }}>
							{/* Deploy button centered */}
							{phase >= 1 && phase < 3 && (
								<motion.div
									className="absolute inset-0 flex items-center justify-center"
									initial={{ opacity: 0, scale: 0.9 }}
									animate={{
										opacity: 1,
										scale: phase === 2 ? 0.95 : 1,
									}}
									exit={{ opacity: 0, scale: 0.8 }}
									transition={{ duration: 0.2 }}
								>
									<div
										className={`px-8 py-3 rounded-lg font-medium text-sm select-none transition-all duration-150 ${
											phase === 2
												? 'bg-blue-700 text-white shadow-inner'
												: 'bg-blue-600 text-white shadow-md'
										}`}
									>
										Deploy
									</div>
								</motion.div>
							)}

							{/* Logos grid */}
							{phase >= 3 && (
								<motion.div
									className="absolute inset-0 px-6 py-5 flex flex-col justify-center"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 0.3 }}
								>
									{/* Deploy with (methods) */}
									<div className="mb-4">
										<div className="text-[10px] uppercase tracking-wider text-gray-400 mb-2">
											Deploy with
										</div>
										<div className="grid grid-cols-4 gap-3">
											{deployMethods.map((method, i) => (
												<ProviderCard
													key={method.id}
													provider={method}
													index={i}
													showSelected={phase >= 4}
												/>
											))}
										</div>
									</div>

									{/* On (infrastructure providers) */}
									<div>
										<div className="text-[10px] uppercase tracking-wider text-gray-400 mb-2">
											On
										</div>
										<div className="grid grid-cols-4 gap-3">
											{infraProviders.map((provider, i) => (
												<ProviderCard
													key={provider.id}
													provider={provider}
													index={i + deployMethods.length}
													showSelected={phase >= 4}
												/>
											))}
										</div>
									</div>
								</motion.div>
							)}
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	);
}
