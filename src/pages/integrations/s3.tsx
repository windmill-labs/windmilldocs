import React from 'react';

import {
	PlusCircle,
	List,
	Upload,
	Eye,
	Text,
	Repeat2
} from 'lucide-react';
import Solution from '../../components/Solutions';

export default function S3() {
	const color = '#F54639';
	const name = 'S3';
	const website = 'https://aws.amazon.com/s3/';

	const data = {
		title: `APIs, workflows and UIs with ${name}`,
		subtitle: `Create workflows, data pipelines, endpoints or admin panels that interact with ${name}.`,
		logo: '/third_party_logos/s3.svg',
		description: (
			<div className="flex flex-col gap-4">
				<p>
					<a href={website} target="_blank">
						<strong>
							<span style={{ color }}>{name}</span>
						</strong>
					</a>{' '}
					is a scalable, high-speed, web-based cloud storage service designed for online backup and archiving of data and application programs.
				</p>
				<p>
                    Windmill comes with a <a href="/docs/core_concepts/persistent_storage/large_data_files">
						<strong>
							<span style={{ color: '##3b82f6' }}>native integration with S3 and Azure Blob</span>
						</strong>
					</a>{' '}
					to store large objects like files & binary data and use them in your scripts, flows and data pipelines.
				</p>
				<p>
					You can also interact with S3 from scripts supported in multiple languages, build UIs and flows that you can monitor and
					trigger on demand, by schedule or webhooks.
				</p>
			</div>
		),
		integrations_sub_title: `Write any script, flow or app targeting ${name} API, in TypeScript, Python, Go, PHP, Bash and SQL. Windmill has a built-in S3 integration to interact with S3 directly from your scripts.`,
		hubIntegrations: [
            {
              title: 'Read a file from S3',
              link: 'https://hub.windmill.dev/scripts/s3/7111/read-a-file-from-s3-within-a-script-s3',
              description: 'Use Windmill embedded S3 integration to read a S3 file and explore bucket directly within script.',
              icon: Eye
            },
            {
              title: 'Create file',
              link: 'https://hub.windmill.dev/scripts/s3/7117/create-a-file-in-s3-(bun)-s3',
              description: 'Create a file in S3 and explore bucket thans to Windmill S3 integration.',
              icon: PlusCircle
            },
            {
              title: 'List objects in a bucket',
              link: 'https://hub.windmill.dev/scripts/s3/1319/list-objects-in-a-bucket-s3',
              description: 'List all objects in a bucket and return them as a list.',
              icon: List
            },
            {
              title: 'Upload text in bucket',
              link: 'https://hub.windmill.dev/scripts/s3/1320/upload-text-in-bucket-s3',
              description: 'Upload text content at a given path in an s3 resource.',
              icon: Upload
            },
            {
              title: 'Get object in bucket as text',
              link: 'https://hub.windmill.dev/scripts/s3/1321/get-object-in-bucket-as-text-s3',
              description: 'Get object in bucket as text and return it as a string.',
              icon: Text
            },
            {
              title: 'Get recently updated objects',
              link: 'https://hub.windmill.dev/scripts/s3/1459/get-recently-updated-objects-s3',
              description: 'Trigger script to check for recently updated objects (to be used in a flow loop iterating on each new item).',
              icon: Repeat2
            }
          ]
          
	};

	return <Solution data={data} name={name} color={color} website={website}  />;
}
