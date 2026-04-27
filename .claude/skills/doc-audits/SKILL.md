---
name: docs-audit
description: Audit windmill repo commits against windmilldocs coverage. Use when asked to find documentation gaps, check undocumented features, or audit docs against recent commits.
---

# Documentation Audit

## Context
The engineering of Windmill is done in the windmill repository usually located in a sibiling location, from root of this repo try `../windmill` repository.
However, our engineers often forget to add docs and changelogs to the windmilldocs repository. As a result, we accumulate gaps in the documentation.
Not all feats or fixes are worth documenting, but what is changing the user experience is probably worth being documented.

## Goal
Cross-reference feat/fix commits in `../windmill` against documentation in this repo.

## Workflow

1. Run `git log --oneline --no-merges` in `../windmill`, filtering for `feat:` and `fix:` commits in the desired date range
2. For each commit, run `git show <hash>` to understand the change
3. Search this repo for relevant documentation using grep on `./docs/`.
- New features or major changes should be added to the changelog `./changelog/` directory.
4. Classify each commit: ✅ documented / ⚠️ partial / ❌ missing and ✅ changeloged / ❌ changelog missing
5. Write a gap report to `./docs-gaps-{start_date}-{end_date}.md` including the windmill commit authors, date of the commit, and the commit message.
6. For ⚠️ and ❌ items, I might ask to later draft stub doc content in the appropriate `./docs/` subdirectory.
7. If you are asked to draft stub doc content, always base it on the `../windmill` commit commit message **and code**, not only on the message of the summary made it the doc-gaps report. When writing docs, follow the rules set in `../../AGENTS.md`

## Verifying against the UI

**Critical:** Before writing documentation for a feature, verify where and how it actually appears in the product by checking the `../windmill` frontend code. Do NOT write docs based solely on commit messages — commit messages describe intent, not always the final UI.

Specifically:
- For instance settings features: check `frontend/src/lib/components/instanceSettings.ts` and the `instanceSettings/` directory to see what settings actually exist, their labels, and which section they belong to.
- For script/flow settings: check `ScriptBuilder.svelte`, `FlowSettings.svelte`, etc. to see where the toggle/field appears.
- For workspace settings: check `frontend/src/lib/components/settings/` for the actual tabs and fields.
- A commit saying "add configurable X" might be a per-script setting, a per-workspace setting, an instance setting, or a backend-only config with no UI at all. The frontend code is the source of truth for what users actually see.

This avoids writing docs that describe settings in the wrong place or document backend internals as if they were user-facing features.

## Scoping
Always ask the user for a date range or commit range before starting.