# Custom Timeout for Step

For each step can be defined a timeout. If the execution takes longer than the time limit, the execution of the step will be interrupted.

If defined, the custom timeout will be used instead of the instance timeout for the step (for self-hosted, defined by the [environment variable](https://github.com/windmill-labs/windmill#environment-variables) `TIMEOUT`). The step's timeout cannot be greater than the instance timeout.

<video
	className="border-2 rounded-xl object-cover w-full h-full dark:border-gray-800"
	autoPlay
	controls
	id="main-video"
	src="/videos/custom_timeout.mp4"
/>