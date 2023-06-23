import classNames from 'classnames';
import React from 'react';

export default function DocCard({ title, description, href, color = 'blue' }) {
	const colors = {
		blue: 'hover:bg-blue-100 hover:dark:bg-blue-900 hover:border-blue-500 dark:hover:border-blue-600 ',
		teal: 'hover:bg-teal-100 hover:dark:bg-teal-900 hover:border-teal-500 dark:hover:border-teal-600 ',
		orange:
			'hover:bg-orange-100 hover:dark:bg-orange-900 hover:border-orange-500 dark:hover:border-orange-600 '
	};

	return (
		<a
			href={href}
			className={classNames(
				'dark:border-gray-500 rounded-md p-6 border border-gray-200 shadow-sm transition-all cursor-pointer flex flex-col gap-2 !no-underline',
				colors[color]
			)}
			target="_blank"
		>
			<div className="text-lg font-semibold text-gray-900 dark:text-white">{title}</div>
			<div className="text-sm text-gray-500 dark:text-gray-400">{description}</div>
		</a>
	);
}
