---
slug: token-expiration-notifications
title: Token expiration notifications
tags: ['Core']
version: v1.649.0
description: Windmill now monitors API token expiration and notifies owners via email 7 days before expiry and upon deletion. A new instance setting controls critical alerts for token expiry.
features:
  - 'Email notifications sent to token owners 7 days before expiration and when expired tokens are deleted.'
  - 'New "Alert on token expiry" instance setting to enable critical alerts for expiring/expired tokens.'
  - 'New TokenExpiringSoon and TokenExpired workspace webhook event types.'
docs: /docs/core_concepts/critical_alerts#token-expiration-notifications
---
