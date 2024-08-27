import React from 'react';
import Head from '@docusaurus/Head';
import LayoutProvider from '@theme/Layout/Provider';
import LandingSection from '../landing/LandingSection';
import LandingHeader from '../landing/LandingHeader';
import Footer from '../landing/Footer';
import RadialBlur from '../landing/RadialBlur';
import { EnvelopeIcon, LinkIcon } from '@heroicons/react/20/solid';

const roles = {
    "Common Tree": {
      name: "Common Tree",
      colors: "bg-blue-50 text-blue-700",
      link: "/docs/misc/partners#common-tree-mandatory-for-all-partners"
    },
    "App Editor": {
      name: "App Editor",
      colors: "bg-orange-50 text-orange-700 hover:text-orange-800",
      link: "/docs/misc/partners#build-and-maintain-complex-apps"
    }
  };  

const people = [
{
    name: 'José Governo Pais Neto',
    description: 'José Governo, CFA, CQF is from Brazil. José worked in an asset management firm where he used Windmill to build complex dashboard applications for his clients.',
    roles: ['Common Tree', 'App Editor'],
    email: 'jose@zenfin.tech',
    profile: 'https://www.linkedin.com/in/jose-governo/',
    imageUrl: 'https://media.licdn.com/dms/image/C4D03AQE2yXYlSoBQmg/profile-displayphoto-shrink_800_800/0/1594600574101?e=2147483647&v=beta&t=c2VZb77tUdnBRzlGVTuY23qDvGlUHy1xqy_zn1TNr40',
},
];

function PartnersCatalog() {
    return (
        <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {people.map((person) => (
            <li key={person.email} className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow">
            <div className="flex flex-1 flex-col p-8">
                <img alt="" src={person.imageUrl} className="mx-auto h-32 w-32 flex-shrink-0 rounded-full" />
                <h3 className="mt-6 text-sm font-medium text-gray-900">{person.name}</h3>
                <dl className="mt-1 flex flex-grow flex-col justify-between">
                <dd className="text-sm text-gray-500">{person.description}</dd>
                <dd className="mt-3">
                    {person.roles.map(role => (
                    <a key={role} href={roles[role].link} className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium mx-0.5 ${roles[role].colors}`}>
                        {role}
                    </a>
                    ))}
                </dd>
                </dl>
            </div>
            <div>
                <div className="-mt-px flex divide-x divide-gray-200">
                <div className="flex w-0 flex-1">
                    <a href={`mailto:${person.email}`} className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
                    <EnvelopeIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
                    Email
                    </a>
                </div>
                <div className="-ml-px flex w-0 flex-1">
                    <a href={person.profile} className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
                    <LinkIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
                    Profile
                    </a>
                </div>
                </div>
            </div>
            </li>
        ))}
        </ul>
    );
}

export default function About() {
  return (
    <LayoutProvider>
      <main>
        <Head>
          <title>Partners | Windmill</title>
          <meta name="title" content="Windmill Certified Partners." />
          <meta name="description" content="Windmill Certified Partners are third-parties such as consultancies that are Windmill experts and help other organizations implement specific use cases end-to-end." />
        </Head>
        <LandingHeader />
        <LandingSection bgClass="relative">
          <>
            <RadialBlur />
            <div className="space-y-12 text-center pt-32 pb-16">
              <div className="space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl">
                <h1 className="!text-4xl font-bold tracking-tight sm:!text-5xl mb-8 text-blue-600">Windmill Certified Partners</h1>
                <p className="text-lg">Windmill Certified Partners are third-parties such as consultancies that are Windmill experts and help other organizations implement specific use cases end-to-end. All details on <a href="/docs/misc/partners" target="_blank">docs</a>.</p>
              </div>
            </div>
          </>
        </LandingSection>
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-20">
          <h2 className="leading-9 mb-6 text-3xl">How to become a certified partner</h2>
          <div className="text-base font-normal text-gray-500 dark:text-gray-200 mt-12 flex flex-col gap-4">
            <p>Any organization is welcome to apply to Windmill's partnership program.</p>
            <p>Anyone can provide services to organizations that are using Windmill, but certified partners benefit from greater visibility and trust from customers.</p>
            <p>Windmill being a broad product, we will define certifications for skills that partners can apply to. For each of those skills they apply to, partners will be tested.</p>
            <p>More details on <a href="/docs/misc/partners#how-to-become-a-certified-partner" target="_blank">docs</a>.</p>
          </div>
        </section>
        <div className="bg-gray-50 py-12 md:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <PartnersCatalog />
          </div>
        </div>
        <Footer />
      </main>
    </LayoutProvider>
  );
}