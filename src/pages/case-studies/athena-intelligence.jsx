import React from 'react';
import CaseStudyLayout from '../../components/case-studies/CaseStudyLayout';
import AthenaIntelligenceContent, { frontMatter } from './athena-intelligence-content.mdx';

export default function AthenaIntelligenceCaseStudyPage() {
	return <CaseStudyLayout Content={AthenaIntelligenceContent} frontMatter={frontMatter} />;
}
