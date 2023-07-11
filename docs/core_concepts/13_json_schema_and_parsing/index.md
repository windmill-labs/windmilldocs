# JSON Schema and Parsing

JSON Schema is a key component in Windmill for defining the structure and validation rules of JSON data. Windmill uses the JSON Schema standard ([2020-12 version](https://json-schema.org/draft/2020-12/schema)) for specifying the schema.

## JSON Schema Specification

A JSON Schema defines the properties, types, and constraints of a JSON object. It consists of the following components:

- `$schema`: The URL that points to the JSON Schema specification.
- `type`: The type of the JSON object (e.g., object, string, number).
- `properties`: A dictionary that defines the properties of the JSON object along with their descriptions and types.
- `required`: A list of the mandatory properties.
- Additional features and constraints can be added to the JSON Schema, such as validation against regular expressions or other custom formats.

## JSON Schema in Windmill

In Windmill, JSON Schema is used in various contexts, such as defining the input specification for scripts and flows, and specifying resource types.

Below is a simplified spec of JSON Schema. See [here for its full spec](https://json-schema.org/). Windmill is compatible with the [2020-12 version](https://json-schema.org/draft/2020-12/schema). It is not compatible with its most advanced features yet.

```json
{
	"$schema": "https://json-schema.org/draft/2020-12/schema",
	"type": "object",
	"properties": {
		"your_name": {
			"description": "The name to hello world to",
			"type": "string"
		},
		"your_nickname": {
			"description": "If you prefer a nickname, that's fine too",
			"type": "string"
		}
	},
	"required": []
}
```

Where the `properties` field contains a dictionary of arguments, and `required` is the list of all the mandatory arguments.

The property names need to match the arguments declared by the main function, in our example `your_name` and `your_nickname`. There is a lot you can do with [arguments, types, and validation](#json-schema), but to keep it short:

- Arguments can specify a type `integer`, `number`, `string`, `boolean`, `object`, `array` or `any`. The user's input will be validated against that type.
- One can further constraint the type by having the string following a RegEx or pattern, or the object to be of a specific [Resource Type](../../core_concepts/3_resources_and_types/index.md).
- Arguments can be made mandatory by adding them to the `required` list. In that case, the generated UI will check that user input provides required arguments.
- Each argument can have a description and default fields, that will appear in the generated UI.
- Some types have advanced settings.

### Script Parameters to JSON Schema

Scripts in Windmill have input parameters defined by a JSON Schema, where each parameter in the main function of a script corresponds to a field in the JSON Schema. This one-to-one correspondence ensures that the name of the argument becomes the name of the property, and most primitive types in Python and TypeScript have a corresponding primitive type in JSON and JSON Schema. During script execution, the parameters and their types are validated against the JSON Schema, ensuring that the input adheres to the expected format.

In Python:

| Python     | JSON Schema                      |
| ---------- | -------------------------------- |
| `str`      | `string`                         |
| `float`    | `number`                         |
| `str`      | `string`                         |
| `float`    | `number`                         |
| `int`      | `integer`                        |
| `bool`     | `boolean`                        |
| `dict`     | `object`                         |
| `list`     | `any[]`                          |
| `bytes`    | `string, encodingFormat: base64` |
| `datetime` | `str, format: date-time`         |
| `_`        | `any`                            |

In Deno:

| Deno                 | JSON Schema |
| -------------------- | ----------- |
| `string`             | `string`    |
| `object`             | `object`    |
| `boolean`            | `boolean`   |
| `bigint`             | `int`       |
| `number`             | `number`    |
| `string[]`           | `string[]`  |
| `("foo" \| "bar")[]` | `enum[]`    |
| ...                  | ...         |

However in Deno there also some special types that are specific to Windmill.
They are as follows:

| Windmill         | JSON Schema                                  |
| ---------------- | -------------------------------------------- |
| `wmill.Base64`   | `string`, encoding$$Format: `base64`         |
| `wmill.Email`    | `string`, format: `email`                    |
| `wmill.Sql`      | `string`, format: `sql`                      |
| `<ResourceType>` | `object`, format: `resource-{resource_type}` |

The `<ResourceType>` is any type that has a matching resource_type in the workspace (more details [here](../3_resources_and_types/index.md#using-resources)). Note that the CamelCase of the type is converted to the snake_case.
`Base64` and `Email` are actually a type alias for `string`, and `Resource` is a
type alias for an `object`. They are purely type hints for the Windmill parser.

The `sql` format is specific to Windmill and replaces the normal text field with
a monaco editor with SQL support.

:::info

The equivalent of the type `Postgresql` in Python is the
following:

```python
my_resource_type = dict

def main(x: my_resource_type):
  ...
```

:::

The JSON Schema of a script's arguments is visible and can be modified from the `Customize` menu.

![Json schema script](./schema_script.gif 'Json schema script')

### Flows Parameters and JSON Schema

Flows in Windmill have input parameters defined by a JSON Schema. Each argument of the `Flow Input` section corresponds to a field in the JSON Schema. The parameters and their types are validated against the JSON Schema during flow execution.

The JSON Schema of a script's arguments can be modified in the "Customize Inputs" section of the `Input` menu. The schema is visible from the `OpenFlow JSON` section, in particular the "Input Schema" tab.

<video
    className="border-2 rounded-xl object-cover w-full h-full dark:border-gray-800"
    controls
    id="main-video"
    src="/videos/schema_flows.mp4"
/>

Inline scripts of flows & apps use an autogenerated JSON Schema that is implicitly used by the frontend.

### Resource Types and JSON Schema

Resource types in Windmill are associated with JSON Schemas. A resource type defines the structure and constraints of a resource object. JSON Schema is used to validate the properties and values of a resource object against the specified resource type.

<video
    className="border-2 rounded-xl object-cover w-full h-full dark:border-gray-800"
    controls
    id="main-video"
    src="/videos/schema_rt.mp4"
/>

## Advanced Settings

Some arguments' types can be given advanced settings that will affect the inputs' [auto-generated UI](../../core_concepts/6_auto_generated_uis/index.md) and JSON Schema.

Here is an example on how to define a python list as an enum of strings using the `Customize` menu.

<video
    className="border-2 rounded-xl object-cover w-full h-full dark:border-gray-800"
    controls
    id="main-video"
    src="/videos/advanced_parameters_enum.mp4"
/>

<br/>

Below is the list of all available advanced settings for each argument type:

| Type    | Advanced Configuration                                                                                                                    |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Integer | No advanced configuration for this type.                                                                                                  |
| Number  | No advanced configuration for this type.                                                                                                  |
| String  | - File (base64) &#124; Enum &#124; Format: email, hostname, uri, uuid, ipv4, yaml, sql &#124; Pattern (Regex)                             |
| Boolean | No advanced configuration for this type.                                                                                                  |
| Object  | Advanced settings are [Resource Types](../3_resources_and_types/index.md).                                                                |
| Array   | - Items are strings &#124; Items are strings from an enum &#124; Items are objects (JSON) &#124; Items are numbers &#124; Items are bytes |
| Any     | No advanced configuration for this type.                                                                                                  |
