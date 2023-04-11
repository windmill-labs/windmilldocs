# Error handler

The error handler is a special flow step that is executed when an error occurs in a flow.
Error handlers are triggered upon non recovered errors
If defined, the error handler will take as input, the result of the step that errored (which has its error in the 'error field').

Steps are retried until they succeed, or until the maximum number of retries defined for that spec is reached, at which point the error handler is called.

You can write error handler scripts in:

- [Python](https://docs.windmill.dev/docs/getting_started/scripts_quickstart/python/)
- [Typescript](https://docs.windmill.dev/docs/getting_started/scripts_quickstart/typescript/)
- [Go](https://docs.windmill.dev/docs/getting_started/scripts_quickstart/go/)

On the Hub, two examples of error handlers are provided:

- [Slack error handler](https://hub.windmill.dev/scripts/slack/1525/send-error-to-slack-channel-slack): sends a message to a Slack channel when an error occurs.
- [Discord error handler](https://hub.windmill.dev/scripts/discord/1523/send-the-error-to-discord-discord): sends a message to a Discord channel when an error occurs.