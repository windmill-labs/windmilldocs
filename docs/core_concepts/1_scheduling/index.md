# Scheduling

Windmill has the same set of features of cron, with an UI and control panels. It allows you to define Schedules for Scripts and Flows. Once a Schedule is defined, it will **automatically run the script at the set frequency**. Think of it as an easy-to-use CRON scheduler that you can share with other users.

A Schedule consists of a **Script or Flow**, its **arguments** and a **CRON expression** that controls the execution frequency.

<!--truncate-->

<video
    className="border-2 rounded-xl object-cover w-full h-full"
    autoPlay
    loop
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

[Windmill](../../intro.md) is an open-source developer platform and infra to build all internal tools through code, such as UIs and workflows based on simple scripts (TypeScript, Python, Go, Bash).

<br/>

Managing scripts, flows and apps on Windmill works at the [workspace](../../reference/index.md#workspace)-level. Admins invite authors and operators to the workspace where are hosted workflows. The first two can write and edit flows as well as managing permissions, executions etc.

<br/>

Cron jobs are one of **many ways to [trigger workflows](../../getting_started/9_trigger_flows/index.md) in Windmill** (among [webhooks](../4_webhooks/index.md), [auto-generated UIs][flows], [customized UIs][apps], [Command Line Interface](../../advanced/3_cli/index.md), [Slackbots](https://docs.windmill.dev/blog/handler-slack-commands) etc.)

:::

## Configure Schedules for Each Task ([Script][scripts], [Workflows][flows])

From your workspace, go to the dedidcated `Schedules` menu and pick `New Schedule`.

![Schedules menu](./6-schedules-menu.png "Schedules menu")

1. Configure the **schedule frequency** using cron syntax or the simplified builder.

2. Pick a **runnable** ([script][scripts] or [flow][flows]) from your workspace.

3. Fill the **arguments** that will be used for the automation. The arguments are the ones of the given script or flow. If you want your arguments to be dynamic, you might want to use a [workflow][flow].

![Schedule a task](./12-schedule-a-task.png "Schedule a task")

Click on `Schedule` button and you're good! The schedule will be automatically 'Enabled'. Toggle that off if needed.

![Scheduled task](./13-scheduled-script.png "Scheduled task")


:::tip Handle Several Schedules for the Same Workflow

The previous configuration can be replicated multiple times for the same workflow and therefore several schedules can work in parallel.

:::

If the Schedules menu allows you to control future executions of scripts and workflows, you can check all past and future runs from the `Runs` tab ...

![Runs menu](./10-runs-menu.png "Runs menu")

... where you can get details on each run:

![Run details](./11-run-details.png "Run details")

## Configure Schedules from Flow Editor

The same method can be done from the flow editor.

<video
    className="border-2 rounded-xl object-cover w-full h-full"
    autoPlay
    loop
    controls
    id="main-video"
    src="/videos/schedule-cron.mp4"
/>

<br/>

From your workspace, pick the workflow you want to schedule.

![Go to workflow](./1-from-workspace.png "Go to workflow")

Go to the `Schedule` menu ...

![Pick Schedule menu](./2-schedule-menu.png "Pick Schedule menu")

and either schedule in [cron](https://crontab.guru) or in Basic mode that will automatically be translated in cron. Once it's done, you can see in next picture that the cron expression is now visible on the toolbar.

![Basic or cron schedule](./3-basic-schedule.png "Basic or cron schedule")

Fill the inputs, toggle the `Schedule Enabled`, save and you're all set!

![Save and schedule](./4-inputs-toggle.png "Save and schedule")

## Control Permissions and Errors

### Be notified every time a scheduled workflow has been executed (or failed)

Add a simple step to your workflow to be informed on the execution of the scheduled flow.

In this example I chose to [receive an email](https://hub.windmill.dev/scripts/gmail/1291/-send-email-gmail), it could have been on [Slack](https://hub.windmill.dev/scripts/slack/1284/send-message-to-channel-slack), [Discord](https://hub.windmill.dev/scripts/discord/1292/send-message-to-channel-using-webhook-discord) or anything your imagination and API calls can create.

![Add an email step](./7-add-email-step.png "Add an email step")

<br/>

Configure the email.

![Configure email](./8-configure-email.png "Configure email")

<br/>

And watch your mailbox.

![Receive the email](./9-receive-email.png "Receive the email")

<br/>

Given how [flows][flows] work on Windmill, it means that once the previous step has been successful, the Email step will trigger.

:::tip Error handler

If you want to handle failure and receive another message in that case, add an [Error Handler](../../flows/7_flow_error_handler.md) to your workflow that will let you know if a failure happened at any step.

:::

### Manage permissions from the workflow

From the metadata menu, change the owner to a folder (group of people) to handle view and editing rights.

![Manage permissions](./5-manage-rights.png "Manage permissions")


<br/>

Voilà, all done! The process is very simple but it will allow you to schedule tasks with confidence and get an aggregated view on them.

Not only can you build scheduled jobs [from Windmill](../../getting_started/00_how_to_use_windmill/index.md) but also you can import all your existing scripts - as Windmill supports TypeScript, Python, Go or Bash - [as did one of our esteemed users](https://docs.windmill.dev/blog/stantt-case-study) for their own scheduled jobs.

<!-- Resources -->

[flows]: ../../getting_started/6_flows_quickstart/index.md
[scripts]: ../../getting_started/0_scripts_quickstart/1_typescript_quickstart/index.md
[apps]: ../../getting_started/7_apps_quickstart/index.md