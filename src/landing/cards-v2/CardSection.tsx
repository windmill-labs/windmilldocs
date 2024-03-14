import React from 'react';
import LightFeatureCard from '../LightFeatureCard';

export default function CardSection({ features, colors, title, description, defaultImage }) {
	const r = 59;
	const g = 130;
	const b = 246;
	return (
		<div className="w-full gap-4 flex flex-col">
			<div
				className={`${colors.titleColor} text-5xl max-w-2xl mx-auto font-medium mb-2 text-center pt-8`}
			>
				{title}
			</div>
			<span
				className={`text-lg ${colors.textColor} max-w-2xl mb-8 text-center mx-auto font-normal`}
			>
				{description}
			</span>
			<div
				className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full"
				onMouseMove={(e) => {
					const mouseMoveHandler = (e: MouseEvent) => {
						// @ts-ignore
						for (const card of document.getElementsByClassName('card')) {
							card.style.setProperty('--accent-r', r);
							card.style.setProperty('--accent-g', g);
							card.style.setProperty('--accent-b', b);

							const rect = card.getBoundingClientRect(),
								x = e.clientX - rect.left,
								y = e.clientY - rect.top;

							card.style.setProperty('--mouse-x', `${x}px`);
							card.style.setProperty('--mouse-y', `${y}px`);
						}
					};

					// @ts-ignore
					mouseMoveHandler(e);
				}}
			>
				{features.map((feature, index) => (
					<LightFeatureCard
						key={index}
						feature={feature}
						animationDelay={(index + 1) * 32}
						span={feature.span}
						height={feature.height}
						noAnimation={feature?.noAnimation}
						lottieData={feature?.lottieData}
						defaultImage={defaultImage}
						linkColor={colors.linkColor}
					/>
				))}
			</div>
		</div>
	);
}
