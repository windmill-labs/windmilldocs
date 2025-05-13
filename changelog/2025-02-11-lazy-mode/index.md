---
slug: lazy-mode
version: v1.460.0
title: Lazy mode
tags: ['App editor', 'Lazy mode']
description: Lazy mode is a feature that allows you to lazy render components which is ideal for apps with many components where most are not directly visible to the user.
features:
  [
    'Eager mode: all components are initialized when the app is loaded.',
    'Semi-lazy mode: components are initialized when the app is loaded but are in a hidden state.',
    'Lazy mode: components are not initialized when the app is loaded.',
    'You can provide component ids to wait the initialization of before the initial refresh.',
  ]
image: ./lazy_mode.png
docs: /docs/apps/lazy_mode
---