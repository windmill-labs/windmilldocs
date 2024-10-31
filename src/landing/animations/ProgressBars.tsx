import React, { useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import ScrollContext from './ScrollContext';
import { appScrollCount, flowScrollCount, scriptScrollCount } from './useAnimateScroll';
import { twMerge } from 'tailwind-merge';

const ProgressBar = ({
	percents,
	active,
	onClick,
	title,
	steps,
	barColor,
	barWidth = 'full', // Using Tailwind's "full" to denote 100% width
	barHeight = '2', // Corresponds to h-6 in Tailwind, adjust as necessary
	progressColor = 'bg-blue-600', // Tailwind class for progress bar color
	baseColor = 'dark:bg-gray-800 bg-gray-100' // Tailwind class for the base bar color,
}) => {
	return (
		<div
			className="flex flex-col gap-1 hover:opacity-50 cursor-pointer transition-all"
			onClick={onClick}
		>
			<div className="text-md font-normal">{title}</div>
			<div
				className={`w-${barWidth} h-${barHeight} ${baseColor} relative rounded-lg overflow-hidden  h-2`}
			>
				<motion.div
					className={`absolute h-${barHeight} ${progressColor} rounded-lg`}
					style={{
						scaleX: active ? percents / 100 : 0,
						top: 0,
						left: 0,
						right: 0,
						transformOrigin: '0%'
					}}
				></motion.div>
				{steps.map((percent) => (
					<div
						key={percent}
						className={twMerge('dark:bg-gray-100 h-2 w-[1px] absolute', barColor)}
						style={{ left: `calc(${percent}%)` }} // Adjust for the marker's width
					></div>
				))}
			</div>
		</div>
	);
};
export default function ProgressBars({ setStep, handleClick, subIndex }) {
	const ctx = useContext(ScrollContext);

	const [progress, setProgress] = React.useState(0);

	useEffect(() => {
		ctx?.on('change', (latest) => {
			const latestAsNumber = latest;
			setProgress(latestAsNumber);

			let newStep = 0;
			if (latestAsNumber < scriptScrollCount) {
				newStep = 0;
			} else if (
				latestAsNumber >= scriptScrollCount &&
				latestAsNumber < scriptScrollCount + flowScrollCount
			) {
				newStep = 1;
			} else if (latestAsNumber >= scriptScrollCount + flowScrollCount) {
				newStep = 2;
			}

			setStep(newStep);
		});
	}, []);

	if (subIndex === undefined) {
		return (
			<div className="grid grid-cols-3 gap-4 w-full  my-4">
				<ProgressBar
					percents={Math.round((progress * 100) / scriptScrollCount)}
					active={true}
					onClick={() => handleClick(0)}
					title={'Scripts'}
					progressColor="dark:bg-blue-600 bg-blue-400"
					steps={[20, 40, 50, 60, 70, 80]}
					barColor="bg-blue-700"
				/>
				<ProgressBar
					percents={Math.round(((progress - scriptScrollCount) * 100) / flowScrollCount)}
					active={progress > scriptScrollCount}
					onClick={() => handleClick(1)}
					progressColor="dark:bg-green-600 bg-green-400"
					title={'Flows'}
					steps={[10, 20, 30, 40, 50, 60, 75, 80, 90]}
					barColor="bg-green-700"
				/>
				<ProgressBar
					percents={Math.round(
						((progress - scriptScrollCount - flowScrollCount) * 100) / appScrollCount
					)}
					active={progress > scriptScrollCount + flowScrollCount}
					onClick={() => handleClick(2)}
					progressColor="dark:bg-orange-600 bg-orange-400"
					title={'Apps'}
					steps={[10, 15, 30, 45, 60, 72, 90, 99]}
					barColor="bg-orange-700"
				/>
			</div>
		);
	} else if (subIndex === 0) {
		return (
			<div className="grid grid-cols-1 gap-4 w-full  my-4">
				<ProgressBar
					percents={Math.round((progress * 100) / scriptScrollCount)}
					active={true}
					onClick={() => handleClick(0)}
					title={'Scripts'}
					progressColor="dark:bg-blue-600 bg-blue-400"
					steps={[20, 40, 50, 60, 70, 80]}
					barColor="bg-blue-700"
				/>
			</div>
		);
	} else if (subIndex === 1) {
		return (
			<div className="grid grid-cols-1 gap-4 w-full  my-4">
				<ProgressBar
					percents={Math.round((progress * 100) / flowScrollCount)}
					active={true}
					onClick={() => handleClick(1)}
					progressColor="dark:bg-green-600 bg-green-400"
					title={'Flows'}
					steps={[10, 20, 30, 40, 50, 60, 75, 80, 90]}
					barColor="bg-green-700"
				/>
			</div>
		);
	} else if (subIndex === 2) {
		return (
			<div className="grid grid-cols-1 gap-4 w-full  my-4">
				<ProgressBar
					percents={Math.round((progress * 100) / appScrollCount)}
					active={true}
					onClick={() => handleClick(2)}
					progressColor="dark:bg-orange-600 bg-orange-400"
					title={'Apps'}
					steps={[10, 15, 30, 45, 60, 72, 90, 99]}
					barColor="bg-orange-700"
				/>
			</div>
		);
	}
}
