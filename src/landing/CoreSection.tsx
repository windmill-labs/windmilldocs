import React from 'react';
import LandingSectionWrapper from './LandingSectionWrapper';
import CardsContainer from '../landing/cards/Cards';
import classNames from 'classnames';
import { Apple, Code, Gauge, Play, Server } from 'lucide-react';

import { BoltIcon } from '@heroicons/react/20/solid';
import { FaJsSquare } from 'react-icons/fa';

const cards = [
	{
		title: 'Super Snappy App',
		subtitle: 'Experience the ultimate speed in app creation',
		Icon: Apple,
		gridArea: 'md:col-span-1 md:row-span-3',
		href: '/docs/deploy_gh_gl'
	},
	{
		title: 'Instant Preview/Execution',
		subtitle: 'Witness your changes in real-time',
		Icon: Play,
		gridArea: 'md:col-span-1 md:row-span-3',
		href: '/docs/deploy_gh_gl'
	},
	{
		title: 'Fastest Workflow Engine',
		subtitle: 'Streamline your work with unmatchable speed',
		Icon: Gauge,
		gridArea: 'md:col-span-1 md:row-span-3',
		href: '/docs/deploy_gh_gl'
	},
	{
		title: 'Blazingly Fast',
		subtitle: 'Our service ensures peak performance at all times',
		Icon: BoltIcon,
		gridArea: 'md:col-span-1 md:row-span-3',
		href: '/docs/deploy_gh_gl'
	},
	{
		title: 'Languages',
		subtitle: 'Support for a multitude of languages',
		Icon: FaJsSquare,
		gridArea: 'md:col-span-1 md:row-span-3',
		href: '/docs/deploy_gh_gl'
	},
	{
		title: 'Code, But Zero Boilerplate',
		subtitle: 'Enjoy seamless coding without the clutter',
		Icon: Code,
		gridArea: 'md:col-span-2 md:row-span-3',
		href: '/docs/deploy_gh_gl'
	},
	{
		title: 'Scale to Any Cluster Size',
		subtitle: 'Effortlessly manage your project of any size',
		Icon: Server,
		gridArea: 'md:col-span-1 md:row-span-3',
		href: '/docs/deploy_gh_gl'
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
							Accelerate Your Coding Experience
						</h1>
					</div>
					<h2 className={`${colors.text} text-2xl font-semibold`}>Fast, Flexible and performant</h2>
				</div>

				<span className={`text-lg ${colors.text} max-w-3xl mb-8`}>
					Boost efficiency with fast workflow engine, instant preview, and zero-boilerplate language
					support
				</span>
				<CardsContainer cards={cards} mode="light" />
			</div>
		</LandingSectionWrapper>
	);
}
