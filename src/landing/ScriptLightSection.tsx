import React from 'react';
import LandingSection from './LandingSection';
import polyGlott from '/illustrations/polyglot.json';
import smartIde from '/illustrations/smart_ide.json';
import secrets from '/illustrations/secrets.json';
import thirdparty from '/illustrations/thirdparty.json';
import triggers from '/illustrations/triggers.json';
import devfriendly from '/illustrations/devfriendly.json';
import CardSection from './cards-v2/CardSection';
import { AppWindow, Code, FileCode, Lock, LucideIcon, TerminalSquare } from 'lucide-react';

const features = [
	{
		title: 'Polyglott',
		description:
			'Windmill supports a wide range of languages: Python, Node, Deno, Bun, Go, PostgresQL, bash and more. Dependencies are automatically managed. An UI is auto-generated for your scripts.',
		lottieData: polyGlott,
		span: 'col-span-2',
		Icon: FileCode,
		url: '/docs/getting_started/scripts_quickstart'
	},
	{
		title: 'Windmill Smart IDE',
		description:
			'From LSP support to AI code generation, Windmill provides a powerful IDE for your scripts.',
		lottieData: smartIde,
		span: 'col-span-1',
		Icon: AppWindow,
		url: '/docs/code_editor'
	},
	{
		title: 'Secret Management',
		description:
			'Easily share secrets and other sensitive data with your team. Without compromising security.',
		lottieData: secrets,
		span: 'col-span-1',
		Icon: Lock,
		url: '/docs/core_concepts/variables_and_secrets#secrets'
	},
	{
		title: 'Third-party integrations',
		description:
			'Connect to APIs using rich objects that you can pick manually before each run or fetch directly within code. Dozens of pre-made integrations on WindmillHub or add your own in minutes.',
		lottieData: thirdparty,
		span: 'col-span-1',
		url: 'https://hub.windmill.dev/resources'
	},
	{
		title: 'Triggers',
		description:
			'Trigger scripts from webhooks, schedules, CLI, Slack, and more. Easily integrate with your existing tools.',
		lottieData: triggers,
		span: 'col-span-1',
		url: '/docs/getting_started/trigger_scripts'
	},
	{
		title: 'Developer friendly',
		description:
			'Develop scripts locally with your favorite code editor, preview them locally and deploy them with the CLI, sync them with Git. Iterate quickly with our VS Code Extension.',
		lottieData: devfriendly,
		span: 'col-span-2',
		Icon: TerminalSquare,
		url: '/docs/advanced/local_development'
	}
] as {
	title: string;
	description: string;
	images: string[];
	span: string;
	height: number;
	noAnimation?: boolean;
	lottieData?: unknown;
	Icon: LucideIcon;
	url?: string;
}[];

const colors = {
	titleColor: 'text-blue-900 dark:text-blue-300',
	textColor: 'text-gray-600 dark:text-gray-100',
	linkColor: 'text-blue-500 dark:text-blue-300'
};

export default function ScriptSection() {
	return (
		<LandingSection bgClass="">
			<CardSection
				colors={colors}
				title="Code to production in minutes"
				description="Run long-running heavy background jobs, script with complex dependencies, endpoints with high rpm or simple one-off tasks without any overhead. Trigger them from a webhook or the auto-generated UI and monitor them easily."
				features={features}
				defaultImage="/illustrations/fond-scripts.png"
			/>
		</LandingSection>
	);
}
