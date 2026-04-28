---
slug: native-sql-s3-input
title: S3Object input for native SQL scripts
tags: ['Script editor']
description: Pass S3 objects as parameters to PostgreSQL, MSSQL, MySQL, BigQuery and Snowflake scripts and read them with the dialect's JSON-table function.
version: v1.693.0
features:
  [
    'Declare an `(s3object)` argument in any native SQL dialect; the worker downloads the file and binds it as a JSON parameter.',
    'Auto-detects format from the object key extension: `.parquet`, `.csv`, `.json`/`.jsonl`.',
    'Symmetric to the existing `-- s3` output flag: a previous flow step writes to S3, the next native SQL step reads it as a parameter.',
  ]
docs: /docs/core_concepts/sql_to_s3_streaming#reading-s3-files-as-parameters
---

Native SQL scripts (PostgreSQL, MSSQL, MySQL, BigQuery, Snowflake) now accept `(s3object)` arguments. The worker downloads the file from workspace S3 storage, decodes it (Parquet and CSV via Apache Arrow; JSON/JSONL passed through), and binds it as a JSON parameter.

```sql
-- @P1 input_file (s3object)
SELECT id, name FROM OPENJSON(@P1) WITH (id INT '$.id', name NVARCHAR(255) '$.name');
```

This is the symmetric path to the existing `-- s3` output flag: a previous flow step writes a file to workspace S3 storage, and the next native SQL step picks it up by reference and reads it with the dialect's JSON-table function (`OPENJSON`, `jsonb_to_recordset`, `JSON_TABLE`, `JSON_QUERY_ARRAY`, `FLATTEN(input => PARSE_JSON(?))`).
