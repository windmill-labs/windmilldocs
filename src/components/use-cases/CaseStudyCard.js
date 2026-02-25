import React from 'react';
import Link from '@docusaurus/Link';
import { ArrowRight } from 'lucide-react';
import { useColorMode } from '@docusaurus/theme-common';

export default function CaseStudyCard({ caseStudy, title, description, from }) {
	const { colorMode } = useColorMode();

	const getLogoPath = () => {
		if (colorMode === 'light') {
			return caseStudy.logo;
		} else {
			return caseStudy.logoDark || caseStudy.logo
				.replace('-light.png', '-dark.png')
				.replace('-light.svg', '-dark.svg')
				.replace('-light.webp', '-dark.webp');
		}
	};

	return (
		<Link
			to={from ? `${caseStudy.link}?from=${from}` : caseStudy.link}
			className="group flex flex-col h-full rounded-2xl bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-700 overflow-hidden hover:border-blue-500 dark:hover:border-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl !no-underline"
		>
			{/* Top section with logo and case study label */}
			<div className="relative px-6 pt-6 pb-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 min-h-[200px] flex flex-col">
				<div className="flex items-start justify-between mb-4">
					<span className="text-xs font-semibold uppercase tracking-wider text-blue-500 dark:text-blue-400">
						Case Study
					</span>
				</div>
				<div className="flex items-center justify-center w-full flex-1 min-h-[120px]">
					<img
						src={getLogoPath()}
						alt={`${caseStudy.company} logo`}
						className={`h-24 w-full object-contain${caseStudy.grayscale ? ' grayscale' : ''}`}
					/>
				</div>
			</div>

			{/* Content section */}
			<div className="flex-1 px-6 pt-6 pb-6 flex flex-col">
				<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
					{title || caseStudy.title}
				</h3>
				<p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed flex-1">
					{description || caseStudy.description}
				</p>
				{/* Bottom section with category and link */}
				<div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
					<span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
						{caseStudy.category}
					</span>
					<span className="text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 flex items-center gap-1 transition-colors">
						Read the story
						<ArrowRight className="w-4 h-4" />
					</span>
				</div>
			</div>
		</Link>
	);
}
