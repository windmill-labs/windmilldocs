import React from 'react';
import { useDeveloperMode } from '../pages';

type LandingSectionWrapperProps = {
	children: React.ReactNode;
	className?: string;
	mode?: 'dark' | 'light';
	color: 'blue' | 'teal' | 'orange';
};

function generateUUID(): string {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
		const r = (Math.random() * 16) | 0;
		const v = c === 'x' ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
}

export default function LandingSectionWrapper({
	children,
	className = '',
	color = 'blue'
}: LandingSectionWrapperProps) {
	const { developerMode } = useDeveloperMode();

	const mode = developerMode ? 'dark' : 'light';
	const uuid = generateUUID();

	const colorsByMode = {
		dark: {
			blue: {
				first: 'from-blue-600 to-blue-500',
				second: 'from-blue-900 to-blue-800'
			},
			teal: {
				first: 'from-teal-600 to-teal-500',
				second: 'from-teal-800 to-teal-800'
			},
			orange: {
				first: 'from-orange-900 to-orange-900',
				second: 'from-orange-900 to-orange-800'
			}
		},
		light: {
			blue: {
				first: 'from-blue-300 to-blue-200',
				second: 'from-blue-400 to-blue-300'
			},
			teal: {
				first: 'from-teal-300 to-teal-200',
				second: 'from-teal-400 to-teal-300'
			},
			orange: {
				first: 'from-orange-300 to-orange-200',
				second: 'from-orange-400 to-orange-300'
			}
		}
	};

	return (
		<div className={`w-full h-full relative overflow-hidden isolate ${className} py-32`}>
			<div
				className="absolute inset-0 -z-10 transform-gpu overflow-hidden blur-3xl isolate"
				aria-hidden="true"
			>
				<div
					className={`left-[calc(50%+3rem)] translate-y-32 aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr ${colorsByMode[mode][color].first} opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]`}
					style={{
						clipPath:
							'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
					}}
				/>
				<div
					className={`left-[calc(50%+3rem)] translate-x-3/4 rotate-180 -translate-y-3/4 aspect-[1155/678] w-[36.125rem]  bg-gradient-to-tr ${colorsByMode[mode][color].second} opacity-10 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]`}
					style={{
						clipPath:
							'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
					}}
				/>
			</div>

			<div className="max-w-7xl px-6 lg:px-8 mx-auto flex justify-center items-center h-full">
				{children}
			</div>
		</div>
	);
}
