import React from 'react';
import LandingSection from './LandingSection';
import LightFeatureCard from './LightFeatureCard';
import polyGlott from '/illustrations/polyglot.json';
import smartIde from '/illustrations/smart_ide.json';
import secrets from '/illustrations/secrets.json';
import thirdparty from '/illustrations/thirdparty.json';

const features = [
	{
		title: 'Polyglott',
		description:
			'Windmill supports a wide range of languages: Python, Node, Deno, Bun, Go, PostgresQL, bash and more. Dependencies are automatically managed. An UI is auto-generated for your scripts.',
		lottieData: polyGlott,
		span: 'col-span-1'
	},
	{
		title: 'Windmill Smart IDE',
		description:
			'From LSP support to AI code generation, Windmill provides a powerful IDE for your scripts.',
		lottieData: smartIde,
		span: 'col-span-1'
	},
	{
		title: 'Secret Management',
		description:
			'Easily share secrets and other sensitive data with your team. Without compromising security.',
		lottieData: secrets,
		span: 'col-span-1'
	},
	{
		title: 'Third-party integrations',
		description:
			'Connect to APIs using rich objects that you can pick manually before each run or fetch directly within code. Dozens of pre-made integrations on WindmillHub or add your own in minutes.',
		lottieData: thirdparty,
		span: 'col-span-1'
	}
] as {
	title: string;
	description: string;
	images: string[];
	span: string;
	height: number;
	noAnimation?: boolean;
	lottieData?: unknown;
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
							animationDelay={(index + 1) * 32}
							span={feature.span}
							height={feature.height}
							noAnimation={feature.noAnimation}
							lottieData={feature?.lottieData}
						/>
					))}
				</div>
			</div>
		</LandingSection>
	);
}
