import React from 'react';
import styles from './styles.module.css';

// Roadmap data
const roadmapItems = [
	{
		title: 'Free form flows',
		issueLink: 'https://github.com/windmill-labs/windmill/issues/5435',
		description: 'Free positioning of nodes'
	},
	{
		title: 'Local Windmill execution',
		category: 'Developer',
		issueLink: '',
		description:
			'Investigate having Windmill work locally for local workflow and script execution allowing better DX and AI agents to have immediate local feedback.'
	},
	{
		title: 'Improve wmill lint for agents',
		category: 'Developer',
		issueLink: '',
		description:
			'The wmill lint command already works for v0. Improve it to be a more complete feedback tool for agents locally + clear OpenAPI specs for each kind of items writable locally by agents, for improved local dev.'
	},
	{
		title: 'Unit tests support',
		category: 'Developer',
		issueLink: '',
		description:
			'Investigate unit tests with Windmill, either only guidance for local tests or/and supporting it as a first class concept in Windmill.'
	},
	{
		title: 'Extend multiplayer to flows and apps',
		issueLink: '',
		description: 'Extend multiplayer working for scripts to flow and apps.'
	},
	{
		title: 'Add more native triggers',
		category: 'Backend',
		issueLink: '',
		description:
			'Native triggers for Nextcloud and Google are already done. Next steps are adding native triggers for GitHub, Linear, etc.'
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
		title: 'Add more rulesets',
		category: 'Backend',
		issueLink: '',
		description:
			'Add more rulesets for deployment rules to match Github rules (read-only prod workspaces, approver rules, etc)'
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
