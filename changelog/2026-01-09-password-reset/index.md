---
slug: password-reset
title: Password reset via SMTP
tags: ['Authentication', 'Self-hosting']
description: Users can now reset their password from the login page when <a href="/docs/advanced/instance_settings#smtp">SMTP is configured</a> on the instance. A "Forgot password?" link sends a time-limited reset email (1 hour expiry). The flow prevents email enumeration by always showing a success message.
features:
  - '"Forgot password?" link on the login page'
  - Secure token-based reset flow with 1-hour expiry
  - Email enumeration protection
docs: /docs/core_concepts/authentification#password-reset
---
