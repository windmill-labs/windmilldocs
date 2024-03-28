import React from 'react';
import './CardStyles.css';
import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';

interface CardProps {
	Icon: React.ComponentType;
	title: string;
	subtitle: string;
	gridArea?: string;
	image?: string;
	imageSlider?: string[];
	video?: string;
	svg?: React.ReactNode;
	href?: string;
	icons?: React.ComponentType[];
	mode?: 'light' | 'dark';
	newTab?: boolean;
}

const Card: React.FC<CardProps> = ({
	Icon,
	title,
	subtitle,
	gridArea,
	image,
	imageSlider,
	video,
	svg,
	href,
	icons,
	mode = 'light',
	newTab = false
}) => {
	return (
		<a
			className={classNames('card shadow-none transition-all !no-underline', gridArea)}
			href={href}
			target={newTab ? '_blank' : '_self'}
			rel={newTab ? 'noopener noreferrer' : ''}
		>
			<div className="card-content h-full">
				<div className="card-image w-full">
					{image && <img src={image} alt="Card" className="object-cover h-full w-full" />}
					{imageSlider && (
						<div className="slider">
							{imageSlider.map((imageUrl, index) => (
								<img key={index + title} src={imageUrl} alt={`Slider Image ${index}`} />
							))}
						</div>
					)}
					{video && <video src={video} autoPlay loop controls />}
					{svg && <div className="h-full w-full p-2 ">{svg}</div>}
					{Icon && !svg && (
						<div className="h-full w-full flex items-center justify-center">
							<div className="h-40 min-w-40 px-4 w-auto border rounded-full flex items-center justify-center bg-gray-50/50 border-gray-100 dark:bg-gray-800/50 dark:border-gray-900">
								<div className="h-32 min-w-32 px-4  w-auto border rounded-full bg-gray-100/50 border-gray-100 dark:bg-gray-700/50 dark:border-gray-800 flex items-center justify-center gap-2">
									<Icon
										className={twMerge(
											'h-24 w-24 border rounded-full overflow-visible p-4 ',
											mode === 'dark' && 'text-white bg-gray-600/50 border-gray-700',
											mode === 'light' && 'text-gray-500 bg-gray-200/50 border-gray-200'
										)}
									/>

									{icons?.map((ExtraIcon, index) => {
										return (
											<React.Fragment key={index}>
												{/* @ts-ignore */}
												<ExtraIcon className="h-24 w-24 border rounded-full overflow-visible p-4 bg-gray-200/50 text-gray-500 dark:text-white dark:bg-gray-600/50 dark:border-gray-700" />
											</React.Fragment>
										);
									})}
								</div>
							</div>
						</div>
					)}
				</div>
				<div className="card-footer absolute bottom-0 left-0 right-0 grow pt-4 pb-8 rounded-b-2xl px-8 overflow-hidden">
					<div className="flex flex-row gap-4">
						{/* @ts-ignore */}
						<Icon className="w-6 h-6" />
						<div>
							<div className="text-md font-bold mb-2">{title}</div>
							<div className="text-sm">{subtitle}</div>
						</div>
					</div>
				</div>
			</div>
		</a>
	);
};

interface CardsContainerProps {
	r?: number;
	g?: number;
	b?: number;
	cards: CardProps[];
	mode?: 'dark' | 'light';
}

const CardsContainer: React.FC<CardsContainerProps> = ({
	r = 59,
	g = 130,
	b = 246,
	cards,
	mode = 'dark'
}) => {
	return (
		<div className={`flex justify-center items-center h-full flex-col gap-2 ${mode}`}>
			<div
				id="cards"
				className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid-rows-auto gap-16 w-full"
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
						key={i + card.title + card.subtitle}
						Icon={card.Icon}
						title={card.title}
						subtitle={card.subtitle}
						gridArea={twMerge('col-span-1 row-span-3 md:col-span-1 md:row-span-3', card.gridArea)}
						image={card.image}
						imageSlider={card.imageSlider}
						video={card.video}
						svg={card.svg}
						href={card.href}
						icons={card.icons}
						mode={mode}
						newTab={card.newTab}
					/>
				))}
			</div>
		</div>
	);
};

export default CardsContainer;
