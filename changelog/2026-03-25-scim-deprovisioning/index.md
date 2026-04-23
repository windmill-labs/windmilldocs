---
slug: scim-deprovisioning
title: SCIM user deprovisioning
tags: ['Enterprise', 'Instance settings']
description: SCIM PATCH with active:false now disables users at the instance level instead of deleting them. Admins can also manually disable users.
features:
  [
    'SCIM deprovisioning disables users instead of deleting them.',
    'Disabled users cannot log in but retain workspace memberships.',
    'Manual enable/disable from instance settings.',
  ]
docs: /docs/misc/saml_and_scim#user-deprovisioning
---

When your identity provider sends a SCIM PATCH with `active: false`, Windmill now disables the user at the instance level rather than deleting them. Disabled users cannot authenticate but retain their workspace memberships and item ownership for auditability. Admins can also manually disable or re-enable users from instance settings.
