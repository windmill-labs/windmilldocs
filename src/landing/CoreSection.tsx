import React from 'react';
import LandingSectionWrapper from './LandingSectionWrapper';
import CardsContainer from '../landing/cards/Cards';
import classNames from 'classnames';
import { Gauge, Play, Server } from 'lucide-react';

import { BoltIcon } from '@heroicons/react/20/solid';

const cards = [
	{
		title: 'Super Snappy App',
		subtitle: 'Experience the ultimate speed in app creation',
		Icon: BoltIcon,
		gridArea: 'md:col-span-1 md:row-span-3'
	},
	{
		title: 'Instant Preview/Execution',
		subtitle: 'Preview your scripts, flows and apps instantly',
		Icon: Play,
		gridArea: 'md:col-span-1 md:row-span-3'
	},
	{
		title: 'Fastest Workflow Engine',
		subtitle: 'Streamline your workflows with unmatchable speed',
		Icon: Gauge,
		gridArea: 'md:col-span-1 md:row-span-3',
		href: '/docs/misc/benchmarks'
	},
	{
		title: 'Scale to Any Cluster Size',
		subtitle: 'Scale your infrastructure to any size',
		Icon: Server,
		gridArea: 'md:col-span-1 md:row-span-3'
	}
];
export default function CoreSection({ color }) {
	const colors = {
		bg: 'bg-white',
		text: 'text-gray-600'
	};

	return (
		<LandingSectionWrapper className={`${colors.bg}`} color={color}>
			<div className="flex flex-col w-full gap-4 justify-center" id="script-section light">
				<div className="flex flex-col gap-2 ">
					<div className="flex justify-between items-center w-full">
						<h1
							className={classNames(
								'font-bold text-transparent bg-clip-text bg-gradient-to-br ',
								'from-slate-500 to-slate-700'
							)}
						>
							Really fast
						</h1>
					</div>
				</div>

				<CardsContainer cards={cards} mode="light" />
			</div>
		</LandingSectionWrapper>
	);
}
