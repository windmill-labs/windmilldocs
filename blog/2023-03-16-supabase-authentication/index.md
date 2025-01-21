---
slug: supabase-authentication-and-rls-protected-tables-on-windmill
title: Use Supabase Authentication on Windmill to query RLS protected tables for external apps
authors: [adamkov]
tags: [supabase, authentication, rls, postgresql, windmill, integrate, connect, v2]
image: ./0-header.png
---

This example demonstrates how to create a user facing app in Windmill and use Supabase Authentication to query
tables which have [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security) enabled.
We have two options to query the database: executing code on the **server** (**backend script**),
or using a new experimental method, where code runs in the end user's **browser**
directly (**frontend script**).

<!--truncate-->

:::info

One of our clients, [Teracapital][tera] has been using Supabase with Windmill for their
applications. This example is a simplified version of how they serve protected data to their own
clients.

:::

<video
className="border-2 rounded-xl object-cover w-full h-full"
loop
autoPlay
muted
src="/videos/supabase-auth/app-preview.mp4"
/>
<br/>

:::info

This guide assumes that you already own a Supabase project with users that can
authenticate to your database. We will use email and password as the method of authentication for
the sake of simplicity.

:::

## Create a new [Windmill App](/docs/getting_started/apps_quickstart)

:::tip

You may skip this step if you are interested only in the end result, as we provide pre-built apps
for both approaches on our community website, [Windmill Hub][hub]. You can find the examples at the
start of each option.

:::

The general approach is to use the "Tabs" component to separate the sign in step from the display
of data. Tabs allow us to associate sets of nested components with labels, meaning the login step
will have it's own page on the first tab. A successful login will return an access token, then we
can send authenticated requests to the database using said token on the second tab.

The passing of credentials works a bit differently in the two approaches, so first, create a base
"skeleton" app. Go to the <a href="https://app.windmill.dev/" rel="nofollow">Windmill cloud</a> Home page by click "App" in the top right corner.
Let's add our first component:

1. Click on "Tabs" in the right-hand panel to add it to the canvas.
1. Select "invisibleOnView" for the _Tabs Kind_ setting (this will hide the tab row when the app is in
   _preview_ or _published_ mode).
1. Rename the tabs to "Login" and "Data".

When the Tabs are ready, add two components inside the "Login" tab:

- an "Email input" component
- a "Password" component

<video
className="border-2 rounded-xl object-cover w-full h-full"
controls
src="/videos/supabase-auth/add-inputs.mp4"
/>
<br/>

We should label the inputs to make their purpose clear for everyone. Add a "Text" component above
each input and name them "Email" and "Password".

<video
className="border-2 rounded-xl object-cover w-full h-full"
controls
src="/videos/supabase-auth/add-input-labels.mp4"
/>
<br/>

Now add a "Button" component to do the login. Feel free to customize the button to your liking.

<video
className="border-2 rounded-xl object-cover w-full h-full"
controls
src="/videos/supabase-auth/add-login-button.mp4"
/>
<br/>

Let's handle login errors. The "Button" component has a "Click" event that we can use to run a
script. The script will try to authenticate the user with given credentials and return either an
access token or an error (this will be implemented at a later step). The value is stored in the
**result** of the component. In short, the `result` field on the button will hold the value
returned from the attached script. We can use this result to determine whether the authentication
was successful or not.

Add a "Text" component under the button to display the possible error
messages. The input of the "Text" component is a simple
[JavaScript template string][js-template-string] by default. Windmill allows to hook into the
**output** of components through their IDs. In our case, `f` is the ID of the login button, so the
template string will look like this:

```js
${f?.result?.error ?? ' '}
```

<video
className="border-2 rounded-xl object-cover w-full h-full"
controls
src="/videos/supabase-auth/add-warning.mp4"
/>
<br/>

:::info

As you can see in the video, we used a [TailwindCSS class](https://tailwind.build/classes) to style the color of the text. If you are
not familiar with TailwindCSS, you can also use direct CSS styles. For that, we recommend using the
**Rich Editor**. We provide a built-in color picker and many other features to help you customize
your app.

:::

With that, the skeleton of the "Login" tab is ready. Let's switch to the "Data" tab and add a
"Table" component to display the data. You can leave the placeholder data for now, because we will
fetch the data differently in the two approaches.

<video
className="border-2 rounded-xl object-cover w-full h-full"
controls
src="/videos/supabase-auth/add-data-table.mp4"
/>
<br/>

At this point your skeleton app has every component we need to start working on the [scripts](/docs/getting_started/scripts_quickstart). Now is
a good time to save your progress. If you want to create an app for each approach (using
**backend scripts** and **frontend scripts**), you can use this skeleton as a template for both
from the Home page.

![App skeleton template](./use-app-template.png.webp 'Use skeleton app as template')

## Configuring Supabase

To set up a new table in your project for testing purposes, execute the provided SQL script to create a basic table named `my_table`.

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

<video
className="border-2 rounded-xl object-cover w-full h-full"
loop
autoPlay
muted
src="/videos/supabase-auth/create-supabase-table.mp4"
/>
<br/>

Currently `my_table` is only accessible with the secret API key of your project. Executing the
following SQL command will allow users to read from `my_table` with the public key as well, but
only if they are authenticated:

```sql
CREATE POLICY "Enable reads for authenticated users only" ON "public"."my_table"
AS PERMISSIVE FOR SELECT
TO authenticated
USING (true)
```

### Supabase credentials

In both approaches you'll need the **URL** and the **public API key** of your Supabase
project. You can find them in the "API" menu of the "Project Settings" page in your Supabase project.

:::tip

Find more help on our [Supabase integration](/docs/integrations/supabase) tutorial.

:::

![Supabase project settings](./1-sb-settings.png.webp 'Supabase project settings')

## Option 1: Using backend scripts

:::tip

You can find the pre-built app for this approach in the
[Supabase Authentication Example][supabase-auth-be-example] on the Hub. Click "Edit/Run in
Windmill" to open the app in the editor.

:::

Let's start with the **backend scripts** approach. This option uses a pattern to only pass the
`access_token` to the scripts and create a Supabase client in each one. This requires a bit more
boilerplate code, but it has the advantage of using TypeScript and therefore accessing
IntelliSense.

### User authentication script

Select the login button and click "Select a script or flow". Open the "Hub Scripts" tab and find
the Supabase script named "Authenticate with email and password". All you have to do now is provide
the arguments for the script.

The `auth` argument is a special type that is a `Resource`. [Resources][resource-doc] take
integrations and bundle the most important data required by those integraions. The
`Supabase` type contains the URL and the public API key of your Supabase project. Read
the [Supabase credentials](#supabase-credentials) section to see how to obtain them.

:::tip

The [currently supported Resources][hub-resources] can be found on the Hub as well. This also means
you can share your own Resources with the community!

:::

The authentication script will always return an object with three properties:

- **`access_token`**: the access token of the user if the authentication _succeeded_, otherwise `undefined`
- **`refresh_token`**: the refresh token of the user if the authentication _succeeded_, otherwise `undefined`
- **`error`**: the error message if the authentication _failed_, otherwise `undefined`

:::caution

The Supabase `access_token` has a default expiration time of 1 hour. It is plenty enough for this
example, but in case you want to handle longer sessions, you can use the `refresh_token` to:

- Refresh the `access_token` periodically (like every 59 minutes).
- Authenticate the user again when a request returns a "JWT Expired" error.

:::

:::info

In case you wonder, you can't just create one Supabase client and pass it directly to backend
scripts as an argument. The arguments will be converted to a JSON object, so they will lose all
methods in the process. On the other hand, this makes it possible to use multiple programming
languages in the same app!

:::

<video
className="border-2 rounded-xl object-cover w-full h-full"
controls
src="/videos/supabase-auth/connect-login-script.mp4"
/>
<br/>

:::tip

Browse the [Hub][hub] to find more pre-made scripts for Supabase, Mailchimp, OpenAI, and many other
services. All of them can be imported directly into your Windmill projects.

:::

### Background runnables

A **background runnable** represents code that is not attached to any component. Background runnables
are most useful when you want to load data and pass that data to more than one component. In our
case however, we just want to decouple data fetching from the "Table" component that is going to
display the data.

Let's add the script that queries the database. We'll need to connect to the result of the login
script, so click the Login button to run it first. Windmill will update the shape of the result.

Create a new background runnable:

1. Choose Deno as the runtime.
1. Name the script "Load data".
1. Paste in the code below.
1. Turn off "Run on start".
1. Update the runnable arguments.

```typescript
// Background runnable: Load data
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.10.0';

type Supabase = {
	url: string;
	key: string;
};

export async function main(auth: Supabase, access_token: string) {
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

You can find a more [generalised version of this script][hub-supabase-fetch] as well on the Hub.

:::

<video
className="border-2 rounded-xl object-cover w-full h-full"
controls
src="/videos/supabase-auth/add-query-script.mp4"
/>
<br/>

We can add another background runnable to programmatically change the selected tab. Windmill provides
a utility function for **frontend scripts** called `setTab`. The first argument is the ID of the
"Tabs" component, the second one is the zero based index of the tab to select.

Create a new background runnable:

1. Choose JavaScript.
1. Name the script "Open Data tab".
1. Paste in the code below.
1. Turn off "Run on start".

```javascript
// Background runnable: Open Data tab
if (!f?.result?.error) {
	setTab('a', 1);
}
```

<video
className="border-2 rounded-xl object-cover w-full h-full"
controls
src="/videos/supabase-auth/add-tab-switch-script.mp4"
/>
<br/>

It would be nice to run the two background runnables after the login script has finished. We can do
just that by updating the "Recompute others" setting of the login button. This will make sure that
the "Load data" and "Open Data tab" scripts are executed each time the _login script_
successfully finished running.

<video
className="border-2 rounded-xl object-cover w-full h-full"
controls
src="/videos/supabase-auth/add-recompute.mp4"
/>
<br/>

### Display the data

Finally, we can display the data in the "Table" component. Connect the result of the "Load data"
script to the _Data Source_ of the table.

:::tip

Remember that you need to run scripts first to let Windmill update their results.

:::

<video
className="border-2 rounded-xl object-cover w-full h-full"
controls
src="/videos/supabase-auth/connect-table.mp4"
/>
<br/>

### Try the app

Now when you login with the credentials of a Supabase user, the script attached to the
button component will be executed, which signs in to Supabase and returns the given `access_token`
and `refresh_token`. Every script that is dependent on the token will be executed after the
login script, meaning the data will be fetched and the "Data" tab will be displayed.

<video
	className="border-2 rounded-lg object-cover w-full h-full"
	controls
	id="backend-video"
	src="/videos/supabase-auth/try-be-app.mp4"
/>
<br/>

## Option 2 (experimental): Using frontend scripts

:::tip

You can find the pre-built app for this approach in the
[Supabase Authentication Example][supabase-auth-fe-example] on the Hub. Click "Edit/Run in
Windmill" to open the app in the editor.

:::

The second - and more experimental - option is to only use **frontend scripts**.
This is the simpler way to achieve the goal, but it has some drawbacks:

- Everything will be available to the client - you **shouldn't use any secrets** in frontend
  scripts.
- Less convenient for the developers - frontend scripts use JavaScript, so there is no type safety.

### User authentication script

Select the login button and click "Create an inline script":

1. Choose JavaScript.
1. Name the script "Login".
1. Paste in the code below.
1. Update `url` and `publicKey` with the [values from your Supabase project](#supabase-credentials).

```javascript
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
	email: b.result,
	password: c.result
});
if (data?.session?.access_token) {
	state.supabase.client = sb.createClient(state.supabase.url, state.supabase.publicKey, {
		global: { headers: { Authorization: `bearer ${data.session.access_token}` } }
	});
} else {
	state.supabase.client = undefined;
	state.supabase.error = error_description ?? error?.message ?? error ?? undefined;
}
```

The "Login" script works as follows:

1. It saves the Supabase settings to the local state of the app.
1. It imports the Supabase client library (**warning:** not all browsers support ESM imports).
1. It sends a request to the Supabase API to sign in with credentials entered in the form.
1. If the request was _successful_, it creates a new Supabase client with the `access_token` attached
   to the `Authorization` header.
1. If the request _failed_, it saves the error message to the local state of the app.

<video
className="border-2 rounded-xl object-cover w-full h-full"
controls
src="/videos/supabase-auth/login-fe-script.mp4"
/>
<br/>

### Background runnable

As it was mentioned above, a **background runnable** represents code that is not attached to any
component. Background runnables are most useful when you want to load data and pass that data to more
than one component. In our case however, we just want to decouple data fetching from the "Table"
component that is going to display the data.

Create a new background runnable:

1. Choose JavaScript.
1. Name the script "Load data".
1. Paste in the code below.
1. Turn off "Run on start".

```javascript
// Background runnable: Load data
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

<video
className="border-2 rounded-xl object-cover w-full h-full"
controls
src="/videos/supabase-auth/data-fe-script.mp4"
/>
<br/>

Don't forget to recompute the "Load data" script after the "Login" script finished executing from
the login button.

<video
className="border-2 rounded-xl object-cover w-full h-full"
controls
src="/videos/supabase-auth/recompute-fe-script.mp4"
/>
<br/>

You also need to update the "Text" component below the login button, because the
success of an authentication is now represented by the `supabase` object saved in the local state.
Paste in the following code to the _Data Source_ of the "Text" component:

```javascript
${state?.supabase?.error ?? ' '}
```

### Display the data

Finally, we can display the data in the "Table" component. Connect `state.data` to the
_Data Source_ of the table.

:::tip

Remember that you need to run scripts first to let Windmill update their results.

:::

<video
className="border-2 rounded-xl object-cover w-full h-full"
controls
src="/videos/supabase-auth/connect-fe-data.mp4"
/>
<br/>

### Try the app

Now when you login with the credentials of a Supabase user, the `Login` _inline script_ gets
executed. This script creates a Supabase client with an `Authorization` header attached. The client
is then saved to the local state of the app.

After a successful authentication, the `Load data` _background runnable_ will take the newly created
client from the state and use it to query the data. When the data is loaded, you should be
navigated to the "Data" tab.

<video
	className="border-2 rounded-lg object-cover w-full h-full"
	controls
	id="backend-video"
	src="/videos/supabase-auth/try-fe-app.mp4"
/>
<br/>

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
			<td rowSpan="3" style={{fontWeight: 700, borderBottomWidth: '2px'}}>Pros</td>
			<td>Doesn't consume execution units</td>
			<td>Secrets are not exposed to the client</td>
		</tr>
		<tr>
			<td>Simple</td>
			<td>Premade scripts can be imported from <a href="https://hub.windmill.dev" >Windmill Hub</a></td>
		</tr>
		<tr>
			<td style={{borderBottomWidth: '2px'}}></td>
			<td style={{borderBottomWidth: '2px'}}>Type safety</td>
		</tr>
		<tr>
			<td rowSpan="3" style={{fontWeight: 700}}>Cons</td>
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

[tera]: https://www.teracapital.com.br/
[hub]: https://hub.windmill.dev
[hub-resources]: https://hub.windmill.dev/resources
[js-template-string]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
[supabase-auth-fe-example]: https://hub.windmill.dev/apps/9/supabase-authentication-example---frontend-scripts-version
[supabase-auth-be-example]: https://hub.windmill.dev/apps/11/supabase-authentication-example---backend-scripts-version
[resource-doc]: /docs/core_concepts/resources_and_types
[hub-supabase-auth]: https://hub.windmill.dev/scripts/supabase/1540/authenticate-with-email-and-password-supabase
[hub-supabase-fetch]: https://hub.windmill.dev/scripts/supabase/1512/fetch-data-supabase
