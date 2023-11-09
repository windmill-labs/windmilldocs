# Windmill, Airflow and Temporal

We compared Airflow, Temporal and Windmill in the following usecases:
- One flow composed of 40 lightweight tasks.
- One flow composed of 10 long-running tasks.

We chose to compute Fibonacci numbers as a simple yet universal task that could easily be run with the three orchestrators. Given that Airflow has a first class support for Python, we used Python for all 3 orchestrators. The function in charge of computing the Fibonacci numbers is very naive:
```
def fibo(n: int):
    if n <= 1:
        return n
    else:
        return fibo(n - 1) + fibo(n - 2)
```

After some testing, we chose to compute `fibo(10)` for the lightweight tasks (taking around 10ms in our setup), and `fibo(33)` for what we called "long-running" tasks (taking at least a few hundreds milliseconds as seen in the results)

On the infrastructure side, we went simple and used the `docker-compose.yml` recommended in the documentation of each orchestrator. We restricted docker resources to 10 CPUs and 8GB of memory, although we were able to check that neither CPU nor Memory was ever a bottleneck for the tests.

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
| **Task**   | **Scheduled at** | **Started at** | **Finished at** |
|:----------:|-----------------:|---------------:|----------------:|
| **task_0** | 0:00:00.000      | 0:00:01.323    | 0:00:02.006     |
| **task_1** | 0:00:02.385      | 0:00:02.864    | 0:00:03.518     |
| **task_2** | 0:00:03.983      | 0:00:04.471    | 0:00:05.114     |
| **task_3** | 0:00:06.130      | 0:00:06.604    | 0:00:07.247     |
| **task_4** | 0:00:07.865      | 0:00:08.358    | 0:00:09.005     |
| **task_5** | 0:00:10.039      | 0:00:10.547    | 0:00:11.201     |
| **task_6** | 0:00:12.175      | 0:00:12.807    | 0:00:13.498     |
| **task_7** | 0:00:14.037      | 0:00:14.533    | 0:00:15.198     |
| **task_8** | 0:00:16.188      | 0:00:16.767    | 0:00:17.427     |
| **task_9** | 0:00:17.660      | 0:00:18.143    | 0:00:18.866     |

For 40 lightweights tasks run sequentially:
| **Task**    | **Scheduled at** | **Started at** | **Finished at** |
|:-----------:|-----------------:|---------------:|----------------:|
| **task_0**  | 0:00:00.029      | 0:00:00.791    | 0:00:00.912     |
| **task_1**  | 0:00:01.963      | 0:00:02.471    | 0:00:02.551     |
| **task_2**  | 0:00:03.109      | 0:00:03.605    | 0:00:03.685     |
| **task_3**  | 0:00:04.258      | 0:00:04.749    | 0:00:04.832     |
| **task_4**  | 0:00:05.402      | 0:00:05.888    | 0:00:05.972     |
| **task_5**  | 0:00:06.998      | 0:00:07.497    | 0:00:07.580     |
| **task_6**  | 0:00:08.152      | 0:00:08.653    | 0:00:08.731     |
| **task_7**  | 0:00:09.271      | 0:00:09.787    | 0:00:09.868     |
| **task_8**  | 0:00:10.159      | 0:00:10.667    | 0:00:10.749     |
| **task_9**  | 0:00:10.970      | 0:00:11.441    | 0:00:11.522     |
| **task_10** | 0:00:12.102      | 0:00:12.619    | 0:00:12.711     |
| **task_11** | 0:00:13.233      | 0:00:13.762    | 0:00:13.840     |
| **task_12** | 0:00:14.377      | 0:00:14.863    | 0:00:14.951     |
| **task_13** | 0:00:15.501      | 0:00:15.998    | 0:00:16.080     |
| **task_14** | 0:00:17.108      | 0:00:17.602    | 0:00:17.687     |
| **task_15** | 0:00:18.226      | 0:00:18.867    | 0:00:18.960     |
| **task_16** | 0:00:19.376      | 0:00:19.904    | 0:00:20.003     |
| **task_17** | 0:00:20.518      | 0:00:21.007    | 0:00:21.090     |
| **task_18** | 0:00:22.148      | 0:00:22.673    | 0:00:22.765     |
| **task_19** | 0:00:23.264      | 0:00:23.845    | 0:00:23.938     |
| **task_20** | 0:00:24.371      | 0:00:24.886    | 0:00:24.995     |
| **task_21** | 0:00:25.247      | 0:00:25.747    | 0:00:25.832     |
| **task_22** | 0:00:26.135      | 0:00:26.638    | 0:00:26.720     |
| **task_23** | 0:00:27.266      | 0:00:27.839    | 0:00:27.938     |
| **task_24** | 0:00:28.368      | 0:00:28.894    | 0:00:28.986     |
| **task_25** | 0:00:29.453      | 0:00:29.970    | 0:00:30.059     |
| **task_26** | 0:00:30.614      | 0:00:31.230    | 0:00:31.325     |
| **task_27** | 0:00:32.237      | 0:00:32.727    | 0:00:32.809     |
| **task_28** | 0:00:33.327      | 0:00:33.811    | 0:00:33.904     |
| **task_29** | 0:00:34.440      | 0:00:34.928    | 0:00:35.018     |
| **task_30** | 0:00:35.572      | 0:00:36.062    | 0:00:36.142     |
| **task_31** | 0:00:36.235      | 0:00:36.699    | 0:00:36.814     |
| **task_32** | 0:00:37.472      | 0:00:37.943    | 0:00:38.027     |
| **task_33** | 0:00:38.587      | 0:00:39.075    | 0:00:39.159     |
| **task_34** | 0:00:39.705      | 0:00:40.232    | 0:00:40.317     |
| **task_35** | 0:00:41.305      | 0:00:41.769    | 0:00:41.849     |
| **task_36** | 0:00:42.427      | 0:00:42.929    | 0:00:43.018     |
| **task_37** | 0:00:43.560      | 0:00:44.041    | 0:00:44.125     |
| **task_38** | 0:00:44.683      | 0:00:45.168    | 0:00:45.254     |
| **task_39** | 0:00:45.667      | 0:00:46.178    | 0:00:46.261     |

### Temporal setup
We set up Temporal version 2.19.0 using the [docker-compose.yml from the official Github repository](https://github.com/temporalio/docker-compose)

The flow was defined using the following Python file:
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
| **Task**   | **Scheduled at** | **Started at** | **Finished at** |
|:----------:|-----------------:|---------------:|----------------:|
| **task_0** | 0:00:00.000      | 0:00:00.007    | 0:00:00.387     |
| **task_1** | 0:00:00.407      | 0:00:00.414    | 0:00:00.780     |
| **task_2** | 0:00:00.805      | 0:00:00.811    | 0:00:01.174     |
| **task_3** | 0:00:01.184      | 0:00:01.186    | 0:00:01.545     |
| **task_4** | 0:00:01.570      | 0:00:01.576    | 0:00:01.938     |
| **task_5** | 0:00:01.962      | 0:00:01.967    | 0:00:02.329     |
| **task_6** | 0:00:02.349      | 0:00:02.358    | 0:00:02.722     |
| **task_7** | 0:00:02.742      | 0:00:02.749    | 0:00:03.111     |
| **task_8** | 0:00:03.137      | 0:00:03.143    | 0:00:03.506     |
| **task_9** | 0:00:03.529      | 0:00:03.536    | 0:00:03.899     |

For 40 lightweights tasks run sequentially:
| **Task**    | **Scheduled at** | **Started at** | **Finished at** |
|:-----------:|-----------------:|---------------:|----------------:|
| **task_0**  | 0:00:00.430      | 0:00:00.434    | 0:00:00.439     |
| **task_1**  | 0:00:00.446      | 0:00:00.449    | 0:00:00.452     |
| **task_2**  | 0:00:00.458      | 0:00:00.460    | 0:00:00.463     |
| **task_3**  | 0:00:00.468      | 0:00:00.470    | 0:00:00.472     |
| **task_4**  | 0:00:00.477      | 0:00:00.480    | 0:00:00.482     |
| **task_5**  | 0:00:00.487      | 0:00:00.489    | 0:00:00.491     |
| **task_6**  | 0:00:00.497      | 0:00:00.499    | 0:00:00.501     |
| **task_7**  | 0:00:00.506      | 0:00:00.508    | 0:00:00.510     |
| **task_8**  | 0:00:00.515      | 0:00:00.517    | 0:00:00.519     |
| **task_9**  | 0:00:00.524      | 0:00:00.526    | 0:00:00.528     |
| **task_10** | 0:00:00.534      | 0:00:00.536    | 0:00:00.538     |
| **task_11** | 0:00:00.572      | 0:00:00.616    | 0:00:00.620     |
| **task_12** | 0:00:00.670      | 0:00:00.714    | 0:00:00.720     |
| **task_13** | 0:00:00.774      | 0:00:00.822    | 0:00:00.834     |
| **task_14** | 0:00:00.873      | 0:00:00.919    | 0:00:00.924     |
| **task_15** | 0:00:00.973      | 0:00:01.017    | 0:00:01.021     |
| **task_16** | 0:00:01.071      | 0:00:01.114    | 0:00:01.120     |
| **task_17** | 0:00:01.175      | 0:00:01.219    | 0:00:01.225     |
| **task_18** | 0:00:01.281      | 0:00:01.321    | 0:00:01.331     |
| **task_19** | 0:00:01.375      | 0:00:01.418    | 0:00:01.425     |
| **task_20** | 0:00:01.478      | 0:00:01.521    | 0:00:01.533     |
| **task_21** | 0:00:01.580      | 0:00:01.619    | 0:00:01.627     |
| **task_22** | 0:00:01.676      | 0:00:01.722    | 0:00:01.731     |
| **task_23** | 0:00:01.772      | 0:00:01.813    | 0:00:01.820     |
| **task_24** | 0:00:01.873      | 0:00:01.916    | 0:00:01.923     |
| **task_25** | 0:00:01.980      | 0:00:02.021    | 0:00:02.030     |
| **task_26** | 0:00:02.074      | 0:00:02.117    | 0:00:02.124     |
| **task_27** | 0:00:02.184      | 0:00:02.216    | 0:00:02.223     |
| **task_28** | 0:00:02.271      | 0:00:02.315    | 0:00:02.321     |
| **task_29** | 0:00:02.382      | 0:00:02.419    | 0:00:02.428     |
| **task_30** | 0:00:02.484      | 0:00:02.520    | 0:00:02.529     |
| **task_31** | 0:00:02.587      | 0:00:02.615    | 0:00:02.621     |
| **task_32** | 0:00:02.679      | 0:00:02.715    | 0:00:02.721     |
| **task_33** | 0:00:02.778      | 0:00:02.817    | 0:00:02.827     |
| **task_34** | 0:00:02.885      | 0:00:02.919    | 0:00:02.928     |
| **task_35** | 0:00:02.986      | 0:00:03.021    | 0:00:03.029     |
| **task_36** | 0:00:03.085      | 0:00:03.120    | 0:00:03.133     |
| **task_37** | 0:00:03.181      | 0:00:03.215    | 0:00:03.223     |
| **task_38** | 0:00:03.279      | 0:00:03.319    | 0:00:03.328     |
| **task_39** | 0:00:03.385      | 0:00:03.421    | 0:00:03.429     |

### Windmill setup
We set up Windmill version 1.201.1 using the [docker-compose.yml from the official Github repository](https://github.com/windmill-labs/windmill).

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

For 10 long running tasks:
| **Task**   | **Scheduled at** | **Started at** | **Finished at** |
|:----------:|-----------------:|---------------:|----------------:|
| **task_0** | 0:00:00.348      | 0:00:00.350    | 0:00:00.721     |
| **task_1** | 0:00:00.775      | 0:00:00.777    | 0:00:01.140     |
| **task_2** | 0:00:01.193      | 0:00:01.194    | 0:00:01.554     |
| **task_3** | 0:00:01.608      | 0:00:01.609    | 0:00:01.967     |
| **task_4** | 0:00:02.021      | 0:00:02.023    | 0:00:02.385     |
| **task_5** | 0:00:02.439      | 0:00:02.441    | 0:00:02.804     |
| **task_6** | 0:00:02.858      | 0:00:02.859    | 0:00:03.224     |
| **task_7** | 0:00:03.279      | 0:00:03.280    | 0:00:03.638     |
| **task_8** | 0:00:03.693      | 0:00:03.694    | 0:00:04.053     |
| **task_9** | 0:00:04.108      | 0:00:04.110    | 0:00:04.468     |

For 40 lightweights tasks run sequentially:
| **Task**    | **Scheduled at** | **Started at** | **Finished at** |
|-------------|------------------|----------------|-----------------|
| **task_0**  | 0:00:00.000      | 0:00:00.002    | 0:00:00.035     |
| **task_1**  | 0:00:00.090      | 0:00:00.092    | 0:00:00.111     |
| **task_2**  | 0:00:00.165      | 0:00:00.167    | 0:00:00.185     |
| **task_3**  | 0:00:00.239      | 0:00:00.240    | 0:00:00.259     |
| **task_4**  | 0:00:00.313      | 0:00:00.314    | 0:00:00.332     |
| **task_5**  | 0:00:00.386      | 0:00:00.388    | 0:00:00.405     |
| **task_6**  | 0:00:00.461      | 0:00:00.462    | 0:00:00.481     |
| **task_7**  | 0:00:00.536      | 0:00:00.538    | 0:00:00.556     |
| **task_8**  | 0:00:00.610      | 0:00:00.611    | 0:00:00.630     |
| **task_9**  | 0:00:00.685      | 0:00:00.686    | 0:00:00.704     |
| **task_10** | 0:00:00.759      | 0:00:00.761    | 0:00:00.779     |
| **task_11** | 0:00:00.833      | 0:00:00.834    | 0:00:00.852     |
| **task_12** | 0:00:00.906      | 0:00:00.908    | 0:00:00.925     |
| **task_13** | 0:00:00.980      | 0:00:00.981    | 0:00:00.999     |
| **task_14** | 0:00:01.055      | 0:00:01.056    | 0:00:01.075     |
| **task_15** | 0:00:01.130      | 0:00:01.132    | 0:00:01.150     |
| **task_16** | 0:00:01.203      | 0:00:01.204    | 0:00:01.221     |
| **task_17** | 0:00:01.275      | 0:00:01.276    | 0:00:01.293     |
| **task_18** | 0:00:01.347      | 0:00:01.348    | 0:00:01.365     |
| **task_19** | 0:00:01.419      | 0:00:01.420    | 0:00:01.438     |
| **task_20** | 0:00:01.491      | 0:00:01.492    | 0:00:01.510     |
| **task_21** | 0:00:01.566      | 0:00:01.567    | 0:00:01.587     |
| **task_22** | 0:00:01.641      | 0:00:01.642    | 0:00:01.660     |
| **task_23** | 0:00:01.713      | 0:00:01.714    | 0:00:01.731     |
| **task_24** | 0:00:01.785      | 0:00:01.786    | 0:00:01.803     |
| **task_25** | 0:00:01.858      | 0:00:01.859    | 0:00:01.876     |
| **task_26** | 0:00:01.930      | 0:00:01.930    | 0:00:01.949     |
| **task_27** | 0:00:02.004      | 0:00:02.005    | 0:00:02.024     |
| **task_28** | 0:00:02.079      | 0:00:02.081    | 0:00:02.100     |
| **task_29** | 0:00:02.155      | 0:00:02.156    | 0:00:02.175     |
| **task_30** | 0:00:02.228      | 0:00:02.230    | 0:00:02.248     |
| **task_31** | 0:00:02.302      | 0:00:02.304    | 0:00:02.323     |
| **task_32** | 0:00:02.377      | 0:00:02.379    | 0:00:02.398     |
| **task_33** | 0:00:02.453      | 0:00:02.454    | 0:00:02.476     |
| **task_34** | 0:00:02.532      | 0:00:02.533    | 0:00:02.551     |
| **task_35** | 0:00:02.608      | 0:00:02.612    | 0:00:02.630     |
| **task_36** | 0:00:02.686      | 0:00:02.687    | 0:00:02.706     |
| **task_37** | 0:00:02.760      | 0:00:02.761    | 0:00:02.779     |
| **task_38** | 0:00:02.835      | 0:00:02.836    | 0:00:02.855     |
| **task_39** | 0:00:02.910      | 0:00:02.911    | 0:00:02.929     |

### Comparisons

At a macro level, it took 18.866s to Airflow to execute the 10 long running tasks, where Windmill took only 04.120s and Temporal 03.899s. The same can be observed for the 40 lightweight tasks, where Airflow took total of 46.233s, Temporal 02.999s and Windmill 02.929s.
Clearly, Airflow is by far the slowest. Temporal and Windmill competes really closely, the difference being so small that is can barely be representative.

But we can deep dive a little and compare the 3 orchestrators three categories:
- Execution time: The time it takes for the orchestrator to execute the task once is has been assigned to an executor
- Assignment time: The time is takes for a task to be assigned to an executor once it has been created in the queue
- Transition time: The time it takes for to create the following time once a task is finished

After looking at the macro numbers above, it's interesting to compare the time spent in each of the above categories, relative to the total time the orchestrator took to execute the flow.

For the 10 long running tasks flow, we see the following:
| **-**                       | **Airflow** | **Temporal** | **Windmill** |
|-----------------------------|-------------|--------------|--------------|
| **Total duration (s)**      | 0:00:18.866 | 0:00:03.899  | 0:00:04.120  |
| **Total in execution (%)**  | 35.33%      | 93.44%       | 87.79%       |
| **Total in assignment (%)** | 31.56%      | 1.57%        | 0.36%        |
| **Total in transition (%)** | 33.11%      | 4.99%        | 11.84%       |
Obviously the portion of the time spent in execution is important here since each task takes a long time to run. It's important to note though that even in this case Airflow is particularly innefficient for transitioning and assigning tasks. If we look at Temporal and Windmill, we see that Windmill is faster at assigning tasks to executors, but Temporal is faster transitioning from one task to the other.

If we look at the 40 lightweight tasks flow, we have:
| **-**                       | **Airflow** | **Temporal** | **Windmill** |
|-----------------------------|-------------|--------------|--------------|
| **Total duration (s)**      | 0:00:46.233 | 0:00:02.999  | 0:00:02.929  |
| **Total in execution (%)**  | 7.63%       | 8.67%        | 25.47%       |
| **Total in assignment (%)** | 44.59%      | 39.40%       | 1.84%        |
| **Total in transition (%)** | 47.78%      | 51.93%       | 72.69%       |
Here we see that Windmill takes a greater portion of time executing the tasks, which can be explained by the fact that Windmill runs a "cold start" for each tasks submitted to the executor. However, it's by far the fastest assigning tasks to executors. Temporal is the fastest transitioning from one task to the other, as observed in the other usecase.

### Conclusion
Airflow looses in all categories. If you're looking for a performant job orchestrator to run a significant amount of tasks, you shouldn't be using Airflow. Temporal and Windmill are pretty close in terms of performance. Temporal handles transitions slightly faster than Windmill, but Windmill is faster at assigning tasks to executor. Both are good candidates for those looking for performant job orchestrators, and the choice can be made onon different criteria, like usability and user experiences. Windmill has advantage to have a nice and easy to use UI, without sacrificing anything on performance compared to Temporal.
