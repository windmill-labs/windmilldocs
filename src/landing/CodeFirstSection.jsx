import React, { useState } from 'react';
import Link from '@docusaurus/Link';

const snippets = [
	{
		label: 'Workspace repo',
		caption: 'Your workspace as a file tree',
		code: `f/
├── etl/
│   ├── stripe_to_postgres.flow.yaml
│   └── stripe_to_postgres/
│       ├── fetch_invoices.ts
│       └── transform.py
├── devops/
│   └── rotate_iam_keys.ts
├── apps/
│   └── billing_dashboard.app/
├── resources/
│   ├── postgres_prod.resource.yaml
│   └── slack_webhook.resource.yaml
└── schedules/
    └── stripe_sync.schedule.yaml`,
	},
	{
		label: 'Worker groups',
		caption: 'Worker groups and autoscaling',
		code: `worker_configs:
  default:
    worker_tags:
      - deno
      - python3
      - bun
      - go
      - bash

  gpu:
    worker_tags: [gpu-task]
    dedicated_worker: "f/gpu_scripts/inference"
    autoscaling:
      enabled: true
      min_workers: 0
      max_workers: 4`,
	},
	{
		label: 'Global settings',
		caption: 'Instance-level configuration as code',
		code: `global_settings:
  base_url: "https://windmill.example.com"
  retention_period_secs: 2592000
  job_default_timeout: 900
  expose_metrics: true

  oauths:
    google:
      id: "google-client-id"
      secret: "google-client-secret"

  otel:
    otel_exporter_otlp_endpoint: "http://otel:4317"
    tracing_enabled: true
    metrics_enabled: true`,
	},
];

export default function CodeFirstSection() {
	const [active, setActive] = useState(0);
	const snippet = snippets[active];

	return (
		<div className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
				<div>
					<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
						From scripts to infrastructure, everything lives in code
					</h2>
					<p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
						Your entire workspace is versioned in Git. Teams can build from the UI or locally, while engineers manage infrastructure, deployments and environments with full code flexibility.
					</p>
					<Link
						to="/docs/advanced/git_sync"
						className="text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline !no-underline"
					>
						Learn about infrastructure as code →
					</Link>
				</div>
				<div>
					<div className="flex gap-1 mb-3">
						{snippets.map((s, i) => (
							<button
								key={s.label}
								onClick={() => setActive(i)}
								className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
									i === active
										? 'bg-[#0d1117] text-white'
										: 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
								}`}
								style={{ border: 'none' }}
							>
								{s.label}
							</button>
						))}
					</div>
					<div className="rounded-2xl overflow-hidden bg-[#0d1117] p-6" style={{ height: '450px' }}>
						<pre className="text-sm leading-relaxed text-gray-300 m-0 bg-transparent overflow-x-auto">
							<code>{snippet.code}</code>
						</pre>
					</div>
					<p className="text-sm font-medium text-gray-600 dark:text-gray-400 mt-3 text-center">
						{snippet.caption}
					</p>
				</div>
			</div>
		</div>
	);
}
