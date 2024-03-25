import React from 'react';
import { useLottie } from 'lottie-react';
import { ArrowRight, CircleIcon, LucideIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

type FeatureCardProps = {
	feature: { title: string; description: string; images: string[] };
	animationDelay: number;
	height: number;
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
				`text-black dark:text-white !no-underline hover:text-black hover:dark:text-white bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden ${span}  group cursor-pointer p-8 relative grid gap-16 hover:bg-opacity-50 transition-all group `,
				spanOverride ?? (vertical ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2')
			)}
			onMouseOver={() => {
				play();
			}}
			href={url}
			target="_blank"
		>
			<div>
				<div className="font-medium text-xl mb-6 group-hover:ml-2 transition-all flex flex-row items-center gap-2">
					<Icon size={20} />
					{feature.title}
				</div>
				<div className="text-md mb-4 group-hover:ml-2 transition-all max-w-lg">
					{feature.description}
				</div>

				<div
					className={`text-sm ${linkColor} flex flex-row items-center gap-2 group-hover:ml-2 transition-all`}
				>
					Learn more
					<ArrowRight size={24} />
				</div>
			</div>

			{lottieData ? (
				<div className="rounded-lg overflow-hidden h-full w-full">{View}</div>
			) : defaultImage ? (
				<div className="rounded-lg overflow-hidden h-full w-full">
					<img src={defaultImage} alt={feature.title} />
				</div>
			) : video ? (
				<video className="rounded-lg overflow-hidden h-full w-full" autoPlay loop muted>
					<source src={video} type="video/mp4" />
				</video>
			) : (
				<div className="rounded-lg overflow-hidden h-full w-full flex flex-col items-center justify-center"></div>
			)}
		</a>
	);
}
