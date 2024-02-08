import React from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import classNames from 'classnames';

export default function LogoClouds() {
	const { colorMode } = useColorMode();

	const logos = [
		{
			url: 'https://www.photoroom.com',
			dark: '/images/brands/logo-mono-white-transparent.png',
			light: '/images/brands/logo-mono-black-transparent.png',
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
			dark: '/images/brands/Qovery-dark.png',
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
			url: '/blog/teracapital-case-study',
			dark: '/images/brands/teracapital-dark.svg',
			light: '/images/brands/teracapital-light.svg',
			name: 'Tera Capital',
			gap: true
		},
		{
			url: 'https://www.treatmyocd.com/',
			dark: '/images/brands/nocd-logo-dark.svg',
			light: '/images/brands/nocd-logo.svg',
			name: 'Nocd',
			gap: true
		}
	];

	return (
		<div className="py-24 sm:py-32">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<h2 className="text-center text-lg font-semibold leading-8 text-gray-900">
					Trusted by 1000+ organizations, including:
				</h2>
				<div className="mx-auto mt-10 grid items-center max-w-lg grid-cols-3 gap-x-4 gap-y-10 sm:max-w-xl sm:grid-cols-4 sm:gap-x-4 lg:mx-0 lg:max-w-none lg:grid-cols-6">
					{logos.map((logo) => (
						<a
							key={logo.name}
							href={logo.anchor ? `#${logo.anchor}` : logo.url}
							target={logo.anchor ? '_self' : '_blank'}
						>
							<img
								className={classNames(
									'col-span-3 max-h-12 w-full object-contain lg:col-span-1 ',
									logo.gap ? 'py-2' : ''
								)}
								src={colorMode === 'light' ? logo.light : logo.dark}
								alt={logo.name}
								width={158}
								height={48}
							/>
						</a>
					))}
				</div>
			</div>
		</div>
	);
}
