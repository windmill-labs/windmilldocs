import React from 'react';
import CaseStudyLayout from '../../components/case-studies/CaseStudyLayout';
import CFAInstituteContent, { frontMatter } from './cfa-institute-content.mdx';

export default function CFAInstituteCaseStudyPage() {
	return <CaseStudyLayout Content={CFAInstituteContent} frontMatter={frontMatter} />;
}
