import React, { useEffect, useState } from 'react';
import Footer from '@theme-original/Footer'
import BrowserOnly from '@docusaurus/BrowserOnly';
import useInkeepSettings from '../utils/useInkeepSettings';

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
    stylesheetUrls: ['/css/inkeep-style-overrides.css'],
    baseSettings,
    aiChatSettings,
    searchSettings
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
