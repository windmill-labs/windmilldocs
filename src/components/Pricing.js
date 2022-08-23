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

import { Fragment } from 'react'
import React from 'react'
import { CheckIcon, MinusIcon } from '@heroicons/react/solid'

const tiers = [
	{ name: 'Free', pricing: 'Free forever', description: 'As a free user you can create and be member of at most 3 non-premium workspaces. Best for personal uses.' },
	{
		name: 'Team',
		pricing: "10$ /mo /user",
		description: 'Any workspace can be upgraded to be a premium team workspace. Best for teams.',
	},
	{
		name: 'Enterprise',
		pricing: 'Custom',
		description: 'Best for orgs or teams that use Windmill at scale and/or require a commercial license',
	},
]
const sections = [
	{
		name: 'Features',
		features: [
			{ name: 'Flows', tiers: { Free: true, Team: true, Enterprise: true } },
			{ name: 'Automatically generates the UI', tiers: { Free: true, Team: true, Enterprise: true } },
			{ name: 'Deploy from Github', tiers: { Free: true, Team: true, Enterprise: true } },
			{ name: 'Webeditor with preview and code intelligence', tiers: { Free: true, Team: true, Enterprise: true } },
			{ name: 'Script versioning', tiers: { Free: true, Team: true, Enterprise: true } },
			{ name: 'Schedules', tiers: { Free: true, Team: true, Enterprise: true } },
			{ name: 'Slackbot commands', tiers: { Free: true, Team: true, Enterprise: true } },
			{ name: 'Export Workspace', tiers: { Free: true, Team: true, Enterprise: true } },
			{ name: 'Embed apps externally (WIP)', tiers: { Free: true, Team: true, Enterprise: true } },
			{ name: 'User based permissioning', tiers: { Free: true, Team: true, Enterprise: true } },
			{ name: 'Audit logs', tiers: { Free: '1 day', Team: '30 days + export to storage', Enterprise: '30 days + export to storage' } },
			{ name: 'Group based permissioning', tiers: { Free: 'While in beta', Team: true, Enterprise: true } },
			{ name: 'self-hosted workers', tiers: { Free: '', Team: true, Enterprise: true } },
			{ name: 'SSO', tiers: { Free: '', Team: '', Enterprise: true } },
			{ name: 'Kubernetes setup', tiers: { Free: '', Team: '', Enterprise: true } },
			{ name: 'Commercial license for self-hosting', tiers: { Free: '', Team: '', Enterprise: true } },
		],
	},
	{
		name: 'Cloud Usage',
		features: [
			{ name: 'Scripts', tiers: { Free: '10', Team: '50', Enterprise: 'Unlimited' } },
			{ name: 'Scripts versions', tiers: { Free: 'Last 5', Team: 'Last 50', Enterprise: 'Unlimited' } },
			{ name: 'Secrets, Resources, Schedules', tiers: { Free: 'Unlimited', Team: "Unlimited", Team: "Unlimited" } },
			{ name: 'Flows or standalone Scripts execution', tiers: { Free: '100/day', Team: '5000/day/seat', Enterprise: 'Unlimited' } },
			{ name: 'Cumulated execution time limit @ 1vCPU', tiers: { Free: '100s/day', Team: '10000s/day/seat', Enterprise: 'Unlimited' } },
		],
	},
	{
		name: 'Support',
		features: [
			{ name: 'Github issue', tiers: { Free: true, Team: true, Enterprise: true } },
			{ name: 'Discord', tiers: { Free: true, Team: true, Enterprise: true } },
			{ name: 'Email', tiers: { Free: 'Best effort', Team: 'Response within 24h', Enterprise: 'Response within 1h' } },
			{ name: 'Dedicated Support and Automation Engineer', tiers: { Free: '', Team: '', Enterprise: true } },
			{ name: 'Engineer migrating all your automation to Windmill', tiers: { Free: '', Team: '', Enterprise: true } },

		],
	},
]


export default function Pricing()
{
	return (
		<div id="pricing">
			<div className="max-w-7xl mx-auto py-16 sm:py-24 sm:px-6 lg:px-8">
				<h2 className="text-center text-3xl font-bold text-gray-900 sm:text-4xl mb-8">Pricing</h2>


				<div className="">
					<table className="w-full h-px table-fixed table ">
						<caption className="sr-only">Pricing plan comparison</caption>
						<thead>
							<tr>
								<th className="pb-4 px-6 text-sm font-medium text-gray-900 text-left" scope="col">
									<span className="sr-only">Feature by</span>
									<span>Plans</span>
								</th>
								{tiers.map((tier) => (
									<th
										key={tier.name}
										className="w-1/4 pb-4 px-6 leading-6 text-4xl  font-light text-gray-900 text-left"
										scope="col"
									>
										{tier.name}
									</th>
								))}
							</tr>
						</thead>
						<tbody className="border-t border-gray-200 divide-y divide-gray-200">
							<tr>
								<th className="py-8 px-6 text-sm font-medium text-gray-900 text-left align-top" scope="row">
									Pricing
								</th>
								{tiers.map((tier, tierIdx) => (
									<td key={tier.name} className="h-full py-8 px-6 align-top">
										<div className="relative h-full table">
											<p>
												<span className="text-xl sm:text-2xl text-gray-900 font-mono">{tier.pricing}</span>
											</p>
											<p className="mt-4 mb-10 text-sm text-gray-500">{tier.description}</p>
											<div className='p-2'></div>
											{tierIdx > 0 ?
												<a
													href="mailto:contact@windmill.dev?subject=Request%20upgrade"
													className="absolute bottom-0 block border border-gray-800 rounded-md bg-gray-800 py-1 px-2 text-sm font-semibold text-white text-center hover:bg-gray-900"
												>
													contact us
												</a> : ''}
										</div>
									</td>
								))}
							</tr>
							{sections.map((section) => (
								<Fragment key={section.name}>
									<tr>
										<th
											className="bg-gray-50 py-3 pl-6 text-sm font-medium text-gray-900 text-left"
											colSpan={4}
											scope="colgroup"
										>
											{section.name}
										</th>
									</tr>
									{section.features.map((feature) => (
										<tr key={feature.name}>
											<th className="py-5 px-6 text-sm font-normal text-gray-500 text-left" scope="row">
												{feature.name}
											</th>
											{tiers.map((tier) => (
												<td key={tier.name} className="py-5 px-6">
													{typeof feature.tiers[tier.name] === 'string' ? (
														<span className="block text-sm text-gray-700">{feature.tiers[tier.name]}</span>
													) : (
														<>
															{feature.tiers[tier.name] === true ? (
																<CheckIcon className="h-5 w-5 text-green-500" aria-hidden="true" />
															) : (
																<MinusIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
															)}

															<span className="sr-only">
																{feature.tiers[tier.name] === true ? 'Included' : 'Not included'} in {tier.name}
															</span>
														</>
													)}
												</td>
											))}
										</tr>
									))}
								</Fragment>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	)
}
