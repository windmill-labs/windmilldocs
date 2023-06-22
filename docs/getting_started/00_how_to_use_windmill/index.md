# Get Started with Windmill

### Self-Host Windmill

You can choose to self-host Windmill on your own infra.

Run it at scale on kubernetes using our [helm charts](https://github.com/windmill-labs/windmill-helm-charts) or use a docker-compose for smaller setups.

<div class="text-xl mb-2 font-semibold"></div>
<div class="grid grid-cols-2 gap-2 mb-4">
  <a href="/docs/advanced/self_host/" class="rounded-md p-6 border border-gray-200 hover:border-blue-500 transition-all cursor-pointer flex flex-col gap-2 !no-underline">
    <div class="text-lg font-semibold text-gray-900">Self Host Windmill tutorial</div>
    <div class="text-sm text-gray-500">Self host Windmill in 2 minutes.</div>
  </a>
</div>


### Use Windmill Cloud

Windmill provides a <a href="https://app.windmill.dev/" rel="nofollow">Cloud App</a>.

You can sign-up using your GitHub, GitLab, Google, Microsoft Single Sign-On. No Credit Cards required and we will spare your inbox.

Any user will be provided with 1,000 monthly executions from our [Free Plan](/pricing) and added to the Demo workspace. From there, users can create workspaces for free and create scripts, workflows and UIs.

And if you feel like it, [upgrade](../../misc/7_upgrade/index.md) for unlimited executions.

<div class="text-xl mb-2 font-semibold"></div>
<div class="grid grid-cols-2 gap-2 mb-4">
  <a href="https://app.windmill.dev/" rel="nofollow" class="rounded-md p-6 border border-gray-200 hover:border-blue-500 transition-all cursor-pointer flex flex-col gap-2 !no-underline">
    <div class="text-lg font-semibold text-gray-900">Windmill Cloud</div>
    <div class="text-sm text-gray-500">Use Windmill's Cloud App (no credit card required).</div>
  </a>
</div>


## Where to Start?

Windmill is a feature-rich developer platform to build endpoints, cron jobs, workflows & UIs. Each of these features can be used standalone.

However the 3 core layers of Windmill, namely Scripts, Flows and Apps are complementary. Scripts are the smallest "unit" of abstraction and workflows and UIs rely on them.

- Have a look at our quickstarts (on [Scripts](../../getting_started/0_scripts_quickstart/1_typescript_quickstart/index.md), [Flows](../6_flows_quickstart/index.md) or [Apps](../7_apps_quickstart/index.md)) that give an introduction on how to build your first ones.
- Check how to [trigger scripts](../8_trigger_scripts/index.md) and [flows](../9_trigger_flows/index.md) to get an idea of what you could do with Windmill.
- Play with Windmill: [Cloud App](#use-windmill-cloud) or [Self-Hosting](#self-host-windmill). Our cloud Demo workspace showcases some speaking examples.
- Browse [Windmill Hub](https://hub.windmill.dev/) and explore templates shared by the community.
