import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Database, Server, Cpu, HardDrive, CheckCircle } from 'lucide-react';
import { SiAmazonaws, SiGooglecloud, SiMicrosoftazure } from 'react-icons/si';

const providers = [
	{ id: 'aws', label: 'AWS', Icon: SiAmazonaws, tint: 'border-orange-300', bg: 'bg-orange-50/40', text: 'text-orange-600', deployLabel: 'helm install' },
	{ id: 'gcp', label: 'GCP', Icon: SiGooglecloud, tint: 'border-blue-300', bg: 'bg-blue-50/40', text: 'text-blue-600', deployLabel: 'helm install' },
	{ id: 'azure', label: 'Azure', Icon: SiMicrosoftazure, tint: 'border-cyan-300', bg: 'bg-cyan-50/40', text: 'text-cyan-600', deployLabel: 'helm install' },
	{ id: 'bare', label: 'Bare metal', Icon: HardDrive, tint: 'border-slate-400', bg: 'bg-slate-50/40', text: 'text-slate-600', deployLabel: 'docker compose' },
];

const archNodes = [
	{ id: 'pg', label: 'PostgreSQL', Icon: Database },
	{ id: 'server', label: 'Server', Icon: Server },
	{ id: 'workers', label: 'Workers', Icon: Cpu },
];

export default function SelfHostHeroAnimationC() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.3 });
	const [phase, setPhase] = useState(0);
	const [cycle, setCycle] = useState(0);

	useEffect(() => {
		if (!isInView) return;
		const timers = [
			setTimeout(() => setPhase(1), 400),
			setTimeout(() => setPhase(2), 1000),
			setTimeout(() => setPhase(3), 1800),
			setTimeout(() => setPhase(4), 3000),
			setTimeout(() => setPhase(5), 4200),
			setTimeout(() => setPhase(6), 5400),
			setTimeout(() => setPhase(7), 6600),
			setTimeout(() => {
				setPhase(0);
				setCycle(c => c + 1);
			}, 7800),
		];
		return () => timers.forEach(clearTimeout);
	}, [isInView, cycle]);

	// Which provider is active (phases 3-6 map to providers 0-3)
	const activeProvider = phase >= 3 && phase <= 6 ? phase - 3 : -1;
	// Which providers have checkmarks (all completed providers)
	const checkedProviders = phase >= 3 ? Math.min(phase - 2, 4) : 0;
	const allDone = phase >= 7;

	// Get border color for architecture nodes
	const getArchBorder = () => {
		if (allDone) return 'border-gray-200';
		if (activeProvider >= 0) return providers[activeProvider].tint;
		return 'border-gray-200';
	};

	const getArchBg = () => {
		if (allDone) return 'bg-gray-50';
		if (activeProvider >= 0) return providers[activeProvider].bg;
		return 'bg-gray-50';
	};

	return (
		<div ref={ref} className="relative" style={{ height: 380 }}>
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
						<div className="px-5 py-3.5 border-b border-gray-100 flex items-center gap-2">
							<Server className="w-4 h-4 text-gray-400" />
							<span className="text-sm font-semibold text-gray-700">Cloud agnostic</span>
							{allDone && (
								<motion.span
									className="ml-auto text-[10px] text-gray-500 font-medium"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
								>
									Same stack, any infrastructure
								</motion.span>
							)}
						</div>

						<div className="px-5 py-4" style={{ minHeight: 280 }}>
							{/* Provider pills */}
							{phase >= 2 && (
								<motion.div
									className="flex gap-2 mb-5 justify-center flex-wrap"
									initial={{ opacity: 0, y: -5 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.3 }}
								>
									{providers.map((provider, i) => {
										const ProviderIcon = provider.Icon;
										const isActive = activeProvider === i;
										const isChecked = i < checkedProviders;

										return (
											<motion.div
												key={provider.id}
												className={`rounded-full border px-3 py-1.5 flex items-center gap-1.5 transition-all duration-300 ${
													isActive
														? `${provider.tint} ${provider.bg} shadow-sm`
														: isChecked
														? 'border-green-200 bg-green-50/30'
														: 'border-gray-200 bg-gray-50'
												}`}
												animate={isActive ? { scale: 1.05 } : { scale: 1 }}
												transition={{ duration: 0.2 }}
											>
												<ProviderIcon className={`w-3.5 h-3.5 ${
													isActive ? provider.text : isChecked ? 'text-green-500' : 'text-gray-400'
												}`} />
												<span className={`text-[11px] font-medium ${
													isActive ? provider.text : isChecked ? 'text-green-600' : 'text-gray-500'
												}`}>
													{provider.label}
												</span>
												{isChecked && (
													<motion.div
														initial={{ opacity: 0, scale: 0.5 }}
														animate={{ opacity: 1, scale: 1 }}
														transition={{ duration: 0.2 }}
													>
														<CheckCircle className="w-3 h-3 text-green-500" />
													</motion.div>
												)}
											</motion.div>
										);
									})}
								</motion.div>
							)}

							{/* Deploy label */}
							{activeProvider >= 0 && (
								<motion.div
									key={activeProvider}
									className="text-center mb-4"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 0.2 }}
								>
									<span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${providers[activeProvider].tint} ${providers[activeProvider].bg} ${providers[activeProvider].text}`}>
										{providers[activeProvider].deployLabel}
									</span>
								</motion.div>
							)}

							{/* Architecture nodes */}
							{phase >= 1 && (
								<div className="relative">
									{/* SVG connector lines */}
									<svg className="absolute pointer-events-none" style={{ width: '100%', height: 200, left: 0, top: 0 }}>
										<motion.line
											x1="50%" y1={42} x2="50%" y2={72}
											stroke="#d1d5db" strokeWidth={1.5}
											initial={{ opacity: 0 }} animate={{ opacity: 1 }}
											transition={{ duration: 0.3, delay: 0.1 }}
										/>
										<motion.line
											x1="50%" y1={112} x2="50%" y2={142}
											stroke="#d1d5db" strokeWidth={1.5}
											initial={{ opacity: 0 }} animate={{ opacity: 1 }}
											transition={{ duration: 0.3, delay: 0.2 }}
										/>
									</svg>

									<div className="flex flex-col items-center gap-3">
										{archNodes.map((node, i) => {
											const NodeIcon = node.Icon;
											return (
												<motion.div
													key={node.id}
													className={`rounded-lg border px-4 py-2 flex items-center gap-2.5 transition-all duration-300 ${getArchBorder()} ${getArchBg()}`}
													style={{ width: 180 }}
													initial={{ opacity: 0, scale: 0.9 }}
													animate={{ opacity: 1, scale: 1 }}
													transition={{ duration: 0.3, delay: i * 0.1 }}
												>
													<NodeIcon className={`w-4 h-4 ${
														activeProvider >= 0 ? providers[activeProvider].text.replace('text-', 'text-') : 'text-gray-400'
													}`} />
													<span className="text-[12px] font-mono text-gray-600">{node.label}</span>
												</motion.div>
											);
										})}
									</div>
								</div>
							)}
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	);
}
