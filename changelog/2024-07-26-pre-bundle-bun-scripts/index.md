---
slug: pre-bundle-bun-scripts
version: v1.368.0
title: TypeScript Bun scripts are automatically pre-bundled
tags: ['Script editor', 'Flow editor']
description: Windmill now pre-bundles TypeScript (Bun) scripts using [Bun bundler](https://bun.sh/docs/bundler) and caches them on S3 and locally at deployment time. Furthermore, if a Bun script is run while not being pre-bundled, it will be re-bundled. This will increase stability and optimize (in some cases with 60% improvement) the execution time and the memory consumption, in particular for scripts with many/heavy imports and relative imports.<br/><br/>We also did improvements for non-deployed scripts using better caching strategies for the dependency cache. You cannot do any faster than running a pre-bundled script aside from having the script being already running which is what dedicated workers are made for. This makes Windmill the fastest platform to run TypeScript.<br/><br/>However, in very rare cases (< 1%), this might break existing bun scripts that are incompatible with being bundled. If you notice such issue for a particular script after the upgrade, add //nobundling to the top of the script.
features:
  [
    'TypeScript Bun scripts are automatically pre-bundled.',
    'Cold start improvement.',
    'Memory usage improvement.',
  ]
docs: /docs/getting_started/scripts_quickstart/typescript#pre-bundling-and-nobundling
---