# Rich Display Rendering

The result renderer in Windmill supports rich display rendering, allowing you to customize the display format of your results. By leveraging specific formats, you can display images, files, tables, HTML, JSON, and more.

## Rich display formats

This feature is useful if you want to display an image, a GIF, a file, or specify the filename for a rich result.

If the result is an object/dict with a single key (except for `approval`, which needs 3), you can leverage the following rich results:

| Type       | Description                                                 | Example                                                                                                              |
| ---------- | ----------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| json       | Render the value as a JSON                                  | `return { "json": { "a": 1 } }`                                                                                      |
| table-col  | Render the value as a column in a table                     | `return { "table-col": { "foo": [42, 8], "bar": [38, 12] }}`                                                         |
| table-row  | Render the value as a row in a table                        | `return { "table-row": [ "foo", "bar" ]}`                                                                            |
| html       | Render the value as HTML                                    | `return { "html": "<div>...</div>" }`                                                                                |
| png        | Render the value as a PNG image                             | `return { "png": { "content": encode(image) } }` or `return { "png": encode(image) }`                                |
| file       | Render an option to download the file                       | `return { "file": { "content": encode(file), "filename": "data.txt" } }`                                             |
| jpeg       | Render the value as a JPEG image                            | `return { "jpeg": { "content": encode(image) } }` or `return { "jpeg": encode(image) }`                              |
| gif        | Render the value as a GIF image                             | `return { "gif": { "content": encode(image) } }` or `return { "gif": encode(image) }`                                |
| error      | Render the value as an error message                        | `return { "error": { "name": "418", "message": "I'm a teapot" }}`                                                    |
| approval   | Render an approval and buttons to Resume or Cancel the step | `return { "resume": "https://example.com", "cancel": "https://example.com", "approvalPage": "https://example.com" }` |
| svg        | Render the value as an SVG image                            | `return { "svg": "<svg>...</svg>" }`                                                                                 |
| markdown   | Render the value as Markdown                                | `return { "markdown": "## Hello World" }` or `return { "md": "## Hello World" }`                                     |
| render_all | Render all the results                                      | `return { "render_all": [ { "json": { "a": 1 } }, { "table-col": { "foo": [42, 8], "bar": [38, 12] }} ] }`           |

**Regarding the tables**: If the result is a list whose first element is also a list, it will display the result as a table. If the result is a dict/object where every value is an array, it will also be displayed as a table, with the key as the column name.

For example:

```ts
import { encode } from 'https://deno.land/std@0.82.0/encoding/base64.ts';

export async function main() {
	const url = 'https://source.unsplash.com/featured/300x201';
	const resp = await fetch(url);
	const buff = await resp.arrayBuffer();
	const data = encode(buff);
	return {
		png: {
			content: data
		}
	};
}
```

## Rich table display

The rich table display will be enabled for [scripts](../../script_editor/index.mdx) or [flows](../../flows/1_flow_editor.mdx) when:

- The result is an array of objects.
- The result has a 'table-col' key.

![Default](./default.png 'Rich table display')

### Interactions

The rich display renderer also supports interactions. Interactions are a way to display a result and allow the user to interact with it. For example, you can display a table and allow the user to sort it by clicking on the column headers.

The features are:

- Search.
- Hide/show columns.
- Sort by column (ascending/descending): Only enabled if the column is sortable, i.e. if the column is a number or a string.
- Pagination.
- Download as CSV. If the user selected rows, it will download the selected rows as CSV. If no rows are selected, it will download the entire table as CSV.
- Download as JSON.

<video
	className="border-2 rounded-xl object-cover w-full h-full dark:border-gray-800"
	controls
	src="/videos/rich_table_display.mp4"
/>

### Example

Try with this [Python](../../getting_started/0_scripts_quickstart/2_python_quickstart/index.mdx):

```py
import requests
from typing import Any, Dict


def main() -> Dict[str, Any]:

    url = "https://jsonplaceholder.typicode.com/posts"
    response = requests.get(url)
    data = response.json()
    return data
```