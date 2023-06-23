import React from 'react';
import GitHubButton from 'react-github-btn';
import { useDeveloperMode } from '../pages';

export default function GithubStarCount() {
	const { developerMode } = useDeveloperMode();
	return (
		<GitHubButton
			href="https://github.com/windmill-labs/windmill"
			data-size="large"
			data-show-count="true"
			aria-label="Star buttons/github-buttons on GitHub"
			data-color-scheme={developerMode ? 'dark' : 'light'}
		>
			Stars
		</GitHubButton>
	);
}
