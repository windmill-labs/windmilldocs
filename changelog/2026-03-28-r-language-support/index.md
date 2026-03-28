---
slug: r-language-support
title: R language support
tags: ['R', 'Script editor']
description: Windmill now supports R scripts with automatic CRAN package dependency management.
image: ./r-editor.png
features:
  [
    'Write your Windmill script in R.',
    'Automatic dependency detection from library() and require() calls.',
    'CRAN package version resolution with lockfile caching.',
    'Built-in helpers for accessing Windmill variables and resources.',
    'Full sandboxing support with NSJail.',
  ]
docs: /docs/getting_started/scripts_quickstart/r
---

Windmill now supports R as a first-class scripting language. R scripts use the `main <- function(...)` syntax, enabling Windmill to parse argument signatures and generate auto-generated UIs.

## Getting started

```r
library(httr)
library(jsonlite)

main <- function(url = "https://httpbin.org/get", message = "Hello!") {
  response <- GET(url, query = list(message = message))

  list(
    status = status_code(response),
    body = content(response, as = "parsed")
  )
}
```

## Dependency management

Dependencies are automatically detected from `library()` and `require()` calls. Windmill resolves versions from CRAN, caches lockfiles (3-day TTL), and installs packages to a shared cache directory for fast startup.

## Accessing Windmill resources

Use built-in helper functions to access variables and resources:

```r
main <- function() {
  secret <- get_variable("f/examples/secret")
  db <- get_resource("f/examples/postgres")

  list(secret = secret, host = db$host)
}
```
