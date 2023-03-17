---
slug: supabase-authentication-and-rls-protected-tables-on-windmill
title: Use Supabase Authentication on Windmill to query RLS protected tables
authors: [adamkov]
tags: [supabase, authentication, rls, postgresql, windmill, integrate, connect, v2]
image: ./0-header.png
---

This example shows how to use Supabase Authentication on Windmill to query tables which have
[RLS](https://supabase.com/docs/guides/auth/row-level-security) enabled. It can be achieved in two
ways: using **frontend scripts only** or **involving the backend** as well.

<!--truncate-->

:::info

This guide assumes that you already have a Supabase project with users that can
authenticate to your database. We will use email and password as the method of authentication for
the sake of simplicity.

:::

![Integrattion between Supabase and Windmill](./0-header.png 'Use Supabase Auth with Windmill')

## Preface

:::tip

TLDR comparison at the [end of the article](#comparison).

:::

In case you don't have a table, or just want to test out things first, run the following SQL
script to create the table `my_table`:

```sql
CREATE TABLE my_table(
  id UUID NOT NULL DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT (now() AT TIME ZONE 'utc'),
  type INT2 DEFAULT NULL,
  PRIMARY KEY(id)
);

ALTER TABLE my_table ENABLE ROW LEVEL SECURITY;

INSERT INTO my_table(type) VALUES (1), (1), (2);
```

The RLS policy used in this example can be set with the following SQL command:

```sql
CREATE POLICY "Enable reads for authenticated users only" ON "public"."my_table"
AS PERMISSIVE FOR SELECT
TO authenticated
USING (true)
```

### Supabase credentials

In both approaches you'll need the **URL** and the **public API key** of your Supabase
project. You can find them in the "API" menu of the "Project Settings" page in your Supabase project.

![Supabase project settings](./1-sb-settings.png 'Supabase project settings')

## Involving the backend

Let's start with the "backend scripts" approach by forking the
[Supabase Authentication Example][supabase-auth-be-example] from the Hub. Click "Edit/Run in
Windmill" to open the app in the editor. This option uses a pattern to only pass the `access_token`
to the scripts and create a Supabase client in each one. This requires a bit more boilerplate
code, but it has the advantage of using TypeScript and therefore IntelliSense.

:::info

In case you wonder, you can't just create one Supabase client and pass it directly to backend
scripts as an argument, because it will be converted to a JSON object and it will lose its methods
in the process. On the other hand, this makes it possible to use multiple programming languages in
the same app!

:::

There are two scripts that has an argument named `auth`, which is a [Resource][resource-doc] of
type `supabase`. This means it will hold the **URL** and the **public API key** of your
Supabase project. Read the [Supabase credentials](#supabase-credentials) section to see how to
obtain them. To make the scripts work, you need to create a new `supabase` resource if you don't
have one by clicking the plus sign - you can find instructions in the creation form as well.

![Pass in the auth argument](./2-wm-args.png 'Pass in the auth argument')

### Try the app

Now when you login with the credentials of a Supabase user, the `Login` script attached to the
button component will be executed, which signs in to Supabase and returns the given `access_token`
and `refresh_token`. If the authentication is successful, the `Load data` and `Open Data tab`
_background scripts_ will run right after. `Load data` also receives the `access_token` and
creates an authenticated Supabase client, which is used to query the database.

## Frontend only

The second - and more experimental - option is to only use frontend scripts.
This is the simpler way to achieve the goal, but it has some drawbacks. The main one is that their
is no type safety, so you have to be familiar with the Supabase API and the data structure of your
table.

There is another [Supabase Authentication Example][supabase-auth-fe-example] on the Hub that uses
only frontend scripts. Click "Edit/Run in Windmill" to open the app in the editor.

![Example app with frontend scripts only](./3-wm-default-fe.png 'Example app with frontend scripts only')

### Try the app

Now when you login with the credentials of a Supabase user, the `Login` script will be executed,
which creates a Supabase client with an `Authorization` header attached and saves it to the local
state of the app. When the authentication is done, the `Load data` _background script_ will take
the newly created client from the state and use it to query the data. After everything is loaded,
you should be navigated to the "Data" tab.

## Comparison

<table>
	<thead>
		<tr>
			<th></th>
			<th>Frontend only</th>
			<th>With backend</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td rowspan="2" style={{fontWeight: 700, borderBottomWidth: '2px'}}>Pros</td>
			<td>Simple</td>
			<td>Type safety</td>
		</tr>
		<tr>
			<td style={{borderBottomWidth: '2px'}}>Less execution units consumed</td>
			<td style={{borderBottomWidth: '2px'}}>Secret API keys could be used</td>
		</tr>
		<tr>
			<td rowspan="1" style={{fontWeight: 700}}>Cons</td>
			<td>No type safety</td>
			<td>More boilerplate code</td>
		</tr>
	</tbody>
</table>

<!-- Links -->

[supabase-auth-fe-example]: https://hub.windmill.dev/apps/9/supabase-authentication-example---frontend-scripts-version
[supabase-auth-be-example]: https://hub.windmill.dev/apps/11/supabase-authentication-example---backend-scripts-version
[resource-doc]: https://docs.windmill.dev/docs/core_concepts/resources_and_types
