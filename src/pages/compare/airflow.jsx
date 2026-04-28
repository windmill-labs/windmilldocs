import React from 'react';
import UseCaseLayout from '../../components/use-cases/UseCaseLayout';
import Content, { frontMatter } from './airflow-content.mdx';
import { airflowCompare } from '../../data/compare/airflow';

export default function CompareAirflowPage() {
	return <UseCaseLayout Content={Content} frontMatter={frontMatter} useCaseData={airflowCompare} />;
}
