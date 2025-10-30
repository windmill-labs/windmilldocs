---
slug: workspace-slack-oauth
version: v1.567.0
title: Workspace-level Slack app configuration
tags: ['Integrations', 'Slack', 'OAuth']
description: Workspace admins can now configure their own Slack app with workspace-specific OAuth credentials for better isolation and independent management.
features:
  [
    'Configure workspace-specific Slack app credentials (Client ID and Secret)',
    'Workspace isolation with separate Slack apps per workspace',
    'Independent rate limits per workspace',
    'Automatic fallback to instance-level configuration when not configured',
    'Applies to f/slack_bot/bot_token resource for workspace handlers and Slack approvals',
  ]
docs: /docs/integrations/slack#workspace-level-slack-app-configuration
image: ./workspace-slack.png
---
