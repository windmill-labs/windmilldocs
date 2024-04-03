import React from 'react';
import { motion } from 'framer-motion';

export default function LandingSection({
	children,
	bgClass = 'landing-section-gradient-background'
}) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 64 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, ease: 'easeInOut' }}
			className={`w-full h-full py-16 overflow-x-hidden ${bgClass}`}
		>
			<div className="max-w-7xl px-6 lg:px-8 mx-auto flex justify-center items-center h-full ">
				{children}
			</div>
		</motion.div>
	);
}
