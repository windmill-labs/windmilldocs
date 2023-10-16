import React, { useEffect, useState } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import useInkeepSettings from '../utils/useInkeepSettings';

export default function SearchBarWrapper() {
  const [SearchBar, setSearchBar] = useState(null);
  const [Shadow, setShadow] = useState(null);

  useEffect(() => {
    (async () => {
      const { InkeepSearchBar } = await import('@inkeep/widgets');
      setSearchBar(() => InkeepSearchBar);
    })();
    (async () => {
      const { InkeepShadow } = await import('@inkeep/widgets');
      setShadow(() => InkeepShadow);
    })();
  }, []);

  const { baseSettings, aiChatSettings, searchSettings } = useInkeepSettings();

  const searchBarProps = {
    baseSettings,
    aiChatSettings,
    searchSettings
  };

  return (
    <div className="Inkeep-Search">
      <BrowserOnly fallback={<div></div>}>
        {() => {
          return SearchBar && Shadow ? <Shadow><SearchBar {...searchBarProps} /> </Shadow>: <div></div>;
        }}
      </BrowserOnly>
    </div>
  );
}
