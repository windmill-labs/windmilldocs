import { PublicAppCodeData } from './public-apps/types';
import { getPublicAppCodeData } from './public-apps';

export interface PublicApp {
	slug: string;
	title: string;
	description: string;
	shortDescription: string;
	iframeUrl: string;
	codeUrl: string;
	repoUrl: string;
	color: 'blue' | 'teal' | 'orange' | 'purple';
	features: string[];
	builtWith: string[];
	thumbnail?: string;
	codeData?: PublicAppCodeData;
}

export const publicApps: PublicApp[] = [
	{
		slug: 'ai-agent',
		title: 'AI Company Assistant',
		shortDescription:
			'An AI assistant that answers questions about your company: team contacts, sales metrics, HR policies, and more.',
		description:
			'A company assistant powered by AI that answers employee questions using your internal data. Ask about team contacts, sales performance, HR policies, or any company information. Built with Windmill scripts as tools that the AI can call to fetch real-time data.',
		iframeUrl: 'https://app.windmill.dev/public/windmill-labs/928711b4b9ac223354f283212d5e7594',
		codeUrl: '',
		repoUrl: 'https://github.com/windmill-labs/windmill-ai-agent-example',
		color: 'purple',
		features: [
			'Frontend in React 19',
			'Windmill flow with built-in AI agent step for backend',
			'Fully customizable AI agent step (knowledge base, AI provider, tools, ...)',
			'Windmill scripts as tools for the AI agent to fetch real-time data'
		],
		builtWith: ['React', 'AI Agent', 'Flows', 'Scripts'],
		thumbnail: '/img/public-apps/ai-company-assistant.png'
	}
];

export function getPublicAppBySlug(slug: string): PublicApp | undefined {
	const publicApp = publicApps.find((app) => app.slug === slug);
	if (publicApp && !publicApp.codeData) {
		publicApp.codeData = getPublicAppCodeData(slug);
	}
	return publicApp;
}
