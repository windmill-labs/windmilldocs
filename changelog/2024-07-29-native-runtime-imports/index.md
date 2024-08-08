---
slug: native-runtime-imports
version: v1.370.0
title: Nativets runtime supports npm packages and relative imports
tags: ['Script Editor']
description: We've made our runtime that we've called "REST" and "nativets" support npm packages and relative imports! There is now no difference in the syntax of TypeScript/Bun scripts and native scripts. Native scripts still only support a subset of what node supports (just the fetch operation) but many npm packages can still be used because that's all they use under the hood (for instance, windmill-client and axios).<br/><br/>How to activate? Just add `//native` to the head of your script. Windmill will automatically convert between 'nativets' and 'Bun' scripts based on the presence of this header so you can always just pick TypeScript (Bun) and decide at the end if you want to accelerate it with 'native' if possible.<br/><br/>We've also changed the default docker-compose/helm template to go from 4 small native workers with each 1 subworker to 1 bigger native worker with 8 subworkers as it performed better in our benchmarks. If you need more throughput, simply increase the replicas of the native workers, don't increase the number of subworkers past 8 as the interleaving will result in lower throughput.<br/><br/>This is a huge improvement as you can now make our native runtime an implementation details and we can unify everything under the standard "TypeScript" language without anything Windmill-specific. Legacy native/fetch scripts will still work but the new REST button now simply prefill a Bun script with a `//native` header. <br/><br/>Native runtime is great for scripts that are doing simple fetch and require little compute but are io-bound on the response from the API. You can get parallelization of 8 requests/scripts at a time with a single worker, resulting in 8x better throughput between Bun and native scripts at scale.
features:
  [
    'Support for npm packages and relative imports in `REST` and `nativets` runtimes.',
    'Unified syntax between TypeScript/Bun scripts and native scripts.',
    'Automatic conversion between `nativets` and `Bun` scripts based on `//native` header.',
    'Improved scaling strategy with a single bigger native worker managing more subworkers.',
    'Legacy scripts compatibility while promoting new REST standard with pre-filled Bun script templates.',
    'Parallelization capabilities allowing 8 simultaneous fetch operations.'
  ]
docs: /docs/getting_started/scripts_quickstart/rest_graphql
---