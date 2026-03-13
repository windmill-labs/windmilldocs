import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import BookDemoModal from '../BookDemoModal';

const fadeIn = {
	initial: { opacity: 0, y: 30 },
	whileInView: { opacity: 1, y: 0 },
	viewport: { once: true },
	transition: { duration: 0.5 },
};

export default function ProductCTA() {
	const [bookDemoOpen, setBookDemoOpen] = useState(false);

	return (
		<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
			<motion.div
				{...fadeIn}
				className="text-center py-16 px-8 rounded-3xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-gray-900 border border-blue-200 dark:border-blue-800"
			>
				<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
					Build your internal platform on Windmill
				</h2>
				<p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto text-lg">
					Scripts, flows, apps, and infrastructure in one place.
				</p>
				<div className="flex flex-col sm:flex-row items-center justify-center gap-4">
					<a
						href="https://app.windmill.dev/user/login"
						onClick={() => (window as any).plausible?.('try-cloud')}
						data-analytics='"try-cloud"'
						className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors !no-underline"
						rel="nofollow"
					>
						Get started for free
						<ArrowRight className="w-4 h-4" />
					</a>
					<button
						onClick={() => setBookDemoOpen(true)}
						className="group flex items-center gap-2 text-base font-semibold text-gray-900 dark:text-white bg-transparent border-none cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
					>
						Contact us
						<ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
					</button>
				</div>
			</motion.div>
			<BookDemoModal open={bookDemoOpen} setOpen={setBookDemoOpen} />
		</div>
	);
}
