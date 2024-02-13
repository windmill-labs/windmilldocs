import React, { useEffect, useState } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import useInkeepSettings from '../../utils/useInkeepSettings';

function Footer() {
	const [ChatButton, setChatButton] = useState(null);

	useEffect(() => {
		(async () => {
			const { InkeepChatButton } = await import('@inkeep/widgets');
			setChatButton(() => InkeepChatButton);
		})();
	}, []);

	const { baseSettings, aiChatSettings, searchSettings, stylesheets } = useInkeepSettings();

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
