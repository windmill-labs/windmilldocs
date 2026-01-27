import React from 'react';
import ExampleLayout from '../../landing/ExampleLayout';
import { getExampleBySlug } from '../../landing/examplesData';

export default function PaymentDashboardExample() {
	const example = getExampleBySlug('payment-dashboard');
	return <ExampleLayout example={example} />;
}
