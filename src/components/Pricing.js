// import React from 'react';
// import styles from './Pricing.module.css';
// import Greencheck from '../../static/green_check.svg';
// import Link from '@docusaurus/Link';

// export default function Pricing() {
// 	return (

// 		<div className="w-full items-center m-auto text-center align-middle ">
// 			<h2 className="pb-3 text-2xl font-medium">Pricing</h2>
// 			<div className="flex flex-col align-middle">
// 				<table className="m-auto rounded-md table-fixed overflow-hidden">
// 					<tr className="border-t-0 ">
// 						<th className="w-1/4 font-medium border-t-0 border-l-0 border-r-0 "></th>
// 						<th className="w-1/4 font-medium border-t-0 border-l-0 border-r-0 ">Free</th>
// 						<th className=" w-1/4 font-medium border-t-0 border-l-0 border-r-0 ">Team</th>
// 						<th className=" w-1/4 font-medium border-t-0 border-l-0 border-r-0 ">Enterprise</th>
// 					</tr>
// 					<tbody className="border-l-2 border-r-2 px-12 bg-white">
// 						<tr className="">
// 							<td className={styles.header_col}>Users</td>
// 							<td>1</td>
// 							<td>1-50</td>
// 							<td>Unlimited</td>
// 						</tr>
// 						<tr className="">
// 							<td className={styles.header_col}>Workspaces</td>
// 							<td>1</td>
// 							<td>5</td>
// 							<td>Unlimited</td>
// 						</tr>
// 						<tr>
// 							<td className={styles.header_col}>Scripts, Secrets, Resources, Schedules</td>
// 							<td>
// 								Unlimited<sup>**</sup>
// 							</td>
// 							<td>Unlimited</td>
// 							<td>Unlimited</td>
// 						</tr>
// 						<tr>
// 							<td className={styles.header_col}>Custom dependencies</td>
// 							<td>
// 								<sup>*</sup>
// 							</td>
// 							<td>
// 								<sup>*</sup>
// 							</td>
// 							<td>
// 								<Greencheck className="m-auto" />
// 							</td>
// 						</tr>
// 						<tr>
// 							<td className={styles.header_col}>Run compute time at 1 vCPU</td>
// 							<td>5h / month (extra mins billed)</td>
// 							<td>25h / user / month (extra mins billed)</td>
// 							<td>Unlimited</td>
// 						</tr>
// 						<tr>
// 							<td className={styles.header_col}>Runs rate limit (per min)</td>
// 							<td>30</td>
// 							<td>200 / user</td>
// 							<td>Unlimited</td>
// 						</tr>
// 						<tr>
// 							<td className={styles.header_col}>SSO</td>
// 							<td></td>
// 							<td></td>
// 							<td>
// 								<Greencheck className="m-auto" />
// 							</td>
// 						</tr>
// 						<tr>
// 							<td className={styles.header_col}>Permission groups</td>
// 							<td></td>
// 							<td>
// 								<Greencheck className="m-auto" />
// 							</td>
// 							<td>
// 								<Greencheck className="m-auto" />
// 							</td>
// 						</tr>
// 						<tr>
// 							<td className={styles.header_col}>Audit logs</td>
// 							<td></td>
// 							<td>3 days, exportable</td>
// 							<td>Unlimited, exportable</td>
// 						</tr>
// 						<tr>
// 							<td className={styles.header_col}>Self-hostable</td>
// 							<td></td>
// 							<td></td>
// 							<td>
// 								<Greencheck className="m-auto" />
// 							</td>
// 						</tr>
// 						<tr>
// 							<td className={styles.header_col}>Price</td>
// 							<td>Free forever</td>
// 							<td>
// 								Price per seat, <a href="mailto:sales@windmill.dev">contact us</a>
// 							</td>
// 							<td>
// 								<a href="mailto:sales@windmill.dev">Contact us</a>
// 							</td>
// 						</tr>
// 					</tbody>
// 				</table>
// 				<div className="m-auto text-xs flex-col mt-1 mb-12">
// 					<div>
// 						This pricing reflects our current vision, we will do our best to keep it stable, but it
// 						may change.
// 					</div>
// 					<div>
// 						* Windmill tries its best to provide all{' '}
// 						<Link to="/docs/how-to/dependencies">reasonable dependencies by default.</Link> ** Supply
// 						while it lasts! Windmill is a Beta product.
// 					</div>
// 					<div></div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }

import React from 'react';
import { useState } from 'react';

const plans = {
	Free: [
		<span>
			<b>1 000</b> free global executions per month
		</span>,
		<span>Community support on Discord</span>
	],
	Team: [
		<span>
			<b>$10/mo</b>, includes 1 user/author + 10k computations at no cost
		</span>,
		<span>
			<b>+ $8/mo</b> per extra user/author in the workspace
		</span>,
		<span>
			<b>+ $4/mo</b> per extra operators in the workspace.
		</span>,
		<span>
			<b>+ $0.001</b> per extra computation
		</span>,
		<span>
			Google/Github/Microsoft/Gitlab <b>SSO</b>
		</span>,
		<span>
			<b>Unlimited</b> variables/resources/scripts/apps/flows
		</span>,
		<span>
			<b>Support 24/7 with 48h response time</b>
		</span>,

		<span>Limited to 10 seats</span>
	],
	Enterprise: [
		<span>
			<b>$100/mo</b>, includes 1 user/author + 10k computations at no cost
		</span>,
		<span>
			<b>+ $16/mo</b> per extra user/author in the workspace
		</span>,
		<span>
			<b>+ $8/mo</b> per extra operators in the workspace.
		</span>,
		<span>
			<b>+ $0.002</b> per extra computation
		</span>,
		<span>
			<b>Dedicated</b> isolated workers and database available for <b>+ $400/mo</b> (available in
			US/EU/Asia)
		</span>,
		<span>
			<b>Dedicated</b> entire kubernetes cluster <b>+ $4000/mo</b> (available in US/EU/Asia)
		</span>,
		<span>
			<b>SAML</b> support
		</span>,
		<span>
			<b>SLA</b>
		</span>,
		<span>
			<b>Priority Support 24/7 with 3h response time and automation engineer assistance</b>
		</span>,
		<span>
			<b>Design partners for Roadmap</b>
		</span>
	]
};

/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
const tabs = [{ name: 'Self-hosted' }, { name: 'Cloud' }];

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export default function Pricing() {
	const [selectedTab, setTab] = useState('Cloud');

	return (
		<div id="pricing">
			<div className="w-full mt-20 mb-20">
				<h1 className="section-title text-center">Pricing</h1>
			</div>

			<div class="mb-10 mx-auto max-w-2xl ">
				<div class="divide-y divide-gray-100 mx-4">
					<details class="group">
						<summary class="flex cursor-pointer list-none items-center justify-between py-4 text-lg font-medium text-secondary-900">
							Operator vs Author
							<div class="text-secondary-500">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="block h-5 w-5 transition-all duration-300 group-open:rotate-180"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M19.5 8.25l-7.5 7.5-7.5-7.5"
									/>
								</svg>
							</div>
						</summary>
						<div class="pb-4 text-secondary-500">
							An author can write scripts/flows/apps/variables/resources. An operator can only
							run/view them.
						</div>
					</details>
					<details class="group">
						<summary class="flex cursor-pointer list-none items-center justify-between py-4 text-lg font-medium text-secondary-900">
							What is a computation?
							<div class="text-secondary-500">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="block h-5 w-5 transition-all duration-300 group-open:rotate-180"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M19.5 8.25l-7.5 7.5-7.5-7.5"
									/>
								</svg>
							</div>
						</summary>
						<div class="pb-4 text-secondary-500">
							{' '}
							The single credit-unit is called a "computation". An computation corresponds to a
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
										selectedTab == tab.name
											? 'border-gray-700 text-gray-800'
											: 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
										'w-1/2  py-4 px-1 text-center border-b-2 font-medium text-md'
									)}
									aria-current={selectedTab == tab.name ? 'page' : undefined}
								>
									{tab.name}
								</a>
							))}
						</nav>
					</div>
				</div>
			</div>

			{selectedTab == 'Cloud' ? (
				<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
					{Object.entries(plans).map(([planTitle, planDesc]) => (
						<div class="box p-4 text-sm  flex flex-col h-full overflow-hidden">
							<h2 class="mb-4 text-4xl">{planTitle}</h2>
							<ul class="list-disc p-4 text-lg">
								{planDesc.map((item) => (
									<li class="mt-2">{item}</li>
								))}
							</ul>

							<div class="grow" />
						</div>
					))}
				</div>
			) : (
				<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div class="box p-4 text-sm  flex flex-col h-full overflow-hidden">
						<h2 class="mb-4 text-4xl">Free and Open-source</h2>
						<ul class="list-disc p-4 text-lg">
							<li class="mt-2">
								<b>AGPLv3</b> License
							</li>
							<li class="mt-2">No restrictions whatsoever</li>
							<li class="mt-2">Google/Github/Microsoft/Gitlab SSO</li>
							<li class="mt-2">Easy to deploy on Fargate/Docker/Kubernetes</li>
							<li class="mt-2">Community support on Discord</li>
						</ul>
					</div>
					<div class="box p-4 flex flex-col h-full overflow-hidden">
						<h2 class="mb-4 text-4xl">Enterprise Edition</h2>

						<ul class="list-disc p-4 text-lg">
							<li class="mt-2">
								<b>Commercial</b> License
							</li>

							<li class="mt-2">
								<span>
									<b>$100/mo</b>, includes 1 user/author + 10k computations
								</span>
							</li>
							<li class="mt-2">
								<span>
									<b>+ $8/mo</b> per extra user/author in the workspace
								</span>
							</li>
							<li class="mt-2">
								<span>
									<b>+ $4/mo</b> per extra operators in the workspace.
								</span>
							</li>
							<li class="mt-2">
								<span>
									<b>+ $0.001</b> per extra computation
								</span>
							</li>
							<li class="mt-2">Windmill Enterprise Edition Plugins</li>
							<ul class="list-disc mb-2 text-lg">
								<li>Audit Logs exports</li>
								<li>Distributed dependency cache</li>
							</ul>
							<li class="">
								<b>SAML</b> support including groups synchronization
							</li>
							<li class="mt-2">
								<b>SLA</b>
							</li>
							<li class="mt-2">
								<b>Priority Support 24/7</b> with 3h response time and automation engineer
								assistance
							</li>
							<li class="mt-2">
								<b>Design partners for Roadmap</b>
							</li>
						</ul>
					</div>
				</div>
			)}
		</div>
	);
}
