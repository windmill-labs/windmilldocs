import React, { useEffect } from 'react';
import ScriptAnimation from './ScriptAnimation';
import AnimationCarousel from './animations/AnimationCarousel';
import FlowAnimation from './FlowAnimation';
import AppAnimation from './AppAnimation';
import { RotateCcw } from 'lucide-react';
import SmoothScroll from './animations/SmoothScroll';
import ProgressBars from './animations/ProgressBars';

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
				<div className="w-[900px] flex flex-row items-start">
					<ScriptAnimation active={step === 0} />
				</div>
			)
		},
		{
			key: 'flows',
			content: (
				<div className="w-[900px] flex flex-row items-start">
					<FlowAnimation active={step === 1} />
				</div>
			)
		},
		{
			key: 'apps',
			content: (
				<div className="w-[900px] flex flex-row items-start">
					<AppAnimation active={step === 2} />
				</div>
			)
		}
	];

	return (
		<SmoothScroll>
			<div className="bg-gray-900 w-full p-8 rounded-xl">
				<div className="flex flex-row justify-between">
					<div className="font-light text-2xl mb-4 max-w-xl">{text}</div>
					<button
						className="text-white rounded-md text-sm bg-gray-800 px-2 h-8 flex flex-row items-center gap-2"
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
	);
}
