# Approval

An approval step will suspend the execution of a flow until it has been approved
through the resume endpoints or the approval page by and solely by the recipients of
those secret urls. Use `wmill.getResumeUrls()` in Typescript or
`wmill.get_resume_urls()` in Python from the wmill client to generate those URLs.

<video
    className="border-2 rounded-xl object-cover w-full h-full"
    autoPlay
    loop
    controls
    id="main-video"
    src="/videos/flow-approval.mp4"
/>

<br/>

:::tip

You can find on the [Suspend and Resume page](../core_concepts/7_suspend_and_resume/index.md) a short tutorial on approval steps and on the [Hub](https://hub.windmill.dev/approvals) a list of examples of approval steps.

:::

<br/>

Approval steps generate a URL which is specific to a flow. This step puts the flow in a state such that the flow will not restart as long as there is an event / payload.

An event can be:
- a **cancel**
- a **pre-set number of approval** that is met

For the moment we receive the approval steps in the form of an HTTP request. For each event, a single URL is generated. It is not unique to each user to whom it is sent.

### Condition branches on approval steps inputs

In the default URL approval steps there is a text box where users can enter a string. This input can be the condition of further [branches](./13_flow_branches.md) or scripts.

![Approval text box](../assets/flows/approval-textbox.png)

Currently, you need to create an intermediary step that should return '`resume`: "The resume payload"'

![Use an intermediary step](../assets/flows/intermediary-step.png)

Once executed, this step will return an output called `message` with the actual message as a string. Use it as a condition expression for your branch one.

![Message output](../assets/flows/message-condition.png)

You're ready to execute the flow! Let the user enter the message + approve and you're good to execute the branch based on it!.

![Approval message](../assets/flows/approval-message.png)

![The branch is executed](../assets/flows/branch-executed.png)