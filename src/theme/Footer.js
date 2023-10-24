import React, { useEffect, useState } from 'react';
import Footer from '@theme-original/Footer'
import BrowserOnly from '@docusaurus/BrowserOnly';
import useInkeepSettings from '../utils/useInkeepSettings';

const cssOverrides = `
  [data-theme='dark'] .ikp-floating-button {
    background: #353e52;
    color: white;
  }

  .ikp-floating-button {
    background: #F3F6F8;
    color: var(--inkeep-colors-inkeep-primary-text-subtle);
  }
`;

const stylesheets = [
  <style key="inkeep-overrides">
    {cssOverrides}
  </style>
];


export default function FooterWrapper(props) {
  const [ChatButton, setChatButton] = useState(null);

  useEffect(() => {
    (async () => {
      const { InkeepChatButton } = await import('@inkeep/widgets');
      setChatButton(() => InkeepChatButton);
    })();
  }, []);

  const {
    baseSettings,
    aiChatSettings,
    searchSettings,
  } = useInkeepSettings();

  const chatButtonProps = {
    stylesheets,
    baseSettings,
    aiChatSettings,
    searchSettings,
    chatButtonType: 'ICON_TEXT',
    modalSettings: {
      areOpenHotKeysDisabled: true,
    }
  };

  return (
    <>
      <BrowserOnly fallback={<div />}>
        {() => {
          return ChatButton ? <ChatButton {...chatButtonProps} />: <div />;
        }}
      </BrowserOnly>
      <Footer {...props} />
    </>
  )
}
