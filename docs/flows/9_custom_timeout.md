# Custom timeout for step

For each step can be defined a timeout. If the execution takes longer than the time limit, the execution of the step will be interrupted.

If defined, the custom timeout will be used instead of the instance timeout for the step (for self-hosted, defined by the [environment variable](../core_concepts/47_environment_variables/index.mdx) `TIMEOUT`). The step's timeout cannot be greater than the [instance timeout](../advanced/18_instance_settings/index.mdx#default-timeout).

<video
	className="border-2 rounded-lg object-cover w-full h-full dark:border-gray-800"
	autoPlay
	controls
	id="main-video"
	src="/videos/custom_timeout.mp4"
/>