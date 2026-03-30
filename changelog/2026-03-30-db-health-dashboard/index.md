---
slug: db-health-dashboard
title: DB Health Diagnostic Dashboard
tags: ['Instance Settings', 'Monitoring']
description: New on-demand database diagnostic dashboard for superadmins. Surfaces database size, job retention health, large job results, connection pool status, vacuum/bloat stats, slow queries, and datatable sizes — all from within Instance Settings.
features:
  [
    'On-demand DB health diagnostics accessible from Instance Settings > Monitoring > DB Health.',
    'Database size overview with top 15 tables by size.',
    'Job retention health: compares oldest completed job age to retention_period_secs with green/yellow/red status.',
    'Large job results: top 10 biggest result payloads (> 1 KB) with configurable scan depth (10k–500k jobs).',
    'Connection pool utilization with status indicators.',
    'Table maintenance: dead tuple ratios, last autovacuum/autoanalyze timestamps.',
    'Slow queries from pg_stat_statements (graceful degradation when extension not installed).',
    'Datatable breakdown: per-table size and estimated row count for instance-stored datatables.',
  ]
docs: /docs/advanced/instance_settings#db-health
---

Windmill now includes an on-demand DB health diagnostic dashboard, available to superadmins under **Instance Settings > Monitoring > DB Health**.

Click **Run Diagnostics** to execute lightweight, read-only queries that surface actionable insights about your database. This is particularly useful for diagnosing common issues like databases growing to 1TB+, slow jobs, or connection pool exhaustion.

![DB Health dashboard](./db_health.png)

## Diagnostics

- **Database Size**: Total size and top 15 tables by size
- **Job Retention**: Oldest job age vs retention period, with status indicators when cleanup falls behind
- **Large Job Results**: Top 10 largest result payloads among recent jobs, with configurable scan depth
- **Connection Pool**: Pool utilization, idle connections, and active PostgreSQL connections
- **Table Maintenance**: Dead tuple ratios and vacuum timestamps for the top 15 tables
- **Slow Queries**: Top 10 by mean execution time (requires `pg_stat_statements`)
- **Datatables**: Instance-stored datatable sizes and row count estimates

All queries are read-only and use `LIMIT` clauses to avoid impacting production performance.
