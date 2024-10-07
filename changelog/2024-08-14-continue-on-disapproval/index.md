---
slug: continue-on-disapproval
version: v1.380.0
title: Continue on disapproval/timeout
tags: ['Flow editor']
description: On approval steps, a new toggle to continue flow execution on disapproval of approval step. If set, instead of failing the flow will bubble up the error and continue.
features:
  [
    'New toggle to continue flow execution after disapproval.',
    'Would allow to put a branchone right after to handle both cases separately.',
    'New toggle to continue flow execution after disapproval.',
    'If any disapproval/timeout event is received, the resume payload will be similar to every error result in Winmdill, an object containing an `error` field which you can use to distinguish between approvals and disapproval/timeouts.',
  ]
docs: /docs/flows/flow_approval#continue-on-disapprovaltimeout
video: /videos/continue_on_disapproval.mp4
---