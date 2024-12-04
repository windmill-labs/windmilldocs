---
slug: log-disk-distributed-storage-compaction
version: v1.295.0
title: Large log disk and distributed storage compaction
tags: ['Storage']
description: One of our large scale customers noticed that their database disk usage was much much higher than they anticipated. After investigation, we realized that our use of the database for streaming was very suboptimal in a few ways due to the nature of update in postgres. When you update a row in Postgres, it will actually keep the prior row as a dead tuple until it is collected. It doesn't matter in much case but it will if you're appending a few log lines to a 25MB log row, every 500ms. <br/><br/> **We have completely refactored the way we deal with logs in major ways  and starting on 1.295.0 you should feel comfortable having extremely large logs on Windmill** <br/><br/> First action we took was to extract the logs from the queue table to a separate table. That was to avoid update unrelated to logs creating dead tuples. Second action was to make the streaming rate from the worker adaptive to the duration of the job, a longer job does not need to update its log every 500ms, every 2.5s is reasonable for jobs of more than 10s, 5s for 60s+, etc... <br/><br/> But that was still not enough, even every 2.5s an update on a 25mb log would create lots of heavy dead tuples. And 25MB is not that large, our customer should feel confident streaming GBs of logs per job with jobs that run for months. <br/><br/> So we completely revisited the way we store logs to only treat the database as a buffer for streaming purpose rather than long term storage. We keep the db as a 5000 char buffer to still provide the same instant preview as before but <br/><br/> 1. On EE, the logs will be streamed to S3 if you connected your instance to S3, everything is seamless and you can still download the entire log, Windmill will take care of streaming from S3 <br/><br/> 2. non EE, the excess log (>10000 chars)  will be stored on disk of the worker (mount /tmp/windmill/logs to persist those). <br/><br/> **Now the db only stores at most 5Kb of logs per job rows, reducing the pressure on it by order of magnitudes, while users can now run jobs with unlimited logs with minimal impact on the worker or db. And the logs are still as live as before**
features:
  [
    'Logs moved to a separate table to reduce database clutter.',
    'Adaptive log update frequency based on job duration to lessen database load.',
    'Database used as a buffer for instant log previews, storing up to 5000 characters.',
    'S3 streaming for EE users and local storage for non-EE users for extensive logs.',
    'Significantly reduced database pressure, supporting unlimited log sizes with minimal impact.'

  ]
docs: /docs/core_concepts/variables_and_secrets#custom-contextual-variables
---