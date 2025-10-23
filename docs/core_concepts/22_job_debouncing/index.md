# Job debouncing

Job debouncing prevents redundant job executions by canceling pending jobs with identical characteristics when new ones are submitted within a specified time window. This feature helps optimize resource usage and prevents unnecessary duplicate computations.

Job debouncing is a [Cloud plans and Pro Enterprise Self-Hosted](/pricing) only.

Debouncing can be set from the Settings menu. When jobs with matching characteristics are submitted within the debounce window, pending jobs are automatically canceled in favor of the newest one.

The Job debouncing operates globally and across flow runs. It involves two key parameters:

## Debounce delay in seconds

Set in seconds, the time window defines the period during which duplicate jobs are canceled. When a new job arrives within this window with matching characteristics, any pending jobs are canceled.

## Custom debounce key

This parameter is optional. Debounce keys are global, you can have them be workspace specific using the variable `$workspace`. You can also use an argument's value using `$args[name_of_arg]`.

## Dependency jobs

For dependency jobs, debouncing is enabled by default. This prevents redundant dependency computations when multiple jobs require the same dependencies.

## Job debouncing in Script & Flows

### Job debouncing of a script

[Job debouncing of a script](../../script_editor/settings.mdx#debouncing) can be set from the [Settings](../../script_editor/settings.mdx) menu. Pick "Runtime" and then "Debouncing" and define a time window and optionally a custom debounce key.

### Job debouncing of a flow

From the Flow Settings Advanced menu, pick "Debouncing" and define a time window and optionally a custom debounce key.
