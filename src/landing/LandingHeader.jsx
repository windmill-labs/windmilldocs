import React, { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import {
	ArrowPathIcon,
	Bars3Icon,
	ChartBarIcon,
	CursorArrowRaysIcon,
	DocumentChartBarIcon,
	ShieldCheckIcon,
	Squares2X2Icon,
	XMarkIcon
} from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

const resources = [
	{
		name: 'Team',
		description: 'Find out who we are and why we do what we do.',
		href: '/about'
	},

	{ name: 'Blog', description: 'Stay up to date with our latest news and articles.', href: '/blog' }
];

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export default function Example() {
	return (
		<Popover className="relative bg-white z-50 max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
			<div className="flex items-center justify-between md:justify-start md:space-x-10">
				<div className="flex justify-start lg:w-0 lg:flex-1">
					<a href="/">
						<span className="sr-only">Your Company</span>
						<img className="h-11" src="img/windmill.svg" alt="Windmill Labs" />
					</a>
				</div>
				<div className="-my-2 -mr-2 md:hidden">
					<Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
						<span className="sr-only">Open menu</span>
						<Bars3Icon className="h-6 w-6" aria-hidden="true" />
					</Popover.Button>
				</div>
				<Popover.Group as="nav" className="hidden space-x-10 md:flex">
					<a href="/pricing" className="text-base font-medium text-gray-500 hover:text-gray-900">
						Pricing
					</a>
					<a
						href="https://docs.windmill.dev/docs/intro"
						onClick={() => window.plausible('read-docs')}
						className="text-base font-medium text-gray-500 hover:text-gray-900"
					>
						Documentation
					</a>
					<a href="/pricing" className="text-base font-medium text-gray-500 hover:text-gray-900">
						Hub
					</a>
					<a href="/pricing" className="text-base font-medium text-gray-500 hover:text-gray-900">
						OpenAPI
					</a>

					<Popover className="relative">
						{({ open }) => (
							<>
								<Popover.Button
									className={classNames(
										open ? 'text-gray-900' : 'text-gray-500',
										'group inline-flex items-center rounded-md bg-white text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
									)}
								>
									<span>More</span>
									<ChevronDownIcon
										className={classNames(
											open ? 'text-gray-600' : 'text-gray-400',
											'ml-2 h-5 w-5 group-hover:text-gray-500'
										)}
										aria-hidden="true"
									/>
								</Popover.Button>

								<Transition
									as={Fragment}
									enter="transition ease-out duration-200"
									enterFrom="opacity-0 translate-y-1"
									enterTo="opacity-100 translate-y-0"
									leave="transition ease-in duration-150"
									leaveFrom="opacity-100 translate-y-0"
									leaveTo="opacity-0 translate-y-1"
								>
									<Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-xs -translate-x-1/2 transform px-2 sm:px-0">
										<div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
											<div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
												{resources.map((resource) => (
													<a
														key={resource.name}
														href={resource.href}
														className="-m-3 block rounded-md p-3 hover:bg-gray-100 !no-underline"
													>
														<p className="text-base font-medium text-gray-900">{resource.name}</p>
														<p className="mt-1 text-sm text-gray-500">{resource.description}</p>
													</a>
												))}
											</div>
										</div>
									</Popover.Panel>
								</Transition>
							</>
						)}
					</Popover>
				</Popover.Group>

				<div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0 gap-4">
					<a
						href="https://cal.com/ruben-windmill/windmill-demo"
						data-analytics='"schedule-demo"'
						onClick={() => window.plausible('schedule-demo')}
						className="inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-blue-100 px-4 py-2 text-base font-medium text-blue-600 shadow-sm hover:bg-blue-200 hover:text-blue-800 !no-underline transition-all"
					>
						Book a demo
					</a>
					<a
						href="https://app.windmill.dev/user/login"
						onClick={() => window.plausible('try-cloud')}
						data-analytics='"try-cloud"'
						className="inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-800 hover:text-white transition-all !no-underline"
					>
						Windmill Cloud
					</a>
				</div>
			</div>

			<Transition
				as={Fragment}
				enter="duration-200 ease-out"
				enterFrom="opacity-0 scale-95"
				enterTo="opacity-100 scale-100"
				leave="duration-100 ease-in"
				leaveFrom="opacity-100 scale-100"
				leaveTo="opacity-0 scale-95"
			>
				<Popover.Panel
					focus
					className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden"
				>
					<div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
						<div className="px-5 pt-5 pb-6">
							<div className="flex items-center justify-between">
								<div>
									<img className="h-8" src="img/windmill.svg" alt="Windmill Labs" />
								</div>
								<div className="-mr-2">
									<Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
										<span className="sr-only">Close menu</span>
										<XMarkIcon className="h-6 w-6" aria-hidden="true" />
									</Popover.Button>
								</div>
							</div>
						</div>
						<div className="py-6 px-5">
							<div className="grid grid-cols-2 gap-4">
								<a
									href="/pricing"
									className="text-base font-medium text-gray-900 hover:text-gray-700"
								>
									Pricing
								</a>

								<a
									href="https://docs.windmill.dev/docs/intro"
									onClick={() => window.plausible('read-docs')}
									className="text-base font-medium text-gray-900 hover:text-gray-700"
								>
									Documentation
								</a>

								{resources.map((resource) => (
									<a
										key={resource.name}
										href={resource.href}
										className="text-base font-medium text-gray-900 hover:text-gray-700"
									>
										{resource.name}
									</a>
								))}
							</div>
							<div className="mt-6">
								<a
									href="#"
									className="flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700"
								>
									Start for free
								</a>
								<p className="mt-6 text-center text-base font-medium text-gray-500">
									Existing customer?{' '}
									<a href="#" className="text-blue-600 hover:text-blue-500">
										Sign in
									</a>
								</p>
							</div>
						</div>
					</div>
				</Popover.Panel>
			</Transition>
		</Popover>
	);
}
