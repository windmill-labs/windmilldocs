---
slug: workspace-service-accounts
title: Workspace service accounts
tags: ['Enterprise', 'Workspace']
description: Create workspace-scoped automation identities that cannot log in directly, for CI/CD pipelines and API integrations.
features:
  [
    'Workspace-scoped service accounts that cannot log in.',
    'Always operators with a username-only identity.',
    'Admin impersonation for testing permissions.',
  ]
docs: /docs/core_concepts/roles_and_permissions#service-accounts
---

Workspace service accounts are non-interactive automation identities for CI/CD pipelines, scheduled jobs, or API integrations. They are always operators and can be created from workspace settings with just a username. Admins can impersonate service accounts to verify their permissions.
