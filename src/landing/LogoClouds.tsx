import React from 'react';
import kahootLogo from '../../static/images/KahootLogo_Full_purple.png';

export default function LogoClouds() {
	return (
		<div className="py-16">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<h2 className="text-center text-lg font-semibold leading-8 dark:text-gray-100 text-gray-900">
					Chosen by leading enterprise customers
				</h2>
				<div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
					<img
						className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
						src="https://media.licdn.com/dms/image/C4D0BAQGQPNUN4VibGA/company-logo_200_200/0/1662497060560?e=2147483647&v=beta&t=oY920CYx6hdvnWpyUYBqIUPeESZ2A3rD5XHewVw-YhI"
						alt="Tera Capital"
						width={200}
						height={70}
					/>
					<img
						className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
						src={kahootLogo}						
						alt="Kahoot"
						width={158}
						height={48}
					/>
					<img
						className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
						src="https://ww1.freelogovectors.net/wp-content/uploads/2023/01/photoroom_logo-freelogovectors.net_.png"
						alt="Photoroom"
						width={200}
						height={60}
					/>
					<img
						className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1"
						src="https://uploads-ssl.webflow.com/613002375bb42b74d41d771a/61313810c5bb291a726596a7_bloomcredit.png"
						alt="Bloomcredit"
						width={158}
						height={48}
					/>
					<img
						className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
						src="https://tailwindui.com/img/logos/158x48/statamic-logo-white.svg"
						alt="Statamic"
						width={158}
						height={48}
					/>
				</div>
			</div>
		</div>
	);
}
