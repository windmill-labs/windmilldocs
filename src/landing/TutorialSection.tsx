import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import LandingSection from './LandingSection';
import useTypewriter from './animations/useTypedText';
import ScriptAnimation from './ScriptAnimation';
import AnimationCarousel from './animations/AnimationCarousel';
import FlowAnimation from './FlowAnimation';
import AppAnimation from './AppAnimation';
import { RotateCcw } from 'lucide-react';

const ProgressBar = ({
	percents,
	active,
	onClick,
	onComplete,
	duration = 200, // Default duration set to 10 seconds
	easing = 'easeInOut', // Default easing
	barWidth = 'full', // Using Tailwind's "full" to denote 100% width
	barHeight = '2', // Corresponds to h-6 in Tailwind, adjust as necessary
	progressColor = 'bg-blue-600', // Tailwind class for progress bar color
	baseColor = 'bg-gray-800' // Tailwind class for the base bar color,
}) => {
	const transition = {
		duration: duration,
		ease: easing
	};

	const variants = {
		enter: { width: 0 },
		animate: {
			width: percents + '%', // Animate width based on percents prop
			transition
		}
	};

	return (
		<div
			className={`w-${barWidth} h-${barHeight} ${baseColor} relative rounded-lg overflow-hidden cursor-pointer hover:opacity-50 transition-all`}
			onClick={onClick}
		>
			<motion.div
				className={`absolute top-0 left-0 h-${barHeight} ${progressColor} rounded-lg`}
				variants={variants}
				initial="enter"
				animate={active ? 'animate' : 'enter'}
				onAnimationComplete={() => {
					if (active && onComplete) {
						onComplete();
					}
				}}
			></motion.div>
		</div>
	);
};

export default function TutorialSection() {
	const [step, setStep] = React.useState(-1);

	const [text, setText] = React.useState(
		'Iterate and test your script at lightning speed with our Web IDE. An UI is automatically generated as you code.'
	);

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
		<LandingSection bgClass="">
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
				<div className="grid grid-cols-3 gap-4 w-full h-2 my-4">
					<ProgressBar
						percents={100}
						active={step === 0}
						onClick={() => setStep(0)}
						onComplete={() => setStep(1)}
						duration={15}
					/>
					<ProgressBar
						percents={100}
						active={step === 1}
						onClick={() => setStep(1)}
						onComplete={() => setStep(2)}
						duration={20}
						progressColor="bg-green-600"
					/>
					<ProgressBar
						percents={100}
						active={step === 2}
						onClick={() => setStep(2)}
						onComplete={() => setStep(3)}
						duration={20}
						progressColor="bg-orange-600"
					/>
				</div>

				<AnimationCarousel items={items} currentIndex={step} />
			</div>
		</LandingSection>
	);
}
