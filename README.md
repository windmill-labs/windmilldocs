# Website

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern
static website generator.

### Nix

If you are using nix, you can:
```
$ nix develop
```
This will bring into scope all dependencies and helpers.

#### Direnv
Additionally if you are using [nix-direnv](https://github.com/nix-community/nix-direnv):
```
$ direnv allow
```
This will automatically enable shell when you enter the repository

### Installation

```
$ npm i --legacy-peer-deps
```

#### Nix
```
$ wm-setup
```

### Local development

```
$ npm start
```

#### Nix
```
$ wm-dev
```

This command starts a local development server and opens up a browser window.
Most changes are reflected live without having to restart the server.

### Build

```
$ npm run build
```

This command generates static content into the `build` directory and can be
served using any static contents hosting service.

### Deployment

```
$ GIT_USER=<Your GitHub username> USE_SSH=true npm run deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to
build the website and push to the `gh-pages` branch.

### Regenerate python documentation

```
pdoc --template template --output-dir /tmp wmill --force\
 && sed -i -e "/^title: /s/title: .*/title: Python Client/" /tmp/wmill/client.md\
 && mv /tmp/wmill/client.md src/pages/python.md
```
test
