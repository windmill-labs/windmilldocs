# Scheduling

Windmill provides the same set of features as CRON, but with a user interface and control panels. It allows you to define Schedules for Scripts and Flows. Once a schedule is defined, **the script will automatically run at the set frequency**. Think of it as an easy-to-use scheduler similar to CRON that you can share with other users.

A Schedule consists of a **Script or Flow**, its **arguments** and a **CRON expression** that controls the execution frequency.

<!--truncate-->

<video
    className="border-2 rounded-xl object-cover w-full h-full dark:border-gray-800"
    autoPlay
    controls
    id="main-video"
    src="/videos/schedule-cron-menu.mp4"
/>

<br/>

Cron is a powerful and versatile tool that enables users to automate tasks by scheduling them to run at specific intervals or times. From automating routine system maintenance to sending periodic email reports, cron plays an indispensable role in streamlining processes and improving productivity for developers, system administrators, and even casual users.

However, as with any powerful tool, using cron comes with its own set of challenges and potential issues. Common problems associated with the use of cron include:

- **Runs History**: to maintain a record of script runs and log outputs through cron, you must manually incorporate that logic.
- **Error Handling**: in the event of a failed run, self-crafted logic is required for notifications (Slack, emails).
- **Manual Runs**: executing a cron job manually, outside of its schedule, proves difficult and can lead to inconsistencies due to potential environment differences.
- **No UI**: navigating cron jobs is challenging without a centralized hub, particularly for larger engineering teams. This comes with induced issues: 1. **Handling permissions** among users and editors and 2. **Server downtime**: when the server hosting the job experiences downtime, monitoring and alterting is problematic.

:::info A bit of Context: How Windmill Works

[Windmill](../../intro.mdx) is an open-source developer platform and infra to build all internal tools through code, such as UIs and workflows based on simple scripts (TypeScript, Python, Go, Bash).

<br/>

Managing scripts, flows and apps on Windmill works at the [workspace](../16_roles_and_permissions/index.mdx#workspace)-level. Admins invite authors and operators to the workspace where are hosted workflows. The first two can write and edit flows as well as managing permissions, executions etc.

<br/>

Cron jobs are one of **many ways to [trigger workflows](../../getting_started/9_trigger_flows/index.md) in Windmill** (among [webhooks](../4_webhooks/index.md), [auto-generated UIs][flows], [customized UIs][apps], [Command Line Interface](../../advanced/3_cli/index.mdx), [Slackbots](/blog/handler-slack-commands) etc.)

:::

## Configure Schedules for Each Task ([Script][scripts], [Workflows][flows])

From your workspace, navigate to the dedicated `Schedules` menu and select `New Schedule`.

![Schedules menu](./6-schedules-menu.png.webp 'Schedules menu')

1. Configure the **schedule frequency** using cron syntax or the simplified builder.

2. Select a **runnable** ([script][scripts] or [flow][flows]) from your workspace.

3. Fill in the **arguments** that will be used for the automation. The arguments are the ones of the given script or flow. If you want your arguments to be dynamic, you might want to use a [workflow][flows].

![Schedule a task](./12-schedule-a-task.png.webp 'Schedule a task')

Click the `Schedule` button and you're good to go! The schedule will be automatically 'Enabled'. Toggle it off if needed.

![Scheduled task](./13-scheduled-script.png.webp 'Scheduled task')

:::tip Handle Several Schedules for the Same Workflow

The previous configuration can be replicated multiple times for the same workflow and therefore several schedules can work in parallel.

:::

If the Schedules menu allows you to control future executions of scripts and workflows, you can check all past and future runs clicking on `Runs`. This will lead you to the [Runs menu](../../core_concepts/5_monitor_past_and_future_runs/index.mdx), with a filtered view on your runnable.

![Runs menu](./10-runs-menu.png.webp 'Runs menu')

... where you can get details on each run:

![Run details](./11-run-details.png.webp 'Run details')

## Configure Schedules from Flow Editor

The same method can also be done from the [flow editor](../../getting_started/6_flows_quickstart/index.md).

<video
    className="border-2 rounded-xl object-cover w-full h-full dark:border-gray-800"
    autoPlay
    controls
    id="main-video"
    src="/videos/schedule-cron.mp4"
/>

<br/>

From your workspace, pick the workflow you want to schedule.

![Go to workflow](./1-from-workspace.png.webp 'Go to workflow')

Go to the `Schedule` menu ...

![Pick Schedule menu](./2-schedule-menu.png.webp 'Pick Schedule menu')

and either schedule in [cron](https://crontab.guru) or in Basic mode that will automatically be translated in cron. Once it's done, you can see in next picture that the cron expression is now visible on the toolbar.

![Basic or cron schedule](./3-basic-schedule.png.webp 'Basic or cron schedule')

Fill in the inputs, toggle the Schedule Enabled option, save, and you're all set!

![Save and schedule](./4-inputs-toggle.png.webp 'Save and schedule')

## Control Permissions and Errors

### Be notified every time a scheduled workflow has been executed (or failed)

#### Schedule Error Handler

From the schedule configuration, add a special script or flow to execute in case of an error.

![Schedule Error Handler](./14_schedule_error_handler.png.webp)

For example, this can be a script that sends an error notification to [Slack](https://hub.windmill.dev/scripts/slack/1284/) or [Discord](https://hub.windmill.dev/scripts/discord/1292/).

#### As a Flow Step

For scheduled flows, add a simple step to be notified about the execution of the scheduled flow.

In this example I chose to [receive an email](https://hub.windmill.dev/scripts/gmail/1291/), but you can use other notification methods like [Slack](https://hub.windmill.dev/scripts/slack/1284/), [Discord](https://hub.windmill.dev/scripts/discord/1292/) or any other other method your imagination and API calls can create.

![Add an email step](./7-add-email-step.png.webp 'Add an email step')

<br/>

Configure the email.

![Configure email](./8-configure-email.png.webp 'Configure email')

<br/>

And watch your mailbox.

![Receive the email](./9-receive-email.png.webp 'Receive the email')

<br/>

Given how [flows][flows] work on Windmill, it means that once the previous step has been successful, the Email step will trigger.

:::tip Error handler

If you want to handle failure and receive another message in that case, add an [Error Handler](../../flows/7_flow_error_handler.md) to your workflow that will let you know if a failure happened at any step.

:::

### Manage permissions from the workflow

From the metadata menu, change the owner to a [folder](../../core_concepts/8_groups_and_folders/index.md#folders) (group of people) to manage view and editing rights.

![Manage permissions](./5-manage-rights.png.webp 'Manage permissions')

<br/>

Voilà, all done! The process is very simple but it will allow you to schedule tasks with confidence and get an aggregated view on them.

Not only can you build scheduled jobs [from Windmill](../../getting_started/00_how_to_use_windmill/index.mdx) but also you can import all your existing scripts - as Windmill supports TypeScript, Python, Go or Bash - [as did one of our esteemed users](/blog/stantt-case-study) for their own scheduled jobs.

<!-- Resources -->

[flows]: ../../getting_started/6_flows_quickstart/index.md
[scripts]: ../../getting_started/0_scripts_quickstart/index.mdx
[apps]: ../../getting_started/7_apps_quickstart/index.mdx
