import React, { useRef } from 'react';
import Layout from '@theme/Layout';
import { motion, useInView } from 'framer-motion';
import { Shield, Users, GitBranch, HardDrive, Pencil, ScrollText, WifiOff, Check, Lock, Building2 } from 'lucide-react';

const fade = (delay = 0) => ({
	initial: { opacity: 0, y: 12 },
	whileInView: { opacity: 1, y: 0 },
	viewport: { once: true },
	transition: { duration: 0.4, delay },
});

// ─── Option A: Feature checklist ───
// Enterprise features appear one by one as a checklist.

function OptionA() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.3 });

	const features = [
		'SAML / SCIM authentication',
		'S3 dependency caching',
		'Dedicated workers',
		'Multiplayer editing',
		'Audit log retention',
		'Air-gapped deployments',
	];

	return (
		<div ref={ref} className="flex items-center justify-center h-96">
			<div className="w-full max-w-sm">
				<div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 overflow-hidden">
					<div className="px-5 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center gap-2">
						<Building2 className="w-4 h-4 text-gray-500 dark:text-gray-400" />
						<span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Enterprise edition</span>
					</div>
					<div className="px-5 py-4 flex flex-col gap-2.5">
						{features.map((f, i) => (
							<motion.div
								key={f}
								className="flex items-center gap-2.5"
								initial={{ opacity: 0, x: -10 }}
								animate={isInView ? { opacity: 1, x: 0 } : {}}
								transition={{ duration: 0.3, delay: 0.2 + i * 0.12 }}
							>
								<Check className="w-4 h-4 text-gray-500 dark:text-gray-400 shrink-0" />
								<span className="text-sm text-gray-700 dark:text-gray-300">{f}</span>
							</motion.div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

// ─── Option B: Icon grid ───
// Enterprise features as icon + label cards in a 2-column grid.

function OptionB() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.3 });

	const features = [
		{ label: 'SAML / SCIM', Icon: Shield },
		{ label: 'S3 caching', Icon: HardDrive },
		{ label: 'Dedicated workers', Icon: Users },
		{ label: 'Multiplayer editing', Icon: Pencil },
		{ label: 'Git sync', Icon: GitBranch },
		{ label: 'Audit logs', Icon: ScrollText },
	];

	return (
		<div ref={ref} className="flex items-center justify-center h-96">
			<div className="grid grid-cols-2 gap-3 max-w-sm">
				{features.map((f, i) => (
					<motion.div
						key={f.label}
						className="flex items-center gap-2.5 px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
						initial={{ opacity: 0, y: 10 }}
						animate={isInView ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.3, delay: 0.1 + i * 0.1 }}
					>
						<f.Icon className="w-5 h-5 text-gray-500 dark:text-gray-400 shrink-0" />
						<span className="text-sm text-gray-700 dark:text-gray-300">{f.label}</span>
					</motion.div>
				))}
			</div>
		</div>
	);
}

// ─── Option C: Cloud = Self-host comparison ───
// Two cards side by side showing Cloud and Self-host are the same product.

function OptionC() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.3 });

	const features = ['SAML / SCIM', 'S3 caching', 'Git sync', 'Multiplayer', 'Audit logs', 'Dedicated workers'];

	return (
		<div ref={ref} className="flex items-center justify-center h-96">
			<div className="flex flex-col items-center gap-4">
				<div className="flex items-stretch gap-4">
					{/* Cloud card */}
					<motion.div
						className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-5 w-48"
						{...fade(0)}
					>
						<div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Windmill Cloud</div>
						<div className="flex flex-col gap-1.5">
							{features.map((f, i) => (
								<motion.div
									key={f}
									className="flex items-center gap-1.5"
									initial={{ opacity: 0 }}
									animate={isInView ? { opacity: 1 } : {}}
									transition={{ delay: 0.3 + i * 0.08 }}
								>
									<Check className="w-3 h-3 text-gray-400 dark:text-gray-500 shrink-0" />
									<span className="text-xs text-gray-600 dark:text-gray-400">{f}</span>
								</motion.div>
							))}
						</div>
					</motion.div>

					{/* Equals sign */}
					<motion.div
						className="flex items-center"
						initial={{ opacity: 0 }}
						animate={isInView ? { opacity: 1 } : {}}
						transition={{ delay: 0.5 }}
					>
						<span className="text-2xl font-light text-gray-300 dark:text-gray-600">=</span>
					</motion.div>

					{/* Self-host card */}
					<motion.div
						className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-5 w-48"
						{...fade(0.15)}
					>
						<div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Self-hosted EE</div>
						<div className="flex flex-col gap-1.5">
							{features.map((f, i) => (
								<motion.div
									key={f}
									className="flex items-center gap-1.5"
									initial={{ opacity: 0 }}
									animate={isInView ? { opacity: 1 } : {}}
									transition={{ delay: 0.4 + i * 0.08 }}
								>
									<Check className="w-3 h-3 text-gray-400 dark:text-gray-500 shrink-0" />
									<span className="text-xs text-gray-600 dark:text-gray-400">{f}</span>
								</motion.div>
							))}
						</div>
					</motion.div>
				</div>

				<motion.div
					className="text-xs text-gray-400 dark:text-gray-500"
					initial={{ opacity: 0 }}
					animate={isInView ? { opacity: 1 } : {}}
					transition={{ delay: 0.9 }}
				>
					Same product, your infrastructure
				</motion.div>
			</div>
		</div>
	);
}

// ─── Option D: Layered card (base + enterprise overlay) ───
// Shows the open-source base with enterprise features layered on top.

function OptionD() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.3 });

	const eeFeatures = [
		{ label: 'SAML / SCIM', Icon: Shield },
		{ label: 'Audit logs', Icon: ScrollText },
		{ label: 'Git sync', Icon: GitBranch },
		{ label: 'Air-gapped', Icon: WifiOff },
	];

	return (
		<div ref={ref} className="flex items-center justify-center h-96">
			<div className="flex flex-col items-center gap-3 w-full max-w-sm">
				{/* Enterprise layer */}
				<motion.div
					className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-5"
					{...fade(0.2)}
				>
					<div className="flex items-center gap-2 mb-3">
						<Lock className="w-4 h-4 text-gray-500 dark:text-gray-400" />
						<span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Enterprise</span>
					</div>
					<div className="grid grid-cols-2 gap-2">
						{eeFeatures.map((f, i) => (
							<motion.div
								key={f.label}
								className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
								initial={{ opacity: 0, scale: 0.9 }}
								animate={isInView ? { opacity: 1, scale: 1 } : {}}
								transition={{ duration: 0.3, delay: 0.4 + i * 0.1 }}
							>
								<f.Icon className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500 shrink-0" />
								<span className="text-xs text-gray-600 dark:text-gray-400">{f.label}</span>
							</motion.div>
						))}
					</div>
				</motion.div>

				{/* Base layer */}
				<motion.div
					className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-5"
					{...fade(0)}
				>
					<div className="flex items-center gap-2 mb-2">
						<img src="/img/windmill.svg" alt="Windmill" className="w-5 h-5" />
						<span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Open-source core</span>
					</div>
					<p className="text-xs text-gray-500 dark:text-gray-400">
						Scripts, flows, apps, scheduling, full API
					</p>
				</motion.div>
			</div>
		</div>
	);
}

// ─── Preview page ───

export default function EnterpriseAnimationsPreview() {
	const options = [
		{ id: 'A', title: 'Option A: Feature checklist', desc: 'Enterprise features appear one by one as a checklist inside a card.', Component: OptionA },
		{ id: 'B', title: 'Option B: Icon grid', desc: 'Features as icon + label cards in a 2-column grid with staggered fade-in.', Component: OptionB },
		{ id: 'C', title: 'Option C: Cloud = Self-host', desc: 'Two side-by-side cards showing Cloud and Self-hosted EE have the same features.', Component: OptionC },
		{ id: 'D', title: 'Option D: Layered cards', desc: 'Open-source base card with enterprise features layered on top. Shows the add-on nature of EE.', Component: OptionD },
	];

	return (
		<Layout title="Enterprise animations preview" description="Preview of animation options for the Enterprise on your infrastructure section.">
			<div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
				<h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
					Enterprise on your infrastructure illustration options
				</h1>
				<p className="text-gray-600 dark:text-gray-400 mb-12">
					Four animation options for the "Enterprise on your infrastructure" section. Scroll to trigger animations.
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
