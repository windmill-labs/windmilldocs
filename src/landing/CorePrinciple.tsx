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
	illustration?: React.ReactNode;
}

function FeatureCard({ title, description, actionLink, actionUrl, lottieData, illustration }: FeatureCardProps) {
	return (
		<div className="rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-5 flex flex-col h-full group">
			<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
			<p className="text-sm text-gray-600 dark:text-gray-400 mb-4 flex-grow">
				{description}
			</p>
			{illustration ? (
				<div className="rounded-lg overflow-hidden mb-4 aspect-video">
					{illustration}
				</div>
			) : lottieData ? (
				<div className="rounded-lg bg-gray-100 dark:bg-gray-800 p-4 min-h-[180px] flex items-center justify-center overflow-hidden mb-4">
					<div className="w-full h-full flex items-center justify-center rounded-md">
						<BrowserOnly fallback={<div className="w-full h-full" />}>
							{() => <StaticLottie animationData={lottieData} />}
						</BrowserOnly>
					</div>
				</div>
			) : null}
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

function NoLockInIllustration() {
	return (
		<svg viewBox="0 0 400 225" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
			<defs>
				<radialGradient id="noLockHalo" cx="50%" cy="55%" r="55%">
					<stop offset="0%" stopColor="#3B82F6" stopOpacity="0.55" />
					<stop offset="55%" stopColor="#1E40AF" stopOpacity="0.2" />
					<stop offset="100%" stopColor="#0B1220" stopOpacity="0" />
				</radialGradient>
				<linearGradient id="noLockBody" x1="0%" y1="0%" x2="100%" y2="100%">
					<stop offset="0%" stopColor="#DBEAFE" />
					<stop offset="100%" stopColor="#60A5FA" />
				</linearGradient>
			</defs>
			<rect width="400" height="225" fill="#0B1220" />
			<circle cx="200" cy="112" r="180" fill="url(#noLockHalo)" />

			<g transform="translate(120 65)">
				<rect width="160" height="95" rx="8" fill="url(#noLockBody)" />
				<rect x="8" y="8" width="144" height="79" rx="4" fill="#0B1220" opacity="0.7" />
				<text
					x="80"
					y="56"
					textAnchor="middle"
					fontFamily="ui-monospace, SFMono-Regular, monospace"
					fontSize="22"
					fontWeight="700"
					fill="#93C5FD"
				>
					{'</>'}
				</text>
			</g>
			<rect x="100" y="160" width="200" height="6" rx="3" fill="url(#noLockBody)" />
			<rect x="180" y="160" width="40" height="8" rx="2" fill="#1E40AF" opacity="0.6" />
		</svg>
	);
}

function SecurityIllustration() {
	const logos = [
		'/third_party_logos/openid.webp',
		'/third_party_logos/vault.webp',
		'/third_party_logos/aws_kms.webp'
	];
	const tileSize = 100;
	const gap = 20;
	const totalW = logos.length * tileSize + (logos.length - 1) * gap;
	const startX = (400 - totalW) / 2;
	const startY = (225 - tileSize) / 2;
	return (
		<svg viewBox="0 0 400 225" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
			<defs>
				<radialGradient id="securityHalo" cx="50%" cy="55%" r="55%">
					<stop offset="0%" stopColor="#3B82F6" stopOpacity="0.55" />
					<stop offset="55%" stopColor="#1E40AF" stopOpacity="0.2" />
					<stop offset="100%" stopColor="#0B1220" stopOpacity="0" />
				</radialGradient>
			</defs>
			<rect width="400" height="225" fill="#0B1220" />
			<circle cx="200" cy="112" r="180" fill="url(#securityHalo)" />
			{logos.map((href, i) => {
				const x = startX + i * (tileSize + gap);
				return (
					<g key={i} transform={`translate(${x} ${startY})`}>
						<rect width={tileSize} height={tileSize} rx={tileSize * 0.2} fill="#F8FAFC" stroke="#60A5FA" strokeOpacity="0.35" strokeWidth="1" />
						<image
							href={href}
							x={tileSize * 0.15}
							y={tileSize * 0.15}
							width={tileSize * 0.7}
							height={tileSize * 0.7}
							preserveAspectRatio="xMidYMid meet"
						/>
					</g>
				);
			})}
		</svg>
	);
}

function IntegrationsIllustration() {
	const logos = [
		'/third_party_logos/github.svg',
		'/third_party_logos/slack.svg',
		'/third_party_logos/notion.svg',
		'/third_party_logos/postgres.svg',
		'/third_party_logos/openai.svg',
		'/third_party_logos/stripe.svg',
		'/third_party_logos/snowflake.svg',
		'/third_party_logos/linear.svg',
		'/third_party_logos/hubspot.svg',
		'/third_party_logos/discord.svg',
		'/third_party_logos/mongodb.svg',
		'/third_party_logos/redis.svg',
		'/third_party_logos/anthropic.svg',
		'/third_party_logos/aws.svg',
		'/third_party_logos/gsheets.svg'
	];
	const cols = 5;
	const rows = 3;
	const tileSize = 38;
	const gap = 12;
	const totalW = cols * tileSize + (cols - 1) * gap;
	const totalH = rows * tileSize + (rows - 1) * gap;
	const startX = (400 - totalW) / 2;
	const startY = (225 - totalH) / 2;
	return (
		<svg viewBox="0 0 400 225" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
			<defs>
				<radialGradient id="integrationsHalo" cx="50%" cy="55%" r="55%">
					<stop offset="0%" stopColor="#3B82F6" stopOpacity="0.55" />
					<stop offset="55%" stopColor="#1E40AF" stopOpacity="0.2" />
					<stop offset="100%" stopColor="#0B1220" stopOpacity="0" />
				</radialGradient>
			</defs>
			<rect width="400" height="225" fill="#0B1220" />
			<circle cx="200" cy="112" r="180" fill="url(#integrationsHalo)" />
			{logos.map((href, i) => {
				const col = i % cols;
				const row = Math.floor(i / cols);
				const x = startX + col * (tileSize + gap);
				const y = startY + row * (tileSize + gap);
				return (
					<g key={i} transform={`translate(${x} ${y})`}>
						<rect width={tileSize} height={tileSize} rx={tileSize * 0.2} fill="#F8FAFC" stroke="#60A5FA" strokeOpacity="0.35" strokeWidth="1" />
						<image
							href={href}
							x={tileSize * 0.18}
							y={tileSize * 0.18}
							width={tileSize * 0.64}
							height={tileSize * 0.64}
							preserveAspectRatio="xMidYMid meet"
						/>
					</g>
				);
			})}
		</svg>
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
						illustration={<NoLockInIllustration />}
					/>
					<FeatureCard
						title="Do not reinvent the wheel"
						description="Focus on what matters: your business logic. Every possible integration and trigger with external systems is already built-in with enterprise-grade reliability. PostgreSQL, Snowflake, Kafka, and 100+ more."
						actionLink="Explore integrations"
						actionUrl="https://www.windmill.dev/docs/integrations/integrations_on_windmill"
						illustration={<IntegrationsIllustration />}
					/>
					<FeatureCard
						title="Security and reliability at scale"
						description="Granular RBAC, SSO, Secret Management, and comprehensive Audit Logs. Battle-tested reliability at scale in regulated industries with air-gapped support."
						actionLink="Explore enterprise features"
						actionUrl="https://www.windmill.dev/docs/misc/enterprise_onboarding"
						illustration={<SecurityIllustration />}
					/>
				</div>
			</div>
		</LandingSection>
	);
}
