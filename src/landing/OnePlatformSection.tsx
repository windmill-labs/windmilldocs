import React, { useState, useRef, useEffect } from 'react';
import Link from '@docusaurus/Link';
import { motion, useInView } from 'framer-motion';
import {
	ArrowRight,
	Code2,
	Database,
	LayoutGrid,
	Terminal,
	Play,
	Cpu,
	GitBranch,
	Bot,
	Shield,
	Activity,
	BookOpen
} from 'lucide-react';
import LandingSection from './LandingSection';

const fadeIn = {
	initial: { opacity: 0, y: 30 },
	whileInView: { opacity: 1, y: 0 },
	viewport: { once: true },
	transition: { duration: 0.5 }
};

const codeLines = [
	{ tokens: [{ text: 'import ', color: 'text-purple-400' }, { text: 'wmill ', color: 'text-blue-300' }, { text: 'from ', color: 'text-purple-400' }, { text: "'windmill-client'", color: 'text-amber-300' }] },
	{ tokens: [] },
	{ tokens: [{ text: 'export async function ', color: 'text-purple-400' }, { text: 'main', color: 'text-blue-300' }, { text: '(', color: 'text-gray-400' }] },
	{ tokens: [{ text: '  db', color: 'text-orange-300' }, { text: ': ', color: 'text-gray-400' }, { text: 'Postgresql', color: 'text-emerald-300' }, { text: ',', color: 'text-gray-400' }] },
	{ tokens: [{ text: '  slack', color: 'text-orange-300' }, { text: ': ', color: 'text-gray-400' }, { text: 'Slack', color: 'text-emerald-300' }] },
	{ tokens: [{ text: ') {', color: 'text-gray-400' }] },
	{ tokens: [{ text: '  const ', color: 'text-purple-400' }, { text: 'rows ', color: 'text-blue-300' }, { text: '= ', color: 'text-gray-400' }, { text: 'await ', color: 'text-purple-400' }, { text: 'db', color: 'text-orange-300' }, { text: '.query(', color: 'text-gray-400' }, { text: "'SELECT ...'", color: 'text-amber-300' }, { text: ')', color: 'text-gray-400' }] },
	{ tokens: [{ text: '  await ', color: 'text-purple-400' }, { text: 'slack', color: 'text-orange-300' }, { text: '.post(', color: 'text-gray-400' }, { text: "'#alerts'", color: 'text-amber-300' }, { text: ', rows)', color: 'text-gray-400' }] },
	{ tokens: [{ text: '}', color: 'text-gray-400' }] },
];

const boilerplateLayers = [
	{ label: 'Backend', detail: 'Runs in dedicated workers', icon: Code2, expanded: 'Scripts run on isolated workers with configurable CPU, memory and timeout. Support for TypeScript, Python, Go, SQL, Bash, PHP, Rust and more. No container orchestration to manage.' },
	{ label: 'Frontend', detail: 'React / Vue / Svelte on the platform', icon: LayoutGrid, expanded: 'Import your own React, Vue or Svelte codebase. Windmill serves it with built-in routing, auth and direct access to backend scripts. No separate hosting or API gateway.' },
	{ label: 'Storage', detail: 'Built-in data tables + integration', icon: Database, expanded: 'Built-in data tables for zero-setup SQL storage. Connect to PostgreSQL, MySQL, BigQuery, Snowflake or S3 via shared resources. Query with DuckDB or Ducklake.' },
	{ label: 'Observability', detail: 'Execution history, logs, error handlers', icon: Activity, expanded: 'Every execution is logged with input, output, duration and errors. Configurable retries with exponential backoff. Custom error handler scripts per step.' },
	{ label: 'Enterprise', detail: 'RBAC, SSO, audit logs, self-host', icon: Shield, expanded: 'Granular role-based access control. SSO with SAML, OAuth and LDAP. Full audit trail of every action. Self-host on your own infrastructure, including air-gapped deployments.' },
	{ label: 'AI integration', detail: 'Claude Code / Codex in the IDE, sandboxes', icon: Bot, expanded: 'Generate scripts and apps with Claude Code or Codex directly in the editor. Run AI agents in isolated sandboxes with controlled access to resources. AI-assisted development that deploys instantly on the production engine.' },
	{ label: 'Workflow engine', detail: 'Flows, schedules, triggers, AI agents', icon: Cpu, expanded: 'Chain scripts into flows with parallel branches, approval steps and loops. Trigger via cron, webhooks, Kafka, Postgres CDC or custom events.' },
	{ label: 'Deployment', detail: 'One-click deploy, no CI/CD to configure', icon: Play, expanded: 'Deploy scripts, flows and apps in one click from the UI or via CLI. No Docker builds, no CI pipelines to maintain. Git sync with GitHub or GitLab for automated deployments.' },
	{ label: 'Versioning', detail: 'Git sync, rollback', icon: GitBranch, expanded: 'Every script and flow is versioned. Sync with GitHub or GitLab. Roll back to any previous version instantly from the UI.' },
];

function BoilerplateAnimation() {
	const [view, setView] = useState('local');
	const [openLayer, setOpenLayer] = useState<number | null>(null);

	const sectionRef = useRef(null);
	const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
	const [phase, setPhase] = useState(0);
	const [typedChars, setTypedChars] = useState(0);

	const allText = codeLines.map((line) => line.tokens.map((t) => t.text).join('') || ' ').join('\n');
	const totalChars = allText.length;

	useEffect(() => {
		if (isInView && phase === 0) setPhase(1);
	}, [isInView]);

	useEffect(() => {
		if (phase !== 1) return;
		const speed = 12;
		const interval = setInterval(() => {
			setTypedChars((prev) => {
				if (prev >= totalChars) {
					clearInterval(interval);
					setTimeout(() => setPhase(2), 400);
					return totalChars;
				}
				return prev + 1;
			});
		}, speed);
		return () => clearInterval(interval);
	}, [phase, totalChars]);

	useEffect(() => {
		if (phase === 2) {
			const t = setTimeout(() => setPhase(3), 800);
			return () => clearTimeout(t);
		}
	}, [phase]);

	const renderTypedLines = () => {
		let charsSoFar = 0;
		return codeLines.map((line, i) => {
			const lineText = line.tokens.map((t) => t.text).join('') || ' ';
			const lineStart = charsSoFar;
			charsSoFar += lineText.length + 1;
			const lineVisible = typedChars > lineStart;
			const lineCharsShown = Math.max(0, Math.min(lineText.length, typedChars - lineStart));
			if (!lineVisible) return (
				<div key={i} className="flex h-[1.75em]">
					<span className="text-gray-600 w-8 text-right mr-4 select-none opacity-0">{i + 1}</span>
				</div>
			);
			let tokCharsSoFar = 0;
			const renderedTokens: React.ReactNode[] = [];
			for (const token of line.tokens) {
				if (tokCharsSoFar >= lineCharsShown) break;
				const visibleLen = Math.min(token.text.length, lineCharsShown - tokCharsSoFar);
				renderedTokens.push(
					<span key={renderedTokens.length} className={token.color} style={{ whiteSpace: 'pre' }}>{token.text.slice(0, visibleLen)}</span>
				);
				tokCharsSoFar += token.text.length;
			}
			return (
				<div key={i} className="flex">
					<span className="text-gray-600 w-8 text-right mr-4 select-none">{i + 1}</span>
					{line.tokens.length === 0 ? <span>&nbsp;</span> : renderedTokens}
					{lineCharsShown < lineText.length && (
						<span className="inline-block w-[2px] h-[1.1em] bg-gray-300 ml-[1px] animate-pulse" />
					)}
				</div>
			);
		});
	};

	return (
		<div ref={sectionRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
			{/* Left: code editor + connector */}
			<div className="flex flex-col">
			<div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-950 overflow-hidden flex-1 flex flex-col">
				<div className="flex items-center gap-2 px-4 py-3 border-b border-gray-800 bg-gray-900">
					<div className="flex gap-1.5">
						<span className="w-3 h-3 rounded-full bg-red-500/80" />
						<span className="w-3 h-3 rounded-full bg-yellow-500/80" />
						<span className="w-3 h-3 rounded-full bg-green-500/80" />
					</div>
					<span className="text-sm font-semibold text-gray-300 ml-2">Write your business logic</span>
					<div className="flex ml-auto rounded-lg bg-gray-800 p-0.5">
						<button
							onClick={() => setView('local')}
							className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
								view === 'local'
									? 'bg-gray-700 text-white'
									: 'text-gray-400 hover:text-gray-300'
							}`}
						>
							<Terminal className="w-3.5 h-3.5" />
							Local dev
						</button>
						<button
							onClick={() => setView('windmill')}
							className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
								view === 'windmill'
									? 'bg-gray-700 text-white'
									: 'text-gray-400 hover:text-gray-300'
							}`}
						>
							<img src="/img/windmill.svg" alt="Windmill" className="w-3.5 h-3.5" />
							Windmill UI
						</button>
					</div>
				</div>
				{view === 'local' ? (
					<div className="p-6 font-mono text-sm leading-relaxed flex-1 flex flex-col justify-center">
						{phase >= 1 ? renderTypedLines() : (
							codeLines.map((_, i) => (
								<div key={i} className="flex h-[1.75em]">
									<span className="text-gray-600 w-8 text-right mr-4 select-none opacity-0">{i + 1}</span>
								</div>
							))
						)}
						<p className={`text-xs text-gray-500 mt-6 transition-opacity duration-500 ${typedChars >= totalChars ? 'opacity-100' : 'opacity-0'}`}>
							Code locally with Windmill CLI, VS Code extension, skills and plug-in.
						</p>
					</div>
				) : (
					<div className="p-6 flex-1 flex flex-col justify-center">
						<div className="w-full rounded-lg bg-gray-800 border border-gray-700 overflow-hidden">
							<img src="/img/money-pages/scripts-preview.webp" alt="Windmill script editor" className="w-full object-cover object-top" />
						</div>
						<p className="text-xs text-gray-500 mt-4">Same script, deployed and managed in the Windmill UI.</p>
					</div>
				)}
			</div>

			{/* Connector: vertical line → big pill → L-arrow right */}
			<motion.div
				className="hidden lg:flex flex-col items-center"
				initial={{ opacity: 0 }}
				animate={phase >= 2 ? { opacity: 1 } : { opacity: 0 }}
				transition={{ duration: 0.5 }}
			>
				<motion.div
					className="w-[2.5px] bg-blue-400 dark:bg-blue-500 rounded-full"
					initial={{ height: 0 }}
					animate={phase >= 2 ? { height: 32 } : { height: 0 }}
					transition={{ duration: 0.3 }}
				/>
				<svg className="w-4 h-3 -mt-[1px]" viewBox="0 0 16 12" fill="none">
					<path d="M 2 0 L 8 10 L 14 0" className="fill-blue-400 dark:fill-blue-500" />
				</svg>

				<div className="flex items-center mt-2" style={{ width: 'calc(100% + 4rem)' }}>
					<div className="flex-1" />
					<motion.div
						className="flex items-center gap-4 px-8 py-5 rounded-2xl bg-blue-50 dark:bg-blue-950/50 border-2 border-blue-200 dark:border-blue-800 shadow-md flex-shrink-0"
						initial={{ scale: 0.9, opacity: 0 }}
						animate={phase >= 2 ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
						transition={{ duration: 0.4, delay: 0.2 }}
					>
						<motion.img
							src="/img/windmill.svg"
							alt="Windmill"
							className="w-14 h-14"
							animate={phase >= 2 ? { rotate: 360 } : {}}
							transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
						/>
						<span className="text-xl font-bold text-blue-700 dark:text-blue-300">Windmill runs it</span>
					</motion.div>
					<div className="flex items-center flex-1 ml-2 overflow-hidden">
						<motion.div
							className="h-[2.5px] bg-gradient-to-r from-blue-400/40 to-blue-500 dark:from-blue-500/40 dark:to-blue-400 rounded-full origin-left"
							initial={{ scaleX: 0 }}
							animate={phase >= 2 ? { scaleX: 1 } : { scaleX: 0 }}
							transition={{ duration: 0.5, delay: 0.5 }}
							style={{ width: '100%' }}
						/>
						<motion.svg
							className="w-4 h-6 -ml-[1px] flex-shrink-0"
							viewBox="0 0 16 24"
							fill="none"
							initial={{ opacity: 0 }}
							animate={phase >= 2 ? { opacity: 1 } : { opacity: 0 }}
							transition={{ duration: 0.2, delay: 0.95 }}
						>
							<path d="M 0 4 L 14 12 L 0 20" fill="#3b82f6" />
						</motion.svg>
					</div>
				</div>
			</motion.div>
			</div>

			{/* Right: layers */}
			<div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 overflow-hidden">
				<motion.div
					className="flex items-center gap-2 px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
					initial={{ opacity: 0 }}
					animate={phase >= 3 ? { opacity: 1 } : { opacity: 0 }}
					transition={{ duration: 0.4 }}
				>
					<img src="/img/windmill.svg" alt="Windmill" className="w-5 h-5" />
					<span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Windmill provides all the platform layers</span>
				</motion.div>
				<div className="p-6 flex flex-col gap-3">
					{boilerplateLayers.map((layer, i) => {
						const isOpen = openLayer === i;
						return (
							<motion.div
								key={layer.label}
								className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 overflow-hidden"
								initial={{ opacity: 0, x: 30 }}
								animate={phase >= 3 ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
								transition={{ duration: 0.35, delay: i * 0.08 }}
							>
								<button
									onClick={() => setOpenLayer(isOpen ? null : i)}
									className="flex items-center gap-3 px-4 py-3 w-full text-left"
								>
									<div className="w-1 h-8 rounded-full bg-emerald-500" />
									<layer.icon className="w-5 h-5 text-blue-500 flex-shrink-0" />
									<div className="flex-1 min-w-0">
										<span className="text-sm font-medium text-gray-900 dark:text-white">{layer.label}</span>
										<span className="text-xs text-gray-500 dark:text-gray-400 ml-2">{layer.detail}</span>
									</div>
									<ArrowRight className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`} />
								</button>
								{isOpen && (
									<div className="px-4 pb-4 pt-0 ml-[44px]">
										<p className="text-sm text-gray-600 dark:text-gray-300">{layer.expanded}</p>
										{layer.docLink && (
											<div className="flex justify-end mt-1.5">
												<a href={layer.docLink} className="inline-flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:underline !no-underline hover:!underline"><BookOpen className="w-3.5 h-3.5" /> {layer.docLabel || 'Read the docs'}</a>
											</div>
										)}
									</div>
								)}
							</motion.div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default function OnePlatformSection() {
	return (
		<LandingSection bgClass="py-0">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-0 pb-24">
				<motion.div {...fadeIn} className="mb-12">
					<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
						One platform, no infrastructure overhead
					</h2>
					<p className="text-lg text-gray-600 dark:text-gray-300">
						No separate tools for backend, frontend, storage, monitoring and deployment. Windmill provides them all as built-in layers, natively integrated, no glue code required.{' '}
						<Link to="/docs/advanced/self_host" className="text-blue-600 dark:text-blue-400 hover:underline">Self-host</Link> or use Windmill Cloud.
					</p>
				</motion.div>

				<BoilerplateAnimation />
			</div>
		</LandingSection>
	);
}
