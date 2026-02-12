import React from 'react';
import CaseStudyLayout from '../../components/case-studies/CaseStudyLayout';
import PantherLabsContent, { frontMatter } from './panther-labs-content.mdx';
import { pantherLabsCaseStudy } from '../../data/case-studies/panther-labs';

export default function PantherLabsCaseStudyPage() {
	return <CaseStudyLayout Content={PantherLabsContent} frontMatter={frontMatter} caseStudyData={pantherLabsCaseStudy} />;
}
