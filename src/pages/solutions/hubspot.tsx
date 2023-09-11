import React from 'react';

import {
	PlusSquareIcon,
	ContactIcon,
	HeartHandshakeIcon,
	ArrowLeftCircleIcon,
	TableIcon,
	LinkIcon
} from 'lucide-react';
import Solution from '../../components/Solutions';

export default function Hubspot() {
	const color = '#EC6743';
	const name = 'Hubspot';
	const website = 'https://www.hubspot.com/';
	const windmill_color = '#4E80EE';

	const data = {
		title: `Build internal tools with ${name}`,
		subtitle: `Windmill unlocks your creation of internal tools with ${name}. From scripts, build admin panels, BI dashboards, workflows, and more.`,
		description: (
			<div className="flex flex-col gap-4">
				<p>
					<a href={website} target="_blank">
						<strong>
							<span style={{ color }}>{name}</span>
						</strong>
					</a>{' '}
					is a comprehensive inbound marketing, sales, and CRM platform.
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
		darkScreenshot: '/integrations/solutions_dark.png',
		lightScreenshot: '/integrations/solutions_light.png',
		documentationLink: 'https://docs.windmillui.com/',
		integrations_sub_title: `Write any script, flow or app targeting ${name} API, or pick them from WindmillHub community library.`,
		hubIntegrations: [
			{
				title: 'Create Contact',
				link: 'https://hub.windmill.dev/scripts/hubspot/889/create-contact-hubspot',
				description: 'Create a new contact in HubSpot.',
				icon: PlusSquareIcon
			},
			{
				title: 'Get Contact',
				description: 'Retrieve contact details from HubSpot.',
				link: 'https://hub.windmill.dev/scripts/hubspot/891/get-contact-hubspot',
				icon: ContactIcon
			},
			{
				title: 'Create Deal',
				link: 'https://hub.windmill.dev/scripts/hubspot/890/create-deal-hubspot',
				description: 'Establish a new deal in HubSpot.',
				icon: HeartHandshakeIcon
			},
			{
				title: 'Get Deal',
				link: 'https://hub.windmill.dev/scripts/hubspot/887/get-deal-hubspot',
				description: 'Fetch details of a deal from HubSpot.',
				icon: ArrowLeftCircleIcon
			},
			{
				title: 'Get a properties configuration',
				link: 'https://hub.windmill.dev/scripts/hubspot/1577/get-a-properties-configuration-from-hubspot-crm-hubspot',
				description: 'Retrieve configuration properties from HubSpot CRM.',
				icon: TableIcon
			},
			{
				title: 'Create Associations',
				link: 'https://hub.windmill.dev/scripts/hubspot/885/create-associations-hubspot',
				description: 'Establish associations between records in HubSpot.',
				icon: LinkIcon
			}
		]
	};

	return <Solution data={data} name={name} color={color} />;
}
