# Neon.tech integration

[Neon.tech](https://neon.tech/) is an open-source cloud database platform that provides fully managed PostgreSQL databases with high availability and scalability.

As a Postgres database service provider, Neon.tech follows the regular Postgres protocol and therefore can be integrated as any [PostgreSQL resource](../getting_started/0_scripts_quickstart/5_sql_quickstart/index.mdx).

<video
    className="border-2 rounded-xl object-cover w-full h-full dark:border-gray-800"
    controls
    id="main-video"
    src="/videos/neon_integration.mp4"
/>

<br/>

1. Sign-up to Neon's <a href="https://console.neon.tech/sign_in" rel="nofollow" >Cloud App</a> or [Self-Host](https://community.neon.tech/t/can-neon-be-self-hosted/51) it.

2. [Set up a project and add data](https://neon.tech/docs/manage/projects).

3. Get a [Connection string](https://neon.tech/docs/connect/query-with-psql-editor). You can obtain it connection string from the Connection Details widget on the Neon Dashboard: select a branch, a role, and the database you want to connect to and a connection string will be constructed for you.

4. From Windmill, add your Neon.tech connection string as a [Postgresql resource](https://hub.windmill.dev/resource_types/114/postgresql) and [Execute queries](https://hub.windmill.dev/scripts/postgresql/1294/execute-query-and-return-results-postgresql).

:::tip

Adding the connection string as a Postgres resource requires to parse it.

<br/>

For example, for `psql postgres://daniel:<password>@ep-restless-rice.us-east-2.aws.neon.tech/neondb`, that would be:

```json
{
	"host": "ep-restless-rice.us-east-2.aws.neon.tech",
	"port": 5432,
	"user": "daniel",
	"dbname": "neondb",
	"sslmode": "require",
	"password": "<password>"
}
```

Where the sslmode should be "require" and Neon uses the default PostgreSQL port, `5432`.

:::
