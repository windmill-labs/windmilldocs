---
slug: cli-lockfiles
version: v1.320.0
title: CLI and Git sync major improvements
tags: ['Local development', 'wmill CLI']
image: ./lockfile.png
description: Latest CLI and Git sync have 2 major improvements:<br/><br/> 1. Wherever there is a lockfile (in scripts, flows and apps), the lockfile is now stored in a separate file (`<same_path_as_script_or_inline_script>.lock`) and referenced in the yaml by `!inline <path of lock>`. We had numerous feedback from EE customers that the lockfile were hard to diff and added lots of boilerplate to otherwise clean yaml files. <br/><br/> 2. Script in apps (even frontend scripts) are now stored in separate files, similar to what is the case for flows. Which mean now apps are their own folders:`myapp.yaml` -> `myapp.app/app.yaml` + `myapp.app/inline_script1.ts` + `myapp.app/inline_script1.lock` + ...<br/><br/>This will improve greatly the ability to use commits/PR to review scripts, flows and apps changes.<br/><br/>To do a clean update:<br/>- Upgrade Deno.<br/>- Upgrade wmill CLI to latest.<br/>- Do a wmill sync pull and push to your repo.<br/>-update the CLI used to 1.320.3 in your GitHub actions.<br/>- Update your git sync script (we've made that easier, just click button and save git settings).
features:
  [
    'Scripts pulled locally come with a .lock file (separated from metadata file).',
    'Script in apps are now stored in separate files.'
  ]
docs: /docs/advanced/local_development#editing-and-creating-scripts-locally
---