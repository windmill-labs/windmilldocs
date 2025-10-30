---
slug: slack-mention-triggers
version: v1.567.0
title: Slack @mention triggers
tags: ['Integrations', 'Slack', 'Triggers']
description: Trigger Windmill scripts by @mentioning the Windmill bot in Slack channels, threads, or direct messages - in addition to slash commands.
features:
  [
    'Trigger scripts with @Windmill in public channels, private channels, DMs, and threads',
    'Use the same handler script for both /windmill commands and @mentions',
    'Bot mention is automatically stripped from text before passing to handler',
    'Distinguish between triggers using the command parameter (@mention vs /windmill)',
    'Respond to slash commands using response_url webhook',
    'Respond to @mentions using Slack Web API with bot token',
  ]
docs: /docs/integrations/slack#using-mentions
---
