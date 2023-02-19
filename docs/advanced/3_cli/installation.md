---
title: CLI Installation
---

# Installation

Simply install the wmill cli using
`deno install --unstable -A https://deno.land/x/wmill/main.ts`. You will need
[deno installed](https://deno.land/manual@v1.30.3/getting_started/installation).

## Upgrade

Running `wmill upgrade` will upgrade your installation to the latest version.

## Completion

The CLI comes with completions out of the box via `wmill completions <shell>`.
(Via [cliffy](https://cliffy.io/))

### Bash

To enable bash completions add the following line to your `~/.bashrc`:

```
source <(wmill completions bash)
```

### Fish

To enable fish completions add the following line to your
`~/.config/fish/config.fish`:

```
source (wmill completions fish | psub)
```

### Zsh

To enable zsh completions add the following line to your `~/.zshrc`:

```
source <(wmill completions zsh)
```
