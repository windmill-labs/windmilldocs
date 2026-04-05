# Claude instructions

Instructions are in @AGENTS.md

## Before pushing a PR

Always run `npm run build` locally before pushing. It catches broken internal
links, broken anchors, invalid MDX, and missing files referenced from
`sidebars.js` — all of which will block the CI `npm check` workflow.

```bash
npm run build
```

Fix any errors (and ideally any warnings in files you changed) before pushing.
