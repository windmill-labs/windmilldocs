import React from 'react';
import GitHubButton from 'react-github-btn';
import { useColorMode } from '@docusaurus/theme-common';

export default function GithubStarCount() {
	const { colorMode } = useColorMode();
	return (
		<GitHubButton
			href="https://github.com/windmill-labs/windmill"
			data-size="large"
			data-show-count="true"
			aria-label="Star buttons/github-buttons on GitHub"
			data-color-scheme={colorMode == 'dark' ? 'dark' : 'light'}
		>
			Stars
		</GitHubButton>
	);
}
