---
slug: query-grpc-service
title: Querying gRPC service in Windmill
authors: [guillaumebouv]
tags: ['Windmill', 'gRPC', 'Developer tools']
image: ./wmill_grpc.png
---

To query a gRPC service, the client needs to know about its API definition (i.e. the `.proto` files). In some situations, the proto files are compiled in the desired language by the owner of the service and published as a package in the package repository. But when it's not the case, it can be cumbersome to query such a service.

In this post, we're going to see how you can easily workaround this limitation in Windmill using Bun and gRPC javascript `proto-loader` package.

### Example stack

This [docker-compose](https://github.com/windmill-labs/windmill/blob/main/examples/usecase/query-grpc-service/docker-compose.yml) spins up a stack with a single Windmill instance and a dummy gRPC service (the code can be found 
[here](https://github.com/gbouv/grpc-quickstart-service/tree/main)). It exposes the following API:

```proto
syntax = "proto3";

option go_package = "github.com/gbouv/grpc-quickstart-service/protobuf";

package helloworld;

// The greeting service definition.
service Greeter {
  // Sends a greeting
  rpc SayHello (HelloRequest) returns (HelloReply) {}
}

// The request message containing the user's name.
message HelloRequest {
  string name = 1;
}

// The response message containing the greetings
message HelloReply {
  string message = 1;
}
```

### gRPC query in Windmill

As said in the intro, most language requires to manually "compile" the `.proto` files to be able to use them (we explain below how this can also be done in Windmill).

Thankfully, Javascript has is able to dynamically build a client from the raw `.proto` files. Here we're going to use Bun which recently added support for the HTTP2 protocol used by gRPC.

First, we need to save the content of the `.proto` file. We're going to use a Windmill variable so that it can be used in multiple scripts. Here we save it to a variable named `service_proto`.

Once it's done, we create a Bun script in Windmill with the following content:

```js
import * as wmill from "windmill-client"
import * as grpc from "@grpc/grpc-js"
import * as protoLoader from "@grpc/proto-loader"

const SERVICE_NAME = 'helloworld'

export async function main() {
  await writeProto()
  let service = await loadService()

  let client = new service.Greeter("localhost:1353", grpc.credentials.createInsecure());
  return await query(client, "SayHello", { name: "Windmill!" })
}

async function query(client, method, args): Promise<string> {
  return new Promise((resolve, reject) => {
    client[method](args, function(err, resp) {
      if (resp) {
        resolve(resp)
      } else {
        reject(err)
      }
    });
  })
}

async function loadService() {
  var serviceDefinition = protoLoader.loadSync(
    "./service.proto",
    {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true
    });
  return grpc.loadPackageDefinition(serviceDefinition)[SERVICE_NAME];
}

async function writeProto() {
  const proto = await wmill.getVariable('u/admin/service_proto');
  await Bun.write("./service.proto", proto);
}
```

The logic is quite simple. The script starts by writing the content of the proto to a local file (unfortunately the `protoLoader.loadSync` function does not accept raw strings). Then uses `protoLoader.loadSync` to build a service client from the `.proto` content. And finally it queries the gRPC service using this client object. Note that the gRPC client is by default asynchronous and does not use the Promise mechanism. Here the `query` function simply wraps the call inside a Promise. And with all that, inside the main we can `query` the endpoint with its name and the request payload. The result is returned as the result of the script:
```
{
    "message": "Hello Windmill!"
}
```

This canonical script can be used in Flows to easily query the service and process the result in a following step.

### Statically defined gRPC services

If the `.proto` are not compiled by the service owner and you want to use another language than typescript (if if you're using javascript but don't want dynamic loading), you will have no other choice than to compile the `.proto` yourself. And then, to use the compiled service definition in Windmill, the easiest is to publish the files to a private package registry.

For Python for example, you can compile the `.proto` with:

```bash
protoc --python_out=./ ./helloworld.proto
```

This will generate a python file corresponding to your service definition in Python. You can then add this file to a python package of your choice, and publish it to a private Pypi repository (like [pypiserver](https://pypi.org/project/pypiserver/)). You can then (configure Windmill to use this repository)[https://www.windmill.dev/docs/advanced/imports#private-pypi-repository] and you will be able to pull the pre-compiled service definition from any python script in Windmill.

The same can be done for javascript. To compile the `.proto`, simply run:

```bash
grpc_tools_node_protoc --js_out=import_style=commonjs,binary:./ --grpc_out=grpc_js:./ helloworld.proto
```

And then upload the content as a NPM package to a private NPM registry (like [verdaccio](https://verdaccio.org/)) and (configure Windmill to pull package from it)[https://www.windmill.dev/docs/advanced/imports#private-npm-registry].
