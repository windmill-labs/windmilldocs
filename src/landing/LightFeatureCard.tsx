import React from 'react';
import { motion } from 'framer-motion';
import { type CarouselApi } from './../@/components/ui/carousel';
import { Carousel, CarouselContent, CarouselItem } from './../@/components/ui/carousel';

type FeatureCardProps = {
	feature: { title: string; description: string; images: string[] };
	colors: { bgColor: string };
	animationDelay: number;
	span: string;
	height: number;
	noAnimation: boolean;
	buttons: { title: string; Icon: any; description: string; href: string }[];
};

export default function LightFeatureCard({
	feature,
	colors,
	animationDelay,
	span,
	height = 400,
	noAnimation = false,
	buttons
}: FeatureCardProps) {
	const [api, setApi] = React.useState<CarouselApi>();

	const animation = noAnimation ? {} : { opacity: 0, y: animationDelay };
	return (
		<motion.div
			className={`${colors.bgColor} rounded-lg overflow-hidden ${span} group cursor-pointer p-8 relative`}
			style={{ height: `${height}px` }}
			initial={animation}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, ease: 'easeIn' }}
		>
			<div className="font-medium text-xl mb-4">{feature.title}</div>
			<div className="text-md mb-4 max-w-3xl h-16">{feature.description}</div>

			<div className="flex flex-row w-full mb-4 gap-2">
				{buttons?.map((button, index) => (
					<div className="flex items-center justify-center text-xs gap-2 bg-white py-2 px-4 rounded-md">
						<button.Icon size={20} className="text-blue-500" />
						{button.title}
					</div>
				))}
			</div>
			{feature.images.map((img, index) => (
				<div key={index} className=" overflow-hidden rounded-xl">
					<Carousel className="w-full" setApi={setApi}>
						<CarouselContent>
							{Array.from({ length: 5 }).map((_, index) => (
								<CarouselItem key={index}>
									<img
										src={img}
										alt={feature.title}
										className="shadow-md transition-transform duration-500 w-full h-auto group-hover:scale-[1.05]" // Scale image on hover
									/>
								</CarouselItem>
							))}
						</CarouselContent>
					</Carousel>
				</div>
			))}
		</motion.div>
	);
}
