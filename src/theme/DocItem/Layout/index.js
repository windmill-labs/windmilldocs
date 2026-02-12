import React from 'react';
import DocItemLayout from '@theme-original/DocItem/Layout';
import Head from '@docusaurus/Head';
import {useDoc} from '@docusaurus/plugin-content-docs/client';

export default function DocItemLayoutWrapper(props) {
  const {metadata} = useDoc();

  const techArticleSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: metadata.title,
    description: metadata.description,
    url: `https://www.windmill.dev${metadata.permalink}`,
    publisher: {
      '@type': 'Organization',
      name: 'Windmill',
      url: 'https://www.windmill.dev',
      logo: 'https://www.windmill.dev/img/windmill.svg'
    }
  };

  return (
    <>
      <Head>
        <script type="application/ld+json">
          {JSON.stringify(techArticleSchema)}
        </script>
      </Head>
      <DocItemLayout {...props} />
    </>
  );
}
