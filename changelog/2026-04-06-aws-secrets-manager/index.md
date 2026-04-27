---
slug: aws-secrets-manager
title: AWS Secrets Manager backend (Beta)
tags: ['Enterprise', 'Instance settings']
description: Store Windmill secrets in AWS Secrets Manager as an alternative to the database, HashiCorp Vault, or Azure Key Vault.
features:
  [
    'AWS Secrets Manager as a third external secret storage backend.',
    'Supports static credentials or the default AWS credential chain (IAM roles, env vars).',
    'Configurable prefix and custom endpoint for LocalStack.',
    'Bidirectional migration between backends.',
  ]
docs: /docs/core_concepts/variables_and_secrets#aws-secrets-manager-backend-beta
---

Windmill can now store secrets in AWS Secrets Manager, joining HashiCorp Vault and Azure Key Vault as external secret backend options. Configure it from **Instance Settings > Secret backend** with your AWS region and optional credentials. The same migration and fail-closed semantics apply.
