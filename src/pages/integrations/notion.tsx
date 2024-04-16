import React from 'react';

import {
	StickyNote,
	Cuboid,
	Database,
	Upload,
	UsersRound,
	Search
} from 'lucide-react';
import Solution from '../../components/Solutions';

export default function Notion() {
	const color = '#000000';
	const name = 'Notion';
	const website = 'https://www.notion.so/';

	const data = {
		title: `APIs, workflows and UIs with ${name}`,
		subtitle: `Create workflows, data pipelines, endpoints or admin panels that interact with ${name}.`,
		logo: '/third_party_logos/notion.svg',
		description: (
			<div className="flex flex-col gap-4">
				<p>
					<a href={website} target="_blank">
						<strong>
							<span style={{ color }}>{name}</span>
						</strong>
					</a>{' '}
					is a productivity and note-taking web application.
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
			</div>
		),
		integrations_sub_title: `Write any script, flow or app targeting ${name} API, or pick them from Windmill Hub community library. Windmill supports scripts in TypeScript, Python, Go, Bash and SQL.`,
		hubIntegrations: [
			{
                title: "Retrieve Page",
                link: "https://hub.windmill.dev/scripts/notion/1106/retrieve-page-notion",
                description: "Retrieve a specific page from Notion.",
                icon: StickyNote
            },
            {
                title: "Retrieve Block",
                description: "Retrieve specific block details from a Notion page.",
                link: "https://hub.windmill.dev/scripts/notion/1109/retrieve-block-notion",
                icon: Cuboid
            },
            {
                title: "Fetch data from Notion database",
                link: "https://hub.windmill.dev/scripts/notion/7160/fetch-data-from-notion-database-notion",
                description: "Extract data from a specified Notion database.",
                icon: Database
            },
            {
                title: "Update page properties",
                link: "https://hub.windmill.dev/scripts/notion/7159/update-page-properties-notion",
                description: "Update the properties of a Notion page to reflect new or modified information.",
                icon: Upload
            },
            {
                title: "List Users",
                link: "https://hub.windmill.dev/scripts/notion/1572/list-users-notion",
                description: "List all users in your Notion workspace, including their roles and permissions.",
                icon: UsersRound
            },
            {
                title: "Search by Title",
                link: "https://hub.windmill.dev/scripts/notion/1573/search-by-title-notion",
                description: "Search and retrieve pages from Notion by matching titles.",
                icon: Search
            }            
		]
	};

	return <Solution data={data} name={name} color={color} website={website}  />;
}
