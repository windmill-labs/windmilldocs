import React from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import classNames from 'classnames';
import { motion } from 'framer-motion';

export default function LogoClouds() {
	const { colorMode } = useColorMode();

	const logos = [
		{
			url: 'https://www.photoroom.com',
			dark: '/images/brands/Photoroom-Dark.svg',
			light: '/images/brands/Photoroom-Light.svg',
			name: 'Photoroom',
			anchor: 'photoroom'
		},
		{
			url: 'https://www.kahoot.com/',
			dark: '/images/brands/Kahoot_Logo-dark.svg',
			light: '/images/brands/Kahoot_Logo.svg',
			name: 'Kahoot',
			anchor: 'kahoot'
		},
		{
			url: 'https://www.qovery.com/',
			dark: '/images/brands/Qovery-dark.svg',
			light: '/images/brands/Qovery-light.svg',
			name: 'Qovery',
			anchor: 'qovery'
		},
		{
			url: 'https://www.bloomcredit.io/',
			dark: '/images/brands/Bloomcredit-Dark.svg',
			light: '/images/brands/Bloomcredit-Light.svg',
			name: 'Bloomcredit',
			anchor: 'bloomcredit'
		},
		{
			url: 'https://www.pave.com/',
			dark: '/images/brands/pave-dark.svg',
			light: '/images/brands/pave.svg',
			name: 'Pave',
			anchor: 'pave'
		},
		{
			url: 'https://www.treatmyocd.com/',
			dark: '/images/brands/nocd-logo-dark.svg',
			light: '/images/brands/nocd-logo.svg',
			name: 'Nocd'
		}
	];

	return (
		<div className="py-24 sm:py-32">
			<div className="mx-auto max-w-7xl px-4 lg:px-8">
				<h2 className="text-center text-lg font-semibold leading-8 text-gray-900/60">
					Trusted by 3,000+ organizations, including:
				</h2>
				<div className="mx-auto mt-10 grid items-center max-w-lg grid-cols-3 gap-8 sm:max-w-xl sm:grid-cols-4 lg:mx-auto lg:max-w-6xl lg:grid-cols-6">
					{logos.map((logo) => (
						<a
							key={logo.name}
							href={logo.anchor ? `#${logo.anchor}` : logo.url}
							target={logo.anchor ? '_self' : '_blank'}
							title={String(logo.name)}
							className="flex items-center justify-center"
						>
							<img
								className={classNames(
									'w-full h-auto max-w-[150px] max-h-[75px] object-contain',
									'grayscale transition-all hover:grayscale-0'
								)}
								src={colorMode === 'light' ? logo.light : logo.dark}
								alt={logo.name}
								loading="lazy"
							/>
						</a>
					))}
				</div>
			</div>
		</div>
	);
}