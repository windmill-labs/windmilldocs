import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FileCode, Zap, Mail, Database, Calendar, Webhook, Radio, Rss, Globe, Cloud, MessageSquare, Waypoints, Route, MonitorPlay, Plug, RefreshCw } from 'lucide-react';
import { SiTypescript } from 'react-icons/si';

import LandingHeader from '../../landing/LandingHeader';
import Footer from '../../landing/Footer';
import RadialBlur from '../../landing/RadialBlur';
import LayoutProvider from '@theme/Layout/Provider';
import HeroCTAButtons from '../../components/products/HeroCTAButtons';

const fadeIn = {
	initial: { opacity: 0, y: 30 },
	whileInView: { opacity: 1, y: 0 },
	viewport: { once: true },
	transition: { duration: 0.5 }
};


// ══════════════════════════════════════════════════════
// TRIGGER ANIMATIONS
// ══════════════════════════════════════════════════════

const triggerTypes = [
	// Column 1
	{ id: 'schedule',   label: 'Schedule',      icon: Calendar,       color: 'text-blue-500' },
	{ id: 'webhook',    label: 'Webhook',       icon: Webhook,        color: 'text-orange-500' },
	{ id: 'http',       label: 'HTTP routes',   icon: Route,          color: 'text-cyan-500' },
	{ id: 'kafka',      label: 'Kafka',         icon: Waypoints,      color: 'text-emerald-500' },
	{ id: 'postgres',   label: 'Postgres CDC',  icon: Database,       color: 'text-violet-500' },
	{ id: 'websocket',  label: 'WebSocket',     icon: Radio,          color: 'text-pink-500' },
	{ id: 'email',      label: 'Email',         icon: Mail,           color: 'text-amber-500' },
	{ id: 'nats',       label: 'NATS',          icon: MessageSquare,  color: 'text-green-500' },
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

// ── Trigger Concept 1: Trigger carousel ──
// Triggers fly in from the left one by one and connect to a central script card

function TriggerConcept1() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.3 });
	const [visibleCount, setVisibleCount] = useState(0);

	useEffect(() => {
		if (!isInView) return;
		const timers = triggerTypes.map((_, i) =>
			setTimeout(() => setVisibleCount(i + 1), 800 + i * 500)
		);
		return () => timers.forEach(clearTimeout);
	}, [isInView]);

	const scriptX = 360;
	const scriptY = 180;

	return (
		<div ref={ref} className="relative" style={{ height: 400 }}>
			<div className="relative overflow-hidden h-full">
				{/* Connection lines */}
				<svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
					{triggerTypes.map((t, i) => {
						const ty = 60 + i * 56;
						const visible = i < visibleCount;
						return (
							<motion.line
								key={t.id}
								x1={190} y1={ty} x2={scriptX - 100} y2={scriptY}
								stroke="#94a3b8"
								strokeWidth={1.5}
								strokeDasharray="4 4"
								initial={{ opacity: 0, pathLength: 0 }}
								animate={visible ? { opacity: 0.6, pathLength: 1 } : {}}
								transition={{ duration: 0.4, delay: 0.2 }}
							/>
						);
					})}
				</svg>

				{/* Trigger chips */}
				{triggerTypes.map((t, i) => {
					const ty = 60 + i * 56;
					const visible = i < visibleCount;
					return (
						<motion.div
							key={t.id}
							className="absolute"
							style={{ left: 20, top: ty, transform: 'translateY(-50%)' }}
							initial={{ opacity: 0, x: -40 }}
							animate={visible ? { opacity: 1, x: 0 } : {}}
							transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
						>
							<div className={`px-4 py-2 rounded-xl border ${t.border} ${t.bg} flex items-center gap-2.5 shadow-sm`}
								style={{ width: 170, height: 40 }}>
								<t.icon className={`w-4 h-4 ${t.color} flex-shrink-0`} />
								<span className="text-sm font-medium text-gray-700 whitespace-nowrap">{t.label}</span>
							</div>
						</motion.div>
					);
				})}

				{/* Script card */}
				<motion.div
					className="absolute"
					style={{ left: scriptX - 100, top: scriptY, transform: 'translateY(-50%)' }}
					initial={{ opacity: 0, scale: 0.9 }}
					animate={isInView ? { opacity: 1, scale: 1 } : {}}
					transition={{ duration: 0.5, delay: 0.3 }}
				>
					<div className="px-5 py-3 rounded-xl border border-gray-200 bg-white shadow-lg flex items-center gap-3"
						style={{ width: 200, height: 52 }}>
						<FileCode className="w-5 h-5 text-[#3178C6] flex-shrink-0" />
						<div>
							<span className="text-sm font-semibold text-gray-800 block">process_order</span>
							<span className="text-[11px] text-gray-400">TypeScript</span>
						</div>
					</div>
				</motion.div>

				{/* Active triggers counter */}
				{visibleCount > 0 && (
					<motion.div
						className="absolute"
						style={{ left: scriptX - 100, top: scriptY + 40 }}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.3 }}
					>
						<motion.span
							key={visibleCount}
							className="text-xs font-medium text-blue-500"
							initial={{ opacity: 0, y: 5 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.2 }}
						>
							{visibleCount} trigger{visibleCount > 1 ? 's' : ''} active
						</motion.span>
					</motion.div>
				)}
			</div>
		</div>
	);
}


// ── Trigger Concept 2: Stacking triggers with pulsing connections ──
// Script on the right, triggers stack on the left with animated pulse lines

function TriggerConcept2() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.3 });
	const [visibleCount, setVisibleCount] = useState(0);

	useEffect(() => {
		if (!isInView) return;
		const timers = triggerTypes.map((_, i) =>
			setTimeout(() => setVisibleCount(i + 1), 600 + i * 600)
		);
		return () => timers.forEach(clearTimeout);
	}, [isInView]);

	return (
		<div ref={ref} className="relative" style={{ height: 420 }}>
			<div className="relative overflow-hidden h-full flex items-center justify-center">
				{/* Script card (right side) */}
				<motion.div
					className="absolute"
					style={{ right: 40, top: '50%', transform: 'translateY(-50%)' }}
					initial={{ opacity: 0, x: 30 }}
					animate={isInView ? { opacity: 1, x: 0 } : {}}
					transition={{ duration: 0.5 }}
				>
					<div className="rounded-2xl border border-gray-200 bg-white shadow-xl p-5" style={{ width: 220 }}>
						<div className="flex items-center gap-3 mb-3">
							<div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
								<FileCode className="w-4 h-4 text-[#3178C6]" />
							</div>
							<div>
								<div className="text-sm font-semibold text-gray-800">process_order</div>
								<div className="text-[11px] text-gray-400">TypeScript</div>
							</div>
						</div>
						{/* Mini code preview */}
						<div className="rounded-lg bg-gray-50 border border-gray-100 p-2.5 font-mono text-[10px] text-gray-500 leading-relaxed">
							<div><span className="text-blue-500">export async function</span> main(</div>
							<div className="pl-3">order_id: <span className="text-amber-600">string</span>,</div>
							<div className="pl-3">amount: <span className="text-amber-600">number</span></div>
							<div>) {'{'}</div>
							<div className="pl-3 text-gray-400">// process order...</div>
							<div>{'}'}</div>
						</div>
					</div>
				</motion.div>

				{/* Triggers stacking on the left */}
				{triggerTypes.map((t, i) => {
					const visible = i < visibleCount;
					const yOffset = -((triggerTypes.length - 1) * 25) + i * 50;
					return (
						<React.Fragment key={t.id}>
							{/* Connection line with pulse */}
							{visible && (
								<svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
									<motion.line
										x1={200} y1={210 + yOffset}
										x2={310} y2={210}
										stroke="#3b82f6"
										strokeWidth={1.5}
										initial={{ opacity: 0 }}
										animate={{ opacity: [0, 0.5, 0.3] }}
										transition={{ duration: 0.8, delay: 0.1 }}
									/>
									{/* Pulse dot traveling along line */}
									<motion.circle
										r={3}
										fill="#3b82f6"
										initial={{ opacity: 0 }}
										animate={{
											cx: [200, 310],
											cy: [210 + yOffset, 210],
											opacity: [0, 1, 1, 0],
										}}
										transition={{
											duration: 1.2,
											delay: 0.2,
											repeat: Infinity,
											repeatDelay: 2,
											ease: 'linear',
										}}
									/>
								</svg>
							)}
							{/* Trigger chip */}
							<motion.div
								className="absolute"
								style={{ left: 30, top: `calc(50% + ${yOffset}px)`, transform: 'translateY(-50%)' }}
								initial={{ opacity: 0, x: -50, scale: 0.8 }}
								animate={visible ? { opacity: 1, x: 0, scale: 1 } : {}}
								transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
							>
								<div className={`px-3 py-2 rounded-xl border ${t.border} ${t.bg} flex items-center gap-2 shadow-sm`}
									style={{ width: 160, height: 38 }}>
									<t.icon className={`w-4 h-4 ${t.color} flex-shrink-0`} />
									<span className="text-[13px] font-medium text-gray-700 whitespace-nowrap">{t.label}</span>
								</div>
							</motion.div>
						</React.Fragment>
					);
				})}
			</div>
		</div>
	);
}


// ── Trigger Concept 3: Trigger panel build-up ──
// Mimics the Windmill UI: a script panel + trigger sidebar sliding in

function TriggerConcept3() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.3 });
	const [phase, setPhase] = useState(0); // 0=nothing, 1=card visible, 2=triggers appear, 3=schedule on, 4=kafka on

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

	const activeOrder = ['schedule', 'kafka'];
	const col1 = triggerTypes.slice(0, 8);
	const col2 = triggerTypes.slice(8);

	function TriggerRow({ t, i }) {
		const activeIdx = activeOrder.indexOf(t.id);
		const isOn = activeIdx >= 0 && phase >= 3 + activeIdx;
		return (
			<motion.div
				key={t.id}
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
										{col1.map((t, i) => <TriggerRow key={t.id} t={t} i={i} />)}
									</div>
									<div>
										{col2.map((t, i) => <TriggerRow key={t.id} t={t} i={i + 8} />)}
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


// ══════════════════════════════════════════════════════
// Preview page
// ══════════════════════════════════════════════════════

export default function HeroAnimationsPreview() {
	return (
		<LayoutProvider>
			<main className="relative min-h-screen w-full overflow-x-hidden">
				<LandingHeader />
				<RadialBlur />
				<div className="pt-32 max-w-full">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 pb-16">
						<motion.div {...fadeIn} className="text-center mb-16">
							<h1 className="!text-4xl sm:!text-5xl !font-semibold !tracking-tight text-gray-900 dark:text-white mb-4">
								Triggers hero animation
							</h1>
						</motion.div>

						{/* Trigger Concept 1: Carousel */}
						<div className="mb-32">
							<motion.div {...fadeIn} className="mb-8">
								<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Trigger Concept 1: Trigger carousel</h2>
								<p className="text-gray-600 dark:text-gray-300">Triggers fly in from the left one by one, each connecting to a central script card with dashed lines. A counter shows active triggers.</p>
							</motion.div>
							<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
								<motion.div {...fadeIn}>
									<p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2 tracking-wide uppercase">Triggers</p>
									<h1 className="!text-4xl sm:!text-5xl !font-semibold !tracking-tight text-gray-900 dark:text-white mb-6">
										Every way to start a script or flow
									</h1>
									<p className="text-xl text-gray-600 dark:text-gray-100 mb-8">
										Schedules, webhooks, Kafka, Postgres CDC, WebSockets, emails, and more. No extra configuration needed.
									</p>
									<HeroCTAButtons />
								</motion.div>
								<div className="hidden lg:block">
									<TriggerConcept1 />
								</div>
							</div>
						</div>

						{/* Trigger Concept 2: Stacking with pulse */}
						<div className="mb-32">
							<motion.div {...fadeIn} className="mb-8">
								<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Trigger Concept 2: Stacking triggers with pulse</h2>
								<p className="text-gray-600 dark:text-gray-300">Script card on the right with a code preview. Trigger chips stack on the left with pulsing dots traveling along connection lines.</p>
							</motion.div>
							<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
								<motion.div {...fadeIn}>
									<p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2 tracking-wide uppercase">Triggers</p>
									<h1 className="!text-4xl sm:!text-5xl !font-semibold !tracking-tight text-gray-900 dark:text-white mb-6">
										Every way to start a script or flow
									</h1>
									<p className="text-xl text-gray-600 dark:text-gray-100 mb-8">
										Schedules, webhooks, Kafka, Postgres CDC, WebSockets, emails, and more. No extra configuration needed.
									</p>
									<HeroCTAButtons />
								</motion.div>
								<div className="hidden lg:block">
									<TriggerConcept2 />
								</div>
							</div>
						</div>

						{/* Trigger Concept 3: Panel build-up */}
						<div className="mb-32">
							<motion.div {...fadeIn} className="mb-8">
								<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Trigger Concept 3: UI panel build-up</h2>
								<p className="text-gray-600 dark:text-gray-300">Mimics the Windmill UI. Script panel appears, then a triggers sidebar slides in from the right. Each trigger row toggles on one by one.</p>
							</motion.div>
							<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
								<motion.div {...fadeIn}>
									<p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2 tracking-wide uppercase">Triggers</p>
									<h1 className="!text-4xl sm:!text-5xl !font-semibold !tracking-tight text-gray-900 dark:text-white mb-6">
										Every way to start a script or flow
									</h1>
									<p className="text-xl text-gray-600 dark:text-gray-100 mb-8">
										Schedules, webhooks, Kafka, Postgres CDC, WebSockets, emails, and more. No extra configuration needed.
									</p>
									<HeroCTAButtons />
								</motion.div>
								<div className="hidden lg:block">
									<TriggerConcept3 />
								</div>
							</div>
						</div>

					</div>
				</div>
				<Footer />
			</main>
		</LayoutProvider>
	);
}
