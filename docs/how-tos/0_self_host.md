# Self-host Windmill

## Docker-compose

[Simplified instruction for docker-compose in the README.](https://github.com/windmill-labs/windmill#how-to-self-host)

## Compile from source

1. Go to `frontend/`: `npm run install`, `npm run generate-backend-client` then
   `npm run build`
2. Install the [lld linker](https://lld.llvm.org/)
3. Go to `backend/`: `SQLX_OFFLINE=true cargo build --release`
4. The windmill binary is at: `target/release/windmill`

It is enough to run it with `DATABASE_URL=<your_database_url> ./windmill`

Windmill binary will make the assumption that nsjail is on path, that python3 is
available at `/usr/local/bin/python3` and deno at `/usr/bin/deno`. it will also
assume that you are connected to postgres using a superuser. If you cannot use a
superuser, see the following section

## Run windmill without using a postgres superuser

Create the database with your non-super as owner:

```
CREATE DATABASE windmill OWNER nonsuperuser
```

As a superuser, create the windmill_user and windmill_admin roles with the
proper privileges, using:

```
psql <DATABASE_URL> -f init-db-as-superuser.sql
```

where `init-db-as-superuser.sql` is this
[file](https://github.com/windmill-labs/windmill/blob/main/init-db-as-superuser.sql)

It will not give windmill users access to all your databases, just that one
because the schema public is not shared accross database, it is contained wholly
inside each database:
<https://www.postgresql.org/docs/current/ddl-schemas.html#DDL-SCHEMAS-PUBLIC>
