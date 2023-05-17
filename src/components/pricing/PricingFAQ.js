import React from 'react';
import { Disclosure } from '@headlessui/react';
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline';

const faqs = [
	{
		question: 'Operator vs Author',
		answer:
			'An author can write scripts/flows/apps/variables/resources. An operator can only run/view them.'
	},
	{
		question: 'What is a worker?',
		answer:
			'A worker is a container that executes your scripts. It can be a docker container, a kubernetes pod or a fargate task. It can be hosted on your infrastructure or on ours.'
	},
	{
		question: 'What is a seat?',
		answer:
			'A seat is a user that can login to the platform. A seat can be an author or an operator.'
	},
	{
		question: 'What is a execution?',
		answer:
			'The single credit-unit is called a "execution". An execution corresponds to a single job whose duration is less than 1s. For any additional seconds of computation, an additional computation is accounted for. Jobs are executed on one powerful virtual CPU with 2Gb of memory. Most jobs will take less than 200ms to execute.'
	}
];

function FAQ() {
	return (
		<div className="bg-white">
			<div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
				<div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
					<h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">
						Frequently asked questions
					</h2>
					<dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
						{faqs.map((faq) => (
							<Disclosure as="div" key={faq.question} className="pt-6">
								{({ open }) => (
									<>
										<dt>
											<Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
												<span className="text-base font-semibold leading-7">{faq.question}</span>
												<span className="ml-6 flex h-7 items-center">
													{open ? (
														<MinusSmallIcon className="h-6 w-6" aria-hidden="true" />
													) : (
														<PlusSmallIcon className="h-6 w-6" aria-hidden="true" />
													)}
												</span>
											</Disclosure.Button>
										</dt>
										<Disclosure.Panel as="dd" className="mt-2 pr-12">
											<p className="text-base leading-7 text-gray-600">{faq.answer}</p>
										</Disclosure.Panel>
									</>
								)}
							</Disclosure>
						))}
					</dl>
				</div>
			</div>
		</div>
	);
}

export default FAQ;
