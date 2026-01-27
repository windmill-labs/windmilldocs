import React from 'react';
import Link from '@docusaurus/Link';
import { ArrowRight } from 'lucide-react';

interface ExampleCardProps {
	title: string;
	description: string;
	href: string;
	thumbnail?: string;
}

export default function ExampleCard({
	title,
	description,
	href,
	thumbnail
}: ExampleCardProps) {
	return (
		<Link
			to={href}
			className="group flex flex-col h-full rounded-2xl bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-700 overflow-hidden hover:border-blue-500 dark:hover:border-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl !no-underline"
		>
			{/* Top section with icon */}
			<div className="relative px-6 pt-6 pb-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 min-h-[200px] flex flex-col">
				{thumbnail && (
					<div className="flex items-center justify-center w-full flex-1 min-h-[120px]">
						<img
							src={thumbnail}
							alt={title}
							className="h-28 w-full object-contain"
						/>
					</div>
				)}
			</div>

			{/* Content section */}
			<div className="flex-1 px-6 pt-6 pb-6 flex flex-col">
				<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
					{title}
				</h3>
				<p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed flex-1">
					{description}
				</p>
				{/* Bottom section with link */}
				<div className="flex items-center justify-end mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
					<span className="text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 flex items-center gap-1 transition-colors">
						View example
						<ArrowRight className="w-4 h-4" />
					</span>
				</div>
			</div>
		</Link>
	);
}
