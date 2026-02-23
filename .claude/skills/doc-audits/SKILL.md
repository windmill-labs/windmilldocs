---
name: docs-audit
description: Audit windmill repo commits against windmilldocs coverage. Use when asked to find documentation gaps, check undocumented features, or audit docs against recent commits.
---

# Documentation Audit

## Context
The engineering of Windmill is done in the windmill repository usually located in a sibiling location, from root of this repo try `../windmill` repository.
However, our engineers often forget to add docs to the windmilldocs repository. As a result, we accumulate gaps in the documentation.
Not all feats or fixes are worth documenting, but what is changing the user experience is probably worth being documented.

## Goal
Cross-reference feat/fix commits in `../windmill` against documentation in this repo.

## Workflow

1. Run `git log --oneline --no-merges` in `../windmill`, filtering for `feat:` and `fix:` commits in the desired date range
2. For each commit, run `git show <hash>` to understand the change
3. Search this repo for relevant documentation using grep on `./docs/`
4. Classify each commit: ✅ documented / ⚠️ partial / ❌ missing
5. Write a gap report to `./docs-gaps-{start_date}-{end_date}.md` including the windmill commit authors, date of the commit, and the commit message.
6. For ⚠️ and ❌ items, I might ask to later draft stub doc content in the appropriate `./docs/` subdirectory using rules set in `../../AGENTS.md`

## Scoping
Always ask the user for a date range or commit range before starting.
