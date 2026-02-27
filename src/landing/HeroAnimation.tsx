import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Webhook } from 'lucide-react';

// ─── Code typing ─────────────────────────────────────────────────────────────

const CODE_SEGMENTS = [
	{ text: 'import', cls: 'text-purple-400' },
	{ text: ' Stripe ', cls: 'text-white' },
	{ text: "from ", cls: 'text-purple-400' },
	{ text: "'stripe'", cls: 'text-green-400' },
	{ text: '\n\n', cls: '' },
	{ text: 'export async function ', cls: 'text-purple-400' },
	{ text: 'main', cls: 'text-yellow-300' },
	{ text: '(\n', cls: 'text-white' },
	{ text: '  resource', cls: 'text-orange-300' },
	{ text: ': ', cls: 'text-white' },
	{ text: 'string', cls: 'text-blue-300' },
	{ text: ',\n', cls: 'text-white' },
	{ text: '  charge_id', cls: 'text-orange-300' },
	{ text: ': ', cls: 'text-white' },
	{ text: 'string', cls: 'text-blue-300' },
	{ text: '\n) {\n', cls: 'text-white' },
	{ text: '  const ', cls: 'text-purple-400' },
	{ text: 'stripe ', cls: 'text-white' },
	{ text: '= new ', cls: 'text-purple-400' },
	{ text: 'Stripe', cls: 'text-yellow-300' },
	{ text: '(resource)\n', cls: 'text-white' },
	{ text: '  return ', cls: 'text-purple-400' },
	{ text: 'stripe.refunds.', cls: 'text-white' },
	{ text: 'create', cls: 'text-yellow-300' },
	{ text: '({\n', cls: 'text-white' },
	{ text: '    charge', cls: 'text-orange-300' },
	{ text: ': charge_id\n', cls: 'text-white' },
	{ text: '  })\n', cls: 'text-white' },
	{ text: '}', cls: 'text-white' },
];

function buildCharacters(segments: typeof CODE_SEGMENTS) {
	const chars: { char: string; cls: string }[] = [];
	for (const seg of segments) {
		for (const char of seg.text) {
			chars.push({ char, cls: seg.cls });
		}
	}
	return chars;
}

const ALL_CHARS = buildCharacters(CODE_SEGMENTS);

function TypingCode({ onComplete }: { onComplete: () => void }) {
	const [charIndex, setCharIndex] = useState(0);
	const completeCalled = React.useRef(false);

	useEffect(() => {
		if (charIndex >= ALL_CHARS.length) {
			if (!completeCalled.current) {
				completeCalled.current = true;
				const timeout = setTimeout(onComplete, 300);
				return () => clearTimeout(timeout);
			}
			return;
		}
		const char = ALL_CHARS[charIndex];
		const delay = char.char === '\n' ? 20 : 8 + Math.random() * 10;
		const timeout = setTimeout(() => setCharIndex((i) => i + 1), delay);
		return () => clearTimeout(timeout);
	}, [charIndex, onComplete]);

	return <CodeRenderer charCount={charIndex} showCursor />;
}

function StaticCode() {
	return <CodeRenderer charCount={ALL_CHARS.length} showCursor={false} />;
}

function CodeRenderer({ charCount, showCursor }: { charCount: number; showCursor: boolean }) {
	const rendered: React.ReactNode[] = [];
	let lineNum = 1;
	let lineContent: React.ReactNode[] = [];

	const pushLine = () => {
		rendered.push(
			<div key={`line-${lineNum}`} className="flex">
				<span className="w-5 text-right mr-2 text-gray-600 select-none text-[10px]">{lineNum}</span>
				<span>{lineContent}</span>
			</div>
		);
		lineNum++;
		lineContent = [];
	};

	for (let i = 0; i < charCount; i++) {
		const { char, cls } = ALL_CHARS[i];
		if (char === '\n') {
			pushLine();
		} else {
			lineContent.push(<span key={i} className={cls}>{char}</span>);
		}
	}
	if (showCursor) {
		lineContent.push(
			<motion.span
				key="cursor"
				className="inline-block w-[2px] h-[13px] bg-blue-400 ml-[1px] align-middle"
				animate={{ opacity: [1, 0] }}
				transition={{ duration: 0.7, repeat: Infinity, repeatType: 'reverse' }}
			/>
		);
	}
	if (lineContent.length > 0 || charCount > 0) pushLine();

	return <div className="font-mono text-[10px] leading-[16px] sm:text-[11px] sm:leading-[18px]">{rendered}</div>;
}


// ─── Live runs scatter plot ──────────────────────────────────────────────────

// x: 0-100 within plot area, y: 0 (top/slow) - 100 (bottom/fast)
// Dots shifted down so less dead space at the top of the chart
const SCATTER_DOTS: { x: number; y: number; success: boolean }[] = [
	// Fast runs (~30-100ms)
	{ x: 5, y: 88, success: true },
	{ x: 12, y: 84, success: true },
	{ x: 18, y: 90, success: true },
	{ x: 24, y: 82, success: true },
	{ x: 30, y: 86, success: true },
	{ x: 36, y: 80, success: true },
	{ x: 42, y: 88, success: true },
	// Medium runs (~300ms)
	{ x: 10, y: 62, success: true },
	{ x: 20, y: 58, success: true },
	{ x: 32, y: 65, success: true },
	{ x: 44, y: 60, success: true },
	{ x: 38, y: 56, success: true },
	// Slow runs (~1000-3000ms)
	{ x: 8, y: 35, success: true },
	{ x: 16, y: 30, success: true },
	{ x: 26, y: 33, success: true },
	{ x: 34, y: 28, success: true },
	{ x: 22, y: 38, success: true },
	// Failures
	{ x: 52, y: 50, success: false },
	{ x: 68, y: 40, success: false },
	// Late arrivals
	{ x: 58, y: 86, success: true },
	{ x: 66, y: 82, success: true },
	{ x: 74, y: 88, success: true },
	{ x: 82, y: 76, success: true },
	{ x: 88, y: 84, success: true },
	{ x: 94, y: 90, success: true },
];

const Y_LABELS = [
	{ pct: 25, label: '3s' },
	{ pct: 45, label: '1s' },
	{ pct: 60, label: '300ms' },
	{ pct: 78, label: '100ms' },
	{ pct: 92, label: '10ms' },
];

// Plot area
const PX = 18;
const PW = 180;
const PY = 5;
const PH = 88;

// Group scatter dots by run (3 dots per run)
const DOTS_PER_RUN = 3;

function LiveRunsScatter({ runCount }: { runCount: number }) {
	const visibleCount = Math.min(runCount * DOTS_PER_RUN, SCATTER_DOTS.length);

	const successCount = SCATTER_DOTS.slice(0, visibleCount).filter((d) => d.success).length;
	const failCount = SCATTER_DOTS.slice(0, visibleCount).filter((d) => !d.success).length;

	return (
		<div className="flex flex-col h-full">
			<div className="flex-1 min-h-0">
				<svg viewBox="0 0 200 100" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
					{/* Grid lines + Y labels */}
					{Y_LABELS.map((l) => {
						const ly = PY + (l.pct / 100) * PH;
						return (
							<g key={l.label}>
								<line x1={PX} y1={ly} x2={PX + PW} y2={ly} stroke="#374151" strokeWidth="0.5" />
								<text x={PX - 1.5} y={ly + 1.5} textAnchor="end" fill="#6b7280" fontSize="4" fontFamily="monospace">{l.label}</text>
							</g>
						);
					})}
					{/* Y-axis line */}
					<line x1={PX} y1={PY} x2={PX} y2={PY + PH} stroke="#4b5563" strokeWidth="0.5" />
					<line x1={PX} y1={PY + PH} x2={PX + PW} y2={PY + PH} stroke="#4b5563" strokeWidth="0.5" />
					{/* Dots */}
					{SCATTER_DOTS.slice(0, visibleCount).map((dot, i) => (
						<motion.circle
							key={i}
							cx={PX + (dot.x / 100) * PW}
							cy={PY + (dot.y / 100) * PH}
							r="2.5"
							fill={dot.success ? '#4ade80' : '#f87171'}
							fillOpacity="0.8"
							initial={{ scale: 0, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							transition={{ duration: 0.15 }}
						/>
					))}
				</svg>
			</div>
			<div className="flex items-center justify-between mt-1.5 shrink-0">
				<span className="text-[11px] text-gray-600">last 5 min</span>
				<div className="flex items-center gap-2">
					<span className="text-[11px] text-green-400 font-medium">{successCount} ok</span>
					{failCount > 0 && <span className="text-[11px] text-red-400 font-medium">{failCount} err</span>}
				</div>
			</div>
		</div>
	);
}

// ─── Live counter ────────────────────────────────────────────────────────────

function LiveCounter({ from, to, delay }: { from: number; to: number; delay: number }) {
	const [value, setValue] = useState(from);
	useEffect(() => {
		const start = Date.now();
		const duration = 3000;
		const startDelay = delay * 1000;
		const tick = () => {
			const elapsed = Date.now() - start - startDelay;
			if (elapsed < 0) {
				requestAnimationFrame(tick);
				return;
			}
			const progress = Math.min(elapsed / duration, 1);
			setValue(Math.round(from + (to - from) * progress));
			if (progress < 1) requestAnimationFrame(tick);
		};
		const raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	}, [from, to, delay]);
	return <>{value.toLocaleString()}</>;
}

// ─── Live result JSON ────────────────────────────────────────────────────────

const RESULT_SNAPSHOTS = [
	{
		label: 'input',
		json: [
			{ key: 'charge', value: '"ch_3MqBz2"', color: 'text-green-400' },
			{ key: 'amount', value: '8900', color: 'text-orange-300' },
		],
	},
	{
		label: 'output',
		json: [
			{ key: 'id', value: '"re_3NqKx1"', color: 'text-green-400' },
			{ key: 'status', value: '"ok"', color: 'text-green-400' },
			{ key: 'amount', value: '8900', color: 'text-orange-300' },
		],
	},
];

function LiveResultJson({ runCount }: { runCount: number }) {
	// Toggle every 3 runs instead of every 1
	const snapshotIndex = Math.floor(runCount / 3) % 2 === 0 ? 0 : 1;
	const snapshot = RESULT_SNAPSHOTS[snapshotIndex];

	return (
		<div className="font-mono text-[12px] leading-[22px]">
			<div className="flex items-center gap-1.5 mb-2">
				<span className={`text-[10px] px-2 py-0.5 rounded font-medium ${
					snapshot.label === 'input'
						? 'bg-blue-500/20 text-blue-400'
						: 'bg-green-500/20 text-green-400'
				}`}>
					{snapshot.label}
				</span>
			</div>
			<AnimatePresence mode="wait">
				<motion.div
					key={snapshotIndex}
					initial={{ opacity: 0, y: 6 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -6 }}
					transition={{ duration: 0.25 }}
				>
					<span className="text-white">{'{'}</span>
					{snapshot.json.map((entry, i) => (
						<div key={entry.key} className="pl-4">
							<motion.span
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 0.1 + i * 0.08 }}
							>
								<span className="text-blue-300">"{entry.key}"</span>
								<span className="text-white">: </span>
								<span className={entry.color}>{entry.value}</span>
								{i < snapshot.json.length - 1 && <span className="text-white">,</span>}
							</motion.span>
						</div>
					))}
					<span className="text-white">{'}'}</span>
				</motion.div>
			</AnimatePresence>
		</div>
	);
}

// ─── Live database rows ─────────────────────────────────────────────────────

const DB_ROWS = [
	{ id: '1', customer: 'acme', amount: '$240' },
	{ id: '2', customer: 'globex', amount: '$89' },
	{ id: '3', customer: 'initech', amount: '$1,200' },
	{ id: '4', customer: 'stark', amount: '$560' },
	{ id: '5', customer: 'wayne', amount: '$340' },
	{ id: '6', customer: 'umbrella', amount: '$78' },
	{ id: '7', customer: 'cyberdyne', amount: '$2,100' },
	{ id: '8', customer: 'oscorp', amount: '$430' },
];

function LiveDatabase({ runCount }: { runCount: number }) {
	const visibleCount = Math.min(runCount, DB_ROWS.length);

	return (
		<table className="w-full">
			<thead>
				<tr className="text-[11px] text-gray-500 border-b border-gray-800">
					<th className="text-left pb-2 font-medium">id</th>
					<th className="text-left pb-2 font-medium">customer</th>
					<th className="text-right pb-2 font-medium">amount</th>
				</tr>
			</thead>
			<tbody>
				<AnimatePresence>
					{DB_ROWS.slice(0, visibleCount).map((row) => (
						<motion.tr
							key={row.id}
							initial={{ opacity: 0, y: 8 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.3 }}
							className="text-[12px] border-b border-gray-800/50 last:border-0"
						>
							<td className="py-1.5 text-gray-400 font-mono">{row.id}</td>
							<td className="py-1.5 text-gray-300">{row.customer}</td>
							<td className="py-1.5 text-right text-white font-mono">{row.amount}</td>
						</motion.tr>
					))}
				</AnimatePresence>
			</tbody>
		</table>
	);
}

// ─── Live frontend app ──────────────────────────────────────────────────────

const BAR_DATA = [
	{ label: 'Jan', value: 45, color: '#22d3ee' },
	{ label: 'Feb', value: 72, color: '#22d3ee' },
	{ label: 'Mar', value: 58, color: '#22d3ee' },
	{ label: 'Apr', value: 89, color: '#22d3ee' },
	{ label: 'May', value: 34, color: '#f87171' },
	{ label: 'Jun', value: 95, color: '#22d3ee' },
	{ label: 'Jul', value: 67, color: '#22d3ee' },
];

const MAX_BAR_HEIGHT = 80; // px

function LiveFrontend({ runCount }: { runCount: number }) {
	const visibleBars = Math.min(runCount, BAR_DATA.length);
	const total = BAR_DATA.slice(0, visibleBars).reduce((s, d) => s + d.value, 0);

	return (
		<div className="flex flex-col h-full">
			{/* Header stats */}
			<div className="flex items-center justify-between mb-2 shrink-0">
				<span className="text-[11px] text-gray-500">Refunds processed</span>
				<span className="text-[12px] text-cyan-400 font-mono font-medium">${total.toLocaleString()}</span>
			</div>
			{/* Bar chart */}
			<div className="flex-1 flex items-end gap-2 min-h-0">
				{BAR_DATA.map((bar, i) => (
					<div key={bar.label} className="flex-1 flex flex-col items-center justify-end h-full">
						<motion.div
							className="w-full rounded-t"
							style={{ backgroundColor: bar.color }}
							initial={{ height: 0 }}
							animate={{ height: i < visibleBars ? `${bar.value}%` : 0 }}
							transition={{ duration: 0.4 }}
						/>
						<span className="text-[9px] text-gray-600 mt-1 shrink-0">{bar.label}</span>
					</div>
				))}
			</div>
		</div>
	);
}

// ─── Stripe resource picker ─────────────────────────────────────────────────

const RESOURCE_OPTIONS = [
	{ name: 'stripe_sandbox', token: '\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022' },
	{ name: 'stripe_prod', token: '\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022' },
];

function StripeResourceInput({ active }: { active: boolean }) {
	const [step, setStep] = useState<'closed' | 'open' | 'selected'>('closed');
	const [selected, setSelected] = useState<typeof RESOURCE_OPTIONS[0] | null>(null);
	const hasActivated = React.useRef(false);

	useEffect(() => {
		if (!active || hasActivated.current) return;
		hasActivated.current = true;
		const t1 = setTimeout(() => setStep('open'), 500);
		const t2 = setTimeout(() => {
			setSelected(RESOURCE_OPTIONS[1]);
			setStep('selected');
		}, 1600);
		return () => { clearTimeout(t1); clearTimeout(t2); };
	}, [active]);

	return (
		<div className="px-3 sm:px-4 py-3 bg-[#0d1117]">
			<div className="flex items-center gap-2 mb-2">
				<svg className="w-3.5 h-3.5 text-purple-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
					<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
				</svg>
				<span className="text-[10px] text-gray-400">Resource</span>
				{active && (
					<motion.span
						initial={{ opacity: 0, x: -4 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.3 }}
						className="text-[10px] text-purple-400 font-medium"
					>
						stripe
					</motion.span>
				)}
				{step === 'selected' && (
					<motion.div
						initial={{ opacity: 0, scale: 0.5 }}
						animate={{ opacity: 1, scale: 1 }}
						className="ml-auto flex items-center gap-1"
					>
						<svg className="w-3 h-3 text-green-400" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
							<path d="M3 8l3.5 3.5L13 5" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
						<span className="text-[9px] text-green-400">connected</span>
					</motion.div>
				)}
			</div>
			<div className="flex items-center gap-2">
				<div className="flex-1">
					{/* Select input */}
					<div className="h-6 rounded bg-[#161b22] border border-gray-800 px-2 flex items-center justify-between">
						{selected ? (
							<span className="text-[10px] text-gray-300 font-mono">{selected.name}</span>
						) : (
							<span className="text-[10px] text-gray-600">Select a resource...</span>
						)}
						<svg className="w-3 h-3 text-gray-500" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
							<path d="M3 5l3 3 3-3" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
					</div>
					{/* Inline dropdown options */}
					<AnimatePresence>
						{step === 'open' && (
							<motion.div
								initial={{ opacity: 0, height: 0 }}
								animate={{ opacity: 1, height: 'auto' }}
								exit={{ opacity: 0, height: 0 }}
								transition={{ duration: 0.15 }}
								className="mt-1 rounded bg-[#161b22] border border-gray-700 overflow-hidden"
							>
								{RESOURCE_OPTIONS.map((opt, i) => (
									<motion.div
										key={opt.name}
										initial={{ opacity: 0, x: -8 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ delay: 0.1 + i * 0.1 }}
										className={`px-2 py-1.5 flex items-center gap-2 ${i === 1 ? 'bg-blue-600/20' : ''}`}
									>
										<div className={`w-1.5 h-1.5 rounded-full ${i === 1 ? 'bg-green-400' : 'bg-gray-600'}`} />
										<span className="text-[10px] text-gray-300 font-mono">{opt.name}</span>
										<span className="text-[9px] text-gray-600 ml-auto">{opt.token}</span>
									</motion.div>
								))}
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</div>
		</div>
	);
}

// ─── Trigger picker ─────────────────────────────────────────────────────────

const TRIGGER_TYPES = [
	{
		name: 'Schedule',
		icon: (
			<svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
				<circle cx="12" cy="12" r="10" />
				<path d="M12 6v6l4 2" />
			</svg>
		),
	},
	{
		name: 'Webhook',
		icon: <Webhook className="w-3.5 h-3.5" />,
	},
	{
		name: 'Email',
		icon: (
			<svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
				<rect x="2" y="4" width="20" height="16" rx="2" />
				<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
			</svg>
		),
	},
	{
		name: 'CLI',
		icon: (
			<svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
				<polyline points="4 17 10 11 4 5" />
				<line x1="12" y1="19" x2="20" y2="19" />
			</svg>
		),
	},
];

function TriggerPicker({ active }: { active: boolean }) {
	const [step, setStep] = useState<'icons' | 'selected' | 'configured'>('icons');
	const hasActivated = React.useRef(false);

	useEffect(() => {
		if (!active || hasActivated.current) return;
		hasActivated.current = true;
		const t1 = setTimeout(() => setStep('selected'), 600);
		const t2 = setTimeout(() => setStep('configured'), 1600);
		return () => { clearTimeout(t1); clearTimeout(t2); };
	}, [active]);

	return (
		<div className="px-3 sm:px-4 py-3 bg-[#0d1117]">
			<div className="flex items-center gap-2 mb-2">
				<svg className="w-3.5 h-3.5 text-cyan-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
					<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round" />
				</svg>
				<span className="text-[10px] text-gray-400">Trigger</span>
				{step !== 'icons' && (
					<motion.span
						initial={{ opacity: 0, x: -4 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.3 }}
						className="text-[10px] text-cyan-400 font-medium"
					>
						webhook
					</motion.span>
				)}
				{step === 'configured' && (
					<motion.div
						initial={{ opacity: 0, scale: 0.5 }}
						animate={{ opacity: 1, scale: 1 }}
						className="ml-auto flex items-center gap-1"
					>
						<svg className="w-3 h-3 text-green-400" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
							<path d="M3 8l3.5 3.5L13 5" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
						<span className="text-[9px] text-green-400">configured</span>
					</motion.div>
				)}
			</div>

			<div className="flex-1">
				{/* Select input */}
				<div className="h-6 rounded bg-[#161b22] border border-gray-800 px-2 flex items-center justify-between">
					{step === 'configured' ? (
						<span className="text-[10px] text-gray-300 font-mono flex items-center gap-1.5">
							<Webhook className="w-3 h-3 text-cyan-400 shrink-0" />
							Webhook — POST /api/w/demo/jobs/run_wait_result/f/stripe/refund
						</span>
					) : (
						<span className="text-[10px] text-gray-600">Select a trigger...</span>
					)}
					<svg className="w-3 h-3 text-gray-500" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
						<path d="M3 5l3 3 3-3" strokeLinecap="round" strokeLinejoin="round" />
					</svg>
				</div>
				{/* Dropdown options */}
				<AnimatePresence>
					{step === 'selected' && (
						<motion.div
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: 'auto' }}
							exit={{ opacity: 0, height: 0 }}
							transition={{ duration: 0.15 }}
							className="mt-1 rounded bg-[#161b22] border border-gray-700 overflow-hidden"
						>
							{TRIGGER_TYPES.map((t, i) => (
								<motion.div
									key={t.name}
									initial={{ opacity: 0, x: -8 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: 0.1 + i * 0.08 }}
									className={`px-2 py-1.5 flex items-center gap-2 ${i === 1 ? 'bg-blue-600/20' : ''}`}
								>
									<span className={i === 1 ? 'text-cyan-400' : 'text-gray-500'}>{t.icon}</span>
									<span className={`text-[10px] font-mono ${i === 1 ? 'text-gray-300' : 'text-gray-500'}`}>{t.name}</span>
								</motion.div>
							))}
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</div>
	);
}

// ─── Main component ─────────────────────────────────────────────────────────

// expanding: Windmill icon grows into full IDE
// typing: code types out
// ready: blur + Deploy button
// deploying: shrinks back into Windmill logo
// monitoring: expands into monitoring dashboard

type Phase = 'expanding' | 'typing' | 'resource' | 'trigger' | 'ready' | 'pushing' | 'deploying' | 'monitoring';

export default function HeroAnimation() {
	const [phase, setPhase] = useState<Phase>('expanding');

	const handleTypingComplete = useCallback(() => {
		setPhase('resource');
	}, []);

	const handleDeploy = useCallback(() => {
		if (phase !== 'ready') return;
		setPhase('deploying');
	}, [phase]);

	// Expanding -> typing
	useEffect(() => {
		if (phase !== 'expanding') return;
		const timeout = setTimeout(() => setPhase('typing'), 800);
		return () => clearTimeout(timeout);
	}, [phase]);

	// Resource -> trigger
	useEffect(() => {
		if (phase !== 'resource') return;
		const timeout = setTimeout(() => setPhase('trigger'), 2000);
		return () => clearTimeout(timeout);
	}, [phase]);

	// Trigger -> ready
	useEffect(() => {
		if (phase !== 'trigger') return;
		const timeout = setTimeout(() => setPhase('ready'), 3000);
		return () => clearTimeout(timeout);
	}, [phase]);

	// Auto-push then deploy
	useEffect(() => {
		if (phase !== 'ready') return;
		const timeout = setTimeout(() => setPhase('pushing'), 1200);
		return () => clearTimeout(timeout);
	}, [phase]);

	useEffect(() => {
		if (phase !== 'pushing') return;
		const timeout = setTimeout(() => setPhase('deploying'), 400);
		return () => clearTimeout(timeout);
	}, [phase]);

	// Deploying -> monitoring
	useEffect(() => {
		if (phase !== 'deploying') return;
		const timeout = setTimeout(() => setPhase('monitoring'), 1400);
		return () => clearTimeout(timeout);
	}, [phase]);

	// Animation does not restart — stays on monitoring

	// Shared run counter for syncing dashboards
	const [runCount, setRunCount] = useState(0);

	useEffect(() => {
		if (phase !== 'monitoring') {
			setRunCount(0);
			return;
		}
		// First run immediately, then one every 1s
		setRunCount(1);
		let count = 1;
		const interval = setInterval(() => {
			count++;
			setRunCount(count);
			if (count >= DB_ROWS.length) clearInterval(interval);
		}, 1000);
		return () => clearInterval(interval);
	}, [phase]);

	const isSmall = phase === 'expanding' || phase === 'deploying';
	const showIde = phase === 'typing' || phase === 'resource' || phase === 'trigger' || phase === 'ready' || phase === 'pushing';
	const showMonitoring = phase === 'monitoring';

	return (
		<div className="w-full min-h-[540px] sm:min-h-[620px] flex items-center justify-center relative">
			<motion.div
				className="relative overflow-hidden border flex items-center justify-center"
				initial={{ width: 96, height: 96, borderRadius: 20, borderColor: 'transparent', backgroundColor: 'transparent', boxShadow: 'none' }}
				animate={
					isSmall
						? phase === 'deploying'
							? { width: 96, height: 96, borderRadius: 48, borderColor: 'transparent', backgroundColor: 'transparent', boxShadow: 'none' }
							: { width: 96, height: 96, borderRadius: 20, borderColor: 'transparent', backgroundColor: 'transparent', boxShadow: 'none' }
						: showMonitoring
							? { width: 96, height: 96, borderRadius: 48, borderColor: 'transparent', backgroundColor: 'transparent', boxShadow: 'none' }
							: { width: '100%', height: 'auto', borderRadius: 12, borderColor: '#1f2937', backgroundColor: '#0d1117', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)' }
				}
				transition={{
					duration: phase === 'deploying' ? 0.8 : phase === 'monitoring' ? 0.7 : phase === 'expanding' ? 0.6 : 0.6,
					ease: [0.4, 0, 0.2, 1],
				}}
			>
				{/* IDE content */}
				<motion.div
					className="w-full"
					animate={{
						opacity: showIde ? 1 : 0,
						filter: phase === 'ready' || phase === 'pushing' ? 'blur(3px)' : 'blur(0px)',
					}}
					transition={{ duration: showIde ? 0.3 : 0.15, delay: showIde ? 0.3 : 0 }}
				>
					{/* Title bar */}
					<div className="flex items-center px-3 py-2 bg-[#161b22] border-b border-gray-800 gap-2">
						<div className="flex gap-1.5">
							<div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
							<div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
							<div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
						</div>
						<div className="flex items-center gap-1.5 ml-2">
							<img src="/img/windmill.svg" alt="Windmill" className="h-3.5 w-3.5" />
							<span className="text-[11px] text-gray-400 font-mono">f/stripe/refund.ts</span>
						</div>
					</div>
					{/* Code */}
					<div className="p-3 sm:p-4 min-h-[280px] sm:min-h-[300px] flex flex-col">
						{phase === 'typing' ? (
							<TypingCode onComplete={handleTypingComplete} />
						) : (
							<StaticCode />
						)}
					</div>
					{/* Resource input — visible during typing (empty), activates on resource phase */}
					<div className="border-t border-gray-800">
						<StripeResourceInput active={phase === 'resource' || phase === 'trigger' || phase === 'ready'} />
					</div>
					{/* Trigger picker — visible during typing (empty), activates on trigger phase */}
					<div className="border-t border-gray-800">
						<TriggerPicker active={phase === 'trigger' || phase === 'ready'} />
					</div>
				</motion.div>

				{/* Deploy button */}
				<AnimatePresence>
					{(phase === 'ready' || phase === 'pushing') && (
						<motion.div
							className="absolute inset-0 flex items-center justify-center z-10"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.2 }}
						>
							<motion.button
								initial={{ scale: 0.8 }}
								animate={{ scale: phase === 'pushing' ? 0.92 : 1 }}
								exit={{ scale: 0.8 }}
								transition={{ duration: phase === 'pushing' ? 0.12 : 0.2 }}
								onClick={handleDeploy}
								className="bg-blue-700 text-white hover:bg-blue-800 cursor-pointer shadow-xl shadow-blue-700/30 px-6 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2"
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
							>
								<img src="/img/windmill.svg" alt="" className="w-4 h-4" />
								Deploy
							</motion.button>
						</motion.div>
					)}
				</AnimatePresence>

				{/* Windmill logo - visible during deploying, spinning */}
				<motion.div
					className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
					animate={{ opacity: phase === 'deploying' ? 1 : 0 }}
					transition={{ duration: 0.2, delay: phase === 'deploying' ? 0.2 : 0 }}
				>
					<img
						src="/img/windmill.svg"
						alt="Windmill"
						className={`w-16 h-16 sm:w-20 sm:h-20 ${phase === 'deploying' ? 'animate-spin' : ''}`}
						style={{ animationDuration: '3s' }}
					/>
				</motion.div>

				{/* Windmill icon - visible when starting small */}
				<motion.div
					className="absolute inset-0 flex items-center justify-center pointer-events-none"
					animate={{ opacity: phase === 'expanding' ? 1 : 0 }}
					transition={{ duration: phase === 'expanding' ? 0.1 : 0.2 }}
				>
					<img src="/img/windmill.svg" alt="Windmill" className="w-20 h-20" />
				</motion.div>
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
							<motion.path
								d="M4.5 8 L7 10.5 L11.5 5.5"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
								fill="none"
								initial={{ pathLength: 0 }}
								animate={{ pathLength: 1 }}
								transition={{ duration: 0.4, delay: 0.6 }}
							/>
						</motion.svg>
						<span>Deployment successful</span>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Monitoring phase - two bordered sections: workers + platform */}
			<AnimatePresence>
				{showMonitoring && (
					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.95 }}
						transition={{ duration: 0.5 }}
						className="absolute inset-0 flex flex-col gap-3 p-2"
					>
						{/* Section 1: Windmill workers — bordered with floating label */}
						<motion.div
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.2, duration: 0.4 }}
							className="relative rounded-xl border border-gray-700 p-4 pt-5 shrink-0"
						>
							<span className="absolute -top-2.5 left-4 px-2 bg-[#0a0f18] text-[11px] font-medium text-gray-400 uppercase tracking-wider">Windmill workers</span>
							<div className="flex flex-col items-center">
								<div className="flex items-center gap-2.5">
									<img
										src="/img/windmill.svg"
										alt="Windmill"
										className="w-7 h-7 animate-spin"
										style={{ animationDuration: '3s' }}
									/>
									<div className="flex items-center gap-2">
										<span className="text-sm font-mono text-gray-300">f/stripe/refund.ts</span>
										<div className="flex items-center gap-1">
											<div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
											<span className="text-[10px] text-green-400">live</span>
										</div>
									</div>
								</div>
							</div>
						</motion.div>

						{/* Section 2: Windmill platform — bordered with floating label */}
						<motion.div
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.4, duration: 0.4 }}
							className="relative rounded-xl border border-gray-700 p-3 pt-5 flex-1 min-h-0"
						>
							<span className="absolute -top-2.5 left-4 px-2 bg-[#0a0f18] text-[11px] font-medium text-gray-400 uppercase tracking-wider">Windmill platform</span>

							{/* Dashboard grid */}
							<div className="h-full grid grid-cols-2 grid-rows-2 gap-2">
								{/* Dashboard: Runs (top-left) */}
								<motion.div
									initial={{ opacity: 0, scale: 0.8, x: 30 }}
									animate={{ opacity: 1, scale: 1, x: 0 }}
									transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
									className="rounded-xl border border-gray-800 bg-[#0d1117] shadow-lg overflow-hidden flex flex-col"
								>
									<div className="px-2.5 py-1.5 bg-[#161b22] border-b border-gray-800 flex items-center gap-1.5 shrink-0">
										<div className="w-2 h-2 rounded-full bg-green-400" />
										<span className="text-sm text-gray-400 font-medium">Runs</span>
									</div>
									<div className="p-2 sm:p-2.5 flex-1 min-h-0 flex flex-col justify-center">
										<LiveRunsScatter runCount={runCount} />
									</div>
								</motion.div>

								{/* Dashboard: Result (top-right) */}
								<motion.div
									initial={{ opacity: 0, scale: 0.8, x: -30 }}
									animate={{ opacity: 1, scale: 1, x: 0 }}
									transition={{ delay: 0.65, type: 'spring', stiffness: 200 }}
									className="rounded-xl border border-gray-800 bg-[#0d1117] shadow-lg overflow-hidden flex flex-col"
								>
									<div className="px-2.5 py-1.5 bg-[#161b22] border-b border-gray-800 flex items-center gap-1.5 shrink-0">
										<div className="w-2 h-2 rounded-full bg-purple-400" />
										<span className="text-sm text-gray-400 font-medium">Result</span>
									</div>
									<div className="p-2 sm:p-2.5 flex-1 min-h-0 flex flex-col justify-center overflow-hidden">
										<LiveResultJson runCount={runCount} />
									</div>
								</motion.div>

								{/* Dashboard: Database (bottom-left) */}
								<motion.div
									initial={{ opacity: 0, scale: 0.8, y: -20 }}
									animate={{ opacity: 1, scale: 1, y: 0 }}
									transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
									className="rounded-xl border border-gray-800 bg-[#0d1117] shadow-lg overflow-hidden flex flex-col"
								>
									<div className="px-2.5 py-1.5 bg-[#161b22] border-b border-gray-800 flex items-center gap-1.5 shrink-0">
										<div className="w-2 h-2 rounded-full bg-amber-400" />
										<span className="text-sm text-gray-400 font-medium">Database</span>
									</div>
									<div className="p-2 sm:p-2.5 flex-1 min-h-0 flex flex-col justify-center overflow-hidden">
										<LiveDatabase runCount={runCount} />
									</div>
								</motion.div>

								{/* Dashboard: Frontend (bottom-right) */}
								<motion.div
									initial={{ opacity: 0, scale: 0.8, y: -20 }}
									animate={{ opacity: 1, scale: 1, y: 0 }}
									transition={{ delay: 0.95, type: 'spring', stiffness: 200 }}
									className="rounded-xl border border-gray-800 bg-[#0d1117] shadow-lg overflow-hidden flex flex-col"
								>
									<div className="px-2.5 py-1.5 bg-[#161b22] border-b border-gray-800 flex items-center gap-1.5 shrink-0">
										<div className="w-2 h-2 rounded-full bg-cyan-400" />
										<span className="text-sm text-gray-400 font-medium">Frontend</span>
									</div>
									<div className="p-2 sm:p-2.5 flex-1 min-h-0 flex flex-col overflow-hidden">
										<LiveFrontend runCount={runCount} />
									</div>
								</motion.div>
							</div>
						</motion.div>

					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}

// ─── Simplified version: monitoring only (no IDE) ────────────────────────────

export function HeroAnimationSimplified() {
	const [runCount, setRunCount] = useState(0);

	useEffect(() => {
		setRunCount(1);
		let count = 1;
		const interval = setInterval(() => {
			count++;
			setRunCount(count);
			if (count >= DB_ROWS.length) clearInterval(interval);
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	return (
		<div className="w-full min-h-[540px] sm:min-h-[620px] flex items-center justify-center relative">
			<div className="absolute inset-0 flex flex-col gap-3 p-2">
				{/* Section 1: Windmill workers */}
				<div className="relative rounded-xl border border-gray-700 p-4 pt-5 shrink-0">
					<span className="absolute -top-2.5 left-4 px-2 bg-[#0a0f18] text-[11px] font-medium text-gray-400 uppercase tracking-wider">Windmill workers</span>
					<div className="flex flex-col items-center">
						<div className="flex items-center gap-2.5">
							<img
								src="/img/windmill.svg"
								alt="Windmill"
								className="w-7 h-7 animate-spin"
								style={{ animationDuration: '3s' }}
							/>
							<div className="flex items-center gap-2">
								<span className="text-sm font-mono text-gray-300">my_script.ts</span>
								<div className="flex items-center gap-1">
									<div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
									<span className="text-[10px] text-green-400">live</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Section 2: Windmill platform */}
				<div className="relative rounded-xl border border-gray-700 p-3 pt-5 flex-1 min-h-0">
					<span className="absolute -top-2.5 left-4 px-2 bg-[#0a0f18] text-[11px] font-medium text-gray-400 uppercase tracking-wider">Windmill platform</span>

					<div className="h-full grid grid-cols-2 grid-rows-2 gap-2">
						{/* Runs */}
						<div className="rounded-xl border border-gray-800 bg-[#0d1117] shadow-lg overflow-hidden flex flex-col">
							<div className="px-2.5 py-1.5 bg-[#161b22] border-b border-gray-800 flex items-center gap-1.5 shrink-0">
								<div className="w-2 h-2 rounded-full bg-green-400" />
								<span className="text-sm text-gray-400 font-medium">Runs</span>
							</div>
							<div className="p-2 sm:p-2.5 flex-1 min-h-0 flex flex-col justify-center">
								<LiveRunsScatter runCount={runCount} />
							</div>
						</div>

						{/* Result */}
						<div className="rounded-xl border border-gray-800 bg-[#0d1117] shadow-lg overflow-hidden flex flex-col">
							<div className="px-2.5 py-1.5 bg-[#161b22] border-b border-gray-800 flex items-center gap-1.5 shrink-0">
								<div className="w-2 h-2 rounded-full bg-purple-400" />
								<span className="text-sm text-gray-400 font-medium">Result</span>
							</div>
							<div className="p-2 sm:p-2.5 flex-1 min-h-0 flex flex-col justify-center overflow-hidden">
								<LiveResultJson runCount={runCount} />
							</div>
						</div>

						{/* Database */}
						<div className="rounded-xl border border-gray-800 bg-[#0d1117] shadow-lg overflow-hidden flex flex-col">
							<div className="px-2.5 py-1.5 bg-[#161b22] border-b border-gray-800 flex items-center gap-1.5 shrink-0">
								<div className="w-2 h-2 rounded-full bg-amber-400" />
								<span className="text-sm text-gray-400 font-medium">Database</span>
							</div>
							<div className="p-2 sm:p-2.5 flex-1 min-h-0 flex flex-col justify-center overflow-hidden">
								<LiveDatabase runCount={runCount} />
							</div>
						</div>

						{/* Frontend */}
						<div className="rounded-xl border border-gray-800 bg-[#0d1117] shadow-lg overflow-hidden flex flex-col">
							<div className="px-2.5 py-1.5 bg-[#161b22] border-b border-gray-800 flex items-center gap-1.5 shrink-0">
								<div className="w-2 h-2 rounded-full bg-cyan-400" />
								<span className="text-sm text-gray-400 font-medium">Frontend</span>
							</div>
							<div className="p-2 sm:p-2.5 flex-1 min-h-0 flex flex-col overflow-hidden">
								<LiveFrontend runCount={runCount} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export { HeroAnimation as HeroAnimationA };

// Export sub-components for reuse in test pages
export {
	TypingCode,
	StaticCode,
	StripeResourceInput,
	TriggerPicker,
	LiveRunsScatter,
	LiveResultJson,
	LiveDatabase,
	LiveFrontend,
	DB_ROWS,
};
