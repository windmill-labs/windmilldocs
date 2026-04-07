import React from 'react';
import LandingSection from './LandingSection';
import { ArrowRight } from 'lucide-react';
import BrowserOnly from '@docusaurus/BrowserOnly';
// @ts-ignore
import polyGlott from '/illustrations/polyglot.json';
// @ts-ignore
import secrets from '/illustrations/secrets.json';
// @ts-ignore
import thirdparty from '/illustrations/thirdparty.json';

// Client-only component that renders a static frame of a Lottie animation
function StaticLottie({ animationData }: { animationData: unknown }) {
	const { useLottie } = require('lottie-react');
	const { View, goToAndStop, getDuration } = useLottie({
		animationData,
		loop: false,
		autoplay: false
	});

	React.useEffect(() => {
		// Go to 90% of the animation
		const totalFrames = getDuration(true);
		if (totalFrames > 0) {
			goToAndStop(Math.floor(totalFrames * 0.90), true);
		}
	}, [goToAndStop, getDuration]);

	return View;
}

interface FeatureCardProps {
	title: string;
	description: string;
	actionLink: string;
	actionUrl?: string;
	lottieData?: unknown;
}

function FeatureCard({ title, description, actionLink, actionUrl, lottieData }: FeatureCardProps) {
	return (
		<div className="rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-5 flex flex-col h-full group">
			<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
			<p className="text-sm text-gray-600 dark:text-gray-400 mb-4 flex-grow">
				{description}
			</p>
			{lottieData && (
				<div className="rounded-lg bg-gray-100 dark:bg-gray-800 p-4 min-h-[180px] flex items-center justify-center overflow-hidden mb-4">
					<div className="w-full h-full flex items-center justify-center rounded-md">
						<BrowserOnly fallback={<div className="w-full h-full" />}>
							{() => <StaticLottie animationData={lottieData} />}
						</BrowserOnly>
					</div>
				</div>
			)}
			<a
				href={actionUrl || '#'}
				className="text-sm text-blue-600 dark:text-blue-400 flex flex-row items-center gap-2 group-hover:ml-2 transition-all hover:text-blue-700 dark:hover:text-blue-300"
				target={actionUrl && actionUrl.startsWith('http') ? '_blank' : undefined}
				rel={actionUrl && actionUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
			>
				{actionLink}
				<ArrowRight size={24} />
			</a>
		</div>
	);
}

export default function CorePrinciple() {
	return (
		<LandingSection bgClass="py-16">
			<div className="w-full">
				<div className="mb-12 text-left">
					<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
						Our core principles
					</h2>
					<p className="text-lg text-gray-600 dark:text-gray-300">
						The foundational beliefs that guide how we build Windmill.
					</p>
				</div>

				{/* 3 cards in a row */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
					<FeatureCard
						title="No lock-in"
						description="Open source and self-hostable. Your code, your data, your infrastructure. Normal code in mainstream languages, no custom or proprietary SDKs. Run it locally, generate it with LLMs, port it anytime."
						actionLink="View on GitHub"
						actionUrl="https://github.com/windmill-labs/"
						lottieData={polyGlott}
					/>
					<FeatureCard
						title="Do not reinvent the wheel"
						description="Focus on what matters: your business logic. Every possible integration and trigger with external systems is already built-in with enterprise-grade reliability. PostgreSQL, Snowflake, Kafka, and 100+ more."
						actionLink="Explore integrations"
						actionUrl="https://www.windmill.dev/docs/integrations/integrations_on_windmill"
						lottieData={thirdparty}
					/>
					<FeatureCard
						title="Security and reliability at scale"
						description="Granular RBAC, SSO, Secret Management, and comprehensive Audit Logs. Battle-tested reliability at scale in regulated industries with air-gapped support."
						actionLink="Explore enterprise features"
						actionUrl="https://www.windmill.dev/docs/misc/enterprise_onboarding"
						lottieData={secrets}
					/>
				</div>
			</div>
		</LandingSection>
	);
}
