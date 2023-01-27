import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function FadeInWhenVisible({ children }) {
	let oldScrollY = 0;

	const [direction, setDirection] = useState('up');

	const controlDirection = () => {
		if (window.scrollY > oldScrollY) {
			setDirection('down');
		} else {
			setDirection('up');
		}
		oldScrollY = window.scrollY;
	};

	useEffect(() => {
		window.addEventListener('scroll', controlDirection);
		return () => {
			window.removeEventListener('scroll', controlDirection);
		};
	}, []);

	return (
		<motion.div
			initial="hidden"
			whileInView="visible"
			viewport={{ once: false }}
			transition={{ duration: 0.5 }}
			variants={{
				visible: { opacity: 1, y: 0 },
				hidden: { opacity: 0, y: direction === 'up' ? -50 : 50 }
			}}
		>
			{children}
		</motion.div>
	);
}

export default function FeatureCard({ children, title, Icon, color = 'blue' }) {
	const borders = {
		blue: 'border-blue-300',
		green: 'border-green-300',
		orange: 'border-orange-300'
	};

	const iconColor = {
		blue: 'text-blue-200',
		green: 'text-green-200',
		orange: 'text-orange-200'
	};

	const fromTo = {
		blue: 'from-blue-400 to-blue-600',
		green: 'from-green-400 to-green-600',
		orange: 'from-orange-400 to-orange-600'
	};

	const shadow = {
		blue: 'card-shadow-blue',
		green: 'card-shadow-green',
		orange: 'card-shadow-orange'

	}

	return (
		<FadeInWhenVisible>
			<div
				className={`w-full border ${borders[color]} rounded-xl ${shadow[color]} p-8 gap-2 flex flex-col bg-white relative`}
			>
				<Icon
					className={`absolute top-4 right-4 w-8 h-8 ${iconColor[color]}`}
				/>
				<span
					className={`text-lg font-bold text-transparent bg-clip-text bg-gradient-to-br ${fromTo[color]}`}
				>
					{title}
				</span>
				{children}
			</div>
		</FadeInWhenVisible>
	);
}
