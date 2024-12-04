---
slug: user-resources-in-apps
version: v1.338.0
title: Allow user resources in Apps with a toggle
tags: ['App editor']
image: ./resources_from_users.png
description: Apps are executed on behalf of publishers and by default cannot access viewer's resources.<br/><br/>If the resource passed here as a reference does not come from a static Resource select component (which will be whitelisted by the auto-generated policy), you need to toggle "Resources from users allowed".<br/><br/>The toggle "Static resource select only / Resources from users allowed" can be found for each runnable input when the source is an eval.
features:
  [
    'By default, dynamic resource input from app runnables can only be filled from components Resource Picker.',
    'With a toggle on each dynamic resource input, you can allow to pass resources from user or scripts & flows outputs.',
  ]
docs: /docs/apps/app-runnable-panel#static-resource-select-only--resources-from-users-allowed
---