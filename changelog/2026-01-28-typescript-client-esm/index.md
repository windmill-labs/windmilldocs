---
slug: typescript-client-esm
title: TypeScript client ESM build and tree-shaking
tags: ['SDK']
description: The windmill-client npm package now ships dual ESM/CJS builds using tsdown. Tree-shaking is enabled via sideEffects, false and unbundled ESM output, reducing simple imports from ~91KB to ~900 bytes.
features:
  - Dual ESM and CJS builds for windmill-client
  - Tree-shaking support with sideEffects false
  - ~100x reduction in bundle size for simple imports
  - Backward-compatible default export preserved
---
