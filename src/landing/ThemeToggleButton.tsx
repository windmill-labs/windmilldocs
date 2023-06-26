import classNames from 'classnames';
import { MoonIcon, SunIcon } from 'lucide-react';
import React from 'react';

export default function ThemeToggleButton({ colorMode, setColorMode }) {
	const isLightMode = colorMode === 'light';
	const Icon = isLightMode ? SunIcon : MoonIcon;

	return (
		<button
			className={
				'text-gray-500 hover:text-gray-900 dark:text-gray-200 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 p-2 transition-all'
			}
			onClick={() => setColorMode(isLightMode ? 'dark' : 'light')}
		>
			<Icon className="h-5 w-5" aria-hidden="true" />
		</button>
	);
}
