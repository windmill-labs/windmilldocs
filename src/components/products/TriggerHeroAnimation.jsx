import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FileCode, Zap, Mail, Database, Calendar, Webhook, Radio, Rss, Globe, Cloud, MessageSquare, Waypoints, Route, MonitorPlay, Plug, RefreshCw } from 'lucide-react';
import { SiTypescript } from 'react-icons/si';

const triggerTypes = [
	// Column 1
	{ id: 'schedule',   label: 'Schedule',         icon: Calendar,       color: 'text-blue-500' },
	{ id: 'webhook',    label: 'Webhook',          icon: Webhook,        color: 'text-orange-500' },
	{ id: 'http',       label: 'HTTP routes',      icon: Route,          color: 'text-cyan-500' },
	{ id: 'kafka',      label: 'Kafka',            icon: Waypoints,      color: 'text-emerald-500' },
	{ id: 'postgres',   label: 'Postgres CDC',     icon: Database,       color: 'text-violet-500' },
	{ id: 'websocket',  label: 'WebSocket',        icon: Radio,          color: 'text-pink-500' },
	{ id: 'email',      label: 'Email',            icon: Mail,           color: 'text-amber-500' },
	{ id: 'nats',       label: 'NATS',             icon: MessageSquare,  color: 'text-green-500' },
	// Column 2
	{ id: 'sqs',        label: 'SQS',              icon: Cloud,          color: 'text-orange-400' },
	{ id: 'mqtt',       label: 'MQTT',             icon: Rss,            color: 'text-teal-500' },
	{ id: 'gcppubsub',  label: 'GCP Pub/Sub',      icon: Cloud,          color: 'text-blue-400' },
	{ id: 'native',     label: 'Native triggers',  icon: Globe,          color: 'text-indigo-500' },
	{ id: 'ui',         label: 'Auto-generated UIs',icon: MonitorPlay,   color: 'text-purple-500' },
	{ id: 'cli',        label: 'CLI & API',        icon: Zap,            color: 'text-gray-500' },
	{ id: 'mcp',        label: 'MCP',              icon: Plug,           color: 'text-rose-500' },
	{ id: 'polls',      label: 'Scheduled polls',  icon: RefreshCw,      color: 'text-sky-500' },
];

function TriggerRow({ t, i, phase }) {
	const activeOrder = ['schedule', 'kafka'];
	const activeIdx = activeOrder.indexOf(t.id);
	const isOn = activeIdx >= 0 && phase >= 3 + activeIdx;
	return (
		<motion.div
			className="flex items-center justify-between py-1.5 px-2 rounded-lg mb-0.5"
			initial={{ opacity: 0, x: 20 }}
			animate={phase >= 2 ? { opacity: 1, x: 0 } : {}}
			transition={{ duration: 0.3, delay: 0.05 + i * 0.04 }}
		>
			<div className="flex items-center gap-2">
				<t.icon className={`w-3.5 h-3.5 ${isOn ? t.color : 'text-gray-400'}`} />
				<span className={`text-[11px] font-medium ${isOn ? 'text-gray-700' : 'text-gray-400'} whitespace-nowrap`}>{t.label}</span>
			</div>
			<div className={`w-7 h-[16px] rounded-full relative transition-colors duration-300 ${isOn ? 'bg-blue-500' : 'bg-gray-200'}`}>
				<motion.div
					className="absolute top-[2px] w-[12px] h-[12px] rounded-full bg-white shadow-sm"
					animate={{ left: isOn ? 13 : 2 }}
					transition={{ duration: 0.2 }}
				/>
			</div>
		</motion.div>
	);
}

export default function TriggerHeroAnimation() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.3 });
	const [phase, setPhase] = useState(0);

	useEffect(() => {
		if (!isInView) return;
		const timers = [
			setTimeout(() => setPhase(1), 400),
			setTimeout(() => setPhase(2), 1000),
			setTimeout(() => setPhase(3), 1800),
			setTimeout(() => setPhase(4), 2400),
		];
		return () => timers.forEach(clearTimeout);
	}, [isInView]);

	const col1 = triggerTypes.slice(0, 8);
	const col2 = triggerTypes.slice(8);

	return (
		<div ref={ref} className="relative" style={{ height: 420 }}>
			<div className="relative overflow-hidden h-full flex items-center justify-center">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={phase >= 1 ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.5 }}
					style={{ width: 460 }}
				>
					<div className="rounded-2xl border border-gray-200 bg-white shadow-lg p-5">
						<div className="flex items-center gap-3 mb-4">
							<div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
								<SiTypescript className="w-4 h-4 text-[#3178C6]" />
							</div>
							<div className="text-sm font-semibold text-gray-800">process_order.ts</div>
						</div>

						<motion.div
							initial={{ opacity: 0, height: 0 }}
							animate={phase >= 2 ? { opacity: 1, height: 'auto' } : {}}
							transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
							style={{ overflow: 'hidden' }}
						>
							<div className="border-t border-gray-100 pt-3">
								<div className="flex items-center gap-2 mb-3">
									<Zap className="w-3.5 h-3.5 text-blue-500" />
									<span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Triggers</span>
								</div>

								<div className="grid grid-cols-2 gap-x-4">
									<div>
										{col1.map((t, i) => <TriggerRow key={t.id} t={t} i={i} phase={phase} />)}
									</div>
									<div>
										{col2.map((t, i) => <TriggerRow key={t.id} t={t} i={i + 8} phase={phase} />)}
									</div>
								</div>
							</div>
						</motion.div>
					</div>
				</motion.div>
			</div>
		</div>
	);
}
