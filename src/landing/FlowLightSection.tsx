import React from 'react';
import {
	Code,
	FormInput,
	Github,
	Key,
	WebhookIcon,
	Database,
	Play,
	Terminal,
	CalendarClock,
	FormInputIcon,
	FileCode,
	AlignLeftIcon,
	CurlyBracesIcon,
	FileLock2,
	Lock,
	DownloadIcon,
	MessageSquareIcon,
	Box,
	Gitlab,
	BoxesIcon,
	Sparkles,
	PlayCircle
} from 'lucide-react';
import {
	SiGnubash,
	SiGo,
	SiPython,
	SiTypescript,
	SiVisualstudiocode,
	SiGraphql
} from 'react-icons/si';

import LandingSection from './LandingSection';

import polyGlott from '/illustrations/approval.json';
import smartIde from '/illustrations/performance.json';
import secrets from '/illustrations/triggers.json';
import thirdparty from '/illustrations/triggers.json';
import LightFeatureCard from './LightFeatureCard';

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

export default function FlowsLightSections() {
	return (
		<LandingSection bgClass="">
			<div className="w-full gap-8 flex flex-col">
				<div className="text-4xl font-medium text-green-900">Flows</div>
				<div className="text-lg text-gray-600">Code to production in minutes</div>
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
