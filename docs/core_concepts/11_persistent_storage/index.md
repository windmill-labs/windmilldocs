# Persistent Storage

Persistent storage refers to any method of storing data that remains intact and accessible even after a system is powered off, restarted, or experiences a crash.

In the context of Windmill, the stakes are: **where to effectively store and manage the data manipulated by Windmill**? (ETL, data ingestion and preprocessing, data migration and sync etc.)

:::info TLDR

When it comes to storing data manipulated by Windmil, it is recommended to only store Windmill-specific elements ([resources](../3_resources_and_types/index.mdx), [variables](../2_variables_and_secrets/index.mdx) etc.). To store data, it is recommended to use external storage service providers that can be accessed from Windmill.

<br/>

This present document gives a list of trusted services to use alongside Windmill.

:::

<br/>

There are 4 kinds of persistent storage in Windmill:

1. [Small data](#within-windmill-not-recommended) that is relevant in between script/flow execution and can be persisted on Windmill itself.

2. [Big structured SQL data](#structured-databases-postgres-supabase-neontech) that is critical to your services and that is stored externally on an SQL Database or Data Warehouse.

3. [Object storage for large data](#large-data-files-s3-r2-minio) such as S3.

4. [NoSQL and document database](#key-value-stores-mongodb-atlas-redis-upstash) such as MongoDB and Key-Value stores.

## You already have your own database

If you already have your own database provided by a supported integration, you can easily connect it to Windmill.

If your service provider is already part of [our list of integrations](../../integrations/0_integrations_on_windmill.mdx), just add your database as a [resource](../../core_concepts/3_resources_and_types/index.mdx).

"If your service provider is not already integrated with Windmill, you can create a [new resource type](../../core_concepts/3_resources_and_types/index.mdx#create-a-resource-type) to establish the connection (and if you want, [share the schema on our Hub](../../misc/1_share_on_hub/index.md)).

## Within Windmill: not recommended

Windmill is not designed to store heavy data that extends beyond the execution of a script or flow. Indeed, for each computation the worker executing is not the same as the previous computation, so the data would have to be retrieved from another location.

Instead, Windmill is very convenient to use alongside data storage providers to manipulate big amounts of data.

There are however internal methods to persist data between executions of jobs.

### States and Resources

Within Windmill, you can use States and Resources as a way to store a transient state - that can be represented as small JSON.

#### States

[States](../3_resources_and_types/index.mdx#states) are actually resources (but excluded from the Workspace tab for clarity). They are used by scripts to keep data persistent between runs of the same script by the same trigger (schedule or user).

A state is an object stored as a resource of the resource type `state` which is meant to persist across distinct executions of the same script. This is what enables Flows to watch for changes in most event watching scenarios. The pattern is as follows:

- Retrieve the last state or, if undefined, assume it is the first
  execution.
- Retrieve the current state in the external system you are watching, e.g. the
  list of users having starred your repo or the maximum ID of posts on Hacker
  News.
- Calculate the difference between the current state and the last internal
  state. This difference is what you will want to act upon.
- Set the new state as the current state so that you do not process the
  elements you just processed.
- Return the differences calculated previously so that you can process them in
  the next steps. You will likely want to [forloop](../../flows/12_flow_loops.md) over the items and trigger
  one Flow per item. This is exactly the pattern used when your Flow is in the
  mode of "Watching changes regularly".

The convenience functions do this in TypeScript are:

- `getState()` which retrieves an object of any type (internally a simple
  Resource) at a path determined by `getStatePath`, which is unique to the user
  currently executing the Script, the Flow in which it is currently getting
  called in - if any - and the path of the Script
- `setState(value: any)` which sets the new state

#### Resources

States are a specific type of resource in Windmill where the type is `state` the path is automatically calculated for you based on the schedule path (if any) and the script path. In some cases, you want to set the path arbitrarily and/or use a different type than `state`. In this case, you can use the `setResource` and `getResource` functions. A same resource can be used across different scripts and flows.

- `setResource(value: any, path?: string, initializeToTypeIfNotExist?: string)`: which sets a resource at a given path. This is
  equivalent to `setState` but allows you to set an arbitrary path and chose a type other than state if wanted. [See api](https://deno.land/x/windmill/mod.ts?s=setResource)
- `getResource(path: string)`: gets a resource at a given path. [See api](https://deno.land/x/windmill/mod.ts?s=getResource)

The states can be seen in the [Resources](../3_resources_and_types/index.mdx) section with a
[Resource Type](../3_resources_and_types/index.mdx#create-a-resource-type) of `state`.

:::tip

Variables are similar to resources but have no types, can be tagged as `secret` (in which case they are encrypted by the workspace key) and can only store strings. In some situations, you may prefer `setVariable`/`getVariable` to resources.
:::

In conclusion `setState` and `setResource` are convenient ways to persist json between multiple script executions.

### Shared Directory

For heavier ETL processes or sharing data between steps in a flow, Windmill provides a [Shared Directory](../../flows/3_editor_components.mdx#shared-directory) feature.

The Shared Directory allows steps within a flow to share data by storing it in a designated folder.

:::caution

Although Shared Folders are recommended for persisting states within a flow, it's important to note that all steps are executed on the same worker and the data stored in the Shared Directory is strictly ephemeral to the flow execution.

:::

To enable the Shared Directory, follow these steps:

1. Open the `Settings` menu in the Windmill interface.
2. Go to the `Shared Directory` section.
3. Toggle on the option for `Shared Directory on './shared'`.

![Flow Shared Directory](../../assets/flows/flow_settings_shared_directory.png.webp)

Once the Shared Directory is enabled, you can use it in your flow by referencing the `./shared` folder. This folder is shared among the steps in the flow, allowing you to store and access data between them.

:::tip

Keep in mind that the contents of the `./shared` folder are not preserved across [suspends](../../flows/11_flow_approval.md) and [sleeps](../../flows/15_sleep.md). The directory is temporary and active only during the execution of the flow.

:::

## Structured Databases: Postgres (Supabase, Neon.tech)

For Postgres databases (best for structured data storage and retrieval, where you can define schema and relationships between entities), we recommend using Supabase or Neon.tech.

### Supabase

[Supabase](https://supabase.com/) is an open-source alternative to Firebase, providing a backend-as-a-service platform that offers a suite of tools, including real-time subscriptions, authentication, storage, and a PostgreSQL-based database.

1. Sign-up to Supabase's <a href="https://app.supabase.com/sign-up" rel="nofollow" >Cloud App</a> or [Self-Host](https://supabase.com/docs/guides/self-hosting) it.

2. [Create a new Supabase project](https://supabase.com/docs/guides/getting-started).

3. Get a [Connection string](https://supabase.com/docs/guides/database/connecting-to-postgres#finding-your-connection-string).

   - Go to the `Settings` section.
   - Click `Database`.
   - Find your Connection Info and Connection String. Direct connections are on port 5432.

4. From Windmill, add your Supabase connection string as a [Postgresql resource](https://hub.windmill.dev/resource_types/6/postgresql) and [Execute queries](https://hub.windmill.dev/scripts/postgresql/1294/execute-query-and-return-results-postgresql). Tip: you might need to set the `sslmode` to "disable".

<video
    className="border-2 rounded-xl object-cover w-full h-full dark:border-gray-800"
    controls
    id="main-video"
    src="/videos/supabase_postgres_integration.mp4"
/>

<br/>

You can also integrate Supabase [directly through its API](../../integrations/supabase.md#through-supabase-api).

:::tip

You can find examples and premade Supabase scripts on [Windmill Hub](https://hub.windmill.dev/integrations/supabase).

<br/>

More tutorials on Supabase:

- [How to Send Database Events From Supabase to Windmill](/blog/database-events-from-supabase-to-windmill)
- [Create an E-commerce backoffice](../../apps/7_app_e-commerce.md)
- [Create an Issue Tracker App with Supabase in 15 Minutes](/blog/create-issue-tracker-in-15-minutes)
- [Create an Issue Tracker App with Supabase - Part 2 Customize Your App](/blog/create-issue-tracker-part-2)
- [Use Supabase Authentication on Windmill to query RLS protected tables for external apps](/blog/supabase-authentication-and-rls-protected-tables-on-windmill)

:::

### Neon.tech

[Neon.tech](https://neon.tech/) is an open-source cloud database platform that provides fully managed PostgreSQL databases with high availability and scalability.

1. Sign-up to Neon's <a href="https://console.neon.tech/sign_in" rel="nofollow" >Cloud App</a> or [Self-Host](https://community.neon.tech/t/can-neon-be-self-hosted/51) it.

2. [Set up a project and add data](https://neon.tech/docs/tutorial/project-setup).

3. Get a [Connection string](https://neon.tech/docs/connect/query-with-psql-editor). You can obtain it connection string from the Connection Details widget on the Neon Dashboard: select a branch, a role, and the database you want to connect to and a connection string will be constructed for you.

4. From Windmill, add your Neon.tech connection string as a [Postgresql resource](https://hub.windmill.dev/resource_types/6/postgresql) and [Execute queries](https://hub.windmill.dev/scripts/postgresql/1294/execute-query-and-return-results-postgresql).

<video
    className="border-2 rounded-xl object-cover w-full h-full dark:border-gray-800"
    controls
    id="main-video"
    src="/videos/neon_integration.mp4"
/>

<br/>

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

## Large Data Files: S3, R2, MinIO

On heavier data objects & unstructured data storage, Amazon S3 (Simple Storage Service) and its alternatives Cloudflare R2 and MinIO are highly scalable and durable object storage service that provides secure, reliable, and cost-effective storage for a wide range of data types and use cases.

Amazon S3, Cloudflare R2 and MinIO all follow the same API schema and therefore have a [common Windmill resource type](https://hub.windmill.dev/resource_types/42/).

### Amazon S3

[Amazon S3](https://aws.amazon.com/s3/) (Simple Storage Service) is a scalable and durable object storage service offered by Amazon Web Services (AWS), designed to provide developers and businesses with an effective way to store and retrieve any amount of data from anywhere on the web.

<video
    className="border-2 rounded-xl object-cover w-full h-full dark:border-gray-800"
    controls
    id="main-video"
    src="/videos/s3_objects_in_bucket.mp4"
/>

<br/>

1. [Sign-up to AWS](https://aws.amazon.com/resources/create-account/).

2. [Create a bucket](https://docs.aws.amazon.com/AmazonS3/latest/userguide/create-bucket-overview.html) on S3.

3. [Integrate it to Windmill](../../integrations/aws-s3.md) by filling the [resource type details](https://hub.windmill.dev/resource_types/42) for S3 APIs.

Make sure the user associated with the resource has the [right policies allowed](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html) in AWS Identity and Access Management (IAM).

:::tip

You can find examples and premade S3 scripts on [Windmill Hub](https://hub.windmill.dev/integrations/s3).

:::

### Cloudflare R2

[Cloudflare R2](https://www.cloudflare.com/products/r2/) is a cloud-based storage service that provides developers and businesses with a cost-effective and secure way to store and access their data.

1. [Sign-up to Cloudflare](https://developers.cloudflare.com/fundamentals/account-and-billing/account-setup/create-account/)

2. [Create a bucket](https://developers.cloudflare.com/r2/get-started/) on R2.

3. [Integrate it to Windmill](../../integrations/cloudlare-r2.md) by filling the [resource type details](https://hub.windmill.dev/resource_types/42) for S3 APIs.

### MinIO

For best performance, [install MinIO locally](https://min.io/docs/minio/kubernetes/upstream/).

[MinIO](https://min.io/) is an open-source, high-performance, and scalable object storage server that is compatible with Amazon S3 APIs, designed for building private and public cloud storage solutions.

Then from Windmill, just [fill the S3 resource type](../../integrations/s3.md).

## Key-Value Stores: MongoDB Atlas, Redis, Upstash

Key-value stores are a popular choice for managing non-structured data, providing a flexible and scalable solution for various data types and use cases. In the context of Windmill, you can use MongoDB Atlas, Redis, and Upstash to store and manipulate non-structured data effectively.

### MongoDB Atlas

[MongoDB Atlas](https://www.mongodb.com/atlas/database) is a managed database-as-a-service platform that provides an efficient way to deploy, manage, and optimize MongoDB instances. As a document-oriented NoSQL database, MongoDB is well-suited for handling large volumes of unstructured data. Its dynamic schema enables the storage and retrieval of JSON-like documents with diverse structures, making it a suitable option for managing non-structured data.

To use MongoDB Atlas with Windmill:

1. [Sign-up to Atlas](https://www.mongodb.com/cloud/atlas/signup).

2. [Create a database](https://www.mongodb.com/basics/create-database).

3. [Integrate it to Windmill](../../integrations/mongodb.md) by filling the [resource type details](https://hub.windmill.dev/resource_types/22/).

:::tip

You can find examples and premade MonggoDB scripts on [Windmill Hub](https://hub.windmill.dev/integrations/mongodb).

:::

### Redis

[Redis](https://redis.io/) is an open-source, in-memory key-value store that can be used for caching, message brokering, and real-time analytics. It supports a variety of data structures such as strings, lists, sets, and hashes, providing flexibility for non-structured data storage and management. Redis is known for its high performance and low-latency data access, making it a suitable choice for applications requiring fast data retrieval and processing.

To use Redis with Windmill:

1. [Sign-up to Redis](https://redis.com/try-free/).

2. [Create a database](https://developer.redis.com/create).

3. [Integrate it to Windmill](../../integrations/redis.md) by filling the [resource type details](https://hub.windmill.dev/resource_types/22/) following the same schema as MongoDB Atlas.

### Upstash

[Upstash](https://upstash.com/) is a serverless, edge-optimized key-value store designed for low-latency access to non-structured data. It is built on top of Redis, offering similar performance benefits and data structure support while adding serverless capabilities, making it easy to scale your data storage needs.

To use Upstash with Windmill:

1. [Sign-up to Upstash](https://console.upstash.com/).

2. [Create a database](https://docs.upstash.com/redis).

3. [Integrate it to Windmill](../../integrations/upstash.md) by filling the [resource type details](https://hub.windmill.dev/resource_types/22/) following the same schema as MongoDB Atlas.
