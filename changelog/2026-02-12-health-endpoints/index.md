---
slug: health-endpoints
title: Health endpoints
version: v1.633.0
tags: ['Self-hosting']
description: Unauthenticated and authenticated health endpoints for monitoring Windmill instances. Includes Prometheus metrics, Kubernetes readiness probe support, and detailed diagnostics.
features:
  - 'Unauthenticated /api/health endpoint with 5-second cache for lightweight uptime checks.'
  - 'Authenticated detailed endpoint returning database latency, connection pool stats, worker groups, and queue depth.'
  - 'Prometheus metrics: health_status_phase, health_database_latency_ms, health_active_workers, health_queue_depth.'
  - 'SILENCE_HEALTH_LOGS environment variable to suppress health check log noise.'
docs: /docs/advanced/self_host#health-endpoints
---
