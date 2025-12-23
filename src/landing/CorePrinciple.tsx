import React from 'react';
import LandingSection from './LandingSection';
import { ArrowRight } from 'lucide-react';
import { useLottie } from 'lottie-react';
// @ts-ignore
import devfriendly from '/illustrations/devfriendly.json';
// @ts-ignore
import deployAtScale from '/illustrations/deploy_at_scale.json';
// @ts-ignore
import polyGlott from '/illustrations/polyglot.json';
// @ts-ignore
import smartIde from '/illustrations/smart_ide.json';
// @ts-ignore
import secrets from '/illustrations/secrets.json';

interface FeatureCardProps {
	title: string;
	description: string;
	actionLink: string;
	actionUrl?: string;
	imageSrc?: string;
	imageAlt?: string;
	lottieData?: unknown;
}

function FeatureCard({ title, description, actionLink, actionUrl, imageSrc, imageAlt = '', lottieData }: FeatureCardProps) {
	const lottieOptions = lottieData
		? {
				animationData: lottieData,
				loop: true,
				autoplay: false
		  }
		: null;
	const { View, play } = lottieOptions ? useLottie(lottieOptions) : { View: null, play: () => {} };

	return (
		<div
			className="flex flex-col h-full rounded-lg bg-gray-50 dark:bg-gray-800/50 backdrop-blur-sm p-6 shadow-lg border border-gray-200 dark:border-gray-700/50 group"
			onMouseOver={() => {
				if (lottieData) play();
			}}
		>
			<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{title}</h3>
			<p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow text-base leading-relaxed">
				{description}
			</p>
			<a
				href={actionUrl || '#'}
				className="text-sm text-blue-600 dark:text-blue-400 flex flex-row items-center gap-2 group-hover:ml-2 transition-all mb-4 hover:text-blue-700 dark:hover:text-blue-300"
				target={actionUrl && actionUrl.startsWith('http') ? '_blank' : undefined}
				rel={actionUrl && actionUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
			>
				{actionLink}
				<ArrowRight size={24} />
			</a>
			<div className="mt-auto bg-gray-100 dark:bg-gray-700/80 rounded-md p-4 min-h-[220px] flex items-center justify-center overflow-hidden">
				{lottieData ? (
					<div className="w-full h-full flex items-center justify-center rounded-md">
						{View}
					</div>
				) : (
					<img
						src={imageSrc}
						alt={imageAlt}
						className="w-full h-auto object-contain rounded-md"
						loading="lazy"
					/>
				)}
			</div>
		</div>
	);
}

export default function CorePrinciple() {
	return (
		<LandingSection bgClass="bg-gray-50 dark:bg-gray-900 py-16">
			<div className="w-full">
				<div className="mb-12 text-left">
					<h1 className="tracking-tight leading-tight text-left font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-blue-700 dark:from-blue-400 dark:to-blue-600">
						3 core principles
					</h1>
					<p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl"></p>
					<span className="text-lg text-gray-700 max-w-3xl dark:text-gray-200">
						The foundational beliefs that guide how we build Windmill.
					</span>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
					<FeatureCard
						title="No vendor lock-in"
						description="Open source and self-hostable. Your code, your data, your infrastructure. Deploy anywhere—cloud, on-premises, or air-gapped. Full control without proprietary constraints."
						actionLink="View on GitHub"
						actionUrl="https://github.com/windmill-labs/"
						lottieData={polyGlott}
					/>
					<FeatureCard
						title="Best developer experience"
						description="Combine the flexibility of standard code with the speed of zero-overhead development. We abstract away the complexity of infrastructure and scaling, so you can focus purely on business logic—not the plumbing."
						actionLink="Read our philosophy"
						actionUrl="https://www.windmill.dev/docs/misc/note_of_intent"
						lottieData={smartIde}
					/>
					<FeatureCard
						title="Enterprise-grade security"
						description="Designed for the strictest compliance requirements. From granular RBAC, SSO, and Secret Management to comprehensive Audit Logs. Deploy comfortably in regulated industries with horizontal scaling and air-gapped support."
						actionLink="Explore enterprise features"
						actionUrl="https://www.windmill.dev/docs/misc/enterprise_onboarding"
						lottieData={secrets}
					/>
				</div>
			</div>
		</LandingSection>
	);
}
