import React from 'react';
import LandingSection from './LandingSection';
import { ExternalLink } from 'lucide-react';
import { useDeveloperMode } from '../pages';
import classNames from 'classnames';

const integrations = [
	{ name: 'Airtable', src: 'third_party_logos/airtable.svg' },
	{ name: 'ClickHouse', src: 'third_party_logos/clickhouse.svg' },
	{ name: 'FaunaDB', src: 'third_party_logos/faunadb.svg' },
	{ name: 'Gdrive', src: 'third_party_logos/gdrive.svg' },
	{ name: 'Gmail', src: 'third_party_logos/gmail.svg' },
	{ name: 'Mastodon', src: 'third_party_logos/mastodon.svg' },
	{ name: 'MySQL', src: 'third_party_logos/mysql.svg' },
	{ name: 'PostgreSQL', src: 'third_party_logos/postgres.svg' },
	{ name: 'Slack', src: 'third_party_logos/slack.svg' },
	{ name: 'Appwrite', src: 'third_party_logos/appwrite.svg' },
	{ name: 'Datadog', src: 'third_party_logos/datadog.svg' },
	{ name: 'Funkwhale', src: 'third_party_logos/funkwhale.svg' },
	{ name: 'GitHub', src: 'third_party_logos/github.svg' },
	{ name: 'Gsheets', src: 'third_party_logos/gsheets.svg' },
	{ name: 'HubSpot', src: 'third_party_logos/hubspot.svg' },
	{ name: 'Mailchimp', src: 'third_party_logos/mailchimp.svg' },
	{ name: 'OpenAI', src: 'third_party_logos/openai.svg' },
	{ name: 'Sendgrid', src: 'third_party_logos/sendgrid.svg' },
	{ name: 'Supabase', src: 'third_party_logos/supabase.svg' },
	{ name: 'AWS', src: 'third_party_logos/aws.svg' },
	{ name: 'Discord', src: 'third_party_logos/discord.svg' },
	{ name: 'Gcal', src: 'third_party_logos/gcal.svg' },
	{ name: 'GitLab', src: 'third_party_logos/gitlab.svg' },
	{ name: 'LinkedIn', src: 'third_party_logos/linkedin.svg' },
	{ name: 'Matrix', src: 'third_party_logos/matrix.svg' },
	{ name: 'Nextcloud', src: 'third_party_logos/nextcloud.svg' },
	{ name: 'S3', src: 'third_party_logos/s3.svg' },
	{ name: 'Stripe', src: 'third_party_logos/stripe.svg' },
	{ name: 'MongoDB', src: 'third_party_logos/mongodb.svg' },
	{ name: 'SurrealDB', src: 'third_party_logos/surrealdb.svg' },
	{ name: 'Telegram', src: 'third_party_logos/telegram.svg' },
	{ name: 'Toggl', src: 'third_party_logos/toggl.svg' }
];

export default function IntergrationList() {
	const { developerMode, setDeveloperMode } = useDeveloperMode();

	return (
		<LandingSection bgClass={developerMode ? 'bg-gray-900' : 'bg-white'}>
			<div className="w-full gap-8 flex flex-col">
				<h1 className="tracking-tight leading-tight text-left font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-blue-600">
					Integrations
				</h1>

				<span
					className={classNames(
						'text-lg max-w-3xl',
						developerMode ? 'text-white' : 'text-gray-600'
					)}
				>
					We have a growing list of integrations with third party services available on the Hub.
					Connect your apps and services to automate your workflows.
				</span>
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-8 gap-4">
					{integrations.map((item) => (
						<a
							key={item.name}
							className={classNames(
								'col-span-1 flex justify-center rounded-xl border p-4 cursor-pointer transition-all',
								'bg-gray-50 hover:bg-gray-100'
							)}
							href={`https://hub.windmill.dev/integrations/${item.name
								.toLowerCase()
								.replace(/\s/g, '')}`}
							target="_blank"
						>
							<img src={item.src} alt={item.name} className="w-auto h-8" />
						</a>
					))}
				</div>
				<div className="flex">
					<a
						href="https://hub.windmill.dev/resources"
						type="button"
						target="_blank"
						className="!no-underline hover:text-white inline-flex items-center rounded-md border border-transparent bg-blue-400 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
					>
						Explore more integrations on the Hub
						<ExternalLink className="ml-2 h-5" />
					</a>
				</div>
			</div>
		</LandingSection>
	);
}
