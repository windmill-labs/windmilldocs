---
slug: private-registries-npm-maven-cargo
title: Private registries for npm, Maven, and Cargo
version: v1.641.0
tags: ['Enterprise', 'Script editor']
description: Configure private package registries for npm, Maven, and Cargo from instance settings. Supports .npmrc for npm/Bun/Deno, settings.xml for Maven/Java, and config.toml for Cargo/Rust.
features:
  - '.npmrc support for npm private registries, compatible with Bun (1.1.18+), Deno 2.x, and npm proxy.'
  - 'Maven settings.xml configuration for private Maven repositories, written to {JAVA_HOME}/.m2/settings.xml.'
  - 'Cargo config.toml for private Cargo registries, written to .cargo/config.toml in the job directory.'
  - 'All private registry configurations are Enterprise Edition features.'
docs: /docs/advanced/instance_settings#registries
---
