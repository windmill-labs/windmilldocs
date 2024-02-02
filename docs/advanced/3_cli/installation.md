# Installation

<iframe
    style={{ aspectRatio: '16/9' }}
    src="https://www.youtube.com/embed/w2HVTlR2QDI?vq=hd1080"
    title="YouTube video player"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    className="border-2 rounded-xl object-cover w-full dark:border-gray-800"
></iframe>

<br/>

To install the wmill CLI, follow these steps:

1. Make sure you have [Deno](https://deno.com/) installed. If not, you can install it by following the instructions [here](https://deno.com/manual@v1.34.0/getting_started/installation).

Please note that your version of Deno should be recent (greater than 1.32). If not, you can update Deno by running `deno upgrade`.

2. Install wmill CLI using the following command in your terminal:

```bash
deno install -q -A https://deno.land/x/wmill/main.ts
```

Your terminal might also ask you to update your PATH environment variable to include the newly installed executable `wmill`. Example:

Linux:

```bash
export PATH="$HOME/.deno/bin:$PATH"
```

Mac:

```bash
export PATH="/Users/<username>/.deno/bin:$PATH"
```

:::tip

In an enterprise setting with custom certificates, you can edit the wmill binary to ignore CA issues:

```
sed -i 's/deno run/deno run --unsafely-ignore-certificate-errors/' ~/.deno/bin/wmill
```

Also, to punch through some networking layers like Cloudflare Tunnel, you might need some custom headers. You just need to use the HEADERS env variable:

```
export HEADERS=header_key:header_value,header_key2:header_value2
```

:::

1. Verify that the installation was successful by running the following command:

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
