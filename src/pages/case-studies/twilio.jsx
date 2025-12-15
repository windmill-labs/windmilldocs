import React from 'react';
import CaseStudyLayout from '../../components/case-studies/CaseStudyLayout';
import TwilioContent, { frontMatter } from './twilio-content.mdx';

export default function TwilioCaseStudyPage() {
	return <CaseStudyLayout Content={TwilioContent} frontMatter={frontMatter} />;
}
