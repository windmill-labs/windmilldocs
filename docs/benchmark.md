# Benchmark

## TL;DR: about same performance than AWS Lambda for heavier workloads, slower cold starts for medium compute

Tested with apache bench. If we did it wrong, let us know. AWS Lambda was
pre-warmed with 5000 requests to avoid unfair cold starts. AWS Lambda uses
firecracker for isolation while Windmill uses nsjail.

## Setup

### Windmill

Comparable very simple scripts. Windmill exposes a
[sync script execution endpoint similar to Lambda](./reference#synchronous-endpoint-for-scripts)
and we created a token to go through authorization (which we didn't for AWS
Lambda since it was a public endpoint so admittedly it's not completely fair,
Windmill is doing auth too)

```typescript
export async function main() {
  return fibonacci(i);
}

function fibonacci(nbr) {
  if (nbr < 2) {
    return nbr;
  }
  return fibonacci(nbr - 1) + fibonacci(nbr - 2);
}
```

### AWS Lambda

We exposed the lambda through the API Gateway. Memory of the lambda was 2048MB
which is comparable to the executor you would get with Windmill. For lambdas,
vCPU is proportional to the memory so you can assume you get a decent vCPU.

```typescript
exports.handler = async (event) => {
  // TODO implement
  const response = {
    statusCode: 200,
    body: JSON.stringify(fibonacci(i)),
  };
  return response;
};

function fibonacci(nbr) {
  if (nbr < 2) {
    return nbr;
  }
  return fibonacci(nbr - 1) + fibonacci(nbr - 2);
}
```

### Result

#### fibonacci(i = 35):

```
echo '{}' > payload.json
ab -n 500 -c 5 -p payload.json -m POST -T "application/json"  https://uxgdvqiabh.execute-api.eu-central-1.amazonaws.com/default/hello 
ab -n 500 -c 5 -p payload.json -m POST -T "application/json"  -H "Authorization: Bearer XXXXX" https://app.windmill.dev/api/w/windmill-labs/jobs/run_wait_result/p/u/admin/test

                min  mean[+/-sd]  median   max
Windmill:       244  414 129.1    361    2251
AWS Lambda:     173  183  21.2    179     420
```

#### fibonacci(i = 40):

```
echo '{}' > payload.json
ab -n 500 -c 5 -p payload.json -m POST -T "application/json"  https://uxgdvqiabh.execute-api.eu-central-1.amazonaws.com/default/hello 
ab -n 500 -c 5 -p payload.json -m POST -T "application/json"  -H "Authorization: Bearer XXXXX" https://app.windmill.dev/api/w/windmill-labs/jobs/run_wait_result/p/u/admin/test

                min  mean[+/-sd]  median   max
Windmill:       1621 2046 327.0   1935    2891
AWS Lambda:     1619 2113 367.9   2124    3068
```

The AWS Lambda Memory is 2048MB which is exactly the memory of the default
worker of Windmill.

In i=35, the cold start latencies have more importance. We see that Windmill is
doing around 2 times worse as AWS Lambda.

In i=40, the compute dominates the start time, we see that the performance are
comparable.

Caveat: We have limited number of workers compared to AWS Lambda and if your
goal is to achieve parallelism > 100 workers, then at the moment you will get
better results with Lambda. We will scale to thousands of workers very soon so
it should not be an easy.

## Conclusion

Windmill is in the same general ballpark as AWS for heavier compute scripts but
currently doing about 2x worse in terms of latency for workloads around 200ms on
1vCPU.
