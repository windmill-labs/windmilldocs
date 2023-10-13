import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { InkeepAIChatSettings, InkeepWidgetBaseSettings } from '@inkeep/widgets-migration';


type InkeepIdentifierSettings = {
  apiKey: string;
  integrationId: string;
  organizationId: string;
};

type InkeepSharedSettings = {
  baseSettings: InkeepWidgetBaseSettings;
  aiChatSettings: InkeepAIChatSettings;
};

const useInkeepSettings = (): InkeepSharedSettings => {
  const { siteConfig } = useDocusaurusContext();
  const inkeepBaseConfig = siteConfig.customFields.inkeepCredentials as InkeepIdentifierSettings;

  const baseSettings: InkeepWidgetBaseSettings = {
    apiKey: inkeepBaseConfig.apiKey || '',
    integrationId: inkeepBaseConfig.integrationId,
    organizationId: inkeepBaseConfig.organizationId,
    organizationDisplayName: 'Windmill',
    primaryBrandColor: '#3b82f6',
    theme: {
    },
  };

  const aiChatSettings: InkeepAIChatSettings = {
    botName: 'Windmill',
  };

  return { baseSettings, aiChatSettings };
};

export default useInkeepSettings;