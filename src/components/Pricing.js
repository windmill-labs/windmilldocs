import React, { useState } from 'react';
import Quote from './Quote';

const plans = {
	SelfHosted: [
		<span>
			<b>Free and Open-source</b>
			<ul>
				<li>AGPLv3 License</li>
				<li>Unlimited users & executions</li>
				<li>Google/Github/Microsoft/Gitlab SSO</li>
				<li>Easy to deploy on Fargate/Docker/Kubernetes</li>
				<li>Community support on Discord</li>
			</ul>
		</span>,
		<span>
			<b>Enterprise edition</b>
			<ul>
				<li>Commercial license</li>
				<li>
					$50/month per worker: 1 worker can execute about 13mio executions per month. (on average a
					script takes 200ms to execute, so 1 worker can execute 5 requests per second, 5 * 60 * 60
					* 24 * 30 = 13mio)
				</li>
				<li>$20/month per author</li>
				<li>$10/month per operator</li>
				<li>SAML support including groups synchronization</li>
				<li>SLA</li>
				<li>Priority Support 24/7 with 3h response time and automation engineer assistance</li>
				<li>Design partners for Roadmap</li>
				<li>Global cache synchronization</li>
			</ul>
			<p>2 workers, 1 author: $120/month</p>
		</span>
	],
	Cloud: [
		<span>
			<b>Free</b>
			<ul>
				<li>1000 executions per month</li>
				<li>Community support on Discord</li>
				<li>Google/Github/Microsoft/Gitlab SSO</li>
				<li>Unlimited variables/resources/scripts/apps/flows * (except abuse)</li>
			</ul>
		</span>,
		<span>
			<b>Team</b>
			<ul>
				<li>$10/month per author</li>
				<li>$5/month per operator</li>
				<li>Everything in Free</li>
				<li>Support 24/7 with 48h response time</li>
				<li>Limited to 10 seats</li>
				<li>10k executions per month per seat (10k sec of compute time per month per seat)</li>
			</ul>
		</span>,
		<span>
			<b>Enterprise</b>
			<ul>
				<li>$500/month for the dedicated namespace ($1000 for dedicated cluster)</li>
				<li>$200/month per worker</li>
				<li>$40/month per author</li>
				<li>$20/month per operator</li>
				<li>10k executions per month per seat (10k sec of compute time per month per seat)</li>
				<li>SAML support including groups synchronization</li>
				<li>SLA</li>
				<li>Priority Support 24/7 with 3h response time and automation engineer assistance</li>
				<li>Design partners for Roadmap</li>
			</ul>
		</span>
	]
};

const tabs = [{ name: 'Self-hosted' }, { name: 'Cloud' }];

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export default function Pricing() {
	const [selectedTab, setTab] = useState('Cloud');

	return (
		<div id="pricing">
			<div className="w-full mb-20">
				<h1 className="section-title text-center">Pricing</h1>
			</div>

			<div className="mb-10 mx-auto max-w-2xl ">
				<div className="divide-y divide-gray-100 mx-4">
					<details className="group">
						<summary className="flex cursor-pointer list-none items-center justify-between py-4 text-lg font-medium text-secondary-900">
							Operator vs Author
							<div className="text-secondary-500">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth="1.5"
									stroke="currentColor"
									className="block h-5 w-5 transition-all duration-300 group-open:rotate-180"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M19.5 8.25l-7.5 7.5-7.5-7.5"
									/>
								</svg>
							</div>
						</summary>
						<div className="pb-4 text-secondary-500">
							An author can write scripts/flows/apps/variables/resources. An operator can only
							run/view them.
						</div>
					</details>
					<details className="group">
						<summary className="flex cursor-pointer list-none items-center justify-between py-4 text-lg font-medium text-secondary-900">
							What is a computation?
							<div className="text-secondary-500">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth="1.5"
									stroke="currentColor"
									className="block h-5 w-5 transition-all duration-300 group-open:rotate-180"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M19.5 8.25l-7.5 7.5-7.5-7.5"
									/>
								</svg>
							</div>
						</summary>
						<div className="pb-4 text-secondary-500">
							The single credit-unit is called a "computation". A computation corresponds to a
							single job whose duration is less than 1s. For any additional seconds of computation,
							an additional computation is accounted for. Jobs are executed on one powerful virtual
							CPU with 2Gb of memory. Most jobs will take less than 200ms to execute.
						</div>
					</details>
				</div>
			</div>

			<div>
				<div className="w-full mb-10">
					<div className="border-b border-gray-200">
						<nav className="-mb-px flex" aria-label="Tabs">
							{tabs.map((tab) => (
								<a
									key={tab.name}
									onClick={(e) => {
										e.preventDefault();
										setTab(tab.name);
									}}
									href="#"
									className={classNames(
										selectedTab === tab.name
											? 'border-gray-700 text-gray-800'
											: 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
										'w-1/2 py-4 px-1 text-center border-b-2 font-medium text-md'
									)}
									aria-current={selectedTab === tab.name ? 'page' : undefined}
								>
									{tab.name}
								</a>
							))}
						</nav>
					</div>
				</div>
			</div>

			{selectedTab === 'Cloud' ? (
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					{plans.Cloud.map((planDesc, index) => (
						<div className="box p-4 text-sm flex flex-col h-full overflow-hidden" key={index}>
							<h2 className="mb-4 text-4xl">
								{index === 0 ? 'Free' : index === 1 ? 'Team' : 'Enterprise'}
							</h2>
							{planDesc}
						</div>
					))}
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{plans.SelfHosted.map((planDesc, index) => (
						<div className="box p-4 flex flex-col h-full overflow-hidden" key={index}>
							<h2 className="mb-4 text-4xl">
								{index === 0 ? 'Free and Open-source' : 'Enterprise edition'}
							</h2>
							{planDesc}
							{index === 1 && (
								<div>
									<Quote
										props={{
											includedSeats: 1,
											includedComputations: 10000,
											perAuthor: 20,
											perOperator: 10,
											perComputation: 0.002,
											basis: 50,
											displayMultitenant: false
										}}
									/>
									<div className="text-center mt-2 w-full">Interested? contact@windmill.dev</div>
								</div>
							)}
						</div>
					))}
				</div>
			)}
		</div>
	);
}
