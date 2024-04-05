import React, { useEffect } from 'react';
import AnimationCarousel from './animations/AnimationCarousel';

import { Activity, GitCompareArrows, Server, ArrowRight } from 'lucide-react';

import { Lottie } from './LightFeatureCard';
// @ts-ignore
import deployAtScale from '/illustrations/deploy_at_scale.json';
import { ArrowLongDownIcon } from '@heroicons/react/20/solid';
import Window from './animations/Window';
import { twMerge } from 'tailwind-merge';

export default function TutorialSection() {
	const containerRef = React.useRef<HTMLDivElement>(null);

	const [currentIndex, setCurrentIndex] = React.useState(0);

	const items = [
		{
			key: 'scripts',
			content: (
				<div className="flex flex-row items-start">
					<div className="bg-gradient-to-br from-blue-200 to-sky-400 dark:from-blue-700 dark:to-sky-600 w-full rounded-lg p-2 shadow-inner overflow-hidden h-full">
						<Window
							shouldRender={true}
							name="Scripts | Windmill"
							icon="/third_party_logos/firefox.svg"
						>
							<img
								src="/images/script_example.png"
								alt="Scripts"
								className="w-full object-cover object-left-top h-full "
							/>
						</Window>
					</div>
				</div>
			)
		},
		{
			key: 'flows',
			content: (
				<div className="bg-gradient-to-br from-emerald-200 to-emerald-400 dark:from-emerald-500 dark:to-emerald-600 w-full rounded-lg p-2 shadow-inner overflow-hidden ">
					<Window shouldRender={true} name="Flows | Windmill" icon="/third_party_logos/firefox.svg">
						<img
							src="/images/flow_example.png"
							alt="Flows"
							className="w-full object-cover object-left-top h-full "
						/>
					</Window>
				</div>
			)
		},
		{
			key: 'apps',
			content: (
				<div className=" flex flex-row items-start">
					<div className="bg-gradient-to-br from-orange-200 to-orange-400 dark:from-orange-700 dark:to-orange-600 w-full rounded-lg p-2 shadow-inner overflow-hidden ">
						<Window
							shouldRender={true}
							name="Apps | Windmill"
							icon="/third_party_logos/firefox.svg"
						>
							<img
								src="/images/app_example.png"
								alt="Apps"
								className="w-full object-cover object-left-top h-full "
							/>
						</Window>
					</div>
				</div>
			)
		}
	];

	return (
		<>
			<div
				className="flex flex-col relative max-w-7xl px-4 lg:px-8 mx-auto w-full"
				ref={containerRef}
			>
				<div className="dark:bg-gray-900 bg-gray-50 w-full p-4 rounded-xl">
					<div className="flex flex-col justify-between items-center">
						<div className="font-light text-2xl mb-4 max-w-2xl">
							{'Develop and iterate with instant feedback'}
						</div>
						<div className="flex flex-row items-start my-2 gap-2 w-full">
							<div
								onClick={() => setCurrentIndex(0)}
								className={twMerge(
									'cursor-pointer px-2 py-1 border-b-2  hover:bg-opacity-50 ',
									currentIndex === 0 ? ' border-blue-600' : 'border-blue-800'
								)}
							>
								Scripts
							</div>
							<div
								onClick={() => setCurrentIndex(1)}
								className={twMerge(
									'cursor-pointer px-2 py-1 border-b-2  hover:bg-opacity-50 ',
									currentIndex === 1 ? ' border-emerald-600' : 'border-emerald-800'
								)}
							>
								Flows
							</div>
							<div
								onClick={() => setCurrentIndex(2)}
								className={twMerge(
									'cursor-pointer px-2 py-1 border-b-2  hover:bg-opacity-50 ',
									currentIndex === 2 ? ' border-orange-600' : 'border-orange-800'
								)}
							>
								Apps
							</div>
						</div>
						<AnimationCarousel
							items={items}
							currentIndex={currentIndex}
							itemWidth={containerRef?.current?.clientWidth}
						/>
						<div className="text-opacity-50 text-sm">Animation available on desktop</div>
					</div>
				</div>
				<div className="h-20 w-full flex justify-center my-2 py-2">
					<ArrowLongDownIcon className="text-gray-200 dark:text-gray-700" />
				</div>
			</div>
			<div className="max-w-7xl px-4 lg:px-8 mx-auto flex justify-center items-center h-full flex-col">
				<div className="dark:bg-gray-900 bg-gray-50 w-full p-4 rounded-xl grid grid-cols-1 md:grid-cols-5 gap-8">
					<a
						href="/docs/core_concepts/draft_and_deploy#diff-viewer"
						target="_blank"
						className="col-span-2 group text-black dark:text-white !no-underline hover:text-black hover:dark:text-white cursor-pointer "
					>
						<div className="font-medium text-xl mb-6 group-hover:ml-2 transition-all flex flex-row items-center gap-2 ">
							<GitCompareArrows size={20} />
							Review
						</div>
						<div className="text-md mb-4 group-hover:ml-2 transition-all max-w-sm">
							{'Use the built-in diff viewer, GitHub PRs or GitLab MRs to review changes.'}
						</div>
						<div
							className={`text-sm text-blue-500 dark:text-blue-300 flex flex-row items-center gap-2 group-hover:ml-2 transition-all`}
						>
							Learn more
							<ArrowRight size={24} />
						</div>
					</a>
					<div className="col-span-3">
						<div className="rounded-lg overflow-hidden h-full w-full flex flex-col justify-end">
							<img src={'/illustrations/diff.png'} alt={'Review'} />
						</div>
					</div>
				</div>
				<div className="h-20 w-full flex justify-center my-2 py-2">
					<ArrowLongDownIcon className="text-gray-200 dark:text-gray-700" />
				</div>

				<div className="dark:bg-gray-900 bg-gray-50 w-full p-4 rounded-xl grid grid-cols-1 md:grid-cols-5 gap-8">
					<a
						href="/docs/advanced/deploy_to_prod"
						target="_blank"
						className="col-span-2 group text-black dark:text-white !no-underline hover:text-black hover:dark:text-white cursor-pointer"
					>
						<div className="font-medium text-xl mb-6 group-hover:ml-2 transition-all flex flex-row items-center gap-2">
							<Server size={20} />
							Deploy at scale
						</div>
						<div className="text-md mb-4 group-hover:ml-2 transition-all max-w-sm">
							{
								'Deploy with ease on our infrastructure or your own infrastructure, on bare VMs with docker-compose, ecs, or large Kubernetes clusters with up to 1000 workers and even remote agents.'
							}
						</div>
						<div
							className={`text-sm text-blue-500 dark:text-blue-300 flex flex-row items-center gap-2 group-hover:ml-2 transition-all`}
						>
							Learn more
							<ArrowRight size={24} />
						</div>
					</a>
					<div className="col-span-3">
						<Lottie lottieData={deployAtScale} autoplay loop />
					</div>
				</div>
				<div className="h-20 w-full flex justify-center my-2 py-2">
					<ArrowLongDownIcon className="text-gray-200 dark:text-gray-700" />
				</div>
				<div className="dark:bg-gray-900 bg-gray-50 w-full p-4 rounded-xl grid grid-cols-1 md:grid-cols-5 gap-8">
					<a className="col-span-2 group text-black dark:text-white !no-underline hover:text-black hover:dark:text-white cursor-pointer">
						<div className="font-medium text-xl mb-6 group-hover:ml-2 transition-all flex flex-row items-center gap-2">
							<Activity size={20} />
							Monitor
						</div>
						<div className="text-md mb-4 group-hover:ml-2 transition-all max-w-sm">
							{'Keep track of your scripts, flows, and apps with detailed logs and metrics.'}
						</div>
						<div
							className={`text-sm text-blue-500 dark:text-blue-300 flex flex-row items-center gap-2 group-hover:ml-2 transition-all`}
						>
							Learn more
							<ArrowRight size={24} />
						</div>
					</a>
					<div className="col-span-3">
						<div className="rounded-lg overflow-hidden h-full w-full flex flex-col justify-end">
							<img src={'/illustrations/11.png'} alt={'Review'} />
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
