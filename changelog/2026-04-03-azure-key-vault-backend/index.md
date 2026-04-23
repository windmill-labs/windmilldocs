---
slug: azure-key-vault-backend
title: Azure Key Vault secret backend
tags: ['Enterprise', 'Instance settings']
description: Store Windmill secrets in Azure Key Vault as an alternative to the database or HashiCorp Vault.
features:
  [
    'Azure Key Vault as a secret storage backend.',
    'Configured via Key Vault URL and service principal credentials.',
    'Same migration and fail-closed semantics as Vault.',
  ]
docs: /docs/core_concepts/variables_and_secrets#azure-key-vault-backend
---

Windmill can now store secrets in Azure Key Vault, configured with the vault URL and service principal credentials (tenant ID, client ID, client secret). Migration and fail-closed semantics are identical to the HashiCorp Vault backend.
