import React from 'react';

import {
	UploadIcon,
	EyeIcon,
	LogInIcon,
	RefreshCcwIcon,
	DeleteIcon,
	FolderOutputIcon,
	ArrowRight
} from 'lucide-react';
import Solution from '../../components/Solutions';

export default function Content() {
	const color = '#6ccc93';
	const name = 'Supabase';
	const website = 'https://supabase.com/';

	const data = {
		title: `APIs, workflows and UIs with ${name}`,
		subtitle: `Create workflows, data pipelines, endpoints or admin panels that interact with ${name}.`,
		logo: '/third_party_logos/supabase.svg',
		description: (
			<div className="flex flex-col gap-4">
				<p>
					<a href={website} target="_blank">
						<strong>
							<span style={{ color }}>{name}</span>
						</strong>
					</a>{' '}
					is an open source Firebase alternative. It provides a Postgres database, Auth, and
					Storage.
				</p>
				<p>
					Connecting <a href="/">
						<strong>
							<span style={{ color: '##3b82f6' }}>Windmill</span>
						</strong>
					</a>{' '} to <span> {name}</span> takes a few seconds and lets you build
					internal tools from it and integrate with any other platform.
				</p>
				<p>
					From scripts supported in multiple languages, build UIs and flows that you can monitor and
					trigger on demand, by schedule or webhooks.
				</p>
				<p>Windmill supports PostgreSQL queries directly in the UI.</p>
			</div>
		),

		integrations_sub_title: `Write any script, flow or app targeting ${name} API, or pick them from WindmillHub community library. Windmill supports scripts in TypeScript, Python, Go, Bash and SQL.`,
		hubIntegrations: [
			{
				title: 'Fetch data',
				link: 'https://hub.windmill.dev/scripts/supabase/1512/fetch-data-supabase',
				description: 'Retrieve data from Supabase and use it in scripts or display it in a table.',
				icon: FolderOutputIcon
			},
			{
				title: 'Insert data',
				description: 'Add new data to Supabase either manually or from external datasets.',
				link: 'https://hub.windmill.dev/scripts/supabase/1513/insert-data-supabase',
				icon: UploadIcon
			},
			{
				title: 'Preview event',
				link: 'https://hub.windmill.dev/scripts/supabase/1455/preview-supabase-event-supabase',
				description: 'Return a Supabase event.',
				icon: EyeIcon
			},
			{
				title: 'Authenticate',
				link: 'https://hub.windmill.dev/scripts/supabase/1540/authenticate-with-email-and-password-supabase',
				description: 'Authentificate to Supabase with e-mail and password.',
				icon: LogInIcon
			},
			{
				title: 'Update data',
				link: 'https://hub.windmill.dev/scripts/supabase/1514/update-data-supabase',
				description: 'Update Supabase data after it was dealt with a script of flow.',
				icon: RefreshCcwIcon
			},
			{
				title: 'Delete data',
				link: 'https://hub.windmill.dev/scripts/supabase/1515/delete-data-supabase',
				description: 'Delete data on Supabase from Windmill.',
				icon: DeleteIcon
			}
		]
	};

	const extraBlock = (
		<>
			<p className="text-base font-normal text-gray-500 dark:text-gray-400 mt-12">
				<div className="flex flex-col gap-4">
					<p>
						Windmill also supports{' '}
						<a href="/docs/getting_started/scripts_quickstart/sql" target="_blank">
							<strong>
								<span>PostgreSQL</span>
							</strong>
						</a>{' '}
						as a language. For
						<span> {name}</span>, this means you can connect your database via the Postgres protocol
						and execute any SQL query from your internal tools.
					</p>
				</div>
			</p>
			<div className="flex items-center gap-2">
				<a
					type="button"
					href="/docs/getting_started/scripts_quickstart/sql"
					target="_blank"
					className="flex items-center gap-2 rounded-md bg-blue-50 px-4 py-2 text-sm font-semibold text-gray-900 hover:text-gray-900 hover:bg-blue-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 mt-8"
				>
					Documentation
					<ArrowRight className="" aria-hidden="true" />
				</a>
			</div>
		</>
	);

	return <Solution data={data} name={name} color={color} website={website} extraBlock={extraBlock} />;
}
