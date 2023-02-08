# Introduction

All code is not made equal and can be split in 2 categories:

- **Code that matters**: high-value code containing your business logic, data transformation, internal API calls, and all the logic of your internal long-running services and workflows. This is the crux of the value-added of your engineering. Usually that code is prototyped and started under the form of scripts and SQL files, until it is turned at great expense into micro-services and hard to maintain custom internal tools.
- **Boilerplate**: all the rest is boilerplate, be it UI and frontends that allow you to call the code above, api calls to external services, error handling, retries, logic to make your code scalable, dependency management, CI/CD, managing secrets, schedule, permissions, authentification, etc. That code is boilerplate because it *feels* like you shouldn't have to reinvent the wheel, over and over again.

Many services labels themselves as **no-code** or **low-code**, and they address indeed the challenge of getting rid of the boilerplate and provide a comprehensive platform accessible to all members of a diverse organization not made solely of engineers. However, **we believe they lack the full power and flexibility of code** as they either hide it completely, or only allow it under restricted forms.

Windmill is different:
- it allows building **internal tools through code** much faster, without sacrificing on one side visibility and intuitivity and on the other side, control, reliability, performance, flexibility and scalability
- it **empowers semi-technical users** to access and edit that code without being overwhelmed by the usual barriers to entry (git, IDE, local environments, secrets managements, etc.)
- it is compatible with senior/staff software engineers **high standards** for a devtool.

Windmill embeds:
- a blazingly **fast runtime** to run code in Python/Typescript/Go/Bash/SQL from a self-managed job queue, at scale, with any dependencies, with no overhead, and minimal cold start
- a **parser** that will infer the dependencies and arguments from the code itself and generate **lockfiles** and **input specs**
  - the _lockfile_ allows the script being deployed to maintain exactly the same set of versioned dependencies forever
  - an input spec (which is actually a JSON schema) used to generate a minimal UI automatically for both using the script as a standalone or as a step of a flow
- an **auto-generated UI** for every scripts thanks to the input spec mentionned above
- a powerful **web IDE** to write scripts with autocompletion and syntax checking
- a **low-code builder and workflow engine** to build and run complex flows by composing custom scripts and generic scripts shared on the [Hub](https://hub.windmill.dev). Those flows can, among others, do:
  - _retries_ with fixed and exponential backoff
  - _error handling_
  - _for loops_ over list triggering one flow per item
  - _branching_ to one subflow given a predicate or all sub-flows
  - _be suspended_ with its state preserved without consuming any resources to sleep for a pre-determined amount of time or waiting to be reactivated by an external webhook who may contain payloads
  - _approval steps_ leveraging being suspended and reactivated at some secret urls known only by the approvers
- a **low-code UI builder** build complex admin panels and dashboard using inline scripts in Python/Typescript/Go/Bash/Sql or trigger the scripts and flows of the workspace
- an **enterprise-grade platform** with tight permissioning, secret management, groups and folders enabling RBAC permissions, OAuth handling for fetching and refreshing credentials
- **webhooks** for every scripts and flows to be triggered externally and an open api to be easily embedded into your current infrastructure
- a **scheduler** to trigger script and flows. Combined with state storage, it can be used to watch for external events (triggering a flow only if the external state is different from the last stored state)
- a **CLI** and github actions for _github_ and local based developement and code management.

On top of a splendid community and a responsive support team to attend you in your journey.

### Use cases

Examples of what can be built with Windmill include:

- turns your scripts into internal apps that you can easily share It's common for engineers to hack together
scripts to automate repetitive tasks for a non-technical user (sales, ops,
customer support, customer success, etc.)
- ETL done entirely within windmill
- trigger ETL in other services and react to their status changes
- template-based SQL queries with fine grain permissions and wait-for-approval
  steps: create, ban, delete users, modify their licences, etc.
- automated triggers for events (new email, new message in Discord,
  a HackerNews message matching a given pattern, a new row in a 
  database, a google sheet, etc.)
- onboarding automation that requires setting up multiple systems,
  including the production site and third-party SaaS services
- migration service to move data from and to CRMs and marketing systems

You'll find plenty of other examples and inspirations from the [Hub](https://hub.windmill.dev) or on our [Blog](https://docs.windmill.dev/blog/).


### What pain points are immediately solved

- there's **no agreed upon way** to run scripts
- building even minimal UIs for script is **time consuming**
- many issues arise along the way that are **painful to solve** (permissions,
  collaboration, audit logs, secrets, deployment)
- running scripts on a production-grade infra that is cost-efficient, 
  reliable and easily monitorable takes a lot of **skills and time to do right**.

**Windmill solves those problems**, and makes sure that scripts become widely
useful tools. The central tenet is: _make building automation fast and easy, and
everybody will automate repetitive tasks and save a lot of time_.

### Honorable mentions

**Windmill is not the only framework out there**, but it is the only one to provide this comprehensive set of feature and to be fully open-source at the same time. Some other very interesting frameworks that Windmill shares overlap with:
- _Temporal_ and _Airflow_ for the workflow engine, both open-source. They are both **heavily code-based**, have **no low-code builders** for the flows, are **complex** to set up and operate, and **do not allow to share scripts** easily or **build UIs**.
- _Retool_ for building **admin panels**, and its other open-source alternatives: _Tooljet_, _Appsmith_.
- _Airplane_ and _Superblocks_, comparable set of features, but **not open-source nor self-hostable**, limited workflow engines, **not made for scalability** and no open apis.
