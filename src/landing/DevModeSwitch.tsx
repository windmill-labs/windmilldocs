import React from 'react';
import { Switch } from '@headlessui/react';
import { useDeveloperMode } from '../components/GlobalContextProvider';
import classNames from 'classnames';

export default function DevModeSwitch({ color = 'blue' }) {
	const { developerMode, setDeveloperMode } = useDeveloperMode();

	const switchColor = {
		blue: 'bg-blue-500 dark:bg-blue-900',
		orange: 'bg-orange-500 dark:bg-orange-900',
		teal: 'bg-teal-500 dark:bg-teal-900'
	};

	const id = `dev-mode-switch-${color}`;

	return (
		<div className="my-4 flex flex-row gap-2 items-center transition-all" id={id}>
			<Switch
				title="Toggle Developer Mode"
				checked={developerMode}
				onChange={() => {
					const el = document.getElementById(id);
					const offset = el.getBoundingClientRect().top;

					setDeveloperMode(!developerMode);

					setTimeout(() => {
						const el = document.getElementById(id);

						window.scrollBy({
							top: el.getBoundingClientRect().top - offset
						});
					}, 100);
				}}
				className={`${developerMode ? switchColor[color] : 'bg-gray-200 dark:bg-gray-800'}
          relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
			>
				<span
					aria-hidden="true"
					className={`${developerMode ? 'translate-x-9' : 'translate-x-0'}
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white  shadow-lg ring-0 transition duration-200 ease-in-out`}
				/>
			</Switch>
			<span className={classNames('font-bold text-xl text-gray-900 dark:text-white')}>
				Developer?
			</span>
		</div>
	);
}
