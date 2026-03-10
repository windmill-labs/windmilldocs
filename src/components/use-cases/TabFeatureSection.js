import React, { useState } from 'react';
import Link from '@docusaurus/Link';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

const fadeIn = {
	initial: { opacity: 0, y: 30 },
	whileInView: { opacity: 1, y: 0 },
	viewport: { once: true },
	transition: { duration: 0.5 },
};

export default function TabFeatureSection({ title, subtitle, features }) {
	const [active, setActive] = useState(0);
	return (
		<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
			<motion.div {...fadeIn} className="mb-16">
				<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
					{title}
				</h2>
				{subtitle && (
					<p className="text-lg text-gray-600 dark:text-gray-300">{subtitle}</p>
				)}
			</motion.div>

			<div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6">
				{/* Left: clickable list */}
				<div className="flex flex-col gap-2">
					{features.map((feat, i) => (
						<button
							key={feat.label || feat.title}
							onClick={() => setActive(i)}
							className={`flex items-center gap-3 px-4 py-4 rounded-xl text-left transition-colors border ${
								i === active
									? 'bg-blue-600 text-white border-blue-600'
									: 'bg-white dark:bg-gray-950 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
							}`}
						>
							<feat.icon
								className={`w-5 h-5 flex-shrink-0 ${
									i === active ? 'text-white' : 'text-blue-500'
								}`}
							/>
							<span className="font-medium text-sm">
								{feat.label || feat.title}
							</span>
						</button>
					))}
				</div>

				{/* Right: content panel — all panels stay mounted, only opacity changes */}
				<div className="p-8 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 relative overflow-hidden">
					{features.map((feat, i) => (
						<div
							key={feat.label || feat.title}
							className={`transition-opacity duration-200 ${
								i === active
									? 'opacity-100 relative'
									: 'opacity-0 absolute inset-0 pointer-events-none p-8'
							}`}
						>
							<div className="flex items-center gap-3 mb-4">
								<div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
									<feat.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
								</div>
								<h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
									{feat.title}
								</h3>
							</div>
							<p className="text-gray-600 dark:text-gray-300 text-lg mb-4">
								{feat.desc}
							</p>
							{feat.embed ? (
								<div className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden mt-2 p-4 bg-white">
									<iframe
										src={feat.embed}
										title={feat.title}
										className="w-full border-0 bg-white rounded"
										style={{ height: '480px' }}
										loading="lazy"
									/>
								</div>
							) : feat.image ? (
								<img
									src={feat.image}
									alt={feat.title}
									className="rounded-lg border border-gray-200 dark:border-gray-700 w-full"
								/>
							) : (
								<div className="w-full h-48 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center">
									<span className="text-gray-400 dark:text-gray-500 text-sm">
										Screenshot coming soon
									</span>
								</div>
							)}
							{feat.docLink && (
								<div className="flex justify-end mt-3">
									<Link
										to={feat.docLink}
										className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline !no-underline"
									>
										<BookOpen className="w-4 h-4" /> Read the docs
									</Link>
								</div>
							)}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
