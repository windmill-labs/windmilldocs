---
title: "OpenFlow"
---

# OpenFlow Spec

OpenFlow is an **open standard** for defining "Flows". Flows are **directed
graphs** - directed acyclic graphs to be exact - in which every node represents
a step of computation. In other words, it is a declarative model for chaining
scripts.

Windmill is the open-source **reference implementation** for it, providing a UI
to build Flows and highly scalable executors. However, everyone is welcome to
build upon it and to develop new UIs that target OpenFlow, or create new
executors.

Flows can be shared and showcased on
[Windmill Hub](https://hub.windmill.dev/flows). To see an example of an OpenFlow
in practice, go to the Hub and pick a Flow (e.g
[Whenever an HN message contains a mention, publish it to Slack](https://hub.windmill.dev/flows/13/whenever-an-hn-message-contains-a-mention%2C-publish-it-to-slack)),
then select the JSON tab to see it's specification.

## OpenFlow

We provide an OpenAPI/Swagger definition file for the spec, it is hosted within
the GitHub repository
[here.](https://github.com/windmill-labs/windmill/blob/main/openflow.openapi.yaml)

We will use a TypeScript equivalent of the OpenAPI definition for ease of
readability throughout the rest of this document.

OpenFlow is portable and its root object is defined as follows:

```typescript
type OpenFlow = {
  // an optional one-liner summary-line
  summary?: string;

  // optional description
  description?: string;

  // the actual logic of the flow
  value: FlowValue;

  // the input spec of the flow as defined by a json schema
  schema?: any;
};
```

It contains a short line summary, a description, a schema which is the JSON
Schema that constraints the JSON it takes as an input and the FlowValue type is
where the logic of the Flow is actually defined.

### FlowValue

```typescript
type FlowValue = {
  // a sequence of modules, some of which are containers
  // for other modules, like a for-loop or a branch
  modules: FlowModule[];

  // the error handler to call in case of an unrecoverable error
  failure_module?: FlowModule;

  // force this flow to be executed entirely on the same worker
  // and share a mounted folder to pass heavy data
  same_worker: boolean;
};
```

A Flow is just a sequence of modules, and an optional failure module that will
be triggered to handle a failure at any point of the Flow. Think `try/catch` in
terms of programming languages. See an example of modules represented in a graph
below - this visualisation is built-in on the Windmill Flow editor.

![Flow Modules](./modules_graph.png)

### FlowModule

An OpenFlow module is defined as follows:

```typescript
type FlowModule = {

  // a module can be one of many kinds, see below for more details
  value: Identity | RawScript | PathScript | ForloopFlow | BranchOne | BranchAll ;

  // an optional summary line
  summary?: string;

  // stop the flow at this step if condition is met
  stop_after_if?: { expr: string; skip_if_stopped: boolean };

  // sleep for a static or dynamic number of seconds
  sleep?: StaticTransform | JavascriptTransform

  // suspend the flow until it is resumed by receiving a certain number of events before a timeout
  suspend?: { required_events?: integer, timeout: integer };
  
  // number of times to retry this module before passing it to the error handler
  retry?: Retry
};

type RawScript = {
  input_transforms: Record<string, StaticTransform | JavascriptTransform>;
  content: string;
  language: "deno" | "python3";
  path?: string;
};

type PathScript = {
  input_transforms: Record<string, StaticTransform | JavascriptTransform>;
  path: string;
};

type ForloopFlow = {
  modules: FlowModule[];
  iterator: InputTransform;
  skip_failures?: boolean;
};

type BranchOne = {
  default: FlowModule[];
  branches: Array<{
    summary?: string;
    expr: string;
    modules: FlowModule[];
  }>;
};

type BranchAll = {
  default: FlowModule[];
  branches: Array<{
    summary?: string;
    skip_failure: boolean;
    modules: FlowModule[];
  }>;
};

type StaticTransform = {
  value: any;
};

type JavascriptTransform = {
  expr: string;
};

type Retry {
  constant?: {
    attempts: integer;
    seconds: integer;
  };
  exponential?: {
    attempts: integer;
    multiplier: integer;
    seconds: integer;
  };
}
```

### FlowModule Value

The `value` field of the `FlowModule` type can be one of these 6 kinds:

- `identity`: The most simple one, it passes its input as output. Useful for
  debugging.
- `rawscript`: Embed a full TypeScript/Python/Go/Bash/SQL Script inside the
  Flow. Useful for custom logic and ad-hoc scripts.
- `script`: A reference to a Script by its path (including a path to the Hub
  using the `hub/` prefix)
- `forloopflow`: Run a for-loop, which iterates over an iterator - a list in
  general - that is constructed by evaluating the javascript expression in:
  `iterator`. The result of this module is the results of the iterations
  collected as a list.
- `branchone`: Run exactly one branch out of many, based on a predicate.
  Predicates are evaluated in-order and the first one that matches, gets to run.
  In case none matches, the default branch is run. The result of this module is
  the result of the branch that was run.
- `branchall`: Run many branches with all their modules. Every branch is being
  evaluated in-order. One can decide to skip failure of a particular branch. The
  result of this module is the results of the branches collected as a list.

### Input transforms

`RawScript` and `PathScript` modules contain `input_transforms`, which is a
mapping between fields (i.e. input of the module) to either a static JSON value,
or a raw JavaScript expression.

The `input_transforms` is the way to do the piping from any other previous
steps, variable, or resources to one of the inputs of your script/module. Since
it is actual JavaScript (although a restricted JavaScript, for example, fetch is
limited to getting secrets and variables), it is very flexible.

One interesting pattern that this allows is that you can compose complex strings
directly, so you could imagine composing your email body or SQL query using
string interpolation and populating it with previous results. The Windmill
Editor makes it very easy to do so, using the properties picker:

![Prop picker](./prop_picker.png)

### Conditional stop after

There's also the `stop_after_if` optional object

```typescript
type stop_after_if = {
  expr: string;
  skip_if_stopped: boolean;
  suspend?: integer;
};
```

If present:

- `stop_after_if.expr`: Evaluate a JavaScript expression that takes the result
  as an input to decide if the Flow should stop there. Useful to stop a Flow
  that is meant to watch for changes if there are no changes.
- `stop_after_if.skip_if_stopped`: Used to flag failed runs as skippable. It is
  useful in the context of Flows being triggered very often to watch for changes
  as you might want to ignore the runs that have been skipped.
- `suspend` _(optional)_: A non-negative integer that determines the number of
  events (resume messages) needed to progress to the next step in the Flow. This
  is useful for inserting user inputs during the execution of a Flow, such as
  approving (resum) or disapproving (cancel) a Flow.

Resume messages are sent to
`https://app.windmill.dev/w/<WORKSPACE>/jobs/resume/<JOB_ID>` as POST or GET
requests. Requests must have JSON payload, either as the request body (with
`Content-Type: application/json` header) for POST requests, or as the value to
the `payload` query parameter as a **base64url** encoded JSON value
(`?payload=${base64url_encoded_json}`) for GET requests.

When enough resume messages are received, the next job starts with its
`input_transforms` evaluated with two notable variables in scope:

- `resume`: The payload from the most recent resume message.
- `resumes`: A list of payloads from all resume messages in the order they were
  received - most recent at the end of the list.

Alternatively, a job can be immediately cancelled by a request to a similar
endpoint at `../jobs/cancel/..`. In this case, the Flow will quit, with the
cancellation payload as the result and without retrying or running further steps
or the failure modules.

### Retries

`Retry` sets the retry policy for the Flow. It is optional and is reset on every
successful run:

- `constant`: Retry `attempts` times with `seconds` delay after each try.
- `exponential`: Applies the **exponential backoff** strategy to the retries -
  meaning the delay will be multiplied after each unsuccessful attempt. If all
  the retries are exhausted, the failure module - if any - is called.

Et voilà, we have completed our tour of OpenFlow.
