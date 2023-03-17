---
slug: supabase-authentication-and-rls-protected-tables-on-windmill
title: Use Supabase Authentication on Windmill to query RLS protected tables
authors: [adamkov]
tags: [supabase, authentication, rls, postgresql, windmill, integrate, connect, v2]
image: ./0-header.png
---

This example shows how to use Supabase Authentication on Windmill to query tables which has
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
DROP TABLE IF EXISTS my_table;

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

### Fork the example app

Now it's time to create an app in Windmill. In order to skip creating it from scratch, we will use
the [Supabase Authentication Example][supabase-auth-example] from the Hub, specifically made for
this example. It is a simple app that allows users to sign in on one page and see the data on
another. Click "Edit/Run in Windmill" to open the app in the editor.

![Example app](./2-wm-default.png 'Example app')

## Frontend only

The first option - which is also implemented in the example app - is to only use frontend scripts.
This is the simpler way to achieve the goal, but it has some drawbacks. The main one is that their
is no type safety, so you have to be familiar with the Supabase API and the data structure of your
table.

### Supabase credentials

Once you are on the Windmill App Editor, click the `Login` script in the "Runnables" list on the
bottom and paste in the URL and the public anon API key of your Supabase project. You can find
them in the "API" menu of the "Project Settings" page in your Supabase project.

![Supabase project settings](./1-sb-settings.png 'Supabase project settings')

### Try the app

Now when you login with the credentials of a Supabase user, the `Login` script will be executed,
which creates a Supabase client with an `Authorization` header attached and saves it to the local
state of the app. When the authentication is done, the `Load data` _background script_ will take
the newly created client from the state and use it to query the data. After everything is loaded,
you should be navigated to the "Data" tab.

## Involving the backend

Another approach would be to only pass the `access_token` to the scripts and create a Supabase
client in each one. This requires a bit more boilerplate code, but it has the advantage of using
TypeScript and therefore IntelliSense.

:::info

In case you wonder, you can't just pass the Supabase client directly to the scripts as an
argument, because it will be converted to a JSON object and it will lose its methods in the
process.

:::

### Create the backend scripts

:::tip

You should use the [example app](#fork-the-example-app) ([link][supabase-auth-example]) from the
Hub as a starting point for this approach as well, because it already has all the components needed
and we'll only have to update the attached scripts.

:::

Start by selecting the "Login" button component and click "Clear" on the attached `Login` runnable.

![Clear the attached script](./3-wm-clear-script.png 'Clear the attached script')

Now create a new script by clicking "Create an inline script", select Deno as the language and call
it `Login`. Paste in the following code, which will sign in to Supabase with given credentials and
return the `access_token` and `refresh_token`:

```typescript
import { Resource } from 'https://deno.land/x/windmill@v1.76.0/mod.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.10.0';

export async function main(auth: Resource<'supabase'>, email: string, password: string) {
	const client = createClient(auth.supabaseUrl, auth.supabaseKey);
	const { data } = await client.auth.signInWithPassword({ email, password });
	return {
		access_token: data?.session?.access_token,
		refresh_token: data?.session?.refresh_token
	};
}
```

:::info

The `Resource` type is used to define the type of the `auth` argument. It is a special type that
defines the structure of many resources that are available in Windmill. In this case, it is a
`supabase` resource, which means it will hold the URL and the public anon API key of your Supabase
project. Read the [Supabase credentials](#supabase-credentials) section to see how to obtain them.

:::

To make the script work, we need to pass in the arguments. Create a new `supabase` resource if you
don't have one - you can find instructions in the creation form as well. Then for the `email` and
`password` arguments, select the `Connect` input type and choose the `result` value of their
respective components. You can see the final result in the screenshot below.

![Pass in arguments](./4-wm-arguments.png 'Pass in arguments')

Next, delete the `Load data` background script and create a new one with the same name and Deno as
the language. Paste in the following code, which will create a Supabase client with the given
`access_token` and use it to query the data:

```typescript
import { Resource } from 'https://deno.land/x/windmill@v1.76.0/mod.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.10.0';

export async function main(auth: Resource<'supabase'>, access_token: string) {
	if (!access_token) {
		return [];
	}
	const client = createClient(auth.supabaseUrl, auth.supabaseKey, {
		global: { headers: { Authorization: `bearer ${access_token}` } }
	});
	const { data } = await client.from('my_table').select();
	return data;
}
```

You'll need to pass the arguments to this script as well. Use the same `supabase` resource for the
`auth` input as for the `Login` script. For the `access_token` argument, select the `Connect` input
type and choose the `result.access_token` value of the `Login` button component. The final setup
should look something like this:

![Data loading arguments](./5-wm-data-args.png 'Data loading arguments')

Now we need to update the table on the "Data" tab to use the results from the `Load data` script. To
do that, go to the "Data" page, select the table component and click "Disconnect" on the input. Then
select "Connect" and choose the `result` value of the `Load data` background script.

There is one last step to make things more convenient: we need to run the `Load data` script and
switch tabs automatically after logging in. So first, let's create a new background script using
JavaScript as the language. This will be responsible for the tab switch, which can be achieved
with this short code snippet:

```javascript
setTab('a', 1);
```

:::tip

The first argument of the `setTab` functon is the ID of the tab group component that you want to
update, the second argument is the 0 based index of the tab that you want to switch to.

:::

Finally, select the `Login` button component and scroll down to the "Recompute others" section in
the settings. Select both background scripts like in the screenshot below.

![Run scripts after another](./6-wm-recompute.png 'Run scripts after another')

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
			<td style={{borderBottomWidth: '2px'}}>Secret API keys can be used</td>
		</tr>
		<tr>
			<td rowspan="1" style={{fontWeight: 700}}>Cons</td>
			<td>No type safety</td>
			<td>More boilerplate code</td>
		</tr>
	</tbody>
</table>

<!-- Links -->

[supabase-auth-example]: https://hub.windmill.dev/apps/9/supabase-authentication-example
