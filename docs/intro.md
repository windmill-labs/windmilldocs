# Introduction

Windmill turns your scripts into internal apps and composable steps of flows
that automate repetitive workflows. It's common for engineers to hack together
scripts to automate repetitive tasks for a non-technical user (sales, ops,
customer support, customer success, etc).

### Use cases

Examples of what can be built with Windmill include:

- small to medium size data pipelines to augment datasets from multiple sources
- trigger ETL in other services and react to their status changes
- template-based SQL queries with fine grain permissions and wait-for-approval
  steps: create, ban, delete users, modify their licences, etc.
- automated triggers for events (new email, new message in Discord,
  a HackerNews message matching a given pattern, a new row in a 
  database, a google sheet, etc)
- onboarding automation that requires setting up multiple systems,
  including the production site and third-party SaaS services
- migration service to move data from and to CRMs and marketing systems

### What you need

Scripts and code is a great way to solve those use-cases. However, the
difficulty comes from using those scripts to:

- self-serve shareable apps for the rest of the teams with an intuitive UI
- production-grade workflows with execution history, that always work and
  that are easy to maintain and to iterate over. 
  
Those pipelines are triggered by webhooks to react to events, or schedule 
themselves to poll for new changes.

### Why it's hard

Usually, that doesn't happen because:

- there's no agreed upon way to run those scripts
- building a UI for scripts and flows is time consuming
- many issues arise along the way that are painful to solve (permissions,
  collaboration, audit logs, secrets, deployment)
- running scripts on a production-grade infra that is cost-efficient and
  reliable takes a lot of time to do right

**Windmill solves those problems**, and makes sure that scripts become widely
useful tools. The central tenet is: make building automation fast and easy, and
everybody will automate repetitive tasks and save a lot of time.
