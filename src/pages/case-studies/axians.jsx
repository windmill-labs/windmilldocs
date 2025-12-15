import React from 'react';
import CaseStudyLayout from '../../components/case-studies/CaseStudyLayout';
import AxiansContent, { frontMatter } from './axians-content.mdx';

export default function AxiansCaseStudyPage() {
	return <CaseStudyLayout Content={AxiansContent} frontMatter={frontMatter} />;
}
