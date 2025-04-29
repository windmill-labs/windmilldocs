import React from 'react';
import styles from './styles.module.css';

// Roadmap data
const roadmapItems = [
	{
		title: 'Java support',
		month: 'March',
		category: 'Languages',
		issueLink: 'https://github.com/windmill-labs/windmill/issues/5430',
		description: '',
		important: true
	},
	{
		title: 'GCP PubSub support',
		month: 'March',
		category: 'Integration',
		issueLink: 'https://github.com/windmill-labs/windmill/issues/5445',
		description:
			'Currently, Windmill does not have a native support for GCP PubSub. It would be great to have a native support for GCP PubSub.'
	},
	{
		title: 'Backend side jsonschema validation of args',
		month: 'March',
		category: 'Backend',
		issueLink: 'https://github.com/windmill-labs/windmill/issues/5443',
		description:
			'Currently, the jsonschema validation of args is done on the frontend. This is a problem because there are no guarantees that the payload will actually respond the jsonschema'
	},
	{
		title: 'Dynamic table and column name for SQL',
		month: 'March',
		category: 'Languages',
		issueLink: 'https://github.com/windmill-labs/windmill/issues/5444',
		description:
			'Currently, SQL scripts can only have prepared statement parameters. It would be great to have dynamic table and column names.'
	},
	{
		title: 'Ansible improvements',
		month: 'April',
		category: 'Languages',
		issueLink: 'https://github.com/windmill-labs/windmill/issues/5431',
		description: ''
	},
	{
		title: 'Ruby support',
		month: 'June',
		category: 'Languages',
		issueLink: 'https://github.com/windmill-labs/windmill/issues/3201',
		description: ''
	},
	{
		title: 'Settable permissions within object storage by folders',
		month: 'April',
		category: 'Backend',
		issueLink: 'https://github.com/windmill-labs/windmill/issues/5446',
		description: `Currently the workspace object storage is all or nothing. You can either see the object explorer or not, and you can either write and read everywhere or not.

This would be a settable setting such that the layout within the buckets can follow the standard u/ and f/ layouts of windmill and that list, read and write permissions would be inherited from the folder permissions.`
	},
	{
		title: 'Hide sensitive values from logs',
		month: 'June',
		category: 'Backend',
		issueLink: 'https://github.com/windmill-labs/windmill/issues/5450',
		description: `SDK clients should automatically propagate to the workers (maybe using a special pattern in stdout) that there is some strings that are sensitive because they correspond to secrets pulled with getResource and getValue. Additionally, workers should be able to have a list of values to consider secrets synced from an external source-of-truth. Those sensitive values would always be masked in logs.`
	},
	{
		title: 'Database explorer for every SQL',
		month: 'May',
		category: 'Developer',
		issueLink: 'https://github.com/windmill-labs/windmill/issues/5448',
		description: `It would be nice to have a database explorer similar to Supabase to explore your database data and run REPL like commands directly from a windmill db resource`
	},
	{
		title: 'SSH-like repl direct to workers (ee)',
		month: 'April',
		category: 'Developer',
		issueLink: 'https://github.com/windmill-labs/windmill/issues/5449',
		description: `feature: SSH-like repl direct to workers (ee)`
	},

	{
		title: 'Dedicated workers improvements',
		month: 'May',
		issueLink: 'https://github.com/windmill-labs/windmill/issues/5337',
		description:
			'Dedicated workers are currently a setting for individual scripts, flows and worker groups. A dedicated worker can only be dedicated to one script or flow. We mean to change that so that in the extreme case, it can handle a full workspace.\n\nWe want them to now have a configuration, let\'s call it the dedicated worker configurations that select all the flows and scripts (potentially apps) it will be dedicated to:\nfor all those it needs to do a compaction for ts and python where it will essentially route internally the job to the right subfunction based on job path which mean all those scripts can now run on the same runtime and we have at most 2 running runtimes (bun, python) on a dedicated worker. Those configuration can be deployed and each deployment will have a deployment version and a status . It corresponds to the status of creating the single lockfile for ts and single lockfile for python. If we have incompatible reqs for different scripts it will fail otherwise it pass.\n\nInstead of having to declare if a script or flow is ran on dedicated worker on the script or flow, they will be automatically updated when they are part of a successful deployment of a worker config such that their tag become dedicated:<dedicated_worker_config_name>\nThe creation of the compacted view is the "hard part". Once we have those, we can use our normal traversers to generated or fail to generate the single lockfile.',
		important: true
	},
	{
		title: 'Batch runs UI',
		month: 'April',
		issueLink: 'https://github.com/windmill-labs/windmill/issues/4787',
		description:
			'The goal of this feature is to allow to run more than 1 jobs at once from the UI\n\nScenarios that need to be handled:\n\n    Filtering jobs from the runs page, selecting them (all within page, all within filters, or one by one) and re-running all of them (v0)\n    Take a time window range within a schedule that is in the past and run all ticks that would have happened in the past, with optionally not re-running the ticks that did actually happen\n\nIn terms of job arguments, here are the different scenarios:\n\n    Rerun with exactly same args as the re-ran job (v0)\n    If having selected different script versions or flow versions, which have different schemas:\n        Have a tab for each script/flow version containing a schema form\n        Have a "common tab" where fields that are common can be set there\n        every field can either be set with static info or a javascript expression like for scripts/flows, where possible values usable in that javascript expressions are the date at which the job was originally schedules or the value of other fields'
	},
	{
		title: 'Interactive script debugger',
		month: 'April',
		category: 'Developer',
		issueLink: 'https://github.com/windmill-labs/windmill/issues/5432',
		important: true,
		description: 'Add breakpoints and run an interactive debugger for Python and Typescript.'
	},
	{
		title: 'Code/React UI builder',
		month: 'April',
		issueLink: 'https://github.com/windmill-labs/windmill/issues/5433',
		important: true,
		description:
			'Write apps fully in code in React/Svelte/Vue with any libraries and see preview and code editor directly. If you like Lovable/v0.dev, you will love this since it will be equivalent but much better integrated with windmill backend flow/script capabilities.'
	},
	{
		title: 'Agent workers through HTTP',
		month: 'March',
		issueLink: 'https://github.com/windmill-labs/windmill/issues/5434',
		important: true,
		description:
			'Currently Remote Agent Workers still need to connect to the central Postgresql Database using a direct tcp connection and work leveraging RLS policies in Postgresql and require a complex and deep understanding of Windmill and Postgresql.\n\nHTTP Agent workers will only communicate to the central servers using HTTP and will be seamless to setup using simply a secure policy as config.'
	},
	{
		title: 'Cloudflare workers support',
		month: 'TBD',
		category: 'Backend',
		issueLink: '',
		description: 'Cloudflare workers support for native jobs'
	},
	{
		title: 'Free form flows',
		month: 'April',
		issueLink: 'https://github.com/windmill-labs/windmill/issues/5435',
		description:
			'- Free positioning of nodes\n- Colorable Rectangle to group nodes\n- Free Text annotable anywhere'
	},
	{
		title: 'AI step as flow primitive',
		month: 'June',
		category: 'AI',
		issueLink: 'https://github.com/windmill-labs/windmill/issues/5436',
		description: '- More powerful and native API calls to AI models'
	},
	{
		title: 'Global Windmill AI Copilot/Chat',
		month: 'April',
		category: 'AI',
		issueLink: 'https://github.com/windmill-labs/windmill/issues/5437',
		description:
			'- cursor-like autocompletion for all script editors (inline)\n- MCP server to give context about Windmill workspace\n- AI chat panel available globally that adapts to context and unify all AI interactions (AI Fix, AI gen, AI edit, Workflow Edit, Explain Code, Summarize info from workspace)',
		important: true
	},
	{
		title: 'OpenAPI -> HTTP routes + scripts templates',
		month: 'May',
		category: 'Integration',
		issueLink: 'https://github.com/windmill-labs/windmill/issues/5438',
		description:
			'Ability to transform an OpenAPI spec into a set of http routes + scripts pre-generated by AI'
	},
	{
		title: 'Workspace -> OpenAPI',
		month: 'May',
		category: 'Integration',
		issueLink: 'https://github.com/windmill-labs/windmill/issues/5439',
		description:
			'Generate all the webhooks and HTTP routers, as OpenAPI endpoints, including summary and description'
	},
	{
		title: 'Improved local dev experience',
		month: 'May',
		category: 'Developer',
		issueLink: 'https://github.com/windmill-labs/windmill/issues/5440',
		description:
			'- Python and Typescript (bun) to respect the windmill lockfile of a script when running it\n- leverage the MCP integration to add context to AI ide like Cursor and Windsurf'
	},
	{
		title: 'Exhaustive Hub integrations generated by AI',
		month: 'June',
		category: 'Integration',
		issueLink: 'https://github.com/windmill-labs/windmill/issues/5441',
		description:
			'- Improve AI agents to generate both code and test for all possible integrations\n- Make it easier for community to contribute to this process'
	},
	{
		title: 'Data pipelines v2',
		month: 'July',
		category: 'Backend',
		important: true,
		issueLink: 'https://github.com/windmill-labs/windmill/issues/5442',
		description:
			'- Apache iceberg support\n- Data lineage + column-wise data-lineage\n- Asset/Dataset centric view of data pipelines\n- Better support for data materialization\n- Better support for streaming/incremental pipelines\n- Integration with metadata platforms\n- Better integration with duckdb'
	},
	{
		title: 'Shardable job queue for unlimited scalability',
		month: 'July',
		category: 'Backend',
		issueLink: '',
		description:
			'Windmill can scale horizontally unlimited except for the database. The biggest bottleneck is the v2_job_queue table which limits the maxmimum theoritical throughput of Windmill to around 20k rps. By allowing sharding of the job queue on multiple databases (by sharding by workspace id first then by the hash of the uuid of the root job), the scalability of Windmill will be virtually infinite.'
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
	AI: '#818CF8'  // Purple
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

// Group timeline items by month
function groupByMonth(items) {
	const groups = {};

	items.forEach((item) => {
		const month = item.month || 'TBD';

		if (!groups[month]) {
			groups[month] = [];
		}
		groups[month].push(item);
	});

	return groups;
}

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
			Object.keys(textRefs.current).forEach(key => {
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
		const groupedItems = groupByMonth(categorizedItems);

		// Sort months in chronological order
		const sortOrder = {
			January: 1,
			February: 2,
			March: 3,
			April: 4,
			May: 5,
			June: 6,
			July: 7,
			August: 8,
			September: 9,
			October: 10,
			November: 11,
			December: 12,
			TBD: 99
		};

		const sortedMonths = Object.keys(groupedItems).sort((a, b) => {
			return sortOrder[a] - sortOrder[b];
		});

		return (
			<div className={styles.timeline}>
				{sortedMonths.map((month) => (
					<div key={month} className={styles.monthGroup}>
						<div className={styles.monthMarker}></div>
						<div className={styles.monthLabel}>{month}</div>

						{groupedItems[month].map((item, index) => {
							const itemKey = `${month}-${index}`;
							
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
											ref={el => textRefs.current[itemKey] = el}
											className={`${styles.cardText} ${truncatedItems[itemKey] ? styles.truncated : ''} text-gray-500 dark:text-gray-300`}
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
				))}
			</div>
		);
	};

	return (
		<div className={styles.roadmapContainer}>
			<div className={styles.container}>{renderTimeline()}</div>
		</div>
	);
}

export default WindmillRoadmap;
