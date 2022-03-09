import React from 'react';
import clsx from 'clsx';
import styles from './FAQ.module.css';

import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/outline'

const faqs = [
	{
		question: "I'm not a developer. What does Windmill bring to my business?",
		answer:
			(<p>Businesses need to automate internal workflows (for example, renewing a user license key
				and sending an email) to be efficient and scalable. In many companies, developers write
					quick and dirty scripts to automate repetitive tasks, but these scripts never make it to
					production and never get widespread adoption. <br /> <br />
					Developers face a choice : keep the script for themselves - creating bottlenecks for the
					business - or spend a lot of time to make it usable by other employees - a big waste of
					developer productivity. What if you could immediately turn these quick and dirty scripts
					into internal apps with user interfaces, workflows and permissioning? <br />
					<br />
					What if automation could flow from developers to the entire company? Windmill is a
					developer-first platform that quickly turns scripts into user-friendly internal apps,
				enabling companies to automate and scale internal workflows.</p>)
	},
	{ question: "Is Windmill a no-code platform?",
		answer: (<p>					No. We believe that writing code is the most efficient way to build internal apps, for
			several reasons:
			<ul className="list-disc mx-12">
				<li>
					It is maintainable, versioned, and standard (any developer can read and fix a script).
					That's not the case with UI builders, that tend do create tech debt.
				</li>
				<li>
					It is not bottlenecked by the limitations of a platform (missing connectors, etc).
				</li>
				<li>
					Developers can rely on a gigantic amount of open source libraries to write code.
				</li>
			</ul>
			However, there are part of building internal apps that are painful and not worth a
			developer's time: building UI, workflows, permissions. Windmill removes those time sinks.</p>)}
]

function classNames(...classes)
{
	return classes.filter(Boolean).join(' ')
}

export default function FAQ()
{
	return (
		<div className="bg-white">
			<div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
				<div className="max-w-3xl mx-auto divide-y-2 divide-gray-200">
					<h2 className="text-center text-3xl font-bold text-gray-900 sm:text-4xl">Frequently asked questions</h2>
					<dl className="mt-6 space-y-6 divide-y divide-gray-200">
						{faqs.map((faq) => (
							<Disclosure as="div" key={faq.question} className="pt-6">
								{({ open }) => (
									<>
										<dt className="text-lg">
											<Disclosure.Button className="text-left w-full flex justify-between items-start text-gray-400">
												<span className="font-medium text-gray-900">{faq.question}</span>
												<span className="ml-6 h-7 flex items-center">
													<ChevronDownIcon
														className={classNames(open ? '-rotate-180' : 'rotate-0', 'h-6 w-6 transform')}
														aria-hidden="true"
													/>
												</span>
											</Disclosure.Button>
										</dt>
										<Disclosure.Panel as="dd" className="mt-6 pr-12">
											<p className="font-light text-lg">{faq.answer}</p>
										</Disclosure.Panel>
									</>
								)}
							</Disclosure>
						))}
					</dl>
				</div>
			</div>
		</div>
	)
}

