# Overview

Windmill's Flow Editor allows you to build flows. Windmill's Flow editor has the following major components we will detail below:

- [Toolbar](#toolbar): the toolbar allows you to export the flow, configure the flow settings, and test the flow.
- [Settings](#settings): configure the flow settings.
- [Static Inputs](#static-inputs): view all flow static inputs.
- [Flow Inputs](#flow-inputs): view all flow inputs.
- [Action](#flow-actions): steps are the building blocks of a flow. They are the actions that will be executed when the flow is run.
- [Action editor](#action-editor): configure the action.

Also, the Flow Editor has the following features which are the subject of specific pages:

- [Error Handler](./7_flow_error_handler.md): configure a script to handle errors.
- [Retries](./14_retries.md): re-try a step in case of error.
- [For Loops](./12_flow_loops.md): iterate a series of tasks.
- [Branches](./13_flow_branches.md): split the execution of the flow based on a condition.
- [Trigger Scripts](./10_flow_trigger.md): trigger flow upon a given event.
- [Early Stop / Break](./2_early_stop.md): stop early a flow based on a step's result.
- [Sleep / Delays](./15_sleep.md): pause a step for a given time.
- [Approval Steps](./11_flow_approval.md): have users approve a step to keep the flow running.

:::info Reminder

A workflow is a series of connected tasks, events, or processes that occur automatically to achieve a specific goal. These tasks are organized as a sequence of actions or steps: [scripts](../getting_started/0_scripts_quickstart/1_typescript_quickstart/index.md) in the case of Windmill.

<br/>

Find a short tutorial in our [Flows Quickstart](../getting_started/6_flows_quickstart/index.md).

:::

![Example of a flow](../assets/flows/flow_example.png)

## Toolbar

![Flow Toolbar](../assets/flows/flow_toolbar.png)

The toolbar allows you to export the flow, configure the flow settings, and test the flow.
Here are the different options available in the toolbar:

- **Export JSON**: export the flow as a JSON file.
- **Edit name**: shortcut to edit the flow name.
- **Edit summary**: shortcut to edit the flow summary.
- **Test flow**: open the flow test slider.
- **Save**: save the flow.

## Settings

The flow settings are divided into four tabs:

- [Metadata](#metadata)
- [Schedule](#schedule)
- [Shared Directory](#shared-directory)

### Metadata

The metadata tab allows you to configure the flow name, summary, and description.
Permissions can be configured in two ways:

- by User: select a user
- by Folder: select a folder

![Flow Metadata](../assets/flows/flow_settings_metadata.png)

### Schedule

Flows can be [triggered](../getting_started/9_trigger_flows/index.md) by any [schedules](../core_concepts/1_scheduling/index.md), their [webhooks](../core_concepts/4_webhooks/index.md) or their [UI](../core_concepts/6_auto_generated_uis/index.md) but they only have only one primary schedules with which they share the same path. The primary schedule can be set here.

A CRON expression is used to define the schedule. Schedules can also be disabled.

![Flow Schedule](../assets/flows/flow_settings_schedule.png)

:::tip

Have more details on all the ways to trigger flows [here](../getting_started/9_trigger_flows/index.md).

:::

### Shared Directory

Flows on Windmill are by default based on a result basis. A step will take as inputs the results of previous steps. And this works fine for lightweight automation.

For heavier ETLs, you might want to use the `Shared Directory` to share data between steps. Steps will share a folder at `./shared` in which they can store heavier data and pass them to the next step.

Beware that the `./shared` folder is not preserved across [suspends](./11_flow_approval.md) and [sleeps](./15_sleep.md). The directory is temporary and active for the time of the execution.

To enable the shared directory, on the `Settings` menu, go to `Shared Directory` and toggle on `Shared Directory on './shared'`.

![Flow Shared Directory](../assets/flows/flow_settings_shared_directory.png)

To use the shared directory, just load outputs using `./shared/${path}` and call it for following steps.

:::tip Example from the Demo workspace _Same worker example of using the './shared' folder_

Loading output
![Flow Shared Folder 1](../assets/flows/flow_shared_folder_1.png)
<br/>

Calling as input
![Flow Shared Folder 1](../assets/flows/flow_shared_folder_2.png)

This flow can be found on the Demo workspace/.

:::

Another example is to be found from the [Hub](https://hub.windmill.dev/flows/32/same-worker-example-of-using-the-'.%2Fshared'-folder).

## Static inputs

This menu centralizes the static inputs of every steps. It is akin to a file containing all constants. Modifying a value here modify it in the step input directly. It is especially useful when forking a flow to get an overview of all the variables to parametrize that are not exposed directly as flow inputs.

## Flow Inputs

In this section, you will learn how to add and configure flow inputs.

There are three ways to add flow inputs:

- **Manually** configuring the flow inputs.
- Using a **Request**: send a POST request to the a specific endpoint to add a flow input.
- **Copying** the first step inputs.

### Manually configuring the flow inputs

To manually configure the flow inputs, click on `Input` and then the `Add property` button.
It will open a slider where you can configure the flow input:

- **Name**: the name of the flow input.
- **Description**: the description of the flow input.
- **Type**: the type of the flow input: Integer, Number, String, Boolean, Array, Object, or Any.
- **Default value**: the default value of the flow input.

Also there are five advanced options:

- **None**: no advanced options.
- **File (Base 64)**: the flow input will be a file. The file will be encoded in base 64.
- **Enum**: the flow input will be one of the value of an enum. You can add the enum values.
- **Format**: you can add a format to the string. There are seven available:
  - **email**: the string will be an email.
  - **hostname**: the string will be a hostname.
  - **ipv4**: the string will be an ipv4.
  - **uri**: the string will be an uri.
  - **uuid**: the string will be an uuid.
  - **yaml**: the string will be an yaml.
  - **SQL**: the string will be an SQL.
- **Pattern**: you can add a pattern to the string. The pattern will be a regular expression.

### Using a Request

For this example, we will use the following flow at path: `u/test-user/my_flow`.

You can send a POST request to the following endpoint with a payload to add a flow input: the payload will be interpreted to extract the flow input.

For example, using CURL:

```bash
curl -X POST https://app.windmill.dev/api/w/windmill-labs/capture_u/u/test-user/my_flow \
   -H 'Content-Type: application/json' \
   -d '{"foo": 42}'
```

The flow input will be added with the following properties:

- **Name**: foo
- **Type**: Integer
- **Default value**: 42

### Copying the first step inputs

To copy the first step inputs, click on the `First step inputs` button.

## Flow Actions

An action script is simply a script that is neither a [trigger](./10_flow_trigger.md) nor an [approval](./11_flow_approval.md)
script. Those are the majority of the scripts.

There are two ways to create an action script:

- Write it directly in the flow editor.
- Import it from the Hub.
- Import it from the workspace.

## Inline action script

You can either create a new action script in:

- [Python](/docs/getting_started/scripts_quickstart/python): Windmill provides a Python 3.11 environment.
- [Typescript](/docs/getting_started/scripts_quickstart/typescript): Windmill uses Deno as the TypeScript runtime.
- [Go](/docs/getting_started/scripts_quickstart/go)
- [Bash](/docs/getting_started/scripts_quickstart/bash)

There are two special kind of scripts:

- [Postgres](/docs/getting_started/scripts_quickstart/sql)
- [MySQL](/docs/getting_started/scripts_quickstart/sql)

These are essentially Typescript template to easily write queries to a database.

### Importing an action script from the Hub

You can import an action script from the [Hub](https://hub.windmill.dev/).

### Importing an action script from the workspace

You can import an action script from the workspace.

![Flow action](../assets/flows/flow_new_action.png)


## Action editor

Windmill provide a web editor to write your scripts. It is available in the flow editor.

The script editor in split in three parts:

- [Header](#header): edit the summary of the script, navigate to advanced configuration.
- [Script editor](#script-editor): edit the code.
- [Step configuration/Test this step](#step-configurationtest-this-step): the bottom part is composed of three parts:
  - [Step input](#step-input): define the input of the step.
  - [Test this step](#test-this-step): test the step on its own.
  - [Advanced](#advanced): advanced configuration.

### Header

![Action editor header](../assets/flows/flow_action_editor_header.png)

The header is composed of:

- **Summary**: edit the summary of the script.
- **Shortcuts**: shortcut to advanced configuration.
  1. **[Retries](./14_retries.md)**: configure the number of retries and the delay between each retry.
  2. **[Early stop/Break](./2_early_stop.md)**: if defined, at the end of the step, the predicate expression will be evaluated to decide if the flow should stop early. Skipped flows are just a label useful to not see them in the runs page. If stop early is run within a forloop, it will just break the for-loop and have it stop at that iteration instead of stopping the whole flow.
  3. **[Suspend](./11_flow_approval.md)**: if defined, at the end of the step, the flow will be suspended until it receives external requests to be resumed or canceled. This is most useful to implement approval steps but can be used flexibly for other purpose. To get the resume urls, use `wmill.getResumeUrls()` in Typescript, or `wmill.get_resume_urls()` in Python.
  4. **[Sleep](./15_sleep.md)**: if defined, at the end of the step, the flow will sleep for a number of seconds before scheduling the next job (if any, no effect if the step is the last one). Sleeping is passive and does not consume any resources.

### Script editor

- Context var: add a context variable to the script
- Var: add an input variable to the script
- Resource: add a resource to the script
- Reset: reset the script to its initial state
- Assistant: reload the LSP assistant
- Format: format the script. Can be triggerd on save (CTRL+S)
- Script: view hub or workspace script code

### Step configuration/Test this step

The step configuration is composed of three parts:

- [Step input](#step-input): define the input of the step
- [Test this step](#test-this-step): test the step on its own
- [Advanced](#advanced): advanced configuration

#### Step input

![Step input](../assets/flows/flow_step_input.png)

Inputs of a script can be defined in the step configuration. They can be configured in three ways:

- **Templatable string**: a templatable string is a string that can be templated with context variables. It is defined by wrapping the string with `${` and `}`. For example, `${context.var}` is a templatable string that will be replaced by the value of the context variable `var`.
- **Dynamic**: JS expression that will be evaluated at runtime. The expression can use context variables and input variables. For example, `context.var` is a dynamic expression that will be replaced by the value of the context variable `var`.
- **Static**: a static value that will be used as is. For example, `static value` is a static value that will be used as is.

##### Templatable string/Static

The templatable string and static value can be combined. For example, `${context.var} static value` is a templatable string that will be replaced by the value of the context variable `var` and then concatenated with the static value `static value`.

```js
`${context.var} static value`;
```

##### Dynamic

JS expression that will be evaluated at runtime.

```js
[1, 2, 3, 4].reduce((acc, val) => acc + val, 0);
```

##### Insert mode

There are two insert modes:

- **Append**: append a context variable, a flow input or a resource at the cursor position
- **Connect**: replace the current value by a context variable, a flow input or a resource

Clicking on a field will set the mode to "Append". Clicking on the "Connect" button will set the mode to "Connect".

#### Test this step

![Test this step](../assets/flows/flow_test_this_step.png)

The test this step section allows to test the step on its own. You can set the input and run the script.
The result and logs are displyed on the left-hand side.

#### Advanced

The advanced section allows to configure the following:

##### Retries

Configure the number of [retries](./14_retries.md) and the delay between each retry.

![Retries](../assets/flows/flow_retries.png)

##### Early stop/Break

If defined, at the end of the step, the predicate expression will be evaluated to decide if the flow should [stop early](./2_early_stop.md). Skipped flows are just a label useful to not see them in the [runs](../core_concepts/5_monitor_past_and_future_runs/index.md) page. If stop early is run within a forloop, it will just break the for-loop and have it stop at that iteration instead of stopping the whole flow.

![Early stop](../assets/flows/flow_early_stop.png)

##### Suspend

If defined, at the end of the step, the flow will be [suspended](./11_flow_approval.md) until it receives external requests to be resumed or canceled. This is most useful to implement approval steps but can be used flexibly for other purpose. To get the resume urls, use `wmill.getResumeUrls()` in Typescript, or `wmill.get_resume_urls()` in Python.

![Suspend](../assets/flows/flow_suspend.png)

##### Sleep

If defined, at the end of the step, the flow will [sleep](./15_sleep.md) for a number of seconds before scheduling the next job (if any, no effect if the step is the last one). Sleeping is passive and does not consume any resources.

![Sleep](../assets/flows/flow_sleep.png)