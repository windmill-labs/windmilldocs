import React from 'react';
import Link from '@docusaurus/Link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useColorMode } from '@docusaurus/theme-common';

const fadeIn = {
	initial: { opacity: 0, y: 30 },
	whileInView: { opacity: 1, y: 0 },
	viewport: { once: true },
	transition: { duration: 0.5 },
};

export default function CaseStudyBanner({ logo, logoDark, title, description, link }) {
	const { colorMode } = useColorMode();
	const logoSrc = colorMode === 'dark' && logoDark ? logoDark : logo;

	return (
		<motion.div {...fadeIn}>
			<Link
				to={link}
				className="group flex flex-col md:flex-row items-center gap-8 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 p-8 md:p-12 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-lg transition-all !no-underline"
			>
				<div className="flex-shrink-0">
					<img
						src={logoSrc}
						alt="Company logo"
						className="h-12 md:h-16 w-auto object-contain"
					/>
				</div>
				<div className="flex-1 text-center md:text-left">
					<span className="text-xs font-semibold uppercase tracking-wider text-blue-500 dark:text-blue-400 mb-2 block">Case Study</span>
					<h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
						{title}
					</h3>
					<p className="text-gray-600 dark:text-gray-300">
						{description}
					</p>
				</div>
				<ArrowRight className="w-6 h-6 text-gray-300 dark:text-gray-600 group-hover:text-blue-500 transition-colors flex-shrink-0" />
			</Link>
		</motion.div>
	);
}
