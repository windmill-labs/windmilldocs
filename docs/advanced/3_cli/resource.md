# Resources

## Listing resources

The `wmill resource` list command is used to list all resources in the remote workspace.

```bash
wmill resource
```

## Pushing a resource

The `wmill resource push` command is used to push a local resource, overriding any existing remote versions.

```bash
wmill resource push <file_path> <remote_path>
```

### Arguments

| Argument      | Description                                          |
| ------------- | ---------------------------------------------------- |
| `file_path`   | The path to the resource file to push.               |
| `remote_path` | The remote path where the resource should be pushed. |

### Resource specification

We support both JSON and YAML files. The structure of the file is as follows:

```yaml
value: <value>
description: <description>
resource_type: <resource_type>
is_oauth: <is_oauth>
```

```JSON
{
    "value": "<value>",
    "description": "<description>",
    "resource_type": "<resource_type>",
    "is_oauth": "<is_oauth>"
}
```

- value (required): Represents the actual content or value of the resource.
- description (optional): A string providing additional information or a description of the resource.
- resource_type (required): A resource type
- is_oauth (optional, deprecated): This property is deprecated and should not be used.

See the [resource types](./../../core_concepts/3_resources_and_types/index.mdx) section for a list of supported resource types.
