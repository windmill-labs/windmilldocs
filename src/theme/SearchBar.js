import React, { useEffect, useState } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import useInkeepSettings from '../utils/useInkeepSettings';

const cssOverrides = `
  .ikp-search-bar-trigger__container {
    padding-inline: var(--ikp-spacing-3);
  }
`;

const stylesheets = [
  <style key="inkeep-overrides">
    {cssOverrides}
  </style>
];


export default function SearchBarWrapper({
  className,
}) {
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
    stylesheets,
    baseSettings,
    aiChatSettings,
    searchSettings,
    modalSettings: {
      openShortcutKey: 'K',
    },
  };

  return (
    <div className={`inkeep-search ${className || ''}`}>
      <BrowserOnly fallback={<div />}>
        {() => {
          return SearchBar ? <SearchBar {...searchBarProps} />: <div />;
        }}
      </BrowserOnly>
    </div>
  );
}
