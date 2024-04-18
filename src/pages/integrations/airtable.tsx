import React from 'react';

import {
	PlusSquareIcon,
	CopyIcon,
	ArrowLeftCircleIcon,
	ListIcon,
	RefreshCcwIcon,
	DeleteIcon
} from 'lucide-react';
import Solution from '../../components/Solutions';

export default function Content() {
	const color = '#E9B13D';
	const name = 'Airtable';
	const website = 'https://www.airtable.com/';

	const data = {
		title: `APIs, workflows and UIs with ${name}`,
		subtitle: `Create workflows, data pipelines, endpoints or admin panels that interact with ${name}.`,
		logo: '/third_party_logos/airtable.svg',
		description: (
			<div className="flex flex-col gap-4">
				<p>
					<a href={website} target="_blank">
						<strong>
							<span style={{ color }}>{name}</span>
						</strong>
					</a>{' '}
					is a cloud platform to create and manage databases.
				</p>
				<p>
					Connecting <a href="/">
						<strong>
							<span style={{ color: '#3b82f6' }}>Windmill</span>
						</strong>
					</a>{' '} to <span> {name}</span> takes a few seconds and lets you build
					internal tools from it and integrate with any other platform.
				</p>
				<p>
					From scripts supported in multiple languages, build UIs and flows that you can monitor and
					trigger on demand, by schedule or webhooks.
				</p>
			</div>
		),
		integrations_sub_title: `Write any script, flow or app targeting ${name} API, or pick them from Windmill Hub community library. Windmill supports scripts in TypeScript, Python, Go, Bash and SQL.`,
		hubIntegrations: [
			{
				title: 'Create Single Record',
				link: 'https://hub.windmill.dev/scripts/airtable/302/create-single-record-airtable',
				description: 'Add a new record to an Airtable base.',
				icon: PlusSquareIcon
			},
			{
				title: 'Create Multiple Records',
				description: 'Add multiple new records to an Airtable base.',
				link: 'https://hub.windmill.dev/scripts/airtable/298/create-multiple-records-airtable',
				icon: CopyIcon
			},
			{
				title: 'Get Record',
				link: 'https://hub.windmill.dev/scripts/airtable/303/get-record-airtable',
				description: 'Retrieve a specific record from an Airtable base.',
				icon: ArrowLeftCircleIcon
			},
			{
				title: 'List Records',
				link: 'https://hub.windmill.dev/scripts/airtable/300/list-records-airtable',
				description: 'List all or specific records from an Airtable base.',
				icon: ListIcon
			},
			{
				title: 'Update record',
				link: 'https://hub.windmill.dev/scripts/airtable/301/update-record-airtable',
				description: 'Update a specific record in an Airtable base.',
				icon: RefreshCcwIcon
			},
			{
				title: 'Delete Record',
				link: 'https://hub.windmill.dev/scripts/airtable/304/delete-record-airtable',
				description: 'Remove a record from an Airtable base.',
				icon: DeleteIcon
			}
		]
	};

	return <Solution data={data} name={name} color={color} website={website}  />;
}
