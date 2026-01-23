import React from 'react';
import styles from './styles.module.css';

// Roadmap data
const roadmapItems = [
	{
		title: 'Dedicated workers v2',
		issueLink: 'https://github.com/windmill-labs/windmill/issues/5337',
		description:
			'Dedicated workers are currently a setting for individual scripts, flows and worker groups. A dedicated worker can only be dedicated to one script or flow. We mean to change that so that in the extreme case, it can handle a full workspace.\n\nWe want them to now have a configuration, let\'s call it the dedicated worker configurations that select all the flows and scripts (potentially apps) it will be dedicated to:\nfor all those it needs to do a compaction for ts and python where it will essentially route internally the job to the right subfunction based on job path which mean all those scripts can now run on the same runtime and we have at most 2 running runtimes (bun, python) on a dedicated worker. Those configuration can be deployed and each deployment will have a deployment version and a status . It corresponds to the status of creating the single lockfile for ts and single lockfile for python. If we have incompatible reqs for different scripts it will fail otherwise it pass.\n\nInstead of having to declare if a script or flow is ran on dedicated worker on the script or flow, they will be automatically updated when they are part of a successful deployment of a worker config such that their tag become dedicated:<dedicated_worker_config_name>\nThe creation of the compacted view is the "hard part". Once we have those, we can use our normal traversers to generated or fail to generate the single lockfile.'
	},
	{
		title: 'Free form flows',
		issueLink: 'https://github.com/windmill-labs/windmill/issues/5435',
		description: 'Free positioning of nodes'
	},
	{
		title: 'Workflow as code v2',
		issueLink: '',
		description:
			'Using a syntax similar to mastra/cloudflare workflows for better Workflow As Code support'
	},
	{
		title: 'Local Windmill execution',
		category: 'Developer',
		issueLink: '',
		description:
			'Investigate having Windmill work locally for local workflow and script execution allowing better DX and AI agents to have immediate local feedback.'
	},
	{
		title: 'Full wmill lint for agents',
		category: 'Developer',
		issueLink: '',
		description:
			'Implement a full wmill lint to be used as a complete feedback tool for agents locally + clear OpenAPI specs for each kind of items writable locally by agents, for improved local dev.'
	},
	{
		title: 'Unit tests support',
		category: 'Developer',
		issueLink: '',
		description:
			'Investigate unit tests with Windmill, either only guidance for local tests or/and supporting it as a first class concept in Windmill.'
	},
	{
		title: 'True IaC support',
		category: 'Backend',
		issueLink: '',
		description: 'Full instance config can be set using yaml in the helm chart synced with the DB.'
	},
	{
		title: 'Full-code App GA',
		category: 'UI',
		issueLink: '',
		description: 'Finish the latest full-code app nits and move from Beta to General Availability'
	},
	{
		title: 'Extend multiplayer to flows and apps',
		issueLink: '',
		description: 'Extend multiplayer working for scripts to flow and apps.'
	},
	{
		title: 'Native triggers for common external services',
		category: 'Backend',
		issueLink: '',
		description:
			'Native triggers support to allow setting Github/Nextcloud/GWorkspace events as direct triggers by setting the webhooks on the external service, and monitor their liveness'
	},
	{
		title: 'Single shard performance focus',
		category: 'Backend',
		issueLink: '',
		description: 'Performance focus for low hanging fruits of single shards'
	},
	{
		title: 'Multi-shard support for unlimited scalability',
		category: 'Backend',
		issueLink: '',
		description: 'Support multi-shards for unlimited scalability'
	},
	{
		title: 'Ruleset for deployment rules',
		category: 'Backend',
		issueLink: '',
		description:
			'Ruleset for deployment rules to match Github rules (read-only prod workspaces, approver rules, etc)'
	},
	{
		title: 'Data tables/PostgreSQL runtime v2',
		category: 'Backend',
		issueLink: '',
		description:
			'Postgresql runtime v2 to remove the need to cast trivial types and enhance usability'
	},
	{
		title: 'Hub search v2 + AI generation for steps',
		category: 'AI',
		issueLink: '',
		description: 'Better search from hub + better AI generation for steps.'
	},
	{
		title: 'Hide sensitive values from logs',
		category: 'Backend',
		issueLink: 'https://github.com/windmill-labs/windmill/issues/5450',
		description: `SDK clients should automatically propagate to the workers (maybe using a special pattern in stdout) that there is some strings that are sensitive because they correspond to secrets pulled with getResource and getValue. Additionally, workers should be able to have a list of values to consider secrets synced from an external source-of-truth. Those sensitive values would always be masked in logs.`
	}
];

// Color categories based on types of features
const categoryColors = {
	Default: '#f5f5f5', // White smoke
	Languages: '#add8e6', // Light blue
	Integration: '#1D4ED8', // Blue
	Developer: '#7f96ad', // Slate gray
	Backend: '#ced6f2', // Lavender
	UI: '#87cefa', // Light sky blue
	AI: '#818CF8' // Purple
};

// Assign categories to items if not already defined
const categorizedItems = roadmapItems.map((item) => {
	// If category is already defined in the item, use it
	if (item.category) {
		return item;
	}

	let category = 'Default';

	// Simple keyword-based categorization
	if (item.title.toLowerCase().includes('ai')) {
		category = 'AI';
	} else if (
		item.title.toLowerCase().includes('ui') ||
		item.title.toLowerCase().includes('react') ||
		item.title.toLowerCase().includes('drawable')
	) {
		category = 'UI';
	} else if (
		item.title.toLowerCase().includes('workers') ||
		item.title.toLowerCase().includes('database') ||
		item.title.toLowerCase().includes('pipelines') ||
		item.title.toLowerCase().includes('sharding')
	) {
		category = 'Backend';
	} else if (
		item.title.toLowerCase().includes('debugger') ||
		item.title.toLowerCase().includes('dev experience')
	) {
		category = 'Developer';
	} else if (
		item.title.toLowerCase().includes('openapi') ||
		item.title.toLowerCase().includes('integration') ||
		item.title.toLowerCase().includes('http')
	) {
		category = 'Integration';
	} else if (
		item.title.toLowerCase().includes('java') ||
		item.title.toLowerCase().includes('ruby') ||
		item.title.toLowerCase().includes('ansible') ||
		item.title.toLowerCase().includes('python') ||
		item.title.toLowerCase().includes('typescript')
	) {
		category = 'Languages';
	}

	return {
		...item,
		category
	};
});

function WindmillRoadmap() {
	// State to track which cards have truncated content
	const [truncatedItems, setTruncatedItems] = React.useState({});

	// Reference to check text heights
	const textRefs = React.useRef({});

	// Check if content is truncated after component mounts
	React.useEffect(() => {
		const newTruncatedItems = {};

		// Give DOM time to render
		setTimeout(() => {
			Object.keys(textRefs.current).forEach((key) => {
				const element = textRefs.current[key];
				if (element) {
					// Check if scrollHeight is greater than clientHeight
					// If it is, the text is truncated
					const isTruncated = element.scrollHeight > element.clientHeight;
					newTruncatedItems[key] = isTruncated;
				}
			});

			setTruncatedItems(newTruncatedItems);
		}, 100);
	}, []);

	const renderTimeline = () => {
		// Single section "Next 6 months" with all items
		return (
			<div className={styles.timeline}>
				<div className={styles.monthGroup}>
					<div className={styles.monthMarker}></div>
					<div className={styles.monthLabel}>Next 6 months</div>

					{categorizedItems.map((item, index) => {
						const itemKey = `next-${index}`;

						return (
							<div
								key={itemKey}
								className={`${styles.timelineCard} ${styles.right} ${
									item.important ? styles.important : ''
								}`}
							>
								<div
									className={styles.cardContent}
									style={{
										borderColor: categoryColors[item.category] || categoryColors.Default
									}}
								>
									{item.important && <div className={styles.importantBadge}>★</div>}
									<h3 className={styles.cardTitle}>
										{item.title}
										<span className={styles.cardCategory}>
											{item.category} &nbsp; &nbsp;
											{item.issueLink && (
												<a
													className={styles.detailLink}
													href={item.issueLink}
													target="_blank"
													rel="noopener noreferrer"
												>
													<svg
														height="16"
														width="16"
														viewBox="0 0 16 16"
														fill="currentColor"
														style={{ verticalAlign: 'middle' }}
													>
														<path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
													</svg>
												</a>
											)}
										</span>
									</h3>

									<div className={styles.cardPreviewContainer}>
										<div
											ref={(el) => (textRefs.current[itemKey] = el)}
											className={`${styles.cardText} ${
												truncatedItems[itemKey] ? styles.truncated : ''
											} text-gray-500 dark:text-gray-300`}
										>
											{item.description.split('\n').map((line, i) => (
												<React.Fragment key={i}>
													{line}
													<br />
												</React.Fragment>
											))}
										</div>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		);
	};

	return (
		<div className={styles.roadmapContainer}>
			<div className={styles.container}>
				<div style={{ marginBottom: '1rem', color: 'var(--ifm-color-primary-dark)' }}>
					For what’s been shipped recently, see the <a href="/changelog">changelog</a>.
				</div>
				{renderTimeline()}
			</div>
		</div>
	);
}

export default WindmillRoadmap;
