# Introduction

Windmill turns your scripts into internal apps and composable steps of flows
that automate repetitive workflows. It's common for engineers to hack together
scripts to automate repetitive tasks for a non-technical user (sales, ops,
customer support, customer success, etc).

### Use cases

Examples of what

- building small to medium size data pipelines that need to augment their data
  from data in multiple services
- trigger ETL in other services and react to their status changes
- creating users, resetting user licenses, more generally doing database edit
  with templatized sql queries, and getting approval before doing any sensitive
  operations on the database directly.
- reacting to new events from an external service (new email, new message in
  Discord, an HackerNews message matching a given pattern, a new row in a
  database or a google sheet)
- customer or teammate onboarding that requires setting up multiple systems,
  including the production site and third-party SaaS services
- moving data to and from CRMs and marketing systems

### What you need

Scripts and code is a great way to solve those use-cases. However, the
difficulty come from using those scripts as:

- self-serve shareable apps for the rest of the teams with an intuitive UI
- production-grade workflows that always work and that are easy to maintain,
  iterate and observe the pasts runs of. Those pipelines are triggered by
  webhooks to react to events, or schedule themselves to poll for new changes.

### Why it's hard

Usually, that doesn't happen because:

- there's no agreed upon way to run those scripts
- building a UI for scripts and flows is time consuming
- many issues arise along the way that are painful to solve (permissions,
  collaboration, audit logs, secrets, deployment)
- running scripts on a production-grade infra that is cost-efficient and
  reliable takes a lot of time to do right

Windmill solves those problems, and makes sure that scripts become widely useful
tools. The central tenet is: make building automation fast and easy, and
everybody will automate repetitive tasks and save a lot of time.
