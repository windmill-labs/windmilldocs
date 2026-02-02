import React from 'react';
import CaseStudyLayout from '../../components/case-studies/CaseStudyLayout';
import PantherLabsContent, { frontMatter } from './panther-labs-content.mdx';

export default function PantherLabsCaseStudyPage() {
	return <CaseStudyLayout Content={PantherLabsContent} frontMatter={frontMatter} />;
}
