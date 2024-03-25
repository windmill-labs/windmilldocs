import React, { useEffect } from 'react';
import ScriptAnimation from './ScriptAnimation';
import AnimationCarousel from './animations/AnimationCarousel';
import FlowAnimation from './FlowAnimation';
import AppAnimation from './AppAnimation';
import { Activity, GitCommit, GitCompareArrows, RotateCcw, Server } from 'lucide-react';
import SmoothScroll from './animations/SmoothScroll';
import ProgressBars from './animations/ProgressBars';
import LandingSection from './LandingSection';
import LightFeatureCard from './LightFeatureCard';
import deployAtScale from '/illustrations/deploy_at_scale.json';

export default function TutorialSection() {
	const [step, setStep] = React.useState(-1);

	const [text, setText] = React.useState('Develop, iterate, and test quickly');

	useEffect(() => {
		setStep(0);
	}, []);

	const items = [
		{
			key: 'scripts',
			content: (
				<div className="w-[1000px] flex flex-row items-start">
					<ScriptAnimation active={step === 0} />
				</div>
			)
		},
		{
			key: 'flows',
			content: (
				<div className="w-[1000px] flex flex-row items-start">
					<FlowAnimation active={step === 1} />
				</div>
			)
		},
		{
			key: 'apps',
			content: (
				<div className="w-[1000px] flex flex-row items-start">
					<AppAnimation active={step === 2} />
				</div>
			)
		}
	];

	return (
		<div className="flex flex-col gap-8">
			<SmoothScroll>
				<div className="dark:bg-gray-900 bg-gray-50 w-full p-8 rounded-xl mt-16">
					<div className="flex flex-row justify-between">
						<div className="font-light text-2xl mb-4 max-w-xl">{text}</div>
					</div>
					<ProgressBars setStep={setStep} currentIndex={step} />
					<AnimationCarousel items={items} currentIndex={step} />
				</div>
			</SmoothScroll>
			<LandingSection bgClass="-mt-48 md:-mt-72 flex flex-col">
				<div className="grid grid-cols-2 w-full gap-8 ">
					<LightFeatureCard
						feature={{
							title: 'Review',
							description:
								'Review your code and collaborate with your team to ensure quality and consistency.',
							images: []
						}}
						url=""
						span="col-span-1"
						defaultImage="/illustrations/diff.png"
						height={400}
						animationDelay={8}
						linkColor="text-blue-400"
						Icon={GitCompareArrows}
						noAnimation={true}
						lottieData={undefined}
					/>
					<LightFeatureCard
						feature={{
							title: 'Deploy at scale',
							description:
								'Review your code and collaborate with your team to ensure quality and consistency.',
							images: []
						}}
						url=""
						span="col-span-1"
						defaultImage="/illustrations/fond-scripts.png"
						height={400}
						animationDelay={8}
						linkColor="text-blue-400"
						Icon={Server}
						noAnimation={true}
						lottieData={deployAtScale}
						autoplay
					/>
					<LightFeatureCard
						feature={{
							title: 'Monitor',
							description:
								'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet purus nec orci.',
							images: []
						}}
						url=""
						span="col-span-2"
						defaultImage="/illustrations/fond-scripts.png"
						height={400}
						animationDelay={8}
						linkColor="text-blue-400"
						Icon={Activity}
						noAnimation={true}
						lottieData={undefined}
					/>
				</div>
			</LandingSection>
		</div>
	);
}
