import React from 'react';
import LandingSectionWrapper from './LandingSectionWrapper';
import CardsContainer from '../landing/cards/Cards';
import classNames from 'classnames';
import { Gauge, Play, Server } from 'lucide-react';
import { useColorMode } from '@docusaurus/theme-common';
import { BoltIcon } from '@heroicons/react/20/solid';

const cards = [
	{
		title: 'Instant Preview/Execution',
		subtitle: 'Live logs and job starting in 20ms',
		Icon: Play,
		gridArea: 'md:col-span-1 md:row-span-3',
		href: '/docs/core_concepts/instant_preview',
		newTab: true
	},
	{
		title: 'Fastest Workflow Engine',
		subtitle: 'Only 20ms latency between steps',
		Icon: Gauge,
		gridArea: 'md:col-span-1 md:row-span-3',
		href: '/docs/misc/benchmarks/competitors',
		newTab: true
	},
	{
		title: 'Scale to Any Cluster Size',
		subtitle: 'From Raspberry Pi to large Kubernetes clusters',
		Icon: Server,
		gridArea: 'md:col-span-1 md:row-span-3',
		href: 'https://github.com/windmill-labs/windmill-helm-charts',
		newTab: true
	},
	{
		title: 'Super Snappy Apps',
		subtitle: 'Build complex apps that load instantly',
		Icon: BoltIcon,
		gridArea: 'md:col-span-1 md:row-span-3',
		href: '/docs/getting_started/apps_quickstart',
		newTab: true
	}
];
export default function CoreSection({ color }) {
	const { colorMode } = useColorMode();

	return (
		<LandingSectionWrapper color={color}>
			<div className="flex flex-col w-full gap-4 justify-center" id="script-section">
				<div className="flex flex-col gap-2 ">
					<div className="flex justify-between items-center w-full">
						<h1
							className={classNames(
								'font-bold text-transparent bg-clip-text bg-gradient-to-br ',
								'from-slate-500 to-slate-700 dark:from-slate-100 dark:to-slate-500'
							)}
						>
							Really fast
						</h1>
					</div>
				</div>

				<CardsContainer cards={cards} mode={colorMode === 'dark' ? 'dark' : 'light'} />
			</div>
		</LandingSectionWrapper>
	);
}
