import React from 'react';
import GitHubButton from 'react-github-btn';

export default function GithubStarCount() {
	return (
		<GitHubButton
			href="https://github.com/windmill-labs/windmill"
			data-size="large"
			data-show-count="true"
			aria-label="Star buttons/github-buttons on GitHub"
		>
			Stars
		</GitHubButton>
	);
}
