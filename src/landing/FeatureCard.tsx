import classNames from 'classnames';
import React from 'react';

export default function FeatureCard({ description, title, Icon, selected, color = 'blue', index }) {
	const hovers = {
		blue: 'hover:border-blue-500 ',
		teal: 'hover:border-teal-500',
		orange: 'hover:border-orange-500'
	};

	const borders = {
		blue: 'border-blue-300 dark:border-blue-900',
		teal: 'border-teal-300 dark:border-teal-900',
		orange: 'border-orange-300 dark:border-orange-900'
	};

	const iconColor = {
		blue: 'text-blue-200',
		teal: 'text-teal-200',
		orange: 'text-orange-200'
	};

	const fromTo = {
		blue: 'from-blue-600 to-blue-800 dark:from-blue-200 dark:to-blue-400',
		teal: 'from-teal-600 to-teal-800 dark:from-teal-200 dark:to-teal-400',
		orange: 'from-orange-600 to-orange-800 dark:from-orange-200 dark:to-orange-400'
	};

	const outlineColor = {
		blue: 'outline-blue-500',
		teal: 'outline-teal-500',
		orange: 'outline-orange-500'
	};

	return (
		<div>
			<div
				className={classNames(
					`w-full border rounded-md ${borders[color]} ${hovers[color]} px-6 py-4 gap-2 flex flex-col  relative text-left`,
					selected ? `outline outline-2 outline-offset-4 ${outlineColor[color]}` : 'outline-none'
				)}
			>
				<Icon className={`absolute top-4 right-4 w-6 h-6 ${iconColor[color]}`} />
				<span
					className={`text-md font-bold text-transparent bg-clip-text bg-gradient-to-br ${fromTo[color]} max-w-[18rem]`}
				>
					{title}
				</span>
				{description && (
					<span className="text-gray-500 text-sm dark:text-white">{description}</span>
				)}
			</div>
		</div>
	);
}
