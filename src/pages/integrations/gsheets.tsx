import React from 'react';

import {
	List,
	ListPlus,
	TextSearch,
	Eraser,
	Replace,
	FileSliders
} from 'lucide-react';
import Solution from '../../components/Solutions';

export default function GSheets() {
	const color = '#00A55A';
	const name = 'Google Sheets';
	const website = 'https://www.google.com/sheets/about/';
	const docs = "gsheets";

	const data = {
		title: `APIs, workflows and UIs with ${name}`,
		subtitle: `Create workflows, data pipelines, endpoints or admin panels that interact with ${name}.`,
		logo: '/third_party_logos/gsheets.svg',
		description: (
			<div className="flex flex-col gap-4">
				<p>
					<a href={website} target="_blank">
						<strong>
							<span style={{ color }}>{name}</span>
						</strong>
					</a>{' '}
					is a web-based spreadsheet program that allows users to create, edit, and collaborate on spreadsheets online.
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
              title: 'Get Values',
              link: 'https://hub.windmill.dev/scripts/gsheets/1232/get-values-gsheets',
              description: 'Fetches cell values from a specified Google Sheets document.',
              icon: TextSearch
            },
            {
              title: 'Add Rows',
              description: 'Appends new rows to a Google Sheets document with provided data.',
              link: 'https://hub.windmill.dev/scripts/gsheets/1214/add-rows-gsheets',
              icon: ListPlus
            },
            {
              title: 'List Worksheets',
              link: 'https://hub.windmill.dev/scripts/gsheets/1228/list-worksheets-gsheets',
              description: 'Lists all worksheets within a Google Sheets document.',
              icon: List
            },
            {
              title: 'Clear Row',
              link: 'https://hub.windmill.dev/scripts/gsheets/1250/clear-row-gsheets',
              description: 'Clears data from a specified row in a Google Sheets document.',
              icon: Eraser
            },
            {
              title: 'Get Values in Range',
              link: 'https://hub.windmill.dev/scripts/gsheets/1230/get-values-in-range-gsheets',
              description: 'Retrieves values from a specified range within a Google Sheets document.',
              icon: FileSliders
            },
            {
              title: 'Update Values',
              link: 'https://hub.windmill.dev/scripts/gsheets/1431/update-values-gsheets',
              description: 'Updates cell values in a Google Sheets document for a given range.',
              icon: Replace
            }
          ]
          
	};

	return <Solution data={data} name={name} color={color} website={website} docs={docs}  />;
}
