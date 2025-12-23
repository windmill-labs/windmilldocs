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
import { BenchmarkVisualization } from '../components/BenchmarkVisualization';
import { ArrowLongDownIcon } from '@heroicons/react/20/solid';
import { useColorMode } from '@docusaurus/theme-common';
import classNames from 'classnames';
import { Switch } from '@headlessui/react';

export default function TutorialSection() {
	const [chart, setChart] = React.useState<'short' | 'long'>('short');

	const { colorMode } = useColorMode();

	const ArrowSeparator = () => (
		<div className="h-20 w-full flex justify-center my-2 py-2">
			<ArrowLongDownIcon className="text-gray-200 dark:text-gray-700" />
		</div>
	);

	return (
		<div className="flex flex-col">
			<div className="max-w-7xl px-4 lg:px-8 mx-auto flex justify-center items-center h-full flex-col">
				{/* Code-first development */}
				<div className="dark:bg-gray-900 bg-gray-50 w-full p-4 rounded-xl grid grid-cols-1 md:grid-cols-5 gap-8">
					<a
						href="/docs/core_concepts/draft_and_deploy#diff-viewer"
						target="_blank"
						className="col-span-2 group text-black dark:text-white !no-underline hover:text-black hover:dark:text-white cursor-pointer flex flex-col justify-center"
					>
						<div className="font-medium text-xl mb-4 group-hover:ml-2 transition-all">
							Code-first development
						</div>
						<div className="text-md mb-4 group-hover:ml-2 transition-all max-w-sm">
							Write logic in 20+ languages (Python, TS, Go, Bash) using your local IDE or our web editor. Build complex orchestrations and custom UIs with full code flexibility, avoiding the constraints of rigid low-code platforms.
						</div>
						<div className="text-sm text-blue-500 dark:text-blue-300 flex flex-row items-center gap-2 group-hover:ml-2 transition-all">
							Learn more
							<ArrowRight size={24} />
						</div>
					</a>
					<div className="col-span-3">
						<Lottie lottieData={devfriendly} autoplay loop />
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
						<div className="flex flex-col w-full gap-4">
							<div className="flex flex-row gap-2 items-center transition-all">
								<span className={classNames('font-light text-sm text-gray-900 dark:text-white')}>
									10 long running tasks
								</span>
								<Switch
									checked={chart === 'short'}
									title="Switch between short and long running tasks"
									onChange={() => {
										setChart(chart === 'long' ? 'short' : 'long');
									}}
									className={`${
										chart === 'short'
											? 'bg-blue-500 dark:bg-blue-900'
											: 'bg-gray-200 dark:bg-gray-800'
									}
									relative inline-flex h-[24px] w-[48px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
								>
									<span
										aria-hidden="true"
										className={`${chart === 'short' ? 'translate-x-6' : 'translate-x-0'}
										pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white  shadow-lg ring-0 transition duration-200 ease-in-out`}
									/>
								</Switch>
								<span className={classNames('font-light text-sm text-gray-900 dark:text-white')}>
									40 lightweight tasks
								</span>
							</div>
							<div
								className={classNames(
									colorMode === 'dark' ? 'bg-black' : 'bg-gray-50',
									'w-full p-4 md:p-8 bg-opacity-40 rounded-xl benchmark-chart-container overflow-x-auto'
								)}
								data-theme={colorMode}
							>
								<div className="grid min-w-0">
									{chart === 'short' ? (
										<div>
											<BenchmarkVisualization
												usecase="fibonacci_40_10"
												language="python"
												engines={[
													'airflow',
													'kestra',
													'prefect',
													'temporal',
													'windmill',
													'windmill_dedicated'
												]}
												workers={1}
												title="40 lightweight tasks comparison (animation time speed 20x)"
												maintainAspectRatio={false}
												shouldAnimate={true}
											/>
										</div>
									) : (
										<div>
											<BenchmarkVisualization
												usecase="fibonacci_10_33"
												language="python"
												engines={[
													'airflow',
													'kestra',
													'prefect',
													'temporal',
													'windmill',
													'windmill_dedicated'
												]}
												workers={1}
												title="10 long running tasks comparison (animation time speed 20x)"
												maintainAspectRatio={false}
												shouldAnimate={true}
											/>
										</div>
									)}
								</div>
							</div>
						</div>
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


