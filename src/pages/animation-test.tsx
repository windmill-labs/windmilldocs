import React, { useState, useEffect, useCallback, useRef } from 'react';
import Layout from '@theme/Layout';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { motion, AnimatePresence } from 'framer-motion';
import { GitBranch, LayoutDashboard, Globe, Bot, SlidersHorizontal, Workflow, Clock, Webhook, Mail, Database, Radio, MessageSquare, Cloud, Rss, Plug, Zap } from 'lucide-react';

// ─── Use case data ───────────────────────────────────────────────────────────

const USE_CASES = [
	{ id: 'autoui', icon: SlidersHorizontal, label: 'Parameters UI', duration: 4500 },
	{ id: 'dag', icon: Workflow, label: 'Workflow engine', duration: 3500 },
	{ id: 'app', icon: LayoutDashboard, label: 'Internal app', duration: 3500 },
	{ id: 'agent', icon: Bot, label: 'AI agent', duration: 3500 },
	{ id: 'endpoint', icon: Zap, label: 'Triggers', duration: 2200 },
];

// ─── Shared DAG node component (light theme, matching workflow-automation) ───

const NODE_W = 160;
const NODE_H = 34;

// Inline logo components
function TsLogo() {
	return (
		<svg viewBox="0 0 256 256" className="w-4 h-4 flex-shrink-0">
			<rect width="256" height="256" rx="20" fill="#3178C6" />
			<path d="M150.518 200.475v27.62c4.492 2.302 9.805 4.028 15.938 5.179 6.133 1.151 12.597 1.726 19.393 1.726 6.622 0 12.914-.633 18.874-1.899 5.96-1.266 11.187-3.352 15.678-6.257 4.492-2.906 8.048-6.717 10.669-11.434 2.621-4.718 3.932-10.58 3.932-17.588 0-5.063-.882-9.493-2.647-13.29-1.766-3.796-4.175-7.19-7.229-10.18-3.054-2.99-6.622-5.694-10.707-8.113a165.4 165.4 0 0 0-13.207-7.16c-3.686-1.841-7.085-3.624-10.196-5.35-3.112-1.726-5.81-3.452-8.096-5.178-2.285-1.726-4.07-3.567-5.357-5.523-1.287-1.955-1.93-4.143-1.93-6.565 0-2.191.556-4.172 1.669-5.944 1.112-1.783 2.66-3.32 4.643-4.623 1.984-1.303 4.35-2.306 7.1-3.011 2.748-.704 5.752-1.056 9.01-1.056 2.401 0 4.905.187 7.514.561a60.5 60.5 0 0 1 7.921 1.726 51 51 0 0 1 7.661 2.905c2.459 1.151 4.718 2.507 6.778 4.069V109.25c-4.145-1.726-8.748-3.011-13.811-3.855-5.063-.843-10.94-1.265-17.632-1.265-6.535 0-12.74.705-18.614 2.114-5.874 1.41-11.04 3.624-15.496 6.645-4.457 3.02-7.978 6.89-10.563 11.607-2.585 4.718-3.877 10.349-3.877 16.894 0 8.344 2.488 15.504 7.463 21.481 4.976 5.977 12.371 10.953 22.186 14.928 3.86 1.553 7.463 3.107 10.81 4.661 3.345 1.554 6.245 3.195 8.697 4.921 2.452 1.726 4.378 3.624 5.78 5.694 1.4 2.07 2.1 4.431 2.1 7.085 0 2.016-.498 3.855-1.494 5.523-.997 1.668-2.436 3.107-4.319 4.316-1.882 1.21-4.175 2.133-6.878 2.77-2.703.636-5.752.954-9.147.954-5.98 0-11.842-1.063-17.585-3.188-5.744-2.124-10.882-5.34-15.414-9.646m-46.116-67.137h30.461v-25.27H65.063v25.27h30.318v86.572h24.066z" fill="#FFF" />
		</svg>
	);
}

function PyLogo() {
	return (
		<svg viewBox="0 0 256 255" className="w-4 h-4 flex-shrink-0">
			<defs>
				<linearGradient id="pyA" x1="12.96%" y1="12.07%" x2="79.68%" y2="78.21%">
					<stop offset="0%" stopColor="#387EB8" />
					<stop offset="100%" stopColor="#366994" />
				</linearGradient>
				<linearGradient id="pyB" x1="19.13%" y1="20.58%" x2="90.43%" y2="88.01%">
					<stop offset="0%" stopColor="#FFE052" />
					<stop offset="100%" stopColor="#FFC331" />
				</linearGradient>
			</defs>
			<path d="M126.916.072c-64.832 0-60.784 28.115-60.784 28.115l.072 29.128h61.868v8.745H41.631S.145 61.355.145 126.77c0 65.417 36.21 63.097 36.21 63.097h21.61v-30.356s-1.165-36.21 35.632-36.21h61.362s34.475.557 34.475-33.319V33.97S194.67.072 126.916.072ZM92.802 19.66a11.12 11.12 0 1 1 0 22.24 11.12 11.12 0 0 1 0-22.24Z" fill="url(#pyA)" />
			<path d="M128.757 254.126c64.832 0 60.784-28.115 60.784-28.115l-.072-29.127H127.6v-8.745h86.441s41.486 4.705 41.486-60.712c0-65.416-36.21-63.096-36.21-63.096h-21.61v30.355s1.165 36.21-35.632 36.21h-61.362s-34.475-.557-34.475 33.32v56.013s-5.235 33.897 62.518 33.897Zm34.114-19.586a11.12 11.12 0 1 1 0-22.24 11.12 11.12 0 0 1 0 22.24Z" fill="url(#pyB)" />
		</svg>
	);
}

function DuckDbLogo() {
	return (
		<img src="/third_party_logos/duckdb.svg" alt="DuckDB" className="w-4 h-4 flex-shrink-0" />
	);
}

function DuckLakeLogo() {
	return (
		<img src="/third_party_logos/ducklake.svg" alt="DuckLake" className="w-4 h-4 flex-shrink-0" />
	);
}

type DagNodeType = { label: string; x: number; y: number; isTs?: boolean; isPy?: boolean; isDuckDb?: boolean; isDuckLake?: boolean; isTrigger?: boolean; iconOnly?: boolean; isHighlighted?: boolean };

function DagNode({ node }: { node: DagNodeType }) {
	const bg = node.isHighlighted ? 'bg-blue-50' : node.isTrigger ? 'bg-blue-50' : 'bg-white';
	const border = node.isHighlighted ? 'border-blue-400' : node.isTrigger ? 'border-blue-200' : 'border-gray-200';
	const shadow = node.isHighlighted ? '0 0 12px rgba(59,130,246,0.35), 0 1px 2px rgba(0,0,0,0.05)' : undefined;

	if (node.iconOnly) {
		return (
			<div className="absolute" style={{ left: node.x, top: node.y, transform: 'translate(-50%, -50%)' }}>
				<div className={`flex items-center justify-center rounded-xl border ${border} ${bg} shadow-sm`} style={{ width: NODE_H, height: NODE_H, boxShadow: shadow }}>
					{node.isTs && <TsLogo />}
					{node.isPy && <PyLogo />}
					{node.isDuckDb && <DuckDbLogo />}
					{node.isDuckLake && <DuckLakeLogo />}
				</div>
			</div>
		);
	}

	return (
		<div className="absolute" style={{ left: node.x, top: node.y, transform: 'translate(-50%, -50%)' }}>
			<div className={`flex items-center justify-center gap-2 rounded-xl border ${border} ${bg} shadow-sm`} style={{ width: NODE_W, height: NODE_H, boxShadow: shadow }}>
				{node.isTs && <TsLogo />}
				{node.isPy && <PyLogo />}
				{node.isDuckDb && <DuckDbLogo />}
				{node.isDuckLake && <DuckLakeLogo />}
				{node.isTrigger && (
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-blue-500 flex-shrink-0">
						<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
					</svg>
				)}
				<span className={`text-[11px] font-medium whitespace-nowrap ${node.isHighlighted ? 'text-blue-700' : 'text-gray-700'}`}>{node.label}</span>
			</div>
		</div>
	);
}

// ─── Mini Workflow animation (linear, no branch) ────────────────────────────

const WORKFLOW_NODES = [
	{ label: 'Trigger', x: 200, y: 35, isTrigger: true },
	{ label: 'Fetch data', x: 200, y: 105, isTs: true },
	{ label: 'get_failed_payment.ts', x: 200, y: 175, isTs: true, isHighlighted: true },
	{ label: 'Send notification', x: 200, y: 245, isTs: true },
	{ label: 'Result', x: 200, y: 315 },
];

const WORKFLOW_PATH = `M200,49 L200,91 L200,119 L200,161 L200,189 L200,231 L200,259 L200,301`;

function MiniWorkflow() {
	return (
		<div className="relative w-[400px] h-[340px] mx-auto">
			<svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
				{/* Edges */}
				{[[35, 105], [105, 175], [175, 245], [245, 315]].map(([sy, dy], i) => (
					<line key={`wl-${i}`} x1={200} y1={sy + NODE_H / 2} x2={200} y2={dy - NODE_H / 2} className="stroke-gray-300" strokeWidth={1.5} />
				))}
				{/* Single ball */}
				<path id="workflow-route" d={WORKFLOW_PATH} fill="none" stroke="none" />
				<circle r={5} className="fill-blue-400" opacity={0} style={{ filter: 'drop-shadow(0 0 6px rgba(96,165,250,0.8))' }}>
					<animateMotion dur="4s" repeatCount="indefinite">
						<mpath href="#workflow-route" />
					</animateMotion>
					<animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.05;0.85;1" dur="4s" repeatCount="indefinite" />
				</circle>
			</svg>
			{WORKFLOW_NODES.map((node, i) => <DagNode key={i} node={node} />)}
		</div>
	);
}

// ─── Mini DAG animation (with 4 branches) ───────────────────────────────────

const CX = 240;
const B1 = 120, B2 = 190, B3 = 290, B4 = 360;
const BY = 225;

const DAG_NODES: DagNodeType[] = [
	{ label: 'Trigger', x: CX, y: 30, isTrigger: true },
	{ label: 'Extract', x: CX, y: 90 },
	{ label: 'get_failed_payment.ts', x: CX, y: 150, isTs: true, isHighlighted: true },
	{ label: '', x: B1, y: BY, isPy: true, iconOnly: true },
	{ label: '', x: B2, y: BY, isPy: true, iconOnly: true },
	{ label: '', x: B3, y: BY, isDuckDb: true, iconOnly: true },
	{ label: '', x: B4, y: BY, isDuckLake: true, iconOnly: true },
	{ label: 'Load', x: CX, y: 305 },
];

// Use Framer Motion for reliable multi-ball animation
function DagBall({ pathId, dur, delay, cycleDur }: { pathId: string; dur: number; delay: number; cycleDur: number }) {
	const [offset, setOffset] = useState(0);
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		let frame: number;
		const start = performance.now();
		const animate = (now: number) => {
			const elapsed = ((now - start) / 1000) % cycleDur;
			const t = elapsed - delay;
			if (t >= 0 && t <= dur) {
				setOffset(t / dur);
				setVisible(true);
			} else {
				setVisible(false);
			}
			frame = requestAnimationFrame(animate);
		};
		frame = requestAnimationFrame(animate);
		return () => cancelAnimationFrame(frame);
	}, [dur, delay, cycleDur]);

	const pathEl = typeof document !== 'undefined' ? document.getElementById(pathId) as SVGPathElement | null : null;
	if (!pathEl || !visible) return null;
	const totalLen = pathEl.getTotalLength();
	const pt = pathEl.getPointAtLength(offset * totalLen);

	return (
		<circle cx={pt.x} cy={pt.y} r={5} className="fill-blue-400" style={{ filter: 'drop-shadow(0 0 6px rgba(96,165,250,0.8))' }} />
	);
}

const CYCLE_DUR = 5.5;
const TOP_DUR = 2;
const BRANCH_DUR = 2.5;
const BRANCH_DELAY = TOP_DUR + 0.2;

function MiniDag() {
	const branches = [B1, B2, B3, B4];
	// Force re-render after mount so path elements exist in DOM
	const [mounted, setMounted] = useState(false);
	useEffect(() => { setMounted(true); }, []);

	return (
		<div className="relative w-[480px] h-[340px] mx-auto">
			<svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
				{/* Straight edges */}
				<line x1={CX} y1={30 + NODE_H / 2} x2={CX} y2={90 - NODE_H / 2} className="stroke-gray-300" strokeWidth={1.5} />
				<line x1={CX} y1={90 + NODE_H / 2} x2={CX} y2={150 - NODE_H / 2} className="stroke-gray-300" strokeWidth={1.5} />
				{/* Branch curves */}
				{branches.map((bx, i) => (
					<React.Fragment key={`br-${i}`}>
						<path d={`M${CX},${150 + NODE_H / 2} C${CX},${187} ${bx},${187} ${bx},${BY - NODE_H / 2}`} className="stroke-gray-300" strokeWidth={1.5} fill="none" />
						<path d={`M${bx},${BY + NODE_H / 2} C${bx},${265} ${CX},${265} ${CX},${305 - NODE_H / 2}`} className="stroke-gray-300" strokeWidth={1.5} fill="none" />
					</React.Fragment>
				))}

				{/* Hidden paths for ball motion */}
				<path id="dag-top-path" d={`M${CX},${30 + NODE_H / 2} L${CX},${90 - NODE_H / 2} L${CX},${90 + NODE_H / 2} L${CX},${150 - NODE_H / 2}`} fill="none" stroke="none" />
				{branches.map((bx, i) => (
					<path key={`bp-${i}`} id={`dag-br-path-${i}`} d={`M${CX},${150 + NODE_H / 2} C${CX},${187} ${bx},${187} ${bx},${BY - NODE_H / 2} L${bx},${BY + NODE_H / 2} C${bx},${265} ${CX},${265} ${CX},${305 - NODE_H / 2}`} fill="none" stroke="none" />
				))}

				{/* Animated balls */}
				{mounted && (
					<>
						<DagBall pathId="dag-top-path" dur={TOP_DUR} delay={0} cycleDur={CYCLE_DUR} />
						<DagBall pathId="dag-br-path-0" dur={BRANCH_DUR} delay={BRANCH_DELAY} cycleDur={CYCLE_DUR} />
						<DagBall pathId="dag-br-path-1" dur={BRANCH_DUR} delay={BRANCH_DELAY} cycleDur={CYCLE_DUR} />
						<DagBall pathId="dag-br-path-2" dur={BRANCH_DUR} delay={BRANCH_DELAY} cycleDur={CYCLE_DUR} />
						<DagBall pathId="dag-br-path-3" dur={BRANCH_DUR} delay={BRANCH_DELAY} cycleDur={CYCLE_DUR} />
					</>
				)}
			</svg>
			{DAG_NODES.map((node, i) => <DagNode key={i} node={node} />)}
		</div>
	);
}

// ─── Mini internal app (Lottie dashboard) ───────────────────────────────────

// Small plug-in badge showing a script is connected to a widget
function PlugBadge({ label, isGlowing }: { label: string; isGlowing: boolean }) {
	return (
		<motion.div
			className="flex items-center gap-1 rounded-md border px-1.5 py-0.5"
			animate={isGlowing
				? { borderColor: 'rgba(59,130,246,0.7)', backgroundColor: 'rgba(59,130,246,0.08)' }
				: { borderColor: 'rgba(209,213,219,0.5)', backgroundColor: 'transparent' }
			}
			transition={{ duration: 0.3 }}
		>
			<motion.div
				className="w-1.5 h-1.5 rounded-full"
				animate={isGlowing
					? { backgroundColor: 'rgb(96,165,250)', boxShadow: '0 0 4px rgba(96,165,250,0.8)' }
					: { backgroundColor: 'rgb(156,163,175)', boxShadow: '0 0 0px rgba(96,165,250,0)' }
				}
				transition={{ duration: 0.3 }}
			/>
			<span className="text-[8px] font-mono text-gray-400">{label}</span>
		</motion.div>
	);
}

function MiniApp() {
	const PULSE_INTERVAL = 1500;
	const [pulseIndex, setPulseIndex] = useState(0);
	const [isGlowing, setIsGlowing] = useState(false);

	useEffect(() => {
		const interval = setInterval(() => {
			setIsGlowing(true);
			setPulseIndex((prev) => prev + 1);
			setTimeout(() => setIsGlowing(false), 600);
		}, PULSE_INTERVAL);
		return () => clearInterval(interval);
	}, []);

	const stats = [
		{ label: 'Revenue', values: ['$12,340', '$12,580', '$12,920', '$13,100'], color: 'blue' },
		{ label: 'Users', values: ['1,205', '1,208', '1,215', '1,221'], color: 'green' },
		{ label: 'Active', values: ['847', '852', '861', '858'], color: 'amber' },
	];

	const barSets = [
		[18, 30, 22, 38, 28, 42, 35],
		[22, 28, 30, 35, 32, 38, 40],
		[20, 34, 25, 40, 30, 45, 32],
		[24, 26, 32, 36, 34, 40, 38],
	];
	const bars = barSets[pulseIndex % barSets.length];

	return (
		<div className="w-full max-w-[540px] mx-auto flex flex-col items-center px-4">
			{/* Frontend app mockup */}
			<div className="w-full rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
				{/* App title bar */}
				<div className="flex items-center px-3 py-1.5 bg-gray-50 border-b border-gray-200 gap-2">
					<div className="flex gap-1.5">
						<div className="w-2 h-2 rounded-full bg-red-400/60" />
						<div className="w-2 h-2 rounded-full bg-yellow-400/60" />
						<div className="w-2 h-2 rounded-full bg-green-400/60" />
					</div>
					<span className="text-[10px] text-gray-400 font-mono ml-1">Internal tool</span>
					<div className="flex items-center gap-1 ml-auto">
						{/* React (selected) */}
						<div className="flex items-center gap-1 rounded bg-blue-50 border border-blue-200 px-1.5 py-0.5">
							<svg viewBox="-11.5 -10.232 23 20.463" className="w-3 h-3">
								<circle r="2.05" fill="#61DAFB" />
								<g stroke="#61DAFB" strokeWidth="1" fill="none">
									<ellipse rx="11" ry="4.2" />
									<ellipse rx="11" ry="4.2" transform="rotate(60)" />
									<ellipse rx="11" ry="4.2" transform="rotate(120)" />
								</g>
							</svg>
							<span className="text-[8px] text-blue-600 font-medium">React</span>
						</div>
						{/* Svelte */}
						<div className="flex items-center gap-1 rounded bg-white border border-gray-200 px-1.5 py-0.5 opacity-50">
							<svg viewBox="0 0 98.1 118" className="w-3 h-3">
								<path d="M91.8 15.6C80.9-.5 59.2-4.7 43.6 5.2L16.1 22.8C8.6 27.5 3.4 35.2 1.9 43.9c-1.3 7.3-.2 14.8 3.3 21.3-2.4 3.6-4 7.6-4.7 11.8-1.6 8.9.5 18.1 5.7 25.4 11 16.1 32.7 20.3 48.2 10.4l27.5-17.6c7.5-4.7 12.7-12.4 14.2-21.1 1.3-7.3.2-14.8-3.3-21.3 2.4-3.6 4-7.6 4.7-11.8 1.7-9-.4-18.2-5.7-25.4" fill="#FF3E00" />
								<path d="M40.9 103.9a27.7 27.7 0 0 1-16.2-2.4A21.7 21.7 0 0 1 15 88.3c-1.4-5.2-.6-10.9 2.1-15.5l.6-1 .5-.9.8.6a38.3 38.3 0 0 0 11.6 6.1l1.1.4-.1 1a6.7 6.7 0 0 0 .8 3.8c.9 1.5 2.5 2.5 4.2 2.9a7.4 7.4 0 0 0 4.5-.5l27.5-17.6a6.2 6.2 0 0 0 2.8-3.9c.3-1.7-.2-3.5-1.4-4.8-.9-1.5-2.5-2.5-4.2-2.9a7.4 7.4 0 0 0-4.5.5l-10.5 6.7a22.9 22.9 0 0 1-14 1.6A21.7 21.7 0 0 1 26 52.3a20.7 20.7 0 0 1-2.2-14.8 19.5 19.5 0 0 1 8.5-12.2l27.5-17.6a22.9 22.9 0 0 1 14-1.6A21.7 21.7 0 0 1 83.5 19.3c1.4 5.2.6 10.9-2.1 15.5l-.6 1-.5.9-.8-.6a38.3 38.3 0 0 0-11.6-6.1l-1.1-.4.1-1a6.7 6.7 0 0 0-.8-3.8c-.9-1.5-2.5-2.5-4.2-2.9a7.4 7.4 0 0 0-4.5.5L30 40.1a6.2 6.2 0 0 0-2.8 3.9c-.3 1.7.2 3.5 1.4 4.8.9 1.5 2.5 2.5 4.2 2.9a7.4 7.4 0 0 0 4.5-.5l10.5-6.7a22.9 22.9 0 0 1 14-1.6 21.7 21.7 0 0 1 9.7 13.2 20.7 20.7 0 0 1 2.2 14.8 19.5 19.5 0 0 1-8.5 12.2l-27.5 17.6a22.3 22.3 0 0 1-6.8 3.2" fill="#FFF" />
							</svg>
						</div>
					</div>
				</div>
				<div className="p-2.5 space-y-2">
					{/* Stat cards */}
					<div className="grid grid-cols-3 gap-1.5">
						{stats.map((stat) => (
							<div key={stat.label} className={`rounded-lg bg-${stat.color}-50 border border-${stat.color}-100 px-2 py-1.5`}>
								<div className="flex items-center justify-between mb-0.5">
									<div className="text-[8px] text-gray-400">{stat.label}</div>
	
								</div>
								<motion.div
									key={`${stat.label}-${pulseIndex}`}
									className="text-[11px] font-semibold text-gray-700"
									initial={{ opacity: 0.5 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 0.3 }}
								>
									{stat.values[pulseIndex % stat.values.length]}
								</motion.div>
							</div>
						))}
					</div>
					{/* Chart + Table side by side */}
					<div className="grid grid-cols-2 gap-1.5">
						{/* Mini bar chart */}
						<div className="rounded-lg border border-gray-100 p-2">
							<div className="flex items-center justify-between mb-1.5">
								<div className="text-[8px] text-gray-400">Monthly activity</div>

							</div>
							<svg viewBox="0 0 120 50" className="w-full h-[44px]">
								{bars.map((h, i) => (
									<motion.rect
										key={i}
										x={4 + i * 17}
										width={10}
										rx={2}
										animate={{ y: 50 - h, height: h }}
										transition={{ duration: 0.4, ease: 'easeOut' }}
										className={i === 5 ? 'fill-blue-400' : 'fill-blue-200'}
									/>
								))}
							</svg>
						</div>
						{/* Mini table */}
						<div className="rounded-lg border border-gray-100 p-2">
							<div className="flex items-center justify-between mb-1">
								<div className="text-[8px] text-gray-400">Table</div>

							</div>
							{[
								['Alice', ['$420', '$435', '$450', '$448']],
								['Bob', ['$310', '$310', '$325', '$330']],
								['Carol', ['$580', '$595', '$600', '$610']],
							].map(([name, amts], i) => (
								<div key={i} className={`grid grid-cols-3 text-[9px] py-0.5 ${i > 0 ? 'border-t border-gray-100' : ''}`}>
									<span className="text-gray-600">{name as string}</span>
									<motion.span
										key={`${name}-${pulseIndex}`}
										className="text-gray-500 text-center"
										initial={{ opacity: 0.5 }}
										animate={{ opacity: 1 }}
										transition={{ duration: 0.3 }}
									>
										{(amts as string[])[pulseIndex % (amts as string[]).length]}
									</motion.span>
									<span className={`text-right ${i !== 1 ? 'text-green-500' : 'text-amber-500'}`}>{i !== 1 ? 'Active' : 'Pending'}</span>
								</div>
							))}
						</div>
					</div>
					{/* Mini line chart */}
					<div className="rounded-lg border border-gray-100 p-2">
						<div className="flex items-center justify-between mb-1">
							<div className="text-[8px] text-gray-400">Trend</div>
							<PlugBadge label="get_failed_payment" isGlowing={isGlowing} />
						</div>
						<svg viewBox="0 0 200 36" className="w-full h-[32px]">
							<polyline points="0,30 20,26 40,28 60,20 80,22 100,14 120,16 140,10 160,12 180,6 200,8" fill="none" className="stroke-blue-300" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
							<polyline points="0,30 20,26 40,28 60,20 80,22 100,14 120,16 140,10 160,12 180,6 200,8" fill="url(#lineGrad)" stroke="none" />
							<defs>
								<linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
									<stop offset="0%" stopColor="rgb(147,197,253)" stopOpacity="0.3" />
									<stop offset="100%" stopColor="rgb(147,197,253)" stopOpacity="0" />
								</linearGradient>
							</defs>
						</svg>
					</div>
				</div>
			</div>

		</div>
	);
}

// ─── Mini endpoint ──────────────────────────────────────────────────────────

const TRIGGERS = [
	{ icon: Clock, label: 'Schedule' },
	{ icon: Webhook, label: 'Webhook' },
	{ icon: Mail, label: 'Email' },
	{ icon: Database, label: 'Postgres' },
	{ icon: Globe, label: 'HTTP routes' },
	{ icon: Radio, label: 'WebSocket' },
	{ icon: MessageSquare, label: 'Kafka' },
	{ icon: Rss, label: 'NATS' },
	{ icon: Cloud, label: 'SQS' },
	{ icon: Radio, label: 'MQTT' },
	{ icon: Cloud, label: 'GCP Pub/Sub' },
	{ icon: Bot, label: 'MCP' },
];

// ─── Mini Parameters UI (matches main function: resource: string, days: number) ──

function MiniAutoUI() {
	const CYCLE = 7;
	const [time, setTime] = useState(0);
	useEffect(() => {
		let frame: number;
		const start = performance.now();
		const tick = (now: number) => { setTime(((now - start) / 1000) % CYCLE); frame = requestAnimationFrame(tick); };
		frame = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(frame);
	}, []);

	// Timeline: dropdown opens → selects stripe_prod → fill days → run button glows
	const dropdownOpen = time >= 1.2 && time < 2.8;
	const resourceSelected = time >= 2.8;
	const daysFilled = time >= 3.5;
	const runGlow = time >= 4.2;

	return (
		<div className="w-full max-w-[480px] mx-auto flex flex-col gap-3 px-4 py-5">
			{/* Parameters form */}
			<div className="rounded-xl bg-gray-50 border border-gray-200 p-3 flex flex-col gap-3">
				<div className="flex items-center gap-1.5">
					<SlidersHorizontal className="w-3 h-3 text-blue-500" />
					<span className="text-[10px] text-gray-500 font-medium">Parameters UI</span>
				</div>

				{/* resource: string — dropdown select */}
				<div className="flex flex-col gap-1">
					<div className="flex items-center gap-1.5">
						<svg className="w-3 h-3 text-purple-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
							<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
						</svg>
						<span className="text-[10px] text-gray-600">resource</span>
						<span className="text-[9px] text-purple-400 font-bold">stripe</span>
						<span className="text-[9px] text-gray-400 ml-auto">string</span>
					</div>
					<div className="h-6 rounded bg-white border border-gray-200 px-2 flex items-center justify-between">
						{resourceSelected ? (
							<motion.span
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								className="text-[10px] text-gray-700 font-mono"
							>
								stripe_prod
							</motion.span>
						) : (
							<span className="text-[10px] text-gray-400">Select a resource...</span>
						)}
						<svg className="w-3 h-3 text-gray-400" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
							<path d="M3 5l3 3 3-3" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
					</div>
					<AnimatePresence>
						{dropdownOpen && (
							<motion.div
								initial={{ opacity: 0, height: 0 }}
								animate={{ opacity: 1, height: 'auto' }}
								exit={{ opacity: 0, height: 0 }}
								transition={{ duration: 0.15 }}
								className="rounded bg-white border border-gray-200 overflow-hidden shadow-sm"
							>
								{[
									{ name: 'stripe_sandbox', active: false },
									{ name: 'stripe_prod', active: true },
								].map((opt, i) => (
									<motion.div
										key={opt.name}
										initial={{ opacity: 0, x: -8 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ delay: 0.1 + i * 0.1 }}
										className={`px-2 py-1.5 flex items-center gap-2 ${opt.active ? 'bg-blue-50' : ''}`}
									>
										<div className={`w-1.5 h-1.5 rounded-full ${opt.active ? 'bg-blue-500' : 'bg-gray-300'}`} />
										<span className="text-[10px] text-gray-700 font-mono">{opt.name}</span>
									</motion.div>
								))}
							</motion.div>
						)}
					</AnimatePresence>
				</div>

				{/* days: number */}
				<div className="flex flex-col gap-1">
					<div className="flex items-center gap-1.5">
						<span className="text-[10px] text-gray-600">days</span>
						<span className="text-[9px] text-gray-400 ml-auto">number</span>
					</div>
					<div className="h-6 rounded bg-white border border-gray-200 px-2 flex items-center">
						{daysFilled ? (
							<motion.span
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								className="text-[10px] text-gray-700 font-mono"
							>
								7
							</motion.span>
						) : (
							<span className="text-[10px] text-gray-400">Enter a value...</span>
						)}
					</div>
				</div>

				{/* Run button */}
				<motion.div
					className="h-7 rounded-lg flex items-center justify-center gap-1.5 mt-1"
					animate={runGlow
						? { backgroundColor: 'rgba(37,99,235,1)', boxShadow: '0 0 16px rgba(59,130,246,0.5)' }
						: { backgroundColor: 'rgba(37,99,235,0.3)', boxShadow: '0 0 0px rgba(59,130,246,0)' }
					}
					transition={{ duration: 0.4 }}
				>
					<svg className="w-3 h-3 text-white" viewBox="0 0 16 16" fill="currentColor">
						<path d="M4 2l10 6-10 6V2z" />
					</svg>
					<span className="text-[10px] text-white font-medium">Run</span>
				</motion.div>
			</div>
		</div>
	);
}

// ─── Mini Endpoint animation ─────────────────────────────────────────────────

function MiniEndpoint() {
	return (
		<div className="w-full max-w-[480px] mx-auto flex flex-col gap-4 px-4 py-4">
			{/* Endpoint route */}
			<div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
				<div className="font-mono text-[11px] text-gray-400 mb-1">Endpoint</div>
				<div className="font-mono text-[13px]">
					<span className="text-gray-700">POST</span>
					<span className="text-gray-400"> /api/w/my_workspace/</span>
					<span className="text-blue-600 font-semibold">get_failed_payment</span>
				</div>
			</div>

			{/* Triggers section */}
			<div>
				<div className="text-[11px] text-gray-500 font-medium uppercase tracking-wider mb-2 px-1">Triggers</div>
				<div className="grid grid-cols-3 gap-2">
					{TRIGGERS.map((trigger, i) => {
						const Icon = trigger.icon;
						return (
							<div
								key={`${trigger.label}-${i}`}
								className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-sm"
							>
								<Icon className="w-4 h-4 flex-shrink-0 text-gray-400" />
								<span className="text-[11px] font-medium whitespace-nowrap text-gray-600">{trigger.label}</span>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

// ─── Mini AI agent (chat-style: user prompt → agent thinks → tool call → result → answer) ─

function TypingDots() {
	return (
		<span className="inline-flex gap-0.5 items-center ml-1">
			{[0, 1, 2].map((i) => (
				<motion.span
					key={i}
					className="w-1 h-1 rounded-full bg-gray-400"
					animate={{ opacity: [0.3, 1, 0.3] }}
					transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
				/>
			))}
		</span>
	);
}

function MiniAgent() {
	const CYCLE = 8;
	const [time, setTime] = useState(0);
	useEffect(() => {
		let frame: number;
		const start = performance.now();
		const tick = (now: number) => { setTime(((now - start) / 1000) % CYCLE); frame = requestAnimationFrame(tick); };
		frame = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(frame);
	}, []);

	// Timeline
	const showUser = time >= 0 && time < 7.2;
	const showThinking = time >= 0.6 && time < 1.8;
	const showToolCall = time >= 1.8 && time < 7;
	const toolExecuting = time >= 1.8 && time < 3.2;
	const toolDone = time >= 3.2;
	const showAnswer = time >= 4.5 && time < 7.2;

	return (
		<div className="w-full max-w-[480px] mx-auto flex flex-col gap-2.5 px-4 py-4">
			{/* User message */}
			<AnimatePresence>
				{showUser && (
					<motion.div
						initial={{ opacity: 0, y: 8 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -4 }}
						transition={{ duration: 0.3 }}
						className="flex justify-end"
					>
						<div className="rounded-2xl rounded-tr-sm bg-blue-600 px-3.5 py-2 max-w-[75%]">
							<span className="text-[12px] text-white">Get failed payments from last week</span>
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Agent thinking */}
			<AnimatePresence>
				{showThinking && !showToolCall && (
					<motion.div
						initial={{ opacity: 0, y: 8 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.25 }}
						className="flex items-start gap-2"
					>
						<div className="w-6 h-6 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-300 flex items-center justify-center flex-shrink-0 mt-0.5">
							<Bot className="w-3.5 h-3.5 text-gray-500" />
						</div>
						<div className="rounded-2xl rounded-tl-sm bg-gray-100 border border-gray-200 px-3.5 py-2">
							<span className="text-[12px] text-gray-500">Thinking</span>
							<TypingDots />
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Tool call card */}
			<AnimatePresence>
				{showToolCall && (
					<motion.div
						initial={{ opacity: 0, y: 8 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -4 }}
						transition={{ duration: 0.3 }}
						className="flex items-start gap-2"
					>
						<div className="w-6 h-6 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-300 flex items-center justify-center flex-shrink-0 mt-0.5">
							<Bot className="w-3.5 h-3.5 text-gray-500" />
						</div>
						<div className="flex-1 min-w-0">
							<motion.div
								className="rounded-xl border overflow-hidden"
								animate={{
									borderColor: toolExecuting ? 'rgba(59,130,246,0.4)' : toolDone ? 'rgba(34,197,94,0.3)' : 'rgba(209,213,219,0.8)',
								}}
								transition={{ duration: 0.3 }}
							>
								{/* Tool call header — acts as collapsible trigger */}
								<div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 border-b border-gray-200">
									{/* Chevron that rotates open */}
									<motion.svg
										width="10" height="10" viewBox="0 0 10 10"
										animate={{ rotate: toolDone ? 90 : 0 }}
										transition={{ duration: 0.25 }}
										className="flex-shrink-0"
									>
										<path d="M3 1.5 L7 5 L3 8.5" fill="none" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
									</motion.svg>
									{toolExecuting ? (
										<motion.div
											className="w-2 h-2 rounded-full bg-blue-500"
											animate={{ opacity: [1, 0.4, 1] }}
											transition={{ duration: 0.8, repeat: Infinity }}
										/>
									) : toolDone ? (
										<div className="w-2 h-2 rounded-full bg-green-500" />
									) : null}
									<div className="flex items-center gap-1.5">
										<TsLogo />
										<span className="text-[11px] font-mono font-medium text-gray-700">get_failed_payment</span>
									</div>
									<span className={`text-[11px] font-medium ml-auto ${toolExecuting ? 'text-blue-600' : 'text-green-600'}`}>
										{toolExecuting ? 'Calling script...' : 'Script completed'}
									</span>
								</div>
								{/* Collapsible body — opens when done */}
								<motion.div
									initial={{ height: 0 }}
									animate={{ height: toolDone ? 'auto' : 0 }}
									transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
									className="overflow-hidden"
								>
									<div className="px-3 py-2.5 bg-gray-50/50">
										<div className="font-mono text-[10px] text-gray-500 mb-2">
											<span className="text-gray-600">args:</span> <span className="text-gray-400">{'{'}</span> <span className="text-blue-600">"days"</span><span className="text-gray-500">: </span><span className="text-orange-600">7</span> <span className="text-gray-400">{'}'}</span>
										</div>
										<div className="border-t border-gray-200 pt-2">
											<div className="text-[9px] text-gray-400 uppercase tracking-wider mb-1.5">Result</div>
											<div className="font-mono text-[10px] leading-relaxed">
												<div><span className="text-gray-400">{'{'}</span></div>
												<div className="pl-3"><span className="text-blue-600">"count"</span><span className="text-gray-500">: </span><span className="text-orange-600">5</span><span className="text-gray-500">,</span></div>
												<div className="pl-3"><span className="text-blue-600">"total"</span><span className="text-gray-500">: </span><span className="text-green-600">"$1,240.00"</span><span className="text-gray-500">,</span></div>
												<div className="pl-3"><span className="text-blue-600">"status"</span><span className="text-gray-500">: </span><span className="text-green-600">"done"</span></div>
												<div><span className="text-gray-400">{'}'}</span></div>
											</div>
										</div>
									</div>
								</motion.div>
							</motion.div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Agent answer */}
			<AnimatePresence>
				{showAnswer && (
					<motion.div
						initial={{ opacity: 0, y: 8 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -4 }}
						transition={{ duration: 0.3 }}
						className="flex items-start gap-2"
					>
						<div className="w-6 h-6 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-300 flex items-center justify-center flex-shrink-0 mt-0.5">
							<Bot className="w-3.5 h-3.5 text-gray-500" />
						</div>
						<div className="rounded-2xl rounded-tl-sm bg-gray-100 border border-gray-200 px-3.5 py-2 max-w-[85%]">
							<span className="text-[12px] text-gray-700">Found <span className="text-green-600 font-medium">5 failed payments</span> totalling $1,240.00 last week.</span>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}

// ─── Cycling use cases ──────────────────────────────────────────────────────

function TabBar({ items, activeIndex, onSelect }: { items: typeof USE_CASES; activeIndex: number; onSelect: (i: number) => void }) {
	const containerRef = useRef<HTMLDivElement>(null);
	const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;
		const buttons = container.querySelectorAll<HTMLButtonElement>('[data-tab-btn]');
		const btn = buttons[activeIndex];
		if (!btn) return;
		setPillStyle({
			left: btn.offsetLeft,
			width: btn.offsetWidth,
		});
	}, [activeIndex]);

	return (
		<div ref={containerRef} className="relative flex items-center rounded-full bg-gray-100 border border-gray-200 p-1">
			<motion.div
				className="absolute top-1 bottom-1 rounded-full bg-white border border-gray-300 shadow-sm"
				animate={{ left: pillStyle.left, width: pillStyle.width }}
				transition={{ type: 'spring', stiffness: 400, damping: 30 }}
			/>
			{items.map((u, i) => (
				<button
					key={u.id}
					data-tab-btn
					onClick={() => onSelect(i)}
					className="relative z-10 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-medium whitespace-nowrap transition-colors duration-200"
					style={{ color: i === activeIndex ? '#111827' : '#9ca3af' }}
				>
					<u.icon className="w-3.5 h-3.5" />
					{u.label}
				</button>
			))}
		</div>
	);
}

function UseCasesCycling() {
	const [activeIndex, setActiveIndex] = useState(0);

	useEffect(() => {
		if (activeIndex >= USE_CASES.length - 1) return;
		const timeout = setTimeout(() => {
			setActiveIndex((prev) => prev + 1);
		}, USE_CASES[activeIndex].duration);
		return () => clearTimeout(timeout);
	}, [activeIndex]);

	const previews: Record<string, React.ReactNode> = {
		dag: <MiniDag />,
		autoui: <MiniAutoUI />,
		app: <MiniApp />,
		agent: (
			<div className="flex flex-col items-center justify-center gap-3 py-16">
				<Bot className="w-16 h-16 text-blue-500" strokeWidth={1.5} />
				<span className="text-sm font-medium text-gray-500">AI Agent</span>
			</div>
		),
		endpoint: <MiniEndpoint />,
	};

	return (
		<div className="flex flex-col items-center justify-center w-full h-full gap-4">
			<TabBar items={USE_CASES} activeIndex={activeIndex} onSelect={setActiveIndex} />

			<AnimatePresence mode="wait">
				<motion.div
					key={activeIndex}
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -10 }}
					transition={{ duration: 0.25 }}
					className="rounded-xl bg-white w-full flex items-center justify-center overflow-hidden"
					style={{ height: 420 }}
				>
					{previews[USE_CASES[activeIndex].id]}
				</motion.div>
			</AnimatePresence>
		</div>
	);
}

// ─── Complete animation: IDE → use cases → deploy → monitoring ──────────────

type Phase = 'typing' | 'connect' | 'usecases' | 'ready' | 'pushing' | 'deploying' | 'monitoring';

function CompleteAnimation() {
	const [phase, setPhase] = useState<Phase>('typing');

	const comps = React.useMemo(() => {
		const mod = require('../landing/HeroAnimation');
		return {
			TypingCode: mod.TypingCode,
			StaticCode: mod.StaticCode,
			LiveRunsScatter: mod.LiveRunsScatter,
			LiveResultJson: mod.LiveResultJson,
			LiveDatabase: mod.LiveDatabase,
			LiveFrontend: mod.LiveFrontend,
			DB_ROWS: mod.DB_ROWS,
		};
	}, []);

	const handleTypingComplete = useCallback(() => {
		setPhase('connect');
	}, []);

	const [connectPushed, setConnectPushed] = useState(false);
	useEffect(() => {
		if (phase === 'connect') {
			setConnectPushed(false);
			const pushT = setTimeout(() => setConnectPushed(true), 1800);
			const nextT = setTimeout(() => setPhase('usecases'), 2500);
			return () => { clearTimeout(pushT); clearTimeout(nextT); };
		}
	}, [phase]);
	// Total: 3500+4500+3500+3500+3500 = 18500
	const totalUseCasesDuration = USE_CASES.reduce((sum, uc) => sum + uc.duration, 0);
	useEffect(() => { if (phase === 'usecases') { const t = setTimeout(() => setPhase('ready'), totalUseCasesDuration); return () => clearTimeout(t); } }, [phase]);
	useEffect(() => { if (phase === 'ready') { const t = setTimeout(() => setPhase('pushing'), 1200); return () => clearTimeout(t); } }, [phase]);
	useEffect(() => { if (phase === 'pushing') { const t = setTimeout(() => setPhase('deploying'), 400); return () => clearTimeout(t); } }, [phase]);
	useEffect(() => { if (phase === 'deploying') { const t = setTimeout(() => setPhase('monitoring'), 1400); return () => clearTimeout(t); } }, [phase]);

	const [runCount, setRunCount] = useState(0);
	useEffect(() => {
		if (phase !== 'monitoring') { setRunCount(0); return; }
		setRunCount(1);
		let count = 1;
		const interval = setInterval(() => { count++; setRunCount(count); if (count >= comps.DB_ROWS.length) clearInterval(interval); }, 1000);
		return () => clearInterval(interval);
	}, [phase, comps.DB_ROWS.length]);

	const showIde = phase === 'typing' || phase === 'connect';
	const showUseCases = phase === 'usecases' || phase === 'ready' || phase === 'pushing';
	const showMonitoring = phase === 'monitoring';

	// Progress bar: track elapsed time per phase
	const PHASE_DURATIONS: Record<Phase, number> = {
		typing: 3500,
		connect: 2500,
		usecases: totalUseCasesDuration,
		ready: 1200,
		pushing: 400,
		deploying: 1400,
		monitoring: 6000,
	};

	const [progress, setProgress] = useState(0);
	const phaseStartRef = useRef(performance.now());

	useEffect(() => {
		phaseStartRef.current = performance.now();
		setProgress(0);
		let frame: number;
		const tick = () => {
			const elapsed = performance.now() - phaseStartRef.current;
			const duration = PHASE_DURATIONS[phase] || 3000;
			setProgress(Math.min(elapsed / duration, 1));
			frame = requestAnimationFrame(tick);
		};
		frame = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(frame);
	}, [phase]);

	// Compute cumulative progress across all phases
	const PHASE_ORDER: Phase[] = ['typing', 'connect', 'usecases', 'ready', 'pushing', 'deploying', 'monitoring'];
	const totalDuration = PHASE_ORDER.reduce((sum, p) => sum + PHASE_DURATIONS[p], 0);
	const phaseIdx = PHASE_ORDER.indexOf(phase);
	const elapsedBefore = PHASE_ORDER.slice(0, phaseIdx).reduce((sum, p) => sum + PHASE_DURATIONS[p], 0);
	const globalProgress = (elapsedBefore + progress * PHASE_DURATIONS[phase]) / totalDuration;

	return (
		<div className="w-full min-h-[540px] sm:min-h-[620px] flex flex-col items-center justify-center relative">
			{/* Main morphing container */}
			<motion.div
				className="relative overflow-hidden border flex items-center justify-center"
				initial={{ width: '100%', height: 'auto', borderRadius: 12, borderColor: '#1f2937', backgroundColor: '#0d1117', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)' }}
				animate={
					showIde
						? { width: '100%', height: 'auto', borderRadius: 12, borderColor: '#1f2937', backgroundColor: '#0d1117', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)' }
						: phase === 'deploying'
							? { width: 96, height: 96, borderRadius: 48, borderColor: 'transparent', backgroundColor: 'transparent', boxShadow: 'none' }
							: { width: 96, height: 96, borderRadius: 20, borderColor: 'transparent', backgroundColor: 'transparent', boxShadow: 'none' }
				}
				transition={{ duration: phase === 'deploying' ? 0.8 : 0.6, ease: [0.4, 0, 0.2, 1] }}
			>
				{/* IDE content */}
				<motion.div
					className="w-full"
					animate={{
						opacity: showIde ? 1 : 0,
						filter: phase === 'connect' ? 'blur(3px)' : 'blur(0px)',
					}}
					transition={{ duration: showIde ? 0.3 : 0.15, delay: showIde ? 0.3 : 0 }}
				>
					<div className="flex items-center px-3 py-2 bg-[#161b22] border-b border-gray-800 gap-2">
						<div className="flex gap-1.5">
							<div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
							<div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
							<div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
						</div>
						<div className="flex items-center gap-1.5 ml-2">
							<img src="/img/windmill.svg" alt="Windmill" className="h-3.5 w-3.5" />
							<span className="text-[11px] text-gray-400 font-mono">get_failed_payment.ts</span>
						</div>
					</div>
					<div className="p-3 sm:p-4 min-h-[280px] sm:min-h-[300px] flex flex-col">
						{phase === 'typing' ? <comps.TypingCode onComplete={handleTypingComplete} /> : <comps.StaticCode />}
					</div>
					</motion.div>

				{/* Connect button */}
				<AnimatePresence>
					{phase === 'connect' && (
						<motion.div className="absolute inset-0 flex items-center justify-center z-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
							<motion.div
								initial={{ scale: 0.8 }}
								animate={{ scale: connectPushed ? 0.92 : 1 }}
								exit={{ scale: 0.8 }}
								className="bg-blue-700 text-white shadow-xl shadow-blue-700/30 px-6 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2"
							>
								<img src="/img/windmill.svg" alt="" className="w-4 h-4" />
								Connect
							</motion.div>
						</motion.div>
					)}
				</AnimatePresence>

				{/* Spinning logo during deploy */}
				{phase === 'deploying' && (
					<motion.div
						className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.2, delay: 0.2 }}
					>
						<img src="/img/windmill.svg" alt="Windmill" className="w-16 h-16 sm:w-20 sm:h-20 animate-spin" style={{ animationDuration: '3s' }} />
					</motion.div>
				)}

			</motion.div>

			{/* Deployed label */}
			<AnimatePresence>
				{phase === 'deploying' && (
					<motion.div
						initial={{ opacity: 0, y: 5 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0 }}
						transition={{ delay: 0.5, duration: 0.3 }}
						className="absolute mt-[140px] sm:mt-[150px] flex items-center gap-2 text-green-400 font-medium text-sm"
					>
						<motion.svg width="16" height="16" viewBox="0 0 16 16" fill="none">
							<circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" fill="none" />
							<motion.path d="M4.5 8 L7 10.5 L11.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4, delay: 0.6 }} />
						</motion.svg>
						<span>Deployment successful</span>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Use cases cycling section */}
			<AnimatePresence>
				{showUseCases && (
					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.95 }}
						transition={{ duration: 0.5 }}
						className="absolute inset-0 flex flex-col items-center"
					>
						<motion.div
							className="w-full flex-1"
							animate={{
								filter: phase === 'ready' || phase === 'pushing' ? 'blur(3px)' : 'blur(0px)',
							}}
							transition={{ duration: 0.3 }}
						>
							<UseCasesCycling />
						</motion.div>

						{/* Deploy button overlay on use cases */}
						<AnimatePresence>
							{(phase === 'ready' || phase === 'pushing') && (
								<motion.div className="absolute inset-0 flex items-center justify-center z-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
									<motion.div
										initial={{ scale: 0.8 }}
										animate={{ scale: phase === 'pushing' ? 0.92 : 1 }}
										exit={{ scale: 0.8 }}
										className="bg-blue-700 text-white shadow-xl shadow-blue-700/30 px-6 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2"
									>
										<img src="/img/windmill.svg" alt="" className="w-4 h-4" />
										Deploy
									</motion.div>
								</motion.div>
							)}
						</AnimatePresence>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Monitoring phase */}
			<AnimatePresence>
				{showMonitoring && (
					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.95 }}
						transition={{ duration: 0.5 }}
						className="absolute inset-0 flex flex-col gap-3 p-2"
					>
						<motion.div
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.2, duration: 0.4 }}
							className="relative rounded-xl border border-gray-700 p-4 pt-5 shrink-0"
						>
							<span className="absolute -top-2.5 left-4 px-2 bg-[#0a0f18] text-[11px] font-medium text-gray-400 uppercase tracking-wider">Windmill workers</span>
							<div className="flex flex-col items-center">
								<div className="flex items-center gap-2.5">
									<img src="/img/windmill.svg" alt="Windmill" className="w-7 h-7 animate-spin" style={{ animationDuration: '3s' }} />
									<div className="flex items-center gap-2">
										<span className="text-sm font-mono text-gray-300">get_failed_payment.ts</span>
										<div className="flex items-center gap-1">
											<div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
											<span className="text-[10px] text-green-400">live</span>
										</div>
									</div>
								</div>
							</div>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.4, duration: 0.4 }}
							className="relative rounded-xl border border-gray-700 p-3 pt-5 flex-1 min-h-0"
						>
							<span className="absolute -top-2.5 left-4 px-2 bg-[#0a0f18] text-[11px] font-medium text-gray-400 uppercase tracking-wider">Windmill platform</span>
							<div className="h-full grid grid-cols-2 grid-rows-2 gap-2">
								<motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, type: 'spring', stiffness: 200 }} className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden flex flex-col">
									<div className="px-2.5 py-1.5 bg-gray-50 border-b border-gray-200 flex items-center gap-1.5 shrink-0"><div className="w-2 h-2 rounded-full bg-green-500" /><span className="text-sm text-gray-600 font-medium">Runs</span></div>
									<div className="p-2 flex-1 min-h-0 flex flex-col justify-center"><comps.LiveRunsScatter runCount={runCount} light /></div>
								</motion.div>
								<motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.65, type: 'spring', stiffness: 200 }} className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden flex flex-col">
									<div className="px-2.5 py-1.5 bg-gray-50 border-b border-gray-200 flex items-center gap-1.5 shrink-0"><div className="w-2 h-2 rounded-full bg-purple-500" /><span className="text-sm text-gray-600 font-medium">Result</span></div>
									<div className="p-2 flex-1 min-h-0 flex flex-col justify-center overflow-hidden"><comps.LiveResultJson runCount={runCount} light /></div>
								</motion.div>
								<motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8, type: 'spring', stiffness: 200 }} className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden flex flex-col">
									<div className="px-2.5 py-1.5 bg-gray-50 border-b border-gray-200 flex items-center gap-1.5 shrink-0"><div className="w-2 h-2 rounded-full bg-amber-500" /><span className="text-sm text-gray-600 font-medium">Database</span></div>
									<div className="p-2 flex-1 min-h-0 flex flex-col justify-center overflow-hidden"><comps.LiveDatabase runCount={runCount} light /></div>
								</motion.div>
								<motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.95, type: 'spring', stiffness: 200 }} className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden flex flex-col">
									<div className="px-2.5 py-1.5 bg-gray-50 border-b border-gray-200 flex items-center gap-1.5 shrink-0"><div className="w-2 h-2 rounded-full bg-cyan-500" /><span className="text-sm text-gray-600 font-medium">Audit logs</span></div>
									<div className="p-2 flex-1 min-h-0 flex flex-col overflow-hidden"><comps.LiveFrontend runCount={runCount} light /></div>
								</motion.div>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Progress bar */}
			<div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/5 rounded-full overflow-hidden">
				<div
					className="h-full bg-blue-500/30 transition-none"
					style={{ width: `${globalProgress * 100}%` }}
				/>
			</div>
		</div>
	);
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default function AnimationTest() {
	return (
		<Layout title="Animation test" description="Test page for animation variant">
			<BrowserOnly>
				{() => (
					<div className="bg-[#0a0f18] min-h-screen flex items-center justify-center py-16">
						<div className="w-full max-w-xl px-4">
							<CompleteAnimation />
						</div>
					</div>
				)}
			</BrowserOnly>
		</Layout>
	);
}
