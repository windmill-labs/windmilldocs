# S3 Distributed Dependency Cache

Workers cache aggressively the dependencies (and each version of them since every script has its own lockfile with a specific version for each dependency) so they are never pulled nor installed twice on the same worker. However, with a bigger cluster, for each script, the likelihood of being seen by a worker for the first time increases (and the cache hit ratio decreases). However, you may have noticed that our multi-tenant [cloud solution](https://app.windmill.dev) runs as if most dependencies were cached all the time, even though we have hundreds of workers on there. The secret sauce is a global cache backed by s3.

There are 3 mechanisms involved in the global dependency cache:

## Global Python Dependency Cache

The first time a dependency is seen by a worker, if it is not cached locally, the worker search in the bucket if that specific `name==version` is there:

1. If it is not, install the dependency from pypi, then do a snapshot of installed dependency, tar it and push it to s3 (we call this a "piptar")
2. If it is, simply pull the "piptar" and extract it in place of installing from pypi. It is much faster than installing from pypi because that s3 is much closer to your workers than pypi and because there is no installation step to be done, a simple tar extract is sufficient which takes no compute.

## Local Cache Syncing

In the background, the entire worker cache is synced so that most dependencies get propagated over time to all workers.

## Entire Local Cache snapshotting

Another mechanism of the s3 distributed cache is the snapshotting of the entire cache as a single tar. This tar is created approximately every day by one of the worker (at random). This snapshot is then pulled at start of any worker. It enables workers to start with all the dependencies installed. Is it faster than pulling the list of all dependencies because it is much faster to pull one big object from s3 than many small ones (around 30s). The workers then start processing jobs with an "hot" cache.
