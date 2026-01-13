# Job debouncing

When job debouncing is enabled, started jobs are scheduled for a specified future time. If another job with the same debounce key is queued within this duration, it will "debounce" the previous job by canceling it.

Job debouncing is a [Cloud plans and Pro Enterprise Self-Hosted](/pricing) only feature.

It is available for scripts and flows and can be set from the Settings menu. It also operates globally and involves several configuration fields:

## Configuration fields

### Debounce delay in seconds

The time window in seconds for debouncing. If not set, the job will not debounce existing jobs and will not be cancelled by any other job.

### Custom debounce key

Optional field to create debounce keys that are not bound to path and arguments. If not set, the default debounce key is used, which is composed of workspace ID, runnable path, and argument values passed to it.

Debouncing keys are global, you can have them be workspace specific using the variable `$workspace`. You can also use an argument's value using `$args[name_of_arg]`.

### Max total debouncing time

How long (in seconds) a job can be debounced by the same key. If exceeded, new jobs with the same key will not debounce existing jobs and let them execute, while still scheduling themselves for future execution.

### Max total debounces amount

Same as previous one, but counts debounces instead of time.

### Debounce args to accumulate

This field allows you to consolidate arguments across debounced jobs. If one of your main function arguments takes an array of any type, you can specify this argument in this parameter. This will exclude it from the default debounce key and when the job executes, it will concatenate all values of the specified argument from previous jobs related to this debouncing period.

