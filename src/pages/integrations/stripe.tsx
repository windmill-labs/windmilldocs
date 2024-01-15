import React from 'react';

import {
	RefreshCcw,
	PiggyBank,
	GanttChart,
	Users,
    Scale,
	WalletCards
} from 'lucide-react';
import Solution from '../../components/Solutions';

export default function Content() {
	const color = '#635BFF';
	const name = 'Stripe';
	const website = "https://stripe.com/";

	const data = {
		title: `APIs, workflows and UIs with ${name}`,
		subtitle: `Create workflows, data pipelines, endpoints or admin panels that interact with ${name}.`,
        logo: '/third_party_logos/stripe.svg',
		description: (
			<div className="flex flex-col gap-4">
				<p>
					<a href={website} target="_blank">
						<strong>
							<span style={{ color }}>{name}</span>
						</strong>
					</a>{' '}
                    is a software specializing in online payment processing systems.
				</p>
				<p>
					Connecting Windmill to <span> {name}</span> takes a few seconds and lets you build
					internal tools from it and integrate with any other platform.
				</p>
				<p>
					From scripts supported in multiple languages, build UIs and flows that you can monitor and
					trigger on demand, by schedule or webhooks.
				</p>
			</div>
		),
		integrations_sub_title: `Write any script, flow or app targeting ${name} API, or pick them from WindmillHub community library. Windmill supports scripts in TypeScript, Python, Go, Bash and SQL.`,
		hubIntegrations: [
			{
				title: 'Update a Customer',
				link: 'https://hub.windmill.dev/scripts/stripe/1343/update-a-customer-stripe',
				description: 'Updates the specified customer by setting the values of the parameters passed.',
				icon: RefreshCcw
			},
			{
				title: 'Create a Payout',
				description: 'Send funds to your own bank account.',
				link: 'https://hub.windmill.dev/scripts/stripe/1336/create-a-payout-stripe',
				icon: PiggyBank
			},
			{
				title: 'Retrieve Invoice Line Item',
				link: 'https://hub.windmill.dev/scripts/stripe/1335/retrieve-invoice-line-item-stripe',
				description: 'Retrieve a single line item on an invoice.',
				icon: GanttChart
			},
			{
				title: 'Get Recently Added Customers',
				link: 'https://hub.windmill.dev/scripts/stripe/1463/get-recently-added-customers-stripe',
				description: 'Trigger script to get the newly created customers.',
				icon: Users
			},
			{
				title: 'List Balance History',
				link: 'https://hub.windmill.dev/scripts/stripe/1338/list-balance-history-stripe',
				description: 'Returns the last 100 transactions that have contributed to the Stripe account balance.',
				icon: Scale
			},
			{
				title: 'Create a Refund',
				link: 'https://hub.windmill.dev/scripts/stripe/1337/create-a-refund-stripe',
				description: 'Creating a new refund will refund a charge that has previously been created but not yet refunded.',
				icon: WalletCards
			}
		]
	};

	return <Solution data={data} name={name} color={color} website={website}  />;
}
