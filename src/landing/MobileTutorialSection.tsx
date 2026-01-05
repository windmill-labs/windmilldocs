import React from 'react';
import {
	Activity,
	GitCompareArrows,
	Server,
	ArrowRight
} from 'lucide-react';
import { Lottie } from './LightFeatureCard';
// @ts-ignore
import devfriendly from '/illustrations/devfriendly.json';
// @ts-ignore
import performance from '/illustrations/performance.json';
import { ArrowLongDownIcon } from '@heroicons/react/20/solid';
import CombinedAnimation from './CombinedAnimation';

export default function TutorialSection() {

	const ArrowSeparator = () => (
		<div className="h-20 w-full flex justify-center my-2 py-2">
			<ArrowLongDownIcon className="text-gray-200 dark:text-gray-700" />
		</div>
	);

	return (
		<div className="flex flex-col">
			<div className="max-w-7xl px-4 lg:px-8 mx-auto flex justify-center items-center h-full flex-col">
				{/* Develop and iterate with instant feedback */}
				<div className="dark:bg-gray-900 bg-gray-50 w-full p-4 rounded-xl grid grid-cols-1 md:grid-cols-5 gap-8">
					<a
						href="/docs/core_concepts/draft_and_deploy#diff-viewer"
						target="_blank"
						className="col-span-2 group text-black dark:text-white !no-underline hover:text-black hover:dark:text-white cursor-pointer flex flex-col justify-center"
					>
						<div className="font-medium text-xl mb-4 group-hover:ml-2 transition-all">
							Build production ready workflows
						</div>
						<div className="text-md mb-4 group-hover:ml-2 transition-all max-w-sm">
							Orchestrate scalable workflows in 20+ languages and let AI instantly transform them into production-ready frontends.
						</div>
						<div className="text-sm text-blue-500 dark:text-blue-300 flex flex-row items-center gap-2 group-hover:ml-2 transition-all">
							Learn more
							<ArrowRight size={24} />
						</div>
					</a>
					<div className="col-span-3">
						<CombinedAnimation />
					</div>
				</div>
				<ArrowSeparator />

				{/* Team collaboration with Git */}
				<div className="dark:bg-gray-900 bg-gray-50 w-full p-4 rounded-xl grid grid-cols-1 md:grid-cols-5 gap-8">
					<a
						href="/docs/core_concepts/draft_and_deploy#diff-viewer"
						target="_blank"
						className="col-span-2 group text-black dark:text-white !no-underline hover:text-black hover:dark:text-white cursor-pointer flex flex-col justify-center"
					>
						<div className="font-medium text-xl mb-4 group-hover:ml-2 transition-all">
							Team collaboration with Git
						</div>
						<div className="text-md mb-4 group-hover:ml-2 transition-all max-w-sm">
							Sync projects with GitHub or GitLab and manage versions via Pull Requests. Use the built-in diff viewer to prevent regressions and maintain a strict audit trail of every change.
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
				<ArrowSeparator />

				{/* Optimized for scalability */}
				<div className="dark:bg-gray-900 bg-gray-50 w-full p-4 rounded-xl grid grid-cols-1 md:grid-cols-5 gap-8">
					<a
						href="/docs/misc/benchmarks/competitors"
						target="_blank"
						className="col-span-2 group text-black dark:text-white !no-underline hover:text-black hover:dark:text-white cursor-pointer flex flex-col justify-center"
					>
						<div className="font-medium text-xl mb-4 group-hover:ml-2 transition-all">
							Optimized for scalability
						</div>
						<div className="text-md mb-4 group-hover:ml-2 transition-all max-w-sm">
							Powered by a lightweight Rust executor, Windmill minimizes latency and resource overhead. Scale from a single Docker container to Kubernetes clusters with 1,000+ workers to handle high throughput effortlessly.
						</div>
						<div className="text-sm text-blue-500 dark:text-blue-300 flex flex-row items-center gap-2 group-hover:ml-2 transition-all">
							Learn more
							<ArrowRight size={24} />
						</div>
					</a>
					<div className="col-span-3">
						<Lottie lottieData={performance} autoplay loop />
					</div>
				</div>
				<ArrowSeparator />

				{/* Built-on observability */}
				<div className="dark:bg-gray-900 bg-gray-50 w-full p-4 rounded-xl grid grid-cols-1 md:grid-cols-5 gap-8">
					<div className="col-span-2 group text-black dark:text-white cursor-pointer flex flex-col justify-center">
						<div className="font-medium text-xl mb-4 group-hover:ml-2 transition-all">
							Built-on observability
						</div>
						<div className="text-md mb-4 group-hover:ml-2 transition-all max-w-sm">
							Track every run with real-time logs and structured metrics. Spot bottlenecks instantly on the visual timeline and debug failures with full execution context.
						</div>
						<div className="text-sm text-blue-500 dark:text-blue-300 flex flex-row items-center gap-2 group-hover:ml-2 transition-all">
							Learn more
							<ArrowRight size={24} />
						</div>
					</div>
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


