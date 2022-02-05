# Reference

This page contains a succinct but precise definition of the different concepts
and entities of windmill.

## Job

A job represents a past, present or future "task" or "work" to be executed by a
[worker](#worker). Future jobs or jobs waiting for a worker are called "queued
jobs", and are ordered by the time at which they were scheduled for
(`scheduled_for`). Jobs that are created without being given a future
`scheduled_for` are scheduled for the time at which they were created.

[Workers](#worker) fetch jobs from the queue, start executing them, set
atomically their state in the queue to running, stream the logs while executing
them, then once completed remove them from the queue and create a new "completed
job".

### 3 kinds of jobs

There are 3 main kinds of jobs, that each have a dedicated tab in the runs page:

- script jobs: primarily defined by the hash of the script they will run, the
  input args and their "permissioned_as" privilege (more on that below)
- preview jobs: similar to script jobs but instead of hash, they contain the
  whole raw code they will run (indeed since there might be no script hash that
  corresponds to that preview)
- dependencies jobs: defined by a [pipenv](#pipenv) file. These jobs represent
  an attempt to run a "pipenv install", generate a pipenv lock and store the
  resulting lock file for other workers to sync with and provide the same
  consistent and reproducible python environment on all workers.

Scripts and preview jobs are passed [variables (including secrets)](#variables)
as python environment variables. Secrets values are only readable in this
context, when they are passed to a script as an environment variable. There is
no other way to read the value of a secret, by design.

### Jobs are run on behalf of

The `permissioned_as` value from script and preview jobs is the most important
concept to grasp to understand what makes windmill's security and permission
model consistent, predictable and safe. `permissioned_as` is distinct from the
`created_by` value, even though in the vast majority of jobs, they will be the
same. It represents the level of permission this job will execute with. As a
direct consequence, the variables (including secrets) that are passed to the
scripts are only those whom the [owner](#owner) has visibility on given his
[permissions](#permissions). This also includes the
[reserved variable](#reserved-variable) `WM_TOKEN` which contains an ephemeral
token (ephemeral to the script execution), which has the same privilege and
permissions as the owner in `permissioned_as`. The [python client](#client)
inside the script implicitly uses that same token to be granted privilege to do
windmill operations (like running other scripts or getting resources), meaning
that the same script ran by 2 different users, will run differently and may be
unauthorized to do partially or all operations of the script. This is what
enables anyone to share scripts doing sensitive operations safely as long as the
resources and secrets that the script relies on are permissioned correctly.

A user can only run a script permissioned as either himself, one of the group
that he is a member of, or [anonymous](#anonymous)

## Worker

Workers are autonomous processes that run one script at a time using the full
resources available to them. They sync themselves with the latest
[pipenv](#pipenv) by fetching its corresponding pipenv lock. Sync happens
periodically, and before a run. This ensures that regardless of the worker the
job run on, as long as the pipenv id they are synced on are the same, the
dependencies with which they run it is exactly the same, even for transitive
dependencies. Jobs display the [pipenv](#pipenv) id with which they were run.

Workers can be dedicated to a workspace or some users to ensure that those get
sufficient compute resources, and less start-up delay than the rest.

Workers pull [jobs](#job) from the queue of jobs in the order of their
`scheduled_for` datetime as long as it is in the past. As soon as a worker pulls
a job, it atomically sets its state to "running", runs it, streams its logs then
once it is complete, saves it back in the database as a "complete job". The
final result and are logs stored forever.

The number of workers can be horizontally scaled up or down depending on needs
without any overhead.

## Script

In Windmill, a script is always a python script. Its 2 most important components
are its input [jsonschema](#jsonchema) specification and its code content. The
code must always have a main function:

```
def main(...):
```

which is its entrypoint. The different constituents of the scripts are then
hashed into a value: the hash of the script which is the script exact and unique
identifier.

### Versioning

Scripts when created can have a parent script identified by its hash. Indeed,
scripts are never overwritten, they are instead subsumed by a child script which
corresponds to the new version of the parent script. This guarantees
traceability of every actions done on the platform, including editing scripts.
It also enables versioning. Versioning is a very common good practice of
software engineering which everyone familiar with git already knows. Windmill
versioning is a simplified git and makes two main simplifying assumptions:

- the lineage or the chain of script from the one with no ancestor/parent to the
  one with no child is linear: there is no branching and there is no merging.
- every versions of a script contains its entire content and not just the diff
  between him and his direct parent. This is for simplicity and read-performance
  sake.

### Script arguments

A script accepting arguments needs to provide a user interface for users to
input argument values. Windmill autogenerates that interface from the
specifications in the **arguments** section. Arguments are defined as a
[json-schema](https://json-schema.org/), where each argument is a `property`.

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

The property names need to match the arguments declared by the main function, in
our example `your_name` and `your_nickname`. There is a lot you can do with
[arguments, types, and validation](#jsonschema), but to keep it short:

- Arguments can specify a type `string`, `number` or `object`. User input will
  be validated against that type.
- Arguments can be made mandatory by adding them to the "required" list. In that
  case, the generated UI will check that user input provides required arguments.
- Each argument can have a description field, that will appear in the generated
  UI.

To make `your_name` required:

```json
{
	...
	"required": ["your_name"]
}
```

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

client = wmill.Client()

...

def main(...):
  client.get_resource('my_resource_path')
  client.run_script_sync(...)
```

The full API of the Python client is available in its [dedicated page](/python)

### Script execution environment

Scripts have no executions environment attached to them but script **runs** have
a [pipenv](#pipenv) attached to them.

### Webhook

Every script can be run by its hash or path as an http request aka as "Webhook",
as described by the corresponding [OpenApi](https://swagger.io/specification/)
definitions of
[run script by hash](https://docs.windmill.dev/openapi/run-script-by-hash) and
[run script by path](https://docs.windmill.dev/openapi/run-script-by-path). The
webhook is also listed in the script description. The input of the script can be
sent as the JSON payload of the HTTP POST request, where every key/value pair of
the JSON object is one parameter of the `main` function.

## Python version and dependencies

### pipenv

Windmill is centered around the execution of python scripts. To provide
reproducible and consistent environments, [workers](#worker) regularly sync with
the latest available pipenv lockfile available. This pipenv file lock is
generated as a standard install [job](#job) once the job is able to complete
successfully (it will not if the pipenv is ill-specified). That pipenv job can
only be created and specified by super-administrators because they impact all
the jobs run on every workers and every workspace. The python version is also
settable in the pipenv file. For more information about the pipenv project and
its specification, see its [documentation](https://pipenv.pypa.io/en/latest/)

Any users can see all the pipenv locks of every pipenv in the Python env page.

### Firecracker

Currently, the scripts are run as simple UNIX forks but coming soon, they will
be run jailed inside
[firecracker micro-VMs](https://firecracker-microvm.github.io/)

## Variable

Variables are string values which have a [path](#path) and name derived from
their path.

All variables (not just secrets) are encrypted with a workspace specific
symmetric key to avoid leakage.

Those variables are set as environment variables at execution, and can be
accessed with

```python
os.environ['<VAR_NAME>'])
os.environ.get('<VAR_NAME'>)
```

There are two types of environment variables in Windmill.

### User-defined variable

Users can define variables from the variable tab on the left. Variables are
uniquely identified by a path, composed of an [ownership path prefix](#owner).
Full qualified paths have the following pattern: `u/<username>/<script-name>`
for private scripts, or `g/<group>/<script-name>` for scripts owned by
[groups](#group).

Variables are set in the execution environment with a name obtained by replacing
`/` with `_` in the variable's path, for example `user/myuser/var` is set as:

```python
os.environ['USER_MYUSER_VAR'])
os.environ.get('U_MYUSER_VAR')
```

#### Secret variable

User defined variables can be set as **Secret variables**. Once set, secret
variables cannot be viewed from the dashboard, making sure no accidental leakage
is possible. Note that a script could still print out a secret variable. While
this is possible, a malicious user cannot leak a secret variable discretely as
every version of any scripts is stored forever with its hash, and both the edit
and the execution would be visible from the [audit logs](#audit-log).

### Reserved variable

Reserved variables are utility variables maintained by windmill. Their names are
reserved. Reserved variables are visible on the Variables page, and include:

| Name        | Value                                                                                                               |
| ----------- | ------------------------------------------------------------------------------------------------------------------- |
| WM_TOKEN    | Token ephemeral to the current script with equal permission to the permission of the run (Usable as a bearer token) |
| WM_EMAIL    | Email of the user that executed the current script                                                                  |
| WM_USERNAME | Username of the user that executed the current script                                                               |
| WM_JOB_ID   | Job id of the current script                                                                                        |

## Resource

A resource is similar to a [variable](#variable) in that it stores a
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
$VAR:VARIABLE_NAME
```

for instance:

```json
{
  "simple": "$VAR:U_MYUSER_MYVARIABLE"
}
```

This is most useful when dealing with sensitive values that should be treated as
secrets.

### Resource type

Resource types have a name and a [jsonschema](#jsonschema) value. A resource is
constrained by its resource type. An example of a resource type is for instance
a postgres connection, shortened as "postgres' and whose value is:

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

## Group

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

### The 'all' group

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

### Anonymous

An user that is not currently signed in is associated the global user with
username "anonymous". Anonymous can be given permissions which is equivalent to
making an entity public. It is possible to disable execution of scripts by
anonymous as a workspace setting.

## Audit log

Every operation and actions that have side-effects (so every action except
getting or listing entities) have a log attached to them which contains the user
at the origin of the operation and some metadata specific to the kind of
operation. Every kind of audit log have a hierarchical operation name attached
to them. Admins of a workspace can see the audit logs of every users of a
[workspace](#workspace). Simple users can only see their own audit logs. Audit
logs have different retention policy depending on the plan your team is on.

## Jsonschema

Below is a simplified spec of jsonschema. See
[here for its fullspec](https://json-schema.org/). Windmill is compatible with
the [2020-12 version](https://json-schema.org/draft/2020-12/schema). It is not
compatible with its most advanced features yet.

Jsonschemas in their simplest form use this format:

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "properties": {...},
  "required": [...]
}
```

where `properties` contains a dictionary of arguments, and `required` a list of
all mandatory arguments.

#### `properties`

Each property is an argument. It can specify:

- **type** in `string`, `number`, `object` (default to `string`). The type
  "object" is the equivalent in python of a dict with string keys that accept
  all acceptable argument types as values.
- **description**
- **pattern** a
  [valid regex](https://json-schema.org/understanding-json-schema/reference/regular_expressions.html)
  pattern against which the argument will be validated

```json
{
  "argument_name": {
    "type": "",
    "description": "",
    "pattern": ""
  }
}
```
