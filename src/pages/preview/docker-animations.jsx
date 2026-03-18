import React, { useRef, useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import { motion, useInView } from 'framer-motion';
import { Shield, Cpu, HardDrive, Wifi, WifiOff, Lock, Box, Layers, Container } from 'lucide-react';

// ─── Option A: NSJAIL boundary diagram ───

function OptionA() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.3 });

	const restrictions = [
		{ key: 'fs', icon: <HardDrive className="w-4 h-4" />, label: 'Filesystem isolation' },
		{ key: 'net', icon: <WifiOff className="w-4 h-4" />, label: 'Network restrictions' },
		{ key: 'cpu', icon: <Cpu className="w-4 h-4" />, label: 'CPU / Memory / Disk limits' },
	];

	return (
		<div ref={ref} className="flex items-center justify-center h-96">
			<motion.div
				className="relative rounded-xl border-2 border-dashed p-6 pt-10 pb-6 border-green-500/60"
				initial={{ opacity: 0, scale: 0.9 }}
				animate={isInView ? { opacity: 1, scale: 1 } : {}}
				transition={{ duration: 0.5 }}
			>
				{/* NSJAIL badge */}
				<motion.div
					className="absolute -top-3 left-4 flex items-center gap-1.5 bg-white dark:bg-gray-900 px-2 py-0.5 rounded text-xs font-semibold text-green-600 dark:text-green-400"
					initial={{ opacity: 0, y: 5 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ delay: 0.3 }}
				>
					<Shield className="w-4 h-4" />
					NSJAIL sandbox
				</motion.div>

				{/* Annotation badge */}
				<motion.div
					className="absolute -top-3 right-4 bg-white dark:bg-gray-900 px-2 py-0.5 rounded font-mono text-[11px] text-gray-500 dark:text-gray-400"
					initial={{ opacity: 0, y: 5 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ delay: 0.4 }}
				>
					// sandbox
				</motion.div>

				<div className="flex flex-col gap-3 min-w-[280px]">
					{/* Script inside the sandbox */}
					<motion.div
						className="flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
						initial={{ opacity: 0, y: -10 }}
						animate={isInView ? { opacity: 1, y: 0 } : {}}
						transition={{ delay: 0.2 }}
					>
						<img src="/img/windmill.svg" alt="Windmill" className="w-6 h-6" />
						<div>
							<div className="text-sm font-semibold text-gray-800 dark:text-gray-200">Your script</div>
							<div className="text-[10px] text-gray-500 dark:text-gray-400">Runs in isolated environment</div>
						</div>
					</motion.div>

					{/* Divider */}
					<motion.div
						className="border-t border-dashed border-gray-300 dark:border-gray-600"
						initial={{ opacity: 0 }}
						animate={isInView ? { opacity: 0.5 } : {}}
						transition={{ delay: 0.4 }}
					/>

					{/* Restriction rows */}
					{restrictions.map((r, i) => (
						<motion.div
							key={r.key}
							className="flex items-center gap-2.5 px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
							initial={{ opacity: 0, x: -15 }}
							animate={isInView ? { opacity: 1, x: 0 } : {}}
							transition={{ duration: 0.35, delay: 0.4 + i * 0.12 }}
						>
							<span className="text-green-500">{r.icon}</span>
							<span className="text-xs font-medium text-gray-700 dark:text-gray-300">{r.label}</span>
						</motion.div>
					))}
				</div>
			</motion.div>
		</div>
	);
}

// ─── Option B: Side-by-side NSJAIL vs PID namespace ───

function OptionB() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.3 });

	return (
		<div ref={ref} className="flex items-center justify-center h-96">
			<div className="flex gap-5">
				{/* NSJAIL */}
				<motion.div
					className="flex flex-col items-center gap-3 px-6 py-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 min-w-[180px]"
					initial={{ opacity: 0, x: -20 }}
					animate={isInView ? { opacity: 1, x: 0 } : {}}
					transition={{ duration: 0.4 }}
				>
					<Shield className="w-8 h-8 text-green-500" />
					<span className="text-sm font-semibold text-gray-800 dark:text-gray-200">NSJAIL</span>
					<span className="text-[10px] text-gray-500 dark:text-gray-400 text-center">Full isolation</span>
					<div className="flex flex-col gap-1.5 mt-1 w-full">
						{['Filesystem', 'Network', 'CPU / Mem / Disk'].map((item, i) => (
							<motion.div
								key={item}
								className="flex items-center gap-1.5 text-[10px] text-gray-600 dark:text-gray-400"
								initial={{ opacity: 0 }}
								animate={isInView ? { opacity: 1 } : {}}
								transition={{ delay: 0.4 + i * 0.1 }}
							>
								<Lock className="w-3 h-3 text-green-500" />
								{item}
							</motion.div>
						))}
					</div>
				</motion.div>

				{/* "or" divider */}
				<motion.div
					className="flex items-center"
					initial={{ opacity: 0 }}
					animate={isInView ? { opacity: 0.5 } : {}}
					transition={{ delay: 0.3 }}
				>
					<span className="text-xs font-medium text-gray-400 dark:text-gray-500">or</span>
				</motion.div>

				{/* PID namespace */}
				<motion.div
					className="flex flex-col items-center gap-3 px-6 py-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 min-w-[180px]"
					initial={{ opacity: 0, x: 20 }}
					animate={isInView ? { opacity: 1, x: 0 } : {}}
					transition={{ duration: 0.4, delay: 0.15 }}
				>
					<Layers className="w-8 h-8 text-blue-500" />
					<span className="text-sm font-semibold text-gray-800 dark:text-gray-200">PID namespace</span>
					<span className="text-[10px] text-gray-500 dark:text-gray-400 text-center">Lighter, faster</span>
					<div className="flex flex-col gap-1.5 mt-1 w-full">
						{['Process isolation', 'Lower overhead', 'Faster startup'].map((item, i) => (
							<motion.div
								key={item}
								className="flex items-center gap-1.5 text-[10px] text-gray-600 dark:text-gray-400"
								initial={{ opacity: 0 }}
								animate={isInView ? { opacity: 1 } : {}}
								transition={{ delay: 0.5 + i * 0.1 }}
							>
								<Lock className="w-3 h-3 text-blue-500" />
								{item}
							</motion.div>
						))}
					</div>
				</motion.div>
			</div>
		</div>
	);
}

// ─── Option C: Code annotation card ───

function OptionC() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.3 });

	return (
		<div ref={ref} className="flex items-center justify-center h-96">
			<motion.div
				className="w-full max-w-sm rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-lg bg-white dark:bg-gray-900"
				initial={{ opacity: 0, y: 20 }}
				animate={isInView ? { opacity: 1, y: 0 } : {}}
				transition={{ duration: 0.5 }}
			>
				{/* Code header */}
				<div className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
					<div className="flex gap-1.5">
						<div className="w-2.5 h-2.5 rounded-full bg-red-400" />
						<div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
						<div className="w-2.5 h-2.5 rounded-full bg-green-400" />
					</div>
					<span className="text-[11px] font-mono text-gray-500 dark:text-gray-400 ml-2">script.ts</span>
				</div>

				{/* Code body */}
				<div className="px-4 py-3 font-mono text-xs leading-relaxed border-b border-gray-200 dark:border-gray-700">
					<motion.div
						initial={{ opacity: 0 }}
						animate={isInView ? { opacity: 1 } : {}}
						transition={{ delay: 0.3 }}
					>
						<span className="text-gray-400">// </span>
						<span className="text-green-600 dark:text-green-400">sandbox</span>
					</motion.div>
					<motion.div
						className="mt-1"
						initial={{ opacity: 0 }}
						animate={isInView ? { opacity: 0.5 } : {}}
						transition={{ delay: 0.5 }}
					>
						<span className="text-gray-400">export async function main() {'{'}</span>
					</motion.div>
					<motion.div
						initial={{ opacity: 0 }}
						animate={isInView ? { opacity: 0.5 } : {}}
						transition={{ delay: 0.6 }}
					>
						<span className="text-gray-400">{'  // your code here'}</span>
					</motion.div>
					<motion.div
						initial={{ opacity: 0 }}
						animate={isInView ? { opacity: 0.5 } : {}}
						transition={{ delay: 0.7 }}
					>
						<span className="text-gray-400">{'}'}</span>
					</motion.div>
				</div>

				{/* Enforced restrictions */}
				<div className="px-4 py-3">
					<div className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2.5">
						Enforced restrictions
					</div>
					{[
						{ icon: <HardDrive className="w-3.5 h-3.5" />, label: 'Isolated filesystem' },
						{ icon: <WifiOff className="w-3.5 h-3.5" />, label: 'Network restricted' },
						{ icon: <Cpu className="w-3.5 h-3.5" />, label: 'CPU, memory, disk limits' },
					].map((r, i) => (
						<motion.div
							key={r.label}
							className="flex items-center gap-2 py-1.5"
							initial={{ opacity: 0, x: -10 }}
							animate={isInView ? { opacity: 1, x: 0 } : {}}
							transition={{ delay: 0.6 + i * 0.1 }}
						>
							<span className="text-green-500">{r.icon}</span>
							<span className="text-[11px] text-gray-600 dark:text-gray-400">{r.label}</span>
						</motion.div>
					))}
				</div>
			</motion.div>
		</div>
	);
}

// ─── Option D: Shield with resource gauges ───

function OptionD() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.3 });

	const limits = [
		{ key: 'cpu', label: 'CPU', value: 50, icon: <Cpu className="w-4 h-4" /> },
		{ key: 'mem', label: 'Memory', value: 70, icon: <Box className="w-4 h-4" /> },
		{ key: 'disk', label: 'Disk', value: 30, icon: <HardDrive className="w-4 h-4" /> },
	];

	return (
		<div ref={ref} className="flex items-center justify-center h-96">
			<div className="flex flex-col items-center gap-5">
				{/* Shield with NSJAIL */}
				<motion.div
					className="flex items-center gap-2"
					initial={{ opacity: 0, scale: 0.8 }}
					animate={isInView ? { opacity: 1, scale: 1 } : {}}
					transition={{ duration: 0.4 }}
				>
					<Shield className="w-10 h-10 text-green-500" />
					<div>
						<div className="text-lg font-semibold text-gray-800 dark:text-gray-200">NSJAIL</div>
						<div className="text-[11px] text-gray-500 dark:text-gray-400">Process isolation</div>
					</div>
				</motion.div>

				{/* Resource gauges */}
				<div className="flex flex-col gap-3 w-64">
					{limits.map((l, i) => (
						<motion.div
							key={l.key}
							className="flex items-center gap-3"
							initial={{ opacity: 0, x: -10 }}
							animate={isInView ? { opacity: 1, x: 0 } : {}}
							transition={{ delay: 0.3 + i * 0.12 }}
						>
							<span className="text-gray-400 dark:text-gray-500">{l.icon}</span>
							<div className="flex-1">
								<div className="flex justify-between mb-1">
									<span className="text-[10px] font-medium text-gray-600 dark:text-gray-400">{l.label}</span>
									<span className="text-[10px] font-mono text-gray-400 dark:text-gray-500">{l.value}%</span>
								</div>
								<div className="h-1.5 rounded-full bg-gray-100 dark:bg-gray-800">
									<motion.div
										className="h-full rounded-full bg-green-400"
										initial={{ width: 0 }}
										animate={isInView ? { width: `${l.value}%` } : {}}
										transition={{ duration: 0.6, delay: 0.5 + i * 0.12 }}
									/>
								</div>
							</div>
						</motion.div>
					))}
				</div>

				{/* Network badge */}
				<motion.div
					className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20"
					initial={{ opacity: 0, scale: 0.8 }}
					animate={isInView ? { opacity: 1, scale: 1 } : {}}
					transition={{ delay: 0.8, type: 'spring' }}
				>
					<WifiOff className="w-3.5 h-3.5 text-red-500" />
					<span className="text-[10px] font-medium text-red-600 dark:text-red-400">Network restricted</span>
				</motion.div>
			</div>
		</div>
	);
}

// ─── Preview page ───

export default function IsolationAnimationsPreview() {
	const options = [
		{ id: 'A', title: 'Option A: NSJAIL boundary diagram', desc: 'Dashed sandbox border containing script and restriction rows (filesystem, network, CPU/mem/disk). NSJAIL and // sandbox badges on top.', Component: OptionA },
		{ id: 'B', title: 'Option B: NSJAIL vs PID namespace', desc: 'Side-by-side comparison cards. NSJAIL (full isolation) on the left, PID namespace (lighter, faster) on the right.', Component: OptionB },
		{ id: 'C', title: 'Option C: Code annotation card', desc: 'Terminal-style card with // sandbox annotation in code, and enforced restrictions listed below.', Component: OptionC },
		{ id: 'D', title: 'Option D: Shield with resource gauges', desc: 'NSJAIL shield icon with CPU, memory, and disk usage bars, plus a network-restricted badge.', Component: OptionD },
	];

	return (
		<Layout title="Process isolation animations preview" description="Preview of 4 animation options for the Process Isolation section.">
			<div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
				<h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
					Process isolation illustration options
				</h1>
				<p className="text-gray-600 dark:text-gray-400 mb-12">
					Four animation options for the "Process isolation" section. Scroll to trigger animations.
				</p>

				<div className="space-y-16">
					{options.map(({ id, title, desc, Component }) => (
						<div key={id} className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
							<div className="px-6 py-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
								<h2 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h2>
								<p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{desc}</p>
							</div>
							<div className="p-6 bg-white dark:bg-gray-900">
								<Component />
							</div>
						</div>
					))}
				</div>
			</div>
		</Layout>
	);
}
