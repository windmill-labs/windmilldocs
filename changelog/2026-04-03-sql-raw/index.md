---
slug: sql-raw
title: sql.raw for dynamic SQL fragments
tags: ['Script editor']
description: Use sql.raw() in the TypeScript client to inline dynamic SQL fragments like table and column names into data table and DuckLake queries.
features:
  [
    'sql.raw(value) inlines a string directly into SQL without parameterization.',
    'Available on both wmill.datatable() and wmill.ducklake().',
    'Useful for dynamic table/column names that cannot be bound as parameters.',
  ]
docs: /docs/core_concepts/persistent_storage/data_tables#sqlraw-for-dynamic-sql-fragments
---

The TypeScript client now exposes `sql.raw(value)` for inlining dynamic SQL fragments (like table or column names) into queries. The value is spliced verbatim instead of becoming a parameterized `$N` binding.

```ts
const sql = wmill.datatable();
await sql`SELECT * FROM ${sql.raw(table)} WHERE age > ${age}`.fetch();
```
