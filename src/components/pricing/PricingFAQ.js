import React from 'react';
import { Disclosure } from '@headlessui/react';
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const faqs = [
    {
        question: 'What is a worker?',
        answer: (
            <span>
                <Link to="/docs/core_concepts/worker_groups" className="text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-600">Workers</Link> are autonomous processes that run one script at a time using the full machines resources available to them. Workers serve as the backbone of Windmill as they are responsible for executing code. <br/> Each worker on Windmill can run up to 26 millions jobs a month, where each job lasts approximatively 100ms. Workers can be horizontally scaled up or down depending on needs without any overhead.
            </span>
        )
    },
	{
        question: 'What is an operator?',
        answer: (
            <span>
                An <Link to="/docs/core_concepts/roles_and_permissions#roles-in-windmill" className="text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-600">operator</Link> is a user that can only execute script, flows and apps, but not create and edit them.
            </span>
        )
    },
    {
        question: 'What is an execution?',
        answer: (
            <span>
                The single credit-unit is called a "execution". An execution corresponds to a single <Link to="/docs/core_concepts/jobs" className="text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-600">job</Link> whose duration is less than 1s. For any additional seconds of computation, an additional computation is accounted for. The number of executions of a flow corresponds to the sum of the executions of each step as seconds, considered as one script execution of that same time (time in sleep or doing state transition are not accounted). For apps, a backend script execution is considered as a script execution. As apps frontend scripts execute on browsers, they are not taken into account. Jobs are executed on one powerful virtual CPU with 2Gb of memory. Most jobs will take less than 200ms to execute.
            </span>
        )
    },
	{
        question: 'What is Windmill\'s Technical Support SLA?',
        answer: (
            <span>
                We provide <Link to="/docs/misc/support_and_sla" className="text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-600">support</Link> with different response times based on issue priorities. Our support team is available 24/7, and the SLA is consistent for both Cloud and Self-hosted deployments.
            </span>
        )
    },
	{
        question: 'Could the application keep running if Windmill as a company is shut down?',
        answer: (
            <span>
                Yes, Windmill will continue to operate as long as the <Link to="/docs/misc/plans_details#self-host" className="text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-600">license key</Link> remains valid, even in the absence of an internet connection. If Windmill shuts down, license keys will be extended indefinitely.
            </span>
        )
    }
];

export default function FAQ() {
    return (
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
            <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
                <h2 className="text-2xl font-bold leading-10 tracking-tight ">
                    Frequently asked questions
                </h2>
                <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
                    {faqs.map((faq) => (
                        <Disclosure as="div" key={faq.question} className="pt-6">
                            {({ open }) => (
                                <>
                                    <dt>
                                        <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900 dark:text-white">
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
                                        <p className="text-base leading-7 text-gray-600 dark:text-gray-200">{faq.answer}</p>
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
