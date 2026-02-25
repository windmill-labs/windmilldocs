---
slug: force-sandboxing
title: Force sandboxing
version: v1.634.0
tags: ['Self-hosting', 'Security']
description: Instance-level setting to enforce nsjail sandboxing across all jobs, and per-script <code>#sandbox</code> annotation for bash scripts.
features:
  - 'job_isolation instance setting with nsjail_sandboxing value to enforce sandboxing for all jobs.'
  - 'Sandboxing enabled when either job_isolation is set or DISABLE_NSJAIL=false.'
  - '#sandbox bash annotation to enable sandboxing for individual bash scripts.'
  - 'Nsjail always probed at startup regardless of DISABLE_NSJAIL setting.'
docs: /docs/advanced/security_isolation#force-sandboxing
---
