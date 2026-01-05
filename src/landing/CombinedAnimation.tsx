import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CombinedAnimation() {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isPaused, setIsPaused] = useState(false);

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
		if (isPaused) return;

		const interval = setInterval(() => {
			setDirection(1); // Always forward for auto-advance
			setCurrentIndex((prev) => (prev + 1) % images.length);
		}, 4000);

		return () => clearInterval(interval);
	}, [isPaused, images.length]);

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
			<div className="relative w-full" style={{ minHeight: '400px' }}>
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
							className="w-full h-auto object-contain rounded-lg"
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
			<div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
				{images.map((_, index) => (
					<button
						key={index}
						onClick={() => goToSlide(index)}
						className={`h-2 rounded-full transition-all ${
							index === currentIndex
								? 'w-8 bg-white dark:bg-gray-200'
								: 'w-2 bg-white/50 dark:bg-gray-500/50 hover:bg-white/75 dark:hover:bg-gray-400/75'
						}`}
						aria-label={`Go to ${images[index].label}`}
					/>
				))}
			</div>

			{/* Pause/Play button */}
			<button
				onClick={() => setIsPaused(!isPaused)}
				className="absolute top-4 right-4 p-2 bg-white/90 dark:bg-gray-800/90 rounded-md hover:bg-white dark:hover:bg-gray-800 transition-colors z-10 shadow-lg"
				title={isPaused ? 'Play' : 'Pause'}
			>
				{isPaused ? (
					<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
						<path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
					</svg>
				) : (
					<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
						<path d="M5.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75A.75.75 0 007.25 3h-1.5zM12.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75a.75.75 0 00-.75-.75h-1.5z" />
					</svg>
				)}
			</button>
		</div>
	);
}

