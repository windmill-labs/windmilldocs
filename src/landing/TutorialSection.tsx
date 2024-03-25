import React, { useEffect } from 'react';
import ScriptAnimation from './ScriptAnimation';
import AnimationCarousel from './animations/AnimationCarousel';
import FlowAnimation from './FlowAnimation';
import AppAnimation from './AppAnimation';
import { Activity, GitCompareArrows, Server, MoveDown, MoveRight } from 'lucide-react';
import SmoothScroll from './animations/SmoothScroll';
import ProgressBars from './animations/ProgressBars';
import LandingSection from './LandingSection';
import LightFeatureCard from './LightFeatureCard';
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
		<div className="flex flex-col gap-8 ">
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
			<div className="mx-auto w-[700px] h-[128px] flex items-start flex-row">
				<MoveDown className=" text-gray-100 w-[128px] h-[100px] flex items-start flex-row" />
			</div>
			<LandingSection bgClass="flex flex-col !py-0 w-full">
				<div className="grid grid-cols-11 w-full relative gap-4">
					<LightFeatureCard
						feature={{
							title: 'Review',
							description:
								'Use the built-in diff editor, use Github pull requests or Gitlab merge requests to review changes.',
							images: []
						}}
						url=""
						spanOverride="col-span-12 md:col-span-5"
						defaultImage="/illustrations/diff.png"
						height={400}
						animationDelay={8}
						linkColor="text-blue-400"
						Icon={GitCompareArrows}
						noAnimation={true}
						lottieData={undefined}
						vertical={true}
					/>
					<div className="col-span-1 my-auto">
						<MoveRight className=" text-gray-100 w-full h-24 " />
					</div>
					<LightFeatureCard
						feature={{
							title: 'Deploy at scale',
							description:
								'Run your scripts on our infrastructure, or deploy them to your own servers.',
							images: []
						}}
						url=""
						spanOverride="col-span-12 md:col-span-5"
						defaultImage="/illustrations/fond-scripts.png"
						height={400}
						animationDelay={8}
						linkColor="text-blue-400"
						Icon={Server}
						noAnimation={true}
						lottieData={deployAtScale}
						autoplay
						vertical={true}
					/>
					<div className="col-start-8 col-end-11">
						<MoveDown className=" text-gray-100 h-24 w-24 mx-auto" />
					</div>
					<LightFeatureCard
						feature={{
							title: 'Monitor',
							description:
								'Each workspace has a dedicated Runs menu that allows you to visualise all past and future runs.',
							images: []
						}}
						url=""
						height={400}
						animationDelay={8}
						spanOverride="col-span-12 grid-cols-1 md:grid-cols-2"
						linkColor="text-blue-400"
						Icon={Activity}
						noAnimation={true}
						lottieData={undefined}
						defaultImage="/illustrations/fond-scripts.png"
						vertical={false}
					/>
				</div>
			</LandingSection>
		</div>
	);
}
