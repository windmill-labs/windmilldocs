import React from 'react';
import { useLottie } from 'lottie-react';
import { ArrowRight, CircleIcon, LucideIcon } from 'lucide-react';

type FeatureCardProps = {
	feature: { title: string; description: string; images: string[] };
	animationDelay: number;
	span: string;
	height: number;
	noAnimation: boolean;
	lottieData: unknown;
	defaultImage: string;
	linkColor: string;
	Icon: LucideIcon;
	url: string;
};

export default function LightFeatureCard({
	feature,
	span,
	lottieData = undefined,
	defaultImage,
	linkColor,
	Icon = CircleIcon,
	url
}: FeatureCardProps) {
	const options = {
		animationData: lottieData,
		loop: false,
		autoplay: false
	};

	const { View, play } = useLottie(options);
	return (
		<a
			className={`text-black dark:text-white !no-underline hover:text-black hover:dark:text-white bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden col-span-2 md:${span}  group cursor-pointer p-8 relative grid ${
				span === 'col-span-1' ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'
			} gap-16 hover:bg-opacity-50 transition-all group cursor-pointer`}
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
			) : (
				<div className="rounded-lg overflow-hidden h-full w-full">
					<img src={defaultImage} alt={feature.title} />
				</div>
			)}
		</a>
	);
}
