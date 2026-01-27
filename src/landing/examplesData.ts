export interface Example {
	slug: string;
	title: string;
	description: string;
	shortDescription: string;
	iframeUrl: string;
	color: 'blue' | 'teal' | 'orange' | 'purple';
	features: string[];
	builtWith: string[];
}

export const examples: Example[] = [
	{
		slug: 'ai-agent',
		title: 'AI Agent',
		shortDescription:
			'Build an AI-powered agent that can interact with your data, answer questions, and automate tasks using LLMs.',
		description:
			'An AI-powered agent built with Windmill that can interact with your data, answer questions, and automate tasks. This example demonstrates how to combine LLM capabilities with Windmill\'s workflow engine to create intelligent automation.',
		iframeUrl: '', // Placeholder - replace with actual Windmill app URL
		color: 'purple',
		features: [
			'Natural language processing',
			'Context-aware responses',
			'Integration with external APIs',
			'Conversation history'
		],
		builtWith: ['React', 'OpenAI', 'Windmill']
	},
	{
		slug: 'data-pipeline',
		title: 'Data Pipeline',
		shortDescription:
			'Create ETL workflows that extract, transform, and load data across multiple sources with scheduling and monitoring.',
		description:
			'A complete ETL pipeline that extracts data from multiple sources, transforms it according to your business logic, and loads it into your data warehouse. Monitor runs, track data quality, and handle errors gracefully.',
		iframeUrl: '', // Placeholder - replace with actual Windmill app URL
		color: 'teal',
		features: [
			'Multi-source data extraction',
			'Scheduled pipeline runs',
			'Data transformation & validation',
			'Error handling & retries'
		],
		builtWith: ['Python', 'PostgreSQL', 'Windmill']
	},
	{
		slug: 'payment-dashboard',
		title: 'Payment Dashboard',
		shortDescription:
			'Track payments, revenue metrics, and financial data with an interactive dashboard connected to your payment provider.',
		description:
			'Track payments, revenue metrics, and financial data with an interactive dashboard. Connect to your payment provider to visualize transactions, monitor subscription health, and identify trends in real-time.',
		iframeUrl: '', // Placeholder - replace with actual Windmill app URL
		color: 'blue',
		features: [
			'Real-time revenue metrics',
			'Transaction history & search',
			'Subscription analytics',
			'Export & reporting'
		],
		builtWith: ['React', 'Stripe', 'Windmill']
	},
	{
		slug: 'customer-support',
		title: 'Customer Support',
		shortDescription:
			'Manage support tickets, track response times, and monitor customer satisfaction with a unified support interface.',
		description:
			'A unified support interface to manage tickets, track response times, and monitor customer satisfaction. Integrate with your existing tools to streamline support workflows and improve team productivity.',
		iframeUrl: '', // Placeholder - replace with actual Windmill app URL
		color: 'orange',
		features: [
			'Ticket management & routing',
			'Response time tracking',
			'Customer satisfaction scores',
			'Team performance metrics'
		],
		builtWith: ['Svelte', 'Zendesk', 'Windmill']
	}
];

export function getExampleBySlug(slug: string): Example | undefined {
	return examples.find((example) => example.slug === slug);
}
