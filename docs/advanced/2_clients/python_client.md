# Python Client

The Python client library for Windmill provides a convenient way to interact with the Windmill platform's API from within your script jobs. By authenticating with the `WM_TOKEN` reserved variable, you can utilize the Python client to access various functionalities offered by Windmill.

## Installation

To use the Python client library, you need to install the `wmill` package. You can install it via pip:

```
pip install wmill
```

## Usage

To use the Python client library in your script, include the following prelude:

```python
import wmill

def main(...):
    # Your script code
```

## Client Class

The `Client` class is the main entry point for interacting with the Windmill API. It provides methods for accessing resources, running scripts, retrieving job statuses and results, and more. Here is the class signature:

```python
class Client(base_url: str = 'http://localhost:8000/api', token: str = '')
```

### Methods

#### get_resource

```python
def get_resource(self, path: str) -> Dict[str, Any]
```

The `get_resource` method retrieves a resource at the specified path from the Windmill platform. It returns the resource as a Python dictionary (`Dict[str, Any]`).

#### run_script_async

```python
def run_script_async(self, hash: str, args: Dict[str, Any] = {}, scheduled_in_secs: Optional[None] = None) -> str
```

The `run_script_async` method launches the execution of a script asynchronously on the Windmill platform. It returns the job ID associated with the script execution.

#### run_script_sync

```python
def run_script_sync(self, hash: str, args: Dict[str, Any] = {}, verbose: bool = False) -> Dict[str, Any]
```

The `run_script_sync` method runs a script synchronously on the Windmill platform. It waits for the script to complete and returns the result as a Python dictionary (`Dict[str, Any]`).

#### get_job_status

```python
def get_job_status(self, job_id: str) -> JobStatus
```

The `get_job_status` method retrieves the status of a queued or completed job identified by its job ID. It returns an instance of the `JobStatus` enumeration.

#### get_result

```python
def get_result(self, job_id: str) -> Dict[str, Any]
```

The `get_result` method retrieves the result of a completed job identified by its job ID. It returns the result as a Python dictionary (`Dict[str, Any]`).

#### get_version

```python
def get_version(self) -> str
```

The `get_version` method returns the current version of the Windmill backend.

## JobStatus Enumeration

The `JobStatus` class is an enumeration that represents the different states of a job in Windmill. It provides the following class variables:

- `COMPLETED`: Represents a completed job.
- `RUNNING`: Represents a job that is currently running.
- `WAITING`: Represents a job that is queued and waiting to be executed.

The `JobStatus` enumeration is useful when retrieving the status of a job using the `get_job_status` method.
