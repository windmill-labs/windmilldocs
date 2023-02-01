import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function FadeInWhenVisible({ children, delta = 0 }) {
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
				hidden: { opacity: 0, y: direction === 'up' ? 32 + delta : -32 - delta }
			}}
		>
			{children}
		</motion.div>
	);
}
