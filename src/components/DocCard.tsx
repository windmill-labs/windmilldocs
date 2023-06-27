import classNames from 'classnames';
import React from 'react';

export default function DocCard({ title, description, href, Icon = undefined, color = 'blue' }) {
	const colors = {
		blue: 'hover:bg-blue-100 hover:dark:bg-blue-900/50 hover:border-blue-500 dark:hover:border-blue-600 ',
		teal: 'hover:bg-teal-100 hover:dark:bg-teal-900/50 hover:border-teal-500 dark:hover:border-teal-600 ',
		orange:
			'hover:bg-orange-100 hover:dark:bg-orange-900/50 hover:border-orange-500 dark:hover:border-orange-600 '
	};

	const iconColors = {
		blue: 'bg-blue-200 text-blue-800 dark:bg-blue-500 dark:text-blue-100',
		teal: 'bg-teal-200 text-teal-800 dark:bg-teal-600 dark:text-teal-100',
		orange: 'bg-orange-200 text-orange-800 dark:bg-orange-600 dark:text-orange-100'
	};

	return (
		<a
			href={href}
			className={classNames(
				'rounded-md p-8 border border-gray-100 dark:border-gray-800 shadow-sm transition-all cursor-pointer flex flex-col gap-2 !no-underline overflow-hidden',
				colors[color]
			)}
			target="_blank"
		>
			<div className="flex flex-row gap-4 items-center">
				{Icon !== undefined && (
					<Icon size={32} className={classNames('rounded-md p-2', iconColors[color])} />
				)}
				<div className="text-lg font-semibold text-gray-800 dark:text-gray-100">{title}</div>
			</div>
			<div className="text-sm text-gray-500 dark:text-gray-200">{description}</div>
		</a>
	);
}
