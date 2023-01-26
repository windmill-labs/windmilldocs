import React from 'react';
import { GitBranch, Repeat, Verified } from 'lucide-react';
import { BoltIcon } from '@heroicons/react/24/outline';

const tabs = [
	{ name: 'Trigger', icon: BoltIcon },
	{ name: 'Approval', icon: Verified },
	{ name: 'Branches', icon: GitBranch },
	{ name: 'Loops', icon: Repeat }
];

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export default function Tabs() {
	const [selectedTabIndex, setSelectedTabIndex] = React.useState(0);

	return (
		<div>
			<div className="sm:hidden">
				<label htmlFor="tabs" className="sr-only">
					Select a tab
				</label>
				<select
					id="tabs"
					name="tabs"
					className="block w-full rounded-md border-gray-300 focus:border-green-500 focus:ring-green-500"
					defaultValue={'Company'}
				>
					{tabs.map((tab) => (
						<option key={tab.name}>{tab.name}</option>
					))}
				</select>
			</div>
			<div className="hidden sm:block">
				<nav className="flex space-x-4" aria-label="Tabs">
					{tabs.map((tab, index) => (
						<button
							key={tab.name}
							onClick={() => setSelectedTabIndex(index)}
							className={classNames(
								selectedTabIndex === index
									? 'bg-green-100 text-green-700'
									: 'text-gray-500 hover:text-gray-700',
								'px-3 py-2 font-medium text-sm rounded-md flex flex-row gap-2'
							)}
							aria-current={selectedTabIndex === index ? 'page' : undefined}
						>
							<tab.icon className="w-5 h-5" aria-hidden="true" />
							{tab.name}
						</button>
					))}
				</nav>
			</div>
		</div>
	);
}
