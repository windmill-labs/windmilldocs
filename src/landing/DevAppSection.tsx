import React from 'react';
import LandingSection from './LandingSection';
import CardsContainer from './cards/Cards';
import { Terminal } from 'lucide-react';
import { FaReact, SiReact, SiSvelte, SiVuedotjs } from 'react-icons/all';

export default function DevScriptsSections() {
	return (
		<LandingSection bgClass="bg-gradient-to-b to-gray-900 from-black">
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
							title: 'React Template',
							subtitle: 'Write scripts in any language',

							Icon: SiReact,
							gridArea: 'md:col-span-2 md:row-span-6'
						},
						{
							title: 'Svelte Template',
							subtitle: 'Write scripts in any language',

							Icon: SiSvelte,
							gridArea: 'md:col-span-2 md:row-span-3'
						},
						{
							title: 'Vue Template',
							subtitle: 'Write scripts in any language',

							Icon: SiVuedotjs,
							gridArea: 'md:col-span-2 md:row-span-3'
						}
					]}
				/>
			</div>
		</LandingSection>
	);
}
