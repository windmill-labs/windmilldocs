---
slug: supabase-authentication-and-rls-protected-tables-on-windmill
title: Use Supabase Authentication on Windmill to query RLS protected tables
authors: [adamkov]
tags: [supabase, authentication, rls, postgresql, windmill, integrate, connect, v2]
image: ./0-header.png
---

This example shows how to use Supabase Authentication on Windmill to query tables which have
[RLS](https://supabase.com/docs/guides/auth/row-level-security) enabled. It can be achieved in two
ways: using scripts executed on the **server** and a new experimental method where Supabase would be
queried by scripts executed in the **browser** directly.

<!--truncate-->

:::info

This guide assumes that you already have a Supabase project with users that can
authenticate to your database. We will use email and password as the method of authentication for
the sake of simplicity.

:::

![Integration between Supabase and Windmill](./0-header.png 'Use Supabase Auth with Windmill')

## Preface

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

## Option 1: Using backend scripts

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

Some scripts take `auth` as an argument of type `Resource<'supabase'>`. [Resource][resource-doc] is
a special type in Windmill that are treated accordingly. The `supabase` type
contains the URL and the public API key of your Supabase project. Read the
[Supabase credentials](#supabase-credentials) section to see how to obtain them.

![Pass in the auth argument](./2-wm-args.png 'Pass in the auth argument')

### Try the app

Now when you login with the credentials of a Supabase user, the script attached to the
button component will be executed, which signs in to Supabase and returns the given `access_token`
and `refresh_token`. Every script that is dependant on the token will be executed after the
sign in script.

```typescript
// Hub script: Authenticate with email and password (Supabase)
import { Resource } from 'https://deno.land/x/windmill@v1.76.0/mod.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.10.0';

export async function main(auth: Resource<'supabase'>, email: string, password: string) {
	const client = createClient(auth.url, auth.key);
	const { data, error } = await client.auth.signInWithPassword({ email, password });
	if (error) {
		return {
			access_token: undefined,
			refresh_token: undefined,
			error: error.message
		};
	}
	return {
		access_token: data?.session?.access_token,
		refresh_token: data?.session?.refresh_token,
		error: undefined
	};
}
```

:::info

This script was imported from [Windmill Hub][hub-supabase-auth] but you could also copy the code
and paste it into an "Inline script".

:::

If the authentication is successful, the `Load data` and `Open Data tab`
_background scripts_ will run right after. `Load data` also receives the `access_token` and
creates an authenticated Supabase client, which is used to query the database.

```typescript
// Background script: Load data
import { Resource } from 'https://deno.land/x/windmill@v1.76.0/mod.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.10.0';

export async function main(auth: Resource<'supabase'>, access_token: string) {
	if (!access_token) {
		return [];
	}
	const client = createClient(auth.url, auth.key, {
		global: { headers: { Authorization: `bearer ${access_token}` } }
	});
	const { data } = await client.from('my_table').select();
	return data;
}
```

:::tip

You can find a more [generalised version of the data fetching script][hub-supabase-fetch]
on the Hub.

:::

```typescript
// Background script: Open Data tab
if (!k?.result?.error) {
	setTab('a', 1);
}
```

## Option 2 (experimental): Using frontend scripts

The second - and more experimental - option is to only use frontend scripts.
This is the simpler way to achieve the goal, but it has some drawbacks. The main one is obviously
that everything will be available to the client, so you shouldn't use any secrets in frontend
scripts. They are also a bit less convenient for the developers as it is pure JavaScript, meaning
there is no type safety, so they have to be familiar with the Supabase API and the data structure
of your table.

We have another [Supabase Authentication Example][supabase-auth-fe-example] on the Hub that uses
_only frontend scripts_. Click "Edit/Run in Windmill" to open the app in the editor.

![Example app with frontend scripts only](./3-wm-default-fe.png 'Example app with frontend scripts only')

The only setup you need to do is to update the `Login` _inline script_ with the **URL** and the
**public API key** of your Supabase project. Refer to the
[Supabase credentials](#supabase-credentials) section to see how to obtain them.

### Try the app

Now when you login with the credentials of a Supabase user, the `Login` _inline script_ will be
executed, which creates a Supabase client with an `Authorization` header attached and saves it to
the local state of the app.

```typescript
// Inline script: Login
state.supabase = {
	// You'll need to insert the URL and the public API key of your Supabase project here
	url: '',
	publicKey: '',
	client: state?.supabase?.client ?? undefined,
	error: undefined
};

const sb = await import('https://esm.sh/@supabase/supabase-js@2.10.0');
const client = sb.createClient(state.supabase.url, state.supabase.publicKey);
const { data, error, error_description } = await client.auth.signInWithPassword({
	// In frontend scripts you can directly reference components by their IDs
	email: i.result,
	password: j.result
});
if (data?.session?.access_token) {
	state.supabase.client = sb.createClient(state.supabase.url, state.supabase.publicKey, {
		global: { headers: { Authorization: `bearer ${data.session.access_token}` } }
	});
} else {
	state.supabase.client = undefined;
	state.supabase.error = error_description ?? error ?? undefined;
}
```

When the authentication is done, the `Load data` _background script_ will take
the newly created client from the state and use it to query the data. After everything is loaded,
you should be navigated to the "Data" tab.

```typescript
// Background script: Load data
if (!state.supabase.error) {
	try {
		const { data, error, error_description } = await state.supabase.client
			.from('my_table')
			.select();
		const err = error_description ?? error ?? undefined;
		if (err) {
			throw Error(err);
		}
		state.data = data;
		setTab('a', 1);
	} catch (err) {
		state.supabase.error = err;
		state.data = [];
	}
} else {
	state.data = [];
}
```

## Comparison

<table>
	<thead>
		<tr>
			<th></th>
			<th>Frontend scripts</th>
			<th>Backend scripts</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td rowspan="3" style={{fontWeight: 700, borderBottomWidth: '2px'}}>Pros</td>
			<td>Doesn't consume execution units</td>
			<td>Secrets are not exposed to the client</td>
		</tr>
		<tr>
			<td>Simple</td>
			<td>Premade scripts can be imported from <a href="https://hub.windmill.dev" target="_blank">Windmill Hub</a></td>
		</tr>
		<tr>
			<td style={{borderBottomWidth: '2px'}}></td>
			<td style={{borderBottomWidth: '2px'}}>Type safety</td>
		</tr>
		<tr>
			<td rowspan="3" style={{fontWeight: 700}}>Cons</td>
			<td>Everything is exposed to the client</td>
			<td>Consumes execution units</td>
		</tr>
		<tr>
			<td>Not every browser support ESM imports</td>
			<td>Possibly more verbose scripts</td>
		</tr>
		<tr>
			<td>No type safety</td>
			<td></td>
		</tr>
	</tbody>
</table>

<!-- Links -->

[supabase-auth-fe-example]: https://hub.windmill.dev/apps/9/supabase-authentication-example---frontend-scripts-version
[supabase-auth-be-example]: https://hub.windmill.dev/apps/11/supabase-authentication-example---backend-scripts-version
[resource-doc]: https://docs.windmill.dev/docs/core_concepts/resources_and_types
[hub-supabase-auth]: https://hub.windmill.dev/scripts/supabase/1540/authenticate-with-email-and-password-supabase
[hub-supabase-fetch]: https://hub.windmill.dev/scripts/supabase/1512/fetch-data-supabase
