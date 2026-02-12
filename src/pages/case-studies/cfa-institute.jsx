import React from 'react';
import CaseStudyLayout from '../../components/case-studies/CaseStudyLayout';
import CFAInstituteContent, { frontMatter } from './cfa-institute-content.mdx';
import { cfaInstituteCaseStudy } from '../../data/case-studies/cfa-institute';

export default function CFAInstituteCaseStudyPage() {
	return <CaseStudyLayout Content={CFAInstituteContent} frontMatter={frontMatter} caseStudyData={cfaInstituteCaseStudy} />;
}
