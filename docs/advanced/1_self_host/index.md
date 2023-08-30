---
title: Self Host
---

# Self Host Windmill

For small setup, use docker and docker compose on a single instance.
For larger and production use-cases, use our [helm chart](#helm-chart) to deploy on kubernetes.

The default credentials are admin@windmill.dev / changeme. From there you can easily setup another account as part of the setup step.

**Even if you setup oauth, login as** admin@windmill.dev **/ changeme to setup the instance and give yourself admin privileges**.

Windmill itself just require 3 parts:

- A Postgres database, which contains the entire state of windmill, including the job queue.
- The windmill container run in server mode (and replicated for HA). It serves both the frontend and the API. It needs to connect to the database and is what is exposed publicly to serve the frontend. It does not need to communicate to the workers directly.
- The windmill container run in worker mode (and replicated to handle more job throughput). It needs to connect to the database and does not communicate to the servers.

There are 3 optional parts:

- windmill lsp to provide intellisense on the monaco web editor
- windmill multiplayer (EE only) to provide real time collaboration
- A reverse proxy (caddy in our docker compose) to the windmill server, lsp and multiplayer in order to expose a single port to the outside world.

The docker-compose below use the 6 parts and we recommend doing TLS termination outside of the provided caddy.

## Cloud provider-specific guides

### AWS, GCP, Azure

We recommend using the [helm chart](#helm-chart) to deploy on managed kubernetes. But for simplified setup, simply use the docker-compose (see [below](#docker)) on a single large instance and use a high number of replicas for the worker service. The rule of thumb is 1 worker per 1vCPU and 1/2GB of RAM. Cloud providers have managed load balancer services (ELB, GCLB, ALB) and managed database (RDS, Cloud SQL, Aurora, Postgres on Azure). We recommend disabling the db service in the docker-compose and using an external database by setting according the `DATABASE_URL` in the `.env` file. Windmill is compatible with AWS Aurora, GCP Cloud SQL and Neon serverless database.

Use the managed load balancer to point to your instance on the port you have chosen to expose in the caddy section of the docker-compose (by default 80). We recommend doing TLS termination and associating your domain on your managed load balancer. Once the domain name is chosen, set BASE_URL accordingly in `.env`. That is it for a minimal setup. Read about [Worker groups](../../core_concepts/9_worker_groups/index.md) to configure more finely your workers on more nodes and with different resources. Once done, be sure to setup [SSO login](../../misc/2_setup_oauth/index.md) with Azure AD, Google Workspace or Github if relevant.

### Fly.io

[Community contributed guide](https://dev.to/singee/deploy-windmill-on-flyio-3ii3)

### Hetzner, Digital Ocean, Linode, Scaleway, Vultr, OVH, ...

Windmill work with those providers using the docker containers and specific guides are in progress.

## Docker

### Setup Windmill on localhost

<video 
    className="border-2 rounded-xl object-cover w-full h-full"
    controls
    id="app-text-inline-editor"
    src="/videos/self_host.mp4"
/>

<br/>

> _Self-host Windmill in less than a minute._

<br/>

Using Docker and Caddy, Windmill can be deployed using 4 files,
([`docker-compose.yml`][windmill-docker-compose],
[`Caddyfile`][windmill-caddyfile]), an .env and an empty oauth.json in a single command.

[Caddy][caddy] is the reverse proxy that will redirect traffic to both windmill (port 8000) and the lsp (the monaco assistant) service (port 3001) and multiplayer service (port 3002).
Postgres holds the entire state of windmill, the rest is fully stateless, Windmill-LSP provides editor intellisense.

Make sure docker is started (Mac: `open /Applications/Docker.app`, Windows: `start docker`, Linux: `sudo systemctl start docker`) and type the following commands:

```
curl https://raw.githubusercontent.com/windmill-labs/windmill/main/docker-compose.yml -o docker-compose.yml
curl https://raw.githubusercontent.com/windmill-labs/windmill/main/Caddyfile -o Caddyfile
curl https://raw.githubusercontent.com/windmill-labs/windmill/main/.env -o .env
echo '{}' > oauth.json

docker compose up -d
```

Go to [http://localhost](http://localhost) et voilà!

The default super-admin user is: **admin@windmill.dev** / `changeme`.

From there, you can follow the setup app to replace the superadmin account and schedule a sync of resources (by default, everyday).

### Use an external database

For more production use-cases, we recommend using the helm-chart. However, the docker-compose on a big instance is sufficient for many use-cases.

To setup an external database, you need to set DATABASE_URL in the .env file to point your external database. You should also set the number of db replicas to 0.

:::tip

In some exotic setups, you will need to set the initial role manually. You can do so by running the following command:

```bash
curl https://raw.githubusercontent.com/windmill-labs/windmill/main/init-db-as-superuser.sql -o init-db-as-superuser.sql
psql <DATABASE_URL> -f init-db-as-superuser.sql
```

:::

### Set number of replicas accordingly in docker-compose

In the docker-compose, set the number of windmill_worker and windmill_worker_native replicas to your needs

### Enterprise Edition

To use the [enterprise edition](../../misc/7_plans_details/index.mdx), you need to set the following environment variables in the .env file:

```
WM_LICENSE_KEY=your_license_key
```

You can then set the number of replicas of the multiplayer container to 1 in the docker-compose.

You will be provided a license key when you purchase the enterprise edition. Contact us at ee@windmill.dev to get a trial license key. Pricing is at [https://windmill.dev/pricing](https://windmill.dev/pricing). You will benefit from support, SLA and all the additional features of the enterprise edition.

### Authentication and user management

We recommend setting up [SSO with OAuth](../../misc/2_setup_oauth/index.md) if you want to avoid adding users manually. If not possible, you can add new users manually:

![Add new users](./adding_new_user.gif 'Add new users')

> _Add new users to your instance._

<br/>

If not using OAuth SSO, we recommend setting up SMTP to send invites and email to manually added users. The relevant environment variables are:

```
SMTP_FROM=windmill@domain.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=email@domain.com
SMTP_PASSWORD=app_password
```

When creating a workspace, you have the option to invite automatically everyone on the same domain. That's how you make sure that anyone added to the instance is also added to the workspace.

<video 
    className="border-2 rounded-xl object-cover w-full h-full"
    controls
    id="app-text-inline-editor"
    src="/videos/new_workspace.mp4"
/>

<br/>

> _Create a new workspace._

<br/>

### Admins Workspace

What distinguishes the admin workspace from other workspaces is that its [resource types](../../core_concepts/3_resources_and_types/index.mdx) are shared with all workspaces.

If you skipped the instance setup or need to sync resource types, you can go to the admins workspace and run the _Synchronize Hub Resource types with instance_ script, or [schedule](../../core_concepts/1_scheduling/index.md) it.

![Sync resource types](./sync_resource_types.gif 'Sync resource types with Hub')

<br/>

For more advanced setups, see below.

### Configuring Domain and Reverse Proxy

To deploy Windmill to the `windmill.example.com` , edit the `.env` file that is used by the docker-compose file and that you have curled previously.

```bash
# .env
WM_BASE_URL=http://windmill.example.com
```

:::info

Many configuration can be done in the docker-compose.yml file. The [README](https://github.com/windmill-labs/windmill#environment-variables) contains all the variables you can pass to the workers or servers to fully customize windmill to your needs. The .env only contains the most crucial ones.

:::

Setting the `WM_BASE_URL` configures Windmill to use it as its base url. You still need to configure a reverse proxy to hit windmill and windmill-lsp on the right ports. You can use any reverse proxy as long as they behave mostly like the default provided following caddy configuration:

```
:80 {
        bind {$ADDRESS}
        reverse_proxy /ws/* http://lsp:3001
        reverse_proxy /* http://windmill_server:8000
}
```

The default docker-compose file exposes the caddy reverse-proxy on port 80 above, configured by the [caddyfile](https://raw.githubusercontent.com/windmill-labs/windmill/main/Caddyfile) curled above. Configure both the caddyfile and the docker-compose file to fit your needs. The documentation for caddy is available [here](https://caddyserver.com/docs/caddyfile).

#### Use provided Caddy to serve https

For simplicity, we recommend using an external reverse proxy such as Cloudfront or Cloudflare and point to your instance on the port you have chosen (by default, :80). However, you can also set `BASE_URL` in the docker-compose to your domain instead of `:80` and expose the `:443 ports`. See the caddy section in the docker-compose.

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
    # Rules of thumb, use 1 replica per vCPU. Make sure your postgres can handle 5*worker_replicas + 50*server_replicas max connections.
    replicas: 3
  restart: unless-stopped
  networks:
    - pg_network
    - web
  environment:
    DATABASE_URL: postgres://${PG_USER:-postgres}:${PG_PASS:-secretpgpassword}@${PG_HOST:-postgres}:${PG_PORT:-5432}/${PG_DATABASE:-postgres}?sslmode=disable
    BASE_URL: ${WM_BASE_URL}
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

In practice, you want to run the docker containers in the background so they don't shut down when you disconnect. Do this with the `--detach` or `-d` parameter as follows:

```bash
docker compose up -d
```

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

:::tip

It is sufficient to run `docker compose up -d` again if your docker is already running detached, since it will pull the latest `:main` version and restart the containers.
NOTE: The previous images are not removed automatically, you should also run `docker builder prune` to clear old versions.

:::

### Reset your instance

Windmill stores all of its state in PostgreSQL and it is enough to reset the database to reset the instance.
Hence, in the setup above, to reset your Windmill instance, it is enough to reset the PostgreSQL volumes. Run:

```
docker-compose down --volumes
docker volume rm -f windmill_db_data
```

and then `docker compose up`.

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
curl https://raw.githubusercontent.com/windmill-labs/windmill/main/init-db-as-superuser.sql -o init-db-as-superuser.sql
psql <DATABASE_URL> -f init-db-as-superuser.sql
```

where `init-db-as-superuser.sql` is
[this file](https://raw.githubusercontent.com/windmill-labs/windmill/main/init-db-as-superuser.sql).

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
