# Installation

To install the wmill CLI, follow these steps:

1. Make sure you have deno installed. If not, you can install it by following the instructions [here](https://deno.com/manual@v1.34.0/getting_started/installation).

Please note that your version of deno should be recent (greater than 1.32). If not, you can update deno by running deno upgrade.

2. Install wmill CLI using the following command in your terminal:

```bash
deno install --unstable -A https://deno.land/x/wmill/main.ts
```

Your terminal might also ask you to update your PATH environment variable to include the newly installed executable `wmill`. Example:

```bash
export PATH="/Users/yourusername/.deno/bin:$PATH"
```

3. Verify that the installation was successful by running the following command:

```bash
wmill --version
```

If the installation was successful, you should see the version of wmill that you just installed.

## Upgrade wmill

To upgrade your wmill installation to the latest version, run the following command:

```bash
wmill upgrade
```

## Completion

The CLI comes with built-in completions for various shells. Use the following instructions to enable completions for your preferred shell.

### Bash

To enable bash completions, add the following line to your ~/.bashrc:

```bash
source <(wmill completions bash)
```

### Zsh

To enable zsh completions, add the following line to your ~/.zshrc:

```bash
source <(wmill completions zsh)
```

### Fish

To enable fish completions, add the following line to your ~/.config/fish/config.fish:

```bash
source (wmill completions fish | psub)
```
