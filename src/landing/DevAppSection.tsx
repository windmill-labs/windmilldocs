import React from 'react';
import LandingSection from './LandingSection';
import CardsContainer from './cards/Cards';
import { FaCode, FaJs } from 'react-icons/all';
import FrameworkSvg from './cards/svgs/FrameworkSvg';
import AppEditorSvg from './cards/svgs/AppEditorSvg';

export default function DevScriptsSections() {
	return (
		<LandingSection bgClass="bg-gray-900 relative isolate overflow-hidden">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 1024 1024"
				className="absolute top-1/2 left-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 "
				aria-hidden="true"
			>
				<circle
					cx={512}
					cy={512}
					r={512}
					fill="url(#76f2de34-8214-40b8-bfb5-42171f5dc07b)"
					fillOpacity="0.7"
				/>
				<defs>
					<radialGradient
						id="76f2de34-8214-40b8-bfb5-42171f5dc07b"
						cx={0}
						cy={0}
						r={1}
						gradientUnits="userSpaceOnUse"
						gradientTransform="translate(512 512) rotate(90) scale(512)"
					>
						<stop stopColor="#431407" />
						<stop offset={1} stopColor="#431407" stopOpacity={0} />
					</radialGradient>
				</defs>
			</svg>
			<div className="flex flex-col w-full gap-4 justify-center" id="script-section">
				<div className="flex flex-col gap-2">
					<h1 className="tracking-tight leading-tight text-left font-bold text-transparent bg-clip-text bg-gradient-to-br from-orange-200 to-orange-500">
						Apps
					</h1>
					<h2 className="text-white text-2xl font-semibold">Pick a framework, write your app</h2>
				</div>

				<span className="text-lg text-white max-w-3xl">
					Build Windmill apps using React, Vue or Svelte.
				</span>

				<CardsContainer
					key="flow-card"
					r={249}
					g={115}
					b={22}
					cards={[
						{
							title: 'Support for React, Vue, Svelte and vanilla JS',
							subtitle: 'Build them with Vite locally and deploy them on Windmill',

							Icon: FaJs,
							gridArea: 'md:col-span-2 md:row-span-6',
							svg: <FrameworkSvg />
						},
						{
							title: 'Inline scripts',
							subtitle: 'Wrote your low-code app logic in Python, TypeScript, Go or Bash.',
							Icon: FaCode,
							gridArea: 'md:col-span-2 md:row-span-6',
							svg: <AppEditorSvg />
						}
					]}
				/>
			</div>
		</LandingSection>
	);
}
