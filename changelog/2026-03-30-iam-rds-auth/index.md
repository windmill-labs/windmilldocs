---
slug: iam-rds-auth
title: IAM authentication for RDS PostgreSQL resources
tags: ['PostgreSQL', 'Resources']
description: PostgreSQL resources can now use AWS IAM authentication instead of static passwords. Workers generate short-lived tokens automatically using IRSA, EKS Pod Identity, or EC2 Instance Profiles.
features:
  [
    'IAM authentication for PostgreSQL resources: enable use_iam_auth on a resource to replace static passwords with short-lived IAM tokens.',
    'Supports all AWS credential methods: IRSA, EKS Pod Identity, and EC2 Instance Profiles — auto-detected by the worker.',
    'SSL is enforced automatically for IAM connections.',
    'Optional region field on the resource, falls back to AWS_REGION env var.',
  ]
docs: /docs/integrations/postgresql
ee: true
---

PostgreSQL resources now support AWS IAM authentication. Instead of storing a static database password, you can enable `use_iam_auth` on the resource and the worker will generate a short-lived IAM token at connection time.

This is useful for organizations that want to avoid long-lived database credentials and leverage their existing AWS IAM infrastructure for database access control.

## Setup

1. Enable IAM authentication on your RDS/Aurora instance
2. Create a database user with the `rds_iam` role:
   ```sql
   CREATE USER myuser WITH LOGIN;
   GRANT rds_iam TO myuser;
   ```
3. Grant `rds-db:connect` IAM permissions to your worker's role
4. Create a PostgreSQL resource with `use_iam_auth: true`, setting host, user, and dbname — password is ignored

The worker automatically picks up AWS credentials from the environment (IRSA, Pod Identity, or Instance Profile). The `region` field is optional if `AWS_REGION` is already set.

This feature requires Windmill Enterprise Edition.
