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
			url: 'https://www.investing.com/',
			dark: '/images/brands/Investing-Dark.svg',
			light: '/images/brands/Investing-Light.svg',
			name: 'Investing.com',
			anchor: 'investing'
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
		<div className="py-8 sm:py-8">
			<div className="mx-auto max-w-7xl px-4 lg:px-8">
				<h2 className="text-center text-lg font-semibold leading-8 text-gray-900/60 dark:text-gray-400">
					Trusted by 3,000+ organizations, including:
				</h2>
				<div className="mx-auto mt-10 grid items-center max-w-lg grid-cols-3 gap-4 sm:max-w-xl sm:grid-cols-4 lg:mx-auto lg:max-w-6xl lg:grid-cols-6">
					{logos.map((logo) => (
						<a
							key={logo.name}
							href={logo.anchor ? `#${logo.anchor}` : logo.url}
							target={logo.anchor ? '_self' : '_blank'}
							title={String(logo.name)}
							className={classNames(
								'flex items-center justify-center',
								'bg-gray-50 dark:bg-gray-900',
								'rounded-lg',
								'h-24 w-full',
								'transition-all duration-200',
								'hover:bg-gray-100 dark:hover:bg-gray-800',
								'border border-transparent',
								'hover:border-gray-300 dark:hover:border-gray-700'
							)}
						>
							<img
								className={classNames(
									'max-w-[120px] max-h-[50px] w-auto h-auto object-contain',
									colorMode === 'dark' && 'filter brightness-0 invert opacity-90',
									'hover:opacity-100',
									'transition-opacity duration-200'
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