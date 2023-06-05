import React, { useEffect } from 'react';
import './CardStyles.css';
import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';
import CodeSvg from './svgs/CodeSvg';

interface CardProps {
	Icon: React.ComponentType;
	title: string;
	subtitle: string;
	gridArea?: string;
	image?: string;
	imageSlider?: string[];
	video?: string;
	svg?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
	Icon,
	title,
	subtitle,
	gridArea,
	image,
	imageSlider,
	video,
	svg
}) => {
	const cardStyle = gridArea ? gridArea : '';

	return (
		<div className={classNames('card shadow-none transition-all ', gridArea)}>
			<div className="card-content  ">
				<div className="card-image fade-to-white transform transition duration-500 hover:scale-110">
					{image && <img src={image} alt="Card" className="object-cover h-full w-full" />}
					{imageSlider && (
						<div className="slider">
							{imageSlider.map((imageUrl, index) => (
								<img key={index} src={imageUrl} alt={`Slider Image ${index}`} />
							))}
						</div>
					)}
					{video && <video src={video} autoPlay loop controls />}
					{svg && <div className="h-full w-full p-2 ">{svg}</div>}
				</div>
				<div className="py-8 px-8">
					<div className="flex flex-row gap-4">
						<div className="w-8 h-8 text-white">
							<Icon />
						</div>
						<div className="text-white">
							<div className="text-md font-bold mb-2">{title}</div>
							<div className="text-sm">{subtitle}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

interface CardsContainerProps {
	r?: number;
	g?: number;
	b?: number;
	cards: CardProps[];
}

const CardsContainer: React.FC<CardsContainerProps> = ({ r = 59, g = 130, b = 246, cards }) => {
	return (
		<div className="flex justify-center items-center h-full flex-col gap-2">
			<div
				id="cards"
				className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid-rows-auto gap-8 w-full"
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
				{cards.map((card, i) => (
					<Card
						key={i}
						Icon={card.Icon}
						title={card.title}
						subtitle={card.subtitle}
						gridArea={twMerge('col-span-1 row-span-3 md:col-span-1 md:row-span-3', card.gridArea)}
						image={card.image}
						imageSlider={card.imageSlider}
						video={card.video}
						svg={card.svg}
					/>
				))}
			</div>
		</div>
	);
};

export default CardsContainer;
