import React, { useState } from 'react';
import { Framer } from './framer';
import TabContent from './TabContent';
import { Tab, useTabs } from './useTabs';

export default function FeatureCardTabs({
	tabs,
	color = 'blue' as 'blue' | 'green' | 'orange'
}) {
	const [hookProps] = useState({
		tabs: tabs,
		initialTabId: tabs[0].id
	});
	const framer = useTabs(hookProps);
	const data = framer.selectedTab.data;

	return (
		<div className=''>
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
					{tabs.map((tab: Tab) => (
						<option key={tab.label}>{tab.label}</option>
					))}
				</select>
				<Framer.Content
					{...framer.contentProps}
				>
					<TabContent data={data} color={color} />
				</Framer.Content>
			</div>
			<div className="hidden sm:block">
				<div className="w-full flex flex-col items-center justify-center">
					<div className="max-w-7xl gap-8 flex flex-col">
						<Framer.Tabs {...framer.tabProps} color={color} />
						<Framer.Content {...framer.contentProps} className="relative">
							<TabContent data={data}color={color}/>
						</Framer.Content>
					</div>
				</div>
			</div>
		</div>
	);
}
