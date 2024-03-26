import React from 'react';
import LandingSection from './LandingSection';
// @ts-ignore
import polyGlott from '/illustrations/polyglot.json';
// @ts-ignore
import secrets from '/illustrations/secrets.json';
// @ts-ignore
import triggers from '/illustrations/triggers.json';
// @ts-ignore
import devfriendly from '/illustrations/devfriendly.json';
import CardSection from './cards-v2/CardSection';
import { FileCode, Lock, LucideIcon, TerminalSquare, TextCursorInput } from 'lucide-react';

const features = [
	{
		title: 'Polyglot',
		description:
			'Windmill supports a wide range of languages: Python, Node, Deno, Bun, Go, PostgresQL, bash and more. Dependencies are automatically managed. An UI is auto-generated for your scripts.',
		lottieData: polyGlott,
		span: 'col-span-2',
		Icon: FileCode,
		url: '/docs/getting_started/scripts_quickstart'
	},

	{
		title: 'Secret Management',
		description:
			'Easily share secrets and other sensitive data with your team. Without compromising security.',
		lottieData: secrets,
		span: 'col-span-2 md:col-span-1',
		Icon: Lock,
		url: '/docs/core_concepts/variables_and_secrets#secrets',
		vertical: true
	},

	{
		title: 'Triggers',
		description: 'Trigger scripts from webhooks, schedules, CLI, Slack, and more. ',
		lottieData: triggers,
		span: 'col-span-2 md:col-span-1',
		url: '/docs/getting_started/trigger_scripts',
		vertical: true,
		Icon: TextCursorInput
	},
	{
		title: 'Web IDE or Local developement',
		description:
			'Develop scripts locally with your favorite code editor, preview them locally and deploy them with the CLI, sync them with Git. Iterate quickly with our VS Code Extension. From LSP support to AI code generation, Windmill provides a powerful IDE for your scripts.',
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
