# Integrations & How to Create Them

Integrations are key on Windmill as they allow databases (internal & external) and service providers to interact.

Using Windmill, integrations are referred to as [resources and resource types](../core_concepts/3_resources_and_types/index.md). Each Resource has a Resource Type (RT for short) - for example MySQL, MongoDB, Slack, etc. - that defines the schema that the resource needs to implement.

We already have pre-set integrations (or resource types), the list is available on our [Hub](https://hub.windmill.dev/resources), [using Windmill](https://docs.windmill.dev/docs/getting_started/how_to_use_windmill) (most up-to-date version), and at the end of this article.

## You feel one integration is missing?

### Create one

You can **[create a resource type](../core_concepts/3_resources_and_types/index.md#create-a-resource-type)**. Use the "Add Property" button to add a field to the resource type. You can specify constraints for the field (a type, making it mandatory, specifying a default, etc). You can also view the schema by toggling the "As JSON" option.

Once you're comfortable with the new integration, we would be super grateful if you could **[share it on hub](https://docs.windmill.dev/docs/misc/share_on_hub)**.

### Ask for one

Just **[reach out to us](../misc/6_getting_help/index.md)**, we'll be happy to listen to your needs and add your request to the list of integrations.


## List of integations

<!-- Add gdocs when validated -->

| Service Provider | Description |
| --- | --- |
| [Airtable](./airtable.md) | Cloud collaboration platform for organizing and managing data |
| [Appwrite](./appwrite.md) | End-to-end backend server for web and mobile apps |
| [AWS](./aws.md) | Cloud computing platform offering various services like computing, storage, databases, and more |
| [Amazon S3](./aws-s3.md) | Cloud storage service |
| [Clickhouse](./clickhouse.md) | Open-source column-oriented database management system |
| [Cloudlare R2](./cloudlare-r2.md) | Cloud object storage service for data-intensive applications |
| [Datadog](./datadog.md) | Monitoring and analytics platform for cloud-scale infrastructure and applications |
| [Discord](./discord.md) | Voice, video, and text communication platform for gamers |
| [FaunaDB](./faunadb.md) | Serverless, document-oriented database for modern applications |
| [Funkwhale](./funkwhale.md) | Open-source music streaming and sharing platform |
| [Google Calendar (gcal)](./gcal.md) | Time-management and scheduling web application |
| [Google Cloud Platform (gcp)](./gcp.md) | Suite of cloud computing services for building and deploying applications |
| [Google Drive (gdrive)](./gdrive.md) | Cloud-based storage platform |
| [Gmail](./gmail.md) | Free email service provided by Google |
| [Google Sheets (gsheets)](./gsheets.md) | Online spreadsheet application |
| [GitHub](./github.md) | Web-based platform for version control and collaboration |
| [GitLab](./gitlab.md) | Web-based Git-repository manager with CI/CD capabilities |
| [HubSpot](./hubspot.md) | Inbound marketing, sales, and customer service platform |
| [LinkedIn](./linkedin.md) | Professional networking and career development platform |
| [Linkding](./linkding.md) | Bookmarking service that allows users to save and share links |
| [Mailchimp](./mailchimp.md) | All-in-one marketing platform for small businesses |
| [Mastodon](./mastodon.md) | Open-source, decentralized social network |
| [Matrix](./matrix.md) | Open standard for decentralized, real-time communication |
| [MongoDB](./mongodb.md) | NoSQL document-oriented database |
| [MySQL](./mysql.md) | Open-source relational database management system |
| [Neon.tech](./neon.md) | Open-source database management system |
| [OpenAI](./openai.md) | Research laboratory consisting of the for-profit OpenAI LP and the non-profit OpenAI Inc |
| [PostgreSQL](./postgresql.md) | Open-source object-relational database management system |
| [Redis](./redis.md) | In-memory data structure store used as a database, cache, and message broker |
| [RSS](./rss.md) | Web feed that allows users and applications to access updates to websites |
| [S3 compatible APIs](./s3.md) | Cloud-based object storage service designed to store and retrieve any amount of data. |
| [SendGrid](./sendgrid.md) | Email API and delivery service |
| [Slack](./slack.md) | Instant messaging and collaboration platform |
| [SMTP](./smtp.md) | Internet standard for electronic mail transmission |
| [Square](./square.md) | Payment and financial services company |
| [Stripe](./stripe.md) | Payment processing platform |
| [Supabase](./supabase.md) | Open-source Firebase alternative |
| [SurrealDB](./surrealdb.md) | Cloud-hosted NoSQL database |
| [Telegram](./telegram.md) | Cloud-based instant messaging and voice over IP service |
| [Toggl](./toggl.md) | Time tracking software |
| [Upstash](./upstash.md) | Serverless and low-latency Redis-compatible data store for modern applications |