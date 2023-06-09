import React from 'react';
import { Switch } from '@headlessui/react';
import { useDeveloperMode } from '../pages';

export default function DevModeSwitch() {
	const { developerMode, setDeveloperMode } = useDeveloperMode();

	return (
		<div className="my-8 flex flex-row gap-2 items-center">
			<span className="font-bold text-sm">Low-code users</span>

			<Switch
				checked={developerMode}
				onChange={setDeveloperMode}
				className={`${developerMode ? 'bg-blue-500' : 'bg-gray-200'}
          relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
			>
				<span
					aria-hidden="true"
					className={`${developerMode ? 'translate-x-9' : 'translate-x-0'}
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
				/>
			</Switch>
			<span className="font-bold text-sm">Developers</span>
		</div>
	);
}
