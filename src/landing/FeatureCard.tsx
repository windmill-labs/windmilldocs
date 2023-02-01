import classNames from 'classnames';
import React from 'react';
import FadeInWhenVisible from './FadeInWhenVisible';


export default function FeatureCard({ description, title, Icon,selected, color = 'blue', index }) {
	const borders = {
		blue: 'border-blue-300',
		green: 'border-teal-300',
		orange: 'border-orange-300'
	};

	const iconColor = {
		blue: 'text-blue-200',
		green: 'text-teal-200',
		orange: 'text-orange-200'
	};

	const fromTo = {
		blue: 'from-blue-400 to-blue-600',
		green: 'from-teal-400 to-teal-600',
		orange: 'from-orange-400 to-orange-600'
	};

	const shadow = {
		blue: 'card-shadow-blue',
		green: 'card-shadow-teal',
		orange: 'card-shadow-orange'
	}

	const outlineColor = {
		blue: 'outline-blue-500',
		green: 'outline-teal-500',
		orange: 'outline-orange-500'
	}

	return (
		<FadeInWhenVisible delta={index*50}>
			<div
				className={classNames(`w-full border ${borders[color]} rounded-xl ${shadow[color]} p-6 gap-2 flex flex-col bg-white relative text-left`,
				selected ? `outline outline-2 outline-offset-4 ${outlineColor[color]}` : 'outline-none',
				)}
			>
				<Icon
					className={`absolute top-4 right-4 w-8 h-8 ${iconColor[color]}`}
				/>
				<span
					className={`text-lg font-bold text-transparent bg-clip-text bg-gradient-to-br ${fromTo[color]}`}
				>
					{title}
				</span>
				<span className='text-sm'>
				{description}
				</span>
			</div>
		</FadeInWhenVisible>
	);
}
