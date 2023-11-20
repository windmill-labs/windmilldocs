import React from 'react';
import { useColorMode } from '@docusaurus/theme-common';

export default function LogoClouds() {
	const { colorMode } = useColorMode();

	const logos = [
		{
			url: 'https://www.photoroom.com',
			dark: '/images/brands/logo-original-dark-transparent.png',
			light: '/images/brands/logo-original-light-transparent.png',
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
			url: 'https://www.treatmyocd.com/',
			dark: '/images/brands/nocd-logo.svg',
			light: '/images/brands/nocd-logo.svg',
			name: 'Nocd'
		},
		{
			url: 'https://www.teracapital.com.br/',
			dark: 'https://media.licdn.com/dms/image/C4D0BAQGQPNUN4VibGA/company-logo_200_200/0/1662497060560?e=2147483647&v=beta&t=oY920CYx6hdvnWpyUYBqIUPeESZ2A3rD5XHewVw-YhI',
			light:
				'https://media.licdn.com/dms/image/C4D0BAQGQPNUN4VibGA/company-logo_200_200/0/1662497060560?e=2147483647&v=beta&t=oY920CYx6hdvnWpyUYBqIUPeESZ2A3rD5XHewVw-YhI',
			name: 'Tera Capital'
		}
	];

	return (
		<div className="py-24 sm:py-32">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<h2 className="text-center text-lg font-semibold leading-8 text-gray-900">
					Trusted by 500+ organizations, including:
				</h2>
				<div className="mx-auto mt-10 grid items-center max-w-lg grid-cols-4 gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
					{logos.map((logo) => (
						<a
							key={logo.name}
							href={logo.anchor ? `#${logo.anchor}` : logo.url}
							target={logo.anchor ? '_self' : '_blank'}
						>
							<img
								className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
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
