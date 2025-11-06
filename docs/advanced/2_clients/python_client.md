# Python client

The Python client library for Windmill provides a convenient way to interact with the Windmill platform using Python. This client provides a set of functions and utilities to access Windmill resources and perform various operations.

The Python Windmill SDK can be found at https://app.windmill.dev/pydocs/wmill.html

## Installation

To use the Python client library, you need to install the `wmill` package via pip:

```bash
pip install wmill
```

## Usage

The Python client provides several functions that you can use to interact with the Windmill platform. Here's an example of how to use the client to get a resource from Windmill:

```python
import wmill

def main():
    # Get a resource
    db_config = wmill.get_resource('u/user/db_config')

    # Get a variable
    api_key = wmill.get_variable('u/user/api_key')

    # Run a script asynchronously
    job_id = wmill.run_script_by_path_async('f/scripts/process_data', args={'input': 'value'})

    # Run a script synchronously and get result
    result = wmill.run_script_by_path('f/scripts/calculate', args={'x': 10, 'y': 20})
```

## API reference

For detailed API documentation including all available methods, parameters, and return types, see the [Python SDK documentation](https://app.windmill.dev/pydocs/wmill.html).

### Core functions

The client provides both module-level convenience functions and a `Windmill` class for advanced usage:

#### Module-level functions

- `get_resource(path)` - Get a resource from Windmill
- `get_variable(path)` - Get a variable value
- `set_variable(path, value)` - Set a variable value
- `run_script_by_path(path, args)` - Run a script synchronously by path
- `run_script_by_hash(hash_, args)` - Run a script synchronously by hash
- `run_script_by_path_async(path, args)` - Run a script asynchronously by path
- `run_flow_async(path, args)` - Run a flow asynchronously
- `get_result(job_id)` - Get the result of a completed job
- `get_state()` - Get the script's state
- `set_state(value)` - Set the script's state

#### Windmill class

For advanced usage, you can instantiate the `Windmill` class directly:

```python
from wmill import Windmill

client = Windmill(
    base_url='http://localhost:8000',
    token='your_token',
    workspace='your_workspace'
)

# Use client methods
result = client.get_resource('u/user/resource')
```

## S3 integration

The client includes helpers for working with S3-compatible storage:

```python
import wmill
from wmill import S3Object

# Load a file from S3
s3_obj = S3Object(s3='/path/to/file.txt')
content = wmill.load_s3_file(s3_obj)

# Write a file to S3
file_content = b'Hello Windmill!'
wmill.write_s3_file(s3_obj, file_content)
```

## Notes

- The Python client automatically uses the `WM_TOKEN` environment variable for authentication when running inside Windmill
- The client is not thread or multi-processing safe. When using multithreading or multiprocessing, create a separate client instance per thread/process using `wmill.Windmill()`
- For complete API reference with all methods and parameters, see the [Python SDK documentation](https://app.windmill.dev/pydocs/wmill.html)
