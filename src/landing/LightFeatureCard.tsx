import React from 'react';
import { motion } from 'framer-motion';
import { type CarouselApi } from './../@/components/ui/carousel';
import { useLottie } from 'lottie-react';
import { ArrowRight } from 'lucide-react';

type FeatureCardProps = {
	feature: { title: string; description: string; images: string[] };
	animationDelay: number;
	span: string;
	height: number;
	noAnimation: boolean;
	lottieData: unknown;
};

export default function LightFeatureCard({
	feature,
	animationDelay,
	span,
	noAnimation = false,
	lottieData
}: FeatureCardProps) {
	const [api, setApi] = React.useState<CarouselApi>();

	const options = {
		animationData: lottieData,
		loop: true
	};

	const { View } = useLottie(options);
	const animation = noAnimation ? {} : { opacity: 0, y: animationDelay };
	return (
		<motion.div
			className={`bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden ${span} group cursor-pointer p-8 relative grid ${
				span === 'col-span-1' ? 'grid-cols-1' : 'grid-cols-2'
			} gap-16`}
			initial={animation}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, ease: 'easeIn' }}
		>
			<div>
				<div className="font-medium text-2xl mb-6">{feature.title}</div>
				<div className="text-lg mb-4 ">{feature.description}</div>

				<div className="text-sm text-blue-500 flex flex-row items-center gap-2">
					Learn more
					<ArrowRight size={24} />
				</div>
			</div>

			<div className="rounded-lg overflow-hidden h-full w-full">{View}</div>
		</motion.div>
	);
}
