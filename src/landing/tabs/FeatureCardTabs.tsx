import React from 'react';
import { useState } from 'react';
import { Framer } from './framer';
import { useTabs } from './useTabs';

export default function FeatureCardTabs({ children, tabs }) {
	const [hookProps] = useState({
		tabs: tabs,
		initialTabId: 'trigger'
	});
	const framer = useTabs(hookProps);
	return (
		<div>
			<div className="sm:hidden ">
				<label htmlFor="tabs" className="sr-only">
					Select a tab
				</label>
				<select
					id="tabs"
					name="tabs"
					className="block w-full rounded-md border-gray-300 focus:border-green-500 focus:ring-green-500"
					defaultValue={'Company'}
					onSelect={(e) => {
						framer.tabProps.setSelectedTab([1, 1]);
					}}
				>
					{tabs.map((tab) => (
						<option key={tab.label}>{tab.label}</option>
					))}
				</select>
				<Framer.Content
					{...framer.contentProps}
					className="text-center rounded-3xl py-9 flex flex-col items-center "
				>
					{children}
				</Framer.Content>
			</div>
			<div className="hidden sm:block">
				<div className="w-full flex flex-col items-center justify-center">
					<div className="max-w-7xl">
						<Framer.Tabs {...framer.tabProps} />
						<Framer.Content
							{...framer.contentProps}
							className=" py-8 flex flex-col "
						>
							{framer.tabProps.tabs[framer.tabProps.selectedTabIndex].children}
						</Framer.Content>
					</div>
				</div>
			</div>
		</div>
	);
}
