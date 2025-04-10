import React, { useEffect, useState } from 'react';
import LandingSection from './LandingSection';
import {
	Code,
	ExternalLink,
	FastForward,
	LayoutDashboard,
	List,
	Play,
	PlayCircle
} from 'lucide-react';
import { VolumeX } from 'lucide-react';

const tabs = [
	{
		label: 'Scripts',
		icon: Code,
		id: 'scripts',
		data: []
	},
	{
		label: 'Flows',
		icon: List,
		id: 'flows',
		data: []
	},
	{
		label: 'Apps',
		icon: LayoutDashboard,
		id: 'apps',
		data: []
	}
];

export default function HeroExample() {
	const [hookProps] = useState({
		tabs: tabs,
		initialTabId: tabs[0].id
	});
	const [played, setPlayed] = useState(false);

	// When played toggles to true, start the video
	useEffect(() => {
		const video = document.getElementById('main-video') as HTMLVideoElement;
		if (played) {
			video.play();
		}
	}, [played]);

	return (
		<div className="relative">
			<LandingSection bgClass="">
				<div className="w-full gap-6 flex flex-col">
					<h1 className="tracking-tight leading-tight text-left font-bold text-transparent bg-clip-text bg-gradient-to-br from-slate-500 to-slate-800 dark:from-slate-100 dark:to-slate-500 ">
						Give your scripts Superpowers
					</h1>
					<p className="max-w-5xl text-lg">
						Make your scripts production grade and build all of your internal tools with Python,
						TypeScript, Go, PHP, Rust, Bash, C#, SQL. <br /> Compose your scripts as workflows using low-code.{' '}
						<br />
						Share an autogenerated UI or build one using low-code. Run it reliably at scale on your
						infra or ours, with permissioning and monitoring included. Fully open-source and easy to
						deploy on small and large infra. Any dependency with zero-config.
					</p>
					<div className="video-container">
						<iframe
							src="https://www.youtube.com/embed/IOvzHJ2BHl8"
							title="YouTube video player"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
							allowFullScreen={true}
							className="rounded-xl"
						></iframe>
					</div>
					<div className="flex flex-row justify-end w-full gap-4 items-center">
						<div className="flex flex-col gap-1">
							<div className="text-sm font-medium ">{'Short on time?'}</div>
							<div className="text-xs">{'Check out our 2-minute tour!'}</div>
						</div>
						<a
							href="https://www.youtube.com/watch?v=pJh2fdstV-A"
							target="_blank"
							rel="noreferrer"
							className="h-8 text-xs font-medium  bg-blue-100 !text-blue-600 shadow-sm hover:bg-blue-200 hover:text-blue-800 !no-underline flex flex-row gap-1 items-center rounded-md justify-center py-1 px-3 hover:bg-opacity-80 transition-all"
						>
							{'Watch Now'}
							<ExternalLink size={16} className="!text-blue-600" />
						</a>
					</div>
				</div>
			</LandingSection>
		</div>
	);
}
