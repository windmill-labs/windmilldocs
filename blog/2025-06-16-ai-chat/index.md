# Introducing Windmill AI Chat: A Smart Assistant on Every Screen

AI is becoming a natural part of how we build and automate.  
With the right context and interface, it can significantly speed up tasks without disrupting your workflow.  
At Windmill, we’ve embraced this shift by introducing an AI chat assistant that’s deeply integrated across the entire platform.

The assistant is now available on every screen — in the script editor, flow builder, and even while navigating.  
It's always nearby when you need it, yet unobtrusive when you don’t.  
If you need to focus on an editor and don't want to be distracted, you can simply hide it.

**[Insert screenshot or video demo of AI chat panel on different screens]**

## A Mode for Every Task

To make the assistant more effective, we’ve introduced three specialized modes: Navigation, Script, and Flow.  
These modes help ensure more relevant responses and better user experiences, tailored to the task at hand.

### Navigation Mode

Navigation mode is ideal for discovering Windmill’s features and understanding how the platform works.  
It’s especially helpful for new users, providing quick guidance and links to the docs.  
For more advanced users, it’s still useful for uncovering less obvious functionalities without needing to search manually.

**[Insert demo showing navigation help and documentation queries]**

### Script Mode

In the script editor, the assistant shines by working with rich context.  
You can provide specific cues — like referencing a database schema, selecting a few lines of code, or comparing with the latest deployed version — all easily addable using the **@ symbol** or through a context dropdown.

Once provided, this context enables a range of **quick actions**.  
For example, if you test a step and it fails, you’ll be offered options to fix the error or improve the code right from the chat.  
These actions are tuned to the situation, helping you move faster with fewer steps.

You can also choose to apply or discard specific parts of a suggestion.  
This **granular apply/reject** is built directly into the Monaco editor and makes AI suggestions easier to manage — not a flashy feature, just a necessary one.

**[Insert video showing context selection and quick actions in action]**

### Flow Mode

Flow mode turns natural language into fully structured workflows.  
You can describe your intent in plain English, and the assistant will build a flow step by step, connecting scripts, filling in parameters, and even handling branches and loops.

It pulls from your workspace and the Windmill Hub, reusing existing components or generating new ones as needed.  
Based on the context, it sets inputs, chooses iterator expressions, and configures predicates to match the data structure of your flow.

**[Insert demo showing a flow being created via natural language]**

## Supported Models and Interface Details

Windmill AI is compatible with a range of language models.  
While we mostly test and optimize with OpenAI and Claude — and currently see the best results with Claude — the assistant is designed to work well with other configured models too.

You can easily switch between your available models from within the chat interface.  
For quick access, use **Cmd + L** to open the assistant at any time, from anywhere in the app.

The chat experience itself follows a familiar interface, intentionally designed to feel lightweight and integrated — not like a separate tool.  
The assistant adapts to the screen you're on and the actions you're taking, aiming to assist without interrupting.

## Looking Ahead

We see AI becoming an increasingly central part of the Windmill experience.  
We're focused on making it as helpful, flexible, and responsive as possible.

In the near future, expect a more intelligent AI chat, tighter integrations across the platform, and a redesigned autocomplete experience that speeds up scripting.

In addition to the [MCP server we already provide for executing scripts](/docs/core_concepts/ai_generation#mcp-server) we’re also exploring the possibility of exposing a similar capability for creating, editing, deploying, and configuring scripts, flows, triggers, and other Windmill resources — accessible from local tools like Claude or Cursor.

**[Insert teaser video or screenshot of future autocomplete experience or external MCP usage]**

## Try It Today

The AI assistant is now live and available across Windmill.  
Whether you’re navigating the platform, debugging a script, or designing a flow, it's ready to assist — when and how you need it.

**[Insert CTA or link to documentation/tutorial]**
