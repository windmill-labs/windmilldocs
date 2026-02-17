import React from 'react';
import { Disclosure } from '@headlessui/react';
import { motion } from 'framer-motion';
import Head from '@docusaurus/Head';

const fadeIn = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5 } };

export default function UseCaseFAQ({ faqs }) {
	const faqSchema = {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: faqs.map((faq) => ({
			'@type': 'Question',
			name: faq.question,
			acceptedAnswer: {
				'@type': 'Answer',
				text: faq.textAnswer,
			},
		})),
	};

	return (
		<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
			<Head>
				<script type="application/ld+json">
					{JSON.stringify(faqSchema)}
				</script>
			</Head>
			<motion.div {...fadeIn} className="mb-12">
				<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
					Frequently asked questions
				</h2>
			</motion.div>
			<dl className="mx-auto max-w-4xl space-y-6 divide-y divide-gray-200 dark:divide-gray-700">
				{faqs.map((faq) => (
					<Disclosure as="div" key={faq.question} className="pt-6">
						{({ open }) => (
							<>
								<dt>
									<Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900 dark:text-white">
										<span className="text-base font-semibold leading-7">{faq.question}</span>
										<span className="ml-6 flex h-7 items-center">
											<svg className={`h-5 w-5 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
												<path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
											</svg>
										</span>
									</Disclosure.Button>
								</dt>
								<Disclosure.Panel as="dd" className="mt-4 pr-12">
									<p className="text-base leading-7 text-gray-600 dark:text-gray-300">{faq.textAnswer}</p>
								</Disclosure.Panel>
							</>
						)}
					</Disclosure>
				))}
			</dl>
		</div>
	);
}
