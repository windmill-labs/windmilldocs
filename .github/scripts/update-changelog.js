const fs = require('fs');
const path = require('path');

// This script is executed from within the cloned 'frontend_repo',
// so the paths need to be adjusted accordingly.
const changelogFilePath = 'frontend/src/lib/components/sidebar/changelogs.ts';
const newEntriesJson = process.env.NEW_ENTRIES;

if (!newEntriesJson || newEntriesJson === '[]') {
	console.log('No new entries found. Exiting.');
	process.exit(0);
}

const newEntryPaths = JSON.parse(newEntriesJson);
// The root of the original repository checkout
const workspaceRoot = path.join(__dirname, '..', '..');

const entriesToAdd = [];

for (const entryPath of newEntryPaths) {
	// Construct the full path to the changelog entry's index.md in the original repo
	const fullEntryPath = path.join(workspaceRoot, entryPath);
	const indexFile = path.join(fullEntryPath, 'index.md');

	if (!fs.existsSync(indexFile)) {
		console.warn(`Warning: index.md not found for entry ${entryPath}. Skipping.`);
		continue;
	}

	const folderName = path.basename(fullEntryPath);
	// Extract YYYY-MM-DD from the folder name
	const date = folderName.split('-').slice(0, 3).join('-');

	const frontmatter = fs.readFileSync(indexFile, 'utf-8');
	const titleMatch = frontmatter.match(/title:\s*["']?(.*?)["']?$/m);
	const slugMatch = frontmatter.match(/slug:\s*["']?(.*?)["']?$/m);

	if (!titleMatch || !slugMatch) {
		console.warn(`Warning: Could not extract title or slug from ${indexFile}. Skipping.`);
		continue;
	}

	const title = titleMatch[1].replace(/'/g, "\\'"); // Escape single quotes for the JS string
	const slug = slugMatch[1];

	entriesToAdd.push({ title, slug, date });
}

if (entriesToAdd.length === 0) {
	console.log('No valid entries to add after processing. Exiting.');
	process.exit(0);
}

if (!fs.existsSync(changelogFilePath)) {
	console.error(`Error: ${changelogFilePath} not found in repository.`);
	process.exit(1);
}

let content = fs.readFileSync(changelogFilePath, 'utf-8');
let newEntriesString = '';
let entriesAddedCount = 0;

// Reverse the array to prepend entries in chronological order (oldest first)
for (const entry of entriesToAdd.reverse()) {
	const { title, slug, date } = entry;
	const entryString = `\t{\n\t\tlabel: '${title}',\n\t\thref: 'https://www.windmill.dev/changelog/${slug}',\n\t\tdate: '${date}'\n\t},`;

	// Prevent adding a duplicate entry
	if (content.includes(`https://www.windmill.dev/changelog/${slug}`)) {
		console.log(`Changelog entry with slug '${slug}' already exists. Skipping.`);
	} else {
		newEntriesString = entryString + '\n' + newEntriesString; // Prepend to the string of new entries
		entriesAddedCount++;
	}
}

if (entriesAddedCount > 0) {
	const newContent = content.replace(
		/(const changelogs: Changelog\[] = \[)/,
		`$1\n${newEntriesString}`
	);
	fs.writeFileSync(changelogFilePath, newContent);
	console.log(
		`Successfully prepared update for ${changelogFilePath} with ${entriesAddedCount} new entries.`
	);
} else {
	console.log('No new entries were added to the changelog file.');
} 