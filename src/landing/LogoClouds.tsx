import React from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import classNames from 'classnames';
import { motion } from 'framer-motion';

export default function LogoClouds() {
	const { colorMode } = useColorMode();

	const logos = [
		{
			url: 'https://www.kahoot.com/',
			dark: '/images/brands/Kahoot_Logo-dark.svg',
			light: '/images/brands/Kahoot_Logo.svg',
			name: 'Kahoot',
			anchor: 'kahoot'
		},
		{
			url: 'https://www.investing.com/',
			dark: '/images/brands/Investing-Dark.svg',
			light: '/images/brands/Investing-Light.svg',
			name: 'Investing.com',
			anchor: 'investing'
		},
		{
			url: 'https://www.cfainstitute.org/',
			dark: '/images/brands/cfa-institute-dark.svg',
			light: '/images/brands/cfa-institute-light.svg',
			name: 'CFA Institute',
			anchor: 'cfa-institute'
		},
		{
			url: 'https://www.axians.com/',
			dark: '/images/brands/axians-dark.svg',
			light: '/images/brands/axians-light.svg',
			name: 'Axians'
		},
		{
			url: 'https://www.photoroom.com',
			dark: '/images/brands/Photoroom-Dark.svg',
			light: '/images/brands/Photoroom-Light.svg',
			name: 'Photoroom',
			anchor: 'photoroom'
		},
		{
			url: 'https://www.pave.com/',
			dark: '/images/brands/pave-dark.svg',
			light: '/images/brands/pave.svg',
			name: 'Pave',
			anchor: 'pave'
		},
		{
			url: 'https://panther.com/',
			dark: '/images/brands/panther-light.png',
			light: '/images/brands/panther-dark.png',
			name: 'Panther Labs',
			anchor: 'panther-labs'
		},
		{
			url: 'https://www.treatmyocd.com/',
			dark: '/images/brands/nocd-logo-dark.svg',
			light: '/images/brands/nocd-logo.svg',
			name: 'Nocd'
		},
		{
			url: 'https://www.bloomcredit.io/',
			dark: '/images/brands/Bloomcredit-Dark.svg',
			light: '/images/brands/Bloomcredit-Light.svg',
			name: 'Bloomcredit',
			anchor: 'bloomcredit'
		},
		{
			url: 'https://www.athenaintel.com/',
			dark: '/images/brands/athena-light.png',
			light: '/images/brands/athena-dark.png',
			name: 'Athena Intelligence',
			anchor: 'athena-intelligence'
		}
	];

	return (
		<div className="pt-4 pb-12 sm:pt-6 sm:pb-16 md:pb-24">
			<div className="mx-auto max-w-7xl px-4 lg:px-8">
				<h2 className="text-center text-lg font-semibold leading-8 text-gray-900/60">
					Trusted by 4,000+ organizations, including 300+ EE customers at scale:
				</h2>
				<div className="mx-auto mt-10 grid items-center max-w-lg grid-cols-3 gap-8 sm:max-w-xl sm:grid-cols-4 lg:mx-auto lg:max-w-5xl lg:grid-cols-5">
					{logos.map((logo) => (
						<a
							key={logo.name}
							href={logo.anchor ? `#${logo.anchor}` : logo.url}
							target={logo.anchor ? '_self' : '_blank'}
							title={String(logo.name)}
							className={classNames(
								'flex items-center justify-center',
								logo.name === 'Nocd' && 'mt-[-8px]'
							)}
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