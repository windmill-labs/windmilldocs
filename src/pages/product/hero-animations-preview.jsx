import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FileCode, GitFork, Zap, CheckCircle2, Mail, Database, Shield, Cloud, Plug, ArrowDown } from 'lucide-react';
import { SiTypescript, SiPython } from 'react-icons/si';

// ── Python colored icon (from workflows use-case) ──
function PythonColored({ className }) {
	return (
		<svg viewBox="0 0 256 255" className={className} xmlns="http://www.w3.org/2000/svg">
			<defs>
				<linearGradient id="pyA" x1="12.96%" y1="12.07%" x2="79.64%" y2="78.8%">
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

// ── Shared: Windmill-style script card ──

function ScriptCard({ icon: Icon, label, bg = 'bg-white', border = 'border-gray-200', iconColor = 'text-[#3178C6]', w = 200 }) {
	return (
		<div
			className={`px-4 py-2.5 rounded-xl border ${border} ${bg} flex items-center gap-2.5 shadow-sm`}
			style={{ width: w, height: 40 }}
		>
			<Icon className={`w-4 h-4 ${iconColor} flex-shrink-0`} />
			<span className="text-sm font-medium text-gray-700 whitespace-nowrap">{label}</span>
		</div>
	);
}

// ── Shared: Full workflow DAG data (matches solutions/workflow style) ──

const CX = 220;
const NH = 40;

const dagNodes = [
	{ id: 'trigger',   label: 'Trigger',              x: CX,       y: 40,   icon: Zap,           bg: 'bg-blue-50',     border: 'border-blue-200',    iconColor: 'text-blue-500' },
	{ id: 'input',     label: 'Input',                x: CX,       y: 110,  icon: FileCode,      bg: 'bg-gray-50',     border: 'border-gray-200',    iconColor: 'text-gray-500' },
	{ id: 'create',    label: 'Create AWS resources', x: CX,       y: 180,  icon: SiTypescript,   bg: 'bg-white',       border: 'border-gray-200',    iconColor: 'text-[#3178C6]' },
	{ id: 'branch-a',  label: 'Setup permissions',    x: CX - 115, y: 260,  icon: SiPython,       bg: 'bg-white',       border: 'border-gray-200',    iconColor: 'text-[#3776AB]' },
	{ id: 'branch-b',  label: 'Configure database',   x: CX + 115, y: 260,  icon: SiPython,       bg: 'bg-white',       border: 'border-gray-200',    iconColor: 'text-[#3776AB]' },
	{ id: 'merge',     label: 'Collect results',      x: CX,       y: 340,  icon: GitFork,        bg: 'bg-violet-50',   border: 'border-violet-200',  iconColor: 'text-violet-500' },
	{ id: 'email',     label: 'Send welcome email',   x: CX,       y: 410,  icon: SiTypescript,   bg: 'bg-white',       border: 'border-gray-200',    iconColor: 'text-[#3178C6]' },
	{ id: 'result',    label: 'Result',               x: CX,       y: 480,  icon: CheckCircle2,   bg: 'bg-emerald-50',  border: 'border-emerald-200', iconColor: 'text-emerald-500' },
];

const dagEdges = [
	['trigger', 'input'],
	['input', 'create'],
	['create', 'branch-a'],
	['create', 'branch-b'],
	['branch-a', 'merge'],
	['branch-b', 'merge'],
	['merge', 'email'],
	['email', 'result'],
];

const nodeMap = Object.fromEntries(dagNodes.map(n => [n.id, n]));

function edgePath([srcId, dstId]) {
	const s = nodeMap[srcId];
	const d = nodeMap[dstId];
	const sy = s.y + NH / 2;
	const dy = d.y - NH / 2;
	if (s.x === d.x) return `M${s.x},${sy} L${d.x},${dy}`;
	const midY = (sy + dy) / 2;
	return `M${s.x},${sy} C${s.x},${midY} ${d.x},${midY} ${d.x},${dy}`;
}


// ── Workflow animation data (matches use-cases/workflows) ──

const WF_CX = 160;
const WF_NH = 40;

const wfNodes = [
	{ id: 'trigger',   label: 'Trigger',              x: WF_CX,       y: 40,   w: 230, icon: Zap,           color: 'bg-blue-50',   borderColor: 'border-blue-200',   iconColor: 'text-blue-500',    textColor: 'text-gray-700' },
	{ id: 'input',     label: 'Input',                x: WF_CX,       y: 120,  w: 230, icon: null,          color: 'bg-gray-50',   borderColor: 'border-gray-200',   iconColor: '',                 textColor: 'text-gray-600' },
	{ id: 'create',    label: 'Create AWS resources', x: WF_CX,       y: 210,  w: 230, icon: SiTypescript,  color: 'bg-white',     borderColor: 'border-gray-200',   iconColor: 'text-[#3178C6]',   textColor: 'text-gray-700', turnsGreen: true },
	{ id: 'branch-a',  label: 'Setup permissions',    x: WF_CX - 120, y: 320, w: 230, icon: PythonColored, color: 'bg-white',     borderColor: 'border-gray-200',   iconColor: '',                 textColor: 'text-gray-700', turnsGreen: true },
	{ id: 'branch-b',  label: 'Configure database',   x: WF_CX + 120, y: 320, w: 230, icon: PythonColored, color: 'bg-white',     borderColor: 'border-gray-200',   iconColor: '',                 textColor: 'text-gray-700', turnsGreen: true },
	{ id: 'merge',     label: 'Collect results',      x: WF_CX,       y: 430, w: 230, icon: GitFork,       color: 'bg-violet-50', borderColor: 'border-violet-200', iconColor: 'text-violet-500',  textColor: 'text-gray-700' },
	{ id: 'email',     label: 'Send welcome email',   x: WF_CX,       y: 520, w: 230, icon: SiTypescript,  color: 'bg-white',     borderColor: 'border-gray-200',   iconColor: 'text-[#3178C6]',   textColor: 'text-gray-700', turnsGreen: true },
	{ id: 'result',    label: 'Result',               x: WF_CX,       y: 610, w: 230, icon: null,          color: 'bg-gray-50',   borderColor: 'border-gray-200',   iconColor: '',                 textColor: 'text-gray-600', delayedIcon: CheckCircle2 },
];

const wfEdges = [
	{ src: 'trigger',   dst: 'input' },
	{ src: 'input',     dst: 'create' },
	{ src: 'create',    dst: 'branch-a' },
	{ src: 'create',    dst: 'branch-b' },
	{ src: 'branch-a',  dst: 'merge' },
	{ src: 'branch-b',  dst: 'merge' },
	{ src: 'merge',     dst: 'email' },
	{ src: 'email',     dst: 'result' },
];

const wfNodeMap = Object.fromEntries(wfNodes.map(n => [n.id, n]));

function wfEdgePath(e) {
	const s = wfNodeMap[e.src];
	const d = wfNodeMap[e.dst];
	const sy = s.y + WF_NH / 2;
	const dy = d.y - WF_NH / 2;
	if (s.x === d.x) return `M${s.x},${sy} L${d.x},${dy}`;
	const midY = (sy + dy) / 2;
	return `M${s.x},${sy} C${s.x},${midY} ${d.x},${midY} ${d.x},${dy}`;
}

const wfTopPath = "M160,60 L160,100 L160,140 L160,190 L160,230";
const wfLeftBranchPath = "M160,230 C160,265 40,265 40,300 L40,340 C40,375 160,375 160,410";
const wfRightBranchPath = "M160,230 C160,265 280,265 280,300 L280,340 C280,375 160,375 160,410";
const wfBottomPath = "M160,410 L160,450 L160,500 L160,540 L160,590";

const wfTopDur = 1.9;
const wfBranchDur = 1.6;
const wfBottomDur = 1.6;
const wfTotalCycleDur = wfTopDur + wfBranchDur + wfBottomDur + 1;

const wfStepTimings = {
	trigger:    0,
	input:      0.65,
	create:     1.65,
	'branch-a': 2.7,
	'branch-b': 2.7,
	merge:      3.7,
	email:      4.5,
	result:     5.1,
};

const wfStepOutputs = {
	trigger:    { text: 'Webhook received', detail: 'POST /api/provision' },
	input:      { text: 'Validated input', detail: '{ customer: "Acme" }' },
	create:     { text: 'Resources created', detail: 'ec2-i-0a3b, vpc-7f2e' },
	'branch-b': { text: 'run 2 branches', detail: 'permissions + database' },
	merge:      { text: '2/2 branches done', detail: '1.2s total' },
	email:      { text: 'Email sent', detail: 'from : welcome@windmill.com' },
	result:     { text: 'Success', detail: 'Provisioned in 4.8s' },
};

function StepOutput({ nodeId, delay }) {
	const output = wfStepOutputs[nodeId];
	if (!output) return null;
	return (
		<div className="absolute left-full ml-2 z-30 top-1/2" style={{ transform: 'translateY(-50%)' }}>
			<motion.div
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: [0, 0, 1], scale: [0.8, 0.8, 1] }}
				transition={{ duration: 0.6, delay, times: [0, 0.01, 1], ease: 'easeOut' }}
			>
				<div className="rounded-lg border border-green-800 bg-gray-900/95 backdrop-blur-sm shadow-sm px-3 py-2 overflow-hidden" style={{ width: 210 }}>
					<div className="flex items-center gap-1.5">
						<span className="text-green-400 text-sm">{String.fromCharCode(10003)}</span>
						<span className="text-[12px] font-medium text-white">{output.text}</span>
					</div>
					<div className="text-[11px] font-mono text-white mt-0.5">{output.detail}</div>
				</div>
			</motion.div>
		</div>
	);
}

function WorkflowAnimation({ animDelay = 0 }) {
	return (
		<div className="relative" style={{ width: 520, height: 650, transform: 'scale(0.8)', transformOrigin: 'top center' }}>
			<svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
				{wfEdges.map((e, i) => (
					<path key={`edge-${i}`} d={wfEdgePath(e)}
						className="stroke-gray-300" strokeWidth={1.5} fill="none" />
				))}
				<path id="wfTopRoute" d={wfTopPath} fill="none" stroke="none" />
				<path id="wfLeftBranch" d={wfLeftBranchPath} fill="none" stroke="none" />
				<path id="wfRightBranch" d={wfRightBranchPath} fill="none" stroke="none" />
				<path id="wfBottomRoute" d={wfBottomPath} fill="none" stroke="none" />
				{/* Top ball */}
				<circle r={6} opacity="0" className="fill-blue-400" style={{ filter: 'drop-shadow(0 0 8px rgba(96,165,250,0.9))' }}>
					<animateMotion dur={`${wfTopDur}s`} repeatCount="1" begin={`${animDelay}s`} fill="freeze"
						keyPoints="0;1" keyTimes="0;1" calcMode="linear">
						<mpath href="#wfTopRoute" />
					</animateMotion>
					<animate attributeName="opacity" begin={`${animDelay}s`} dur={`${wfTotalCycleDur}s`} repeatCount="1" fill="freeze"
						values="0;1;1;0;0;0;0;0" keyTimes={`0;0.01;${wfTopDur/wfTotalCycleDur};${(wfTopDur+0.01)/wfTotalCycleDur};${(wfTopDur+0.3)/wfTotalCycleDur};0.7;0.9;1`} />
				</circle>
				{/* Left branch ball */}
				<circle r={6} opacity="0" className="fill-blue-400" style={{ filter: 'drop-shadow(0 0 8px rgba(96,165,250,0.9))' }}>
					<animateMotion dur={`${wfBranchDur}s`} repeatCount="1" begin={`${animDelay + wfTopDur}s`} fill="freeze"
						keyPoints="0;1" keyTimes="0;1" calcMode="linear">
						<mpath href="#wfLeftBranch" />
					</animateMotion>
					<animate attributeName="opacity" begin={`${animDelay}s`} dur={`${wfTotalCycleDur}s`} repeatCount="1" fill="freeze"
						values="0;0;0;1;1;0;0;0" keyTimes={`0;${(wfTopDur-0.01)/wfTotalCycleDur};${wfTopDur/wfTotalCycleDur};${(wfTopDur+0.01)/wfTotalCycleDur};${(wfTopDur+wfBranchDur)/wfTotalCycleDur};${(wfTopDur+wfBranchDur+0.01)/wfTotalCycleDur};0.9;1`} />
				</circle>
				{/* Right branch ball */}
				<circle r={6} opacity="0" className="fill-blue-400" style={{ filter: 'drop-shadow(0 0 8px rgba(96,165,250,0.9))' }}>
					<animateMotion dur={`${wfBranchDur}s`} repeatCount="1" begin={`${animDelay + wfTopDur}s`} fill="freeze"
						keyPoints="0;1" keyTimes="0;1" calcMode="linear">
						<mpath href="#wfRightBranch" />
					</animateMotion>
					<animate attributeName="opacity" begin={`${animDelay}s`} dur={`${wfTotalCycleDur}s`} repeatCount="1" fill="freeze"
						values="0;0;0;1;1;0;0;0" keyTimes={`0;${(wfTopDur-0.01)/wfTotalCycleDur};${wfTopDur/wfTotalCycleDur};${(wfTopDur+0.01)/wfTotalCycleDur};${(wfTopDur+wfBranchDur)/wfTotalCycleDur};${(wfTopDur+wfBranchDur+0.01)/wfTotalCycleDur};0.9;1`} />
				</circle>
				{/* Bottom ball */}
				<circle r={6} opacity="0" className="fill-blue-400" style={{ filter: 'drop-shadow(0 0 8px rgba(96,165,250,0.9))' }}>
					<animateMotion dur={`${wfBottomDur}s`} repeatCount="1" begin={`${animDelay + wfTopDur + wfBranchDur}s`} fill="freeze"
						keyPoints="0;1" keyTimes="0;1" calcMode="linear">
						<mpath href="#wfBottomRoute" />
					</animateMotion>
					<animate attributeName="opacity" begin={`${animDelay}s`} dur={`${wfTotalCycleDur}s`} repeatCount="1" fill="freeze"
						values="0;0;0;1;1;0;0" keyTimes={`0;${(wfTopDur+wfBranchDur-0.01)/wfTotalCycleDur};${(wfTopDur+wfBranchDur)/wfTotalCycleDur};${(wfTopDur+wfBranchDur+0.01)/wfTotalCycleDur};${(wfTopDur+wfBranchDur+wfBottomDur)/wfTotalCycleDur};${(wfTopDur+wfBranchDur+wfBottomDur+0.01)/wfTotalCycleDur};1`} />
				</circle>
			</svg>

			{wfNodes.map((node, i) => (
				<div key={node.id} className="absolute"
					style={{ left: node.x, top: node.y, transform: 'translate(-50%, -50%)' }}
				>
				<motion.div
					initial={{ opacity: 0, scale: 0.85 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.45, delay: i * 0.1, ease: 'easeOut' }}
					className="relative"
				>
					{/* Node glow */}
					<motion.div
						className="absolute -inset-1 rounded-xl bg-blue-400/20"
						initial={{ opacity: 0 }}
						animate={{ opacity: [0, 0, 1, 1, 0] }}
						transition={{ duration: 3, delay: animDelay + wfStepTimings[node.id], times: [0, 0.01, 0.1, 0.7, 1], ease: 'easeOut' }}
					/>
					{/* Node box */}
					<div className="relative" style={{ width: node.w, height: WF_NH }}>
						<div
							className={`absolute inset-0 px-4 py-2 rounded-xl border ${node.borderColor} shadow-sm ${node.color} flex items-center gap-2.5`}
							style={{ justifyContent: 'center' }}
						>
							{node.icon && <node.icon className={`w-4 h-4 ${node.iconColor} flex-shrink-0`} />}
							<span className={`text-sm font-medium ${node.textColor} whitespace-nowrap`}>{node.label}</span>
						</div>
						{node.turnsGreen && <motion.div
							className="absolute inset-0 px-4 py-2 rounded-xl border border-green-300 shadow-sm bg-green-50 flex items-center gap-2.5"
							style={{ justifyContent: 'center' }}
							initial={{ opacity: 0 }}
							animate={{ opacity: [0, 0, 1] }}
							transition={{ duration: 0.5, delay: animDelay + wfStepTimings[node.id] + 0.2, times: [0, 0.01, 1], ease: 'easeOut' }}
						>
							{node.icon && <node.icon className={`w-4 h-4 ${node.iconColor} flex-shrink-0`} />}
							<span className="text-sm font-medium text-green-700 whitespace-nowrap">{node.label}</span>
						</motion.div>}
						{node.delayedIcon && <motion.div
							className="absolute inset-0 px-4 py-2 rounded-xl border border-emerald-200 shadow-sm bg-emerald-50 flex items-center gap-2.5"
							style={{ justifyContent: 'center' }}
							initial={{ opacity: 0 }}
							animate={{ opacity: [0, 0, 1] }}
							transition={{ duration: 0.5, delay: animDelay + wfStepTimings[node.id] + 0.2, times: [0, 0.01, 1], ease: 'easeOut' }}
						>
							<node.delayedIcon className="w-4 h-4 text-emerald-500 flex-shrink-0" />
							<span className="text-sm font-medium text-gray-700 whitespace-nowrap">{node.label}</span>
						</motion.div>}
					</div>
					{/* Step output panel */}
					<StepOutput nodeId={node.id} delay={animDelay + wfStepTimings[node.id]} />
				</motion.div>
				</div>
			))}
		</div>
	);
}


// ══════════════════════════════════════════════════════
// CONCEPT 1: Two cards + plug icon + zoom out
// Cards appear centered, plug animates between them,
// connection draws, then zooms out to full DAG
// ══════════════════════════════════════════════════════

function Concept1() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.3 });

	return (
		<div ref={ref} className="relative" style={{ height: 540 }}>
			<div className="relative overflow-hidden h-full flex justify-center">
				{isInView && <WorkflowAnimation animDelay={0.5} />}
			</div>
		</div>
	);
}


// ══════════════════════════════════════════════════════
// CONCEPT 2: Smooth zoom transition (no cut)
// Starts zoomed into two nodes that are part of the
// full DAG, plug animates, then camera zooms out
// ══════════════════════════════════════════════════════

function Concept2() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.3 });
	const [phase, setPhase] = useState(0);

	useEffect(() => {
		if (!isInView) return;
		const timers = [
			setTimeout(() => setPhase(1), 600),
			setTimeout(() => setPhase(2), 1200),
			setTimeout(() => setPhase(3), 2600),
		];
		return () => timers.forEach(clearTimeout);
	}, [isInView]);

	// Focus on "create" (y=155) and "branch-a" (y=225) — they're adjacent in the DAG
	// Zoom center between them: y ~ 190, x = CX for create, but branch-a is offset
	// We'll focus on create → branch-a connection

	return (
		<div ref={ref} className="relative" style={{ height: 520 }}>
				<div className="relative overflow-hidden h-full">
					<motion.div
						className="absolute inset-0"
						animate={phase >= 3
							? { scale: 1, x: 0, y: 0 }
							: { scale: 2.5, x: 80, y: -200 }
						}
						initial={{ scale: 2.5, x: 80, y: -200 }}
						transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
						style={{ transformOrigin: 'center center' }}
					>
						{/* SVG edges */}
						<svg className="absolute inset-0 w-full h-full" viewBox="0 0 440 520" style={{ pointerEvents: 'none' }}>
							{dagEdges.map(([src, dst], i) => {
								const isMainConnection = src === 'create' && dst === 'branch-a';
								const showEarly = isMainConnection && phase >= 2;
								const showAll = phase >= 3;
								return (
									<motion.path
										key={`${src}-${dst}`}
										d={edgePath([src, dst])}
										className="stroke-gray-300 dark:stroke-gray-600"
										strokeWidth={1.5}
										fill="none"
										initial={{ opacity: 0, pathLength: isMainConnection ? 0 : 1 }}
										animate={(showEarly || showAll)
											? { opacity: 1, pathLength: 1 }
											: { opacity: 0 }
										}
										transition={isMainConnection && phase === 2
											? { opacity: { duration: 0.1 }, pathLength: { duration: 0.8, ease: 'easeOut' } }
											: { duration: 0.3, delay: showAll ? i * 0.04 : 0 }
										}
									/>
								);
							})}
						</svg>

						{/* Nodes */}
						{dagNodes.map((node, i) => {
							const isFocus = node.id === 'create' || node.id === 'branch-a';
							const isVisible = isFocus ? phase >= (node.id === 'branch-a' ? 1 : 0) : phase >= 3;
							return (
								<motion.div
									key={node.id}
									className="absolute"
									style={{ left: node.x, top: node.y, transform: 'translate(-50%, -50%)' }}
									initial={{ opacity: 0, scale: 0.85 }}
									animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
									transition={{ duration: 0.4, delay: isFocus ? 0 : 0.1 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
								>
									<div className={`px-3 py-1.5 rounded-xl border ${node.border} ${node.bg} flex items-center gap-2 shadow-sm`}
										style={{ height: NH, width: 200, whiteSpace: 'nowrap', justifyContent: 'center' }}>
										<node.icon className={`w-3.5 h-3.5 ${node.iconColor} flex-shrink-0`} />
										<span className="text-[11px] font-medium text-gray-700">{node.label}</span>
									</div>
								</motion.div>
							);
						})}

						{/* Plug icon between the two focus nodes */}
						{phase >= 2 && phase < 3 && (
							<motion.div
								className="absolute w-7 h-7 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center"
								style={{ left: CX - 55, top: 190, transform: 'translate(-50%, -50%)' }}
								initial={{ opacity: 0, scale: 0 }}
								animate={{ opacity: [0, 1, 1, 0], scale: [0, 1.1, 1, 0.8] }}
								transition={{ duration: 1.2, times: [0, 0.2, 0.7, 1] }}
							>
								<Plug className="w-3.5 h-3.5 text-blue-500" />
							</motion.div>
						)}
					</motion.div>
				</div>
		</div>
	);
}


// ══════════════════════════════════════════════════════
// CONCEPT 3: Vertical build-up
// Cards drop in one by one from top, each connecting
// to the previous, then branches fan out
// ══════════════════════════════════════════════════════

function Concept3() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.3 });
	const [visibleCount, setVisibleCount] = useState(0);

	useEffect(() => {
		if (!isInView) return;
		const timers = dagNodes.map((_, i) =>
			setTimeout(() => setVisibleCount(i + 1), 400 + i * 350)
		);
		return () => timers.forEach(clearTimeout);
	}, [isInView]);

	return (
		<div ref={ref} className="relative" style={{ height: 520 }}>
				<div className="relative overflow-hidden h-full">
					{/* SVG edges — appear when both connected nodes are visible */}
					<svg className="absolute inset-0 w-full h-full" viewBox="0 0 440 520" style={{ pointerEvents: 'none' }}>
						{dagEdges.map(([src, dst], i) => {
							const srcIdx = dagNodes.findIndex(n => n.id === src);
							const dstIdx = dagNodes.findIndex(n => n.id === dst);
							const isVisible = visibleCount > Math.max(srcIdx, dstIdx);
							return (
								<motion.path
									key={`${src}-${dst}`}
									d={edgePath([src, dst])}
									className="stroke-gray-300 dark:stroke-gray-600"
									strokeWidth={1.5}
									fill="none"
									initial={{ opacity: 0, pathLength: 0 }}
									animate={isVisible ? { opacity: 1, pathLength: 1 } : { opacity: 0, pathLength: 0 }}
									transition={{ duration: 0.5, ease: 'easeOut' }}
								/>
							);
						})}
					</svg>

					{/* Nodes — drop in one by one */}
					{dagNodes.map((node, i) => (
						<motion.div
							key={node.id}
							className="absolute"
							style={{ left: node.x, top: node.y, transform: 'translate(-50%, -50%)' }}
							initial={{ opacity: 0, y: -20, scale: 0.9 }}
							animate={i < visibleCount
								? { opacity: 1, y: 0, scale: 1 }
								: { opacity: 0, y: -20, scale: 0.9 }
							}
							transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
						>
							<div className={`px-3 py-1.5 rounded-xl border ${node.border} ${node.bg} flex items-center gap-2 shadow-sm`}
								style={{ height: NH, width: 200, whiteSpace: 'nowrap', justifyContent: 'center' }}>
								<node.icon className={`w-3.5 h-3.5 ${node.iconColor} flex-shrink-0`} />
								<span className="text-[11px] font-medium text-gray-700">{node.label}</span>
							</div>
						</motion.div>
					))}
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
								Flow editor hero animation
							</h1>
						</motion.div>

						{/* Concept 1: Two cards + plug + zoom out */}
						<div className="mb-32">
							<motion.div {...fadeIn} className="mb-8">
								<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Concept 1: Two cards, plug, zoom out (cut transition)</h2>
								<p className="text-gray-600 dark:text-gray-300">First card appears, then second. Plug icon animates between them with a connection line. Then cuts to full zoomed-out DAG.</p>
							</motion.div>
							<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
								<motion.div {...fadeIn}>
									<p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2 tracking-wide uppercase">Flow editor</p>
									<h1 className="!text-4xl sm:!text-5xl !font-semibold !tracking-tight text-gray-900 dark:text-white mb-6">
										Workflow builder with built-in infrastructure
									</h1>
									<p className="text-xl text-gray-600 dark:text-gray-100 mb-8">
										Chain scripts into multi-step workflows with branching, loops, retries, approval gates, and full observability.
									</p>
									<HeroCTAButtons />
								</motion.div>
								<div className="hidden lg:block">
									<Concept1 />
								</div>
							</div>
						</div>

						{/* Concept 2: Smooth zoom */}
						<div className="mb-32">
							<motion.div {...fadeIn} className="mb-8">
								<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Concept 2: Smooth zoom transition</h2>
								<p className="text-gray-600 dark:text-gray-300">Starts zoomed into two nodes in the actual DAG. Plug icon appears, connection draws, then the camera smoothly zooms out to reveal the full workflow.</p>
							</motion.div>
							<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
								<motion.div {...fadeIn}>
									<p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2 tracking-wide uppercase">Flow editor</p>
									<h1 className="!text-4xl sm:!text-5xl !font-semibold !tracking-tight text-gray-900 dark:text-white mb-6">
										Workflow builder with built-in infrastructure
									</h1>
									<p className="text-xl text-gray-600 dark:text-gray-100 mb-8">
										Chain scripts into multi-step workflows with branching, loops, retries, approval gates, and full observability.
									</p>
									<HeroCTAButtons />
								</motion.div>
								<div className="hidden lg:block">
									<Concept2 />
								</div>
							</div>
						</div>

						{/* Concept 3: Vertical build-up */}
						<div className="mb-32">
							<motion.div {...fadeIn} className="mb-8">
								<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Concept 3: Vertical build-up</h2>
								<p className="text-gray-600 dark:text-gray-300">Cards drop in one by one from the top, each connecting to the previous with an animated line. Branches fan out naturally.</p>
							</motion.div>
							<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
								<motion.div {...fadeIn}>
									<p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2 tracking-wide uppercase">Flow editor</p>
									<h1 className="!text-4xl sm:!text-5xl !font-semibold !tracking-tight text-gray-900 dark:text-white mb-6">
										Workflow builder with built-in infrastructure
									</h1>
									<p className="text-xl text-gray-600 dark:text-gray-100 mb-8">
										Chain scripts into multi-step workflows with branching, loops, retries, approval gates, and full observability.
									</p>
									<HeroCTAButtons />
								</motion.div>
								<div className="hidden lg:block">
									<Concept3 />
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
