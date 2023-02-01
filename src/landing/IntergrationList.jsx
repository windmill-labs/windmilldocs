import React from 'react';
import LandingSection from './LandingSection';
import { ExternalLink } from 'lucide-react';

const integrations = [
	{ name: 'Airtable', src: 'third_party_logos/airtable.svg' },
	{ name: 'Clickhouse', src: 'third_party_logos/clickhouse.svg' },
	{ name: 'Faunadb', src: 'third_party_logos/faunadb.svg' },
	{ name: 'Gdrive', src: 'third_party_logos/gdrive.svg' },
	{ name: 'Gmail', src: 'third_party_logos/gmail.svg' },
	{ name: 'Linkding', src: 'third_party_logos/linkding.svg' },
	{ name: 'Mastodon', src: 'third_party_logos/mastodon.svg' },
	{ name: 'Mysql', src: 'third_party_logos/mysql.svg' },
	{ name: 'Postgres', src: 'third_party_logos/postgres.svg' },
	{ name: 'Slack', src: 'third_party_logos/slack.svg' },

	{ name: 'Appwrite', src: 'third_party_logos/appwrite.svg' },
	{ name: 'Datadog', src: 'third_party_logos/datadog.svg' },
	{ name: 'Funkwhale', src: 'third_party_logos/funkwhale.svg' },
	{ name: 'Github', src: 'third_party_logos/github.svg' },
	{ name: 'Gsheets', src: 'third_party_logos/gsheets.svg' },
	{ name: 'Hubspot', src: 'third_party_logos/hubspot.svg' },
	{ name: 'Mailchamp', src: 'third_party_logos/mailchamp.png' },
	{ name: 'Mongo', src: 'third_party_logos/mongo.svg' },
	{ name: 'Openai', src: 'third_party_logos/openai.svg' },
	{ name: 'Sendgrid', src: 'third_party_logos/sendgrid.svg' },
	{ name: 'Supabase', src: 'third_party_logos/supabase.svg' },

	{ name: 'Aws', src: 'third_party_logos/aws.svg' },
	{ name: 'Discord', src: 'third_party_logos/discord.svg' },
	{ name: 'Gcal', src: 'third_party_logos/gcal.svg' },
	{ name: 'Gitlab', src: 'third_party_logos/gitlab.svg' },
	{ name: 'Linkedin', src: 'third_party_logos/linkedin.svg' },
	{ name: 'Matrix', src: 'third_party_logos/matrix.svg' },
	{ name: 'Nextcloud', src: 'third_party_logos/nextcloud.svg' },
	{ name: 'S3', src: 'third_party_logos/s3.svg' },
	{ name: 'Stripe', src: 'third_party_logos/stripe.svg' }
];

export default function IntergrationList() {
	return (
		<LandingSection bgClass="bg-white">
			<div className="w-full gap-8 flex flex-col">
				<h1 className="tracking-tight leading-tight text-left font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-blue-600">
					Integrations
				</h1>
				<span className="text-lg text-gray-600 max-w-3xl">
					We have a growing list of integrations with third party services available on the Hub.
					Connect your apps and services to automate your workflows.
				</span>
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-8 gap-4">
					{integrations.map((item) => (
						<div
							key={item.name}
							className="bg-gray-50  col-span-1 flex justify-center rounded-xl border p-4"
						>
							<img src={item.src} alt={item.name} className="w-auto h-6" />
						</div>
					))}
				</div>
				<div className="flex">
					<a
						href="https://hub.windmill.dev/resources"
						type="button"
						target="_blank"
						className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
					>
						Explore more integrations on the Hub
						<ExternalLink className="ml-2 h-5" />
					</a>
				</div>
			</div>
		</LandingSection>
	);
}
