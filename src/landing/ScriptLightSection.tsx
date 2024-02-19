import React from 'react';
import LandingSection from './LandingSection';
import LightFeatureCard from './LightFeatureCard';
import {
	SiGnubash,
	SiGo,
	SiPython,
	SiTypescript,
	SiGraphql,
	SiDocker,
	SiPostgresql
} from 'react-icons/si';

const features = [
	{
		title: 'Polyglott',
		description:
			'Windmill supports a wide range of languages: Python, Node, Deno, Bun, Go, PostgresQL, bash and more. Dependencies are automatically managed. An UI is auto-generated for your scripts.',
		images: ['/images/script-1-light.png'],
		span: 'col-span-2',
		height: 600,
		buttons: [
			{
				title: 'Typescript (Deno, Bun, Node.js)',
				description: 'Write your first Windmill script in Typescript.',
				href: '/docs/getting_started/scripts_quickstart/typescript',
				Icon: SiTypescript
			},
			{
				title: 'Python',
				description: 'Write your first Windmill script in Python.',
				href: '/docs/getting_started/scripts_quickstart/python',
				Icon: SiPython
			},
			{
				title: 'Bash / Powershell',
				description: 'Write your first Windmill script in Bash / Powershell.',
				href: '/docs/getting_started/scripts_quickstart/bash',
				Icon: SiGnubash
			},
			{
				title: 'Docker',
				description: 'Windmill supports running any docker container through its Bash support.',
				href: '/docs/getting_started/scripts_quickstart/docker',
				Icon: SiDocker
			},
			{
				title: 'Go',
				description: 'Write your first Windmill script in Go.',
				href: '/docs/getting_started/scripts_quickstart/go',
				Icon: SiGo
			},
			{
				title: 'SQL & Query Languages',
				description:
					'Write your first Windmill script in PostgreSQL, MySQL, BigQuery or Snowflake SQL.',
				href: '/docs/getting_started/scripts_quickstart/sql',
				Icon: SiPostgresql
			},
			{
				title: 'Rest / GraphQL',
				description: 'Write your first Windmill script in Rest / GraphQL.',
				href: '/docs/getting_started/scripts_quickstart/rest_graphql',
				Icon: SiGraphql
			}
		]
	},
	{
		title: 'Windmill Smart IDE',
		description:
			'From LSP support to AI code generation, Windmill provides a powerful IDE for your scripts.',
		images: ['/images/script-1.png'],
		span: 'col-span-2',
		height: 500
	},

	{
		title: 'Resources and variables',
		description:
			'Easily share third-party API keys and other sensitive data with your team. Without compromising security.',
		images: ['/images/script-2.png'],
		span: 'col-span-1',
		height: 500
	},
	{
		title: 'Triggers',
		description:
			'Trigger scripts from webhooks, schedules, CLI, Slack, and more. Easily integrate with your existing tools.',
		images: ['/images/script-1.png'],
		span: 'col-span-1',
		height: 500
	},
	{
		title: 'Developer first',
		description:
			'Develop scripts locally with your favorite code editor, preview them locally and deploy them with the CLI, sync them with Git. Iterate quickly with our VS Code Extension.',
		images: ['/images/script-1.png', '/images/script-1.png', '/images/script-1.png'],
		span: 'col-span-2',
		height: 500,
		noAnimation: true
	}
] as {
	title: string;
	description: string;
	images: string[];
	span: string;
	height: number;
	noAnimation?: boolean;
	buttons?: { title: string; Icon: any; description: string; href: string }[];
}[];

const colors = {
	bgColor: 'bg-blue-100/30 dark:bg-sky-900/30 hover:bg-blue-100/60',
	titleColor: 'text-blue-950 dark:text-blue-300',
	textColor: 'text-gray-600 dark:text-gray-100'
};

export default function ScriptSection() {
	return (
		<LandingSection bgClass="">
			<div className="w-full gap-4 flex flex-col">
				<div className={`${colors.titleColor} text-4xl font-medium mb-2`}>Scripts</div>
				<div className={`${colors.textColor} text-lg `}>Code to production in minutes</div>
				<span className={`text-md ${colors.textColor} max-w-3xl mb-8`}>
					Run long-running heavy background jobs, script with complex dependencies, endpoints with
					high rpm or simple one-off tasks without any overhead. Trigger them from a webhook or the
					auto-generated UI and monitor them easily.
				</span>
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					{features.map((feature, index) => (
						<LightFeatureCard
							key={index}
							feature={feature}
							colors={{
								bgColor: colors.bgColor
							}}
							animationDelay={(index + 1) * 32}
							span={feature.span}
							height={feature.height}
							noAnimation={feature.noAnimation}
							buttons={feature?.buttons}
						/>
					))}
				</div>
			</div>
		</LandingSection>
	);
}
