import React from 'react';
import Link from '@docusaurus/Link';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import TriggerGrid from './TriggerGrid';

const fadeIn = {
	initial: { opacity: 0, y: 30 },
	whileInView: { opacity: 1, y: 0 },
	viewport: { once: true },
	transition: { duration: 0.5 }
};

export default function TriggerSection() {
	return (
		<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
			<motion.div {...fadeIn}>
				<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Triggers</h2>
				<p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
					Any script or workflow can be triggered by{' '}
					<Link to="/docs/core_concepts/scheduling" className="text-blue-600 dark:text-blue-400 hover:underline">schedules</Link>,{' '}
					<Link to="/docs/core_concepts/webhooks" className="text-blue-600 dark:text-blue-400 hover:underline">webhooks</Link>,
					{' '}message queues, database changes, emails, and{' '}
					<Link to="/docs/getting_started/triggers" className="text-blue-600 dark:text-blue-400 hover:underline">more</Link>.
				</p>
				<Link
					to="/docs/getting_started/triggers"
					className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline !no-underline"
				>
					<BookOpen className="w-4 h-4" /> Read the docs
				</Link>
			</motion.div>
			<div className="-mx-4 sm:-mx-6 lg:-mx-8 [&>div]:!py-4">
				<TriggerGrid title={null} subtitle={null} />
			</div>
		</div>
	);
}
