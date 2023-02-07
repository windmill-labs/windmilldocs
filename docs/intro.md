# Introduction

All code is not made equal and can be split in 2 categories:

- **Code that matters**: high-value code containing your business logic, data
  transformation, internal API calls, and all the logic of your internal
  long-running services and workflows. This is the crux of the value-added of
  your engineering. Usually that code is prototyped and started under the form
  of scripts and SQL files, until it is turned at great expense into
  micro-services and hard to maintain custom internal tools.
- **Boilerplate**: All the rest is boilerplate, be it UI and frontends that
  allow you to call the code above, api calls to external services, error
  handling, retries, logic to make your code scalable, dependency management,
  CI/CD, managing secrets, schedule, permissions, authentification, etc, etc.
  That code is boilerplate because it _feels_ like you shouldn't have to
  reinvent the wheel, over and over again.

Many services labels themselves as **no-code** or **low-code**, and they address
indeed the challenge of getting rid of the boilerplate and provide a
comprehensive platform accessible to all members of a diverse organization not
made solely of engineers. However, we believe they lack the full power and
flexibility of code as they either hide it completely, or only allow it under
restricted forms.

Windmill is different, it allows building production internal tools through code
much faster without sacrificing reliability, scalability, performance,
flexibility, or control. It empowers semi-technical users to access and edit
that code without being overwhelmed by the usual barrier of entry (git, IDE,
local environments, secrets managements, etc), and it is compatible with
senior/staff software engineers high standards for production-grade yet flexible
yet customizable with code.

Windmill embeds:

- A blazingly fast runtime to run code in Python/TypeScript/Go/Bash/SQL from a
  self-managed job queue, at scale, with any dependencies, with no overhead, and
  minimal cold start.
- A parser that will infer the dependencies and arguments from the code itself
  and generate **lockfiles** and **input specs**.
  - The **lockfile** allows the script being deployed to maintain exactly the
    same set of versioned dependencies forever
  - An input spec (which is actually a JSON schema) used to generate a minimal
    UI automatically for both using the script as a standalone or as a step of a
    flow
- A powerful _web IDE_ to write scripts with autocompletion and syntax checking
- A low-code builder and **workflow engine** to build and run complex flows by
  composing custom scripts and generic scripts shared on
  [Windmill Hub](https://hub.windmill.dev). Those flows can, among others, do:
  - **retries** with fixed and exponential backoff
  - **error handling**
  - **for loops** over list triggering one flow per item
  - **branching** to one subflow given a predicate or all sub-flows
  - be **suspended** with its state preserved without consuming any resources to
    sleep for a pre-determined amount of time or waiting to be reactivated by an
    external webhook who may contain payloads
  - **approval steps** leveraging being suspended and reactivated at some secret
    urls known only by the approvers
- A low-code UI builder build complex admin panels and dashboard using inline
  scripts in Python/TypeScript/Go/Bash/SQL or trigger the scripts and flows of
  the workspace
- An enterprise-grade platform with tight permissioning, secret management,
  groups and folders enabling RBAC permissions, OAuth handling for fetching and
  refreshing credentials
- **Webhooks** for every scripts and flows to be triggered externally and an
  open api to be easily embedded into your current infrastructure
- A scheduler to trigger script and flows. Combined with state storage, it can
  be used to watch for external events (triggering a flow only if the external
  state is different from the last stored state)
- A **CLI** and GitHub Actions for **GitHub** and local based developement and
  code management

### Use cases

Examples of what can be built with Windmill include:

- Turns your scripts into internal apps that you can easily share. It's common
  for engineers to piece together scripts to automate repetitive tasks for a
  non-technical user (sales, ops, customer support, customer success, etc).
- ETL done entirely within Windmill
- Trigger ETL in other services and react to their status changes
- Template-based SQL queries with fine grain permissions and wait-for-approval
  steps: create, ban, delete users, modify their licences, etc.
- Automated triggers for events (new email, new message on Discord, a HackerNews
  message matching a given pattern, a new row in a database, a Google Sheet,
  etc.)
- Onboarding automation that requires setting up multiple systems, including the
  production site and third-party SaaS services
- Migration service to move data from and to CRMs and marketing systems

### What pain points are immediately solved

- There's no agreed upon way to run scripts
- Building even minimal UIs for script is time consuming
- Many issues arise along the way that are painful to solve (permissions,
  collaboration, audit logs, secrets, deployment)
- Running scripts on a production-grade infra that is cost-efficient, reliable
  and easily monitorable takes a lot of time to do right

**Windmill solves those problems**, and makes sure that scripts become widely
useful tools. The central tenet is: make building automation fast and easy, and
everybody will automate repetitive tasks and save a lot of time.

### Honorable mentions

Windmill is not the only framework out there, but it is the only one to provide
this comprehensive set of feature and to be fully open-source at the same time.
Some other very interesting frameworks that Windmill shares overlap with:

- Temporal and Airflow for the workflow engine, both open-source. They are both
  heavily code-based, have no low-code builders for the flows, are complex to
  set up and operate, and do not allow to share scripts easily or build UIs.
- Retool for building admin panels, and its other open-source alternatives:
  Tooljet, Appsmith
- Airplane and Superblocks, comparable set of features, but not open-source nor
  self-hostable, limited workflow engines, not made for scalability and no open
  apis.
