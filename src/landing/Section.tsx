import React from 'react';
import { useDeveloperMode } from '../pages';
import LandingSectionWrapper from './LandingSectionWrapper';
import DevModeSwitch from './DevModeSwitch';
import { AnimatePresence, motion } from 'framer-motion';
import CardsContainer from '../landing/cards/Cards';
import FeatureCardTabs from '../landing/tabs/FeatureCardTabs';
import classNames from 'classnames';

export default function Section({ cards, tabs, title, caption, description, color, key }) {
	const { developerMode } = useDeveloperMode();
	const colorGradient = {
		dark: {
			blue: 'from-blue-200 to-blue-400',
			teal: 'from-teal-200 to-teal-400',
			orange: 'from-orange-200 to-orange-400'
		},
		light: {
			blue: 'from-blue-500 to-blue-700',
			teal: 'from-teal-500 to-teal-700',
			orange: 'from-orange-500 to-orange-700'
		}
	};
	const colors = {
		bg: developerMode ? 'bg-gray-900' : 'bg-white',
		text: developerMode ? 'text-white' : 'text-gray-600',
		gradient: developerMode ? colorGradient.dark[color] : colorGradient.light[color]
	};

	const accentColor = {
		blue: [59, 130, 246],
		teal: [13, 148, 136],
		orange: [249, 115, 22]
	};

	return (
		<LandingSectionWrapper className={`${colors.bg}`} color={color}>
			<div className="flex flex-col w-full gap-4 justify-center" id="script-section">
				<div className="flex flex-col gap-2">
					<div className="flex justify-between items-center w-full">
						<h1
							className={classNames(
								'font-bold text-transparent bg-clip-text bg-gradient-to-br ',
								colors.gradient
							)}
						>
							{title}
						</h1>
						<DevModeSwitch color={color} />
					</div>
					<h2 className={`${colors.text} text-2xl font-semibold`}>{caption}</h2>
				</div>

				<span className={`text-lg ${colors.text} max-w-3xl`}>{description}</span>
				<AnimatePresence>
					{developerMode ? (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{
								opacity: [0, 1]
							}}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.2 }}
							key={key}
						>
							<CardsContainer
								cards={cards}
								r={accentColor[color][0]}
								g={accentColor[color][1]}
								b={accentColor[color][2]}
							/>
						</motion.div>
					) : (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{
								opacity: [0, 1]
							}}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.2 }}
						>
							<FeatureCardTabs tabs={tabs} color={color} />
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</LandingSectionWrapper>
	);
}
