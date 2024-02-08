import React from 'react';
import LandingSection from './LandingSection';
import { ExternalLink } from 'lucide-react';
import classNames from 'classnames';
import {
	SiGithub,
	SiLinkedin,
	SiMatrix,
	SiMysql,
	SiMicrosoftsqlserver,
	SiOpenai,
	SiTelegram,
	SiToggl,
	SiBigquery
} from 'react-icons/si/index';

const integrations = [
	{ name: 'PostgreSQL', src: 'third_party_logos/postgres.svg' },
	{ name: 'MySQL', src: 'third_party_logos/mysql.svg', Icon: SiMysql },
	{ name: 'MSSQL', src: 'third_party_logos/msssql.svg', Icon: SiMicrosoftsqlserver },
	{ name: 'BigQuery', src: 'third_party_logos/bigquery.svg' },
	{ name: 'Snowflake', src: 'third_party_logos/snowflake.svg' },
	{ name: 'GitHub', src: 'third_party_logos/github.svg', Icon: SiGithub },
	{ name: 'GitLab', src: 'third_party_logos/gitlab.svg' },
	{ name: 'Supabase', src: 'third_party_logos/supabase.svg' },
	{ name: 'Slack', src: 'third_party_logos/slack.svg' },
	{ name: 'Airtable', src: 'third_party_logos/airtable.svg' },
	{ name: 'Appwrite', src: 'third_party_logos/appwrite.svg' },
	{ name: 'AWS', src: 'third_party_logos/aws.svg' },
	{ name: 'ClickHouse', src: 'third_party_logos/clickhouse.svg' },
	{ name: 'Cloudflare-r2', src: 'third_party_logos/cloudflare.svg' },
	{ name: 'Datadog', src: 'third_party_logos/datadog.svg' },
	{ name: 'Discord', src: 'third_party_logos/discord.svg' },
	{ name: 'FaunaDB', src: 'third_party_logos/faunadb.svg' },
	{ name: 'Funkwhale', src: 'third_party_logos/funkwhale.svg' },
	{ name: 'Gcal', src: 'third_party_logos/gcal.svg' },
	{ name: 'Gdrive', src: 'third_party_logos/gdrive.svg' },
	{ name: 'Gmail', src: 'third_party_logos/gmail.svg' },
	{ name: 'Gsheets', src: 'third_party_logos/gsheets.svg' },
	{ name: 'HubSpot', src: 'third_party_logos/hubspot.svg' },
	{ name: 'LinkedIn', src: 'third_party_logos/linkedin.svg' },
	{ name: 'Mailchimp', src: 'third_party_logos/mailchimp.svg' },
	{ name: 'Mastodon', src: 'third_party_logos/mastodon.svg' },
	{ name: 'Matrix', src: 'third_party_logos/matrix.svg', Icon: SiMatrix },
	{ name: 'MongoDB', src: 'third_party_logos/mongodb.svg' },
	{ name: 'Neon', src: 'third_party_logos/neon.svg' },
	{ name: 'Nextcloud', src: 'third_party_logos/nextcloud.svg' },
	{ name: 'OpenAI', src: 'third_party_logos/openai.svg', Icon: SiOpenai },
	{ name: 'Redis', src: 'third_party_logos/redis.svg' },
	{ name: 'Rss', src: 'third_party_logos/rss.svg' },
	{ name: 'S3', src: 'third_party_logos/s3.svg' },
	{ name: 'Sendgrid', src: 'third_party_logos/sendgrid.svg' },
	{ name: 'SMTP', src: 'third_party_logos/smtp.svg' },
	{ name: 'Square', src: 'third_party_logos/square.svg' },
	{ name: 'Stripe', src: 'third_party_logos/stripe.svg' },
	{ name: 'SurrealDB', src: 'third_party_logos/surrealdb.svg' },
	{ name: 'Telegram', src: 'third_party_logos/telegram.svg', Icon: SiTelegram },
	{ name: 'Toggl', src: 'third_party_logos/toggl.svg', Icon: SiToggl },
	{ name: 'Upstash', src: 'third_party_logos/upstash.svg' }
];

export default function IntergrationList() {
	return (
		<LandingSection bgClass="">
			<div className="w-full gap-8 flex flex-col">
				<h1 className="tracking-tight leading-tight text-left font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-blue-600">
					Integrations
				</h1>

				<span className={classNames('text-lg max-w-3xl', 'text-gray-600 dark:text-gray-200')}>
					We have a growing list of integrations with third party services available on the Hub.
					<br />
					Connect your apps and services to automate your workflows.
				</span>

				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-12 gap-4">
					{integrations.map((item) => (
						<a
							key={item.name}
							className={classNames(
								'col-span-1 flex justify-center rounded-xl border dark:border-gray-800 cursor-pointer transition-all',
								' hover:bg-gray-100 dark:hover:bg-gray-700 dark:bg-gray-800'
							)}
							href={
								item.name === 'PostgreSQL' ||
								item.name === 'MySQL' ||
								item.name === 'BigQuery' ||
								item.name === 'MSSQL' ||
								item.name === 'Snowflake'
									? '/docs/getting_started/scripts_quickstart/sql'
									: `/docs/integrations/${item.name.toLowerCase().replace(/\s/g, '')}`
							}
							target="_blank"
						>
							{item.Icon ? (
								<item.Icon className="w-10 h-full text-gray-900 dark:text-white" />
							) : (
								<img src={item.src} alt={item.name} className="w-auto h-8 m-4" loading="lazy" />
							)}
						</a>
					))}
				</div>
				<div className="flex">
					<a
						href="https://hub.windmill.dev/resources"
						type="button"
						target="_blank"
						className="!no-underline hover:text-white inline-flex items-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
					>
						Explore all integrations on the Hub
						<ExternalLink className="ml-2 h-5" />
					</a>
				</div>
			</div>
		</LandingSection>
	);
}
