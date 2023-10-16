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
    theme: {
      tokens: {
        // colors: {
        //   'gray.50': '#f3f6f8',
        //   'gray.100': '#e0e7ed',
        //   'gray.200': '#c5d0dc',
        //   'gray.300': '#9dafc3',
        //   'gray.400': '#6e87a2',
        //   'gray.500': '#536c87',
        //   'gray.600': '#475973',
        //   'gray.700': '#3e4c60',
        //   'gray.800': '#394251',
        //   'gray.900': '#2e3440',
        //   'gray.950': '#1e232e',
        //   // 'gray.1000': '#181c24',
        // },
      },
      colorMode: {
        forcedColorMode: colorMode === 'dark' ? 'dark' : 'light'
      },
      // components: {
      //   SearchBarTrigger: {
      //     defaultProps: {
      //       variant: ''
      //     },
      //   }
      // },
    },
  };

  const aiChatSettings: InkeepAIChatSettings = {
    botName: 'Windmill',
  };

  const searchSettings: InkeepSearchSettings = {
    placeholder: 'Search...',
  }

  return { baseSettings, aiChatSettings, searchSettings };
};

export default useInkeepSettings;