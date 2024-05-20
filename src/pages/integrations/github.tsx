import React from 'react';

import {
	BookMarked,
	CircleDot,
	GitPullRequestArrow,
	Tag,
    Star,
	PlusCircle
} from 'lucide-react';
import Solution from '../../components/Solutions';

export default function Notion() {
	const color = '#000000';
	const name = 'GitHub';
	const website = 'https://github.com/';

	const data = {
		title: `APIs, workflows and UIs with ${name}`,
		subtitle: `Create workflows, data pipelines, endpoints or admin panels that interact with ${name}.`,
		logo: '/third_party_logos/github.svg',
		description: (
			<div className="flex flex-col gap-4">
				<p>
					<a href={website} target="_blank">
						<strong>
							<span style={{ color }}>{name}</span>
						</strong>
					</a>{' '}
					is the most popular platform for version control and collaboration on software development projects.
				</p>
				<p>
					Connecting <a href="/">
						<strong>
							<span style={{ color: '#3b82f6' }}>Windmill</span>
						</strong>
					</a>{' '} to <span> {name}</span> takes a few seconds and lets you build
					internal tools from it and integrate with any other platform.
				</p>
                <p>
					Windmill also embeds GitHub with <a href="/windmill_ai">
						<strong>
							<span style={{ color: '#3b82f6' }}>Git Sync</span>
						</strong>
					</a>{' '} to connect a Windmill workspace to a Git repository to automatically commit and push scripts, flows and apps to the repository on each deploy.
				</p>
				<p>
					From scripts supported in multiple languages, build UIs and flows that you can monitor and
					trigger on demand, by schedule or webhooks.
				</p>
			</div>
		),
		integrations_sub_title: `Write any script, flow or app targeting ${name} API, or pick them from Windmill Hub community library. Windmill supports scripts in TypeScript, Python, Go, PHP, Bash and SQL.`,
		hubIntegrations: [
			{
                title: "Get Repository",
                link: "https://hub.windmill.dev/scripts/github/769/get-repo-github",
                description: "Fetch GitHub repository details.",
                icon: BookMarked
            },
            {
                title: "Create Issue",
                description: "Create GitHub issue with details.",
                link: "https://hub.windmill.dev/scripts/github/768/create-issue-github",
                icon: CircleDot
            },
            {
                title: "Create a Pull Request",
                link: "https://hub.windmill.dev/scripts/github/3292/create-a-pull-request-github",
                description: "Create a pull request for a specified repository.",
                icon: GitPullRequestArrow
            },
            {
                title: "Get the latest Release",
                link: "https://hub.windmill.dev/scripts/github/3323/get-the-latest-release-github",
                description: "View the latest published full release for the repository.",
                icon: Tag
            },
            {
                title: "Notify of new Github repo Stars",
                link: "https://hub.windmill.dev/scripts/github/1208/notify-of-new-github-repo-stars-github",
                description: "Trigger script that lists GitHub repo starrers in descending order.",
                icon: Star
            },
            {
                title: "List newly added issues",
                link: "https://hub.windmill.dev/scripts/github/1456/list-newly-added-issues-github",
                description: "Trigger script to periodically get the newly added issues of a GitHub repository.",
                icon: PlusCircle
            }            
		]
	};

	return <Solution data={data} name={name} color={color} website={website}  />;
}
