---
slug: ai-agents
authors: [hugocasa]
tags: ['ai', 'windmill', 'agents']
description: 'Building AI agent steps in Windmill flows'
title: 'Building AI agent steps in Windmill flows'
---

# Building AI agent steps in Windmill flows

AI agent steps in Windmill let you build flows where language models can reason about which tools to use, call scripts dynamically, and handle complex multi-step tasks.{/* truncate */} Instead of hardcoding every path through a workflow, you define the available tools and let the agent orchestrate them based on the user's request.

This post walks through what AI agent steps bring to users, then covers two technical challenges we faced: handling structured output across different AI providers and maintaining MCP protocol compliance.

## Part 1: What AI agent steps bring to Windmill

### Multi-provider support

An AI Agent can be configured with any provider: OpenAI, Anthropic, Azure OpenAI, Mistral, Google AI, Groq, Together AI, OpenRouter, or any custom or local provider you have.

### Tool integration

Any Windmill script can become a tool the AI agent can invoke. This makes the agent able to use [scripts](/docs/getting_started/scripts_quickstart) written in any of the 10+ languages Windmill supports. The agent reasons about which tools to use based on the user's request rather than following a predetermined sequence.

![Script tools](./script_tool.png "Define your tool in any language")

### Streaming

Long-running AI interactions can feel opaque. Streaming shows responses as they're generated. When an agent calls tools, processes results, and formulates responses, users see real-time updates about what's happening.

### Conversation memory

Agents can remember previous messages within a conversation. Configure how much context to maintain, and the agent will recall earlier interactions. This enables conversational workflows where the agent builds on previous exchanges.

### Image support

AI agent steps support images as input and ouput. You can give images to your agent for it to analyze, or ask it to generate them. When agents generate images, those images are automatically stored in your workspace's S3 [bucket](/docs/core_concepts/object_storage_in_windmill) for use in subsequent workflow steps.

![Image output](./image_output.png "Generate images seamlessly")


### Structured output

Sometimes you need data in a specific format, not just conversational text. JSON schema validation ensures the AI's response conforms to a structure your downstream systems expect.

![Output schema](./output_schema.png "Define your output structure")

### MCP integration

Through Model Context Protocol support, agents can connect to external MCP servers: file system browsers, database interfaces, API integrations, and custom business logic servers. Agents aren't limited to Windmill's internal capabilities—they can reach out to any MCP-compatible service.

![MCP tool](./mcp.png "Connect to MCP servers")

### Configuration

You can set your system prompt to guide the agent's behavior, adjust temperature for creativity versus consistency, and set a max output token to limit cost.

## Part 2: Technical challenges

Building AI agent steps required solving two technical challenges: making structured output work across all AI providers, and maintaining strict MCP protocol compliance while the ecosystem matures.

### Structured output across providers

Supporting multiple AI providers presents an ongoing challenge. Many providers claim to be OpenAI-compatible, but real-world differences require effort to handle. Structured output is one area where these differences appear.

Most AI providers support structured output through a `response_format` parameter in their API. You specify a JSON schema, and the model ensures its response conforms to that structure. This works straightforwardly for OpenAI, Mistral, Google AI, and other providers.

Anthropic models don't support the `response_format` parameter. To handle this, we use a workaround: we define a tool where the tool's arguments match the desired output schema. The agent calls this tool as its final action, and the tool arguments become the structured response returned to the user. This approach maintains consistency across all providers while working within each provider's capabilities.

### MCP protocol compliance

Windmill uses the rmcp Rust crate, which strictly adheres to the MCP protocol specification. This creates a compatibility challenge: not all MCP servers implement the protocol precisely.

A common issue occurs when a server doesn't support stateful mode. The MCP spec requires returning 405 Method Not Allowed, but some servers incorrectly return 404 Not Found. Rather than working around these bugs, we maintain strict protocol compliance.

This approach has trade-offs. It encourages the ecosystem to implement MCP correctly and ensures our implementation remains spec-compliant and future-proof. However, it means some improperly-implemented servers won't work until they're fixed.

As the MCP ecosystem matures, these compatibility issues should diminish. By maintaining strict compliance now, we help ensure the long-term health of the protocol.
