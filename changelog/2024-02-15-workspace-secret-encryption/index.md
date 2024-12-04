---
slug: workspace-encryption
version: v1.270.0
title: Custom workspace secret encryption
tags: ['Security']
image: ./workspace-secret-encryption.png
description: All secrets of a workspace are encrypted with a symmetric key unique to that workspace. This key is generated when the workspace is created and is stored in the database in the workspace_settings. You can now manually update the encryption key of a workspace, it will be re-encrypted with the new key and the previous key will be replaced by the new one.
features:
  [
    'Manually update the encryption key of a workspace.'
  ]
docs: /docs/core_concepts/workspace_secret_encryption
---
