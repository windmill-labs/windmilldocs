---
slug: workspace-success-handler
title: Workspace success handler
tags: ['Enterprise', 'Workspace Settings']
description: Configure a script to run automatically when jobs complete successfully in the workspace. The counterpart to the workspace error handler — receives the job result, path, and metadata. Cached with a 60-second TTL.
features:
  - Workspace-level success handler triggered on job completion
  - Receives job result, path, email, job_id, and metadata
  - Configurable from workspace settings with template support
  - 60-second cache for handler settings
docs: /docs/core_concepts/error_handling#workspace-success-handler
---
