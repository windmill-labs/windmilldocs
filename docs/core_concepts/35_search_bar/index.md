# Search Bar

Every workspace has a Search Bar to navigate through it.

![Search bar](./search_bar.png "Search bar")

It can be triggered with shortcut `Ctrl + K` & `⌘k` on Mac, or with Search button from sidebar.

![Search button](./search_button.png "Search button")

Only [Superadmins, Admins & Developers](../16_roles_and_permissions/index.mdx#roles-in-windmill) (not Operators) have access to this feature.

It can go to several pages:
- Home
- [Runs](../5_monitor_past_and_future_runs/index.mdx)
- [Variables](../2_variables_and_secrets/index.mdx)
- [Resources](../3_resources_and_types/index.mdx)
- [Schedules](../1_scheduling/index.mdx)

<video
  className="border-2 rounded-xl object-cover w-full h-full dark:border-gray-800"
  autoPlay
  loop
  controls
  src="/videos/search_bar.mp4"
/>

<br/>

With a special key, you can search accros:
- Completed runs (arguments, results) with with key `>`.
- [Content](../26_content_search/index.mdx) of scripts, flows and apps with key `#` (without [Enterprise Edition](/pricing), content search will only search among 10 scripts, 3 flows, 3 apps and 3 resources).
- Logs with key `!`.

![Search accross runs](./run_search.png "Search accross runs")
> Search accross runs with key `>`.