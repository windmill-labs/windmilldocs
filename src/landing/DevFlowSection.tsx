import React from 'react';
import LandingSection from './LandingSection';
import CardsContainer from './cards/Cards';
import { Code, Flower, List, Terminal, Webhook } from 'lucide-react';
import { BiTerminal } from 'react-icons/bi';
import { CgTerminal } from 'react-icons/cg';

export default function DevScriptsSections() {
	return (
		<LandingSection bgClass="bg-gradient-to-br from-slate-900 to-black">
			<div className="flex flex-col w-full gap-4 justify-center" id="script-section">
				<div className="flex flex-col gap-2">
					<h1 className="tracking-tight leading-tight text-left font-bold text-transparent bg-clip-text bg-gradient-to-br from-teal-200 to-teal-500">
						Flow
					</h1>
					<h2 className="text-white text-2xl font-semibold">
						Workflow engine on-par with Airflow/Temporal
					</h2>
				</div>

				<span className="text-lg text-white max-w-3xl">
					Build complex Flows from atomic scripts
				</span>

				<CardsContainer
					key="flow-card"
					r={13}
					g={148}
					b={136}
					cards={[
						{
							title: 'OpenFlow Specification',
							subtitle: 'Define your flows using the OpenFlow specification',
							Icon: List,
							gridArea: 'md:col-span-2 md:row-span-6'
						},
						{
							title: 'CLI',
							subtitle: 'Trigger, sync and monitor flows from CLI',
							Icon: Terminal,
							gridArea: 'md:col-span-1 md:row-span-3'
						},
						{
							title: 'Webhook',
							subtitle: 'Trigger flows from a webhook',
							Icon: Webhook,
							gridArea: 'md:col-span-1 md:row-span-3'
						},
						{
							title: 'Flow Builder SDK',
							subtitle: 'Build your flow using the Flow Builder SDK in Typescript and Python',
							Icon: Code,
							gridArea: 'md:col-span-2 md:row-span-3'
						}
					]}
				/>
			</div>
		</LandingSection>
	);
}
