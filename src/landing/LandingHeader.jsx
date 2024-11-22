import React, { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import classNames from 'classnames';
import { useColorMode } from '@docusaurus/theme-common';
import { SiDiscord, SiGithub } from 'react-icons/si';
import { motion } from 'framer-motion';
import ThemeToggleButton from './ThemeToggleButton';
import Banner from './Banner';
import Link from '@docusaurus/Link';

const products = [
	{
		name: 'Scripts',
		description: 'Code to production in minutes.',
		href: '/scripts'
	},
	{
		name: 'Flows',
		description: 'Build complex flows without complexity.',
		href: '/flows'
	},
	{
		name: 'Apps',
		description: 'Build super fast and powerful apps using drag-and-drop.',
		href: '/apps'
	}
];

const resources = [
	{
		name: 'OpenAPI',
		description: 'Explore our API specs.',
		href: 'https://app.windmill.dev/openapi.html',
		newtab: true
	},
	{
		name: 'Changelog',
		description: 'See the latest changes to Windmill.',
		href: '/changelog'
	},
	{
		name: 'Blog',
		description: 'Stay up to date with our latest news and articles.',
		href: '/blog'
	},
	{
		name: 'Jobs',
		description: 'See our current job openings and apply for a position.',
		href: 'https://www.ycombinator.com/companies/windmill/jobs'
	}
];

const variants = {
	initialRotate: { rotate: 0, transition: { duration: 1, ease: 'backInOut' } },
	spin: {
		rotate: 120,
		transition: {
			duration: 1,
			repeat: 0,
			ease: 'easeInOut'
		}
	}
};

export default function LandingHeader() {
	const { colorMode, setColorMode } = useColorMode();

	const [hoverLogo, setHoverLogo] = React.useState(false);

	return (
		<div className="w-full fixed z-[1000]  bg-white dark:bg-gray-950 shadow-sm">
			<Popover className="relative bg-opacity-90 z-50 max-w-7xl mx-auto py-3 px-3 sm:px-4 lg:px-8">
				<div className="flex items-center justify-between md:justify-start md:space-x-10">
					<Link
						to="/"
						className="flex justify-start items-center gap-2 h-full lg:w-0 lg:flex-1 group !no-underline cursor-pointer w-min"
						onMouseEnter={() => setHoverLogo(true)}
						onMouseLeave={() => setHoverLogo(false)}
					>
						<motion.img
							className="h-8"
							src="/img/windmill.svg"
							alt="Windmill Labs"
							variants={variants}
							animate={hoverLogo ? 'spin' : 'initialRotate'}
							id="monkeyFace"
						/>
						<div className="font-semibold text-xl text-blue-500 dark:text-white subpixel-antialiased ">
							Windmill
						</div>
					</Link>
					<div className="-my-2 -mr-2 md:hidden">
						<Popover.Button className="inline-flex items-center justify-center rounded-md bg-white dark:bg-gray-800 p-2 text-gray-400 dark:text-gray-200 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
							<span className="sr-only">Open menu</span>
							<Bars3Icon className="h-6 w-6" aria-hidden="true" />
						</Popover.Button>
					</div>
					<Popover.Group as="nav" className="hidden space-x-10 md:flex">
						<Popover className="relative">
							{({ open }) => (
								<>
									<Popover.Button
										className={classNames(
											open ? 'text-gray-900' : 'text-gray-500',
											'group inline-flex items-center rounded-md  text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-100 focus:ring-offset-2 text-gray-500 !no-underline dark:text-gray-200 dark:hover:text-gray-300 '
										)}
									>
										<span>Products</span>
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
												<div className="relative grid gap-6 bg-white dark:bg-gray-800 px-5 py-6 sm:gap-8 sm:p-8">
													{products.map((product) => (
														<Link
															key={product.name}
															to={product.href}
															className="-m-3 block rounded-md p-3 hover:bg-gray-50 dark:hover:bg-gray-700 !no-underline"
															target={product.newtab ? '_blank' : undefined}
															rel={product.newtab ? 'noopener noreferrer' : undefined}
														>
															<p className="font-medium text-gray-900 dark:text-gray-100">
																{product.name}
															</p>
															<p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
																{product.description}
															</p>
														</Link>
													))}
												</div>
											</div>
										</Popover.Panel>
									</Transition>
								</>
							)}
						</Popover>
						<Link
							to="/docs/intro"
							onClick={() => window.plausible?.('read-docs')}
							className="font-medium text-gray-500 hover:text-gray-900 !no-underline dark:text-gray-200 dark:hover:text-gray-300"
						>
							Docs
						</Link>
						<Link
							to="/pricing"
							className="font-medium text-gray-500 hover:text-gray-900 !no-underline dark:text-gray-200 dark:hover:text-gray-300"
						>
							Pricing
						</Link>

						<a
							href="https://hub.windmill.dev"
							className="font-medium text-gray-500 hover:text-gray-900 !no-underline dark:text-gray-200 dark:hover:text-gray-300"
						>
							Hub
						</a>

						<Popover className="relative">
							{({ open }) => (
								<>
									<Popover.Button
										className={classNames(
											open ? 'text-gray-900 dark:text-gray-100' : 'text-gray-500',
											'group inline-flex items-center rounded-md text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-offset-1 dark:focus:ring-offset-gray-800 text-gray-500 !no-underline dark:text-gray-200 dark:hover:text-gray-300'
										)}
									>
										<span>More</span>
										<ChevronDownIcon
											className={classNames(
												open ? 'text-gray-600 dark:text-gray-300' : 'text-gray-400',
												'ml-2 h-5 w-5 group-hover:text-gray-500 dark:group-hover:text-gray-300'
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
												<div className="relative grid gap-6 bg-white dark:bg-gray-800 px-5 py-6 sm:gap-8 sm:p-8">
													{resources.map((resource) => (
														<a
															key={resource.name}
															href={resource.href}
															className="-m-3 block rounded-md p-3 hover:bg-gray-50 dark:hover:bg-gray-700 !no-underline"
															target={resource.newtab ? '_blank' : undefined}
															rel={resource.newtab ? 'noopener noreferrer' : undefined}
														>
															<p className="font-medium text-gray-900 dark:text-gray-100">
																{resource.name}
															</p>
															<p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
																{resource.description}
															</p>
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

					<div className="hidden items-center justify-end md:flex md:flex-1 gap-4 ml-8 ">
						<ThemeToggleButton colorMode={colorMode} setColorMode={setColorMode} />

						<a
							href="https://github.com/windmill-labs/windmill"
							data-analytics='"github"'
							onClick={() => window.plausible('github')}
							className="rounded-full hover:bg-indigo-200 dark:hover:bg-indigo-400 p-2"
							target="_blank"
						>
							<SiGithub className="h-5 w-5 dark:text-white text-gray-800" />
						</a>

						<a
							href="https://discord.com/invite/V7PM2YHsPB"
							data-analytics='"discord"'
							onClick={() => window.plausible('discord')}
							className=" rounded-full hover:bg-indigo-200 dark:hover:bg-indigo-400 p-2"
							title="Join our Discord community"
							target="_blank"
						>
							<SiDiscord className="h-5 w-5 dark:text-white text-gray-800" />
						</a>

						<a
							href="https://www.windmill.dev/book-demo"
							data-analytics='"schedule-demo"'
							onClick={() => window.plausible('schedule-demo')}
							className="ml-4 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-blue-100 px-4 py-2 text-base font-medium text-blue-600 shadow-sm hover:bg-blue-200 hover:text-blue-800 !no-underline transition-all"
						>
							Book a demo
						</a>

						<a
							href="https://app.windmill.dev/user/login"
							onClick={() => window.plausible('try-cloud')}
							data-analytics='"try-cloud"'
							className="inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-800 hover:text-white transition-all !no-underline"
							rel="nofollow"
						>
							Windmill cloud
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
						className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden "
					>
						<div className="divide-y-2 divide-gray-50 dark:divide-gray-800 rounded-lg bg-white dark:bg-gray-900  shadow-lg ring-1 ring-black ring-opacity-5">
							<div className="px-5 pt-5 pb-6">
								<div className="flex items-center justify-between">
									<div>
										<img className="h-8" src="img/windmill.svg" alt="Windmill Labs" />
									</div>
									<div className="-mr-2">
										<Popover.Button className="inline-flex items-center justify-center rounded-md bg-white dark:bg-gray-800 p-2 text-gray-400 dark:text-gray-200 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
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
										className="text-base font-medium text-gray-900 dark:text-white hover:text-gray-700"
									>
										Pricing
									</a>

									<a
										href="/docs/intro"
										onClick={() => window.plausible('read-docs')}
										className="text-base font-medium text-gray-900 dark:text-white hover:text-gray-700"
									>
										Docs
									</a>

									{resources.map((resource) => (
										<a
											key={resource.name}
											href={resource.href}
											className="text-base font-medium text-gray-900 dark:text-white hover:text-gray-700"
										>
											{resource.name}
										</a>
									))}
								</div>
								<div className="mt-6 flex justify-center items-center space-x-4 mb-4">
									<a
										href="https://github.com/windmill-labs/windmill"
										data-analytics='"github"'
										onClick={() => window.plausible('github')}
										className="rounded-full hover:bg-indigo-200 dark:hover:bg-indigo-400 p-2"
										target="_blank"
										rel="noopener noreferrer"
									>
										<SiGithub className="h-5 w-5 dark:text-white text-gray-800" />
									</a>

									<a
										href="https://discord.com/invite/V7PM2YHsPB"
										data-analytics='"discord"'
										onClick={() => window.plausible('discord')}
										className="rounded-full hover:bg-indigo-200 dark:hover:bg-indigo-400 p-2"
										target="_blank"
										rel="noopener noreferrer"
									>
										<SiDiscord className="h-5 w-5 dark:text-white text-gray-800" />
									</a>
								</div>

								<div className="mt-6">
									<a
										href="https://www.windmill.dev/book-demo"
										data-analytics='"schedule-demo"'
										onClick={() => window.plausible('schedule-demo')}
										className="!no-underline flex w-full dark:text-white items-center justify-center rounded-md border border-transparent text-base font-medium text-blue-600 shadow-sm hover:bg-blue-200 dark:hover:bg-blue-500 mb-4"
									>
										Book a demo
									</a>
									<a
										href="https://app.windmill.dev"
										className="!no-underline flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700"
										rel="nofollow"
									>
										Windmill cloud
									</a>
								</div>
							</div>
						</div>
					</Popover.Panel>
				</Transition>
			</Popover>
			{/* <Banner /> */}
		</div>
	);
}
