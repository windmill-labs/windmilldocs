import React from 'react';
import Link from '@docusaurus/Link';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

const fadeIn = {
	initial: { opacity: 0, y: 30 },
	whileInView: { opacity: 1, y: 0 },
	viewport: { once: true },
	transition: { duration: 0.5 }
};

const stagger = (delay = 0) => ({
	...fadeIn,
	transition: { duration: 0.5, delay }
});

export default function BuiltInTriggers({ variant = 'script' }) {
	const label = variant === 'workflow' ? 'workflow' : 'script';

	return (
		<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
				<motion.div {...fadeIn}>
					<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
						Built-in triggers
					</h2>
					<p className="text-base text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
						Every {label} gets an <Link to="/docs/core_concepts/auto_generated_uis" className="text-blue-600 dark:text-blue-400 hover:underline">auto-generated UI</Link> so anyone on your team can run it. It also gets sync and async <Link to="/docs/core_concepts/webhooks" className="text-blue-600 dark:text-blue-400 hover:underline">API endpoints</Link> out of the box. On top of that, Windmill provides a full set of built-in triggers: <Link to="/docs/core_concepts/scheduling" className="text-blue-600 dark:text-blue-400 hover:underline">schedules</Link>, Kafka, Postgres CDC, SQS, MQTT, emails, WebSockets and more.
					</p>
					<Link to="/platform/triggers" className="inline-flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline !no-underline">
						<BookOpen className="w-4 h-4" /> Learn more about available triggers
					</Link>
				</motion.div>
				<motion.div {...stagger(0.1)}>
					<img
						src="/img/money-pages/triggers.webp"
						alt={`${label} triggers`}
						className="rounded-2xl border border-gray-200 dark:border-gray-700 w-full shadow-lg"
						loading="lazy"
					/>
				</motion.div>
			</div>
		</div>
	);
}
