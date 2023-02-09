# Introduction

All code is not made equal and can be split in 2 categories:

- **Code that matters**: high-value code containing your business logic, data
  transformation, internal API calls, and all the logic of your internal
  long-running services and workflows. This is the crux of the value-added of
  your engineering. Usually that code is prototyped and started under the form
  of scripts and SQL files, until it is turned at great expense into
  micro-services and hard to maintain custom internal tools.
- **Boilerplate**: all the rest is boilerplate, be it UI and frontends that
  allow you to call the code above, api calls to external services, error
  handling, retries, logic to make your code scalable, dependency management,
  CI/CD, managing secrets, schedule, permissions, authentification, etc.
  That code is boilerplate because it _feels_ like you shouldn't have to
  reinvent the wheel, over and over again.

Many services labels themselves as **no-code** or **low-code**, and they address
indeed the challenge of getting rid of the boilerplate and provide a
comprehensive platform accessible to all members of a diverse organization not
made solely of engineers. However, **we believe they lack the full power and
flexibility of code** as they either hide it completely, or only allow it under
restricted forms.

Windmill is different:
- it allows building **internal tools through code** much faster, without sacrificing on one side
visibility and intuitivity and on the other side, control, reliability, performance, flexibility and scalability
- it **empowers semi-technical users** to access and edit that code without being overwhelmed
by the usual barriers to entry (git, IDE, local environments, secrets managements, etc.)
- it is compatible with senior/staff software engineers **high standards for production-grade** yet flexible
yet customizable with code.

Windmill embeds:

- a **super fast runtime** to run code in
  [TypeScript](./getting_started/0_scripts_quickstart/1_typescript_quickstart/index.md),
  [Python](./getting_started/0_scripts_quickstart/2_python_quickstart/index.md),
  [Go](./getting_started/0_scripts_quickstart/3_go_quickstart/index.md),
  [Bash](./getting_started/0_scripts_quickstart/4_bash_quickstart/index.md) and
  even [SQL](./getting_started/0_scripts_quickstart/5_sql_quickstart/index.md)
  from a self-managed job queue, at scale, with any dependency, no overhead, and
  minimal cold start
- a **parser that will infer the dependencies and arguments** from the code itself
  and generate **lockfiles** and **input specs**
  - the _lockfile_ allows the script being deployed to maintain exactly the
    same set of versioned dependencies forever
  - the in _input spec_ (which is actually a JSON schema) is used to generate a minimal
    UI automatically for both using the script as a standalone compute or as a
    step of a Flow
- a powerful **web IDE** to write Scripts with autocompletion and syntax checking
- a **low-code builder and workflow engine** to build and run complex
  [Flows](./getting_started/6_flows_quickstart/index.md) by composing your
  custom scripts and generic scripts shared on
  [Windmill Hub](https://hub.windmill.dev). Flows can, among others, do:
  - **retries** with fixed and exponential backoff
  - **error handling**
  - **for loops** over list triggering one flow per item
  - **branching** to one subflow given a predicate or all sub-flows
  - be **suspended** with its state preserved without consuming any resources to
    sleep for a pre-determined amount of time or waiting to be reactivated by an
    external webhook who may contain payloads
  - **approval steps** leveraging being suspended and reactivated at some secret
    urls known only by the approvers
- a [low-code UI builder](./getting_started/7_apps_quickstart/index.md) to build
  complex admin panels and dashboards using inline scripts in TypeScript,
  Python, Go, Bash and SQL or trigger the Scripts and Flows of the workspace
- an **enterprise-grade platform** with tight permissioning, secret management,
  groups and folders enabling
  [RBAC permissions](./reference/index.md#permissions-and-acl),
  [OAuth handling](./advanced/2_setup_oauth/index.md) for fetching and
  refreshing credentials
- [webhooks](./core_concepts/4_webhooks/index.md) for every scripts and flows to
  be triggered externally and an open api to be easily embedded into your
  current infrastructure
- a [scheduler](./core_concepts/5_schedules/index.md) to trigger Scripts and
  Flows. Combined with state storage, it can be used to watch for external
  events - for example triggering a Flow only if the external state is different
  from the one stored previously
- a [CLI](https://github.com/windmill-labs/windmill/tree/main/cli) and GitHub
  Actions for **GitHub** and local based developement and code management.

On top of all these, you'll get a splendid community and a responsive support
team to attend you in your journey.

### Use cases

Examples of what can be built with Windmill include:

- Turns your scripts into internal apps that you can easily share. It's common
  for engineers to piece together scripts to automate repetitive tasks for a
  non-technical user (sales, ops, customer support, customer success, etc).
- ETL done entirely within Windmill.
- Trigger ETL in other services and react to their status changes.
- Template-based SQL queries with fine grain permissions and wait-for-approval
  steps: create, ban, delete users, modify their licences, etc.
- Automated triggers for events (new email, new message on Discord, a HackerNews
  message matching a given pattern, a new row in a database, a Google Sheet,
  etc.)
- Onboarding automation that requires setting up multiple systems, including the
  production site and third-party SaaS services.
- Migration service to move data from and to CRMs and marketing systems.

You can find plenty of examples and inspirations on the
[Hub](https://hub.windmill.dev) or on our [Blog](/blog).

### What pain points are immediately solved

- There's **no agreed upon way** to run scripts.
- Building even minimal UIs for script is **time consuming**.
- Many issues arise along the way that are **painful to solve** (permissions,
  collaboration, audit logs, secrets, deployment).
- Running scripts on a production-grade infra that is cost-efficient, reliable
  and easily monitorable takes a lot of **skill and time to do right**.

**Windmill solves those problems**, and makes sure that scripts become widely
useful tools. The central tenet is: _make building automation fast and easy, and
everybody will automate repetitive tasks and save a lot of time_.

### Honorable mentions

**Windmill is not the only framework out there**, but it is the only one to
provide this comprehensive set of feature and to be fully open-source at the
same time. Some other very interesting frameworks that Windmill shares overlap
with:

- _Temporal_ and _Airflow_ for the workflow engine, both open-source. They are
  both **heavily code-based**, have **no low-code builders** for the flows, are
  **complex to set up** and operate, and do not allow to share scripts easily or
  build UIs.
- _Retool_ for building **admin panels**, and its other open-source alternatives:
  _Tooljet_, _Appsmith_.
- _Airplane_ and _Superblocks_ have comparable set of features, but **not
  open-source nor self-hostable**, **limited workflow** engines, **not made for
  scalability** and have **no open APIs**.
