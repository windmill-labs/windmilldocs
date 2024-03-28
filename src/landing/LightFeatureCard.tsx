import React from 'react';
import { useLottie } from 'lottie-react';
import { ArrowRight, CircleIcon, LucideIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import FlowChart from './FlowChart';

type FeatureCardProps = {
	feature: { title: string; description: string; images: string[] };
	animationDelay: number;
	noAnimation: boolean;
	lottieData: unknown;
	defaultImage?: string;
	linkColor: string;
	Icon: LucideIcon;
	url: string;
	autoplay?: boolean;
	loop?: boolean;
	video?: string;
	vertical?: boolean;
	spanOverride?: string | undefined;
};

export default function LightFeatureCard({
	feature,
	lottieData = undefined,
	defaultImage,
	linkColor,
	Icon = CircleIcon,
	url,
	video,
	spanOverride,
	autoplay = false,
	loop = true,
	vertical = false
}: FeatureCardProps) {
	const options = {
		animationData: lottieData,
		loop: loop,
		autoplay: autoplay
	};
	const span = !vertical ? 'col-span-2' : 'col-span-2 md:col-span-1';

	const { View, play } = useLottie(options);
	return (
		<a
			className={twMerge(
				`text-black dark:text-white !no-underline hover:text-black hover:dark:text-white bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden ${span} group cursor-pointer p-8 relative grid gap-4 hover:bg-opacity-50 transition-all group `,
				spanOverride ?? (vertical ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2')
			)}
			onMouseOver={() => {
				play();
			}}
			href={url}
			target="_blank"
		>
			<div className="group-hover:ml-2 transition-all">
				<div className="font-medium text-xl mb-6 flex flex-row items-center ">
					<Icon size={20} className="mr-2" />
					{feature.title}
				</div>
				<div className="text-md mb-4  max-w-lg">{feature.description}</div>

				<div className={`text-sm ${linkColor} flex flex-row items-center gap-2  `}>
					Learn more
					<ArrowRight size={24} />
				</div>
			</div>

			{feature.title === 'Performance' ? (
				<div className="col-span-2">
					<FlowChart />
				</div>
			) : (
				<>
					{lottieData ? (
						<div className="rounded-lg overflow-hidden h-full w-full flex flex-col justify-end">
							{View}
						</div>
					) : defaultImage ? (
						<div className="rounded-lg overflow-hidden h-full w-full flex flex-col justify-end">
							<img src={defaultImage} alt={feature.title} />
						</div>
					) : video ? (
						<video
							className="rounded-lg overflow-hidden h-full w-full flex flex-col justify-end"
							autoPlay
							loop
							muted
						>
							<source src={video} type="video/mp4" />
						</video>
					) : (
						<div className="rounded-lg overflow-hidden h-full w-full flex flex-col items-center justify-center"></div>
					)}
				</>
			)}
		</a>
	);
}

export function Lottie({ lottieData, autoplay = true, loop = false }) {
	const options = {
		animationData: lottieData,
		loop: loop,
		autoplay: autoplay
	};

	const { View, play } = useLottie(options);
	return (
		<div
			className="rounded-lg overflow-hidden h-full w-full flex flex-col justify-end"
			onMouseOver={() => {
				play();
			}}
		>
			{View}
		</div>
	);
}
