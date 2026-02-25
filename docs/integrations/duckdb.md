---
description: How do I use DuckDB with Windmill? Run analytical SQL queries on S3, Parquet, CSV and JSON data.
---

# DuckDB integration

[DuckDB](https://duckdb.org/) is an open-source, in-process SQL OLAP database management system designed for fast analytical query workloads.

Windmill supports seamless integration with DuckDB, allowing you to manipulate data from S3 (csv, parquet, json), [Azure Blob Storage](./microsoft-azure-blob.md), BigQuery, PostgreSQL, and MySQL.

DuckDB in Windmill supports automatic column detection on S3 objects. You can query S3 paths directly without wrapping them in `read_parquet()` — for example `SELECT col1, col2 FROM 's3:///file.parquet'` — and the SQL parser will infer the referenced columns. The standard `read_parquet()`, `read_csv()`, and `read_json()` table functions also support column detection when used with S3 paths.

<video
	className="border-2 rounded-lg object-cover w-full h-full dark:border-gray-800"
	autoPlay
	controls
	id="main-video"
	src="/videos/duckdb_video.mp4"
/>
<br />

![Integration between DuckDB and Windmill](../assets/integrations/duckdb.png 'Run a DuckDB script with Windmill')

## Azure Blob Storage support

DuckDB scripts in Windmill can read from and write to [Azure Blob Storage](./microsoft-azure-blob.md). When Azure Blob is configured as a [workspace storage](../core_concepts/38_object_storage_in_windmill/index.mdx), DuckDB can use the same storage paths to query and write data in Parquet, CSV, or JSON format.

This works with the same S3-compatible path syntax, and requires an Azure Blob storage resource to be configured in the workspace.

To get started, check out the [SQL Getting Started section](/docs/getting_started/scripts_quickstart/sql#duckdb-1).
