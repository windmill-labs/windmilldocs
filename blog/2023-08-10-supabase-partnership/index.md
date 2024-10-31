---
authors: [henricourdent]
tags: ['Supabase', 'Partnership', 'Database']
image: ./0-header.png
---

# Windmill and Supabase partner for smooth integration between databases and internal tools

Windmill is proud to announce a partnership with [Supabase](https://supabase.com/) to easily integrate databases to interact with scripts, flows, and apps.

<!--truncate-->

Although we support multiple database providers, Supabase is by far the most recommended one due to its performance and security capabilities.

<br/>

![Supabase Windmill](./0-header.png)

This week, Supabase is celebrating their [8th Launch Week](https://supabase.com/launch-week). Today the team is launching their new Integrations Marketplace offering and asked us to exclusively preview this experience that allows you to connect your Supabase account with just a few clicks!

## Windmill for internal tools

Windmill is an [open-source](https://github.com/windmill-labs/windmill), blazing fast and scalable alternative to Retool, Airplane, Superblocks, n8n, Airflow, Prefect, Temporal to build all your internal tools (endpoints, workflows, UIs) through the combination of code (in TypeScript, Python, Go, PHP, Bash, SQL and Rust or any docker image) and low code builders. It embeds all-in-one:

- an **execution runtime** to execute functions at scale with low-latency and no overhead on a fleet of workers
- an **orchestrator** to compose functions into powerful flows at low-latency built with a low-code builder (or yaml if that's your thing)
- an **app builder** to build application and data-intensive dashboards built with low-code or JS frameworks such a React.

Examples of what can be built with Windmill include:

- **Scripts** that are deployed automatically into UIs, webhook endpoints and scheduled jobs.
- **Applicative workflows** such as the ones of Temporal, Airflow or Retool. Applicative workflows allow external APIs (Salesforce, Hubspot, Google Sheets), internal APIs and databases to talk to each other. Their logic can be complex and include approval steps and conditional branching.
- **Data-oriented ETLs** as you would find in tools such as Airflow, Dagster and Prefect. One notable difference is our TypeScript support thanks to Deno. Most common ETLs would be syncing transformed data to data warehouses (Snowflake, BigQuery, Redshift) and building reports out of data stores in the same data warehouses. And of course you can include more applicative steps in those ETLs.
- **Powerful apps and dashboards** that are internal or external-facing, using either a low-code builder similar to Retool or full react views / svelte. In either case, those apps do a mix of frontend logic and calling the scripts and flows directly.

There exists already quite a few [internal tool builders](/docs/compared_to/peers), with all their differences. Windmill focus on executing real code, extremely fast, reliably at scale, best/fastest workflow engine and best frontend builder.

## Supabase for secure and scalable databases

As seen, Windmill is very versatile and already does a lot to build internal tools.

That's a lot but it's not sufficient. Internal tools need storage, database are great storage. You can use resources, variables and states directly in Windmill to store data. If self-hosted, since it works on top of Postgres, you could reuse the same Postgres database that Windmill runs on. However for Cloud Apps, [Windmill is not designed to store heavy data](/docs/core_concepts/persistent_storage) that extends beyond the execution of a script or flow. Indeed, for each computation the worker executing is not the same as the previous computation, so the data would have to be retrieved from another location.

To give a smooth experience, instead of reinventing the wheel with a subpar experience, we decide to partner with the best database provider as a service, [Supabase](https://supabase.com/).

We believe Supabase is the perfect match for Windmill:

- Supabase is [open source](https://github.com/supabase/supabase), we are ourselves hard-believers (transparency, no lock in).
- You can query it with SQL, a proven and powerful query language [supported by Windmill](/docs/getting_started/scripts_quickstart/sql).
- It has a long track record of being used at scale.
- It’s the database of choice for transactional workloads, which is a great fit for scripts, flows or apps that require near-instant responses to queries.

## Supabase makes it easy to build incremental services

The connection is made possible through [Supabase's OAuth integration](https://supabase.com/docs/guides/platform/oauth-apps/authorize-an-oauth-app).

It feature helps you implement Sign-in with Supabase for your app, granting it full access to the [Management API](https://supabase.com/docs/reference/api/introduction) on behalf of users.

Concretely for us, it opens the door for endless possibilities for our joint users. You could manually create databases from Supabase's table editor, add values from Windmill, check them on Supabase ... or the other way around. If storage is specific to Supabase and processing large quantities of data is Windmill's strength, for database editing, Windmill and Supabase Table Editor are highly complementary and not exclusive.

<video
    className="border-2 rounded-xl object-cover w-full h-full dark:border-gray-800"
    controls
    src="/videos/supabase_wizard.mp4"
/>
