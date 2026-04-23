---
name: compare-page
description: Scaffold a new /compare/<tool> comparison page on the windmilldocs site between Windmill and a competing orchestration / workflow / internal-software platform. Use whenever the user asks to "create a comparison page", "build a compare page", "add a Windmill vs X page", or mentions wanting a dedicated landing page against a specific competitor — Prefect, Airflow, Temporal, n8n, Dagster, Kestra, Hatchet, Retool, Pipedream, Zapier, Make, etc. Covers the 3-file layout, the 7-section Q&A rubric, the subsections pattern with shared Windmill/competitor column headers, research workflow, and content voice conventions.
---

# Compare page

## Context

The `/compare/<tool>` pages on windmilldocs exist to win bake-offs. A team is evaluating Windmill against a competitor and wants an honest side-by-side. The page has to feel neutral enough that the reader trusts the Windmill column, while still making Windmill's differentiators concrete. The first fully-realised version of this pattern is `/compare/kestra` — use it as the reference for everything below.

**Source of truth:**
- Page wrapper: [src/pages/compare/kestra.jsx](src/pages/compare/kestra.jsx)
- Content: [src/pages/compare/kestra-content.mdx](src/pages/compare/kestra-content.mdx)
- Data: [src/data/compare/kestra.js](src/data/compare/kestra.js)

When in doubt about any pattern, read those files directly. The rest of this skill is the abridged map.

## Three-file layout

Every comparison page has three files. Keeping them separate lets us reuse the same layout wrapper while swapping only the content and data.

```
src/pages/compare/<tool>.jsx           ← page component (10 lines, imports the rest)
src/pages/compare/<tool>-content.mdx   ← all the actual content
src/data/compare/<tool>.js             ← metadata for SEO / layout props
```

The `.jsx` wrapper is near-identical across competitors — copy it from `kestra.jsx` and swap three strings.

## Page sections, top to bottom

1. **Hero** — `GithubStarCount`, title "Windmill vs X", one-paragraph subtitle, `HeroCTAButtons`, twin logos (Windmill left, competitor right, with a "vs" between). Animation on the Windmill logo rotating.
2. **TOC** — jump-to list of the 8 big questions (7 Q&As + Verdict).
3. **"In one sentence"** — twin cards, one for each platform, with a descriptive one-sentence summary. This is the page's elevator pitch, not a feature dump.
4. **Q1 – Q7** — seven Q&A sections, each using the `QASection` pattern.
5. **Verdict** — a single paragraph. Not a two-card "Pick X if / Pick Y if" list anymore.
6. **FAQ** — `UseCaseFAQ` with 5–7 questions a reader would realistically ask.
7. **Final CTA** — `ProductCTA`.

## The 7 Q&A sections

Each competitor comparison uses the same question rubric. These are the questions teams actually ask during a bake-off.

| # | id | question | focus |
|---|---|---|---|
| 01 | `build` | Which internal software can you build and orchestrate? | **scope**: what primitives exist on each platform. Includes the `buildRows` table. |
| 02 | `target` | Who is each platform built for? | **audience**: developer-led vs mixed / non-technical. |
| 03 | `devex` | How do developers interact with the platform? | **authoring, local dev, resources/secrets, Git & CI**. Includes the Python/YAML tabbed code comparison. |
| 04 | `integrations` | How does the platform integrate with your existing stack? | **connecting out, receiving events, extending**. |
| 05 | `migration` | How hard to get in, and how hard to get out? | **onboarding + lock-in** across plugin / built-in / inline-script tiers. |
| 06 | `enterprise` | Audit logs, observability, security, performance | **observability, audit logs, security, multi-tenancy, performance**. Includes `BenchmarkVisualization` if a benchmark exists. |
| 07 | `licensing` | Open source, pricing, and self-hosting? | **OSS license + Enterprise pricing**. Note: both Windmill and competitors typically have a proprietary EE codebase alongside the OSS core — don't claim either is "fully" open source. |

Section 08 is the Verdict (single paragraph, no cards).

## The QASection component pattern

Each Q&A section uses the `QASection` helper defined inside the content MDX. Anatomy:

```
┌─────────────────────────────────────────────────────────┐
│ 01 · KICKER (uppercase, blue)                           │
│ The big question?                                       │
│ Descriptive paragraph summarising the answer.           │
└─────────────────────────────────────────────────────────┘
                       ↓
┌─────────────┬───────────────────┬───────────────────┐
│             │ 🌀 Windmill       │ ⬛ Competitor      │  ← shared column headers
├─────────────┼───────────────────┼───────────────────┤
│ Subsection  │ Windmill says...  │ Competitor says...│
│ label       │                   │                   │
├─────────────┼───────────────────┼───────────────────┤
│ Subsection  │ ...               │ ...               │
│ label       │                   │                   │
└─────────────┴───────────────────┴───────────────────┘
                       ↓
              (optional children: table, benchmark chart, tabbed code)
```

Key props:
- `id` — anchor, matches the TOC
- `kicker` — `"0X · Topic"` uppercase
- `question` — the H2
- `bottomLine` — the descriptive subtitle under the question (JSX allowed)
- `subsections` — array of `{ label, windmill, kestra }` (or `{ label, windmill, <competitor> }`)
- `children` — any extra rendered below the subsections (comparison tables, benchmark viz, etc.)

The 3-column grid with shared Windmill/competitor headers at the top is the key UX choice — avoids repeating logos on every row. On mobile it collapses to 1 column with per-subsection headers.

## Q1: the `buildRows` comparison table

Q1 uses a table instead of prose subsections. Each row is a primitive, with a checkmark (or X, or label) per platform.

Data shape:
```js
{ feature: 'Workflows', href: '/use-cases/workflows', description: '...', windmill: true, kestra: true }
```

Possible values for `windmill` / `<competitor>`:
- `true` — green check
- `false` — grey X
- `'Enterprise'` — green check + amber "Enterprise only" badge (for features that exist but are paywalled)
- any other string — rendered as amber text (e.g. `'Partial'`, `'1,200+'`, `'Hub'`)

Use the existing `CheckCell` helper from `kestra-content.mdx`. `href` on each row turns the feature name into a link to the relevant `/use-cases/*` or `/platform/*` page.

## Q3: tabbed Python + YAML code snippets

Q3 Authoring includes a paired code example to make the structural difference tangible. Both sides have two tabs:

- **main.py** — the actual Python script code
- **flow.yaml** — the YAML that runs it

Uses `@theme/Tabs` and `@theme/TabItem` (same components as the blog posts). Goal is to show: on Windmill, the Python is a standalone runnable unit and the YAML is lightweight flow orchestration; on the competitor, the YAML usually carries more runtime boilerplate (deps, commands, plugin type refs).

Both columns use `flex flex-col h-full` with `min-h-[8.5rem]` on the paragraph so the tab bar and code blocks align vertically regardless of text length.

## Enterprise badge pattern

When a feature exists but is gated behind a paid tier on either side, flag it with the shared `<EnterpriseBadge />` component. This keeps the page honest — readers know to trust the comparison because we flag Enterprise on **our** side too, not just the competitor's.

Common Windmill gates to flag:
- External secret backends (Vault, AWS Secrets Manager)
- Uncapped SSO (free tier is 10 users)
- Audit logs (retention)
- Dedicated-worker mode
- Git sync beyond 2 users
- Unlimited workspaces (free tier is 3)
- Advanced access controls (SCIM, SAML)

Research the competitor's pricing page and flag equivalent gates on their side. Verify via WebFetch before writing — feature gates change.

## Content voice

The page reads as a neutral evaluation, not a sales pitch. The reader is already comparing the two tools; being obviously biased loses them.

**Do:**
- Write descriptive prose: "Windmill gives you X. Competitor focuses on Y."
- Bold the key terms in each bottomLine so the section's takeaway is scannable.
- Acknowledge where the competitor genuinely wins (plugin catalog, non-developer authoring, Apache 2.0 permissiveness, etc.).
- Include honest Enterprise flags on both sides.
- Use parentheses or colons to structure; never em-dashes.

**Don't:**
- Don't write "Pick Windmill if… Pick Kestra if…" in the subtitles or verdict. That imperative voice sounds sales-y. Describe what each tool *does* instead.
- Don't use em-dashes (`—`). Classic AI tell. Replace with periods, colons, or parentheses.
- Don't write "seamlessly", "leverage", "robust", "centers on", "fits naturally" — AI slop vocabulary. Use simpler verbs.
- Don't inline competitor case studies. They can point to their own in return; it invites a tit-for-tat that dilutes our own claims.
- Don't overstate: if a feature is Enterprise-only on Windmill, say so.

## Backlinks

Link out to Windmill's own marketing pages wherever a concept is mentioned for the first time in a section. Use `/platform/*` for platform features and `/use-cases/*` for primitives.

| concept | link |
|---|---|
| scripts | `/platform/script-editor` or `/use-cases/scripts` |
| flows / workflows | `/platform/flow-editor` or `/use-cases/workflows` |
| data pipelines | `/use-cases/data-pipelines` |
| apps (low-code) | `/use-cases/internal-apps` |
| apps (full-code, React/Svelte) | `/platform/app-builder` |
| AI agents | `/use-cases/ai-agents` |
| AI sandboxes / persistent volumes | `/platform/sandboxes` |
| scheduled tasks | `/use-cases/scheduled-tasks` |
| local dev / CLI | `/platform/local-dev` |
| Git sync / IaC | `/platform/deployment-versioning` |
| triggers | `/platform/triggers` |
| observability | `/platform/observability` |
| RBAC / permissions | `/platform/rbac` |
| dedicated workers / performance | `/platform/workers` |
| pricing | `/pricing` |

**Note:** `/platform/scale` is NOT a live route — only `scale-content.mdx` exists, no `.jsx` wrapper. Use `/platform/workers` instead. The build will fail on broken links; verify each `/platform/*` link has a corresponding `.jsx` file in `src/pages/platform/`.

For competitor-side links, use their official docs or pricing page. Mark as `target="_blank" rel="noopener noreferrer"`.

## Research workflow

Before writing any claim about the competitor, verify it. Marketing pages change; features move between tiers. Never write a claim from memory.

Required research before drafting:

1. **Pricing page** — WebFetch the competitor's pricing page. Make a list of what's in OSS vs Enterprise. Note user limits, workspace caps, seat caps.
2. **Licensing** — find the OSS license (usually Apache 2.0 / MIT / AGPLv3) AND check whether there's a separate proprietary repo for Enterprise features. Most mature competitors have both.
3. **Plugin / integration catalog** — count + check whether they're all OSS or some are paid.
4. **Docs homepage** — skim to understand their primitives (do they have scripts-as-standalone? apps? agents?). This feeds Q1.
5. **Authoring model** — is it YAML? Code? Both? What's the default? Where does code live (inline / separate file / repo)?
6. **Enterprise feature list** — RBAC, SSO, audit logs, multi-tenancy, worker groups, dedicated workers — which are OSS, which are paid.

Don't invent quotes or feature counts. If unsure, leave the claim out rather than guessing.

## Scaffold checklist

When the user asks "create a Windmill vs X comparison page", work through this order:

1. **Research** (WebFetch). Hit at least the competitor's pricing page and docs landing page. Also check the Windmill pricing page since features may have shifted.
2. **Copy the kestra files** as a starting point:
   - `cp src/pages/compare/kestra.jsx src/pages/compare/<tool>.jsx`
   - `cp src/pages/compare/kestra-content.mdx src/pages/compare/<tool>-content.mdx`
   - `cp src/data/compare/kestra.js src/data/compare/<tool>.js`
3. **Rewrite the three top-of-file exports:**
   - `bigQuestions` — same 8 entries, unchanged structure.
   - `buildRows` — rewrite per the competitor's actual primitive coverage. Use `'Enterprise'` for paywalled features.
   - `faqs` — rewrite for the competitor (the migration FAQ especially needs their YAML/code flavour).
4. **Rewrite the "In one sentence" cards.** Windmill's stays; the competitor's is one sentence that captures what they actually are and who they're built for.
5. **Rewrite each QASection's subsections.** Same labels (Authoring, Local dev & IDE, etc.) where they apply; add competitor-specific labels where they genuinely differ.
6. **Rewrite each `bottomLine`** in descriptive prose. Bold the 1-2 key differentiators.
7. **Update the Q3 code tabs** — the Python script is the same for Windmill; the YAML / code-wrapper side changes per competitor.
8. **Update the Q6 benchmark** (`BenchmarkVisualization`) — check the `engines` prop values are available in the benchmark dataset for this competitor. If not, omit the chart.
9. **Rewrite the Verdict paragraph.** One paragraph. Two points: (a) DX is the biggest difference and how, (b) range of software buildable on each. Close with "the fastest way to judge is to spend an afternoon in each".
10. **Wire into nav.** Add the page to the Solutions dropdown's Compare column in `src/theme/Navbar/Content/index.js` or wherever the nav is configured.
11. **Verify all internal links.** Run a mental check: every `/platform/X` has a `.jsx` file; every `/use-cases/X` has a `.jsx` file. Broken links fail the build.
12. **Verify the voice.** Grep the finished file for em-dashes (`—`) and common AI-slop words (`leverage`, `seamlessly`, `robust`, `centers on`, `fits naturally`). Rewrite if found.

## When to push back

The user may ask for things that undercut the page's credibility. Push back gently:

- "Remove the 'Pick X if' for the competitor" — a one-sided compare page reads as sales copy and pushes away the evaluating audience. Suggest keeping it or replacing with a neutral "the competitor might be the right call if…" instead of removing entirely.
- "Add case studies for Windmill wins" — invites tit-for-tat; the competitor has their own case studies too. Suggest leaving them out unless directly asked again.
- "Claim Windmill does X" where X isn't actually in OSS — flag the Enterprise gate or the feature's actual scope before agreeing.

## Known gotchas

- **`/platform/scale` is a broken route** — the content file exists but no `.jsx` wrapper registers the route. Use `/platform/workers`.
- **`display: inline-table` from the global CSS** interacts badly with cell borders. For any custom table, add `!table !mb-0 [&_th]:!border-0 [&_td]:!border-0` to override (the `.reset` class also works but strips the header styling).
- **Em-dashes sneak in via auto-correct** — search with `grep '—' src/pages/compare/<tool>-content.mdx` before committing.
- **`reverse` prop on `QASection`** is a legacy no-op from the placeholder-image era. Safe to leave or remove.
