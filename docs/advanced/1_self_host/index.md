---
title: Self Host
---

# Self Host Windmill

[Windmill's GitHub repository][windmill-gh] contains all the necessary files to
run Windmill locally, or to self-host it.

We encourage Docker-based deployments, and provide a `docker-compose` file to
help you get started.

## Docker

Using Docker and Caddy, Windmill can be deployed using two files,
([`docker-compose.yml`][windmill-docker-compose] and
[`Caddyfile`][windmill-caddyfile]) and in a single command.

[Caddy][caddy] takes care of managing the TLS certificate and the reverse proxy,
Postgres of storage, Windmill-LSP provides editor intellisense. All managed by
one [`docker-compose.yml`][windmill-docker-compose] file.

```
curl https://raw.githubusercontent.com/windmill-labs/windmill/main/docker-compose.yml -o docker-compose.yml
curl https://raw.githubusercontent.com/windmill-labs/windmill/main/Caddyfile -o Caddyfile
curl https://raw.githubusercontent.com/windmill-labs/windmill/main/.env -o .env

docker compose up -d --pull always
```

### Configuration

Let's assume you wish to deploy Windmill to the `windmill.example.com` domain.
This information only needs to be propagated to the `docker-compose.yml` file,
using the `WM_BASE_URL` environment variable.

Create/edit the `.env` file at the root of the project and set your desired
address:

```bash
# .env
DB_PASSWORD=supersecret
WM_BASE_URL=http://windmill.example.com
CADDY_REVERSE_PROXY=":80"
```

Setting the `WM_BASE_URL` configures Windmill to use it as its base url. The reverse proxy is configured at `CADDY_REVERSE_PROXY`. You can use any reverse proxy as long as they behave mostly like the following caddy configuration:

```
:80 {
        bind {$ADDRESS}
        reverse_proxy /ws/* http://lsp:3001
        reverse_proxy /* http://windmill_server:8000
}
```

### Deployment

Once you have setup your environment for deployment, you can run the following
command:

```bash
docker compose up
```

That's it! Head over to your domain and you should be greeted with the login
screen.

:::tip

Default e-mail is `admin@windmill.dev` and the password is `changeme`.

:::

### Update

To update to a newer version of Windmill, all you have to do is run:

```bash
docker compose pull
```

Or in case you wish to update only the Windmill image, run:

```bash
docker compose pull windmill
```

Database volume is persistent, so updating the database image is safe too.

## Helm Chart

We also provide a convenient [Helm Chart](https://helm.sh/docs/topics/charts/)
for Kubernetes based self-hosted set-up.

Detailed instructions can be found in the [README][helm-readme] file in the
[official repository][helm] of the chart.

:::tip

If you're familiar with Helm and want to jump right in, you can deploy quickly
with the snippet below.

```bash
# add the Windmill helm repo
helm repo add windmill https://windmill-labs.github.io/windmill-helm-charts/
# install chart with default values
helm install windmill-chart windmill/windmill  \
      --namespace=windmill             \
      --create-namespace
```

Detailed instructions in the official [repository][helm].

:::

### Enterprise deployment with Helm

The Enterprise edition of Windmill uses different base images and supports
additional features. One important feature is better caching for depencies in a
super cache supported by S3.

You need:

- an Enterprise license key
- an AWS account and S3 bucket
- AWS credentials or IAM roles prepared for access from the Windmill worker pods.
  <br/>

See the [Helm Chart repository README][helm] [repository][helm] for more details. The exact setup
for S3 access will vary according to your environment.

## Compile from source

1. Navigate to the `frontend` folder ([source][windmill-gh-frontend]) and run:
   ```bash
   npm run install
   npm run generate-backend-client
   npm run build
   ```
2. Install the [LLD Linker](https://lld.llvm.org/).
3. Go to `backend` folder ([source][windmill-gh-backend]) and run:
   ```bash
   SQLX_OFFLINE=true cargo build --release
   ```
4. The Windmill binary will be at `target/release/windmill`

You can run it with the following command:

```bash
DATABASE_URL=<your_database_url> ./windmill
```

Windmill binary will make the assumption that NsJail is in `PATH`, Python3 is
available at `/usr/local/bin/python3` and Deno at `/usr/bin/deno`. It will also
assume that you are connected to PostgreSQL using a superuser. If you cannot use
a superuser, see the following section.

## Run Windmill without using a Postgres superuser

Create the database with your non-super user as owner:

```sql
CREATE DATABASE windmill OWNER nonsuperuser
```

As a superuser, create the windmill_user and windmill_admin roles with the
proper privileges, using:

```bash
psql <DATABASE_URL> -f init-db-as-superuser.sql
```

where `init-db-as-superuser.sql` is
[this file](https://github.com/windmill-labs/windmill/blob/main/init-db-as-superuser.sql).

Then finally, run the following commands:

```sql
GRANT windmill_admin TO nonsuperuser;
GRANT windmill_user TO nonsuperuser;
```

<!-- Resources -->

[caddy]: https://caddyserver.com/
[windmill-gh]: https://github.com/windmill-labs/windmill
[windmill-gh-frontend]: https://github.com/windmill-labs/windmill/tree/main/frontend
[windmill-gh-backend]: https://github.com/windmill-labs/windmill/tree/main/backend
[windmill-docker-compose]: https://github.com/windmill-labs/windmill/blob/main/docker-compose.yml
[windmill-caddyfile]: https://github.com/windmill-labs/windmill/blob/main/Caddyfile
[helm]: https://github.com/windmill-labs/windmill-helm-charts
[helm-readme]: https://github.com/windmill-labs/windmill-helm-charts/blob/main/README.md
