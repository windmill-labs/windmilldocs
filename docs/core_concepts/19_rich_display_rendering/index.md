# Rich Display Rendering

The result renderer in Windmill supports rich display rendering, allowing you to customize the display format of your results. By leveraging specific formats, you can display images, files, tables, HTML, JSON, and more.

This feature is useful if you want to display an image, a GIF, a file, or specify the filename for a rich result.

If the result is an object/dict with a single key (except for `approval`, which needs 3), you can leverage the following rich results:

| Type      | Description                                                 | Example                                                                                                       |
| --------- | ----------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| json      | Render the value as a JSON                                  | `return { "json": { "a": 1 } }`                                                                                      |
| table-col | Render the value as a column in a table                     | `return { "table-col": { "foo": [42, 8], "bar": [38, 12] }}`                                                         |
| table-row | Render the value as a row in a table                        | `return { "table-row": [ "foo", "bar" ]}`                                                                            |
| html      | Render the value as HTML                                    | `return { "html": "<div>...</div>" }`                                                                                |
| png       | Render the value as a PNG image                             | `return { "png": { "content": encode(image) } }` or `return { "png": encode(image) }`                                |
| file      | Render an option to download the file                       | `return { "file": { "content": encode(file), "filename": "data.txt" } }`                                             |
| jpeg      | Render the value as a JPEG image                            | `return { "jpeg": { "content": encode(image) } }` or `return { "jpeg": encode(image) }`                              |
| gif       | Render the value as a GIF image                             | `return { "gif": { "content": encode(image) } }` or `return { "gif": encode(image) }`                                |
| error     | Render the value as an error message                        | `return { "error": { "name": "418", "message": "I'm a teapot" }}`                                                    |
| approval  | Render an approval and buttons to Resume or Cancel the step | `return { "resume": "https://example.com", "cancel": "https://example.com", "approvalPage": "https://example.com" }` |
| svg       | Render the value as an SVG image                            | `return { "svg": "<svg>...</svg>" }`                                                                                 |

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
