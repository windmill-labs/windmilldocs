---
slug: token-expiration-notifications
title: Token expiration notifications
tags: ['Core']
description: Windmill now monitors API token expiration and notifies owners via email 7 days before expiry and upon deletion. A new instance setting controls in-app critical alerts for token expiry.
features:
  - 'Email notifications sent to token owners 7 days before expiration and when expired tokens are deleted.'
  - 'New "Alert on token expiry" instance setting to enable in-app critical alerts for expiring/expired tokens.'
  - 'Color-coded expiration badges in the tokens table for tokens expiring within 30 days.'
  - 'Warning banner in the tokens table for tokens expiring within 7 days.'
  - 'New TokenExpiringSoon and TokenExpired workspace webhook event types.'
docs: /docs/core_concepts/critical_alerts#token-expiration-notifications
---
