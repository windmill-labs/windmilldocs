# Reference

This page contains a succinct but precise definition of the different concepts
of Windmill.

## Users

Users are uniquely identified globally by their email. They also have a unique
username with respect to each workspace they are member of. A user picks his
username when he joins a workspace. There are two kinds of Users:

- **authors**: they can write scripts/flows/apps/variables/resources.
- **operators**: they can only run and view scripts/flows/apps/variables/resources.

## Scripts

In Windmill, a Script can be written in the following languages:
[TypeScript (Deno)](../getting_started/0_scripts_quickstart/1_typescript_quickstart/index.md),
[Python](../getting_started/0_scripts_quickstart/2_python_quickstart/index.md),
[Go](../getting_started/0_scripts_quickstart/3_go_quickstart/index.md),
[Bash](../getting_started/0_scripts_quickstart/4_bash_quickstart/index.md) or
[SQL](../getting_started/0_scripts_quickstart/5_sql_quickstart/index.md). Its
two most important components are the input [JSON Schema](#json-schema)
specification and the code content. Python and Go Scripts also have an
auto-genreated lockfile that ensure that executions of the same Script always
use the exact same set of versioned dependencies. The code must always have a
main function, which is its entrypoint when executed as an individual serverless
endpoint or a [Flow](#flows) module:

- TypeScript:

  ```typescript
  async function main(param1: string, param2: { nested: string }) {
  	...
  }
  ```

- Python:

  ```python
  def main(param1: str, param2: dict, ...):
  	...
  ```

- Go

  ```go
  func main(x string, nested struct{ Foo string \`json:"foo"\` }) (interface{}, error) {
  	...
  }
  ```

### Script kinds

You can attach additional functionalities to Scripts by specializing them into
specific Script kinds.

#### Actions

Actions - or Common Scripts - are the basic building blocks for the flows.

#### [Trigger Scripts](../flows/10_flow_trigger.md)

These are used as the first step in Flows, most commonly with an internal
[state](#state-and-internal-state) and a schedule to watch for changes on an
external system, and compare it to the previously saved state. If there are
changes,it _triggers_ the rest of the flow, i.e. subsequent Scripts.

#### [Approval Scripts](../flows/11_flow_approval.md)

Suspend a flow until it's approved. An Approval Script will interact with the
Windmill API using any of the Windmill clients to retrieve a secret approval URL
and resume/cancel endpoints. Most common scenario for Approval Scripts is to
send an external notification with an URL that can be used to resume or cancel a
flow. For more details check
[Suspend and Resume tutorial](../flows/11_flow_approval.md).

#### [Error Handlers](../flows/7_flow_error_handler.md)

Handle errors for Flows after all retries attempts have been exhausted. If it
does not return an exception itself, the Flow is considered to be "recovered"
and will have a success status. So in most cases, you will have to rethrow an
error to have it be listed as a failed flow.

### Script hashes

Versions of Scripts are uniquely defined by their hashes. They are an immutable
reference similar to a git commit SHA. See [Versioning](#versioning). Scripts also
have a path and many versions share the same path. When a script is saved at a path,
it creates a new hash which becomes the "HEAD" of the path, the previous "HEAD" is
archived (but still deployed forever).

When a script is saved, it is immediately deployed.

### [Automatic UI generation](../core_concepts/6_auto_generated_uis/index.md)

By reading the main function parameters, Windmill generates the input
specification of the script in the [JSON Schema](https://json-schema.org/)
format. Windmill then renders the UI for the Script or Flow from that
specification.

You do not need to deal with the JSON Schema directly associated with the Script
or Flow directly. It is the result of the
[analysis of the script parameters of the main function](#script-parameters-to-json-schema)
and the UI customisation that you can optionaly do. In the UI customisation
interface, you may refine all the information that were not possible to infer
directly from the parameters such as restricting a string to an enum, or
precising that a list contains only numbers. You can also add helpful
descriptions to each field.

### JSON Schema

Below is a simplified spec of JSON Schema. See
[here for its full spec](https://json-schema.org/). Windmill is compatible with
the [2020-12 version](https://json-schema.org/draft/2020-12/schema). It is not
compatible with its most advanced features yet.

```json
{
	"$schema": "https://json-schema.org/draft/2020-12/schema",
	"type": "object",
	"properties": {
		"your_name": {
			"description": "The name to hello world to",
			"type": "string"
		},
		"your_nickname": {
			"description": "If you prefer a nickname, that's fine too",
			"type": "string"
		}
	},
	"required": []
}
```

Where the `properties` field contains a dictionary of arguments, and `required`
is the list of all the mandatory arguments.

The property names need to match the arguments declared by the main function, in
our example `your_name` and `your_nickname`. There is a lot you can do with
[arguments, types, and validation](#json-schema), but to keep it short:

- Arguments can specify a type `string`, `number` or `object`. User input will
  be validated against that type.
- One can further constraint the type by having the string following a RegEx or
  pattern, or the object to be of a specific [Resource Type](#resource-type)
- Arguments can be made mandatory by adding them to the `required` list. In that
  case, the generated UI will check that user input provides required arguments.
- Each argument can have a description field, that will appear in the generated
  UI.

### Script parameters to JSON Schema

There is a one to one correspondence between a parameter of the main function
and a field of `properties` in the JSON Schema. The name of the argument become
the name of the property, and most of the primitive types in Python and
TypeScript have a corresponding primitive type in JSON and by extension JSON
Schema.

In Python:

| Python     | JSON Schema                      |
| ---------- | -------------------------------- |
| `str`      | `string`                         |
| `float`    | `number`                         |
| `str`      | `string`                         |
| `float`    | `number`                         |
| `int`      | `integer`                        |
| `bool`     | `boolean`                        |
| `dict`     | `object`                         |
| `list`     | `any[]`                          |
| `bytes`    | `string, encodingFormat: base64` |
| `datetime` | `str, format: date-time`         |
| `_`        | `any`                            |

In Deno:

| Deno       | JSON Schema |
| ---------- | ----------- |
| `string`   | `string`    |
| `object`   | `object`    |
| `boolean`  | `boolean`   |
| `bigint`   | `int`       |
| `number`   | `number`    |
| `string[]` | `string[]`  |
| ...        | ...         |

However in Deno there also some special types that are specific to Windmill.
They are as follows:

| Windmill                          | JSON Schema                                  |
| --------------------------------- | -------------------------------------------- |
| `wmill.Base64`                    | `string`, encodingFormat: `base64`           |
| `wmill.Email`                     | `string`, format: `email`                    |
| `wmill.Sql`                       | `string`, format: `sql`                      |
| `wmill.Resource<'resource_type'>` | `object`, format: `resource-{resource_type}` |

`Base64` and `Email` are actually a type alias for `string`, and `Resource` is a
type alias for an `object`. They are purely type hints for the Windmill parser.

The `sql` format is specific to Windmill and replaces the normal text field with
a monaco editor with SQL support.

:::info

The equivalent of the type `wmill.Resource<'my_resource_type'>` in Python is the
following:

```python
my_resource_type = dict

def main(x: my_resource_type):
  ...
```

:::

### Job inputs and Script parameters

[Jobs](#jobs) take a JSON object as input which can be empty. That input is passed as the payload of the POST request that triggers the Script. The different key-value pairs of the objects are passed as the different parameters of the main function, with just a few language-specific transformations to more adequate types in the target language, if necessary (e.g base64/datetime encoding). Values can be nested JSON objects themselves, but we recommend trying to keep the input flat when possible.

If the payload contains keys that are not defined as parameters in the main function, they will be ignored. This allows you to handle arbitrary JSON payloads, as you can choose which keys to define as parameters in your script and process the data accordingly.

#### Request headers

It is possible for jobs to take request headers as arguments. To do so, either specify in the query args the headers to process at `include_headers`, separated with `,`. e.g: `/api/w/admins/jobs/run_wait_result/p/u/user/undisputed_script?include_header=X-Sign,foo`

or use the env variable: `INCLUDE_HEADERS` with the same format so that all requests to any job will include the headers.

#### Raw payload

Similarly to request headers, if the query args contain `raw=true`, then an additional argument will be added: `raw_string` which contains the entire json payload as a string (without any parsing). This is useful to verify the signature of the payload for example (discord require the endpoints to verify the signature for instance).

### Custom response code

For all sync run jobs endpoints, if the response contains a key `windmill_status_code` with a number value, that value will be used as the status code.
e.g: `{"windmill_status_code": 201}`

### SQL

For steps and scripts that use SQL, you can leverage the Windmill's `Sql` type
to display a monaco editor with SQL support in place of the normal `textarea`.
This allows for the entire query to be passed on as a parameter. For Flows, you
can still templatize the SQL query as you would for any Script.

![SQL](./sql.png)

### Rich display rendering

The result renderer will by default render results as a pretty JSON. However,
there are some cases that are handled specifically, so-called "rich results".
They are based on the format of the result.

This feature is useful if you want to display an image, a gif or a file instead of the the JSON of it.

If the result is an object/dict with a single key (except for `approval`, which
needs 3), you can leverage the following rich results:

| Type      | Description                                                 | Example (Deno)                                                                                                       |
| --------- | ----------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| json      | Render the value as a JSON                                  | `return { 'json': { 'a': 1 } }`                                                                                      |
| table-col | Render the value as a column in a table                     | `return { 'table-col': { 'foo': [42, 8], 'bar': [38, 12] }}`                                                         |
| table-row | Render the value as a row in a table                        | `return { 'table-row': [ 'foo', 'bar' ]}`                                                                            |
| html      | Render the value as HTML                                    | `return { 'html': '<div>...</div>' }`                                                                                |
| png       | Render the value as a PNG image                             | `return { 'png': encode(image) }`                                                                                    |
| file      | Render an option to download the file                       | `return { 'file': encode(file) }`                                                                                    |
| jpeg      | Render the value as a JPEG image                            | `return { 'jpeg': encode(image) }`                                                                                   |
| gif       | Render the value as a GIF image                             | `return { 'gif': encode(image) }`                                                                                    |
| error     | Render the value as an error message                        | `return { 'error': { 'name': '418', 'message': "I'm a teapot" }}`                                                    |
| approval  | Render an approval and buttons to Resume or Cancel the step | `return { 'resume': 'https://example.com', 'cancel': 'https://example.com', 'approvalPage': 'https://example.com' }` |
| svg       | Render the value as an SVG image                            | `return { 'svg': '<svg>...</svg>' }`                                                                                 |

**Regarding the tables:** If the result is a list whose first element is also a
list, it will display the result as a table. If the result is a dict/object
where every value is an array, it will also be displayed as a table, with the
key as the column name.

### Versioning

Scripts, when created, can have a parent script identified by its **hash**.
Indeed, scripts are never overwritten, they are instead subsumed by a child
script which corresponds to the new version of the parent script. This
guarantees traceability of every action done on the platform, including editing
scripts. It also enables versioning. Versioning is a good practice from software
engineering which everyone familiar with git already knows. Windmill versioning
is a **simplified git** with two simplifying assumptions:

- **Linearity**: the lineage or the chain of Scripts from the one with no
  ancestor/parent to the one with no child is linear - there is no branching and
  there is no merging.
- **Not diff-based**: every versions of a Script contains its entire content and
  not just the diff between him and his direct parent. This is for simplicity
  and read-performance sake.

### Python client

By authenticating with the [reserved variable](../core_concepts/2_variables_and_secrets/index.md#contextual-variables)
`WM_TOKEN`, the Python client can interact with the Windmill platform from
within the script jobs. This can be used, for instance, to:

- Get Resources
- Run Scripts now and read their result synchronously
- Schedule a Script for later

The Python client can be used in any Script by using the following prelude:

```python
import wmill

def main(...):
  wmill.get_resource('my_resource_path')
```

### TypeScript (Deno) client

Similarly for TypeScript (Deno):

```typescript
import * as wmill from 'https://deno.land/x/windmill/index.ts'

async function main(...) {
  let x = await wmill.getResource('u/user/name')
}
```

### Custom Environment Variables

In a self-hosted environment, Windmill allows you to set custom environment variables for your scripts. This feature is useful when a script needs an environment variable prior to the main function executing itself. For instance, some libraries in Go do some setup in the 'init' function that depends on environment variables.

To add a custom environment variable to a script in Windmill, you should follow this format: `<KEY>=<VALUE>`. Where `<KEY>` is the name of the environment variable and `<VALUE>` is the corresponding value of the environment variable.

## Flows

A **[Flow](../getting_started/6_flows_quickstart/index.md)** is a core concept. It is a JSON serializable value in the
[OpenFlow](../openflow/index.md) format that consists of an input spec (similar
to Scripts), and a linear sequence of steps, also referred to as modules. Each
step consists of either:

- Reference to a Script from the [Hub](https://hub.windmill.dev/)
- Reference to a Script in your [workspace](#workspace)
- Inlined Script in [TypeScript](../getting_started/0_scripts_quickstart/1_typescript_quickstart/index.md) (Deno), [Python](../getting_started/0_scripts_quickstart/2_python_quickstart/index.md), [Go](../getting_started/0_scripts_quickstart/3_go_quickstart/index.md) or [Bash](../getting_started/0_scripts_quickstart/3_go_quickstart/index.md)
- [Trigger Scripts](../flows/10_flow_trigger.md) which are a kind of Scripts that are meant to be first step of
  a scheduled Flow, that watch for external events and early exit the Flow if
  there is no new events
- [for loop](../flows/12_flow_loops.md) that iterates over elements and triggers the execution of an
  embedded flow for each element. The list is calculated dynamically as an
  [input transform](#input-transform).
- [Branch](../flows/13_flow_branches.md#branch-one) to the first subflow that has a truthy predicate (evaluated in-order)
- [Branches to all](../flows/13_flow_branches.md#branch-all) subflows and collect the results of each branch into an array
- [Approval/Suspend steps](../flows/11_flow_approval.md) which suspend the flow at no cost until it is resumed
  by getting an approval/resume signal - [more details here](#approval-scripts)
- Inner flows

With the mechanism of [input transforms](#input-transform), the input of any
step can be the output of any previous step, hence every Flow is actually a
[Directed Acyclic Graph (DAG)](https://en.wikipedia.org/wiki/Directed_acyclic_graph)
rather than simple sequences. You can refer to the result of any step using its
ID.

### Input Transform

Every step has an input transform that maps from:

- The Flow input
- Any step's result, not only the previous step's result
- Resource/Variable

to the different parameters of this specific step.

It does that using a JavaScript expression that operates in a more restricted
setting. That JavaScript is using a restricted subset of the standard library
and a few more functions which are the following:

- `flow_input`: The dict/object containing the different parameters of the Flow
  itself
- `results.{id}`: The result of the step with given ID
- `resource(path)`: The Resource at path
- `variable(path)`: The Variable at path

Using JavaScript in this manner, for every parameter, is extremely flexible and
allows Windmill to be extremely generic in the kind of modules it runs.

For each field, one has the option to write the JavaScript directly or to use
the quick connect button if the field map one to one with a field of the
`flow_input`, a field of the `previous_result` or of any steps.

### Trigger Scripts

A [Trigger Script](../flows/10_flow_trigger.md) is a Script whose purpose is to be used as
the first step of a Flow. In combination with a [Schedule](../core_concepts/1_scheduling/index.md), Flows can react to
external changes and continue triggering the rest of the flow with the changes
being listened to as new elements.

It is not very different than any other Script, except its purposes and that it
needs to return a list because the next step will be a [forloop](../flows/12_flow_loops.md) over all items
of the list in an embedded flow. Furthermore, it will very likely make use of
the convenience helper functions around
[internal states](#state-and-internal-state).

### [Retries](../flows/14_retries.md)

Every step of a Flow can be configured with two types of retries: "regular
intervals" and "exponential back-off". They can be applied independently, or
jointly.

Both strategies are based on the number of retries and the time interval to be
applied between them.

Strategies can also be combined, in which case, the linear strategy (regular
intervals) will be applied first, followed by the exponential back-off strategy.

The retries are tried when a step errors, until there are no retry attempts
left, in which case the Flow either passes the error to the
[error handler](#error-handlers) if any, or fail the Flow itself.

### State and Internal State

An internal state is just a state which is meant to persist across distinct
executions of the same Script. This is what enables Flows to watch for changes
in most event watching scenarios. The pattern is as follows:

- Retrieve the last internal state or, if undefined, assume it is the first
  execution.
- Retrieve the current state in the external system you are watching, e.g. the
  list of users having starred your repo or the maximum ID of posts on Hacker
  News.
- Calculate the difference between the current state and the last internal
  state. This difference is what you will want to act upon.
- Set the new internal state as the current state so that you do not process the
  elements you just processed.
- Return the differences calculated previously so that you can process them in
  the next steps. You will likely want to [forloop](../flows/12_flow_loops.md) over the items and trigger
  one Flow per item. This is exactly the pattern used when your Flow is in the
  mode of "Watching changes regularly".

The convenience functions do this in TypeScript are:

- `getState` which retrieves an object of any type (internally a simple
  Resource) at a path determined by `getStatePath`, which is unique to the user
  currently executing the Script, the Flow in which it is currently getting
  called in - if any - and the path of the Script
- `setState` which sets the new state

The states can be seen in the [Resources](../core_concepts/3_resources_and_types/index.md) section with a
[Resource Type](../core_concepts/3_resources_and_types/index.md#create-a-resource-type) of `state`.

## Windmill Hub

The Windmill Hub at <https://hub.windmill.dev> is a community hub to ask for and
share generic task-specific Scripts, Flows, Apps and Resource Types that can be
reused by everyone who is using Windmill. Learn more about how you can use the
Hub in the [Share on Windmill Hub](../misc/1_share_on_hub/index.md) guide.

## Endpoints to trigger Scripts and Flows

The Script trigger URLs are always available on the Script details page.

![Script trigger hooks](./script_webhook.png)

For all of the REST endpoints, the input of the Script or Flow should be passed as a JSON payload that matches a JSON Schema spec that contains at least the input keys of that Script or Flow. However, if the payload contains extra keys that are not defined in the schema, they will be ignored, allowing you to work with arbitrary JSON payloads. Those endpoints are authenticated and will require a bearer token of the format: `Authorization: Bearer XXX`. You can create a token by clicking "Create token".

### [Webhooks](../core_concepts/4_webhooks/index.md)

Every Script or Flow can be run by its hash or path as a HTTP request aka as a
**Webhook**. You can find the webhook on the Script or Flow detail page but the
target URL follows this format (those are templates URL):

<!-- FIXME: Update URLs after merging #336 -->

- Flow by path:
  <a href="https://example.com" rel="nofollow">https://app.windmill.dev/api/w/$WORKSPACE_ID/jobs/run/f/$FLOW_PATH</a>

- Script by hash:
  <a href="https://example.com" rel="nofollow">https://app.windmill.dev/api/w/$WORKSPACE_ID/jobs/run/h/$SCRIPT_HASH</a>

- Script by path:
  <a href="https://example.com" rel="nofollow">https://app.windmill.dev/api/w/$WORKSPACE_ID/jobs/run/p/$SCRIPT_PATH</a>

Find more information on the [Webhooks section](https://docs.windmill.dev/docs/core_concepts/webhooks/).

### Synchronous endpoint for Scripts

aka "Lambda style" endpoints

Every script also exposes an endpoint that triggers the Script but waits for its
full execution before returning.

The endpoint has the following format:

```bash
https://app.windmill.dev/api/w/$WORKSPACE_ID/jobs/run_wait_result/$SCRIPT_PATH
```

where $SCRIPT_PATH is the path of the Script in the workspace, including the prefix `u/` or `f/`

## Jobs

A job represents a past, present or future "task" or "work" to be executed by a
[worker](#workers). Future jobs or jobs waiting for a worker are called "queued
jobs", and are ordered by the time at which they were scheduled for
(`scheduled_for`). Jobs that are created without being given a future
`scheduled_for` are [scheduled](../core_concepts/1_scheduling/index.md) for the time at which they were created.

[Workers](#workers) fetch jobs from the queue, start executing them, atomically
set their state in the queue to "running", stream the logs while executing them,
then once completed remove them from the queue and create a new "completed job".

Every job has a unique UUID attached to it and as long as you have visibility
over the execution of the script, you are able to inspect the execution logs,
output and metadata in the dedicated details page of the job.

### Job kinds

There are 5 main kinds of jobs, that each have a dedicated tab in the [runs page](../core_concepts/5_monitor_past_and_future_runs/index.md):

- **Script Jobs**: Run a script as defined by the hash of the script (that
  uniquely and immutably defines a specific version of a script), its input
  arguments (args) and the `permissioned_as` user or group of whom it is going to
  act on behalf of and inherit the visibility to other items such as resources
  and variables from. An user can **NEVER** escalates his privileges but only
  de-escalates it by launching a script with either the same permissions as
  himself or a subset of it (by giving the permissions of a group that he is
  member of).

- **Preview Jobs**: similar to script jobs but instead of hash, they contain the
  whole raw code they will run. Those are the jobs that are launched from the
  script editors. Even when code is executed as a preview, you keep a trace of
  its execution.

- **Dependencies Jobs**: Scripts written in Python generate a lock file when
  they are saved/created. This lockfile ensures that an execution of the same
  hash will always use the same versions. The process of generating this
  lockfile is also a job in itself so you can easily inspect the issues
  generating the lockfile if any. See
  [Dependency Management](../advanced/6_imports/index.md) for more information.

- **Flow Jobs**: A flow job is the "meta" job that orchestrates the execution of
  every step. The execution of the steps are in-themselves jobs. It is defined
  similarly to a script job but instead of being defined by a path to a script,
  it is defined by a path to the flow.

- **Preview Flow Jobs**: A preview flow is a job that contains the raw json
  definition of the flow instead of merely a path to it. It is the underlying
  job for the preview of flows in the flow editor interface.

### Run jobs on behalf of

The `permissioned_as` value from script and preview jobs is the most important
concept to grasp to understand what makes Windmill's security and permission
model consistent, predictable and safe. `permissioned_as` is distinct from the
`created_by` value, even though in the vast majority of jobs, they will be the
same. It represents the level of permissions this job will execute with. As a
direct consequence, the variables (including secrets) that are accessible to the
scripts are only those whom the user or group has visibility on, given his
[permissions](#permissions-and-acl).

Similarly for the [Contextual Variable](../core_concepts/2_variables_and_secrets/index.md#contextual-variables) `WM_TOKEN` which
contains an ephemeral token (ephemeral to the script execution), which has the
same privilege and permissions as the owner in `permissioned_as`. The
[Python client](#python-client) inside the script implicitly uses that same
token to be granted privilege to do Windmill operations (like running other
scripts or getting resources), meaning that the same script ran by 2 different
users, will run differently and may be unauthorized to do partially or all
operations of the script. This is what enables anyone to share scripts doing
sensitive operations safely as long as the resources and secrets that the script
relies on are permissioned correctly.

A user can only run a script permissioned as either himself, one of the group
that he is a member of.

## Workers

Workers are autonomous processes that run one script at a time using the full
machines resources available to them.

Workers pull [jobs](#jobs) from the queue of jobs in the order of their
`scheduled_for` datetime as long as it is in the past. As soon as a worker pulls
a job, it atomically sets its state to "running", runs it, streams its logs then
once it is complete, saves it back in the database as a "complete job". The
final result and logs are stored forever.

The number of workers can be horizontally scaled up or down depending on needs
without any overhead.

## [Variables](../core_concepts/2_variables_and_secrets/index.md)

Variables are dynamic values that have a key associated to them and can be
retrieved during the execution of a Script or Flow.

All Variables (not just secrets) are encrypted with a workspace specific
symmetric key to avoid leakage.

There are two types of Variables in Windmill: **user-defined** and
**contextual**.

### User-defined Variables

User-defined Variables is essentially a key-value store where every user can
read, set and share values at given keys as long as they have the privilege to
do so.

They are editable in the UI and also readable if they are not
[Secret Variables](#secret-variables)

Inside the Scripts, one would use the Windmill client to interact with the
user-defined Variables.

Python:

```python
import wmill

wmill.get_variable("u/user/foo")
wmill.set_variable("u/user/foo", value)
```

TypeScript (Deno):

```typescript
import * as wmill from 'https://deno.land/x/windmill@v1.101.1/mod.ts';

wmill.getVariable('u/user/foo');
wmill.setVariable('u/user/foo', value);
```

Note that there is a similar API for getting and setting [Resources](#resource)
which are simply Variables that can contain any JSON values, not just a string
and that are labeled with a [Resource Type](#resource-type) to be automatically
discriminated in the auto-generated form to be of the proper type (e.g a
parameter in TypeScript of type `pg: wmill.Resource<'postgres'>` is only going to
offer a selection over the resources of type postgres in the auto-generated UI)

There is also a concept of [state](#state-and-internal-state) to share values
across script executions.

#### [Secret Variables](../core_concepts/2_variables_and_secrets/index.md)

[User-defined Variables](#user-defined-variables) can be set as **Secret**. Once
set, secret variables cannot be viewed from the dashboard, making sure no
accidental leakage is possible. Note that a script could still print out a
secret variable. While this is possible, a malicious user cannot leak a secret
variable discretely as every version of any scripts is stored forever with its
hash, and both the edit and the execution would be visible from the
[Audit Logs](#audit-log).

### [Contextual Variables](../core_concepts/2_variables_and_secrets/index.md#contextual-variables)

Contextual Variables are variables whose values are contextual to the Script
execution. They are are automatically set by Windmill. This is how the Deno and Python clients get their implicit
credentials to interact with the platform.

You can use them in a Script by clicking on "+Context Var":

![contextual variable](../core_concepts/2_variables_and_secrets/context_variables.png)

## [Resource](../core_concepts/3_resources_and_types/index.md)

A Resource is similar to a [Variable](#variables) in that it stores a
permissioned value that is meant to be used by Scripts. However, a Resource
represents a "complex" object, namely a JSON object. That JSON object is
constrained by its [Resource Type](#resource-type) JSON Schema, the same way the
possible inputs of a Script are constrained by the input JSON Schema. An example
of a Resource is the `demodb` schema:

```json
{
	"dbname": "demo",
	"host": "demodb.delightool.xyz",
	"password": "demo",
	"port": 6543,
	"sslmode": "disable",
	"user": "demo"
}
```

A Resource string can refer to a [Variable](#variables) using the following
pattern:

```
$var:path
```

For instance:

```json
{
	"simple": "$var:u/user/foo"
}
```

This is most useful when dealing with sensitive values that should be treated as
secrets.

### The special Resource Type payload

In JSON payloads, instead of passing an object with their values, one can use
the string `$res:u/user/foo` where the second part is the path of the resource.
The worker will fetch the corresponding object and switch the string with the
object value before triggering the script or the flow.

### [Resource Type](../core_concepts/3_resources_and_types/index.md)

Resource Types have a name and a [JSON Schema](#jsonschema) value. A Resource is
constrained by its Resource Type. An example of a Resource Type is for instance
a Postgres connection, shortened as `postgresql` and the schema for it looks
like the following:

```json
{
	"$schema": "https://json-schema.org/draft/2020-12/schema",
	"properties": {
		"dbname": {
			"description": "The database name",
			"type": "string"
		},
		"host": {
			"description": "The instance host",
			"type": "string"
		},
		"password": {
			"description": "The postgres users password",
			"type": "string"
		},
		"port": {
			"description": "The instance port",
			"type": "integer"
		},
		"sslmode": {
			"description": "The sslmode",
			"enum": ["disable", "allow", "prefer", "require", "verify-ca", "verify-full"],
			"type": "string"
		},
		"user": {
			"description": "The postgres username",
			"type": "string"
		}
	},
	"required": ["dbname", "user", "password"],
	"type": "object"
}
```

Same as for the input spec of a Script, you do not have to deal with the JSON
Schema directly and should use the UI builder to edit the schema.

## [Schedule](../core_concepts/1_scheduling/index.md)

A Schedule is defined by a [path](#path), a periodicity
[as a CRON string](https://en.wikipedia.org/wiki/Cron#Overview), a Script hash
to trigger and the args to provide to the Script to run it.

An example of a schedule periodicity/CRON is: `0 */15 * * * *` which corresponds
to "trigger this every 15 minutes".

The immediate next execution of a schedule is always in the [job](#jobs) queue.

Schedules can not be deleted but they can be disabled.

## Workspace

Every nameable or pathable entity in Windmill has a workspace attached to it.
This includes:

- [users](#users)
- [groups](#groups)
- [scripts](#scripts)
- [resources](#resource)
- [variables](#variables)
- [schedules](#schedule)
- [jobs](#jobs)

Windmill's entire database is partitioned by workspaces such that users, teams
and orgs can safely co-locate without risk of leakage.

Any user can create his own workspace. When a user creates a workspace, he is an
admin of such workspace and he can invite others to join his workspace.

## Path

Windmill uniquely identifies [Scripts](#scripts), [Variables](#variables),
[Resources](#resource), [Schedules](#schedule) - and in general almost
everything - using their path. The paths are globally unique within the category
of entities they represent. In short, a Resource and a Schedule for example can
have the same path, without conflict.

A path looks like `<owner-kind>/<owner-name>/<resource-name>`:

- **ownership path prefix** (`<owner-kind>/<owner-name>`) is the part which is
  itself made of 2 sub-parts. There are only 2 owners kinds: [groups](#groups)
  and [users](#users). For paths, the owner kind for group is shortened to `g`
  and for user it is shortened to `u`. The owner name corresponds to the name of
  the group or the username of the user.
- **resource-name** is the name of the resource itself

Examples:

- A private Script `u/alice/hello_world`
- A Script available to the users of the `all` group (so all users)
  `g/all/hello_world`

## Owner

An owner is the user or group identified in a [path](#path) through the
"ownership path prefix" (`u/<user>` or `g/<group>`). An owner always has write
[permission](#permissions-and-acl) over the entity.

## [Groups](../core_concepts/8_groups_and_folders/index.md)

Groups have a name and a set of members. They are inspired by unix groups:

- Members are always users
- Users can be members of multiple groups

Groups can own entities: the ownership path prefix of those entities are of the
form `g/<group>` and can be granted or shared read or write
[permissions](#permissions-and-acl) to entities.

Members of a group have permissions to act on behalf of the group. Groups
themselves are permissioned such that only admin and users with write permission
on the group name can add or remove users from a group. Being a member of a
group does not grant write permission on the group itself.

### The 'all' Group

The `all` group is a special group that automatically contains all users of a
[workspace](#workspace).

## Permissions and ACL

Windmill includes fine-grained ACL by default for all kinds of entites with a
path:

- [groups](#groups)
- [scripts](#scripts)
- [resources](#resource)
- [variables](#variables)
- [schedules](#schedule)
- [jobs](#jobs)

Every entity is writable by their [owner](#owner) and readable by none others
except when being shared specifically to other groups and users. An entity can
be shared in **read-only** or **read and write** mode. Write mode implicitly
contains read permission. The write mode enables to delete, rename and change
the sharing of an entity, so be careful with who gets write access.

Admins of a [workspace](#workspace) ignore all ACLs and can read and write over
everything.

## Audit Log

Every operation, and actions that have side-effects (so every action except
getting or listing entities) have a log attached to them, which contains the
user at the origin of the operation and some metadata specific to the kind of
operation. Every kind of audit log has a hierarchical operation name attached to
it. Admins of a workspace can see the audit logs of every user of a
[workspace](#workspace). General users can only see their own audit logs. Audit
logs have different retention policy depending on the [plan](/pricing) of your
team.
