# Windmill, Airflow and Temporal

We compared Airflow, Temporal and Windmill with the following usecases:
- One flow composed of 40 lightweight tasks.
- One flow composed of 10 long-running tasks.

We chose to compute Fibonacci numbers as a simple task that can easily be run with the three orchestrators. Given that Airflow has a first class support for Python, we used Python for all 3 orchestrators. The function in charge of computing the Fibonacci numbers was very naive:
```python
def fibo(n: int):
    if n <= 1:
        return n
    else:
        return fibo(n - 1) + fibo(n - 2)
```

After some testing, we chose to compute `fibo(10)` for the lightweight tasks (taking around 10ms in our setup), and `fibo(33)` for what we called "long-running" tasks (taking at least a few hundreds milliseconds as seen in the results).

On the infrastructure side, we went simple and used the `docker-compose.yml` recommended in the documentation of each orchestrator. We deployed the orchestrators on AWS using `t2-medium` instances.

### Airflow setup
We set up Airflow version 2.7.3 using the [docker-compose.yaml](https://airflow.apache.org/docs/apache-airflow/2.7.3/docker-compose.yaml) referenced in Airflows official [documentation](https://airflow.apache.org/docs/apache-airflow/stable/howto/docker-compose/index.html#fetching-docker-compose-yaml).

The DAG was the following:
```python
ITER = 10     # respectively 40
FIBO_N = 33   # respectively 10

with DAG(
    dag_id="bench_{}".format(ITER),
    schedule=None,
    start_date=datetime(2023, 1, 1),
    catchup=False,
    tags=["benchmark"],
) as dag:
    for i in range(ITER):
        @task(task_id=f"task_{i}")
        def task_module():
            return fibo(FIBO_N)
        fibo_task = task_module()

        if i > 0:
            previous_task >> fibo_task
        previous_task = fibo_task
```

##### Results

For 10 long running tasks run sequentially:

| **Task**    | **Scheduled at** | **Started at** | **Finished at** |
| :---------: | ---------------: | -------------: | --------------: |
| **task_00** | 0:00:00.000      | 0:00:04.663    | 0:00:06.541     |
| **task_01** | 0:00:06.850      | 0:00:08.724    | 0:00:10.417     |
| **task_02** | 0:00:10.562      | 0:00:12.067    | 0:00:13.880     |
| **task_03** | 0:00:14.100      | 0:00:15.378    | 0:00:16.960     |
| **task_04** | 0:00:17.006      | 0:00:18.484    | 0:00:20.373     |
| **task_05** | 0:00:20.746      | 0:00:22.044    | 0:00:23.611     |
| **task_06** | 0:00:24.063      | 0:00:25.358    | 0:00:26.971     |
| **task_07** | 0:00:28.057      | 0:00:29.364    | 0:00:31.192     |
| **task_08** | 0:00:32.082      | 0:00:33.416    | 0:00:35.193     |
| **task_09** | 0:00:35.982      | 0:00:37.705    | 0:00:40.875     |

For 40 lightweights tasks run sequentially:

| **Task**    | **Scheduled at** | **Started at** | **Finished at** |
| :---------: | ---------------: | -------------: | --------------: |
| **task_00** | 0:00:00.000      | 0:00:03.354    | 0:00:03.761     |
| **task_01** | 0:00:04.762      | 0:00:07.156    | 0:00:07.403     |
| **task_02** | 0:00:08.339      | 0:00:09.618    | 0:00:09.823     |
| **task_03** | 0:00:10.614      | 0:00:11.835    | 0:00:12.044     |
| **task_04** | 0:00:12.548      | 0:00:13.838    | 0:00:14.044     |
| **task_05** | 0:00:14.870      | 0:00:16.209    | 0:00:16.495     |
| **task_06** | 0:00:17.595      | 0:00:18.971    | 0:00:19.208     |
| **task_07** | 0:00:19.985      | 0:00:21.311    | 0:00:21.540     |
| **task_08** | 0:00:22.633      | 0:00:23.901    | 0:00:24.107     |
| **task_09** | 0:00:24.895      | 0:00:26.177    | 0:00:26.459     |
| **task_10** | 0:00:26.562      | 0:00:28.247    | 0:00:28.551     |
| **task_11** | 0:00:29.629      | 0:00:30.854    | 0:00:31.064     |
| **task_12** | 0:00:31.599      | 0:00:32.962    | 0:00:33.179     |
| **task_13** | 0:00:34.077      | 0:00:35.325    | 0:00:35.545     |
| **task_14** | 0:00:36.345      | 0:00:38.973    | 0:00:39.332     |
| **task_15** | 0:00:40.274      | 0:00:42.142    | 0:00:42.348     |
| **task_16** | 0:00:42.988      | 0:00:44.235    | 0:00:44.436     |
| **task_17** | 0:00:45.275      | 0:00:46.516    | 0:00:46.746     |
| **task_18** | 0:00:46.898      | 0:00:48.273    | 0:00:48.509     |
| **task_19** | 0:00:49.283      | 0:00:50.534    | 0:00:50.799     |
| **task_20** | 0:00:51.545      | 0:00:52.857    | 0:00:53.064     |
| **task_21** | 0:00:53.210      | 0:00:54.454    | 0:00:54.669     |
| **task_22** | 0:00:55.474      | 0:00:56.748    | 0:00:56.970     |
| **task_23** | 0:00:57.205      | 0:00:58.591    | 0:00:58.794     |
| **task_24** | 0:00:59.466      | 0:01:00.804    | 0:01:01.026     |
| **task_25** | 0:01:01.887      | 0:01:03.242    | 0:01:03.449     |
| **task_26** | 0:01:04.535      | 0:01:05.784    | 0:01:06.006     |
| **task_27** | 0:01:06.796      | 0:01:08.215    | 0:01:08.426     |
| **task_28** | 0:01:09.575      | 0:01:10.820    | 0:01:11.037     |
| **task_29** | 0:01:11.854      | 0:01:14.543    | 0:01:14.909     |
| **task_30** | 0:01:15.955      | 0:01:17.907    | 0:01:18.254     |
| **task_31** | 0:01:18.710      | 0:01:19.987    | 0:01:20.199     |
| **task_32** | 0:01:21.009      | 0:01:22.334    | 0:01:22.533     |
| **task_33** | 0:01:22.706      | 0:01:23.971    | 0:01:24.178     |
| **task_34** | 0:01:24.944      | 0:01:26.190    | 0:01:26.402     |
| **task_35** | 0:01:27.181      | 0:01:28.529    | 0:01:28.769     |
| **task_36** | 0:01:29.497      | 0:01:30.925    | 0:01:31.167     |
| **task_37** | 0:01:31.818      | 0:01:33.063    | 0:01:33.341     |
| **task_38** | 0:01:33.945      | 0:01:35.177    | 0:01:35.377     |
| **task_39** | 0:01:36.174      | 0:01:37.406    | 0:01:37.607     |

### Temporal setup
We set up Temporal version 2.19.0 using the [docker-compose.yml from the official Github repository](https://github.com/temporalio/docker-compose). 

The flow was defined using the following Python file. We executed it on the EC2 instance, using Python 3.10.12.
```python
ITER = 10     # respectively 40
FIBO_N = 33   # respectively 10

@activity.defn
async def fibo_activity(n: int) -> int:
    return fibo(n)

@workflow.defn
class BenchWorkflow:
    @workflow.run
    async def run(self) -> None:
        for i in range(ITER):
            await workflow.execute_activity(
                fibo_activity,
                FIBO_N,
                activity_id="task_{}".format(i),
                start_to_close_timeout=timedelta(seconds=60),
            )

async def main():
    client = await Client.connect("localhost:7233")
    flow_name = "bench-{}".format(ITER)
    async with Worker(
        client,
        task_queue=flow_name,
        workflows=[BenchWorkflow],
        activities=[fibo_activity],
    ):
        await client.execute_workflow(
            BenchWorkflow.run,
            id=flow_name,
            task_queue=flow_name,
        )


if __name__ == "__main__":
    asyncio.run(main())
```

##### Results

For 10 long running tasks:

| **Task**    | **Scheduled at** | **Started at** | **Finished at** |
| :---------: | ---------------: | -------------: | --------------: |
| **task_00** | 0:00:00.000      | 0:00:00.009    | 0:00:01.332     |
| **task_01** | 0:00:01.351      | 0:00:01.360    | 0:00:02.670     |
| **task_02** | 0:00:02.688      | 0:00:02.696    | 0:00:04.004     |
| **task_03** | 0:00:04.022      | 0:00:04.029    | 0:00:05.336     |
| **task_04** | 0:00:05.357      | 0:00:05.366    | 0:00:06.676     |
| **task_05** | 0:00:06.694      | 0:00:06.701    | 0:00:08.016     |
| **task_06** | 0:00:08.035      | 0:00:08.042    | 0:00:09.407     |
| **task_07** | 0:00:09.426      | 0:00:09.434    | 0:00:10.762     |
| **task_08** | 0:00:10.781      | 0:00:10.789    | 0:00:12.111     |
| **task_09** | 0:00:12.138      | 0:00:12.145    | 0:00:13.457     |

For 40 lightweights tasks run sequentially:

| **Task**    | **Scheduled at** | **Started at** | **Finished at** |
| :---------: | ---------------: | -------------: | --------------: |
| **task_00** | 0:00:00.000      | 0:00:00.008    | 0:00:00.015     |
| **task_01** | 0:00:00.040      | 0:00:00.050    | 0:00:00.058     |
| **task_02** | 0:00:00.075      | 0:00:00.082    | 0:00:00.088     |
| **task_03** | 0:00:00.108      | 0:00:00.115    | 0:00:00.123     |
| **task_04** | 0:00:00.140      | 0:00:00.148    | 0:00:00.155     |
| **task_05** | 0:00:00.172      | 0:00:00.180    | 0:00:00.187     |
| **task_06** | 0:00:00.204      | 0:00:00.211    | 0:00:00.217     |
| **task_07** | 0:00:00.235      | 0:00:00.245    | 0:00:00.253     |
| **task_08** | 0:00:00.271      | 0:00:00.278    | 0:00:00.285     |
| **task_09** | 0:00:00.303      | 0:00:00.310    | 0:00:00.317     |
| **task_10** | 0:00:00.334      | 0:00:00.341    | 0:00:00.348     |
| **task_11** | 0:00:00.366      | 0:00:00.374    | 0:00:00.381     |
| **task_12** | 0:00:00.397      | 0:00:00.405    | 0:00:00.412     |
| **task_13** | 0:00:00.430      | 0:00:00.437    | 0:00:00.444     |
| **task_14** | 0:00:00.461      | 0:00:00.480    | 0:00:00.487     |
| **task_15** | 0:00:00.541      | 0:00:00.581    | 0:00:00.588     |
| **task_16** | 0:00:00.640      | 0:00:00.681    | 0:00:00.687     |
| **task_17** | 0:00:00.740      | 0:00:00.780    | 0:00:00.787     |
| **task_18** | 0:00:00.840      | 0:00:00.881    | 0:00:00.888     |
| **task_19** | 0:00:00.940      | 0:00:00.980    | 0:00:00.987     |
| **task_20** | 0:00:01.040      | 0:00:01.081    | 0:00:01.088     |
| **task_21** | 0:00:01.141      | 0:00:01.180    | 0:00:01.188     |
| **task_22** | 0:00:01.241      | 0:00:01.280    | 0:00:01.287     |
| **task_23** | 0:00:01.352      | 0:00:01.380    | 0:00:01.387     |
| **task_24** | 0:00:01.439      | 0:00:01.480    | 0:00:01.487     |
| **task_25** | 0:00:01.539      | 0:00:01.580    | 0:00:01.587     |
| **task_26** | 0:00:01.640      | 0:00:01.680    | 0:00:01.686     |
| **task_27** | 0:00:01.740      | 0:00:01.781    | 0:00:01.788     |
| **task_28** | 0:00:01.841      | 0:00:01.880    | 0:00:01.887     |
| **task_29** | 0:00:01.940      | 0:00:01.981    | 0:00:01.988     |
| **task_30** | 0:00:02.040      | 0:00:02.080    | 0:00:02.087     |
| **task_31** | 0:00:02.140      | 0:00:02.181    | 0:00:02.187     |
| **task_32** | 0:00:02.240      | 0:00:02.280    | 0:00:02.287     |
| **task_33** | 0:00:02.339      | 0:00:02.380    | 0:00:02.388     |
| **task_34** | 0:00:02.439      | 0:00:02.481    | 0:00:02.488     |
| **task_35** | 0:00:02.540      | 0:00:02.581    | 0:00:02.587     |
| **task_36** | 0:00:02.641      | 0:00:02.680    | 0:00:02.687     |
| **task_37** | 0:00:02.741      | 0:00:02.780    | 0:00:02.787     |
| **task_38** | 0:00:02.840      | 0:00:02.881    | 0:00:02.889     |
| **task_39** | 0:00:02.940      | 0:00:02.981    | 0:00:02.988     |

### Windmill setup
We set up Windmill version 1.204.1 using the [docker-compose.yml from the official Github repository](https://github.com/windmill-labs/windmill). We made some adjustments to it to have a similar setup compared to the other orchestrator. We set the number of workers to only one and removed the native workers since they would have been useless.

We executed the Windmill benchmarks in both "normal" and "dedicated worker" mode. To implement the 2 flows in Windmill, we first created a script simply computing the Fibonacci numbers:
```python
# WIMDMILL script: `u/benchmarkuser/fibo_script`
def fibo(n: int):
    if n <= 1:
        return n
    else:
        return fibo(n - 1) + fibo(n - 2)

def main(
    n: int,
):
    return fibo(n)
```

And then we used this script in a simple flow composed of a For-Loop sequentially executing the scripts. The JSON representation of the flow is as follow:
```json
{
    "summary": "Fibonacci benchmark flow",
    "description": "Flow running 10 (resp. 40) times Fibonacci of 33 (resp. 10)",
    "value": {
        "modules": [
            {
                "id": "a",
                "value": {
                    "type": "forloopflow",
                    "modules": [
                        {
                            "id": "b",
                            "value": {
                                "path": "u/admin/fibo_script",
                                "type": "script",
                                "input_transforms": {
                                    "n": {
                                        "type": "static",
                                        "value": 33 // respectively 10
                                    }
                                }
                            }
                        }
                    ],
                    "iterator": {
                        "expr": "Array(10)", // respectively 40
                        "type": "javascript"
                    },
                    "parallel": false,
                    "skip_failures": true
                }
            }
        ]
    },
    "schema": {
        "$schema": "https://json-schema.org/draft/2020-12/schema",
        "properties": {},
        "required": [],
        "type": "object"
    }
}
```

##### Results

For 10 long running tasks in normal mode:

| **Task**    | **Scheduled at** | **Started at** | **Finished at** |
| :---------: | ---------------: | -------------: | --------------: |
| **task_00** | 0:00:00.000      | 0:00:00.004    | 0:00:00.787     |
| **task_01** | 0:00:00.847      | 0:00:00.851    | 0:00:01.621     |
| **task_02** | 0:00:01.679      | 0:00:01.683    | 0:00:02.456     |
| **task_03** | 0:00:02.515      | 0:00:02.529    | 0:00:03.303     |
| **task_04** | 0:00:03.364      | 0:00:03.368    | 0:00:04.145     |
| **task_05** | 0:00:04.204      | 0:00:04.208    | 0:00:04.974     |
| **task_06** | 0:00:05.032      | 0:00:05.037    | 0:00:05.806     |
| **task_07** | 0:00:05.863      | 0:00:05.867    | 0:00:06.666     |
| **task_08** | 0:00:06.723      | 0:00:06.726    | 0:00:07.494     |
| **task_09** | 0:00:07.558      | 0:00:07.562    | 0:00:08.339     |

For 40 lightweights tasks run sequentially in normal mode:

| **Task**    | **Scheduled at** | **Started at** | **Finished at** |
| :---------: | ---------------: | -------------: | --------------: |
| **task_00** | 0:00:00.000      | 0:00:00.003    | 0:00:00.055     |
| **task_01** | 0:00:00.115      | 0:00:00.120    | 0:00:00.169     |
| **task_02** | 0:00:00.227      | 0:00:00.230    | 0:00:00.279     |
| **task_03** | 0:00:00.338      | 0:00:00.342    | 0:00:00.392     |
| **task_04** | 0:00:00.454      | 0:00:00.458    | 0:00:00.505     |
| **task_05** | 0:00:00.562      | 0:00:00.566    | 0:00:00.623     |
| **task_06** | 0:00:00.680      | 0:00:00.683    | 0:00:00.732     |
| **task_07** | 0:00:00.789      | 0:00:00.793    | 0:00:00.840     |
| **task_08** | 0:00:00.897      | 0:00:00.901    | 0:00:00.951     |
| **task_09** | 0:00:01.008      | 0:00:01.013    | 0:00:01.062     |
| **task_10** | 0:00:01.121      | 0:00:01.125    | 0:00:01.174     |
| **task_11** | 0:00:01.234      | 0:00:01.237    | 0:00:01.283     |
| **task_12** | 0:00:01.340      | 0:00:01.345    | 0:00:01.395     |
| **task_13** | 0:00:01.454      | 0:00:01.458    | 0:00:01.514     |
| **task_14** | 0:00:01.571      | 0:00:01.575    | 0:00:01.628     |
| **task_15** | 0:00:01.685      | 0:00:01.688    | 0:00:01.737     |
| **task_16** | 0:00:01.794      | 0:00:01.798    | 0:00:01.846     |
| **task_17** | 0:00:01.902      | 0:00:01.905    | 0:00:01.956     |
| **task_18** | 0:00:02.014      | 0:00:02.018    | 0:00:02.064     |
| **task_19** | 0:00:02.124      | 0:00:02.128    | 0:00:02.175     |
| **task_20** | 0:00:02.244      | 0:00:02.248    | 0:00:02.294     |
| **task_21** | 0:00:02.351      | 0:00:02.355    | 0:00:02.405     |
| **task_22** | 0:00:02.462      | 0:00:02.469    | 0:00:02.516     |
| **task_23** | 0:00:02.573      | 0:00:02.576    | 0:00:02.625     |
| **task_24** | 0:00:02.683      | 0:00:02.688    | 0:00:02.735     |
| **task_25** | 0:00:02.794      | 0:00:02.799    | 0:00:02.845     |
| **task_26** | 0:00:02.903      | 0:00:02.907    | 0:00:02.954     |
| **task_27** | 0:00:03.011      | 0:00:03.015    | 0:00:03.062     |
| **task_28** | 0:00:03.119      | 0:00:03.123    | 0:00:03.171     |
| **task_29** | 0:00:03.228      | 0:00:03.232    | 0:00:03.280     |
| **task_30** | 0:00:03.337      | 0:00:03.341    | 0:00:03.401     |
| **task_31** | 0:00:03.459      | 0:00:03.463    | 0:00:03.512     |
| **task_32** | 0:00:03.570      | 0:00:03.573    | 0:00:03.620     |
| **task_33** | 0:00:03.679      | 0:00:03.682    | 0:00:03.729     |
| **task_34** | 0:00:03.787      | 0:00:03.792    | 0:00:03.840     |
| **task_35** | 0:00:03.897      | 0:00:03.900    | 0:00:03.947     |
| **task_36** | 0:00:04.005      | 0:00:04.009    | 0:00:04.056     |
| **task_37** | 0:00:04.112      | 0:00:04.116    | 0:00:04.167     |
| **task_38** | 0:00:04.225      | 0:00:04.229    | 0:00:04.276     |
| **task_39** | 0:00:04.334      | 0:00:04.338    | 0:00:04.384     |

In dedicated worker mode, we obtained the following results.
For 10 liong running tasks:

| **Task**    | **Scheduled at** | **Started at** | **Finished at** |
| :---------: | ---------------: | -------------: | --------------: |
| **task_00** | 0:00:00.000      | 0:00:00.004    | 0:00:00.244     |
| **task_01** | 0:00:00.798      | 0:00:00.801    | 0:00:01.051     |
| **task_02** | 0:00:01.584      | 0:00:01.588    | 0:00:01.918     |
| **task_03** | 0:00:02.377      | 0:00:02.381    | 0:00:02.641     |
| **task_04** | 0:00:03.169      | 0:00:03.173    | 0:00:03.403     |
| **task_05** | 0:00:03.962      | 0:00:03.966    | 0:00:04.216     |
| **task_06** | 0:00:04.749      | 0:00:04.752    | 0:00:04.962     |
| **task_07** | 0:00:05.542      | 0:00:05.547    | 0:00:05.787     |
| **task_08** | 0:00:06.341      | 0:00:06.344    | 0:00:06.584     |
| **task_09** | 0:00:07.128      | 0:00:07.131    | 0:00:07.351     |

And for the 40 lightweight tasks:

| **Task**    | **Scheduled at** | **Started at** | **Finished at** |
| :---------: | ---------------: | -------------: | --------------: |
| **task_00** | 0:00:00.000      | 0:00:00.004    | 0:00:00.006     |
| **task_01** | 0:00:00.061      | 0:00:00.064    | 0:00:00.066     |
| **task_02** | 0:00:00.123      | 0:00:00.126    | 0:00:00.128     |
| **task_03** | 0:00:00.185      | 0:00:00.188    | 0:00:00.190     |
| **task_04** | 0:00:00.246      | 0:00:00.250    | 0:00:00.251     |
| **task_05** | 0:00:00.308      | 0:00:00.311    | 0:00:00.313     |
| **task_06** | 0:00:00.369      | 0:00:00.372    | 0:00:00.374     |
| **task_07** | 0:00:00.431      | 0:00:00.435    | 0:00:00.437     |
| **task_08** | 0:00:00.494      | 0:00:00.498    | 0:00:00.501     |
| **task_09** | 0:00:00.558      | 0:00:00.561    | 0:00:00.563     |
| **task_10** | 0:00:00.620      | 0:00:00.624    | 0:00:00.626     |
| **task_11** | 0:00:00.682      | 0:00:00.685    | 0:00:00.687     |
| **task_12** | 0:00:00.744      | 0:00:00.747    | 0:00:00.749     |
| **task_13** | 0:00:00.805      | 0:00:00.808    | 0:00:00.810     |
| **task_14** | 0:00:00.872      | 0:00:00.875    | 0:00:00.877     |
| **task_15** | 0:00:00.994      | 0:00:01.000    | 0:00:01.002     |
| **task_16** | 0:00:01.060      | 0:00:01.064    | 0:00:01.066     |
| **task_17** | 0:00:01.123      | 0:00:01.129    | 0:00:01.132     |
| **task_18** | 0:00:01.187      | 0:00:01.191    | 0:00:01.193     |
| **task_19** | 0:00:01.250      | 0:00:01.253    | 0:00:01.255     |
| **task_20** | 0:00:01.312      | 0:00:01.315    | 0:00:01.317     |
| **task_21** | 0:00:01.374      | 0:00:01.378    | 0:00:01.380     |
| **task_22** | 0:00:01.436      | 0:00:01.439    | 0:00:01.441     |
| **task_23** | 0:00:01.499      | 0:00:01.503    | 0:00:01.505     |
| **task_24** | 0:00:01.561      | 0:00:01.565    | 0:00:01.567     |
| **task_25** | 0:00:01.623      | 0:00:01.627    | 0:00:01.629     |
| **task_26** | 0:00:01.685      | 0:00:01.694    | 0:00:01.698     |
| **task_27** | 0:00:01.754      | 0:00:01.758    | 0:00:01.766     |
| **task_28** | 0:00:01.822      | 0:00:01.825    | 0:00:01.827     |
| **task_29** | 0:00:01.885      | 0:00:01.889    | 0:00:01.891     |
| **task_30** | 0:00:01.947      | 0:00:01.951    | 0:00:01.953     |
| **task_31** | 0:00:02.010      | 0:00:02.013    | 0:00:02.015     |
| **task_32** | 0:00:02.072      | 0:00:02.076    | 0:00:02.078     |
| **task_33** | 0:00:02.135      | 0:00:02.138    | 0:00:02.140     |
| **task_34** | 0:00:02.196      | 0:00:02.212    | 0:00:02.214     |
| **task_35** | 0:00:02.270      | 0:00:02.273    | 0:00:02.275     |
| **task_36** | 0:00:02.332      | 0:00:02.335    | 0:00:02.337     |
| **task_37** | 0:00:02.394      | 0:00:02.398    | 0:00:02.400     |
| **task_38** | 0:00:02.457      | 0:00:02.462    | 0:00:02.464     |
| **task_39** | 0:00:02.521      | 0:00:02.525    | 0:00:02.527     |

### Comparisons

At a macro level, it took 40.875s to Airflow to execute the 10 long running tasks, where Temporal took 13.457s and Windmill 08.339s in normal mode and 07.351s in dedicated worker mode.

The same can be observed for the 40 lightweight tasks, where Airflow took total of 01m37.607s, Temporal 02.988s and Windmill 04.384s in normal mode and 02.527s in dedicated worker mode.

By far, Airflow is the slowest. Temporal is faster, but not as fast as Windmill. For the 40 lightweight tasks, Windmill was slightly slower than temporal in normal mode. This can be explained by the fact that the way Temporal works is closer to the way Windmill works in dedicated mode. I.e. Windmill in normal mode does a cold starts for each tasks, and when the tasks are numerous and lightweight, most of the execution ends up being taken by the cold start. In dedicated worker mode however, Windmill behavior is closer to Temporal, and we can see that the performance are similar, with a slight advantage for Windmill.

But we can deep dive in a little and compare the orchestrators three categories:
- Execution time: The time it takes for the orchestrator to execute the task once is has been assigned to an executor
- Assignment time: The time is takes for a task to be assigned to an executor once it has been created in the queue
- Transition time: The time it takes for to create the following time once a task is finished

After looking at the macro numbers above, it's interesting to compare the time spent in each of the above categories, relative to the total time the orchestrator took to execute the flow.

For the 10 long running tasks flow, we see the following:

|                    | **Airflow** | **Temporal** | **Windmill Normal** | **Windmill DW** |
| :----------------: | ----------: | -----------: | ------------------: | --------------: |
| **Total duration** | 0:00:40.875 | 0:00:13.457  | 0:00:08.339         | 0:00:07.351     |
| **Assignement**    | 43.44%      | 0.61%        | 0.60%               | 0.50%           |
| **Execution**      | 46.02%      | 98.07%       | 93.01%              | 33.60%          |
| **Transition**     | 10.54%      | 1.33%        | 6.39%               | 65.90%          |

The proportion of time spent in execution is important here since each task takes a long time to run. We see that Airflow is spending a lot of time assigning the tasks compared to the two others. Temporal and Windmill in normal mode are pretty similar. Windmill in dedicated worker mode is incredibly fast at executing the jobs, at a cost of spending a little more time doing the transitions, but overall it is the fastest.

If we look at the 40 lightweight tasks flow, we have:

|                    | **Airflow** | **Temporal** | **Windmill Normal** | **Windmill DW** |
| :----------------: | ----------: | -----------: | ------------------: | --------------: |
| **Total duration** | 0:01:37.607 | 0:00:02.988  | 0:00:04.384         | 0:00:02.527     |
| **Assignement**    | 60.78%      | 37.63%       | 3.63%               | 6.49%           |
| **Execution**      | 9.82%       | 9.52%        | 44.66%              | 3.52%           |
| **Transition**     | 29.40%      | 52.85%       | 51.71%              | 89.99%          |

Here we see that Windmill takes a greater portion of time executing the tasks, which can be explained by the fact that Windmill runs a "cold start" for each tasks submitted to the worker. However, it's by far the fastest assigning tasks to executors. As observed above, Windmill in dedicated worker mode is lightning fast at executing the tasks, but takes more time transitioning from one task to the next one. 

### Conclusion
Airflow is the slowest in all categories. If you're looking for a performant job orchestrator to run a significant amount of tasks, you shouldn't be using Airflow. Temporal and Windmill in are closer to each other in terms of performance, but in both cases Windmill wins either in normal mode or in dedicated more. If you're looking for a job orchestrator for various long-running tasks, Windmill in normal mode will be the most performant solution, optimizing the duration of each tasks knowing that transtions and assignements will remain a small portion of the overall workload. To run lightweight tasks at a very fast pace Windmill in dedicated worker mode should be your preferred choice. It is lightening fast at executing the tasks and assigning tasks to workers.