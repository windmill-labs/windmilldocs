---
slug: track-relative-imports
version: v1.343.0
title: Tracking relative imports to avoid dependency hell
tags: ['Scripts', 'Flow Editor']
description: Windmill now automatically tracks relative imports in Bun and Python such that if you update a common dependency and update its imports, it will now re-trigger deployment and lockfile computation of all the scripts that depend on it (it was working for Python but not Bun before).<br/><br/> Windmill can now also track such imports in inline scripts of flows and will surgically update the inline lockfiles of those flows if the relative imports change.
features:
  [
    'Automatic re-trigger of deployment and lockfile computation of all the scripts that depend on Bun script.',
    'When doing `wmill sync pull`, the wmill-lock.yaml will now automatically be updated, avoiding re-triggering lockfile computation for all files, only the ones that have changed from last sync.',
    'Flows inline lockfile can now be updated locally using `wmill flow generate-locks`, which is the equivalent of `wmill script generate-metadata --lock-only` but for flows` inline scripts.',
  ]
docs: /docs/advanced/sharing_common_logic#tracking-relative-imports-on-local-development
---