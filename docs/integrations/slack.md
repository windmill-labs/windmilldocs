# Slack

Windmill features built-in Slack integration. There is actually more than one
way to integrate with Slack:

1. As a Windmill workspace admin allowing Windmill Slack Bot integration via
   `/windmill` command.
2. As a regular user allowing Windmill scripts performing operations on your
   behalf in Slack.
3. By providing a Slack token. Actions are constrained by the token kind and
   scopes.


## Slack Bot integration

Our goal here is to be able to:
* use slack bot token in Windmill scripts
* invoke a Windmill script from Slack, by using `/windmill` command

:::tip

All members of `g/slack` group can use Slack bot token. It allows Windmill
script to act on behalf of the installed app of the connected workspace.

:::

First of all you need to be a workspace admin. Then you should go to [workspace
settings page](https://app.windmill.dev/workspace_settings).

![Go to workspace](../assets/integrations/slack/01-go-to-workspace.png)

### Connect to Slack workspace

Let's connect now with some Slack workspace
![Connect Slack](../assets/integrations/slack/02-connect-to-slack.png)

![Allow Slack access](../assets/integrations/slack/03-allow-access.png)


### Using slack bot token in Windmill scripts

You need to be in `g/slack` group to be able to use this token:
![slack group](../assets/integrations/slack/slack-group.png)

Then it will be available in resources:
![slack token](../assets/integrations/slack/slack-bot-token.png)


### Using /windmill command in Slack

Great! We've established Windmill-Slack connection, but it's not over yet. We
need a Windmill script that will be invoked on the event triggered by
`/windmill` command.

:::caution

Script's `main()` function must have specific signature, meaning it must
define `response_url: string` parameter and `text: string` parameter.

Don't worry about the value for `response_url` - Windmill will inject correct
value for you on each Slack event.

:::

#### Re-using script from WindmillHub

Having in mind that our script needs to implement specific interface let's not
reinvent the wheel but use [already existing script from
WindmillHub](https://hub.windmill.dev/scripts/slack/1405/example-of-responding-to-a-slack-command-slack)

![Create a script](../assets/integrations/slack/04-create-script.png)

![From Hub](../assets/integrations/slack/05-from-hub.png)

![Fork](../assets/integrations/slack/06-fork-script.png)

![Rename](../assets/integrations/slack/07-rename.png)

![Save](../assets/integrations/slack/08-save-script.png)

#### Use script as a handler for Slack event

After creating a Windmill script that will handle a Slack event let's get back
to workspace settings and assign our script.

![Get back to workspace](../assets/integrations/slack/09-back-to-workspace-view.png)

![Pick a script](../assets/integrations/slack/10-pick-script.png)

![The one that was created](../assets/integrations/slack/11-use-created-one.png)

![Done](../assets/integrations/slack/12-windmill-part-done.png)

#### Time to test the integration

Let's test our integration by going to Slack and firing `/winmill yo` command.

![Use slack command](../assets/integrations/slack/13-use-windmill-slack-command.png)

![Windmill yo](../assets/integrations/slack/14-windmill-yo.png)

Notice that Windmill Slack bot responded with job URL where you can preview the
job that was triggered by the `/winmill` command.

![Final effect](../assets/integrations/slack/15-effect.png)

After job successfully finished, bot sent additional message with the text that
you used with `/windmill` command.

## Windmill acting on Slack on user's behalf

Our goal here is to allow Windmill scripts acting on Slack on your behalf.

Lets add a Slack resource. From "Resources" view select "Connect an API"
and then select Slack

![Connect an API](../assets/how_to/6_examples/connect-api.png)

![Connect Slack resource](../assets/how_to/6_examples/connect-slack-resource.png)

![Allow Slack access](../assets/how_to/6_examples/allow-slack-access.png)

![Connection in progress](../assets/how_to/6_examples/connection-to-slack-in-progress.png)
