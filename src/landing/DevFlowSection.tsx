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
import TriggersSvg from './cards/svgs/TriggersSvg';

export default function DevScriptsSections() {
	return (
		<LandingSection bgClass="bg-gray-900 relative isolate overflow-hidden">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 1024 1024"
				className="absolute top-1/2 left-0 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 -translate-x-1/2"
				aria-hidden="true"
			>
				<circle
					cx={512}
					cy={512}
					r={512}
					fill="url(#a579f222-4a91-44ad-be8a-2645b715d636)"
					fillOpacity="0.7"
				/>
				<defs>
					<radialGradient
						id="a579f222-4a91-44ad-be8a-2645b715d636"
						cx={0}
						cy={0}
						r={1}
						gradientUnits="userSpaceOnUse"
						gradientTransform="translate(512 512) rotate(90) scale(512)"
					>
						<stop stopColor="#134e4a" />
						<stop offset={1} stopColor="#134e4a" stopOpacity={0} />
					</radialGradient>
				</defs>
			</svg>

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
							subtitle:
								'Develop flow steps locally with your favorite code editor, preview them locally and deploy them with the CLI.',
							Icon: Code2,
							gridArea: 'md:col-span-2 md:row-span-4',
							svg: <CodeSvg />
						},
						{
							title: 'Blazing Fast',
							subtitle: "The fastest workflow engine (it's in Rust)",
							Icon: FastForward,
							gridArea: 'md:col-span-1 md:row-span-3',
							svg: <FastSvg />
						},
						{
							title: 'Retries and errors',
							subtitle: 'Retry failed steps, or handle errors',
							Icon: RotateCcw,
							gridArea: 'md:col-span-1 md:row-span-3',
							svg: <RetriesSvg />
						},

						{
							title: 'Triggers',
							subtitle: 'Trigger flows from a webhook or schedule',
							Icon: Webhook,
							gridArea: 'md:col-span-2 md:row-span-4',
							svg: <TriggersSvg />
						},
						{
							title: 'Approval',
							subtitle: 'Handle errors in your flow',
							Icon: Bug,
							gridArea: 'md:col-span-1 md:row-span-3',
							svg: <BugSvg />
						},
						{
							title: 'Approval',
							subtitle: 'Handle errors in your flow',
							Icon: Bug,
							gridArea: 'md:col-span-1 md:row-span-3',
							svg: <BugSvg />
						}
					]}
				/>
			</div>
		</LandingSection>
	);
}
