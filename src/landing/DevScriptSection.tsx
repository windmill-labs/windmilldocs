import React from 'react';
import LandingSection from './LandingSection';
import CardsContainer from './cards/Cards';
import { Github, Terminal } from 'lucide-react';
import WindmillGithubSync from './cards/svgs/WindmillGithubSync';
import CodeSvg from './cards/svgs/CodeSvg';
import Dependencies from './cards/svgs/Dependencies';
import IDES from './cards/svgs/IDES';
import TerminalSvg from './cards/svgs/TerminalSvg';

export default function DevScriptsSections() {
	return (
		<LandingSection bgClass="bg-gray-900 relative isolate overflow-hidden">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 1024 1024"
				className="absolute top-1/2 left-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2"
				aria-hidden="true"
			>
				<circle
					cx={512}
					cy={512}
					r={512}
					fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)"
					fillOpacity="0.7"
				/>
				<defs>
					<radialGradient
						id="827591b1-ce8c-4110-b064-7cb85a0b1217"
						cx={0}
						cy={0}
						r={1}
						gradientUnits="userSpaceOnUse"
						gradientTransform="translate(512 512) rotate(90) scale(512)"
					>
						<stop stopColor="#1e3a8a" />
						<stop offset={1} stopColor="#1e3a8a" stopOpacity={0} />
					</radialGradient>
				</defs>
			</svg>
			<div className="flex flex-col w-full gap-4 justify-center" id="script-section">
				<div className="flex flex-col gap-2">
					<h1 className="tracking-tight leading-tight text-left font-bold text-transparent bg-clip-text bg-gradient-to-br from-sky-300 to-blue-500">
						Scripts
					</h1>
					<h2 className="text-white text-2xl font-semibold">
						No overhead, scalable, self-hostable FaaS
					</h2>
				</div>

				<span className="text-lg text-gray-300 max-w-3xl">
					Run long-running heavy background jobs, script with complex dependencies, endpoints with
					high rpm or simple one-off tasks without any overhead. Trigger them from a webhook or the
					auto-generated UI and monitor them easily.
				</span>

				<CardsContainer
					key="script-card"
					cards={[
						{
							title: 'Local Development',
							subtitle:
								'Develop scripts locally with your favorite code editor, preview them locally and deploy them with the CLI.',
							Icon: Terminal,
							gridArea: 'md:col-span-2 md:row-span-6',
							svg: <CodeSvg />
						},
						{
							title: 'Deploy from Github',
							subtitle: 'Deploy scripts from Github',
							Icon: Github,
							gridArea: 'md:col-span-1 md:row-span-3',
							svg: <WindmillGithubSync />
						},
						{
							title: 'CLI',
							subtitle: 'Trigger, sync and monitor scripts from CLI',
							Icon: Terminal,
							gridArea: 'md:col-span-1 md:row-span-3',
							svg: <TerminalSvg />
						},
						{
							title: 'Dependencies',
							subtitle: 'Windmill automatically resolves the dependencies',
							Icon: Terminal,
							gridArea: 'md:col-span-1 md:row-span-3',
							svg: <Dependencies />
						},
						{
							title: 'Immutable scripts',
							subtitle: 'Every deployed script has a unique and permanent hash.',
							Icon: Terminal,
							gridArea: 'md:col-span-1 md:row-span-3',
							svg: <IDES />
						}
					]}
				/>
			</div>
		</LandingSection>
	);
}
