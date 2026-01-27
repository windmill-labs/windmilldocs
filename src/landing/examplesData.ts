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
	}
];

export function getExampleBySlug(slug: string): Example | undefined {
	return examples.find((example) => example.slug === slug);
}
