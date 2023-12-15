# Airtable Integration

There are two resources associated with [Airtable](https://www.airtable.com/). Both are required to use Airtable's API from Windmill.

## Airtable Account

<video
 className="border-2 rounded-xl object-cover w-full h-full dark:border-gray-800"
  autoPlay
  loop
  controls
  src="/videos/adding_airtable_resource.mp4"
/>
<br/>

You'll need to land on Airtable's <a href="https://airtable.com/create/tokens" rel="nofollow">Developer hub</a> from where click on "API key" and paste it on Windmill.

| Property | Type   | Description      | Default           | Required | Where to find                             |
| -------- | ------ | ---------------- | ----------------- | -------- | ----------------------------------------- |
| apiKey   | string | Airtable API key | keyXXXXXXXXXXXXXX | true     | Airtable Account > API > Generate API Key |

## Airtable Table

<video
    className="border-2 rounded-xl object-cover w-full h-full dark:border-gray-800"
    autoPlay
    loop
    controls
    src="/videos/adding_airtable_table.mp4"
/>
<br/>

Now specify Airtable which databse and table you want to interact with:

- **Database ID** can be found on the the URL of the page. It starts with "app" and ends before the next "/". e.g. appcy7pfdzgJIhto.
- **Table name** is the name of the tab. By default it is called "Table 1".

| Property  | Type   | Description                                    | Required | Where to find                              |
| --------- | ------ | ---------------------------------------------- | -------- | ------------------------------------------ |
| baseId    | string | Unique identifier for a specific Airtable base | True     | Page URL                                   |
| tableName | string | Name of an individual table within that base   | True     | In Airtable. Name of the tab of a database |

<br/><br/>

Your resource can be used [passed as parameters](../core_concepts/3_resources_and_types/index.mdx#passing-resources-as-parameters-to-scripts-preferred) or [directly fetched](../core_concepts/3_resources_and_types/index.mdx#fetching-them-from-within-a-script-by-using-the-wmill-client-in-the-respective-language) within [scripts](../script_editor/index.mdx), [flows](../flows/1_flow_editor.mdx) and [apps](../apps/0_app_editor/index.mdx).

<video
	className="border-2 rounded-xl object-cover w-full h-full dark:border-gray-800"
	controls
	src="/videos/add_resources_variables.mp4"
/>

<br/>

:::tip

Find some pre-set interactions with Airtable on the [Hub](https://hub.windmill.dev/integrations/airtable).

Feel free to create your own Airtable scripts on [Windmill](../getting_started/00_how_to_use_windmill/index.mdx).

:::
