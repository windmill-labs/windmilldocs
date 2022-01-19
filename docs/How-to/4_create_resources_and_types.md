---
id: create_resources
title: Create resources
---

# Create resources and resource types

Each resource has a **resource type** (for example MySQL, MongoDB, Slack, etc),
that defines the schema that any resource of this type needs to implement.
Schemas implement the [json-schema specification](https://json-schema.org/).

## Create a resource

To create a resource using an existing type, go to the **Resources** page, then
**Add a resource**:

![Add a resource](../assets/how_to/add_resource.png)

Just like most objects in Windmill, resources have a path that define their
permissions (also see [ownership path prefix](../reference#owner)).

Each resource has a **resource type**, that defines what fields that resource
contains.

![Add resource example](../assets/how_to/add_resource_mysql.png)

Resources commonly need to access secrets or re-use
[variables](variables_and_secrets), for example password or API tokens. To
insert a variable into a resource, use **Insert variable** and select a
variable. A variable name will look like `$VAR:<NAME_OF_VAR>`. When resources
are called from a script, the variable reference will be replaced by its value.

Tip: It's a good practice to link a script template to resources, so that users
can easily get started with it. You can use markdown in the description field to
add a link, for example:

```md
[example script with this resource](/scripts/add?template=script/template/path)
```

## Create a resource type

Windmill comes preloaded with a few common resource types (databases, SMTP,
etc). Resource types can easily be defined using a wizard. From the **resources
page**, click Add type.

![Create resource type](../assets/how_to/add_resource_type.png)

Use the Add arguments button to add a field to the resource type. You can
specify constraints for the field (a type, making it mandatory, specifying a
default, etc). You can also view the schema using the advanced tab:

![Resource type schema view](../assets/how_to/resource_type_advanced.png)
