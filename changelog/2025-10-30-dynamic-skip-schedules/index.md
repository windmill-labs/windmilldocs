---
slug: dynamic-skip-schedules
version: v1.568.0
title: Dynamic skip validation for schedules
tags: ['Schedules', 'Validation']
description: Schedules can now use validation scripts to dynamically determine if scheduled jobs should run or be skipped until the next tick, enabling scriptable custom conditions beyond standard cron expressions.
image: ./dynamic-skip-schedules.png
features:
  [
    'Configure validation scripts that determine if scheduled jobs should run or be skipped until next tick',
    'Skip runs based on scriptable custom conditions (weekends, holidays, API availability)',
    'Handler receives scheduled datetime and returns boolean to proceed or skip',
    'Skipped runs are marked as success with skipped flag'
  ]
docs: /docs/core_concepts/scheduling#dynamic-skip-validation
---
