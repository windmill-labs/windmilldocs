---
slug: infrastructure-as-code
title: Infrastructure as code
tags: ['Kubernetes', 'CLI', 'Enterprise']
description: Manage Windmill instance configuration declaratively with YAML files, a Kubernetes operator, or the CLI. Version-control, review, and reproduce your setup across environments.
features:
  [
    'Declarative YAML configuration for global settings and worker groups.',
    'Kubernetes operator with ConfigMap-based continuous reconciliation and drift detection.',
    'sync-config CLI command for Docker Compose and VM deployments.',
    'Secret references via envRef (environment variables) and secretKeyRef (Kubernetes Secrets API).',
    'Export current instance configuration as YAML from the UI or CLI.',
  ]
docs: /docs/core_concepts/infrastructure_as_code
---
