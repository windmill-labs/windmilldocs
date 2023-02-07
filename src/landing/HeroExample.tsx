import React, { useEffect, useState } from 'react';
import LandingSection from './LandingSection';
import { Code } from 'lucide-react';
import { useTabs } from './tabs/useTabs';
import { Framer } from './tabs/framer';

const tabs = [
	{
		label: 'Scripts',
		icon: Code,
		id: 'scripts',
		data: []
	},
	{
		label: 'Flows',
		icon: Code,
		id: 'flows',
		data: []
	},
	{
		label: 'Apps',
		icon: Code,
		id: 'apps',
		data: []
	}
];

export default function HeroExample() {
	const [hookProps] = useState({
		tabs: tabs,
		initialTabId: tabs[0].id
	});
	const framer = useTabs(hookProps);

	useEffect(() => {
		const video = document.getElementById('main-video') as HTMLVideoElement;

		if (framer.selectedTab.id === 'scripts') {
			video.currentTime = 0;
		}
		if (framer.selectedTab.id === 'flows') {
			video.currentTime = 66;
		}
		if (framer.selectedTab.id === 'apps') {
			video.currentTime = 127;
		}
	}, [framer.selectedTab]);

	// add event listener to video to update tab when video progresses
	useEffect(() => {
		const video = document.getElementById('main-video') as HTMLVideoElement;
		video.addEventListener('timeupdate', () => {
			if (video.currentTime < 0) {
				framer.tabProps.setSelectedTab([0, 1]);
			}
			if (video.currentTime > 66 && video.currentTime < 127) {
				framer.tabProps.setSelectedTab([1, 1]);
			}
			if (video.currentTime > 127) {
				framer.tabProps.setSelectedTab([2, 1]);
			}
		});
		return () => {
			video.removeEventListener('timeupdate', () => {});
		};
	}, []);

	return (
		<LandingSection bgClass="bg-white">
			<div className="w-full gap-8 flex flex-col">
				<h1 className="tracking-tight leading-tight text-left font-bold text-transparent bg-clip-text bg-gradient-to-br from-slate-500 to-slate-800">
					Supercharge your scripts
				</h1>
				<span className="text-lg text-gray-600 max-w-3xl">
					Become proud of the scripts that power your internal tools by making them production grade
					without any effort. Run everything at scale on your infra or ours, with optimal
					reliability, tight permissioning and clear monitoring.
				</span>
				<Framer.Tabs {...framer.tabProps} color="slate" />

				<video
					className="border-2 rounded-xl object-cover w-full h-full"
					autoPlay
					loop
					id="main-video"
					src="/videos/main.mp4"
				/>
			</div>
		</LandingSection>
	);
}
