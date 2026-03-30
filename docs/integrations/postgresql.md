---
description: How do I connect PostgreSQL to Windmill? Query and manage Postgres databases from scripts and flows.
---

# PostgreSQL integration

[PostgreSQL](https://www.postgresql.org/) is an open-source object-relational database management system.

Windmill provides a framework to support PostgreSQL databases, either with native SQL scripts or through TypeScript for raw queries.

![Integration between PostgreSQL and Windmill](../assets/integrations/psql-0-header.png.webp 'Connect a PostgreSQL instance with Windmill')

Please refer to the [SQL Getting started section](../getting_started/0_scripts_quickstart/5_sql_quickstart/index.mdx).

---

## IAM authentication for AWS RDS and Aurora

:::info Enterprise

This feature is available on [Windmill Enterprise Edition](../misc/7_plans_details/index.mdx) only.

:::

Instead of using static passwords, you can authenticate to AWS RDS or Aurora PostgreSQL databases using [IAM database authentication](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/UsingWithRDS.IAMDBAuth.html). Windmill workers generate short-lived authentication tokens automatically, so no database password needs to be stored in the resource.

This works with any of the standard AWS credential methods:

- [IRSA](https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html) (IAM Roles for Service Accounts)
- [EKS Pod Identity](https://docs.aws.amazon.com/eks/latest/userguide/pod-identities.html)
- [EC2 Instance Profiles](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-ec2_instance-profiles.html)

### Setup

1. **Enable IAM authentication on your RDS instance.** In the AWS console, go to your RDS instance settings and enable IAM database authentication.

2. **Create a database user with the `rds_iam` role:**

```sql
CREATE USER myuser WITH LOGIN;
GRANT rds_iam TO myuser;
```

3. **Grant IAM permissions to your worker.** The IAM principal attached to your Windmill worker (via IRSA, Pod Identity, or Instance Profile) needs the `rds-db:connect` action. Example IAM policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "rds-db:connect",
      "Resource": "arn:aws:rds-db:<region>:<account-id>:dbuser:<dbi-resource-id>/<db-user-name>"
    }
  ]
}
```

4. **Create a PostgreSQL resource with IAM auth enabled.** Set `use_iam_auth` to `true` and fill in `host`, `user`, and `dbname`. The `password` field is ignored when IAM auth is enabled.

```json
{
  "host": "mydb.cluster-abc123.us-east-1.rds.amazonaws.com",
  "port": 5432,
  "user": "myuser",
  "dbname": "mydb",
  "sslmode": "require",
  "use_iam_auth": true,
  "region": "us-east-1"
}
```

The `region` field is optional if the `AWS_REGION` environment variable is set on the worker. SSL is enforced automatically for IAM connections.
