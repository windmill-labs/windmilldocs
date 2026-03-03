import { Code2, Database, LayoutGrid, GitBranch, Cpu, Bot, Shield, Activity } from 'lucide-react';

export const platformLayers = [
	{ label: 'Workers', detail: 'Run scripts in isolated containers', icon: Code2, expanded: 'Scripts run on isolated workers with configurable CPU, memory and timeout. Support for TypeScript, Python, Go, SQL, Bash, PHP, Rust and more. No container orchestration to manage.' },
	{ label: 'Orchestration', detail: 'Flows, schedules, triggers, AI agents', icon: Cpu, expanded: 'A workflow engine to chain scripts into flows with parallel branches, approval steps and loops. Trigger via cron, webhooks, Kafka, Postgres CDC or custom events.' },
	{ label: 'AI', detail: 'Claude Code / Codex in the IDE, sandboxed agents', icon: Bot, expanded: 'Generate scripts and apps with Claude Code or Codex directly in the editor. Run AI agents in isolated sandboxes with controlled access to resources. AI-assisted development that deploys instantly on the production engine.' },
	{ label: 'Data', detail: 'Built-in data tables + integration', icon: Database, expanded: 'Built-in data tables for zero-setup SQL storage. Connect to PostgreSQL, MySQL, BigQuery, Snowflake or S3 via shared resources. Query with DuckDB or Ducklake.' },
	{ label: 'Frontend', detail: 'React / Vue / Svelte on the platform', icon: LayoutGrid, expanded: 'Import your own React, Vue or Svelte codebase. Windmill serves it with built-in routing, auth and direct access to backend scripts. No separate hosting or API gateway.' },
	{ label: 'Security & governance', detail: 'RBAC, SSO, audit logs, self-host', icon: Shield, expanded: 'Granular role-based access control. SSO with SAML, OAuth and LDAP. Full audit trail of every action. Self-host on your own infrastructure, including air-gapped deployments.' },
	{ label: 'Deployment & versioning', detail: 'Git sync, one-click deploy, rollback', icon: GitBranch, expanded: 'Deploy scripts, flows and apps in one click from the UI or via CLI. Sync with GitHub or GitLab. Every script and flow is versioned — roll back to any previous version instantly.' },
	{ label: 'Observability', detail: 'Execution history, logs, error handlers', icon: Activity, expanded: 'Every execution is logged with input, output, duration and errors. Configurable retries with exponential backoff. Custom error handler scripts per step.' },
];
