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
		<div className="flex flex-col h-full rounded-lg bg-gray-50 dark:bg-gray-800/50 backdrop-blur-sm p-6 shadow-lg border border-gray-200 dark:border-gray-700/50 group">
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
			{lottieData && (
				<div className="mt-auto bg-gray-100 dark:bg-gray-700/80 rounded-md p-4 min-h-[180px] flex items-center justify-center overflow-hidden">
					<div className="w-full h-full flex items-center justify-center rounded-md">
						<BrowserOnly fallback={<div className="w-full h-full" />}>
							{() => <StaticLottie animationData={lottieData} />}
						</BrowserOnly>
					</div>
				</div>
			)}
		</div>
	);
}

export default function CorePrinciple() {
	return (
		<LandingSection bgClass="py-16">
			<div className="w-full">
				<div className="mb-12 text-left">
					<h1 className="tracking-tight leading-tight text-left font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-blue-700 dark:from-blue-400 dark:to-blue-600">
						Our core principles
					</h1>
					<span className="text-lg text-gray-700 max-w-3xl dark:text-gray-200">
						The foundational beliefs that guide how we build Windmill.
					</span>
				</div>

				{/* 3 cards in a row */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
					<FeatureCard
						title="Avoid vendor lock-in"
						description="Open source and self-hostable. Your code, your data, your infrastructure. Deploy anywhere—cloud, on-premises, or air-gapped."
						actionLink="View on GitHub"
						actionUrl="https://github.com/windmill-labs/"
						lottieData={polyGlott}
					/>
					<FeatureCard
						title="Seamless enterprise integration"
						description="Connect to databases (PostgreSQL, MySQL, Snowflake), cloud platforms (AWS, Azure, GCP), message queues (Kafka, SQS, NATS), and 100+ APIs."
						actionLink="Explore integrations"
						actionUrl="https://www.windmill.dev/docs/integrations/integrations_on_windmill"
						lottieData={thirdparty}
					/>
					<FeatureCard
						title="Enterprise-grade security"
						description="Granular RBAC, SSO, Secret Management, and comprehensive Audit Logs. Deploy in regulated industries with air-gapped support."
						actionLink="Explore enterprise features"
						actionUrl="https://www.windmill.dev/docs/misc/enterprise_onboarding"
						lottieData={secrets}
					/>
				</div>
			</div>
		</LandingSection>
	);
}
