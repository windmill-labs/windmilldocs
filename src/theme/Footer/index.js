import React, { useEffect, useState } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import useInkeepSettings from '../../utils/useInkeepSettings';

const cssOverrides = `
  [data-theme='dark'] .ikp-floating-button {
    background: #353e52;
    color: white;
  }

  .ikp-floating-button {
    background: #ebedf0;
    color: var(--inkeep-colors-inkeep-primary-text-subtle);
  }
`;

const stylesheets = [<style key="inkeep-overrides">{cssOverrides}</style>];

function Footer() {
	const [ChatButton, setChatButton] = useState(null);

	useEffect(() => {
		(async () => {
			const { InkeepChatButton } = await import('@inkeep/widgets');
			setChatButton(() => InkeepChatButton);
		})();
	}, []);

	const { baseSettings, aiChatSettings, searchSettings } = useInkeepSettings();

	const chatButtonProps = {
		stylesheets,
		baseSettings,
		aiChatSettings,
		searchSettings,
		chatButtonType: 'ICON_TEXT',
		modalSettings: {
			areOpenHotKeysDisabled: true
		}
	};

	return (
		<BrowserOnly fallback={<div />}>
			{() => {
				return ChatButton ? <ChatButton {...chatButtonProps} /> : <div />;
			}}
		</BrowserOnly>
	);
}
export default React.memo(Footer);
