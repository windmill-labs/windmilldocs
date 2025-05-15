import React, { useEffect } from 'react';
import { Disclosure } from '@headlessui/react';
import { Plus, Minus, Link as LinkIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const faqs = [
	{
		id: 'pricing-explained',
		question: "What is the logic behind Windmill's pricing?",
		answer: (
			<span>
				Windmill's pricing is designed to align with the value we deliver to our customers. Our pricing model reflects the core value of Windmill, which is primarily related to the amount of compute resources used, and the number of users accessing the platform. We've structured our pricing to scale with your usage, ensuring you're paying for the actual value you derive from our platform.
				<br /><br />
				For compute resources, we use <Link
					to="#compute-units"
					className="text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-600"
				>
					compute units
				</Link>{' '}based on memory allocation. A compute unit corresponds to 2 worker-gb-month. For example, a worker with 2GB of memory limit counts as 1 compute unit. On self-hosted plans, any worker with memory above 2GB counts as 2 compute units (e.g. a worker with 16GB counts as 2 compute units). On cloud EE, it scales linearly with the memory limit. We aggregate the memory of each worker against your global compute unit quota. You can freely allocate these compute units across workers of different sizes based on your needs. In the total sum of compute units, there are no half compute units, therefore the total number is rounded up to the next integer.
				<br /><br />
				For user access, we charge based on seats. A regular user counts as one seat, while an <Link
					to="#operator"
					className="text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-600"
				>
					operator
				</Link>{' '}(who can only execute scripts, flows, and apps) counts as half a seat. This allows for flexible team structures and cost-effective scaling of your user base. We only count active users, i.e. users who have logged in to the platform in the last 30 days according to the audit logs.
				<br /><br />
				Our billing is meant to be fair and transparent: we only count the actual memory allocated to your workers in your production instance, with minute granularity if you use auto-scaling. This approach ensures that you're only charged for the resources actively contributing to your production environment. If you scale your workers up and down, the compute units will be accounted with minute granularity. For instance, you can run 10 workers with 2GB each for half a month at the same price as 5 workers with 2GB each for the full month.
				<br /><br />
				This combined approach of charging for compute units and user seats allows us to provide pricing that scales linearly with your usage and team size, closely aligning with the value you receive from Windmill.
			</span>
		)
	},
	{
		id: 'pro-plan',
		question: 'Which organizations can subscribe to the Pro plan and non-profit EE?',
		answer: (
			<span>
				The Pro plan is only available in Self-hosted for:
				<br />- Individuals
				<br />- Businesses with less than 10 employees and $250k revenues
				<br />- Startups at seed stage <br />
				Non-profits & Universities benefit from the regular Enterprise plan at a 60% discount.<br />
				If Windmill is used as teaching material, it can be provided for free upon request to sales@windmill.dev<br/>
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
					to="/docs/core_concepts/roles_and_permissions#operator"
					className="text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-600"
				>
					operator
				</Link>{' '}
				is a user who can only execute scripts, flows and apps, but not create and edit them. This
				is enforced by both a simplified frontend and a restricted API.
				<br />
				<br />
				Operators are 1/2 price of developers (or 1/2 seats) as long as they are operators in all workspaces they are members of. Operators are not set as the instance-level.
				<br />
				<br />
				On the billing side, 1 developer seat or 2 operators seats count as 1 seat, there is no need to differentiate between developers and operators when purchasing the license.
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
		id: 'native-workers',
		question: 'What are native workers?',
		answer: (
			<span>
				Native workers are workers within the{' '}
				<Link
					to="/docs/core_concepts/worker_groups#native-workers"
					className="text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-600"
				>
					native worker group
				</Link>
				. This group is pre-configured to listen to native jobs tags (query languages). Those jobs are executed under a special mode with subworkers for increased throughput. You can set the number of native workers to 0.
			</span>
		)
	},
	{
		id: 'compute-units',
		question: 'What are compute units?',
		answer: (
			<span>
				Compute units are a unit of measure for the amount of compute resources provisioned (not effectively used) for the workers, based on their memory limits. A compute unit corresponds to 2 worker-gb-month. For example, a <Link
					to="/docs/core_concepts/worker_groups"
					className="text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-600"
				>
					worker
				</Link>{' '}with 2GB of memory limit counts as 1 compute unit. On self-hosted plans, any worker with >2GB of memory counts as 2 compute units (e.g. a worker with 16GB counts as 2 compute units). The minimum CU billed for a worker is 0.5. For detailed information on how your setup translates to compute units, see the{' '}
				<Link
					to="/docs/misc/plans_details#setup-and-compute-units"
					className="text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-600"
				>
					setup and compute units guide
				</Link>.
			</span>
		)
	},
	{
		id: 'number-of-compute-units',
		question: 'How many compute units do I need?',
		answer: (
			<span>
				The number of <Link
					to="#compute-units"
					className="text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-600"
				>
					compute units
				</Link>{' '}will depend on the workload and the jobs Windmill will need to run. Each{' '}
				<a
					href="/docs/core_concepts/worker_groups"
					className="text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-600"
					target="_blank"
				>
					worker
				</a>{' '}
				only executes one job at a time, by design to use the full resource of the worker. Workers come in different sizes based on memory: small (1GB), standard (2GB), and large (> 2GB). Each worker is extremely efficient to execute a job, and you can execute up to 26 million jobs per month per worker if each one lasts 100ms. However, it completely depends on the nature of the jobs, their number and duration.
				<br />
				<br />
				As a note, keep in mind that the number of compute units considered is the number of production compute units of your workers, not of development staging, if you have separate instances. The compute units are calculated based on the memory limits set in docker-compose or Kubernetes. For example, a standard worker with 2GB memory counts as 1 compute unit, while a large worker with >2GB memory counts as 2 compute units. On self-hosted plans, any worker with memory above 2GB still counts as 2 compute units (on cloud EE, it scales linearly with the memory limit). Small workers are counted as 0.5 compute unit.
				<br />
				<br />
				You can optimize your compute unit usage with{' '}
				<Link
					to="/docs/core_concepts/autoscaling"
					className="text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-600"
				>
					autoscaling
				</Link>
				. This automatically adjusts the number of workers based on your workload, ensuring you only pay for the compute units you actually need. For example, you could scale down to minimal workers during low-usage periods and automatically scale up during peak times, with compute usage calculated at minute-level granularity.
				<br />
				<br />
				Also, for the Enterprise Edition, the{' '}
				<a
					href="https://billing.windmill.dev/b/4gw4hu51YbfZ0N200j"
					className="text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-600"
					target="_blank"
				>
					free trial
				</a>{' '}
				of one month is meant to help you evaluate your needs in practice.
				<br />
				<br />
				Compute units are based on the provisioned workers, not the ones actually used by scripts. This means your pricing is determined by the size of your infrastructure, not by the memory consumption of individual scripts. Therefore, your costs remain predictable regardless of script demands.
			</span>
		)
	},
	{
		id: 'worker-reporting',
		question: 'How is the use of the number of seats & compute units estimated and reported to Windmill?',
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
				, pricing is based on compute units. A compute unit corresponds to 2 worker-gb-month. For example, a worker with 2GB of memory limit (standard worker) counts as 1 compute unit. A worker with 4GB of memory (large worker) counts as 2 compute units. On self-hosted plans, any worker with memory above 2GB counts as 2 compute units (16GB worker counts as 2 compute units). On cloud EE, it scales linearly with the memory limit. The number of compute units is calculated based on the memory limits set for your workers in production instances. You can set memory limits in docker-compose or Kubernetes manifests to control your compute unit usage. For detailed information on how your setup translates to compute units, see the{' '}
				<Link
					to="/docs/misc/plans_details#setup-and-compute-units"
					className="text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-600"
				>
					setup and compute units guide
				</Link>. Each worker can run up to ~26M jobs per month (at 100ms per job).
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
				to automatically track and report the usage of compute units for your subscription.
				<br />
				<br />
				Seats reported to Windmill are the number of users (1 developer, or 2 operators) who are
				active (from logging in to running or deploying a script) on the platform in the last 30
				days, according to the audit logs. User count is across all instances (dev, prod) but
				Windmill only counts once the same user.
				<br />
				<br />
				The number of compute units considered is the number of production compute units, not of development
				staging, if you have separate instances. So you can simply set limits in the{' '}
				<a
					href="https://github.com/windmill-labs/windmill/blob/main/docker-compose.yml#L50"
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
		id: 'staging-licensing',
		question: 'Do I need a separate license for staging/development environments?',
		answer: (
			<span>
				No, you can use the same license key - and therefore subscription - for both staging and production systems. For Compute Units, our <Link to="/docs/misc/plans_details#usage-checks" className="text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-600">telemetry</Link> only reports production instances, so no additional license is needed. Seats are across all instances (dev, prod), but Windmill only counts once the same user.
				<br /><br />
				What matters is that your instances are marked as <Link
					to="/docs/advanced/instance_settings#non-prod-instance"
					className="text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-600"
				>
					non-prod
				</Link>. You can do that from the instance settings or generate a development license key from the <Link
					to="/docs/misc/plans_details#windmill-customer-portal"
					className="text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-600"
				>
					Customer Portal
				</Link>.
			</span>
		)
	},
	{
		id: 'payment',
		question: 'How is payment done?',
		answer: (
			<span>
				Payment is processed through Stripe and can be made using ACH, bank transfer, Cash App Pay, or credit or debit card. Subscriptions can be made by automatic debit or by invoice.
			</span>
		)
	},
	{
		id: 'usage-based-billing',
		question: 'Is Windmill billed based on usage?',
		answer: (
			<span>
				Only the Teams plan is billed based on actual usage. For Enterprise Edition and Pro plans, you commit to terms that fit within a given range of seats and Compute Units, providing more predictable pricing.
				<br /><br />
				If your usage temporarily exceeds your subscription terms on EE or Pro plans, you will be notified and given 35 days to address the situation before your latest license key expires.
			</span>
		)
	},
	{
		id: 'subscription-flexibility',
		question: 'Can I increase the subscription terms during the subscription period?',
		answer: (
			<span>
				On EE & Pro subscriptions (especially annual subscriptions), there is flexibility to increase the number of seats and compute units as needed during the subscription period. A prorated amount will be billed for the additional resources for the remaining period. On an annual subscription, this means you will only pay for the portion of the year that remains after the adjustment. For example, if you increase seats 10 months into the year, you would pay for approximately 2/12 of the annual cost for the additional seats.
			</span>
		)
	},
	{
		id: 'portal',
		question: 'How can I update my subscription?',
		answer: (
			<span>
				As an Enterprise and Pro user, you will have access to detailed usage information and invoices
				through the{' '}
				<Link
					to="/docs/misc/plans_details#windmill-customer-portal"
					className="text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-600"
				>
					Windmill Customer Portal
				</Link>
				{'. '}
				You can also enable/disable any time automatic renewal and automatic debit (therefore
				payment by invoice).
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
				and the SLA is consistent for both cloud and self-hosted deployments. Enterprise customers are also entitled to a dedicated Slack or Discord channel.
			</span>
		)
	},
	{
		id: 'security',
		question: "What is Windmill's security level on cloud?",
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
				Windmill is a company that develops a product. Our mission is to build the best possible
				product so that our users can create the most value out of it. We provide{' '}
				<Link
					to="/docs/misc/support_and_sla"
					className="text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-600"
				>
					priority support
				</Link>{' '}
				to our Enterprise customers. This support includes the implementation of feature requests,
				prioritized bug resolutions, and recommendations on use cases.
				<br />
				<br />
				However, we do not carry out the implementation of these use cases ourselves (e.g. building
				a specific app). While we are able to offer some workshops at the beginning of your Windmill
				journey, it is not possible to do so repeatedly and systematically.
				<br />
				<br />
				For these reasons, we recommend that all Windmill users that require end-to-end use case
				development and exhaustive training engage with{' '}
				<Link
					to="/docs/misc/partners"
					className="text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-600"
				>
					Windmill certified partners
				</Link>
				{'. '}
				These partners are trained and certified by Windmill to provide the best possible service to
				our users.
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
								  {open && (
									<>
									  <LinkIcon
										className="h-5 w-5 text-gray-400 mr-2 cursor-pointer"
										aria-hidden="true"
										onClick={() => {
										  window.location.hash = faq.id;
										}}
									  />
									  <Minus className="h-6 w-6" aria-hidden="true" />
									</>
								  )}
								  {!open && <Plus className="h-6 w-6" aria-hidden="true" />}
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
