import React, { useEffect, useState } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import useInkeepSettings from '../utils/useInkeepSettings';

export default function SearchBarWrapper() {
  const [SearchBar, setSearchBar] = useState(null);

  useEffect(() => {
    (async () => {
      const { InkeepSearchBar } = await import('@inkeep/widgets');
      setSearchBar(() => InkeepSearchBar);
    })();
  }, []);

  const {
    baseSettings,
    aiChatSettings,
    searchSettings,
  } = useInkeepSettings();

  const searchBarProps = {
    baseSettings,
    aiChatSettings,
    searchSettings,
    modalSettings: {
      openShortcutKey: 'K',
    },
  };

  return (
    <div className="Inkeep-Search">
      <BrowserOnly fallback={<div />}>
        {() => {
          return SearchBar ? <SearchBar {...searchBarProps} />: <div />;
        }}
      </BrowserOnly>
    </div>
  );
}
