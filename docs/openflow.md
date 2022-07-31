# OpenFlow Spec

OpenFlow is an open standard for defining "Flows" where a flow is a directed
graph in which every node represents a step of computation. In other words, it
is a declarative language for chaining scripts.

Windmill is the open-source reference implementation for it, providing an UI to
build flows and a highly scalable executors. However everyone is welcome, to
build upon it to develope new UIs that targets OpenFlow or new executors.

Flows can be shared and showcased on the
[WindmillHub](https://hub.windmill.dev). To see an example of an OpenFlow in
practice, go to WindmillHub and pick a flow (e.g
[Whenever an HN message contains a mention, publish it to slack](https://hub.windmill.dev/flows/13/whenever-an-hn-message-contains-a-mention%2C-publish-it-to-slack)),
then Flow -> JSON.

## OpenFlow

Its OpenApi definition can be found at:
https://github.com/windmill-labs/windmill/blob/main/openflow.openapi.yaml

OpenFlow is portable and its root object is defined as follows:

```yaml
OpenFlow:
  type: object
  properties:
    summary:
        type: string
    description:
        type: string
    value:
        $ref: "#/components/schemas/FlowValue"
    schema:
        type: object
    required:
    - summary
    - value
```

It contains a short line summary, a description, a schema which is the
JSONSchema that constraints the JSON it takes as an input. FlowValue is where
the logic of the flow is actually defined:

## FlowValue

```yaml
FlowValue:
  type: object
  properties:
    modules:
      type: array
      items:
        $ref: "#/components/schemas/FlowModule"
    failure_module:
      $ref: "#/components/schemas/FlowModule"
  required:
    - modules
```

A Flow is just a sequence of modules, and an optional failure module that will
be triggered to handle a failure at any point of the flow.

Now let's see what is a module:

## FlowModule and InputTransform

```yaml
    FlowModule:
      type: object
      properties:
        input_transform:
          type: object
          additionalProperties:
            $ref: "#/components/schemas/InputTransform"
        value:
          $ref: "#/components/schemas/FlowModuleValue"
        stop_after_if_expr:
          type: string
        skip_if_stopped:
          type: boolean
      required:
        - input_transform
        - value

    InputTransform:
      oneOf:
        - $ref: "#/components/schemas/StaticTransform"
        - $ref: "#/components/schemas/JavascriptTransform"
      discriminator:
        propertyName: type
        mapping:
          static: "#/components/schemas/StaticTransform"
          javascript: "#/components/schemas/JavascriptTransform"

    StaticTransform:
      type: object
      properties:
        value: {}
        type:
          type: string
          enum:
            - javascript
      required:
        - expr
        - type

    JavascriptTransform:
      type: object
      properties:
        expr:
          type: string
        type:
          type: string
          enum:
            - javascript
      required:
        - expr
        - type
```

So a module contains input_transform as a dict from fields (or input of the
module) to either either a static json value or a javascript expression.

The input_transform is the way to do the piping from any other previous steps or
from variable, or resources to one of the input of your script/module. Since it
is actual javascript (although a restricted javascript, you cannot fetch
externally outside of getting secrets and variables for instance), it is very
flexible. One interesting pattern that is allows is that you can compose complex
string directly from there so you could imagine composing your email body or SQL
query directing from doing a string interpolation using previous result. The
Windmill Editor makes it very easy to do so using the properties picker.

![Prop picker](./assets/prop_picker.png)

There are also 2 optional fields:

- stop_after_if_expr: Evaluate a javascript expression that takes the result as
  an input to decide if the flow should stop there. For instance useful to stop
  a flow that is meant to watch for changes if there are no changes.
- skip_if_stopped: A flag in the case the the above expression stops the flow to
  consider the flow to be a skip or a success. A skip is useful in the context
  of flows being triggered very often to watch for changes as you might want to
  ignore the runs that have been skipped.

Now let's see how how the Module value is itself defined.

## FlowModuleValue

You will see below that there are 4 kinds of modules:

- rawscript: Embed a full Deno or Javascript script inside the flow. Useful when
  the script is not generic but only makes sense within this flow.
- script: When you can refer to a script by path (including a path to the hub
  using the `hub/` prefix)
- flow: Refer to another flow by path.
- forloopflow: Trigger for-loops that will iterate over a list and trigger one
  flow per element. The list is built evaluating the javascript expression
  inside `iterator` taking `result` as an input being the result of the previous
  module. For instance in Windmill, most flows use the iterator `result.res1`
  and expect the previous step to return a list. The flow triggered will take as
  an input the embedding flow inputs, the entire result of the previous step and
  `_value` and `_index` as respectively the value being iterated and its
  corresponding index.

```yaml
    FlowModuleValue:
      oneOf:
        - $ref: "#/components/schemas/RawScript"
        - $ref: "#/components/schemas/PathScript"
        - $ref: "#/components/schemas/ForloopFlow"
        - $ref: "#/components/schemas/PathFlow"
      discriminator:
        propertyName: type
        mapping:
          rawscript: "#/components/schemas/RawScript"
          script: "#/components/schemas/PathScript"
          forloopflow: "#/components/schemas/ForloopFlow"
          flow: "#/components/schemas/PathFlow"

      required:
        - type

    RawScript:
      type: object
      properties:
        content:
          type: string
        language:
          type: string
          enum:
            - deno
            - python3
        path:
          type: string
        type:
          type: string
      required:
        - type
        - content
        - language

    PathScript:
      type: object
      properties:
        path:
          type: string
        type:
          type: string
          enum:
            - script
      required:
        - type
        - path

    PathFlow:
      type: object
      properties:
        path:
          type: string
        type:
          type: string
          enum:
            - flow
      required:
        - type

    ForloopFlow:
      type: object
      properties:
        value:
          $ref: "#/components/schemas/FlowValue"
        iterator:
          $ref: "#/components/schemas/InputTransform"
        skip_failures:
          type: boolean
        type:
          type: string
          enum:
            - forloopflow
      required:
        - value
        - iterator
        - skip_failures
        - type
```

Et voilà, we have completed our tour of OpenFlow.
