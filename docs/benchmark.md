# Benchmark

## It is faster than AWS Lambda

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

## The Test: Apache bench:

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
▶ ab -n 500 -c 20 -p payload.json -m POST -T "application/json"   https://h666b2am3h.execute-api.us-east-1.amazonaws.com/default/hello
This is ApacheBench, Version 2.3 <$Revision: 1901567 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking h666b2am3h.execute-api.us-east-1.amazonaws.com (be patient)
Completed 100 requests
Completed 200 requests
Completed 300 requests
Completed 400 requests
Completed 500 requests
Finished 500 requests


Server Software:        
Server Hostname:        h666b2am3h.execute-api.us-east-1.amazonaws.com
Server Port:            443
SSL/TLS Protocol:       TLSv1.2,ECDHE-RSA-AES128-GCM-SHA256,2048,128
Server Temp Key:        ECDH P-256 256 bits
TLS Server Name:        h666b2am3h.execute-api.us-east-1.amazonaws.com

Document Path:          /default/hello
Document Length:        20 bytes

Concurrency Level:      20
Time taken for tests:   9.766 seconds
Complete requests:      500
Failed requests:        0
Total transferred:      95500 bytes
Total body sent:        97000
HTML transferred:       10000 bytes
Requests per second:    51.20 [#/sec] (mean)
Time per request:       390.621 [ms] (mean)
Time per request:       19.531 [ms] (mean, across all concurrent requests)
Transfer rate:          9.55 [Kbytes/sec] received
                        9.70 kb/s sent
                        19.25 kb/s total

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:      247  262   8.8    262     300
Processing:    92  109   9.7    106     156
Waiting:       92  109   9.6    106     154
Total:        348  371  14.7    370     426

Percentage of the requests served within a certain time (ms)
  50%    370
  66%    375
  75%    378
  80%    380
  90%    390
  95%    402
  98%    414
  99%    417
 100%    426 (longest request)
```

## Result

### 

### AWS Lambda

```
                   min  mean[+/-sd] median   max
Windmill:          167  342 124.9    308     678
AWS Lambda:        348  371  14.7    370     426
```

Windmill has more variance but mean is lower and we haven't yet optimized all we
could optimize. Windmill wins!

## What about actual compute

I knew you would ask. Let's have the endpoints compute:

```
export async function main() {
	return  fibonacci(40)
}

function fibonacci(nbr) {
  if(nbr < 2){
    return nbr;
  }
  return fibonacci(nbr - 1) + fibonacci(nbr - 2);
}
```

### Result

-n 100, -c 5:

```
                min  mean[+/-sd]  median   max
Windmill:       1637 2129 373.1   2136    3062
AWS Lambda:     1729 1947  76.5   1954    2152
```

Even for heavier workloads, Windmill still win. (The AWS Lambda Memory was
2048MB which is exactly the configuration of the default worker of Windmill).

Caveat: We have limited number of workers compared to AWS Lambda and if your
goal is to achieve parrallelism > 100 workers, then at the moment you will get
better results with Lambda. We will scale to thousands of workers very soon so
it should not be an easy.
