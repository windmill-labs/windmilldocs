import React from 'react';
import LandingSection from './LandingSection';
import { ExternalLink, ArrowRight } from 'lucide-react';
import classNames from 'classnames';
import {
	SiGithub,
	SiMatrix,
	SiMysql,
	SiMicrosoftsqlserver,
	SiOpenai,
	SiTelegram,
	SiToggl,
	SiMqtt
} from 'react-icons/si';

const integrations = [
	// Databases
	{ name: 'PostgreSQL', src: 'third_party_logos/postgres.svg' },
	{ name: 'MySQL', src: 'third_party_logos/mysql.svg', Icon: SiMysql },
	{ name: 'MS SQL', src: 'third_party_logos/msssql.svg', Icon: SiMicrosoftsqlserver },
	{ name: 'BigQuery', src: 'third_party_logos/bigquery.svg' },
	{ name: 'Snowflake', src: 'third_party_logos/snowflake.svg' },
	{ name: 'ClickHouse', src: 'third_party_logos/clickhouse.svg' },
	{ name: 'DuckDB', src: 'third_party_logos/duckdb.svg' },
	{ name: 'FaunaDB', src: 'third_party_logos/faunadb.svg' },
	{ name: 'MongoDB', src: 'third_party_logos/mongodb.svg' },
	{ name: 'Neon', src: 'third_party_logos/neon.svg' },
	{ name: 'Redis', src: 'third_party_logos/redis.svg' },
	{ name: 'SurrealDB', src: 'third_party_logos/surrealdb.svg' },
	{ name: 'Redshift', src: 'third_party_logos/redshift.svg' },
	{ name: 'Excel', src: 'third_party_logos/excel.svg' },

	// Cloud & Storage
	{ name: 'AWS', src: 'third_party_logos/aws.svg' },
	{ name: 'Cloudflare-r2', src: 'third_party_logos/cloudflare.svg' },
	{ name: 'S3', src: 'third_party_logos/s3.svg' },
	{ name: 'Microsoft-Azure-Blob', src: 'third_party_logos/azure_blob.svg' },
	{ name: 'Nextcloud', src: 'third_party_logos/nextcloud.svg' },

	// Dev Tools & Platforms
	{ name: 'GitHub', src: 'third_party_logos/github.svg', Icon: SiGithub },
	{ name: 'GitLab', src: 'third_party_logos/gitlab.svg' },
	{ name: 'Supabase', src: 'third_party_logos/supabase.svg' },
	{ name: 'Appwrite', src: 'third_party_logos/appwrite.svg' },
	{ name: 'Svix', src: 'third_party_logos/svix.svg' },
	{ name: 'Linear', src: 'third_party_logos/linear.svg' },

	// Communication & Social
	{ name: 'Slack', src: 'third_party_logos/slack.svg' },
	{ name: 'Discord', src: 'third_party_logos/discord.svg' },
	{ name: 'Telegram', src: 'third_party_logos/telegram.svg', Icon: SiTelegram },
	{ name: 'Matrix', src: 'third_party_logos/matrix.svg', Icon: SiMatrix },
	{ name: 'Teams', src: 'third_party_logos/teams.svg' },
	{ name: 'Mailchimp', src: 'third_party_logos/mailchimp.svg' },
	{ name: 'Gmail', src: 'third_party_logos/gmail.svg' },
	{ name: 'Mastodon', src: 'third_party_logos/mastodon.svg' },
	{ name: 'LinkedIn', src: 'third_party_logos/linkedin.svg' },

	// Productivity & Workflow
	{ name: 'Airtable', src: 'third_party_logos/airtable.svg' },
	{ name: 'Gcal', src: 'third_party_logos/gcal.svg' },
	{ name: 'Gdrive', src: 'third_party_logos/gdrive.svg' },
	{ name: 'Gsheets', src: 'third_party_logos/gsheets.svg' },
	{ name: 'Notion', src: 'third_party_logos/notion.svg' },
	{ name: 'Toggl', src: 'third_party_logos/toggl.svg', Icon: SiToggl },
	{ name: 'HubSpot', src: 'third_party_logos/hubspot.svg' },

	// Monitoring & Analytics
	{ name: 'Datadog', src: 'third_party_logos/datadog.svg' },

	// IoT & Messaging
	{ name: 'MQTT', Icon: SiMqtt },
	{ name: 'Rss', src: 'third_party_logos/rss.svg' },

	// Payments & Commerce
	{ name: 'Square', src: 'third_party_logos/square.svg' },
	{ name: 'Stripe', src: 'third_party_logos/stripe.svg' },

	// Email & Notifications
	{ name: 'Sendgrid', src: 'third_party_logos/sendgrid.svg' },
	{ name: 'SMTP', src: 'third_party_logos/smtp.svg' },

	// Other/Utilities
	{ name: 'Funkwhale', src: 'third_party_logos/funkwhale.svg' },
	{ name: 'Upstash', src: 'third_party_logos/upstash.svg' },
	{ name: 'OpenAI', src: 'third_party_logos/openai.svg', Icon: SiOpenai },
];

export default function IntergrationList() {
	return (
		<LandingSection bgClass="">
			<div className="w-full gap-4 flex flex-col">
				<div className="w-full gap-4 flex flex-col">
					<div className={`text-5xl max-w-2xl font-normal tracking-tight leading-12 mb-2  pt-8`}>
						Integrations
					</div>
					<span className={`text-lg max-w-2xl mb-8  font-normal`}>
						Incorporate Windmill into any workflow with our 100+ integrations or build your own directly in the platform.
					</span>
				</div>

				<div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-12 gap-2 bg-gray-50 dark:bg-gray-900 p-8 rounded-lg">
					{integrations.map((item) => (
						<a
							key={item.name}
							className={classNames(
								'col-span-1 flex justify-center rounded-lg shadow-sm dark:border-gray-800 cursor-pointer transition-all',
								' hover:bg-gray-100 dark:hover:bg-gray-700 dark:bg-gray-800 bg-white'
							)}
							href={
								item.name === 'PostgreSQL' ||
								item.name === 'MySQL' ||
								item.name === 'BigQuery' ||
								item.name === 'MS SQL' ||
								item.name === 'Snowflake'
									? '/docs/getting_started/scripts_quickstart/sql'
									: `/docs/integrations/${item.name.toLowerCase().replace(/\s/g, '')}`
							}
							target="_blank"
							title={item.name}
						>
							{item.Icon ? (
								<item.Icon className="w-10 h-full text-gray-900 dark:text-white" />
							) : (
								<img src={item.src} alt={item.name} className="w-auto h-8 m-4 " loading="lazy" />
							)}
						</a>
					))}
					<a
						href="https://hub.windmill.dev/resources"
						type="button"
						target="_blank"
						className={`text-sm flex flex-row items-center gap-2 col-span-full mt-4 !no-underline text-gray-900 dark:text-white`}
					>
						Explore all integrations on the Hub
						<ArrowRight size={24} />
					</a>
				</div>
			</div>
		</LandingSection>
	);
}