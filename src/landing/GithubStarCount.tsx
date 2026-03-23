import React from 'react';
import GitHubButton from 'react-github-btn';

export default function GithubStarCount() {
	return (
		<>
			<span className="hidden dark:inline">
				<GitHubButton
					href="https://github.com/windmill-labs/windmill"
					data-size="large"
					data-show-count="true"
					aria-label="Star buttons/github-buttons on GitHub"
					data-color-scheme="dark"
				>
					&nbsp;OSS
				</GitHubButton>
			</span>
			<span className="inline dark:hidden">
				<GitHubButton
					href="https://github.com/windmill-labs/windmill"
					data-size="large"
					data-show-count="true"
					aria-label="Star buttons/github-buttons on GitHub"
					data-color-scheme="light"
				>
					&nbsp;OSS
				</GitHubButton>
			</span>
		</>
	);
}
