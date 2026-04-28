import React, { useState } from 'react';
import Layout from '@theme/Layout';
import {
	Check,
	X,
	ChevronDown,
	ChevronRight,
	Users,
	Terminal,
	Boxes,
	Puzzle,
	ArrowRightLeft,
	Gauge,
	Scale,
	Compass,
	Trophy,
	Minus,
	ArrowRight,
} from 'lucide-react';

/* ────────────────────────────────────────────────────────────────
   Shared mock data (subset of the real kestra-content.mdx, just so
   each approach is concrete enough to evaluate).
   ──────────────────────────────────────────────────────────────── */

const WinnerBadge = ({ winner }) => {
	if (winner === 'windmill') {
		return (
			<span className="inline-flex items-center gap-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold px-2.5 py-1">
				<Trophy className="w-3 h-3" /> Windmill
			</span>
		);
	}
	if (winner === 'kestra') {
		return (
			<span className="inline-flex items-center gap-1 rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 text-xs font-semibold px-2.5 py-1">
				<Trophy className="w-3 h-3" /> Kestra
			</span>
		);
	}
	return (
		<span className="inline-flex items-center gap-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs font-semibold px-2.5 py-1">
			<Minus className="w-3 h-3" /> It depends
		</span>
	);
};

const scorecard = [
	{
		id: 'target',
		kicker: 'Target audience',
		icon: Users,
		winner: 'depends',
		windmillSays: 'Best for developer-led teams that own the platform.',
		kestraSays: 'Best for mixed teams where analysts also author flows.',
		verdict: 'Devs → Windmill. Mixed teams → Kestra.',
	},
	{
		id: 'devex',
		kicker: 'Developer experience',
		icon: Terminal,
		winner: 'windmill',
		windmillSays: 'Code in TS/Python/Go/Bash/SQL, full local-dev loop, Git sync for everything.',
		kestraSays: 'Declarative YAML with plugin tasks, Git sync for flows.',
		verdict: 'Windmill for full code flexibility + whole-workspace Git.',
	},
	{
		id: 'build',
		kicker: 'What you can build',
		icon: Boxes,
		winner: 'windmill',
		windmillSays: 'Workflows, data pipelines, scripts, AI agents, internal apps — one runtime.',
		kestraSays: 'Orchestration only. Bring your own stack for apps, dashboards, agents.',
		verdict: 'Windmill covers more primitives on the same platform.',
	},
	{
		id: 'integrations',
		kicker: 'Integrations',
		icon: Puzzle,
		winner: 'depends',
		windmillSays: 'Any npm / PyPI / Go package is a first-class import. No plugin layer.',
		kestraSays: '1,200+ curated plugins (Snowflake, dbt, Airbyte, Databricks…).',
		verdict: 'Mainstream data stack → Kestra. Niche systems → Windmill.',
	},
	{
		id: 'migration',
		kicker: 'Migration & lock-in',
		icon: ArrowRightLeft,
		winner: 'windmill',
		windmillSays: 'Step code is standard language — runs anywhere after you leave.',
		kestraSays: 'YAML bound to io.kestra.plugin.* task types.',
		verdict: 'Windmill has lower switching cost.',
	},
	{
		id: 'enterprise',
		kicker: 'Enterprise requirements',
		icon: Gauge,
		winner: 'depends',
		windmillSays: '~3× faster on lightweight tasks. SOC 2 Type II, RBAC, SSO, audit logs.',
		kestraSays: 'Queue-based, scalable. SOC 2, RBAC, SSO, audit logs on Enterprise.',
		verdict: 'High-volume short tasks → Windmill. Long-running data tasks → tie.',
	},
	{
		id: 'licensing',
		kicker: 'Licensing & pricing',
		icon: Scale,
		winner: 'depends',
		windmillSays: 'AGPLv3. Public per-seat + per-worker Enterprise pricing.',
		kestraSays: 'Apache 2.0. Enterprise pricing requires a sales call.',
		verdict: 'Permissive license → Kestra. Transparent pricing → Windmill.',
	},
];

const buildRows = [
	{ feature: 'Workflows', description: 'Chain scripts into flows with branching, retries and approval steps', windmill: true, kestra: true },
	{ feature: 'Data pipelines', description: 'ETL, syncs and scheduled data jobs with parallel branches', windmill: true, kestra: true },
	{ feature: 'Scripts', description: 'Functions in any language, deployed as APIs, webhooks or cron jobs', windmill: true, kestra: false },
	{ feature: 'AI sandboxes & volumes', description: 'Isolated environments with persistent volumes for running agents', windmill: true, kestra: false },
	{ feature: 'Full-code internal apps', description: 'Dashboards and admin tools with full-code flexibility', windmill: true, kestra: false },
	{ feature: 'Scheduled tasks', description: 'Cron jobs with retries, error handling and alerting', windmill: true, kestra: true },
];

/* ────────────────────────────────────────────────────────────────
   APPROACH E — Landing-page pattern
   Each of the 8 Qs becomes a title + subtitle on the left, with a
   tab-switched code snippet on the right showing Windmill vs Kestra.
   Matches the "From scripts to infrastructure" section style.
   ──────────────────────────────────────────────────────────────── */

const compareSections = [
	{
		id: 'devex',
		kicker: '02 · Developer experience',
		title: 'How do developers author workflows?',
		subtitle:
			'A Windmill step is a function in your language of choice — arguments flow between steps as return values. A Kestra step is a plugin task declared in YAML.',
		windmill: {
			caption: 'Step code in TypeScript, Python, Go, Bash or SQL',
			lang: 'typescript',
			code: `// scripts/billing/compute_invoice.ts
import Stripe from 'stripe';

export async function main(
  customerId: string,
  month: string,
) {
  const stripe = new Stripe(process.env.STRIPE_KEY);
  const invoices = await stripe.invoices.list({
    customer: customerId,
    created: { gte: monthStart(month) },
  });

  const total = invoices.data.reduce(
    (sum, inv) => sum + inv.amount_paid,
    0,
  );

  return { customerId, month, total };
}`,
		},
		kestra: {
			caption: 'Declarative YAML with plugin tasks',
			lang: 'yaml',
			code: `# flows/billing/compute_invoice.yaml
id: compute_invoice
namespace: billing

inputs:
  - id: customerId
    type: STRING
  - id: month
    type: STRING

tasks:
  - id: fetch
    type: io.kestra.plugin.scripts.python.Script
    beforeCommands:
      - pip install stripe
    script: |
      import stripe, os
      stripe.api_key = os.getenv("STRIPE_KEY")
      invoices = stripe.Invoice.list(
          customer="{{ inputs.customerId }}",
      )`,
		},
	},
	{
		id: 'build',
		kicker: '03 · What you can build',
		title: 'One runtime, or orchestration only?',
		subtitle:
			'Windmill ships scripts, flows, data pipelines, AI agents, internal apps and operator portals on the same runtime. Kestra focuses on orchestration — you bring your own stack for everything else.',
		windmill: {
			caption: 'Six primitives, one platform',
			lang: 'text',
			code: `f/
├── workflows/
│   └── weekly_report.flow.yaml       ← flows
├── pipelines/
│   └── stripe_to_warehouse.flow.yaml ← data pipelines
├── scripts/
│   ├── rotate_iam_keys.ts            ← scripts (APIs, cron, webhooks)
│   └── send_slack.py
├── agents/
│   └── triage_support.agent.yaml     ← AI agents + sandboxes
├── apps/
│   └── billing_dashboard.app/        ← internal apps
└── schedules/
    └── nightly_sync.schedule.yaml    ← scheduled tasks`,
		},
		kestra: {
			caption: 'Orchestration only — flows and schedules',
			lang: 'text',
			code: `namespaces/
├── flows/
│   ├── weekly_report.yaml            ← flows
│   ├── stripe_to_warehouse.yaml      ← data pipelines (as flows)
│   └── nightly_sync.yaml             ← scheduled flows
└── (no primitive for)
     · scripts as standalone APIs
     · AI agents with sandboxes
     · internal apps / dashboards
     · operator portals
     → bring your own stack`,
		},
	},
	{
		id: 'integrations',
		kicker: '04 · Integrations',
		title: 'Plugin catalog vs the language ecosystem',
		subtitle:
			'Windmill has no plugin layer — any npm, PyPI, Go or Maven package is a first-class integration. Kestra ships 1,200+ curated plugins for mainstream data tools.',
		windmill: {
			caption: 'Any package is an integration — no plugin release cycle',
			lang: 'typescript',
			code: `// Just a normal package import
import { Client } from 'pg';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';

export async function main(ticketId: string) {
  const pg = new Client(process.env.DATABASE_URL);
  const stripe = new Stripe(process.env.STRIPE_KEY);
  const openai = new OpenAI();

  // Call vendor SDKs directly — no plugin in between
  const ticket = await pg.query(
    'SELECT * FROM tickets WHERE id = $1',
    [ticketId],
  );
  // …
}`,
		},
		kestra: {
			caption: '1,200+ curated plugins for the mainstream data stack',
			lang: 'yaml',
			code: `tasks:
  - id: extract
    type: io.kestra.plugin.jdbc.postgresql.Query
    url: jdbc:postgresql://prod/tickets
    sql: SELECT * FROM tickets WHERE id = '{{ inputs.id }}'

  - id: charge
    type: io.kestra.plugin.stripe.Charges
    apiKey: "{{ secret('STRIPE_KEY') }}"

  - id: summarise
    type: io.kestra.plugin.openai.ChatCompletion
    prompt: "Summarise ticket {{ outputs.extract.rows[0] }}"

# Official plugins for Snowflake, dbt, Airbyte,
# Databricks, BigQuery, Salesforce, and 1,200+ more.`,
		},
	},
	{
		id: 'licensing',
		kicker: '07 · Licensing & pricing',
		title: 'Public pricing or a sales call?',
		subtitle:
			'Both are free to self-host. Windmill publishes per-seat and per-worker Enterprise pricing. Kestra requires a sales conversation.',
		windmill: {
			caption: 'AGPLv3 core · public Enterprise pricing',
			lang: 'text',
			code: `LICENSE       AGPLv3 (free, unlimited self-hosted)

ENTERPRISE    Public pricing on windmill.dev/pricing

  Seats       from $10 / user / month
  Workers     from $120 / worker / month

  Includes    SSO, audit logs, dedicated workers,
              advanced worker groups, SLA

No sales call needed to evaluate total cost.`,
		},
		kestra: {
			caption: 'Apache 2.0 core · Enterprise pricing on request',
			lang: 'text',
			code: `LICENSE       Apache 2.0 (free, unlimited self-hosted)

ENTERPRISE    Pricing not public

  Contact sales for a quote.

  Includes    SSO, multi-tenancy, audit logs,
              advanced RBAC

Permissive license is a win if you plan to
modify and redistribute the core.`,
		},
	},
];

function CompareSection({ section }) {
	const [tab, setTab] = useState('windmill');
	const current = section[tab];
	return (
		<div className="py-12 border-t border-gray-100 dark:border-gray-800 first:border-t-0">
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
				<div>
					<div className="text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-3">
						{section.kicker}
					</div>
					<h3 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
						{section.title}
					</h3>
					<p className="text-lg text-gray-600 dark:text-gray-300">{section.subtitle}</p>
				</div>
				<div>
					<div className="flex gap-1 mb-3">
						{['windmill', 'kestra'].map((key) => (
							<button
								key={key}
								onClick={() => setTab(key)}
								className={`inline-flex items-center gap-2 px-4 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer capitalize ${
									tab === key
										? 'bg-[#0d1117] text-white'
										: 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
								}`}
								style={{ border: 'none' }}
							>
								<img src={`/img/${key}.svg`} alt="" className="w-3.5 h-3.5" />
								{key}
							</button>
						))}
					</div>
					<div
						className="rounded-2xl overflow-hidden bg-[#0d1117] p-6"
						style={{ height: '450px' }}
					>
						<pre className="text-sm leading-relaxed text-gray-300 m-0 bg-transparent overflow-x-auto h-full">
							<code>{current.code}</code>
						</pre>
					</div>
					<p className="text-sm font-medium text-gray-600 dark:text-gray-400 mt-3 text-center">
						{current.caption}
					</p>
				</div>
			</div>
		</div>
	);
}

function ApproachE() {
	return (
		<section className="mb-24">
			<ApproachHeader
				letter="E"
				title="Landing-page pattern (recommended)"
				tagline="Same rhythm as the 'From scripts to infrastructure' section on the homepage. Big title + subtitle on the left, Windmill / Kestra tab-switched snippet on the right. Works for each of the 8 questions. Four worked examples below."
			/>

			<div className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-6 sm:px-10">
				{compareSections.map((s) => (
					<CompareSection key={s.id} section={s} />
				))}
			</div>

			<p className="mt-4 text-sm text-gray-500 dark:text-gray-400 italic">
				Snippets here are text-only. The real version can mix: code for Q2 / Q4, a file tree for Q3, a benchmark chart for Q6, a pricing card for Q7. Whatever is most visual per question.
			</p>
		</section>
	);
}

/* ────────────────────────────────────────────────────────────────
   APPROACH A — "Scorecard hero"
   One scannable grid at the top replaces the dense 8-section wall.
   ──────────────────────────────────────────────────────────────── */

function ApproachA() {
	return (
		<section className="mb-24">
			<ApproachHeader
				letter="A"
				title="Scorecard hero"
				tagline="Replace the long TOC with a scannable verdict grid. One row per dimension, visible winner, one-line reason. The 8 detailed sections stay below for readers who want depth."
			/>

			<div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
				<div className="grid grid-cols-12 bg-gray-50 dark:bg-gray-800/60 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
					<div className="col-span-4">Dimension</div>
					<div className="col-span-2">Winner</div>
					<div className="col-span-6">Why</div>
				</div>
				<div className="divide-y divide-gray-100 dark:divide-gray-800">
					{scorecard.map((row) => {
						const Icon = row.icon;
						return (
							<a
								key={row.id}
								href={`#${row.id}`}
								className="grid grid-cols-12 px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800/40 !no-underline items-center group"
							>
								<div className="col-span-4 flex items-center gap-3">
									<Icon className="w-5 h-5 text-gray-400 dark:text-gray-500 shrink-0" />
									<span className="font-semibold text-gray-900 dark:text-white">{row.kicker}</span>
								</div>
								<div className="col-span-2">
									<WinnerBadge winner={row.winner} />
								</div>
								<div className="col-span-6 flex items-center justify-between gap-2">
									<span className="text-sm text-gray-600 dark:text-gray-300">{row.verdict}</span>
									<ArrowRight className="w-4 h-4 text-gray-300 dark:text-gray-600 group-hover:text-blue-500 group-hover:translate-x-1 transition-all shrink-0" />
								</div>
							</a>
						);
					})}
				</div>
			</div>

			<p className="mt-4 text-sm text-gray-500 dark:text-gray-400 italic">
				Readers who only have 30 seconds get their answer here. Others scroll to the detailed sections below.
			</p>
		</section>
	);
}

/* ────────────────────────────────────────────────────────────────
   APPROACH B — "Attribute rows" instead of paragraph columns
   Compress each section's 2-column paragraph walls into 1-line
   rows that compare Windmill vs Kestra on a single attribute.
   ──────────────────────────────────────────────────────────────── */

const devexAttributes = [
	{
		attribute: 'Authoring format',
		windmill: 'TypeScript, Python, Go, Bash or SQL',
		kestra: 'Declarative YAML with plugin tasks',
	},
	{
		attribute: 'Local dev loop',
		windmill: 'Run scripts locally via Windmill CLI, LSP, type-checking, AI coding tools',
		kestra: 'YAML schema validation in VS Code / JetBrains, local server for runs',
	},
	{
		attribute: 'Git sync scope',
		windmill: 'Scripts, flows, apps, resources, variables, secrets, RBAC — all in Git',
		kestra: 'Flows and namespace files; users / RBAC / tenant settings in UI',
	},
	{
		attribute: 'AI coding tools',
		windmill: 'First-class: Claude Code, Codex via standard language tooling',
		kestra: 'Limited — YAML authoring is less of a match for code-gen tools',
	},
];

function ApproachB() {
	return (
		<section className="mb-24">
			<ApproachHeader
				letter="B"
				title="Attribute rows, not paragraph columns"
				tagline="The current 'Windmill says / Kestra says' paragraph cards force readers to parse two walls of text. Replace with attribute-by-attribute rows: each row is one precise comparison."
			/>

			<div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
				<div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800">
					<div className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
						02 · Developer experience
					</div>
					<h3 className="text-xl font-bold text-gray-900 dark:text-white">
						How do developers interact with the platform?
					</h3>
				</div>
				<div className="grid grid-cols-12 bg-gray-50 dark:bg-gray-800/60 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
					<div className="col-span-3">Attribute</div>
					<div className="col-span-4 flex items-center gap-2">
						<img src="/img/windmill.svg" alt="Windmill" className="w-4 h-4" /> Windmill
					</div>
					<div className="col-span-4 flex items-center gap-2">
						<img src="/img/kestra.svg" alt="Kestra" className="w-4 h-4" /> Kestra
					</div>
					<div className="col-span-1 text-right">Winner</div>
				</div>
				<div className="divide-y divide-gray-100 dark:divide-gray-800">
					{devexAttributes.map((row) => (
						<div key={row.attribute} className="grid grid-cols-12 px-6 py-4 items-start gap-x-4">
							<div className="col-span-3 font-semibold text-gray-900 dark:text-white text-sm">
								{row.attribute}
							</div>
							<div className="col-span-4 text-sm text-gray-600 dark:text-gray-300">
								{row.windmill}
							</div>
							<div className="col-span-4 text-sm text-gray-600 dark:text-gray-300">
								{row.kestra}
							</div>
							<div className="col-span-1 flex justify-end">
								<Trophy className="w-4 h-4 text-blue-500" />
							</div>
						</div>
					))}
				</div>
			</div>

			<p className="mt-4 text-sm text-gray-500 dark:text-gray-400 italic">
				Same info, roughly 1/3 the height. The eye scans down a single column of attribute names, not across two blocks of prose.
			</p>
		</section>
	);
}

/* ────────────────────────────────────────────────────────────────
   APPROACH C — Decision-tree / scenario-driven
   Flip the structure. Instead of 8 attribute sections, lead with
   scenarios the reader recognises themselves in.
   ──────────────────────────────────────────────────────────────── */

const scenarios = [
	{
		question: 'Analysts or ops people need to author workflows directly.',
		pick: 'kestra',
		reason: 'Declarative YAML (+ no-code UI) is designed for non-developers. Windmill step-authoring still means writing code.',
	},
	{
		question: 'You want internal apps and AI agents on the same platform as your workflows.',
		pick: 'windmill',
		reason: 'Windmill ships scripts, flows, dashboards, operator portals and agent sandboxes on one runtime. Kestra is orchestration only.',
	},
	{
		question: 'Your stack is Snowflake + dbt + Airbyte + Databricks.',
		pick: 'kestra',
		reason: '1,200+ curated plugins for mainstream data tools. Less to wire up yourself.',
	},
	{
		question: 'You run a lot of short, high-volume tasks (webhooks, alerts, small scripts).',
		pick: 'windmill',
		reason: '~10ms cold starts and dedicated-worker mode make Windmill roughly 3× faster on lightweight workloads.',
	},
	{
		question: 'You want the whole workspace (scripts, secrets, RBAC) versioned in Git.',
		pick: 'windmill',
		reason: 'Full IaC: everything deploys from files via CLI + Git sync. Kestra keeps users / RBAC / tenant settings in the UI.',
	},
	{
		question: 'Apache 2.0 licensing is a hard constraint for redistribution.',
		pick: 'kestra',
		reason: 'Kestra is Apache 2.0. Windmill is AGPLv3, which requires source availability for network-exposed modifications.',
	},
];

function ScenarioRow({ scenario }) {
	const [open, setOpen] = useState(false);
	const isWindmill = scenario.pick === 'windmill';
	return (
		<button
			type="button"
			onClick={() => setOpen(!open)}
			className="w-full text-left rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-600 transition-all overflow-hidden"
		>
			<div className="flex items-center gap-4 px-5 py-4">
				<ChevronRight
					className={`w-4 h-4 shrink-0 text-gray-400 transition-transform ${open ? 'rotate-90' : ''}`}
				/>
				<div className="flex-1 text-base text-gray-900 dark:text-white">{scenario.question}</div>
				<span
					className={`shrink-0 inline-flex items-center gap-1.5 rounded-full text-xs font-semibold px-3 py-1.5 ${
						isWindmill
							? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300'
							: 'bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300'
					}`}
				>
					<img
						src={isWindmill ? '/img/windmill.svg' : '/img/kestra.svg'}
						alt=""
						className="w-3.5 h-3.5"
					/>
					Pick {isWindmill ? 'Windmill' : 'Kestra'}
				</span>
			</div>
			{open && (
				<div className="px-5 pb-4 pt-1 pl-12 text-sm text-gray-600 dark:text-gray-300 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30">
					{scenario.reason}
				</div>
			)}
		</button>
	);
}

function ApproachC() {
	return (
		<section className="mb-24">
			<ApproachHeader
				letter="C"
				title="Scenario-driven (decision tree)"
				tagline="Most readers arrive with a concrete situation, not a 'tell me about 8 attributes' mindset. Lead with scenarios that route them to an answer."
			/>

			<div className="space-y-3">
				{scenarios.map((s, i) => (
					<ScenarioRow key={i} scenario={s} />
				))}
			</div>

			<p className="mt-4 text-sm text-gray-500 dark:text-gray-400 italic">
				Optional: keep the 8 detailed sections below for readers who want the long version. This goes at the top of the page.
			</p>
		</section>
	);
}

/* ────────────────────────────────────────────────────────────────
   APPROACH D — Compact build-primitives grid (Q3 rework)
   The "What you can build" table is already a table — but a
   2-up grid of primitive cards is more scannable and visual.
   ──────────────────────────────────────────────────────────────── */

function PrimitiveCard({ row }) {
	return (
		<div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-5">
			<div className="font-semibold text-gray-900 dark:text-white mb-1">{row.feature}</div>
			<div className="text-sm text-gray-500 dark:text-gray-400 mb-4">{row.description}</div>
			<div className="flex items-center gap-4 text-sm">
				<div className="flex items-center gap-1.5">
					<img src="/img/windmill.svg" alt="" className="w-4 h-4" />
					{row.windmill ? (
						<Check className="w-4 h-4 text-emerald-500" />
					) : (
						<X className="w-4 h-4 text-gray-400" />
					)}
				</div>
				<div className="flex items-center gap-1.5">
					<img src="/img/kestra.svg" alt="" className="w-4 h-4" />
					{row.kestra ? (
						<Check className="w-4 h-4 text-emerald-500" />
					) : (
						<X className="w-4 h-4 text-gray-400" />
					)}
				</div>
			</div>
		</div>
	);
}

function ApproachD() {
	return (
		<section className="mb-24">
			<ApproachHeader
				letter="D"
				title="Primitive cards instead of comparison table"
				tagline="For the 'What you can build' section — 6 primitives in a 2×3 grid of cards instead of a long table. More visual, easier to scan."
			/>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{buildRows.map((row) => (
					<PrimitiveCard key={row.feature} row={row} />
				))}
			</div>

			<p className="mt-4 text-sm text-gray-500 dark:text-gray-400 italic">
				Tradeoff: takes a bit more vertical space but no table-border gotchas, and the differences (checks vs X's) are easier to spot.
			</p>
		</section>
	);
}

/* ────────────────────────────────────────────────────────────────
   Shared header
   ──────────────────────────────────────────────────────────────── */

function ApproachHeader({ letter, title, tagline }) {
	return (
		<div className="mb-6">
			<div className="flex items-center gap-3 mb-3">
				<span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600 text-white font-bold text-sm">
					{letter}
				</span>
				<h2 className="text-2xl font-bold text-gray-900 dark:text-white m-0">{title}</h2>
			</div>
			<p className="text-gray-600 dark:text-gray-300 text-base max-w-3xl">{tagline}</p>
		</div>
	);
}

/* ────────────────────────────────────────────────────────────────
   Page shell
   ──────────────────────────────────────────────────────────────── */

export default function PreviewPage() {
	return (
		<Layout title="Compare page redesign — preview">
			<main className="min-h-screen bg-gray-50 dark:bg-gray-950">
				<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
					<div className="mb-16">
						<div className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
							Internal preview — not linked from nav
						</div>
						<h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
							Compare page redesign ideas
						</h1>
						<p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl">
							Four alternative patterns for <code className="text-sm bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">/compare/kestra</code>,
							addressing the "hard to read" feedback. They aren't mutually exclusive — A + D are additive, B and C are
							structural swaps.
						</p>
					</div>

					<ApproachE />
					<ApproachA />
					<ApproachB />
					<ApproachC />
					<ApproachD />

					<section className="rounded-2xl border border-blue-200 dark:border-blue-900 bg-blue-50/50 dark:bg-blue-950/30 p-6">
						<h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">My recommendation</h2>
						<ul className="space-y-2 text-gray-700 dark:text-gray-200">
							<li className="flex gap-2">
								<Check className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
								<span>
									<strong>Adopt A (scorecard hero)</strong> at the top of the page — biggest readability win, lowest
									risk. Keeps existing content.
								</span>
							</li>
							<li className="flex gap-2">
								<Check className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
								<span>
									<strong>Adopt B (attribute rows)</strong> for Q2, Q4, Q6, Q7 — the sections with the densest
									paragraph cards.
								</span>
							</li>
							<li className="flex gap-2">
								<Check className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
								<span>
									<strong>Adopt D</strong> only if you like it visually — the existing Q3 table is fine once the
									border bug is gone.
								</span>
							</li>
							<li className="flex gap-2">
								<Minus className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
								<span>
									<strong>C (decision tree)</strong> is a bigger rewrite — only worth it if analytics show most
									readers bounce before reaching the "Verdict" section.
								</span>
							</li>
						</ul>
					</section>
				</div>
			</main>
		</Layout>
	);
}
