# Suspend and Resume

Flows can be suspended until resume or cancel event(s) are received. This
feature is most useful to implement approval steps but can be used flexibly for
other purpose.

:::tip

On WindmillHub you can find ready-to-use scripts that use this feature. For
example:

- [Suspend/resume a flow by sending approval URL via
  email](https://hub.windmill.dev/scripts/gmail/1397/suspend%2Fresume-a-flow-by-sending-approval-url-via-email-gmail)
- [Suspend/resume a flow by sending approval URL via slack direct
  message](https://hub.windmill.dev/scripts/slack/1398/suspend%2Fresume-a-flow-by-sending-approval-url-via-slack-direct-message-slack)

:::

![Adding approval step](./flow-approval-step.png)

You can think of a scenario where only specific people can resume (or cancel) a
flow. To achieve this they would need to receive personalized URL via some
external communication channel (like email, SMS or chat message).

Important thing to remember is that a number of required approvals can be
customized. This allows some flexibility for a cases where you either require
approvals from all authorized people or only from one.

![Required approvals](./flow-number-of-approvals.png)

## Approval script - Gmail example

#### Adding Gmail resource

Lets start with adding Gmail resource. From "Resources" view select "Connect an
API" and then let's sign in with Google

![Connect an API](./connect-api.png)

![Sign in with Google](./sign-in-with-google.png)

You will be redirected to Google Accounts and asked to log in. After
authentication you will be redirected back to Windmill.

![Connection in progress](./connection-in-progress.png)

From now on, whenever you use this resource, Windmill script will send emails
via Gmail on your behalf.

#### Reusing script from WindmillHub

Let's create a flow as described in the getting started section
([Go](../../getting_started/3_go_quickstart/index.md),
[TypeScript](../../getting_started/1_typescript_quickstart/index.md),
[Python](../../getting_started/3_go_quickstart/index.md)). Our first step will
be approval script from WindmillHub

![Approval step from Hub](./approval-step-from-hub.png)

![Reuse Gmail script from Hub](./reuse-gmail-script-from-hub.png)

Make sure to fill required fields, especially choose Gmail resource and define
approver emails (this are email addresses of people that are authorized to
resume a flow and this is where Windmill job will send resume URL).

#### Check how it works!

For the sake of this example let's add a "dummy" hello world script as a 2nd
stop in our flow

![Dummy script](./dummy-script.png)

We can test our flow now

![Test flow](./test-flow.png)

You can notice that after first step flow is suspended and is waiting for
approval

![Waiting for approval](./waiting-for-approval.png)

Let's imagine that you are now the person that is authorized to resume a
suspended flow. You should receive an email with URL that leads to webpage like
this

![Approval webpage](./approval-webpage.png)

You can now resume a flow and see that the flow finished with "Success" status.

![Finished flow](./finished-flow.png)

Cool, isn't it?

## Notifying about approver(s) that resumed a flow - Slack example

In this example we're extending the flow with approval step from previous
example. Windmill will send a notification as a message in Slack channel about
approver(s) that resumed a flow.

#### Adding Slack resource

First lets add a Slack resource. From "Resources" view select "Connect an API"
and then select Slack

![Connect an API](./connect-api.png)

![Connect Slack resource](./connect-slack-resource.png)

![Allow Slack access](./allow-slack-access.png)

![Connection in progress](./connection-to-slack-in-progress.png)

#### Re-using script from WindmillHub

Now let's extend our existing flow (that already has an approval step) with a
script that will use "The list of approvers" from the "Step Context"

![Extend flow](./extend-flow.png)

![Script from hub](./script-from-hub.png)

![Reuse Slack script](./reuse-slack-script-from-hub.png)

#### Step Context magic

This is where the magic begins - the "Step Context". You can notice that we have
access to the list of approves from previous approval step.

![The list of approvers](./the-list-of-approvers.png)

Now all we have to do is to inject this particular step context to the
"approvers" argument of our script! There is more than one way of doing this,
but this time we will use the UI feature. All you have to do is to click on
"link" icon and then select "approvers"

![Inject approvers 1](./inject-approvers-1.png)

![Inject approvers 2](./inject-approvers-2.png)

#### Lets test it

Run the flow. Resume it ...

![Resume flow](./resume-flow.png)

... and find the notification on Slack channel

![Notification](./notification.png)
