import React from 'react';

import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

const faqs = [
	{
		question: 'Is Windmill only for developers?',
		answer: `No. Windmill is developer friendly but it can even be used in orgs with few developers by creating flows in an intuitive UI that chain generic scripts together.
		But Windmill's sweet spot is hybrid organization with a strong tech team than can write organization specific scripts so that the rest of the organization leverage them as part of their flows.`
	},
	{
		question: 'Is Windmill a no-code or low-code platform?',
		answer: `Windmill is a developer platform around that makes it easy to write and tweak code but that be used without needing to write any code yourself.
			Indeed, flows can be solely created by reusing generic scripts written by the community.
			However, Windmill is most powerful when those generic scripts are chained together with org specific scripts. 
			So Windmill is both code-centric and low-code depending on the use you make out of it.`
	},
	{
		question: 'What are the benefits of code versus no-code platforms',
		answer: (
			<div>
				Code when used the right way and in the right quantity has several benefits versus other
				ways to develop business apps:
				<ul className="list-disc mx-12">
					<li>
						It is maintainable, versioned, and standard (any developer can read and fix a script).
						That's not the case with UI builders, that tend do create tech debt.
					</li>
					<li>
						It is not bottlenecked by the limitations of a platform (missing connectors, etc).
					</li>
					<li>Vast amount of open source libraries.</li>
				</ul>
				Windmill makes it easy to rely on the right amount of code, no more, no less. Indeed, there
				are part of building business apps that are painful and not worth a developer's time:
				building UI, workflows, permissions. Windmill removes those time sinks.
			</div>
		)
	}
];

export default function FAQ() {
	return (
		<div className="max-w-7xl mx-auto px-4 sm:py-16 sm:px-4 lg:px-8">
			<div className="max-w-3xl mx-auto divide-y-2 divide-gray-200">
				<h2 className="text-center text-3xl font-bold text-gray-900 sm:text-4xl">
					Frequently asked questions
				</h2>
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
													className={classNames(
														open ? '-rotate-180' : 'rotate-0',
														'h-6 w-6 transform'
													)}
													aria-hidden="true"
												/>
											</span>
										</Disclosure.Button>
									</dt>
									<Disclosure.Panel as="dd" className="mt-6 pr-12">
										<div className="font-light text-lg">{faq.answer}</div>
									</Disclosure.Panel>
								</>
							)}
						</Disclosure>
					))}
				</dl>
			</div>
		</div>
	);
}
