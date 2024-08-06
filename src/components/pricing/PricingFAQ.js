import React, { useEffect } from 'react';
import { Disclosure } from '@headlessui/react';
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline';
import { Link, useLocation } from 'react-router-dom';

const faqs = [
	{
		id: 'pro-plan',
		question: 'Which organizations can subscribe to the Pro plan?',
		answer: (
			<span>
				The Pro plan is only available in Self-hosted for: <br />- Businesses with less than 10
				employees and $250k revenues
				<br />- Startups at seed stage <br />- Non-profits & Universities (higher limits of workers
				& users) <br />
				Reach out to contact@windmill.dev to inquiry about exceptions.
			</span>
		)
	},
	{
		id: 'operator',
		question: 'What is an operator?',
		answer: (
			<span>
				An{' '}
				<Link
					to="/docs/core_concepts/roles_and_permissions#roles-in-windmill"
					className="text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-600"
				>
					operator
				</Link>{' '}
				is a user who can only execute scripts, flows and apps, but not create and edit them. This
				is enforced by both a simplified frontend and a restricted API.
				<br />
				<br />
				Operators are 1/2 price of normal users (or 1/2 seats).
			</span>
		)
	},
	{
		id: 'execution',
		question: 'What is an execution?',
		answer: (
			<span>
				The single credit-unit is called a "execution". An execution corresponds to a single{' '}
				<Link
					to="/docs/core_concepts/jobs"
					className="text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-600"
				>
					job
				</Link>{' '}
				whose duration is less than 1s. For any additional seconds of computation, an additional
				computation is accounted for.
				<br />
				<br />
				The number of executions of a flow corresponds to the sum of the executions of each step as
				seconds, considered as one script execution of that same time (time in sleep or doing state
				transition are not accounted). For apps, a backend script execution is considered as a
				script execution. As apps frontend scripts execute on browsers, they are not taken into
				account.
				<br />
				<br />
				Jobs are executed on one powerful virtual CPU with 2Gb of memory. Most jobs will take less
				than 200ms to execute.
			</span>
		)
	},
	{
		id: 'number-of-vcpus',
		question: 'How many vCPUs do I need?',
		answer: (
			<span>
				The number of vCPUs will depend on the workload and the jobs Windmill will need to run. Each {' '}
				<a
					href="/docs/core_concepts/worker_groups"
					className="text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-600"
					target="_blank"
				>
					worker
				</a>{' '} only executes one job at a time, by design to use the full resource of the worker, and you can assign it an arbitrary vCPU limit - typically 1 vCPU but it can vary between 0.2 to 4 vCPUs. Each worker is extremely efficient to execute a job, and you can execute up to 26 million jobs per month per worker if each one lasts 100ms. However, it completely depends on the nature of the jobs, their number and duration.
				<br /><br/>
				As a note, keep in mind that the number of vCPUs considered is the number of production vCPUs of your workers, not of development staging, if you have separate instances. The vCPU numbers are the aggregate limit of all of your pods set in docker-compose or in Kubernetes. There is also a global quota for memory limit. This quota is set to 2Gb * vCPU paid. Which mean if you have paid for 4vCPU, their aggregate memory limit must be below 8Gb. You can not set any limits for vCPUs and rely solely on memory quotas if you prefer.
				<br/><br/>
				Also, for the Enterprise Edition, the free trial of one month is meant to help you evaluate your needs in practice.
			</span>
		)
	},
	{
		id: 'vcpu-reporting',
		question: 'How is the use of the number of seats & vCPUs estimated and reported to Windmill?',
		answer: (
			<span>
				Even though Windmill's{' '}
				<a
					href="/docs/misc/architecture"
					className="text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-600"
					target="_blank"
				>
					architecture
				</a>{' '}
				relies on{' '}
				<a
					href="/docs/core_concepts/worker_groups"
					className="text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-600"
					target="_blank"
				>
					workers
				</a>
				, pricing is vCPU-based. For example, 4 workers with 0.25 vCPU each is 1 vCPU. 1 worker with
				4 vCPU would count as 4 vCPU. But if it only runs for 1h every day, you would divide that by 24.
				Each vCPU can run up to ~26M jobs per month.
				<br />
				<br />
				Windmill employs{' '}
				<a
					href="/docs/misc/plans_details#usage-checks"
					className="text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-600"
					target="_blank"
				>
					lightweight telemetry
				</a>{' '}
				to automatically track and report the usage of vCPUs for your subscription.
				<br />
				<br />
				Seats reported to Windmill are the number of users (1 developer, or 2 operators) who are active on the platform in the last 30 days, according to the audit logs.
				<br />
				<br />
				The number of vCPUs considered is the number of production vCPUs, not of development staging, if you have separate instances.
				So you can simply set limits in the{' '}
				<a
					href="https://github.com/windmill-labs/windmill/blob/main/docker-compose.yml"
					className="text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-600"
					target="_blank"
					rel="noopener noreferrer"
				>
					docker-compose
				</a>{' '}
				and you will never be overcharged.
				<br />
				<br />
				Our compute pricing should be linear to the compute cost from your cloud provider.
			</span>
		)
	},
	{
		id: 'portal',
		question: "How can I update my subscription?",
		answer: (
			<span>
				As an Enterprise user, you will have access to detailed usage information and invoices through the{' '}
				<Link
					to="/docs/misc/plans_details#windmill-customer-portal"
					className="text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-600"
				>
					Windmill Customer Portal
				</Link>{'. '}
				You can also enable/disable any time automatic renewal and automatic debit (therefore payment by invoice).
			</span>
		)
	},
	{
		id: 'sla',
		question: "What is Windmill's technical support SLA?",
		answer: (
			<span>
				We provide{' '}
				<Link
					to="/docs/misc/support_and_sla"
					className="text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-600"
				>
					support
				</Link>{' '}
				with different response times based on issue priorities. Our support team is available 24/7,
				and the SLA is consistent for both Cloud and Self-hosted deployments.
			</span>
		)
	},
	{
		id: 'security',
		question: "What is Windmill's security level on APIs?",
		answer: (
			<span>
				Windmill is SOC 2 Type II compliant, and we prioritize addressing vulnerabilities promptly.
			</span>
		)
	},
	{
		id: 'partnership',
		question: 'Can I get services and workshops from Windmill or partners?',
		answer: (
			<span>
				Windmill is a company that develops a product. Our mission is to build the best possible product so that our users can create the most value out of it.

				We provide {' '}
				<Link
					to="/docs/misc/support_and_sla"
					className="text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-600"
				>
					priority support
				</Link>{' '}
				to our Enterprise customers. This support includes the implementation of feature requests, prioritized bug resolutions, and recommendations on use cases.
				<br /><br />
				However, we do not carry out the implementation of these use cases ourselves (e.g. building a specific app). While we are able to offer some workshops at the beginning of your Windmill journey, it is not possible to do so repeatedly and systematically.
				<br /><br />
				For these reasons, we recommend that all Windmill users that require end-to-end use case development and exhaustive training engage with
				{' '}
				<Link
					to="/docs/misc/partners"
					className="text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-600"
				>
					Windmill certified partners
				</Link>{'. '}
				These partners are trained and certified by Windmill to provide the best possible service to our users.
			</span>
		)
	},
	{
		id: 'shutdown',
		question: 'Could the application keep running if Windmill as a company is shut down?',
		answer: (
			<span>
				Yes, Windmill will continue to operate as long as the{' '}
				<Link
					to="/docs/misc/plans_details#self-host"
					className="text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-600"
				>
					license key
				</Link>{' '}
				remains valid, even in the absence of an internet connection. If Windmill shuts down,
				license keys will be extended indefinitely.
			</span>
		)
	}
];

export default function FAQ() {
	const location = useLocation();

	useEffect(() => {
		if (location.hash) {
			const accordions = document.querySelectorAll('button[aria-expanded="true"]');
			accordions.forEach((accordion) => {
				accordion.click();
			});

			const element = document.getElementById(location.hash.slice(1));
			if (element) {
				const yOffset = -200;
				const y =
					element.getBoundingClientRect().top + document.documentElement.scrollTop + yOffset;

				window.scrollTo({ top: y, behavior: 'smooth' });

				element.querySelector('button')?.click();
			}
		}
	}, [location]);

	return (
		<div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
			<div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
				<h2 className="text-2xl font-bold leading-10 tracking-tight ">
					Frequently asked questions
				</h2>
				<dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
					{faqs.map((faq) => (
						<Disclosure as="div" key={faq.question} className="pt-6" id={faq.id}>
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
										<p className="text-base leading-7 text-gray-600 dark:text-gray-200">
											{faq.answer}
										</p>
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
