import React from 'react';
import CaseStudyLayout from '../../components/case-studies/CaseStudyLayout';
import ZoomContent, { frontMatter } from './zoom-content.mdx';

export default function ZoomCaseStudyPage() {
	return <CaseStudyLayout Content={ZoomContent} frontMatter={frontMatter} />;
}
