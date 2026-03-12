import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
	Braces, Globe, CalendarClock, History, Layers, Activity, GitBranch,
	Server, Shield, Eye, Rocket
} from 'lucide-react';
import LandingHeader from '../../landing/LandingHeader';
import Footer from '../../landing/Footer';
import RadialBlur from '../../landing/RadialBlur';
import LayoutProvider from '@theme/Layout/Provider';
import HeroCTAButtons from '../../components/products/HeroCTAButtons';

// ── Shared: code lines data ──

const heroCodeLines = [
	{ tokens: [{ text: 'import ', color: 'text-purple-400' }, { text: '{ Client } ', color: 'text-blue-300' }, { text: 'from ', color: 'text-purple-400' }, { text: "'pg'", color: 'text-amber-300' }] },
	{ tokens: [] },
	{ tokens: [{ text: 'type ', color: 'text-purple-400' }, { text: 'Postgresql ', color: 'text-emerald-300' }, { text: '= { ', color: 'text-gray-400' }, { text: 'host', color: 'text-orange-300' }, { text: ': string; ... }', color: 'text-gray-400' }] },
	{ tokens: [] },
	{ tokens: [{ text: 'export async function ', color: 'text-purple-400' }, { text: 'main', color: 'text-blue-300' }, { text: '(', color: 'text-gray-400' }] },
	{ tokens: [{ text: '  db', color: 'text-orange-300' }, { text: ': ', color: 'text-gray-400' }, { text: 'Postgresql', color: 'text-emerald-300' }, { text: ',', color: 'text-gray-400' }] },
	{ tokens: [{ text: '  query', color: 'text-orange-300' }, { text: ': ', color: 'text-gray-400' }, { text: 'string', color: 'text-emerald-300' }, { text: ',', color: 'text-gray-400' }] },
	{ tokens: [{ text: '  limit', color: 'text-orange-300' }, { text: ': ', color: 'text-gray-400' }, { text: 'number', color: 'text-emerald-300' }, { text: ' = ', color: 'text-gray-400' }, { text: '100', color: 'text-amber-300' }] },
	{ tokens: [{ text: ') {', color: 'text-gray-400' }] },
	{ tokens: [{ text: '  const ', color: 'text-purple-400' }, { text: 'client ', color: 'text-blue-300' }, { text: '= ', color: 'text-gray-400' }, { text: 'new ', color: 'text-purple-400' }, { text: 'Client', color: 'text-blue-300' }, { text: '(db)', color: 'text-gray-400' }] },
	{ tokens: [{ text: '  return ', color: 'text-purple-400' }, { text: 'client', color: 'text-blue-300' }, { text: '.query(query, [limit])', color: 'text-gray-400' }] },
	{ tokens: [{ text: '}', color: 'text-gray-400' }] },
];

const allText = heroCodeLines.map((line) => line.tokens.map((t) => t.text).join('') || ' ').join('\n');
const totalChars = allText.length;

// ── Shared: typing hook ──

function useTypingAnimation(isInView, speed = 10) {
	const [typedChars, setTypedChars] = useState(0);
	const [isDone, setIsDone] = useState(false);

	useEffect(() => {
		if (!isInView) return;
		const interval = setInterval(() => {
			setTypedChars((prev) => {
				if (prev >= totalChars) {
					clearInterval(interval);
					setTimeout(() => setIsDone(true), 400);
					return totalChars;
				}
				return prev + 1;
			});
		}, speed);
		return () => clearInterval(interval);
	}, [isInView, speed]);

	return { typedChars, isDone };
}

// ── Shared: render typed lines ──

function renderTypedLines(typedChars) {
	let charsSoFar = 0;
	return heroCodeLines.map((line, i) => {
		const lineText = line.tokens.map((t) => t.text).join('') || ' ';
		const lineStart = charsSoFar;
		charsSoFar += lineText.length + 1;
		const lineCharsShown = Math.max(0, Math.min(lineText.length, typedChars - lineStart));
		if (typedChars <= lineStart) return (
			<div key={i} className="flex h-[1.5em]">
				<span className="text-gray-600 w-5 text-right mr-2 select-none opacity-0 text-[10px]">{i + 1}</span>
			</div>
		);
		let tokCharsSoFar = 0;
		const rendered = [];
		for (const token of line.tokens) {
			if (tokCharsSoFar >= lineCharsShown) break;
			const visibleLen = Math.min(token.text.length, lineCharsShown - tokCharsSoFar);
			rendered.push(
				<span key={rendered.length} className={token.color} style={{ whiteSpace: 'pre' }}>{token.text.slice(0, visibleLen)}</span>
			);
			tokCharsSoFar += token.text.length;
		}
		return (
			<div key={i} className="flex">
				<span className="text-gray-600 w-5 text-right mr-2 select-none text-[10px]">{i + 1}</span>
				{line.tokens.length === 0 ? <span>&nbsp;</span> : rendered}
				{lineCharsShown < lineText.length && (
					<span className="inline-block w-[2px] h-[1.1em] bg-gray-300 ml-[1px] animate-pulse" />
				)}
			</div>
		);
	});
}

// ── Shared: code editor chrome ──

function CodeEditorChrome({ children, scale = 1 }) {
	return (
		<div className="rounded-xl border border-gray-700 bg-gray-950 overflow-hidden" style={{ fontSize: `${11 * scale}px` }}>
			<div className="flex items-center gap-2 px-3 py-2 border-b border-gray-800 bg-gray-900">
				<div className="flex gap-1.5">
					<span className="w-2 h-2 rounded-full bg-red-500/80" />
					<span className="w-2 h-2 rounded-full bg-yellow-500/80" />
					<span className="w-2 h-2 rounded-full bg-green-500/80" />
				</div>
				<span className="text-[10px] font-medium text-gray-400 ml-1">query_db.ts</span>
			</div>
			<div className="p-3 font-mono leading-relaxed">
				{children}
			</div>
		</div>
	);
}

// ── Infrastructure cards data ──

const infraCards = [
	{ icon: Braces, label: 'Auto-generated UI', color: 'blue' },
	{ icon: Globe, label: 'API endpoint', color: 'green' },
	{ icon: CalendarClock, label: 'Triggers', color: 'amber' },
	{ icon: Rocket, label: '1-click deployement', color: 'orange' },
	{ icon: GitBranch, label: 'Versioning', color: 'purple' },
	{ icon: Server, label: 'Dedicated workers', color: 'cyan' },
	{ icon: Activity, label: 'Monitoring', color: 'rose' },
];

const cardColorMap = {
	blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', icon: 'text-blue-400', glow: 'shadow-blue-500/20' },
	green: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', icon: 'text-emerald-400', glow: 'shadow-emerald-500/20' },
	amber: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', icon: 'text-amber-400', glow: 'shadow-amber-500/20' },
	purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', icon: 'text-purple-400', glow: 'shadow-purple-500/20' },
	cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', icon: 'text-cyan-400', glow: 'shadow-cyan-500/20' },
	orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', icon: 'text-orange-400', glow: 'shadow-orange-500/20' },
	rose: { bg: 'bg-rose-500/10', border: 'border-rose-500/30', icon: 'text-rose-400', glow: 'shadow-rose-500/20' },
};


// ══════════════════════════════════════════════════════
// CONCEPT 1: Zoom-out to infrastructure grid
// ══════════════════════════════════════════════════════

function Concept1() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.3 });
	const { typedChars, isDone } = useTypingAnimation(isInView);
	const [showGrid, setShowGrid] = useState(false);

	useEffect(() => {
		if (isDone) setTimeout(() => setShowGrid(true), 300);
	}, [isDone]);

	return (
		<div ref={ref} className="relative w-full" style={{ height: 480 }}>
			{/* Code editor — shrinks and moves up */}
			<motion.div
				className="absolute left-1/2 w-full max-w-md"
				animate={showGrid
					? { scale: 0.55, y: -20, x: '-50%' }
					: { scale: 1, y: 60, x: '-50%' }
				}
				initial={{ scale: 1, y: 60, x: '-50%' }}
				transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
				style={{ transformOrigin: 'top center' }}
			>
				<CodeEditorChrome>
					{renderTypedLines(typedChars)}
				</CodeEditorChrome>
			</motion.div>

			{/* SVG connecting lines */}
			{showGrid && (
				<svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
					{infraCards.map((card, i) => {
						const col = i % 3;
						const row = Math.floor(i / 3);
						const cx = 50;
						const cy = 38;
						const ex = 17 + col * 33;
						const ey = 60 + row * 25;
						return (
							<motion.line
								key={i}
								x1={`${cx}%`} y1={`${cy}%`}
								x2={`${ex}%`} y2={`${ey}%`}
								stroke="currentColor"
								className="text-gray-700"
								strokeWidth="1"
								strokeDasharray="4 4"
								initial={{ opacity: 0 }}
								animate={{ opacity: 0.5 }}
								transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
							/>
						);
					})}
				</svg>
			)}

			{/* Infrastructure grid */}
			{showGrid && (
				<div className="absolute bottom-4 left-0 right-0 grid grid-cols-3 gap-3 px-8" style={{ zIndex: 1 }}>
					{infraCards.map((card, i) => {
						const colors = cardColorMap[card.color];
						return (
							<motion.div
								key={card.label}
								className={`rounded-xl border ${colors.border} ${colors.bg} backdrop-blur-sm px-3 py-3 flex items-center gap-2.5 shadow-lg ${colors.glow}`}
								initial={{ opacity: 0, y: 20, scale: 0.9 }}
								animate={{ opacity: 1, y: 0, scale: 1 }}
								transition={{ duration: 0.4, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
							>
								<div className={`w-8 h-8 rounded-lg ${colors.bg} flex items-center justify-center flex-shrink-0`}>
									<card.icon className={`w-4 h-4 ${colors.icon}`} />
								</div>
								<div>
									<span className="text-xs font-semibold text-white block">{card.label}</span>
									<span className="text-[10px] text-gray-400 block">{card.detail}</span>
								</div>
							</motion.div>
						);
					})}
				</div>
			)}
		</div>
	);
}


// ══════════════════════════════════════════════════════
// CONCEPT 2: Radial/orbit layout
// ══════════════════════════════════════════════════════

function Concept2() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.3 });
	const { typedChars, isDone } = useTypingAnimation(isInView);
	const [showOrbit, setShowOrbit] = useState(false);

	useEffect(() => {
		if (isDone) setTimeout(() => setShowOrbit(true), 300);
	}, [isDone]);

	// Pixel offsets from center — spread wide so nothing overlaps
	const orbitPositions = [
		{ x: -200, y: -120 },  // top-left
		{ x: 0, y: -160 },     // top-center
		{ x: 200, y: -120 },   // top-right
		{ x: -230, y: 0 },     // mid-left
		{ x: 230, y: 0 },      // mid-right
		{ x: -120, y: 140 },   // bottom-left
		{ x: 120, y: 140 },    // bottom-right
	];

	return (
		<div ref={ref} className="relative w-full flex items-center justify-center" style={{ height: 560 }}>
			{/* Code editor — shrinks to center */}
			<motion.div
				className="relative z-10 w-full max-w-sm"
				animate={showOrbit
					? { scale: 0.48 }
					: { scale: 1 }
				}
				transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
			>
				<CodeEditorChrome>
					{renderTypedLines(typedChars)}
				</CodeEditorChrome>
			</motion.div>

			{/* Connecting lines from editor center to each card */}
			{showOrbit && (
				<svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
					{orbitPositions.map((pos, i) => (
						<motion.line
							key={i}
							x1="50%" y1="50%"
							x2={`calc(50% + ${pos.x}px)`} y2={`calc(50% + ${pos.y}px)`}
							stroke="currentColor"
							className="text-gray-700"
							strokeWidth="1"
							strokeDasharray="4 3"
							initial={{ opacity: 0 }}
							animate={{ opacity: 0.35 }}
							transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
						/>
					))}
				</svg>
			)}

			{/* Cards */}
			{showOrbit && infraCards.map((card, i) => {
				const pos = orbitPositions[i];
				return (
					<motion.div
						key={card.label}
						className="absolute z-20 rounded-lg border border-blue-500/30 bg-gray-900/90 backdrop-blur-sm px-3 py-2.5 flex items-center gap-2.5 w-[180px]"
						style={{
							left: '50%',
							top: '50%',
						}}
						initial={{ opacity: 0, scale: 0.8, x: 0, y: 0 }}
						animate={{
							opacity: 1,
							scale: 1,
							x: pos.x - 90,
							y: pos.y - 18,
						}}
						transition={{
							duration: 0.5,
							delay: 0.1 + i * 0.08,
							ease: [0.22, 1, 0.36, 1],
						}}
					>
						<div className="w-7 h-7 rounded-md bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
							<card.icon className="w-3.5 h-3.5 text-blue-400" />
						</div>
						<span className="text-xs font-medium text-gray-200 whitespace-nowrap leading-tight">{card.label}</span>
					</motion.div>
				);
			})}
		</div>
	);
}


// ══════════════════════════════════════════════════════
// CONCEPT 3: Stacked layers beneath
// ══════════════════════════════════════════════════════

function Concept3() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.3 });
	const { typedChars, isDone } = useTypingAnimation(isInView);
	const [showLayers, setShowLayers] = useState(false);

	useEffect(() => {
		if (isDone) setTimeout(() => setShowLayers(true), 300);
	}, [isDone]);

	const layers = [
		{ icon: Braces, label: 'Auto-generated UI', detail: 'Form with db picker, query input, limit slider', color: 'blue' },
		{ icon: Globe, label: 'API endpoint', detail: 'POST /api/w/.../query_db', color: 'green' },
		{ icon: CalendarClock, label: 'Triggers', detail: 'Cron, webhooks, emails, Kafka...', color: 'amber' },
		{ icon: Rocket, label: 'Deploy', detail: 'One-click deployment', color: 'orange' },
		{ icon: GitBranch, label: 'Versioning', detail: 'Hash: a3f8c2e', color: 'purple' },
		{ icon: Server, label: 'Dedicated workers', detail: 'Isolated compute', color: 'cyan' },
		{ icon: Activity, label: 'Monitoring', detail: 'Logs & metrics', color: 'rose' },
	];

	return (
		<div ref={ref} className="relative w-full max-w-md mx-auto" style={{ minHeight: 500 }}>
			{/* Code editor — lifts up */}
			<motion.div
				className="relative z-20"
				animate={showLayers
					? { y: 0 }
					: { y: 40 }
				}
				initial={{ y: 40 }}
				transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
				style={showLayers ? { boxShadow: '0 20px 60px -15px rgba(0, 0, 0, 0.5)' } : {}}
			>
				<CodeEditorChrome>
					{renderTypedLines(typedChars)}
				</CodeEditorChrome>
			</motion.div>

			{/* Stacked layers sliding out below */}
			{showLayers && layers.map((layer, i) => {
				const colors = cardColorMap[layer.color];
				return (
					<motion.div
						key={layer.label}
						className={`relative rounded-xl border ${colors.border} ${colors.bg} backdrop-blur-sm px-4 py-3 flex items-center gap-3`}
						style={{
							zIndex: 19 - i,
							marginTop: i === 0 ? 0 : -4,
							marginLeft: (i + 1) * 8,
							marginRight: (i + 1) * 8,
						}}
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							duration: 0.4,
							delay: i * 0.12,
							ease: [0.22, 1, 0.36, 1],
						}}
					>
						<div className={`w-8 h-8 rounded-lg ${colors.bg} flex items-center justify-center flex-shrink-0 border ${colors.border}`}>
							<layer.icon className={`w-4 h-4 ${colors.icon}`} />
						</div>
						<div className="flex-1 min-w-0">
							<span className="text-xs font-semibold text-white block">{layer.label}</span>
							<span className="text-[10px] text-gray-400 block truncate">{layer.detail}</span>
						</div>
					</motion.div>
				);
			})}
		</div>
	);
}


// ══════════════════════════════════════════════════════
// CONCEPT 4: Cards stacked on the right
// ══════════════════════════════════════════════════════

function Concept4() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.3 });
	const { typedChars, isDone } = useTypingAnimation(isInView);
	const [showCards, setShowCards] = useState(false);

	useEffect(() => {
		if (isDone) setTimeout(() => setShowCards(true), 300);
	}, [isDone]);

	return (
		<div ref={ref}>
			<div className="rounded-xl border border-gray-700 bg-gray-950 overflow-hidden">
				{/* Title bar */}
				<div className="flex items-center gap-2 px-3 py-2 border-b border-gray-800 bg-gray-900">
					<motion.img
						src="/img/windmill.svg"
						alt="Windmill"
						className="w-4 h-4"
						animate={{ rotate: 360 }}
						transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
					/>
					<span className="text-[10px] font-medium text-gray-400">query_db.ts</span>
				</div>
				{/* Content area: code left, cards right */}
				<div className="flex" style={{ minHeight: 340 }}>
					{/* Code */}
					<div className={`flex-1 p-4 font-mono text-[13px] leading-relaxed ${showCards ? 'border-r border-gray-800' : ''}`}>
						{renderTypedLines(typedChars)}
					</div>
					{/* Cards panel */}
					<motion.div
						className="flex-shrink-0 flex flex-col gap-1.5 p-2.5 bg-gray-900/50 justify-center"
						initial={{ width: 0, opacity: 0 }}
						animate={showCards ? { width: 180, opacity: 1 } : { width: 0, opacity: 0 }}
						transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
						style={{ overflow: 'hidden' }}
					>
						{showCards && infraCards.map((card, i) => (
							<motion.div
								key={card.label}
								className="rounded-md border border-blue-500/25 bg-gray-900/80 px-2.5 py-2 flex items-center gap-2"
								initial={{ opacity: 0, x: 20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{
									duration: 0.35,
									delay: i * 0.07,
									ease: [0.22, 1, 0.36, 1],
								}}
							>
								<div className="w-5 h-5 rounded bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
									<card.icon className="w-2.5 h-2.5 text-blue-400" />
								</div>
								<span className="text-[10px] font-medium text-gray-300 whitespace-nowrap leading-tight">{card.label}</span>
							</motion.div>
						))}
					</motion.div>
				</div>
			</div>
		</div>
	);
}


// ══════════════════════════════════════════════════════
// Preview page
// ══════════════════════════════════════════════════════

const fadeIn = {
	initial: { opacity: 0, y: 30 },
	whileInView: { opacity: 1, y: 0 },
	viewport: { once: true },
	transition: { duration: 0.5 }
};

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
								Hero animation concepts
							</h1>
							<p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
								Three animation concepts for the Script Editor product page hero. Each shows code being typed, then transitions to reveal infrastructure.
							</p>
						</motion.div>

						{/* Concept 1 */}
						<div className="mb-32">
							<motion.div {...fadeIn} className="mb-8">
								<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Concept 1: Zoom-out to infrastructure grid</h2>
								<p className="text-gray-600 dark:text-gray-300">Code types out, then the editor shrinks and a grid of infrastructure cards fans out beneath it with connecting lines.</p>
							</motion.div>
							<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
								<motion.div {...fadeIn}>
									<p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2 tracking-wide uppercase">Script editor</p>
									<h1 className="!text-4xl sm:!text-5xl !font-semibold !tracking-tight text-gray-900 dark:text-white mb-6">
										Code editor with built-in infrastructure
									</h1>
									<p className="text-xl text-gray-600 dark:text-gray-100 mb-8">
										Every function you write gets a parameters UI, an API endpoint, triggers, one-click deployment, and monitoring out of the box.
									</p>
									<HeroCTAButtons />
								</motion.div>
								<div className="hidden lg:block">
									<Concept1 />
								</div>
							</div>
						</div>

						{/* Concept 2 */}
						<div className="mb-32">
							<motion.div {...fadeIn} className="mb-8">
								<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Concept 2: Radial orbit</h2>
								<p className="text-gray-600 dark:text-gray-300">Code types out, editor shrinks, and infrastructure cards radiate outward in an elliptical orbit pattern with a dashed ring.</p>
							</motion.div>
							<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
								<motion.div {...fadeIn}>
									<p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2 tracking-wide uppercase">Script editor</p>
									<h1 className="!text-4xl sm:!text-5xl !font-semibold !tracking-tight text-gray-900 dark:text-white mb-6">
										Code editor with built-in infrastructure
									</h1>
									<p className="text-xl text-gray-600 dark:text-gray-100 mb-8">
										Every function you write gets a parameters UI, an API endpoint, triggers, one-click deployment, and monitoring out of the box.
									</p>
									<HeroCTAButtons />
								</motion.div>
								<div className="hidden lg:block">
									<Concept2 />
								</div>
							</div>
						</div>

						{/* Concept 3 */}
						<div className="mb-32">
							<motion.div {...fadeIn} className="mb-8">
								<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Concept 3: Stacked layers beneath</h2>
								<p className="text-gray-600 dark:text-gray-300">Code types out, then infrastructure layers slide out underneath the editor like stacked cards, each slightly indented.</p>
							</motion.div>
							<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
								<motion.div {...fadeIn}>
									<p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2 tracking-wide uppercase">Script editor</p>
									<h1 className="!text-4xl sm:!text-5xl !font-semibold !tracking-tight text-gray-900 dark:text-white mb-6">
										Code editor with built-in infrastructure
									</h1>
									<p className="text-xl text-gray-600 dark:text-gray-100 mb-8">
										Every function you write gets a parameters UI, an API endpoint, triggers, one-click deployment, and monitoring out of the box.
									</p>
									<HeroCTAButtons />
								</motion.div>
								<div className="hidden lg:block">
									<Concept3 />
								</div>
							</div>
						</div>

						{/* Concept 4 */}
						<div className="mb-32">
							<motion.div {...fadeIn} className="mb-8">
								<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Concept 4: Cards stacked on the right</h2>
								<p className="text-gray-600 dark:text-gray-300">Code types out, then the editor shrinks slightly and cards slide in from the right as a vertical list.</p>
							</motion.div>
							<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
								<motion.div {...fadeIn}>
									<p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2 tracking-wide uppercase">Script editor</p>
									<h1 className="!text-4xl sm:!text-5xl !font-semibold !tracking-tight text-gray-900 dark:text-white mb-6">
										Code editor with built-in infrastructure
									</h1>
									<p className="text-xl text-gray-600 dark:text-gray-100 mb-8">
										Every function you write gets a parameters UI, an API endpoint, triggers, one-click deployment, and monitoring out of the box.
									</p>
									<HeroCTAButtons />
								</motion.div>
								<div className="hidden lg:block">
									<Concept4 />
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
