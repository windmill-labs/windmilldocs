---
title: Self Host
---

# Self Host Windmill

[Windmill's GitHub repository][windmill-gh] contains all the necessary files to
run Windmill locally, or to self-host it.

We encourage Docker-based deployments, and provide a `docker-compose` file to
help you get started.

The default credentials are admin@windmill.dev / changeme. From there you can easily setup another account as part of the setup step.

**Even if you setup oauth, login as admin@windmill.dev / changeme to setup the instance and give yourself admin privileges.**

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
```

Setting the `WM_BASE_URL` configures Windmill to use it as its base url. You still need to configure a reverse proxy to hit windmill and windmill-lsp on the right ports. You can use any reverse proxy as long as they behave mostly like the following caddy configuration:

```
:80 {
        bind {$ADDRESS}
        reverse_proxy /ws/* http://lsp:3001
        reverse_proxy /* http://windmill_server:8000
}
```

The default docker-compose file exposes a caddy reverse-proxy on port 80, configured by the [caddyfile](https://raw.githubusercontent.com/windmill-labs/windmill/main/Caddyfile) curled above. Configure both the caddyfile and the docker-compose file to fit your needs. The documentation for caddy is available [here](https://caddyserver.com/docs/caddyfile).

#### Traefik configuration

<details>
  <summary>Here is a template of a docker-compose to expose Windmill to Traefik. Code below:</summary>

  ```yaml
version: '3.7'

services:
  windmill_server:
    image: ghcr.io/windmill-labs/windmill:main
    deploy:
      replicas: 1
    restart: unless-stopped
    expose:
      - 8000
    networks:
      - pg_network
      - web
    environment:
      DATABASE_URL: postgres://${PG_USER:-postgres}:${PG_PASS:-secretpgpassword}@${PG_HOST:-postgres}:${PG_PORT:-5432}/${PG_DATABASE:-postgres}?sslmode=disable
      BASE_URL: ${WM_BASE_URL}
      RUST_LOG: info
      ## You can set the number of workers to > 0 and not need any separate worker service
      NUM_WORKERS: 0
      DISABLE_SERVER: false
      METRICS_ADDR: false
    labels:
      - 'traefik.enable=true'
      - 'traefik.docker.network=web'
      - 'traefik.http.routers.windmill.tls=true'
      - 'traefik.http.routers.windmill.service=windmill'
      - 'traefik.http.routers.windmill.rule=Host(`windmill.your-hostname-here.com`) && PathPrefix(`/`)'
      - 'traefik.http.routers.windmill.tls.certresolver=lets-encrypt'
      - 'traefik.http.services.windmill.loadbalancer.server.port=8000'

  windmill_worker:
    image: ghcr.io/windmill-labs/windmill:main
    deploy:
      replicas: 3
    restart: unless-stopped
    networks:
      - pg_network
      - web
    environment:
      DATABASE_URL: postgres://${PG_USER:-postgres}:${PG_PASS:-secretpgpassword}@${PG_HOST:-postgres}:${PG_PORT:-5432}/${PG_DATABASE:-postgres}?sslmode=disable
      BASE_URL: ${WM_BASE_URL}
      BASE_INTERNAL_URL: http://windmill_server:8000
      RUST_LOG: info
      NUM_WORKERS: 1
      DISABLE_SERVER: true
      KEEP_JOB_DIR: false
      DENO_PATH: /usr/bin/deno
      PYTHON_PATH: /usr/local/bin/python3
      METRICS_ADDR: false
    volumes:
      - worker_dependency_cache:/tmp/windmill/cache
      - /var/run/docker.sock:/var/run/docker.sock

  lsp:
    image: ghcr.io/windmill-labs/windmill-lsp:latest
    restart: unless-stopped
    labels:
      - 'traefik.enable=true'
      - 'traefik.docker.network=web'
      - 'traefik.http.routers.windmill_lsp.tls=true'
      - 'traefik.http.routers.windmill_lsp.service=windmill_lsp'
      - 'traefik.http.routers.windmill_lsp.rule=Host(`windmill.your-hostname-here.com`) && PathPrefix(`/ws`)'
      - 'traefik.http.routers.windmill_lsp.tls.certresolver=lets-encrypt'
      - 'traefik.http.services.windmill_lsp.loadbalancer.server.port=3001'
    expose:
      - 3001

volumes:
  worker_dependency_cache:

networks:
  pg_network:
    name: pg_network
  web:
    name: web
    external: true
```
</details>

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
for Kubernetes-based self-hosted set-up.

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
additional features. One important feature is better caching for dependencies in a
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
   npm install
   npm run generate-backend-client
   // on mac use: npm run generate-backend-client-mac
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

**NOTE: Make sure the roles `windmill_admin` and `windmill_user` have access to the database and the schema:**

You can ensure this by running the following commands as superuser while inside the database. Replace the schema
name `public` with your schema, in case you use a different one:

```sql
GRANT USAGE ON SCHEMA public TO windmill_admin;
GRANT USAGE ON SCHEMA public TO windmill_user;
```

## Complete New Windmill Setup

In the Admin Workspace execute the New User Setup App. This will import the default resources from WindmillHub and update the default user credentails

<!-- Resources -->

[caddy]: https://caddyserver.com/
[windmill-gh]: https://github.com/windmill-labs/windmill
[windmill-gh-frontend]: https://github.com/windmill-labs/windmill/tree/main/frontend
[windmill-gh-backend]: https://github.com/windmill-labs/windmill/tree/main/backend
[windmill-docker-compose]: https://github.com/windmill-labs/windmill/blob/main/docker-compose.yml
[windmill-caddyfile]: https://github.com/windmill-labs/windmill/blob/main/Caddyfile
[helm]: https://github.com/windmill-labs/windmill-helm-charts
[helm-readme]: https://github.com/windmill-labs/windmill-helm-charts/blob/main/README.md
