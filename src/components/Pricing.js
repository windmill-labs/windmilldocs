import React from 'react';
import clsx from 'clsx';
import styles from './Pricing.module.css';
import Greencheck from '../../static/green_check.svg';
import Link from '@docusaurus/Link';

export default function Pricing() {
	return (
		<div className="w-full items-center m-auto text-center align-middle ">
			<h2 className="pb-3 text-2xl font-medium">Pricing</h2>
			<div className="flex flex-col align-middle">
				<table className="m-auto rounded-md table-fixed overflow-hidden">
					<tr className="border-t-0 ">
						<th className="w-1/4 font-medium border-t-0 border-l-0 border-r-0 "></th>
						<th className="w-1/4 font-medium border-t-0 border-l-0 border-r-0 ">Free</th>
						<th className=" w-1/4 font-medium border-t-0 border-l-0 border-r-0 ">Team</th>
						<th className=" w-1/4 font-medium border-t-0 border-l-0 border-r-0 ">Enterprise</th>
					</tr>
					<tbody className="border-l-2 border-r-2 px-12 bg-none">
						<tr className="">
							<td className={styles.header_col}>Users</td>
							<td>1</td>
							<td>1-50</td>
							<td>Unlimited</td>
						</tr>
						<tr className="">
							<td className={styles.header_col}>Workspaces</td>
							<td>1</td>
							<td>5</td>
							<td>Unlimited</td>
						</tr>
						<tr>
							<td className={styles.header_col}>Scripts, Secrets, Resources, Schedules</td>
							<td>
								Unlimited<sup>**</sup>
							</td>
							<td>Unlimited</td>
							<td>Unlimited</td>
						</tr>
						<tr>
							<td className={styles.header_col}>Custom dependencies</td>
							<td>
								<sup>*</sup>
							</td>
							<td>
								<sup>*</sup>
							</td>
							<td>
								<Greencheck className="m-auto" />
							</td>
						</tr>
						<tr>
							<td className={styles.header_col}>Run compute time at 1 vCPU</td>
							<td>5h / month (extra mins billed)</td>
							<td>25h / user / month (extra mins billed)</td>
							<td>Unlimited</td>
						</tr>
						<tr>
							<td className={styles.header_col}>Runs rate limit (per min)</td>
							<td>30</td>
							<td>200 / user</td>
							<td>Unlimited</td>
						</tr>
						<tr>
							<td className={styles.header_col}>SSO</td>
							<td></td>
							<td></td>
							<td>
								<Greencheck className="m-auto" />
							</td>
						</tr>
						<tr>
							<td className={styles.header_col}>Permission groups</td>
							<td></td>
							<td>
								<Greencheck className="m-auto" />
							</td>
							<td>
								<Greencheck className="m-auto" />
							</td>
						</tr>
						<tr>
							<td className={styles.header_col}>Audit logs</td>
							<td></td>
							<td>3 days, exportable</td>
							<td>Unlimited, exportable</td>
						</tr>
						<tr>
							<td className={styles.header_col}>Self-hostable</td>
							<td></td>
							<td></td>
							<td>
								<Greencheck className="m-auto" />
							</td>
						</tr>
						<tr>
							<td className={styles.header_col}>Price</td>
							<td>Free forever</td>
							<td>
								Price per seat, <a href="mailto:sales@windmill.dev">contact us</a>
							</td>
							<td>
								<a href="mailto:sales@windmill.dev">Contact us</a>
							</td>
						</tr>
					</tbody>
				</table>
				<div className="m-auto text-xs flex-col mt-1 mb-12">
					<div>
						This pricing reflects our current vision, we will do our best to keep it stable, but it
						may change.
					</div>
					<div>
						* Windmill tries its best to provide all{' '}
						<Link to="/docs/how-to/dependencies">reasonable dependencies by default.</Link> ** Supply
						while it lasts! Windmill is a Beta product.
					</div>
					<div></div>
				</div>
			</div>
		</div>
	);
}
