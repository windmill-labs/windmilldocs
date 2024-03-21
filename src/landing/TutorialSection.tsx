import React, { useEffect } from 'react';
import ScriptAnimation from './ScriptAnimation';
import AnimationCarousel from './animations/AnimationCarousel';
import FlowAnimation from './FlowAnimation';
import AppAnimation from './AppAnimation';
import { RotateCcw } from 'lucide-react';
import SmoothScroll from './animations/SmoothScroll';
import ProgressBars from './animations/ProgressBars';
import LandingSection from './LandingSection';

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
						<button
							className="dark:text-white text-gray-900 rounded-md text-sm dark:bg-gray-800 bg-gray-100 px-2 h-8 flex flex-row items-center gap-2"
							onClick={() => {
								setStep(0);
							}}
						>
							<RotateCcw className="h-4 w-4" />
							Restart
						</button>
					</div>
					<ProgressBars setStep={setStep} currentIndex={step} />

					<AnimationCarousel items={items} currentIndex={step} />
				</div>
			</SmoothScroll>
			<LandingSection bgClass="">
				<div className="grid grid-cols-2 w-full gap-8">
					<div className="h-96 w-full dark:bg-gray-900 bg-gray-50  p-8 rounded-xl -mt-16 col-span-1">
						<div className="flex flex-row justify-between">
							<div className="font-light text-2xl mb-4 max-w-xl">Review</div>
						</div>
					</div>
					<div className="h-96 w-full dark:bg-gray-900 bg-gray-50  p-8 rounded-xl -mt-16 col-span-1">
						<div className="flex flex-row justify-between">
							<div className="font-light text-2xl mb-4 max-w-xl">Deploy at scale</div>
						</div>
					</div>
				</div>
			</LandingSection>
		</div>
	);
}
