import React from 'react';
import Link from '@docusaurus/Link';
import { motion } from 'framer-motion';
import {
	Calendar,
	Webhook,
	Mail,
	Route,
	Radio,
	Database,
	Waypoints,
	MessageSquare,
	Cloud,
	Rss,
	Globe,
	MonitorPlay,
	Zap,
	Plug,
	RefreshCw,
} from 'lucide-react';

const fadeIn = {
	initial: { opacity: 0, y: 30 },
	whileInView: { opacity: 1, y: 0 },
	viewport: { once: true },
	transition: { duration: 0.5 },
};

const triggers = [
	{ icon: Calendar, label: 'Schedules', desc: 'Cron and visual cron builder', link: '/docs/core_concepts/scheduling' },
	{ icon: Webhook, label: 'Webhooks', desc: 'Sync and async HTTP triggers', link: '/docs/core_concepts/webhooks' },
	{ icon: Mail, label: 'Emails', desc: 'Trigger on incoming emails', link: '/docs/getting_started/triggers#emails' },
	{ icon: Route, label: 'HTTP routes', desc: 'Custom REST endpoints', link: '/docs/core_concepts/http_routing' },
	{ icon: Radio, label: 'WebSockets', desc: 'Real-time bidirectional events', link: '/docs/core_concepts/websocket_triggers' },
	{ icon: Database, label: 'Postgres', desc: 'CDC and row-level triggers', link: '/docs/core_concepts/postgres_triggers' },
	{ icon: Waypoints, label: 'Kafka', desc: 'Consume from Kafka topics', link: '/docs/core_concepts/kafka_triggers' },
	{ icon: MessageSquare, label: 'NATS', desc: 'Subscribe to NATS subjects', link: '/docs/core_concepts/nats_triggers' },
	{ icon: Cloud, label: 'SQS', desc: 'AWS SQS queue consumer', link: '/docs/core_concepts/sqs_triggers' },
	{ icon: Rss, label: 'MQTT', desc: 'IoT and MQTT broker events', link: '/docs/core_concepts/mqtt_triggers' },
	{ icon: Cloud, label: 'GCP Pub/Sub', desc: 'Google Cloud Pub/Sub events', link: '/docs/core_concepts/gcp_triggers' },
	{ icon: Globe, label: 'Native triggers', desc: 'Nextcloud, Google Drive, Calendar', link: '/docs/core_concepts/native_triggers' },
	{ icon: MonitorPlay, label: 'Auto-generated UIs', desc: 'One-click run from the UI', link: '/docs/getting_started/triggers#auto-generated-uis' },
	{ icon: Zap, label: 'CLI & API', desc: 'Trigger from scripts or CI/CD', link: '/docs/getting_started/triggers#trigger-from-api' },
	{ icon: Plug, label: 'MCP', desc: 'Trigger from LLM clients', link: '/docs/core_concepts/mcp' },
	{ icon: RefreshCw, label: 'Scheduled polls', desc: 'Poll APIs on an interval', link: '/docs/core_concepts/scheduling#scheduled-polls' },
];

export default function TriggerGrid({ title, subtitle }) {
	return (
		<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
			{title !== null && (
				<motion.div {...fadeIn} className="mb-12">
					<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
						{title || 'Every way to trigger a script or flow'}
					</h2>
					{subtitle && (
						<p className="text-lg text-gray-600 dark:text-gray-300">{subtitle}</p>
					)}
				</motion.div>
			)}

			<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
				{triggers.map((trigger) => {
					const Icon = trigger.icon;
					return (
						<Link
							key={trigger.label}
							to={trigger.link}
							className="group flex flex-col gap-2 p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-md transition-all !no-underline"
						>
							<div className="flex items-center gap-2.5">
								<Icon className="w-5 h-5 text-blue-500 shrink-0" />
								<span className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
									{trigger.label}
								</span>
							</div>
							<span className="text-xs text-gray-500 dark:text-gray-400">
								{trigger.desc}
							</span>
						</Link>
					);
				})}
			</div>
		</div>
	);
}
