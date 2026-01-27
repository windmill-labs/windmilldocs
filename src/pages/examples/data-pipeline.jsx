import React from 'react';
import ExampleLayout from '../../landing/ExampleLayout';
import { getExampleBySlug } from '../../landing/examplesData';

export default function DataPipelineExample() {
	const example = getExampleBySlug('data-pipeline');
	return <ExampleLayout example={example} />;
}
