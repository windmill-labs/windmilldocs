import React from 'react';
import LandingSection from './LandingSection';
import CardsContainer from './cards/Cards';
import { Bug, Code2, FastForward, RotateCcw, Terminal, Webhook } from 'lucide-react';
import CodeSvg from './cards/svgs/CodeSvg';
import FastSvg from './cards/svgs/FastSvg';
import TerminalSvg from './cards/svgs/TerminalSvg';
import WebhookSvg from './cards/svgs/WebhookSvg';
import RetriesSvg from './cards/svgs/RetriesSvg';
import BugSvg from './cards/svgs/BugSvg';

export default function DevScriptsSections() {
	return (
		<LandingSection bgClass="bg-gradient-to-b from-gray-900 to-black">
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
							title: 'Local Development',
							subtitle: 'Modify your flow steps locally',
							Icon: Code2,
							gridArea: 'md:col-span-1 md:row-span-6',
							svg: <CodeSvg />
						},
						{
							title: 'Blazing Fast',
							subtitle: 'Run your flow in parallel',
							Icon: FastForward,
							gridArea: 'md:col-span-1 md:row-span-3',
							svg: <FastSvg />
						},
						{
							title: 'Retries',
							subtitle: 'Retry failed steps',
							Icon: RotateCcw,
							gridArea: 'md:col-span-1 md:row-span-3',
							svg: <RetriesSvg />
						},
						{
							title: 'Error Handling',
							subtitle: 'Handle errors in your flow',
							Icon: Bug,
							gridArea: 'md:col-span-1 md:row-span-3',
							svg: <BugSvg />
						},
						{
							title: 'CLI',
							subtitle: 'Trigger, sync and monitor flows from CLI',
							Icon: Terminal,
							gridArea: 'md:col-span-2 md:row-span-3',
							svg: <TerminalSvg />
						},
						{
							title: 'Webhook',
							subtitle: 'Trigger flows from a webhook',
							Icon: Webhook,
							gridArea: 'md:col-span-1 md:row-span-3',

							svg: <WebhookSvg />
						}
					]}
				/>
			</div>
		</LandingSection>
	);
}
