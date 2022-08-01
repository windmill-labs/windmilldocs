# Reference

This page contains a succinct but precise definition of the different concepts
of windmill.

## Users

Users are uniquely identified globally by their email. They also have a unique
username with respect to each workspace they are member of. An user picks his
username when he joins a workspace.

## Scripts

In Windmill, a script is always a python or typescript (deno) script. Its 2 most
important components are its input [jsonschema](#jsonchema) specification and
its code content. The code must always have a main function:

- Python:

```python
def main(param1: str, param2: dict, ...):
```

- Typescript:

```typescript
async function main(param1: string, param2: object, param3: Resource<'postgres'>) {
```

which is its entrypoint.

When a [job](#Job) is run, it is given input arguments. The input arguments are
passed almost straight as to the main function, with just a few language
specific transformations from JSON to more adequate types in typescript or
python if necessary.

Scripts versions are uniquely defined by their hash.

### Versioning

Scripts when created can have a parent script identified by its **hash**.
Indeed, scripts are never overwritten, they are instead subsumed by a child
script which corresponds to the new version of the parent script. This
guarantees traceability of every actions done on the platform, including editing
scripts. It also enables versioning. Versioning is good practice from software
engineering which everyone familiar with git already knows. Windmill versioning
is a **simplified git** and makes two main simplifying assumptions:

- **Linearity**: the lineage or the chain of script from the one with no
  ancestor/parent to the one with no child is linear: there is no branching and
  there is no merging.
- **Not diff-based**: every versions of a script contains its entire content and
  not just the diff between him and his direct parent. This is for simplicity
  and read-performance sake.

### UI automatic generation

By reading the main function parameters, Windmill generates the input
specification of the script in the [json-schema](https://json-schema.org/)
format. Windmill then renders the flow's or script's UI from that specification.

You never need to deal with the generated jsonschema directly but here is an
example of what it looks like:

### Jsonschema

Below is a simplified spec of jsonschema. See
[here for its fullspec](https://json-schema.org/). Windmill is compatible with
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

where `properties` contains a dictionary of arguments, and `required` a list of
all mandatory arguments.

The property names need to match the arguments declared by the main function, in
our example `your_name` and `your_nickname`. There is a lot you can do with
[arguments, types, and validation](#jsonschema), but to keep it short:

- Arguments can specify a type `string`, `number` or `object`. User input will
  be validated against that type.
- One can further constraint the type by having the string following a regex or
  pattern, or the object be of a specific [#resource-type](Resource Type)
- Arguments can be made mandatory by adding them to the "required" list. In that
  case, the generated UI will check that user input provides required arguments.
- Each argument can have a description field, that will appear in the generated
  UI.

### Python client

By authenticating with the [reserved variable](#reserved-variable) `WM_TOKEN`,
the python client can interact with the windmill platform from within the script
jobs. This can be used, for instance, to:

- get resources
- run scripts now and read their result synchronously
- schedule a script for later

The python client can be used in any script by using the following prelude:

```python
import wmill

def main(...):
  wmill.get_resource('my_resource_path')
```

### Typescript (deno) client

Similarly for Typescript (deno):

```typescript
import * as wmill from 'https://deno.land/x/windmill/index.ts'

async function main(...) {
  let x = await wmill.getResource('u/user/name')
}
```

### Dependency management

For Typescript (Deno), the dependencies and their versions are directly in the
script and hence there is no need for any additional steps.

For Python, the imports are automatically analyzed at saving time of the script
and the corresponding list of Pypi packages are extracted. A dependency job is
then spawned to associate that list of Pypi package with a lockfile which will
lock the versions used for that version of that python script. This ensures that
the same version of a python script is always executed with the same versions of
its dependencies. It also avoid the hassle of having to maintain a separate
requirements file.

If the imports are not properly analyzed, there exists an escape hatch to
override the input of the dependency job. One needs to head the script with the
following comment:

```python
#requirements:
#dependency_with_version_specified=0.4
#dependency_without
```

## Flows

A Flow is the core concept behind windmill. It is a json serializable value that
consist of an input spec (similar to scripts), and a linear sequence of steps.
Each step consist of a reference to a script from the hub

### Trigger-script

A trigger script is a script whose purpose is to be used as a first step of a
flow in combination with a schedule so that a flow can react to external changes
and continue triggering the rest of the flow if the changes being listened to as
new elements.

## WindmillHub

The WindmillHub at <https://hub.windmill.dev> is a community hub to ask and
share generic task-specific scripts, trigger-scripts, flows that be reused in
everyone's flow in order to not have to reinvent the wheel.

## Webhooks

Every script or flows can be run by its hash or path as an http request aka as
"Webhook". You can find the webhook in the script or flow details page but the
target URL follows this format:

- Flow by path:
  <https://app.windmill.dev/api/w/$WORKSPACE_ID/jobs/run/f/$FLOW_PATH>
- Script by hash:
  <https://app.windmill.dev/api/w/$WORKSPACE_ID/jobs/run/h/$SCRIPT_HASH>
- Script by path:
  <https://app.windmill.dev/api/w/$WORKSPACE_ID/jobs/run/p/$SCRIPT_PATH>

## Jobs

A job represents a past, present or future "task" or "work" to be executed by a
[worker](#worker). Future jobs or jobs waiting for a worker are called "queued
jobs", and are ordered by the time at which they were scheduled for
(`scheduled_for`). Jobs that are created without being given a future
`scheduled_for` are scheduled for the time at which they were created.

[Workers](#worker) fetch jobs from the queue, start executing them, set
atomically their state in the queue to "running", stream the logs while
executing them, then once completed remove them from the queue and create a new
"completed job".

Every job has a unique UUID attached to it and as long as you have visibility
over the execution of the script, you are able to insect the execution logs,
output and metadata in the dedicated details page of the job.

### 5 kinds of Jobs

There are 3 main kinds of jobs, that each have a dedicated tab in the runs page:

- **Script Jobs**: Run a script as defined by the hash of the script (that
  uniquely and immutably defines a specific version of a script), its input
  arguments (args) and the "permissioned_as" user or group of whom it is gonna
  act on behalf of and inherit the visibility to other items such as resources
  and variables from. An user can **NEVER** escalates his privileges but only
  de-escalates it by launching a script with either the same permissions as
  himself or a subset of it (by giving the permissions of a group that he is
  member of).

- **Preview Jobs**: similar to script jobs but instead of hash, they contain the
  whole raw code they will run. Those are the jobs that are launched from the
  script editors. Even when code is executed as a preview, you keep a trace of
  its execution.

- **Dependencies Jobs**: Scripts written python generate a lock file when they
  are saved/created. This lockfile ensures that an execution of the same hash
  will always use the same versions. The process of generating this lockfile is
  also a job in itself so you can easily inspect the issues generating the
  lockfile if any. See [Dependency Management](#dependency-management).

- **Flow Jobs**: A flow job is the "meta" job that orchestrates the execution of
  every steps of its. The execution of the steps are in-themselves jobs. It is
  defined similarly to a script job but instead of being defined by a path to a
  script, it is defined by a path to the flow.

- **Preview Flow Jobs**: A preview flow is a job that contains the raw json
  definition of the flow instead of merely a path to it. It is the underlying
  job for the preview of flows in the flow editor interface.

### Jobs are run on behalf of

The `permissioned_as` value from script and preview jobs is the most important
concept to grasp to understand what makes windmill's security and permission
model consistent, predictable and safe. `permissioned_as` is distinct from the
`created_by` value, even though in the vast majority of jobs, they will be the
same. It represents the level of permission this job will execute with. As a
direct consequence, the variables (including secrets) that are accessible to the
scripts are only those whom the user or group has visibility on given his
[permissions](#permissions).

Similarly for the [Contextual Variable](#contextual-variables) `WM_TOKEN` which
contains an ephemeral token (ephemeral to the script execution), which has the
same privilege and permissions as the owner in `permissioned_as`. The
[python client](#client) inside the script implicitly uses that same token to be
granted privilege to do windmill operations (like running other scripts or
getting resources), meaning that the same script ran by 2 different users, will
run differently and may be unauthorized to do partially or all operations of the
script. This is what enables anyone to share scripts doing sensitive operations
safely as long as the resources and secrets that the script relies on are
permissioned correctly.

A user can only run a script permissioned as either himself, one of the group
that he is a member of.

## Worker

Workers are autonomous processes that run one script at a time using the full
machines resources available to them.

Workers pull [jobs](#job) from the queue of jobs in the order of their
`scheduled_for` datetime as long as it is in the past. As soon as a worker pulls
a job, it atomically sets its state to "running", runs it, streams its logs then
once it is complete, saves it back in the database as a "complete job". The
final result and are logs stored forever.

The number of workers can be horizontally scaled up or down depending on needs
without any overhead.

## Variables

Variables are dynamic values that have a key associated to them and can be
retrieved during the execution of a script or flow.

All variables (not just secrets) are encrypted with a workspace specific
symmetric key to avoid leakage.

There are two types of variables in Windmill.

### User-defined Variables

User-defined Variables is essentially a key-value store where every user can
read, set and shares values at given keys as long as they have the privilege to
do so.

They are editable in the UI and also readable if they are not
[Secret Variables](#secret-variables)

Inside the scripts, one would use the windmill client to interact with the
user-defined variables.

Python:

```python
wmill.get_variable("u/user/foo")
wmill.set_variable("u/user/foo", value)
```

Typescript (deno):

```
wmill.getVariable('u/user/foo')
wmill.setVariable('u/user/foo', value)
```

#### Secret Variables

[User-defined Variables](#user-defined-variables) can be set as **Secret**. Once
set, secret variables cannot be viewed from the dashboard, making sure no
accidental leakage is possible. Note that a script could still print out a
secret variable. While this is possible, a malicious user cannot leak a secret
variable discretely as every version of any scripts is stored forever with its
hash, and both the edit and the execution would be visible from the
[audit logs](#audit-log).

### Contextual Variables

Contextual variables are variables whose values is contextual to the script
execution. This is how the Deno and Python windmill client gets their implicit
credentials to interact with the platform.

| Name         | Value                                                                                                               |
| ------------ | ------------------------------------------------------------------------------------------------------------------- |
| WM_TOKEN     | Token ephemeral to the current script with equal permission to the permission of the run (Usable as a bearer token) |
| WM_EMAIL     | Email of the user that executed the current script                                                                  |
| WM_USERNAME  | Username of the user that executed the current script                                                               |
| WM_JOB_ID    | Job id of the current job                                                                                           |
| WM_WORKSPACE | The workspace id of the current job                                                                                 |

## Resource

A resource is similar to a [variable](#variables) in that it stores a
permissioned value that is meant to be used by scripts. However, a resource
represents a "complex" object: a JSON object. That JSON object is constrained by
its [resource type](#resource-type) jsonschema, the same way the possible input
of a scripts are constrained by the input jsonschema. An example of resource is
the demodb schema:

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

A resource string can refer to a [#variable] using the following pattern:

```
$var:path
```

for instance:

```json
{
  "simple": "$var:u/user/foo"
}
```

This is most useful when dealing with sensitive values that should be treated as
secrets.

### Resource type

Resource types have a name and a [jsonschema](#jsonschema) value. A resource is
constrained by its resource type. An example of a resource type is for instance
a postgres connection, shortened as "postgres' and whose schema is:

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
      "enum": [
        "disable",
        "allow",
        "prefer",
        "require",
        "verify-ca",
        "verify-full"
      ],
      "type": "string"
    },
    "user": {
      "description": "The postgres username",
      "type": "string"
    }
  },
  "required": [
    "dbname",
    "user",
    "password"
  ],
  "type": "object"
}
```

Same as for the input spec of a script, you do not have to deal with the
jsonschema directly and should use the UI builder to edit the schema.

## Schedule

A schedule is defined by a [path](#path), a periodicity
[as a cron string](https://en.wikipedia.org/wiki/Cron#Overview), a script hash
to trigger and the args to provide to the script to run it.

An example of a schedule periodicity/cron is: `0 */15 * * * *` which corresponds
to "trigger this every 15 mins".

The immediate next execution of a schedule is always in the [job](#job) queue.

Schedules can not be deleted but they can be disabled.

## Workspace

Every namable entity or pathable entity in windmill has a workspace attached to
it. This includes:

- users
- [groups](#group)
- [scripts](#script)
- [resources](#resource)
- [variables](#variable)
- [schedules](#schedules)
- [jobs](#job)

Windmill's entire database is partitioned by workspaces such that users, teams
and orgs can safely co-locate without risk of leakage.

Any user can create his own workspace. When a user create a workspace, he is an
admin of such workspace and he can invite others to join his workspace.

## Path

Windmill uniquely identifies [scripts](#script), [variables](#variable),
[resources](#resources), [schedules](#schedule) resources using their path. The
paths are globally unique within the category of entities they represent (so a
resource and a schedule can have the same path for instance without conflict.)

A path looks like `<owner-kind>/<owner-name>/<resource-name>`:

- `<owner-kind>/<owner-name>` is the **ownership path prefix** part which is
  itself made of 2 sub-parts. There are only 2 owners kinds, [group](#group) and
  users. For paths, the owner kind for group is shortened to `g` and for user it
  is shortened to `u`. The owner name corresponds to the name of the group or
  the username of the user.
- **resource-name** is the name of the resource itself

Examples:

- a private script `u/alice/hello_world`
- a script available to the users of the all group (so all users)
  `g/all/hello_world`

## Owner

An owner is the user or group identified in a [path](#path) through the
"ownership path prefix" (`u/<user>` or `g/<group>`). An owner always has write
[permission](#permission-and-acl) over the entity.

## Groups

Groups have a name and a set of members. They are inspired by unix groups:

- Members are always users.
- Users can be member of multiple groups.

Groups can own entities: the ownership path prefix of those entities are of the
form `g/<group>` and can be granted or shared read or write
[permissions](#permission-and-acl) to entities.

Members of a group have permissions to act on behalf of a group. Groups
themselves are permissioned such that only admin and users with write permission
on the group name can add or remove users from a group. Being a member of a
group does not grant write permission on the group itself.

### The 'all' Group

The `all` group is a special group that automatically contains all users of a
[workspace](#workspace).

## Permissions and ACL

Windmill includes fine-grained ACL by default for all kind of pathable entities:

- [groups](#group)
- [scripts](#script)
- [resources](#resource)
- [variables](#variable)
- [schedules](#schedules)
- [jobs](#job)

Every entity is writable by their [owner](#owner) and readable by none others
except when being shared specifically to other groups and users. An entity can
be shared in read-only or read+write mode. Write mode implicitly contains read
permission. The write mode enables to delete, rename and change the sharing of
an entity so be careful with whom you share with in write mode.

Admins of a [workspace](#workspace) ignore all ACLs and can read and write over
everything.

## Audit Log

Every operation and actions that have side-effects (so every action except
getting or listing entities) have a log attached to them which contains the user
at the origin of the operation and some metadata specific to the kind of
operation. Every kind of audit log have a hierarchical operation name attached
to them. Admins of a workspace can see the audit logs of every users of a
[workspace](#workspace). Simple users can only see their own audit logs. Audit
logs have different retention policy depending on the plan your team is on.
