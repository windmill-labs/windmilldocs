import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useColorMode } from '@docusaurus/theme-common';
import {
  InkeepAIChatSettings,
  InkeepSearchSettings,
  InkeepWidgetBaseSettings,
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
    theme: {
      tokens: {
        colors: {
          'grayDark.900': '#1e232e',
        },
      },
      colorMode: {
        forcedColorMode: colorMode === 'dark' ? 'dark' : 'light'
      },
      primaryColors: {
        textColorOnPrimary: '#ffffff',
      },
      components: {
        SearchBarTrigger: {
          defaultProps: {
            size: 'expand',
          },
        }
      }
    }
  };

  const aiChatSettings: InkeepAIChatSettings = {
    botAvatarSrcUrl: '/img/windmill.svg',
    quickQuestions: [
      'How do I automatically trigger a flow every 24 hours?',
      'Can I use an Azure auth provider for authenticating users?',
      'How do I run Windmill locally with Bun?',
    ],
    toggleButtonSettings: {
      isChatModeToggleEnabled: true,
      chatModeToggleValue: 'TURBO'
    }
  };

  const searchSettings: InkeepSearchSettings = {
    placeholder: 'Search...',
    tabSettings: {
      isAllTabEnabled: true,
    },
  }

  return { baseSettings, aiChatSettings, searchSettings };
};

export default useInkeepSettings;