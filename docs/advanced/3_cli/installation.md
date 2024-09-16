# Installation

<iframe
    style={{ aspectRatio: '16/9' }}
    src="https://www.youtube.com/embed/TXtmLrToxoI"
    title="YouTube video player"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    className="border-2 rounded-lg object-cover w-full dark:border-gray-800"
></iframe>

<br/>

To install the wmill CLI:

```bash
npm install -g windmill-cli
```

Node version must greater than v20.

Also, to punch through some networking layers like Cloudflare Tunnel, you might need some custom headers. You just need to use the HEADERS env variable:

```
export HEADERS=header_key:header_value,header_key2:header_value2
```

Verify that the installation was successful by running the following command:

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
