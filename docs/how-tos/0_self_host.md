---
title: Self-host
---

# Self-host Windmill

## Getting started

Windmill GitHub repository contains all the necessary files to run 
Windmill locally, or to self-host it.

We encourage docker-based deployments, and provide a docker-compose
file to help you get started.

## Docker

:::tip
Simplified instruction for docker-compose in the 
[README.](https://github.com/windmill-labs/windmill#how-to-self-host)
:::

:::info
When talking about the 'compose', or 'caddyfile', we explicitly refer
to the ones on [Windmill's GitHub repository][windmill-gh].
:::

Using docker and caddy, Windmill can be deployed using two files, 
([`docker-compose.yml`][windmill-docker-compose] and 
[`Caddyfile`][windmill-caddyfile]) and in a single command.  

[Caddy][caddy] takes care of managing the
TLS certificate and the reverse proxy, Postgre of storage, Windmill-LSP 
provides editor intellisense. All managed by one 
[`docker-compose.yml`][windmill-docker-compose] file.


### Configuration

Let's assume you wish to deploy Windmill to the `windmill.example.com` domain.  
This information only needs to be propagated to the `docker-compose.yml` file, 
using the `WM_BASE_URL` environment variable.

Create/edit the `.env` file at the root of the project and set your desired address: 
```bash
# .env
DB_PASSWORD=supersecret
WM_BASE_URL=windmill.example.com
```

Setting the `WM_BASE_URL` configures Windmill to use it as its base url, 
but also configures Caddy to use it as the domain.

### Deployment

Once you have setup your environment for deployment, you can run the following command:

`$ docker compose up` 

That's it! Head over to your domain and you should be greeted with the login screen.

:::tip
Default credentials are `admin@windmill.dev` and `changeme`
:::

### Update

To update to newer version of Windmill, all you have to do is run: 

`docker compose pull` or `docker compose pull windmill` if you wish to update 
only the Windmill image.

Database volume is persistent, so updating the database image is safe too.

## Helm chart

We also provide a convenient helm chart for Kubernetes based self-hosted setup.

Detailed instructions can be found in the [README][helm-readme] file in the 
[official repository][helm] of the chart.

:::tip
If you're familiar with helm and want to get started quickly, 
you can deploy in one command, with paths relative to the official 
[repository][helm]:

```bash
helm install windmill-chart windmill/  \
      --values windmill/values.yaml    \
      --namespace=windmill             \
      --create-namespace
```
:::

## Compile from source

1. Go to `frontend/`: `npm run install`, `npm run generate-backend-client` then
   `npm run build`
2. Install the [lld linker](https://lld.llvm.org/)
3. Go to `backend/`: `SQLX_OFFLINE=true cargo build --release`
4. The windmill binary is at: `target/release/windmill`

It is enough to run it with `DATABASE_URL=<your_database_url> ./windmill`

Windmill binary will make the assumption that nsjail is in `PATH`, that python3 is
available at `/usr/local/bin/python3` and deno at `/usr/bin/deno`. it will also
assume that you are connected to postgres using a superuser. If you cannot use a
superuser, see the following section.

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
because the schema public is not shared across database, it is contained wholly
inside each database:
<https://www.postgresql.org/docs/current/ddl-schemas.html#DDL-SCHEMAS-PUBLIC>

Then last, run the following commands

```
GRANT windmill_admin TO nonsuperuser;
GRANT windmill_user TO nonsuperuser;
```
<!-- Resources -->

[caddy]: https://caddyserver.com/
[windmill-gh]: https://github.com/windmill-labs/windmill
[windmill-docker-compose]: https://github.com/windmill-labs/windmill/blob/main/docker-compose.yml
[windmill-caddyfile]: https://github.com/windmill-labs/windmill/blob/main/Caddyfile
[helm]: https://github.com/windmill-labs/windmill-helm-charts
[helm-readme]: https://github.com/windmill-labs/windmill-helm-charts/blob/main/README.md