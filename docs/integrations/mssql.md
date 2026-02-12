---
description: How do I connect MS SQL Server to Windmill? Query and manage SQL Server databases from scripts and flows.
---

# MS SQL integration

[MS SQL](https://www.microsoft.com/sql-server/sql-server-downloads) is a database management system.

Windmill provides a framework to support MS SQL databases, either with native SQL scripts or through TypeScript for raw queries.

![Integration between MS SQL and Windmill](../assets/integrations/windmill_and_mssql.png 'Connect a MS SQL instance with Windmill')

## Authentication methods

Windmill supports multiple authentication methods for MS SQL Server:

- **Username/Password**: Standard SQL Server authentication
- **Azure AD (Entra)**: OAuth-based authentication for Azure-hosted databases
- **Windows Integrated Authentication**: Kerberos-based authentication for Active Directory environments

For detailed setup instructions, including Windows Integrated Authentication configuration, refer to the [SQL Getting started section](../getting_started/0_scripts_quickstart/5_sql_quickstart/index.mdx#ms-sql).