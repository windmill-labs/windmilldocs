import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useColorMode } from '@docusaurus/theme-common';
import type { ThemeConfig } from '@docusaurus/preset-classic';
import type { PrismTheme } from 'prism-react-renderer';

import {
	InkeepAIChatSettings,
	InkeepSearchSettings,
	InkeepWidgetBaseSettings
} from '@inkeep/widgets';

type InkeepIdentifierSettings = {
	apiKey: string;
	integrationId: string;
	organizationId: string;
};

type InkeepSharedSettings = {
	baseSettings: InkeepWidgetBaseSettings;
	aiChatSettings: InkeepAIChatSettings;
	searchSettings: InkeepSearchSettings;
};

const useInkeepSettings = (): InkeepSharedSettings => {
	const { siteConfig } = useDocusaurusContext();
	const { colorMode } = useColorMode();
	const inkeepBaseConfig = siteConfig.customFields.inkeepCredentials as InkeepIdentifierSettings;
	const themeConfig: ThemeConfig = siteConfig.themeConfig;
	const { theme, darkTheme } = themeConfig?.prism || {};

	const baseSettings: InkeepWidgetBaseSettings = {
		apiKey: inkeepBaseConfig.apiKey || '',
		integrationId: inkeepBaseConfig.integrationId,
		organizationId: inkeepBaseConfig.organizationId,
		organizationDisplayName: 'Windmill',
		primaryBrandColor: '#3b82f6',
		optOutAnalyticalCookies: true,
		env: 'PRODUCTION',
		consoleDebugLevel: 0,
		remoteErrorLogsLevel: 1,
		highlighterTheme: {
			lightTheme: theme as PrismTheme,
			darkTheme: darkTheme as PrismTheme
		},
		breadcrumbRules: {
			urlToBreadcrumbMapper: [
				{
					matchingRule: {
						ruleType: 'PartialUrl',
						partialUrl: 'app.windmill.dev/openapi.html'
					},
					replaceLeading: true,
					breadcrumbName: 'API'
				},
				{
					matchingRule: {
						ruleType: 'PartialUrl',
						partialUrl: 'windmill.dev/blog',
						maxNChildSubpaths: 10
					},
					replaceLeading: true,
					breadcrumbName: 'Blog'
				},
				{
					matchingRule: {
						ruleType: 'PartialUrl',
						partialUrl: 'windmill.dev'
					},
					replaceLeading: false,
					breadcrumbName: 'Home'
				}
			],
			prependBreadcrumbs: [
				{
					matchingRule: {
						UrlMatch: {
							ruleType: 'PartialUrl',
							partialUrl: 'windmill.dev/docs'
						}
					},
					breadcrumbToPrepend: 'Docs'
				}
			]
		},
		theme: {
			tokens: {
				colors: {
					'gray.200': '#f3f6f8',
					'gray.300': '#e0e7ed',
					'gray.400': '#c5d0dc',
					'gray.500': '#9dafc3',
					'gray.600': '#6e87a2',
					'gray.700': '#475973',
					'gray.800': '#3e4c60',
					'gray.900': '#2e3440',
					'grayDark.200': '#6e87a2',
					'grayDark.700': '#394251',
					'grayDark.800': '#2e3440',
					'grayDark.900': '#1e232e'
				}
			},
			colorMode: {
				forcedColorMode: colorMode === 'dark' ? 'dark' : 'light'
			},
			primaryColors: {
				textColorOnPrimary: '#ffffff'
			},
			components: {
				SearchBarTrigger: {
					defaultProps: {
						size: 'expand'
					}
				}
			}
		}
	};

	const aiChatSettings: InkeepAIChatSettings = {
		botAvatarSrcUrl: '/img/windmill.svg',
		quickQuestions: [
			'How do I automatically trigger a flow every 24 hours?',
			'Can I use an Azure auth provider for authenticating users?',
			'How do I run Windmill locally with Bun?'
		],
		toggleButtonSettings: {
			isChatModeToggleEnabled: true,
			chatModeToggleValue: 'TURBO'
		}
	};

	const searchSettings: InkeepSearchSettings = {
		placeholder: 'Search...',
		debounceTime: 0,
		tabSettings: {
			isAllTabEnabled: false,
			rootBreadcrumbsToUseAsTabs: ['Docs', 'Blog', 'API', 'Home', , 'GitHub']
		}
	};

	return { baseSettings, aiChatSettings, searchSettings };
};

export default useInkeepSettings;
