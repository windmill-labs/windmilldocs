import React from 'react';
import UseCaseLayout from '../../components/use-cases/UseCaseLayout';
import Content, { frontMatter } from './data-pipelines-content.mdx';
import { dataPipelinesUseCase } from '../../data/use-cases/data-pipelines';

export default function DataPipelinesPage() {
	return <UseCaseLayout Content={Content} frontMatter={frontMatter} useCaseData={dataPipelinesUseCase} />;
}
