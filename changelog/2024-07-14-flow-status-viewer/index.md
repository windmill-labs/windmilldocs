---
slug: flow-status-viewer
version: v1.362.0
title: Flow Status Viewer improvements
tags: ['Flow Editor']
description: Improved the flow status viewer readability.
features:
  [
    'Improved dark mode theme',
    'You can now pick the iteration to view from directly in the graph',
    'For branchall, branchone, while loop and forloops, the status of the branch/iteration is now displayed in the top node. For instance, for branchone, it will also allow you to know which branch was picked.',
    'Now the color of the forloop itself corresponds to the entire forloop status and not the iteration. The iteration status is in the "Do one iteration" block.',
    'The forloop detail page now lists every iteration status, even if you have a thousand one without having to load them all.',
    'The nodes such as forloop and branchall that collect multiple results now show separately the collection of the results of all subflows and the result of the selected branch/iteration',
  ]
docs: /docs/flows/flow_loops#iterate-on-steps
video: /videos/flow_status_changelog.mp4
---