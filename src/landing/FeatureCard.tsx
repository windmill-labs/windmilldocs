import React from 'react';
import { motion } from 'framer-motion';

function FadeInWhenVisible({ children }) {
	return (
		<motion.div
			initial="hidden"
			whileInView="visible"
			viewport={{ once: false }}
			transition={{ duration: 0.5 }}
			variants={{
				visible: { opacity: 1, y: 0 },
				hidden: { opacity: 0, y: 32 }
			}}
		>
			{children}
		</motion.div>
	);
}

export default function FeatureCard({ children, title, color = 'blue' }) {

	
	const borders = {
		blue: 'border-blue-300',
		green: 'border-green-300',
		orange: 'border-orange-300'
	};

	const fromTo = {
		blue: 'from-blue-400 to-blue-600',
		green: 'from-green-400 to-green-600',
		orange: 'from-orange-400 to-orange-600'
	};

	return (
		<FadeInWhenVisible>
			<div
				className={`w-full border ${borders[color]} rounded-xl card-shadow p-8 gap-2 flex flex-col bg-white`}
			>
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
