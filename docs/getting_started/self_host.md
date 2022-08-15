# Self-hosting

Windmill can be self-hosted with two files. 

In this tutorial, you will learn how to self- host Windmill. 
We will use [Caddy][caddy] as reverse proxy.  

At the end of this tutorial, you will have a full-fledged version of Windmill,
with LSP and a Postgres running on your own server. We will deploy 
with automatic LetsEncrypt encryption, handled by Caddy, using sensible
defaults. 

All the files required to achieve that are provided at the end of this
tutorial in the [Example files](#example-files) section. These files are a
good **starting point** for a internet-facing deployment of Windmill,
and should be used as such. Without configuration they will not work and
are not suitable for production deployments.

## Intro

To follow this tutorial, you will need `docker-compose`.


The Windmill repository comes with a minimal `docker-compose` file, without the 
support for LSP, but with a Postgres database. It is suitable for 
local deployments, and for discovering of the product. 

If you want to deploy Windmill in a production setting, in a 
internet facing environment, a few extra things are required.

Below you will find a condensed list of high-level steps needed to get
Windmill up and running. We will drill more into details in the 
later parts of this tutorial.

### Checklist

Self-host checklist for deployment:

Configuration: 

- [ ] Did I set a strong `DB_PASSWORD` in the `.env` file?
- [ ] Did I set the `BASE_URL` variable for `windmill` service in the 
 `docker-compose.yml` file?
- [ ] Did I add the lsp service to the `docker-compose.yml` file?
  `docker-compose.yml` file?

Running: 

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
  image: ghcr.io/windmill-labs/windmill-lsp:latest
  ports:
    - 3001:3001
```

If you start the docker stack at this point, the LSP server will run. The support 
in the editor however will not work, because it requires a reverse proxy to 
handle path routing. If you've ran Windmill in development mode before, 
that role was fulfilled by [Caddy][caddy].

## Reverse proxy

Windmill requires to be reverse-proxied at the `/ws` api prefix. In this example
you will continue using Caddy to achieve that.

Windmill bundles the optimized frontend files, so we only need to route
to two services - the `windmill` backend/frontend and the lsp:

- All the traffic goes to the `windmill` service, except:
- All `/ws` prefixed traffic goes to the `lsp` container

Make sure that the `windmill` service in the `docker-compose.yml` file 
exposes a port different than `80`.



## Example files

### `Caddyfile`

```
windmill.example.com:80 {
  bind {$ADDRESS}
  reverse_proxy /api/* http://windmill:8000
  reverse_proxy /* http://windmill:8000
  reverse_proxy /ws/* http://lsp:3001 {
    lb_policy header "Authorization"
  }
}
```

### `docker-compose.yaml`

```yml
# docker-compose.yaml
version: '3.7'

services:

  db:
    image: postgres:14
    restart: always
    volumes:
      - db_data:/var/lib/postgresql/data
      # - ./init-db.sql:/docker-entrypoint-initdb.d/create_tables.sql
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
  lsp:
    image: ghcr.io/windmill-labs/windmill-lsp:latest
    restart: unless-stopped
    ports:
      - 3001:3001
  caddy:
    image: caddy:2.5.2-alpine
    restart: unless-stopped
    volumes:
      - ./Caddyfile:/etc/caddy/Caddyfile
    ports:
      - 80:80
      - 443:443

volumes:
  db_data: null
```


<!-- Resources -->

[caddy]: https://caddyserver.com/
[traefik]: https://traefik.io/
[traefik-tls]: https://doc.traefik.io/traefik/https/acme/
[windmill]: https://github.com/windmill-labs/windmill