# Website

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern
static website generator.

## Install

```
npm install --legacy-peer-deps
```

## Dev

```
npm run start
```

### Build

```
npm run build
```

### Regenerate python documentation

```
pdoc --template template --output-dir /tmp wmill --force\
 && sed -i -e "/^title: /s/title: .*/title: Python Client/" /tmp/wmill/client.md\
 && mv /tmp/wmill/client.md src/pages/python.md
```
