# Flow Inputs

In this section, you will learn how to add and configure flow inputs.

There are three ways to add flow inputs:

- Manually configuring the flow inputs
- Using a **Request**: Send a POST request to the a specific endpoint to add a flow input.
- By copying the first step inputs

## Manually configuring the flow inputs

To manually configure the flow inputs, click on the **Add property** button.
It will open a slider where you can configure the flow input:

- **Name**: The name of the flow input.
- **Description**: The description of the flow input.
- **Type**: The type of the flow input: Integer, Number, String, Boolean, Array, Object, or any.
- **Default value**: The default value of the flow input.

Also there are five advanced options:

- **None**: No advanced options.
- **File (Base 64)**: The flow input will be a file. The file will be encoded in base 64.
- **Enum**: The flow input will be one of the value of an enum. You can add the enum values.
- **Format**: You can add a format to the string. There are seven available:
  - **Email**: The string will be an email.
  - **hostname**: The string will be a hostname.
  - **ipv4**: The string will be an ipv4.
  - **uri**: The string will be an uri.
  - **uuid**: The string will be an uuid.
  - **yaml**: The string will be an yaml.
  - **SQL**: The string will be an SQL.
- **Pattern**: You can add a pattern to the string. The pattern will be a regular expression.

## Using a Request

For this example, we will use the following flow at path: `u/test-user/my_flow`

You can send a POST request to the following endpoint with a payload to add a flow input: The payload will be interpreted to extract the flow input.

For example, using CURL:

```bash
curl -X POST https://app.windmill.dev/api/w/windmill-labs/capture_u/u/test-user/my_flow \
   -H 'Content-Type: application/json' \
   -d '{"foo": 42}'
```

The flow input will be added with the following properties:

- **Name**: foo
- **Type**: Integer
- **Default value**: 42

## Copying the first step inputs

To copy the first step inputs, click on the **First step inputs** button.
