# Benchmark

## TL;DR: about same performance but initial latency is about 1.75x worse.

Tested with apache bench. If we did it wrong, let us know. AWS Lambda was
pre-warmed with 5000 requests to avoid cold starts.

## Setup

### Windmill

Comparable very simple scripts. Windmill like for any script expose a sync
endpoint and we created a token to go through authorization (which we didn't for
AWS Lambda since it was a public endpoint so admittedly it's not completely
fair, Windmill is doing auth too)

```typescript
export async function main() {
  return "Hello World!";
}
```

### AWS Lambda

We exposed the lambda through the API Gateway. Memory of the lambda was 2048MB
which is comparable to the executor you would get with Windmill.

```typescript
exports.handler = async (event) => {
  // TODO implement
  const response = {
    statusCode: 200,
    body: JSON.stringify("Hello from Lambda!"),
  };
  return response;
};
```

## Empty compute (just start latency)

We use Apache Bench for testing with many requests at once.

### Windmill

```
▶ echo '{}' > payload.json

▶ ab -n 500 -c 20 -p payload.json -m POST -T "application/json"  -H "Authorization: Bearer XXXXXXXXXXXXXXXXXXXXXXXXXX" https://app.windmill.dev/api/w/windmill-labs/jobs/run_wait_result/p/u/admin/test                  
This is ApacheBench, Version 2.3 <$Revision: 1901567 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking app.windmill.dev (be patient)
Completed 100 requests
Completed 200 requests
Completed 300 requests
Completed 400 requests
Completed 500 requests
Finished 500 requests


Server Software:        cloudflare
Server Hostname:        app.windmill.dev
Server Port:            443
SSL/TLS Protocol:       TLSv1.3,TLS_AES_256_GCM_SHA384,256,256
Server Temp Key:        X25519 253 bits
TLS Server Name:        app.windmill.dev

Document Path:          /api/w/windmill-labs/jobs/run_wait_result/p/u/admin/test
Document Length:        14 bytes

Concurrency Level:      20
Time taken for tests:   9.189 seconds
Complete requests:      500
Failed requests:        0
Total transferred:      185500 bytes
Total body sent:        124000
HTML transferred:       7000 bytes
Requests per second:    54.41 [#/sec] (mean)
Time per request:       367.558 [ms] (mean)
Time per request:       18.378 [ms] (mean, across all concurrent requests)
Transfer rate:          19.71 [Kbytes/sec] received
                        13.18 kb/s sent
                        32.89 kb/s total

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:       13   21   8.4     19     126
Processing:   148  321 124.5    286     644
Waiting:      148  228  57.4    258     433
Total:        167  342 124.9    308     678

Percentage of the requests served within a certain time (ms)
  50%    308
  66%    398
  75%    482
  80%    492
  90%    506
  95%    532
  98%    563
  99%    595
 100%    678 (longest request)
```

### AWS Lambda

```
▶ ab -n 500 -c 20 -p payload.json -m POST -T "application/json"  https://uxgdvqiabh.execute-api.eu-central-1.amazonaws.com/default/hello
This is ApacheBench, Version 2.3 <$Revision: 1901567 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking uxgdvqiabh.execute-api.eu-central-1.amazonaws.com (be patient)
Completed 100 requests
Completed 200 requests
Completed 300 requests
Completed 400 requests
Completed 500 requests
Finished 500 requests


Server Software:        
Server Hostname:        uxgdvqiabh.execute-api.eu-central-1.amazonaws.com
Server Port:            443
SSL/TLS Protocol:       TLSv1.2,ECDHE-RSA-AES128-GCM-SHA256,2048,128
Server Temp Key:        ECDH P-256 256 bits
TLS Server Name:        uxgdvqiabh.execute-api.eu-central-1.amazonaws.com

Document Path:          /default/hello
Document Length:        20 bytes

Concurrency Level:      20
Time taken for tests:   5.172 seconds
Complete requests:      500
Failed requests:        23
   (Connect: 0, Receive: 0, Length: 23, Exceptions: 0)
Non-2xx responses:      23
Total transferred:      95983 bytes
Total body sent:        92500
HTML transferred:       10299 bytes
Requests per second:    96.68 [#/sec] (mean)
Time per request:       206.861 [ms] (mean)
Time per request:       10.343 [ms] (mean, across all concurrent requests)
Transfer rate:          18.12 [Kbytes/sec] received
                        17.47 kb/s sent
                        35.59 kb/s total

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:       43  165 114.4    111     453
Processing:    21   33  13.4     30     133
Waiting:       20   33  13.3     30     133
Total:         70  199 116.7    142     487

Percentage of the requests served within a certain time (ms)
  50%    142
  66%    301
  75%    306
  80%    310
  90%    326
  95%    343
  98%    384
  99%    475
 100%    487 (longest request)
```

### Result

```
                   min  mean[+/-sd] median   max
Windmill:          167  342 124.9    308     678
AWS Lambda:        70   199 116.7    142     487
```

Windmill's e2e start latency is about 1.75x the one of AWS Lambda. There is
still lots of room for improvement but it's still in the same ballpark.

## Heavier compute (calculating fibonacci(40))

```typescript
export async function main() {
  return fibonacci(40);
}

function fibonacci(nbr) {
  if (nbr < 2) {
    return nbr;
  }
  return fibonacci(nbr - 1) + fibonacci(nbr - 2);
}
```

### Result

-n 100, -c 5:

```
                min  mean[+/-sd]  median   max
Windmill:       1621 2046 327.0   1935    2891
AWS Lambda:     1619 2113 367.9   2124    3068
```

The AWS Lambda Memory is 2048MB which is exactly the configuration of the
default worker of Windmill

Here the compute dominates the start time, we see that the performance are
comparable.

Caveat: We have limited number of workers compared to AWS Lambda and if your
goal is to achieve parrallelism > 100 workers, then at the moment you will get
better results with Lambda. We will scale to thousands of workers very soon so
it should not be an easy.

## Conclusion

Windmill is in the same general ballpark as AWS unless you are extremely latency
sensitive. In most cases, you would not see the difference for compute requiring
more than 300ms.
