import React from 'react';
import PublicAppLayout from '../../landing/PublicAppLayout';
import { getPublicAppBySlug } from '../../landing/publicAppsData';

export default function AIAgentPublicApp() {
	const publicApp = getPublicAppBySlug('ai-agent');
	return <PublicAppLayout publicApp={publicApp} />;
}
