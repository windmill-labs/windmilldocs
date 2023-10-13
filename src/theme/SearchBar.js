import React, { useEffect, useState } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { useColorMode } from '@docusaurus/theme-common';
import useInkeepSettings from '../utils/useInkeepSettings';

export default function SearchBarWrapper() {
  const [SearchBar, setSearchBar] = useState(null);
  const [Shadow, setShadow] = useState(null);

  useEffect(() => {
    (async () => {
      const { InkeepSearchBar } = await import('@inkeep/widgets-migration');
      setSearchBar(() => InkeepSearchBar);
    })();
    (async () => {
      const { InkeepShadow } = await import('@inkeep/widgets-migration');
      setShadow(() => InkeepShadow);
    })();
  }, []);

  const { baseSettings, aiChatSettings } = useInkeepSettings();
  const { colorMode } = useColorMode();

  const searchBarProps = {
    baseSettings: {
      ...baseSettings,
      theme: {
        ...baseSettings.theme,
        colorMode: {
          ...baseSettings.theme.colorMode,
          forcedColorMode: colorMode === 'dark' ? 'dark' : 'light'
        }
      }
    },
    aiChatSettings,
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
