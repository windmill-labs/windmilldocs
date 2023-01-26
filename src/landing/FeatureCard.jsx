import React from 'react';

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
		<motion.div
			key={'my_unique_key'}
			exit={{ opacity: 0 }}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
		>
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
		</motion.div>
	);
}
