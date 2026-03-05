import React from 'react';
import Link from '@docusaurus/Link';
import { ArrowLeft } from 'lucide-react';
import { useLocation } from '@docusaurus/router';

const USE_CASE_LABELS = {
	'internal-tools': 'Internal tools',
	'data-pipelines': 'Data pipelines',
	'ai-agents': 'AI agents',
	'triggers': 'Triggers',
	'workflow-automation': 'Workflows',
};

export default function CaseStudyBackLink() {
	const location = useLocation();
	const params = new URLSearchParams(location.search);
	const from = params.get('from');
	const label = from && USE_CASE_LABELS[from];

	return (
		<Link
			to={label ? `/use-cases/${from}` : '/case-studies'}
			className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 mb-8 !no-underline"
		>
			<ArrowLeft className="w-4 h-4" />
			{label ? `Back to ${label}` : 'Back to Case studies'}
		</Link>
	);
}
