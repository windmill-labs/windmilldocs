import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Table2, Check, Search } from 'lucide-react';

import LandingHeader from '../../landing/LandingHeader';
import Footer from '../../landing/Footer';
import RadialBlur from '../../landing/RadialBlur';
import LayoutProvider from '@theme/Layout/Provider';
import DatatablesHeroAnimation from '../../components/products/DatatablesHeroAnimation';

const fadeIn = {
	initial: { opacity: 0, y: 30 },
	whileInView: { opacity: 1, y: 0 },
	viewport: { once: true },
	transition: { duration: 0.5 }
};

// ══════════════════════════════════════════════════════
// Shared data
// ══════════════════════════════════════════════════════

const tableRows = [
	{ id: 1, customer: 'Alice Martin', amount: '$1,250.00', status: 'pending', date: '2025-03-10' },
	{ id: 2, customer: 'Bob Chen', amount: '$890.00', status: 'active', date: '2025-03-09' },
	{ id: 3, customer: 'Carol Smith', amount: '$2,100.00', status: 'active', date: '2025-03-08' },
	{ id: 4, customer: 'Dan Wilson', amount: '$450.00', status: 'pending', date: '2025-03-07' },
	{ id: 5, customer: 'Eva Lopez', amount: '$3,200.00', status: 'active', date: '2025-03-06' },
];

const columns = ['id', 'customer', 'amount', 'status', 'date'];

// ══════════════════════════════════════════════════════
// Concept 1: Spreadsheet that comes alive
// ══════════════════════════════════════════════════════

function SpreadsheetAnimation() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.3 });
	const [phase, setPhase] = useState(0);

	useEffect(() => {
		if (!isInView) return;
		const timers = [
			setTimeout(() => setPhase(1), 400),   // card appears
			setTimeout(() => setPhase(2), 1000),   // headers appear
			setTimeout(() => setPhase(3), 1500),   // row 1
			setTimeout(() => setPhase(4), 1800),   // row 2
			setTimeout(() => setPhase(5), 2100),   // row 3
			setTimeout(() => setPhase(6), 2400),   // row 4
			setTimeout(() => setPhase(7), 2700),   // row 5
			setTimeout(() => setPhase(8), 3400),   // edit: pending → active on row 1
		];
		return () => timers.forEach(clearTimeout);
	}, [isInView]);

	const visibleRows = tableRows.slice(0, Math.max(0, phase - 2));
	const editedRow = phase >= 8 ? 0 : -1;

	return (
		<div ref={ref} className="relative" style={{ height: 420 }}>
			<div className="relative overflow-hidden h-full flex items-center justify-center">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={phase >= 1 ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.5 }}
					style={{ width: 520 }}
				>
					<div className="rounded-2xl border border-gray-200 bg-white shadow-lg p-5">
						<div className="flex items-center gap-3 mb-4">
							<div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center">
								<Table2 className="w-4 h-4 text-emerald-600" />
							</div>
							<div className="text-sm font-semibold text-gray-800">orders</div>
						</div>

						<motion.div
							initial={{ opacity: 0, height: 0 }}
							animate={phase >= 2 ? { opacity: 1, height: 'auto' } : {}}
							transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
							style={{ overflow: 'hidden' }}
						>
							{/* Header row */}
							<div className="grid grid-cols-5 gap-0 border-b border-gray-200 pb-2 mb-1">
								{columns.map((col) => (
									<div key={col} className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-2">
										{col}
									</div>
								))}
							</div>

							{/* Data rows */}
							{visibleRows.map((row, i) => {
								const isEdited = i === editedRow;
								const status = isEdited ? 'active' : row.status;
								return (
									<motion.div
										key={row.id}
										className="grid grid-cols-5 gap-0 py-1.5 border-b border-gray-50"
										initial={{ opacity: 0, x: -10 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ duration: 0.3 }}
									>
										<div className="text-[11px] text-gray-500 px-2">{row.id}</div>
										<div className="text-[11px] text-gray-700 font-medium px-2">{row.customer}</div>
										<div className="text-[11px] text-gray-600 px-2">{row.amount}</div>
										<div className="px-2 relative">
											<motion.span
												className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full inline-block ${
													status === 'active'
														? 'bg-green-100 text-green-700'
														: 'bg-yellow-100 text-yellow-700'
												}`}
												animate={isEdited ? { scale: [1, 1.15, 1] } : {}}
												transition={{ duration: 0.4 }}
											>
												{status}
											</motion.span>
											{isEdited && (
												<motion.div
													className="absolute -right-1 -top-1"
													initial={{ opacity: 0, scale: 0 }}
													animate={{ opacity: 1, scale: 1 }}
													transition={{ duration: 0.3, delay: 0.2 }}
												>
													<Check className="w-3 h-3 text-green-500" />
												</motion.div>
											)}
										</div>
										<div className="text-[11px] text-gray-500 px-2">{row.date}</div>
									</motion.div>
								);
							})}
						</motion.div>
					</div>
				</motion.div>
			</div>
		</div>
	);
}

// ══════════════════════════════════════════════════════
// Concept 2: SQL query to table
// ══════════════════════════════════════════════════════

const sqlQuery = "SELECT * FROM orders WHERE status = 'active'";

function SqlQueryAnimation() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.3 });
	const [phase, setPhase] = useState(0);
	const [typedChars, setTypedChars] = useState(0);

	useEffect(() => {
		if (!isInView) return;
		const timers = [
			setTimeout(() => setPhase(1), 400),   // query card appears
			setTimeout(() => setPhase(2), 800),    // start typing
			setTimeout(() => setPhase(3), 2800),   // table appears
			setTimeout(() => setPhase(4), 3400),   // count badge
		];
		return () => timers.forEach(clearTimeout);
	}, [isInView]);

	useEffect(() => {
		if (phase < 2) return;
		if (typedChars >= sqlQuery.length) return;
		const timer = setTimeout(() => {
			setTypedChars((c) => c + 1);
		}, 35);
		return () => clearTimeout(timer);
	}, [phase, typedChars]);

	const activeRows = tableRows.filter((r) => r.status === 'active');

	return (
		<div ref={ref} className="relative" style={{ height: 420 }}>
			<div className="relative overflow-hidden h-full flex items-center justify-center">
				<div style={{ width: 520 }} className="space-y-3">
					{/* SQL query card */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={phase >= 1 ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.5 }}
					>
						<div className="rounded-xl border border-gray-200 bg-white shadow-lg p-4">
							<div className="flex items-center gap-2 mb-3">
								<Search className="w-3.5 h-3.5 text-blue-500" />
								<span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Query</span>
							</div>
							<div className="bg-gray-50 rounded-lg p-3 font-mono text-[12px] text-gray-700 min-h-[36px]">
								{sqlQuery.slice(0, typedChars)}
								{phase >= 2 && typedChars < sqlQuery.length && (
									<motion.span
										className="inline-block w-[2px] h-[14px] bg-blue-500 ml-[1px] align-middle"
										animate={{ opacity: [1, 0] }}
										transition={{ duration: 0.6, repeat: Infinity }}
									/>
								)}
							</div>
						</div>
					</motion.div>

					{/* Results table */}
					<motion.div
						initial={{ opacity: 0, y: 15, height: 0 }}
						animate={phase >= 3 ? { opacity: 1, y: 0, height: 'auto' } : {}}
						transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
						style={{ overflow: 'hidden' }}
					>
						<div className="rounded-xl border border-gray-200 bg-white shadow-lg p-4">
							<div className="flex items-center justify-between mb-3">
								<div className="flex items-center gap-2">
									<Table2 className="w-3.5 h-3.5 text-emerald-500" />
									<span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Results</span>
								</div>
								{phase >= 4 && (
									<motion.span
										className="text-[10px] font-semibold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full"
										initial={{ opacity: 0, scale: 0.8 }}
										animate={{ opacity: 1, scale: 1 }}
										transition={{ duration: 0.3 }}
									>
										{activeRows.length} rows
									</motion.span>
								)}
							</div>

							{/* Header */}
							<div className="grid grid-cols-5 gap-0 border-b border-gray-200 pb-2 mb-1">
								{columns.map((col) => (
									<div key={col} className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-2">
										{col}
									</div>
								))}
							</div>

							{/* Rows */}
							{activeRows.map((row, i) => (
								<motion.div
									key={row.id}
									className="grid grid-cols-5 gap-0 py-1.5 border-b border-gray-50"
									initial={{ opacity: 0, y: 8 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.3, delay: i * 0.1 }}
								>
									<div className="text-[11px] text-gray-500 px-2">{row.id}</div>
									<div className="text-[11px] text-gray-700 font-medium px-2">{row.customer}</div>
									<div className="text-[11px] text-gray-600 px-2">{row.amount}</div>
									<div className="px-2">
										<span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-green-100 text-green-700">
											{row.status}
										</span>
									</div>
									<div className="text-[11px] text-gray-500 px-2">{row.date}</div>
								</motion.div>
							))}
						</div>
					</motion.div>
				</div>
			</div>
		</div>
	);
}

// ══════════════════════════════════════════════════════
// Preview page
// ══════════════════════════════════════════════════════

const concepts = [
	{
		title: 'Concept 1: Spreadsheet that comes alive',
		description: 'A mini datatable fades in with headers, rows populate one by one, then a status cell gets edited inline from "pending" to "active".',
		Component: SpreadsheetAnimation,
	},
	{
		title: 'Concept 2: SQL query to table',
		description: 'A SQL query types out character by character, then a result table materializes below with matching rows and a count badge.',
		Component: SqlQueryAnimation,
	},
	{
		title: 'Concept 3: Script execution to Database Studio',
		description: 'A script runs and inserts a new row. The Database Studio panel appears and the new row slides in highlighted, showing the link between script execution and data.',
		Component: DatatablesHeroAnimation,
	},
];

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
								Datatables hero animation preview
							</h1>
						</motion.div>

						<div className="space-y-24">
							{concepts.map(({ title, description, Component }) => (
								<div key={title}>
									<motion.div {...fadeIn} className="text-center mb-8">
										<h2 className="!text-2xl !font-semibold text-gray-900 dark:text-white mb-2">{title}</h2>
										<p className="text-gray-500 text-sm max-w-lg mx-auto">{description}</p>
									</motion.div>
									<Component />
								</div>
							))}
						</div>
					</div>
				</div>
				<Footer />
			</main>
		</LayoutProvider>
	);
}
