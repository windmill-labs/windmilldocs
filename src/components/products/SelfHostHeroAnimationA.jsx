import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Plane, Monitor, CheckCircle } from 'lucide-react';
import {
	SiDocker,
	SiKubernetes,
	SiAmazonaws,
	SiGooglecloud,
	SiMicrosoftazure,
	SiHetzner,
	SiRender,
	SiDigitalocean,
} from 'react-icons/si';

const targets = [
	{ id: 'local', label: 'Local', Icon: Monitor, color: '#6B7280' },
	{ id: 'docker', label: 'Docker', Icon: SiDocker, color: '#2496ED' },
	{ id: 'kubernetes', label: 'Kubernetes', Icon: SiKubernetes, color: '#326CE5' },
	{ id: 'aws', label: 'AWS', Icon: SiAmazonaws, color: '#FF9900' },
	{ id: 'gcp', label: 'GCP', Icon: SiGooglecloud, color: '#4285F4' },
	{ id: 'azure', label: 'Azure', Icon: SiMicrosoftazure, color: '#0078D4' },
	{ id: 'hetzner', label: 'Hetzner', Icon: SiHetzner, color: '#D50C2D' },
	{ id: 'flyio', label: 'Fly.io', Icon: Plane, color: '#7B3FE4' },
	{ id: 'render', label: 'Render', Icon: SiRender, color: '#46E3B7' },
	{ id: 'digitalocean', label: 'DigitalOcean', Icon: SiDigitalocean, color: '#0080FF' },
];

function TargetCard({ target, index, isSelected }) {
	const TargetIcon = target.Icon;
	return (
		<motion.div
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
			<TargetIcon
				className="w-6 h-6"
				style={{ color: target.color }}
			/>
			<span className={`text-[10px] font-medium text-center leading-tight ${
				isSelected ? 'text-blue-600' : 'text-gray-500'
			}`}>
				{target.label}
			</span>
		</motion.div>
	);
}

export default function SelfHostHeroAnimationA() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.3 });
	const [phase, setPhase] = useState(0);
	const [cycle, setCycle] = useState(0);

	// Phase 0: nothing
	// Phase 1: card with header + grid of logos, Deploy button disabled
	// Phase 2: Docker gets selected, Deploy button becomes enabled
	// Phase 3: Deploy button press animation
	// Phase 4: Grid replaced by spinning Windmill logo + success message

	useEffect(() => {
		if (!isInView) return;
		const timers = [
			setTimeout(() => setPhase(1), 400),
			setTimeout(() => setPhase(2), 2000),
			setTimeout(() => setPhase(3), 3400),
			setTimeout(() => setPhase(4), 3800),
			setTimeout(() => {
				setPhase(0);
				setCycle(c => c + 1);
			}, 7500),
		];
		return () => timers.forEach(clearTimeout);
	}, [isInView, cycle]);

	const CARD_HEIGHT = 340;
	const deployEnabled = phase >= 2;
	const deployPressed = phase === 3;

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
						{/* Header */}
						<div className="px-5 py-3.5 border-b border-gray-100 flex items-center justify-between">
							<span className="text-sm font-semibold text-gray-700">Self host</span>
							{phase < 4 && (
								<motion.div
									animate={{
										scale: deployPressed ? 0.95 : 1,
									}}
									transition={{ duration: 0.15 }}
								>
									<div
										className={`px-4 py-1.5 rounded-lg text-xs font-medium select-none transition-all duration-200 ${
											deployPressed
												? 'bg-blue-700 text-white shadow-inner'
												: deployEnabled
												? 'bg-blue-600 text-white shadow-sm'
												: 'bg-gray-100 text-gray-300 cursor-not-allowed'
										}`}
									>
										Deploy
									</div>
								</motion.div>
							)}
						</div>

						{/* Content */}
						<div className="relative" style={{ height: CARD_HEIGHT - 52 }}>
							{/* Logo grid */}
							{phase >= 1 && phase < 4 && (
								<div className="px-6 py-5">
									<div className="text-[10px] uppercase tracking-wider text-gray-400 mb-3">
										Deploy on
									</div>
									<div className="grid grid-cols-5 gap-3">
										{targets.map((target, i) => (
											<TargetCard
												key={target.id}
												target={target}
												index={i}
												isSelected={phase >= 2 && target.id === 'docker'}
											/>
										))}
									</div>
								</div>
							)}

							{/* Success state */}
							{phase >= 4 && (
								<motion.div
									className="absolute inset-0 flex flex-col items-center justify-center gap-4"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 0.4 }}
								>
									<motion.img
										src="/img/windmill.svg"
										alt="Windmill"
										className="w-16 h-16"
										animate={{ rotate: 360 }}
										transition={{
											duration: 2,
											repeat: 2,
											ease: 'linear',
										}}
									/>
									<motion.div
										className="flex items-center gap-2"
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: 0.8, duration: 0.3 }}
									>
										<CheckCircle className="w-4 h-4 text-green-500" />
										<span className="text-sm font-medium text-gray-700">
											Deployed successfully
										</span>
									</motion.div>
								</motion.div>
							)}
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	);
}
