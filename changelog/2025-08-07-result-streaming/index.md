---
slug: result-streaming
version: v1.518.0
title: Result streaming
tags: ['streaming', 'result']
description: >
  We introduce native result streaming in 1.518.0. Returns a stream (any `AsyncGenerator` or `iter` compatible object) as a result OR to stream text before the result is fully returned. It works with Typescript (Bun, Deno, Nativets), Python and is compatible with agent workers.
  If not returning the stream directly, we introduce 2 new functions on our SDK: `wmill.streamResult(stream)` (TS) and `wmill.stream_result(stream)` (Python), to do it mid-script.

  It's made with LLM action in mind because many scripts nowadays interact with LLM that have streaming response that can be returned in a streaming manner as a result. We will progressively refactor all our relevant hub scripts that are compatible with streaming to leverage this new capability.

  The stream only exists while the job is in the queue. Afterwards, the full stream becomes the result (or added as the field "wm_stream" if there is already a result).
features:
  - return stream objects to stream directly results
  - compatible with LLM sdks to stream their response as-is
  - new SDK functions to stream within the job
  - once job is finished, full stream becomes the result
docs: /docs/core_concepts/jobs#result-streaming
---
