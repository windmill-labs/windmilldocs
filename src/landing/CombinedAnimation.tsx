import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CombinedAnimation() {
	const [currentIndex, setCurrentIndex] = useState(0);

	const images = [
		{ 
			id: 'script', 
			src: '/illustrations/animscripts.png', 
			alt: 'VS Code editor with test panel and execution results',
			label: 'Scripts' 
		},
		{ 
			id: 'flow', 
			src: '/illustrations/animflows.png', 
			alt: 'Flow diagram with execution logs and performance metrics',
			label: 'Flows' 
		},
		{ 
			id: 'app', 
			src: '/illustrations/animapps.png', 
			alt: 'App builder with button, table, and code editor',
			label: 'Apps' 
		}
	];

	// Auto-switch every 4 seconds
	useEffect(() => {
		const interval = setInterval(() => {
			setDirection(1); // Always forward for auto-advance
			setCurrentIndex((prev) => (prev + 1) % images.length);
		}, 4000);

		return () => clearInterval(interval);
	}, [images.length]);

	const slideVariants = {
		enter: (direction: number) => ({
			x: direction > 0 ? '100%' : '-100%',
			opacity: 0
		}),
		center: {
			x: 0,
			opacity: 1
		},
		exit: (direction: number) => ({
			x: direction > 0 ? '-100%' : '100%',
			opacity: 0
		})
	};

	const [direction, setDirection] = useState(0);

	const goToSlide = (index: number) => {
		const newDirection = index > currentIndex ? 1 : -1;
		setDirection(newDirection);
		setCurrentIndex(index);
	};

	return (
		<div className="relative w-full overflow-hidden rounded-lg">
			{/* Image container */}
			<div className="relative w-full min-h-[250px] md:min-h-[400px]">
				<AnimatePresence mode="wait" custom={direction}>
					<motion.div
						key={currentIndex}
						custom={direction}
						variants={slideVariants}
						initial="enter"
						animate="center"
						exit="exit"
						transition={{
							x: { type: 'spring', stiffness: 300, damping: 30 },
							opacity: { duration: 0.2 }
						}}
						className="absolute inset-0 w-full flex items-center justify-center"
					>
						<img
							src={images[currentIndex].src}
							alt={images[currentIndex].alt}
							className="w-full h-auto max-w-full object-contain rounded-lg"
							loading="lazy"
							onError={(e) => {
								console.error('Failed to load image:', images[currentIndex].src);
								(e.target as HTMLImageElement).style.display = 'none';
							}}
						/>
					</motion.div>
				</AnimatePresence>
			</div>

			{/* Navigation dots */}
			<div className="absolute bottom-2 md:bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
				{images.map((_, index) => (
					<button
						key={index}
						onClick={() => goToSlide(index)}
						className={`h-1.5 md:h-2 rounded-full transition-all ${
							index === currentIndex
								? 'w-6 md:w-8 bg-white dark:bg-gray-200'
								: 'w-1.5 md:w-2 bg-white/50 dark:bg-gray-500/50 hover:bg-white/75 dark:hover:bg-gray-400/75'
						}`}
						aria-label={`Go to ${images[index].label}`}
					/>
				))}
			</div>
		</div>
	);
}

