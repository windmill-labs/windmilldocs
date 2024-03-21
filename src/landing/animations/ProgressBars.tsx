import React, { useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import ScrollContext from './ScrollContext';

const ProgressBar = ({
	percents,
	active,
	onClick,
	onComplete,
	duration = 1, // Default duration set to 10 seconds
	easing = 'easeInOut', // Default easing
	barWidth = 'full', // Using Tailwind's "full" to denote 100% width
	barHeight = '2', // Corresponds to h-6 in Tailwind, adjust as necessary
	progressColor = 'bg-blue-600', // Tailwind class for progress bar color
	baseColor = 'bg-gray-800' // Tailwind class for the base bar color,
}) => {
	const transition = {
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
export default function ProgressBars({ setStep, currentIndex }) {
	const x = useContext(ScrollContext);

	const [progress, setProgress] = React.useState(0);

	useEffect(
		() =>
			x.onChange((latest) => {
				const latestAsNumber = latest;
				setProgress(latestAsNumber);

				if (latestAsNumber >= 4000 && currentIndex === -1) {
					setStep(2);
				}

				if (latestAsNumber < 4000 && currentIndex === -1) {
					setStep(1);
				}

				if (latestAsNumber >= 2000 && currentIndex === -1) {
					setStep(1);
				}

				if (latestAsNumber < 2000 && currentIndex === -1) {
					setStep(0);
				}
			}),
		[]
	);

	const scriptFull = 2000;
	const flowFull = 2000;
	const appFull = 1000;

	return (
		<div className="grid grid-cols-3 gap-4 w-full h-2 my-4">
			<ProgressBar
				percents={Math.round((progress * 100) / scriptFull)}
				active={true}
				onClick={() => {
					//setStep(0)
				}}
				onComplete={() => {
					//setStep(1);
				}}
			/>
			<ProgressBar
				percents={Math.round(((progress - scriptFull) * 100) / flowFull)}
				active={progress > scriptFull}
				onClick={() => {
					//setStep(0)
				}}
				onComplete={() => {
					//setStep(1)
				}}
				progressColor="bg-green-600"
			/>
			<ProgressBar
				percents={Math.round(((progress - scriptFull - flowFull) * 100) / appFull)}
				active={progress > scriptFull + flowFull}
				onClick={() => {
					//setStep(0)
				}}
				onComplete={() => {
					//setStep(1)
				}}
				progressColor="bg-orange-600"
			/>
		</div>
	);
}
