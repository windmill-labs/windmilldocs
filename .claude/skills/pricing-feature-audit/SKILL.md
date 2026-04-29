---
name: pricing-feature-audit
description: Audit src/components/pricing/FeatureList.js for EE/Cloud/Team features that are mentioned in docs or live in the windmill repo but missing from the pricing comparison table. Use when asked to "flag missing pricing features", "audit FeatureList.js", "check if EE features are listed", or to add features (with verified tier flags) to the pricing page.
---

# Pricing FeatureList audit

## Context

`src/components/pricing/FeatureList.js` is the source of the feature comparison table on https://www.windmill.dev/pricing. Its rows have five tier columns:

- `tier-free-selfhost` — Community Edition (self-host, no license)
- `tier-enterprise-selfhost` — Enterprise self-host
- `tier-enterprise-cloud` — Enterprise cloud
- `tier-free` — free tier on cloud
- `tier-team` — Team plan on cloud

Each row also has an optional `link` (must be a real URL on the docs site) and `tooltip`.

This file drifts. Engineering ships EE-gated features that get docs and changelogs but never show up here, and previously-EE features sometimes become available to all editions without the row being updated. Both states mislead customers.

## Goal

Find features that:

1. **Should be in the table but aren't** — EE-gated (or Cloud-only / Team-only) features that have docs or shipped commits but no row in `FeatureList.js`.
2. **Are in the table with the wrong tier flags** — rows that claim EE-only when the runtime is actually open to CE, or vice versa.

Fix the rows, and update the corresponding doc pages so the EE/CE prose matches reality.

## Sources of truth (in priority order)

When deciding whether a feature is EE-gated, **the code is the source of truth, not the docs**. Doc prose lags shipping changes. Verify in this order:

1. **Engineering confirmation** — if you have a direct answer from a Windmill engineer, that wins.
2. **Backend code in `../windmill`**:
   - Compile-time gate: `#[cfg(feature = "enterprise")]`, `#[cfg(all(feature = "private", feature = "enterprise"))]`
   - Runtime gate: `LICENSE_KEY` checks, `require_super_admin_or_admin`, "enterprise edition" error strings
   - File hint: handlers under `backend/windmill-api/src/` named `*_ee.rs` or `*_ext.rs` are usually EE
3. **Frontend gate** in `../windmill/frontend`:
   - `$enterpriseLicense` store, `disabled={!$enterpriseLicense}`
   - `ee_only: true` flag in `frontend/src/lib/components/instanceSettings.ts`
4. **Cloud-vs-self-host availability** — check `frontend/src/lib/stores.ts` or any `is_cloud_hosted()` checks. Some features (Kubernetes operator, Windows workers, autoscaling on private clusters) are self-host-only regardless of EE.
5. **Docs prose** — only as a starting hint, never as the final answer. A line like "this feature requires Enterprise Edition" can be stale.

If a feature has no runtime gate but limits behaviour by other means (e.g., workspace forks count toward the CE 3-workspace cap), reflect that in the tier value as a string, not a boolean — see "Tier value patterns" below.

## Workflow

1. **Ask for scope** — date range, specific feature name, or "audit the whole file".
2. **Inventory candidates**:
   - Grep `docs/` for `enterprise edition`, `/pricing`, `EE only`, `enterprise license`, `$enterpriseLicense` references.
   - Grep recent changelogs in `changelog/` for `ee: true` frontmatter.
   - For a date-bounded audit, also run `git log --oneline --no-merges` in `../windmill` for `feat:` commits and inspect ones with EE-gated changes.
3. **For each candidate**, verify against the sources above and produce a row plan: name, suggested section (Platform / Security & Support / Observability / Developers & Deployments / Performance / Flows / Apps), tier flags, doc URL, tooltip.
4. **Verify every doc URL resolves**:
   - Folders use numeric prefixes (`16_roles_and_permissions`) but URLs strip them (`/docs/core_concepts/roles_and_permissions`).
   - Don't fabricate paths — open the file and confirm the exact heading anchor (lower-case, hyphenated, no punctuation) before writing the link.
5. **Present the plan** to the user before editing. Group additions by section. Flag any rows already in the file whose tier flags conflict with what the code shows.
6. **On approval**, make the edits to `src/components/pricing/FeatureList.js` (one section at a time, ordered to keep diffs reviewable) and fix any doc pages that mis-state the EE gate.
7. **Run `npm run build`** and confirm no new broken-link warnings were introduced. Pre-existing warnings (the script-editor / changelog ones) are not yours to fix.

## Tier value patterns

- `true` / `false` for binary availability.
- A string when the tier has a meaningful limit: `'Up to 2 users'`, `'Counts toward 3-workspace limit'`, `'Maximum 4 groups'`, `'Unlimited'`. Strings render in place of the check/cross icon, so keep them short.
- Use `tooltip` for self-host vs cloud distinctions that don't fit in the row name (e.g., `'Self-hosted only'`, `'Cloud only'`).

## Common gotchas

- **"EE in docs" ≠ "EE in code"**: a feature page saying "this requires EE" can be wrong. Always grep the backend.
- **Self-host-only ≠ EE-only**: features like the Kubernetes operator or Windows workers run on CE self-host too — they're absent from cloud, not gated by license.
- **Cloud Team availability**: features that work on EE cloud usually work on Team unless the backend explicitly blocks Team workspace IDs. Don't copy `tier-enterprise-cloud: true` to `tier-team: false` without checking.
- **Existing duplicates**: this file has previously had duplicate rows (e.g., a removed Postgres triggers duplicate). Before adding a row, grep the file for the feature name to avoid re-adding it under a different label.
- **Don't add billing knobs as features**: Non-prod / dev instance mode is a billing affordance, not a feature — skip it.

## When fixing a wrong tier flag

If a row already exists but the tier flags are wrong, also audit any related doc pages — the same misconception that produced the wrong row often shows up as "Enterprise Edition only" prose in the docs. Fix both at once and grep for cross-references in `docs/advanced/23_canonical_deployment_setups/index.mdx` and other "edition requirements" callouts that may inherit the same claim.
