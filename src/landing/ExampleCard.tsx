import React from 'react';
import { motion } from 'framer-motion';
import Link from '@docusaurus/Link';

interface ExampleCardProps {
	title: string;
	description: string;
	href: string;
	thumbnail?: string;
	color?: 'blue' | 'teal' | 'orange' | 'purple';
}

export default function ExampleCard({
	title,
	description,
	href,
	thumbnail,
	color = 'blue'
}: ExampleCardProps) {
	const gradients = {
		blue: 'from-blue-500/20 to-blue-600/20',
		teal: 'from-teal-500/20 to-teal-600/20',
		orange: 'from-orange-500/20 to-orange-600/20',
		purple: 'from-purple-500/20 to-purple-600/20'
	};

	const borders = {
		blue: 'hover:border-blue-500',
		teal: 'hover:border-teal-500',
		orange: 'hover:border-orange-500',
		purple: 'hover:border-purple-500'
	};

	const textGradients = {
		blue: 'from-blue-600 to-blue-800 dark:from-blue-300 dark:to-blue-500',
		teal: 'from-teal-600 to-teal-800 dark:from-teal-300 dark:to-teal-500',
		orange: 'from-orange-600 to-orange-800 dark:from-orange-300 dark:to-orange-500',
		purple: 'from-purple-600 to-purple-800 dark:from-purple-300 dark:to-purple-500'
	};

	return (
		<Link href={href} className="no-underline">
			<motion.div
				whileHover={{ y: -4 }}
				transition={{ duration: 0.2 }}
				className={`
					group cursor-pointer rounded-xl border border-gray-200 dark:border-gray-700
					bg-white dark:bg-gray-800/50 overflow-hidden
					transition-all duration-300 ${borders[color]}
					hover:shadow-lg dark:hover:shadow-gray-900/50
				`}
			>
				{/* Thumbnail */}
				<div
					className={`
						h-48 bg-gradient-to-br ${gradients[color]}
						flex items-center justify-center
						border-b border-gray-200 dark:border-gray-700
					`}
				>
					{thumbnail ? (
						<img
							src={thumbnail}
							alt={title}
							className="w-full h-full object-cover"
						/>
					) : (
						<div className="text-gray-400 dark:text-gray-500 text-sm">
							Preview
						</div>
					)}
				</div>

				{/* Content */}
				<div className="p-5">
					<h3
						className={`
							text-lg font-semibold mb-2
							text-transparent bg-clip-text bg-gradient-to-br ${textGradients[color]}
						`}
					>
						{title}
					</h3>
					<p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
						{description}
					</p>
				</div>
			</motion.div>
		</Link>
	);
}
