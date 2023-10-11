import React, { useEffect, useState } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import useInkeepSettings from '../utils/useInkeepSettings';
import '@inkeep/widgets-migration/styles.css';

export default function SearchBarWrapper() {
  const [SearchBar, setSearchBar] = useState(null);

  useEffect(() => {
    (async () => {
      const { InkeepSearchBar } = await import('@inkeep/widgets-migration');
      setSearchBar(() => InkeepSearchBar);
    })();
  }, []);

  const { baseSettings, aiChatSettings } = useInkeepSettings();

  const searchBarProps = {
    baseSettings,
    aiChatSettings,
  };

  return (
    <div className="Inkeep-Search">
      <BrowserOnly fallback={<div></div>}>
        {() => {
          return SearchBar ? <SearchBar {...searchBarProps} /> : <div></div>;
        }}
      </BrowserOnly>
    </div>
  );
}