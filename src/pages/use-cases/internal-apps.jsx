import React from 'react';
import UseCaseLayout from '../../components/use-cases/UseCaseLayout';
import Content, { frontMatter } from './internal-apps-content.mdx';
import { internalAppsUseCase } from '../../data/use-cases/internal-apps';

export default function InternalAppsPage() {
	return <UseCaseLayout Content={Content} frontMatter={frontMatter} useCaseData={internalAppsUseCase} />;
}
