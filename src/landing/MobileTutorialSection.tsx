import React from 'react';
import {
	Activity,
	GitCompareArrows,
	Server,
	ArrowRight
} from 'lucide-react';
import { Lottie } from './LightFeatureCard';
// @ts-ignore
import performance from '/illustrations/performance.json';

export default function TutorialSection() {

	return (
		<div className="flex flex-col">
			<div className="max-w-7xl px-4 lg:px-8 mx-auto flex justify-center items-center h-full flex-col">
				{/* Build for production */}
				<div className="dark:bg-gray-900 bg-gray-50 w-full p-4 rounded-xl flex flex-col gap-6 mb-8">
					<a
						href="/docs/core_concepts/draft_and_deploy#diff-viewer"
						target="_blank"
						className="group text-black dark:text-white !no-underline hover:text-black hover:dark:text-white cursor-pointer"
					>
						<div className="font-medium text-xl mb-4 group-hover:ml-2 transition-all">
							Build for production
						</div>
						<div className="text-md mb-4 group-hover:ml-2 transition-all">
							Build mission-critical internal tools and data pipelines that integrates directly with your existing stack and resources.
						</div>
						<div className="text-sm text-blue-500 dark:text-blue-300 flex flex-row items-center gap-2 group-hover:ml-2 transition-all mb-0">
							Learn more
							<ArrowRight size={24} />
						</div>
					</a>
					<div className="w-full">
						<video
							className="rounded-lg overflow-hidden w-full object-cover"
							autoPlay
							loop
							muted
							playsInline
						>
							<source src="/videos/productintro.mp4" type="video/mp4" />
						</video>
					</div>
				</div>

				{/* Collaborate with Git */}
				<div className="dark:bg-gray-900 bg-gray-50 w-full p-4 rounded-xl grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
					<a
						href="/docs/advanced/git_sync"
						target="_blank"
						className="col-span-2 group text-black dark:text-white !no-underline hover:text-black hover:dark:text-white cursor-pointer flex flex-col justify-center"
					>
						<div className="font-medium text-xl mb-4 group-hover:ml-2 transition-all">
							Collaborate with Git
						</div>
						<div className="text-md mb-4 group-hover:ml-2 transition-all max-w-sm">
							Develop locally, sync changes bi-directionally, and maintain a strict audit trail with built-in diff viewing.
						</div>
						<div className="text-sm text-blue-500 dark:text-blue-300 flex flex-row items-center gap-2 group-hover:ml-2 transition-all">
							Learn more
							<ArrowRight size={24} />
						</div>
					</a>
					<div className="col-span-3">
						<div className="rounded-lg overflow-hidden h-full w-full flex flex-col justify-end">
							<img src="/illustrations/diff.png" alt="Review" />
						</div>
					</div>
				</div>

				{/* Deploy at scale with confidence */}
				<div className="dark:bg-gray-900 bg-gray-50 w-full p-4 rounded-xl grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
					<a
						href="/docs/misc/benchmarks/competitors"
						target="_blank"
						className="col-span-2 group text-black dark:text-white !no-underline hover:text-black hover:dark:text-white cursor-pointer flex flex-col justify-center"
					>
						<div className="font-medium text-xl mb-4 group-hover:ml-2 transition-all">
							Deploy at scale with confidence
						</div>
						<div className="text-md mb-4 group-hover:ml-2 transition-all max-w-sm">
							Process 1,000+ jobs per second with linear horizontal scaling. Auto-scale capacity on demand or isolate critical workloads using dedicated worker groups on Kubernetes and Docker.
						</div>
						<div className="text-sm text-blue-500 dark:text-blue-300 flex flex-row items-center gap-2 group-hover:ml-2 transition-all">
							See benchmarks
							<ArrowRight size={24} />
						</div>
					</a>
					<div className="col-span-3">
						<Lottie lottieData={performance} autoplay loop />
					</div>
				</div>

				{/* Monitor at job granularity */}
				<div className="dark:bg-gray-900 bg-gray-50 w-full p-4 rounded-xl grid grid-cols-1 md:grid-cols-5 gap-8">
					<a
						href="/docs/core_concepts/monitor_past_and_future_runs"
						target="_blank"
						className="col-span-2 group text-black dark:text-white !no-underline hover:text-black hover:dark:text-white cursor-pointer flex flex-col justify-center"
					>
						<div className="font-medium text-xl mb-4 group-hover:ml-2 transition-all">
							Monitor at job granularity
						</div>
						<div className="text-md mb-4 group-hover:ml-2 transition-all max-w-sm">
							Track every job execution with real-time logs and I/O. Get instant Slack or email alerts for failures, or export metrics to OpenTelemetry and Prometheus to monitor your entire stack.
						</div>
						<div className="text-sm text-blue-500 dark:text-blue-300 flex flex-row items-center gap-2 group-hover:ml-2 transition-all">
							Learn more
							<ArrowRight size={24} />
						</div>
					</a>
					<div className="col-span-3">
						<div className="rounded-lg overflow-hidden h-full w-full flex flex-col justify-end">
							<img src="/illustrations/11.png" alt="Monitor" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}


