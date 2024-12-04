# Table

This is a introduction on how to use the Table component in Windmill.

![Table API](../../../assets/apps/4_app_component_library/table.png.webp)

## AgGrid vs Table component vs Database studio

In Windmill there are 3 table components: one simply called Table,
[AgGrid](../aggrid_table/index.md) and [Database studio](../../../apps/4_app_configuration_settings/database_studio.mdx).

The Table component is for most usecases. In it's simplest form it takes an
array of objects as input, and uses the key of the object as the header of the
table.

See bottom of this document for the current Limitations.
 
[AgGrid](../aggrid_table/index.md) component provides you with a lot of advanced features.

[Database studio](../../../apps/4_app_configuration_settings/database_studio.mdx) is a web-based database management tool. It allows you to display and edit the content of a database.

### Examples

:::info

[Table Showcase](https://hub.windmill.dev/apps/19/table-component-showcase) - See the hub for a app that showcases all Table options as working code
See below to copy/paste fast. Hopefully you then have the best from both world. Easy copy/paste, and working code you can look at
:::

## Table data (data source)

As in almost all the fields in the app, you can have either `static`,
`connected` or `eval` data.

**static** - a static json you defined.

**connected** - connect with a result of another script or component or the
state of the app.

**eval** - run a inline eval that can ref to state or script like connected.
eval lets you type instead of clicking. But you can also choose to ref to a
script from your workspace or create a inline script.

:::tip

You can not edit a result of a script, so if you want to later change the data
based on another component the recommendation is to store that data as a state.
:::

## Referring to data from the row to create a new row in the table

Sometimes you want to ref to table data in the table. E.g if you want to have a
select that is specify to each row using another field. This can be achieved
with the `row.value` and `row.index` properties.

You will find example of using `row.value` and `row.index`

### Initial state

:::info

The initial state is from
https://tanstack.com/table/v8/docs/api/core/table#initialstate but not all
states work, currently `columnVisibility`, `columnOrder`, `columnPinning` and
`columnSizing` is implemented.

pagination and search/filter is supported in the GUI, but not trough this
config.

So currently, there is grouping, row selection, sorting and expand that there is
not any support for

:::

#### Hide columns

By default the table components is showing all columns. You can hide columns
with the following syntax

In the `Inital State` field in the table config add:

```tsx
{
  "columnVisibility": {
    "id": false
  }
}
```

here we hide the column id.

### Reorder columns

By default the table components is showing columns in the order it is added to
the array. You can rearrange the order of the column with the following config

In the `Initial State` field in the table config add:

```tsx
{
  "columnOrder": [
    "name",
    "age",
    "id"
  ]
}
```

Here we rearrange the order so we have the "name" column first and then "age",
"id".

### columnPinning

In the `Initial State` field in the table config add:

```tsx
{
  "columnPinning": {
    "left": [
      "name"
    ],
    "right": [
      "id"
    ]
  }
}


```

### columnSizing

In the `Initial State` field in the table config add:

```tsx
{
  "columnSizing": {
    "id": 10,
    "name": 750,
    "age": 150
  }
}
```

Leave out the fields you do not need, you are only spes the desire behavior, it's still tanstack logic that do the final calculations.

## Search

**by component** - a nice feature of the table component is that it can do the
search for you based on the data in the component

**by runnable** - if you want to have programmatic control over the search. You
here need to have to use a script as the datasource and connect the tables
"search" key to the input of the script.

Please see the [Examples](#examples) for working code.

### Limits

- Button and Select/Dropdown is always in the last column called actions

## Not supported features

- Resizeable by the user
- Grouping
- sorting (But can be done by a transformer, but not the user)

:::info Transformer

If you want to do basic sorting, or edit the column header name from the script
you can use a Transformer script. See the
[documentation](../../../apps/3_app-runnable-panel.mdx#transformer)
for more information.

:::

If some of these features is important we recommend to use the
[AgGrid Component](../aggrid_table/index.md)
