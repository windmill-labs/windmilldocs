import React from 'react';
import ExampleLayout from '../../landing/ExampleLayout';
import { getExampleBySlug } from '../../landing/examplesData';

export default function CustomerSupportExample() {
	const example = getExampleBySlug('customer-support');
	return <ExampleLayout example={example} />;
}
