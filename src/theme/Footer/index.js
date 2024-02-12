import React from 'react';
import { useThemeConfig } from '@docusaurus/theme-common';
import FooterLinks from '@theme/Footer/Links';
import FooterLogo from '@theme/Footer/Logo';
import FooterCopyright from '@theme/Footer/Copyright';
import FooterLayout from '@theme/Footer/Layout';
import BrowserOnly from '@docusaurus/BrowserOnly';
import useInkeepSettings from '../../utils/useInkeepSettings';

function Footer() {
	const { footer } = useThemeConfig();
	if (!footer) {
		return null;
	}
	const { copyright, links, logo, style } = footer;

	// INKEEP

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

	// INKEEP

	return (
		<>
			<BrowserOnly fallback={<div />}>
				{() => {
					return ChatButton ? <ChatButton {...chatButtonProps} /> : <div />;
				}}
			</BrowserOnly>
			<FooterLayout
				style={style}
				links={links && links.length > 0 && <FooterLinks links={links} />}
				logo={logo && <FooterLogo logo={logo} />}
				copyright={copyright && <FooterCopyright copyright={copyright} />}
			/>
		</>
	);
}
export default React.memo(Footer);
