---
slug: quickjs-flow-eval
title: QuickJS for flow expressions
tags: ['Workers', 'Performance']
description: Flow expressions (input transforms, branch predicates, for-loop iterators) can now be evaluated with QuickJS, a lightweight JS engine with 8-16x faster startup for simple expressions. Default on Community Edition; opt-in on Enterprise Edition via <code>USE_QUICKJS_FOR_FLOW_EVAL</code>.
features:
  - QuickJS as alternative JS engine for flow expression evaluation
  - 8-16x faster startup times for simple expressions
  - Lazy evaluation of resource() and variable() calls
  - Default on Community Edition, opt-in on Enterprise Edition
docs: /docs/flows/architecture#javascript-evaluation-engine
---
