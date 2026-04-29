import React from 'react';
import Head from '@docusaurus/Head';
import LayoutProvider from '@theme/Layout/Provider';
import LandingSection from '../landing/LandingSection';
import LandingHeader from '../landing/LandingHeader';
import Footer from '../landing/Footer';
import RadialBlur from '../landing/RadialBlur';
import { EnvelopeIcon, LinkIcon } from '@heroicons/react/20/solid';

const roles = {
    "Common tree": {
      name: "Common tree",
      colors: "bg-blue-50 text-blue-700",
      link: "/docs/misc/partners#common-tree-mandatory-for-all-partners"
    },
    "App editor": {
      name: "App editor",
      colors: "bg-orange-50 text-orange-700 hover:text-orange-800",
      link: "/docs/misc/partners#build-and-maintain-complex-apps"
    },
    "ERP integration": {
      name: "ERP integration",
      colors: "bg-teal-50 text-teal-700 hover:text-teal-800",
      link: "/docs/misc/partners#erp-integration-and-automation"
    },
    "Version control and permissioning": {
      name: "Version control and permissioning",
      colors: "bg-purple-50 text-purple-700 hover:text-purple-800",
      link: "/docs/misc/partners#have-a-devstagingprod-setup-for-version-controls-and-permissioning-fit-for-larger-organizations"
    },
    "Worker groups": {
      name: "Worker groups",
      colors: "bg-green-50 text-green-700 hover:text-green-800",
      link: "/docs/misc/partners#maintain-a-complex-infrastructure-with-worker-groups-and-use-windmill-at-scale"
    },
    "AWS": {
      name: "AWS",
      colors: "bg-yellow-50 text-yellow-700 hover:text-yellow-800",
      link: "/docs/misc/partners#deploy-on-a-specific-infrastructure-provider-gcp-aws-azure"
    },
    "Fintech": {
      name: "Fintech",
      colors: "bg-pink-50 text-pink-700 hover:text-pink-800",
      link: "/docs/misc/partners#deploy-windmill-for-a-specific-industry"
    }
  };

const people = [
  {
    name: 'Betabit Consulting',
    description: "Betabit is an AI and software consultancy specializing in production-grade Windmill deployments. We've built and fully operationalized Windmill ecosystems - complex apps, AI workflows, big data pipelines, and infrastructure-as-code - for both small teams and large enterprise customers, with contributions merged upstream into Windmill OSS.",
    roles: ['Common tree', 'App editor', 'Version control and permissioning', 'Worker groups', 'AWS', 'Fintech'],
    email: 'hello@betabit.consulting',
    profile: 'https://betabit.consulting/',
    imageUrl: '/images/partners/bb-badge.png'
  },
  {
    name: 'CloudShapers',
    description: 'CloudShapers is a Dutch cloud consultancy specializing in automation for MSPs and enterprise platform teams. We implemented Windmill at Axians and other customers, building multi-tenant orchestration platforms with hundreds of users and thousands of daily executions.',
    roles: ['Common tree'],
    email: 'thierry.vanzantvoort@cloudshapers.nl',
    profile: 'https://www.linkedin.com/company/cloudshapers-b-v/',
    imageUrl: '/images/partners/cloudshapers.webp'
  },
  {
  name: 'Chris Edgington',
  description: 'Chris Edgington is a seasoned software architect and problem solver with over 30 years of experience, leveraging Windmill to host Autodesk API and ERP integrations for clients of his company EdgeCraft Studio.',
  roles: ['Common tree', 'ERP integration'],
  email: 'chris@edgecraftstudio.com',
  profile: 'https://www.linkedin.com/in/chris-edgington-46973533/',
  imageUrl: '/images/partners/chris-edgington.jpg'
},
{
  name: 'David Peter',
  description: 'David Peter is a TypeScript programmer and founder at Type Driven, a software development agency.',
  roles: ['Common tree', 'App editor'],
  email: 'david@type-driven.com',
  profile: 'https://www.linkedin.com/in/david-peter-498423280/',
  imageUrl: '/images/partners/davidpeter.jpg'
},
{
    name: 'José Governo Pais Neto',
    description: 'José Governo, CFA, CQF is from Brazil. José worked in an asset management firm where he used Windmill to build complex dashboard applications for his clients.',
    roles: ['Common tree', 'App editor'],
    email: 'jose@zenfin.tech',
    profile: 'https://www.linkedin.com/in/jose-governo/',
    imageUrl: '/images/partners/jose.jpeg',
},
{
    name: 'Stephan Fitzpatrick',
    description: 'Stephan Fitzpatrick, a veteran software and cloud consultant, leverages Windmill to build automation solutions for business clients, streamline his own operations, and even manage his home automation.',
    roles: ['Common tree'],
    email: 'stephan@knowsuchagency.com',
    profile: 'https://www.linkedin.com/in/fitzpatrickstephan/',
    imageUrl: '/images/partners/stphftzptrk.jpg'
}
];

function PartnersCatalog() {
    return (
        <ul role="list" className="grid grid-cols-1 gap-x-6 md:grid-cols-2 lg:grid-cols-3">
        {people.map((person) => (
            <li key={person.email} className="col-span-1 row-span-3 mb-6 grid [grid-template-rows:subgrid] rounded-lg bg-white dark:bg-[#1F232D] text-center shadow">
                <div className="px-8 pt-8 pb-2">
                    <img alt="" src={person.imageUrl} className="mx-auto h-32 w-32 flex-shrink-0 rounded-full" />
                    <h3 className="mt-6 text-sm font-medium text-gray-900 dark:text-white">{person.name}</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-200">{person.description}</p>
                </div>
                <div className="px-8 pt-3 pb-8 self-start">
                    {person.roles.map(role => (
                    <a key={role} href={roles[role].link} className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium mx-0.5 ${roles[role].colors}`}>
                        {role}
                    </a>
                    ))}
                </div>
                <div className="-mt-px flex divide-x divide-gray-200 border-t border-gray-200">
                    <div className="flex w-0 flex-1">
                        <a href={`mailto:${person.email}`} className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900 dark:text-white">
                        <EnvelopeIcon aria-hidden="true" className="h-5 w-5 text-gray-400 dark:text-gray-200" />
                        Email
                        </a>
                    </div>
                    <div className="-ml-px flex w-0 flex-1">
                        <a href={person.profile} className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900 dark:text-white">
                        <LinkIcon aria-hidden="true" className="h-5 w-5 text-gray-400 dark:text-gray-200" />
                        Profile
                        </a>
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
        <div className="bg-gray-50 dark:bg-gray-900 py-12 md:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <PartnersCatalog />
          </div>
        </div>
        <Footer />
      </main>
    </LayoutProvider>
  );
}