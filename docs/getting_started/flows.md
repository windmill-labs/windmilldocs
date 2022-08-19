# Flows

:::tip
Signup at [app.windmill.dev](https://app.windmill.dev) then you can one-click
import any flows on [hub.windmill.dev](https://hub.windmill.dev). See
['Whenever an HN message contains a mention, publish it to slack'.](https://hub.windmill.dev/flows/13/whenever-an-hn-message-contains-a-mention%2C-publish-it-to-slack)

<br/>

![Edit in windmill](./assets/edit_in_windmill.png)
:::

## Getting started

**Flows** allow you to streamline complex processes and operations by chaining
simple steps together. Each Flow is composed of one or more steps.

Steps are [Scripts][scripts] that accept inputs, execute a function and then produce an
output, usually used in subsequent steps. Flows contain all of the benefits of
Windmill Scripts, offering immediate functionality such as third party app
integrations, SQL queries, Slack, custom scripts and more!

Windmill Flows are based on a declarative language for chaining scripts, we call it 
**OpenFlow**, you can read the OpenFlow spec [here](/docs/openflow).

In Windmill, both Scripts and Flows consist of two parts: 

- **Metadata**, which contains information about the Script or Flow itself, such 
  as its path, description, and author, and;
- **Logic**, which in case of a Script is the code, and in case of a Flow is the 
  list of Scripts to be executed.

### Metadata

**Flow Inputs** arguments for each flow can be edited using the flow input wizard
or copying the first step schema.

**Scripts** can be dynamically added to each flow by clicking the '+' button.
Scripts can be automatically imported from [
WindmillHub](https://hub.windmill.dev/) selecting a Hub path. You can also use your
own custom scripts created in Windmill by selecting a Script path.

Each script has **Scripts Inputs**, and each of them can be filled
with either static values, a templated string or a full JavaScript
expression. Those expressions can refer to any step's output or the flow
input. This makes the workflow more similar to a DAG than to just a sequence.

In most cases, the templating engine using
`static value ${js.expr}` for mixing static strings and dynamic expression as
string is sufficient. But in some cases, you need the full power of javascript
and the **Raw Javascript Editor** does just that allowing each step script input
to be a complex JavaScript expression inputs, variables, resources and outputs
from other steps in the Flow.

**Preview Mode** is available for each Step in a Flow, enabling you to see the
output of each step script and how they interact with previous Steps.

## Creating a Flow

In this tutorial, you will create a Flow that fetches data from an endpoint, 
processes it in Python using Pandas to generate a plot, and finally output
the resulting graph to a Slack channel.

### Log in to Windmill

Log into your Windmill instance, create or select a workspace and land on the
windmill dashboard. Select the Flows icon from the navigation bar on the left.
![Add script](./assets/flows/dashboard.png)

### Select Flows

All previously created Flows can be accessed from the Flows dashboard. To create
a new Flow, click the **New Flow** button in the top right hand corner.
![Add script](./assets/flows/flow-dashboard.png)

### Create New Flow

Input a title for the Flow and optionally a brief summary of what the Flow will
do. A more detailed description of the flow can also be added.
![Add script](./assets/flows/flow-metadata.png)

### Add Flow Inputs

Using the Flow input wizard or the json-schema, arguments can be given to the
flow. They are globally available to all the steps in the Flow.
![Add script](./assets/flows/flow-input.png)

### Add HTTP Get Request Step Script

To create the first step in the flow, a script can be added automatically from
either Windmill Hub or any custom script that you have previously made in
Windmill.  
In order to send a simple HTTP Get Request, select the Hub icon,
'Pick a script path' and then search for a HTTP Get Request in Windmill Hub.

Once you have found the script, click on it and Windmill will
automatically populate it in the step script. 

Add a static 'url' argument of the end point you want to send a Get Request
to in order to access the User Growth Data. 

<!-- FIXME: Already outated -->
<!-- ![Add script](./assets/flows/search-hub-script.png) -->
![Add script](./assets/flows/flow-step1.png)

### Add Python Graph Step Script with Dynamic JavaScript

Next, create a new step script by clicking the '+' button. 

In order to process the data that we collected from the first step script,
we'll use dynamic JavaScript to take the output from the previous step and
use it as an argument in our current step script. 

The custom Python script uses pandas to create a pie chart that will be 
converted to Bytes and output to the next step script. 

We will use the `previous_result` object which contains the inputs and 
result of the previous step.

![Add script](./assets/flows/flow-step2.png)

### Output Graph to Slack

To output the graph to Slack add one more step script using the Windmill Hub
`send_slack_image` path. Again, use the dynamic JavaScript to connect the output
of step script 2 to the input of step script 3.
![Add script](./assets/flows/flow-step3.png)

### Preview Flow

Now that the Flow is complete, use preview mode to see the output of each step
script and ensure that there are no errors.
![Add script](./assets/flows/flow-preview.png)

### Deploy your Flow!

Click the Next button and then save your flow. You can run your newly created
flow from the Flows page or schedule your Flow on the schedules page.
![Add script](./assets/flows/slack-output.png)


<!-- Resources -->
[scripts]: ./scripts