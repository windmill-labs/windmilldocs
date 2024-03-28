import { motion } from 'framer-motion';
import React from 'react';

const cursorVariants = {
	blinking: {
		opacity: [0, 0, 1, 1],
		transition: {
			duration: 1,
			repeat: Infinity,
			repeatDelay: 0,
			ease: 'linear',
			times: [0, 0.5, 0.5, 1]
		}
	}
};

export default function CursorBlinker() {
	return (
		<motion.div
			variants={cursorVariants}
			animate="blinking"
			className="inline-block h-3 w-[1px] translate-y-0.5 bg-gray-200"
		/>
	);
}
