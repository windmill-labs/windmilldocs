import React from 'react';
import Head from '@docusaurus/Head';

export default function SeoHead() {
    const title = "Windmill | Open-source developer platform and workflow engine";
    const description = "Turn scripts into auto-generated UIs, APIs and cron jobs. Compose them as workflows or data pipelines. Build complex, data-intensive apps with ease. Write and deploy software 10x faster, and run it with the highest reliability and observability on the fastest self-hostable job orchestrator";
    const url = "https://www.windmill.dev/";
    const image = "https://www.windmill.dev/img/og_preview.png";

    return (
        <Head>
            <title>{title}</title>

            <meta name="title" content={title} />
            <meta name="description" content={description} />

            <meta property="og:url" content={url} />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            <link rel="icon" href="/img/logo.svg" />
        </Head>
    );
}
