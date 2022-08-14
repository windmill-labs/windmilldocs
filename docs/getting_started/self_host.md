# Self-hosting

In this tutorial, you will learn how to self- host Windmill. 
We will use [Traefik][traefik] as reverse proxy.  

At the end of this tutorial, you will have a full-fledged version of Windmill,
with LSP and a Postgres database running on your own server. We will deploy 
with automatic LetsEncrypt encryption, handled by Traefik, using sensible
defaults. 

All the files required to achieve that are provided at the end of this
tutorial in the [Example files](#example-files) section. These files are a
good **starting point** for a internet-facing deployment of Windmill,
and should be used as such. Without configuration they will not work and
are not suitable for production deployments.

## Intro

To follow this tutorial, you will need Docker, `docker-compose` and a clone
of the main [Windmill repository][windmill]:  

`$ git clone git@github.com:windmill-labs/windmill.git`


The repository comes with a minimal `docker-compose` file, without the 
support for LSP, but with a Postgres database. It is suitable for 
local deployments, and for discovering of the product. 

If you want to deploy Windmill in a production setting, in a 
internet facing environment, a few extra things are required.

Below you will find a condensed list of high-level steps needed to get
Windmill up and running. We will drill more into details in the 
later parts of this tutorial.

### Checklist

Self-host pre-flight checklist for deployment using Traefik with TLS, 
using ports `80` and `443` for HTTP and HTTPS respectively:

Configuration: 

- [ ] Did I set a strong `DB_PASSWORD` in the `.env` file?
- [ ] Did I set the `BASE_URL` variable for `windmill` service in the 
 `docker-compose.yml` file?
- [ ] Did I add the lsp service to the `docker-compose.yml` file?
- [ ] Did I add a reverse proxy service (e.g. Traefik) to the 
  `docker-compose.yml` file?
- [ ] Is the `windmill` service exposing a port different than `80` ?

Running: 

- [ ] Is the Traefik gateway running?
- [ ] Is the lsp server running?
- [ ] Did I route the `/ws` traffic to the lsp server?
- [ ] Is my database hidden from the internet?

## LSP Editor Support

To add the LSP server to Windmill, and enable the formatting and intellisense 
features in the editor, we will use the Windmill Language Server.

The LSP communicates with websockets, is prefixed by `/ws/`, 
i.e. `https://windmill.example/ws/` in the routing structure.

To enable LSP you need to add the following service to the `docker-compose.yml` file: 

```yaml
lsp:
  build: ./lsp
  ports:
    - 3001:3001
```

If you start the docker stack at this point, the LSP server will run. The support 
in the editor however will not work, because it requires a reverse proxy to 
handle path routing. If you've ran Windmill in development mode before, 
that role was fulfilled by [Caddy][caddy].

## Reverse proxy

Windmill requires to be reverse-proxied at the `/ws` api prefix. In this example
you will learn how to use [Traefik][traefik] to achieve that.

Traefik is a modern HTTP reverse proxy and load balancer that makes 
deploying microservices easy. We need to be able to route traffic 
to different docker services, based on the url of our deployment. 

Windmill bundles the optimized frontend files, so we only need to route
to two services - the backend/frontend and the lsp:

- All the traffic goes to the `windmill` service, except:
- All `/ws` prefixed traffic goes to the `lsp` container


You need to create two files: `/traefik/dynamic_conf.yml` and `/traefik/traefik.yml`. 
Those files will configure Traefik and will be mounted into the container.

You need to add Traefik to the `docker-compose.yml` file, and mount the configuration
files at `/etc/traefik`.


Make sure that the `windmill` service in the `docker-compose.yml` file 
exposes a port different than `80`.

**Note:** Complete `docker-compose.yml` file at the end of this page. 


### TLS

If you want to deploy as internet-facing, it's a good idea to add encryption. 
Traefik can handle this automatically, see the 
[Traefik documentation][traefik-tls] for more information.

The example file provided below comes with TLS enabled, all 
you need to do is change all the variables containing the `example.com` 
domain to yours and it should run *as is*.


## Example files

### `docker-compose.yaml`

```yaml
# docker-compose.yaml
version: '3.7'

services:
  db:
    image: postgres:14
    restart: always
    volumes:
      - db_data:/var/lib/postgresql/data
      - ./init-db.sql:/docker-entrypoint-initdb.d/create_tables.sql
    ports:
      - 5432:5432
    environment:
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_DB: windmill
    healthcheck:
      test: [ "CMD-SHELL", "pg_isready -U postgres" ]
      interval: 10s
      timeout: 5s
      retries: 5
  lsp:
    build: ./lsp
    restart: unless-stopped
    ports:
      - 3001:3001
  windmill:
    image: ghcr.io/windmill-labs/windmill:main
    privileged: true
    restart: unless-stopped
    ports:
      - 8000:8000
    environment:
      - DATABASE_URL=postgres://postgres:${DB_PASSWORD}@db/windmill?sslmode=disable
      - BASE_URL=http://windmill.example.com
      - BASE_INTERNAL_URL=http://localhost:8000
      - RUST_LOG=info
      - NUM_WORKERS=3
      - RUST_BACKTRACE=1
      - DISABLE_NUSER=false
    depends_on:
      db:
        condition: service_healthy
  gateway:
    image: traefik:v2.8
    restart: always
    ports:
      - 80:80
      - 443:443
    volumes:
      - ./traefik/traefik:/etc/traefik
      - /var/run/docker.sock:/var/run/docker.sock
      - certificates:/letsencrypt

volumes:
  db_data: null
  certificates: null
```

### Traefik 

Example above assumes these files are in `traefik` directory.

#### `dynamic_conf.yml`

```yaml
http:
  routers:
    app:
      rule: "Host(`windmill.example.com`)"
      service: "windmill-windmill@docker"
      tls:
        certResolver: le
    lsp:
      rule: "Host(`windmill.example.com`) && PathPrefix(`/ws/`)"
      service: "lsp-windmill@docker"
      tls:
        certResolver: le
```

#### `traefik.yml`

```yaml
log:
  level: INFO
providers:
  docker:
    endpoint: "unix:///var/run/docker.sock"
    exposedByDefault: true
  file:
    filename: /etc/traefik/dynamic_conf.yml
    watch: true
entryPoints:
  web:
    address: :80
    http:
      redirections:
        entryPoint:
          to: websecure
          scheme: https
  websecure:
    address: :443
certificatesResolvers:
  le:
    acme:
      email: contact@example.com
      storage: /letsencrypt/acme.json
      tlsChallenge: {}
      httpChallenge:
        entryPoint: websecure
```



<!-- Resources -->

[caddy]: https://caddyserver.com/
[traefik]: https://traefik.io/
[traefik-tls]: https://doc.traefik.io/traefik/https/acme/
[windmill]: https://github.com/windmill-labs/windmill