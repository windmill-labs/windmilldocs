# Action editor

Windmill provide an web editor to write your scripts. It is available in the flow editor.

The script editor in split in three parts:

- Header: Edit summary of the script and access to nested features:
  - Retries: Configure the number of retries and the delay between each retry
  - Early stop/Break: If defined, at the end of the step, the predicate expression will be evaluated to decide if the flow should stop early. Skipped flows are just a label useful to not see them in the runs page. If stop early is run within a forloop, it will just break the for-loop and have it stop at that iteration instead of stopping the whole flow.
  - Suspend: If defined, at the end of the step, the flow will be suspended until it receives external requests to be resumed or canceled. This is most useful to implement approval steps but can be used flexibly for other purpose. To get the resume urls, use `wmill.getResumeUrls()` in Typescript, or `wmill.get_resume_urls()` in Python.
  - Sleep: If defined, at the end of the step, the flow will sleep for a number of seconds before scheduling the next job (if any, no effect if the step is the last one). Sleeping is passive and does not consume any resources.
- Script editor: Write your script:
  - Context var: Add a context variable to the script
  - Var: Add an input variable to the script
  - Resource: Add a resource to the script
  - Reset: Reset the script to its initial state
  - Assistant: Reload the LSP assistant
  - Format: Format the script. Can be triggerd on save (CTRL+S)
  - Script: View hub or workspace script code
- Step configuration: The step configuration is composed of three parts:
  - Step input: Define the input of the step
  - Test this step: Test the step unitary
  - Advanced: Advanced configuration
