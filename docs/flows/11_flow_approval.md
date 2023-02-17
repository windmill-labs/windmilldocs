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
