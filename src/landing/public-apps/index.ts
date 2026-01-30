export * from './types';
export { aiAgentData } from './ai-agent';

// Map of slug to code data for easy lookup
import { aiAgentData } from './ai-agent';
import { PublicAppCodeData } from './types';

export const publicAppCodeDataMap: Record<string, PublicAppCodeData> = {
	'ai-agent': aiAgentData,
};

export function getPublicAppCodeData(slug: string): PublicAppCodeData | undefined {
	return publicAppCodeDataMap[slug];
}
