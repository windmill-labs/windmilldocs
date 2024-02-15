import React, { createContext, useContext, useState } from 'react';
import ScriptSection from '../landing/ScriptSection';
import Footer from '../landing/Footer';
import Head from '@docusaurus/Head';
import LandingHeader from '../landing/LandingHeader';
import LayoutProvider from '@theme/Layout/Provider';
import BrowserOnly from '@docusaurus/BrowserOnly';

const DeveloperModeContext = createContext();

export function useDeveloperMode() {
  return useContext(DeveloperModeContext);
}

export { DeveloperModeContext };

function CustomPageHeader() {
  const [developerMode, setDeveloperMode] = useState(false);

  return (
    <DeveloperModeContext.Provider
      value={{
        developerMode: developerMode,
        setDeveloperMode: setDeveloperMode,
      }}
    >
      <LandingHeader />
      <ScriptSection />
    </DeveloperModeContext.Provider>
  );
}

export default function CustomPage() {
  return (
    <LayoutProvider>
      <main>
        <Head>
          <title>Custom Page | Windmill</title>
          <meta name="title" content="Custom Page Title" />
          <meta
            name="description"
            content="Custom page description."
          />
        </Head>
        <BrowserOnly fallback={<div>Loading...</div>}>
          {() => <CustomPageHeader />}
        </BrowserOnly>
        <Footer />
      </main>
    </LayoutProvider>
  );
}
