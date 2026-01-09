import React, { useRef, useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import LandingSection from './LandingSection';
import { Lottie } from './LightFeatureCard';
// @ts-ignore
import devfriendly from '/illustrations/devfriendly.json';

interface FeatureCardProps {
	title: string;
	description: string;
	href: string;
	actionText?: string;
	image?: string;
	imageAlt?: string;
	video?: string;
	lottieData?: unknown;
}

function FeatureCard({ title, description, href, actionText = 'Learn more', image, imageAlt, video, lottieData }: FeatureCardProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const videoRef = useRef<HTMLVideoElement>(null);
	const [hasBeenVisible, setHasBeenVisible] = useState(false);

	// Start video when 80% visible
	useEffect(() => {
		if (!video) return;
		const container = containerRef.current;
		if (!container) return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && !hasBeenVisible) {
					setHasBeenVisible(true);
					videoRef.current?.play();
				}
			},
			{ threshold: 0.8 }
		);

		observer.observe(container);
		return () => observer.disconnect();
	}, [hasBeenVisible, video]);

	return (
		<div ref={containerRef} className="dark:bg-gray-900 bg-gray-50 w-full p-6 rounded-xl grid grid-cols-1 md:grid-cols-5 gap-8">
			<a
				href={href}
				target="_blank"
				className="col-span-2 group text-black dark:text-white !no-underline hover:text-black hover:dark:text-white cursor-pointer flex flex-col justify-center"
			>
				<div className="font-medium text-xl mb-4 group-hover:ml-2 transition-all">
					{title}
				</div>
				<div className="text-md mb-4 group-hover:ml-2 transition-all max-w-sm">
					{description}
				</div>
				<div className="text-sm text-blue-500 dark:text-blue-300 flex flex-row items-center gap-2 group-hover:ml-2 transition-all">
					{actionText}
					<ArrowRight size={20} />
				</div>
			</a>
			<div className="col-span-3">
				{lottieData ? (
					<Lottie lottieData={lottieData} autoplay loop />
				) : video ? (
					<video
						ref={videoRef}
						className="rounded-lg overflow-hidden h-full w-full object-cover"
						loop
						muted
						playsInline
						preload="metadata"
					>
						<source src={video} type="video/mp4" />
					</video>
				) : image ? (
					<div className="rounded-lg overflow-hidden h-full w-full flex flex-col justify-end">
						<img src={image} alt={imageAlt || title} className="w-full" />
					</div>
				) : null}
			</div>
		</div>
	);
}

export default function DeveloperExperienceSection() {
	return (
		<LandingSection bgClass="py-16">
			<div className="w-full">
				<div className="mb-12 text-left">
					<h1 className="tracking-tight leading-tight text-left font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-blue-700 dark:from-blue-400 dark:to-blue-600">
						Made for developers, used across the whole organization
					</h1>
					<span className="text-lg text-gray-700 max-w-3xl dark:text-gray-200">
					We make it easy for developers to build internal software and deploy it across their whole organization with no overhead.
					</span>
				</div>
				<div className="flex flex-col gap-6">
					<FeatureCard
						title="Develop locally"
						description="Develop in our cloud editor or locally via our CLI and VS Code extension. Leverage AI-assisted rules for Cursor and Claude, and deploy through automated Git-sync pipelines across staging and production."
						href="/docs/advanced/local_development"
						actionText="Set up local dev"
						lottieData={devfriendly}
					/>
					<FeatureCard
						title="Collaborate with full Git flexibility"
						description="Enable parallel teamwork with workspace forks that sync to Git branches. Review changes with built-in diffs and maintain a strict audit trail before merging to production."
						href="/docs/advanced/git_sync"
						image="/illustrations/diff.png"
						imageAlt="Git integration"
					/>
					<FeatureCard
						title="Monitor with ease and depth"
						description="Track every job execution with real-time logs and I/O. Get instant Slack or email alerts for failures, or export metrics to OpenTelemetry and Prometheus."
						href="/docs/core_concepts/monitor_past_and_future_runs"
						video="/videos/your-observability-video.mp4"
					/>
				</div>
			</div>
		</LandingSection>
	);
}
