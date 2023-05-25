---
title: CLI Installation
---

# Installation

:::caution

This page is currently WIP and is being updated.

:::

Simply install the wmill cli using:

`deno install --unstable -A https://deno.land/x/wmill/main.ts`

You will need
[deno installed](https://deno.land/manual@v1.30.3/getting_started/installation).

Your terminal might also ask you to update your PATH environment variable to include the newly installed executable `wmill`. Example: `export PATH="/Users/yourusername/.deno/bin:$PATH"`

**Your version of deno need to be recent (> 1.32) **: To update deno, run `deno upgrade`.

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
