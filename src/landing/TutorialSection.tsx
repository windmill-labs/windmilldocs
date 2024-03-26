import React, { useEffect } from 'react';
import ScriptAnimation from './ScriptAnimation';
import AnimationCarousel from './animations/AnimationCarousel';
import FlowAnimation from './FlowAnimation';
import AppAnimation from './AppAnimation';
import {
	Activity,
	GitCompareArrows,
	Server,
	MoveDown,
	MoveRight,
	ArrowRight,
	CornerLeftDown,
	CornerDownLeft
} from 'lucide-react';
import SmoothScroll from './animations/SmoothScroll';
import ProgressBars from './animations/ProgressBars';
import LandingSection from './LandingSection';
import LightFeatureCard, { Lottie } from './LightFeatureCard';
// @ts-ignore
import deployAtScale from '/illustrations/deploy_at_scale.json';

export default function TutorialSection() {
	const [step, setStep] = React.useState(-1);

	useEffect(() => {
		setStep(0);
	}, []);

	const items = [
		{
			key: 'scripts',
			content: (
				<div className="flex flex-row items-start">
					<ScriptAnimation active={step === 0} />
				</div>
			)
		},
		{
			key: 'flows',
			content: (
				<div className="flex flex-row items-start">
					<FlowAnimation active={step === 1} />
				</div>
			)
		},
		{
			key: 'apps',
			content: (
				<div className=" flex flex-row items-start">
					<AppAnimation active={step === 2} />
				</div>
			)
		}
	];

	return (
		<div className="flex flex-col">
			<SmoothScroll>
				<div className="dark:bg-gray-900 bg-gray-50 w-full p-8 rounded-xl mt-64">
					<div className="flex flex-row justify-between">
						<div className="font-light text-2xl mb-4 max-w-xl">
							{'Develop, iterate, and test quickly'}
						</div>
					</div>
					<ProgressBars setStep={setStep} />
					<AnimationCarousel items={items} currentIndex={step} />
				</div>
			</SmoothScroll>

			<div className="max-w-7xl px-6 lg:px-8 mx-auto flex justify-center items-center h-full flex-col">
				<div className="h-16 w-full flex ">
					<div className="w-full h-full mx-16 grid grid-col-12">
						<div className="col-start-1 col-end-2 flex justify-end items-end relative">
							<CornerLeftDown size={40} className="text-gray-100 dark:text-gray-700" />
						</div>
						<div className="col-start-2 col-end-11 relative h-full flex justify-center flex-col ">
							<div className="w-full border-gray-200 dark:border-gray-700 border-dashed border"></div>
						</div>
						<div className="col-start-11 col-end-12 flex justify-start items-start relative">
							<CornerDownLeft size={40} className="text-gray-100 dark:text-gray-700 mt-1.5" />
						</div>
					</div>
				</div>
				<div className="dark:bg-gray-900 bg-gray-50 w-full p-8 rounded-xl grid grid-cols-1 md:grid-cols-5 gap-8">
					<a
						href="/docs/core_concepts/draft_and_deploy#diff-viewer"
						target="_blank"
						className="col-span-2 group text-black dark:text-white !no-underline hover:text-black hover:dark:text-white cursor-pointer"
					>
						<div className="font-medium text-xl mb-6 group-hover:ml-2 transition-all flex flex-row items-center gap-2 ">
							<GitCompareArrows size={20} />
							Review
						</div>
						<div className="text-md mb-4 group-hover:ml-2 transition-all max-w-sm">
							{
								'Use the built-in diff editor, use Github pull requests or Gitlab merge requests to review changes.'
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
						<div className="rounded-lg overflow-hidden h-full w-full flex flex-col justify-end">
							<img src={'/illustrations/diff.png'} alt={'Review'} />
						</div>
					</div>
				</div>
				<div className="h-16 w-full flex ">
					<div className="w-full h-full mx-16 grid grid-col-12">
						<div className="col-start-1 col-end-2 flex justify-end items-end relative">
							<CornerLeftDown size={40} className="text-gray-100 dark:text-gray-700" />
						</div>
						<div className="col-start-2 col-end-11 relative h-full flex justify-center flex-col ">
							<div className="w-full border-gray-200 dark:border-gray-700 border-dashed border"></div>
						</div>
						<div className="col-start-11 col-end-12 flex justify-start items-start relative">
							<CornerDownLeft size={40} className="text-gray-100 dark:text-gray-700 mt-1.5" />
						</div>
					</div>
				</div>
				<div className="dark:bg-gray-900 bg-gray-50 w-full p-8 rounded-xl grid grid-cols-1 md:grid-cols-5 gap-8">
					<a className="col-span-2 group text-black dark:text-white !no-underline hover:text-black hover:dark:text-white cursor-pointer">
						<div className="font-medium text-xl mb-6 group-hover:ml-2 transition-all flex flex-row items-center gap-2">
							<Server size={20} />
							Deploy at scale
						</div>
						<div className="text-md mb-4 group-hover:ml-2 transition-all max-w-sm">
							{'Run your scripts on our infrastructure, or deploy them to your own servers.'}
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
				<div className="h-16 w-full flex ">
					<div className="w-full h-full mx-16 grid grid-col-12">
						<div className="col-start-1 col-end-2 flex justify-end items-end relative">
							<CornerLeftDown size={40} className="text-gray-100 dark:text-gray-700" />
						</div>
						<div className="col-start-2 col-end-11 relative h-full flex justify-center flex-col ">
							<div className="w-full border-gray-200 dark:border-gray-700 border-dashed border"></div>
						</div>
						<div className="col-start-11 col-end-12 flex justify-start items-start relative">
							<CornerDownLeft size={40} className="text-gray-100 dark:text-gray-700 mt-1.5" />
						</div>
					</div>
				</div>
				<div className="dark:bg-gray-900 bg-gray-50 w-full p-8 rounded-xl grid grid-cols-1 md:grid-cols-5 gap-8">
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
							<img src={'/illustrations/diff.png'} alt={'Review'} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
