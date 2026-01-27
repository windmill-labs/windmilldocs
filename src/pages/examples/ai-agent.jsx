import React from 'react';
import ExampleLayout from '../../landing/ExampleLayout';
import { getExampleBySlug } from '../../landing/examplesData';

export default function AIAgentExample() {
	const example = getExampleBySlug('ai-agent');
	return <ExampleLayout example={example} />;
}
