#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

class BrandGuidelinesGenerator {
	constructor(options = {}) {
		this.brandDir = path.join(__dirname, 'brand_guidelines');
		this.staticDir = path.join(__dirname, 'static', 'img', 'brand');
		this.output = [];
		this.imageCache = new Map();
		this.options = options;
		this.imageMode = options.imageMode || 'embed'; // 'embed' or 'link' (for backward compatibility)
		this.assetsDir = path.join(__dirname, 'brand-guidelines-assets');
		this.copiedImages = new Set(); // Track copied images to avoid duplicates
	}

	async generate() {
		console.log('🎨 Generating brand guidelines...');

		// Create assets directory if using link mode
		if (this.imageMode === 'link') {
			this.ensureAssetsDirectory();
		}

		this.output.push('# Windmill Brand Guidelines\n');
		this.output.push(
			'*This document contains the complete brand guidelines for Windmill, including visual identity, design system, and communication standards.*\n\n'
		);

		// Process each main section in order
		await this.processSection('brand_foundation', 'Brand Foundation');
		await this.processSection('voice_communication', 'Voice & Communication');
		await this.processSection('visual_identity', 'Visual Identity');
		await this.processSection('design_system', 'Design System');

		// Write the output file
		const outputPath = path.join(__dirname, 'brand-guidelines.md');
		fs.writeFileSync(outputPath, this.output.join(''));

		console.log(`✅ Brand guidelines generated: ${outputPath}`);
		console.log(`📄 File size: ${Math.round(fs.statSync(outputPath).size / 1024)}KB`);
	}

	async processSection(sectionDir, sectionTitle) {
		const sectionPath = path.join(this.brandDir, sectionDir);

		if (!fs.existsSync(sectionPath)) {
			console.log(`⚠️  Section not found: ${sectionDir}`);
			return;
		}

		console.log(`📂 Processing ${sectionTitle}...`);
		this.output.push(`## ${sectionTitle}\n\n`);

		// Get all subdirectories and index file
		const items = fs.readdirSync(sectionPath, { withFileTypes: true });

		// Process index.mdx first if it exists
		const indexFile = path.join(sectionPath, 'index.mdx');
		if (fs.existsSync(indexFile)) {
			const content = await this.processMDXFile(indexFile);
			if (content.trim()) {
				this.output.push(content + '\n\n');
			}
		}

		// Process subdirectories in numerical order
		const subdirs = items
			.filter((item) => item.isDirectory())
			.sort((a, b) => a.name.localeCompare(b.name));

		for (const subdir of subdirs) {
			await this.processSubsection(path.join(sectionPath, subdir.name), subdir.name);
		}
	}

	async processSubsection(subsectionPath, subsectionName) {
		const indexFile = path.join(subsectionPath, 'index.mdx');

		if (!fs.existsSync(indexFile)) {
			console.log(`⚠️  No index.mdx found in ${subsectionName}`);
			return;
		}

		// Extract title from folder name (remove numeric prefix)
		const title = subsectionName
			.replace(/^\d+_/, '')
			.replace(/_/g, ' ')
			.replace(/\b\w/g, (l) => l.toUpperCase());

		console.log(`  📄 Processing ${title}...`);
		this.output.push(`### ${title}\n\n`);

		const content = await this.processMDXFile(indexFile);
		this.output.push(content + '\n\n');
	}

	async processMDXFile(filePath) {
		const content = fs.readFileSync(filePath, 'utf8');

		// Remove frontmatter
		let processedContent = content.replace(/^---[\s\S]*?---\n/, '');

		// Remove import statements
		processedContent = processedContent.replace(/^import.*$/gm, '');

		// Process images
		processedContent = await this.processImages(processedContent, path.dirname(filePath));

		// Convert React components to markdown
		processedContent = this.convertComponents(processedContent);

		// Additional cleanup
		processedContent = this.cleanupContent(processedContent);

		// Clean up extra whitespace
		processedContent = processedContent.replace(/\n{3,}/g, '\n\n').trim();

		return processedContent;
	}

	cleanupContent(content) {
		// Remove broken JSX and malformed HTML
		content = content.replace(/\{\s*\}/g, '');
		content = content.replace(/\s*\}\s*/g, '');
		content = content.replace(/\{\s*/g, '');

		// Clean up malformed image tags
		content = content.replace(/<img[^>]*\}/g, '');
		content = content.replace(/<img[^>]*>/g, '');

		// Remove CSS-in-JS style objects
		content = content.replace(/style=\{\{[^}]*\}\}/g, '');

		// Fix broken markdown due to JSX cleanup
		content = content.replace(/\s+\n/g, '\n');
		content = content.replace(/\n\s+/g, '\n');

		// Remove empty HTML attributes
		content = content.replace(/\s+>/g, '>');

		return content;
	}

	async processImages(content, basePath) {
		// Handle require() image imports
		content = content.replace(/src=\{require\('\.\/([^']+)'\)\.default\}/g, (_match, imagePath) => {
			const fullPath = path.join(basePath, imagePath);
			const processedPath = this.processImagePath(fullPath);
			return processedPath ? `src="${processedPath}"` : `*[Image: ${imagePath} not found]*`;
		});

		// Handle static image references in specific attributes only (not in data URIs)
		content = content.replace(
			/(src|lightImageSrc|darkImageSrc)="\/img\/brand\/([^"]+)"/g,
			(match, attr, imagePath) => {
				// Skip if this looks like it's already a data URI
				if (imagePath.startsWith('data:')) return match;

				const fullPath = path.join(this.staticDir, imagePath);
				const processedPath = this.processImagePath(fullPath);
				return processedPath
					? `${attr}="${processedPath}"`
					: `*[Image: /img/brand/${imagePath} not found]*`;
			}
		);

		return content;
	}

	ensureAssetsDirectory() {
		if (!fs.existsSync(this.assetsDir)) {
			fs.mkdirSync(this.assetsDir, { recursive: true });
			console.log(`📁 Created assets directory: ${this.assetsDir}`);
		}
	}

	copyImageToAssets(imagePath) {
		if (!fs.existsSync(imagePath)) {
			console.log(`⚠️  Image not found: ${imagePath}`);
			return null;
		}

		const fileName = path.basename(imagePath);
		const destPath = path.join(this.assetsDir, fileName);

		// Avoid copying the same image multiple times
		if (this.copiedImages.has(fileName)) {
			return `./brand-guidelines-assets/${fileName}`;
		}

		try {
			fs.copyFileSync(imagePath, destPath);
			this.copiedImages.add(fileName);
			console.log(`  🖼️  Copied image: ${fileName}`);
			return `./brand-guidelines-assets/${fileName}`;
		} catch (error) {
			console.log(`⚠️  Error copying image ${imagePath}:`, error.message);
			return null;
		}
	}

	processImagePath(imagePath) {
		if (this.options.imageMode === 'link') {
			return this.copyImageToAssets(imagePath);
		} else {
			return this.getImageAsBase64(imagePath);
		}
	}

	getImageAsBase64(imagePath) {
		if (this.imageCache.has(imagePath)) {
			return this.imageCache.get(imagePath);
		}

		if (!fs.existsSync(imagePath)) {
			console.log(`⚠️  Image not found: ${imagePath}`);
			this.imageCache.set(imagePath, null);
			return null;
		}

		try {
			const imageData = fs.readFileSync(imagePath);
			const ext = path.extname(imagePath).toLowerCase();
			let mimeType;

			switch (ext) {
				case '.png':
					mimeType = 'image/png';
					break;
				case '.jpg':
				case '.jpeg':
					mimeType = 'image/jpeg';
					break;
				case '.svg':
					mimeType = 'image/svg+xml';
					break;
				case '.webp':
					mimeType = 'image/webp';
					break;
				default:
					console.log(`⚠️  Unsupported image format: ${ext}`);
					return null;
			}

			const base64 = `data:${mimeType};base64,${imageData.toString('base64')}`;
			this.imageCache.set(imagePath, base64);
			console.log(`  🖼️  Embedded image: ${path.basename(imagePath)}`);
			return base64;
		} catch (error) {
			console.log(`⚠️  Error processing image ${imagePath}:`, error.message);
			this.imageCache.set(imagePath, null);
			return null;
		}
	}

	generateColorReferenceTable() {
		const tokens = require('./src/data/tokens.json');
		const lightTokens = tokens.tokens.light;
		const darkTokens = tokens.tokens['dark-3']; // Using dark-3 as specified in tokenLoader
		// const primitives = tokens.primitives.light; // Not currently used
		const tailwindColors = tokens['tailwind-c-s-s-v-3-3-2']['mode-1'];

		// Define color categories and their tokens
		const colorCategories = [
			{
				name: 'Accent Colors',
				tokens: [
					{
						key: 'surface-accent-primary',
						name: 'accent-primary',
						usage: 'Primary accent color for buttons, links, active states'
					},
					{
						key: 'surface-accent-hover',
						name: 'accent-hover',
						usage: 'Hover state for interactive accent elements'
					},
					{
						key: 'surface-accent-clicked',
						name: 'accent-clicked',
						usage: 'Active/pressed state for accent elements'
					},
					{
						key: 'surface-accent-secondary',
						name: 'accent-secondary',
						usage: 'Secondary accent for strong emphasis'
					},
					{
						key: 'surface-accent-secondary-hover',
						name: 'accent-secondary-hover',
						usage: 'Hover state for accent secondary elements'
					},
					{
						key: 'surface-accent-secondary-clicked',
						name: 'accent-secondary-clicked',
						usage: 'Active/pressed state for accent secondary elements'
					},
					{
						key: 'surface-accent-selected',
						name: 'accent-selected',
						usage: 'Selected state background'
					}
				]
			},
			{
				name: 'Surface Colors',
				tokens: [
					{ key: 'surface-primary', name: 'surface-primary', usage: 'Main application background' },
					{
						key: 'surface-secondary',
						name: 'surface-secondary',
						usage: 'Secondary backgrounds, sections'
					},
					{
						key: 'surface-tertiary',
						name: 'surface-tertiary',
						usage: 'Cards, modals, elevated surfaces'
					},
					{
						key: 'surface-hover',
						name: 'surface-hover',
						usage: 'Hover states for neutral elements'
					},
					{ key: 'surface-selected', name: 'surface-selected', usage: 'Selected neutral elements' },
					{
						key: 'surface-disabled',
						name: 'surface-disabled',
						usage: 'Disabled elements, inactive states'
					},
					{ key: 'surface-sunken', name: 'surface-sunken', usage: 'Sunken or inset surfaces' },
					{ key: 'surface-input', name: 'surface-input', usage: 'Input field backgrounds' }
				]
			},
			{
				name: 'Text Colors',
				tokens: [
					{ key: 'text-primary', name: 'text-primary', usage: 'Default text, body content' },
					{
						key: 'text-emphasis',
						name: 'text-emphasis',
						usage: 'Headers, labels, emphasized content'
					},
					{
						key: 'text-secondary',
						name: 'text-secondary',
						usage: 'Supporting information, metadata'
					},
					{ key: 'text-tertiary', name: 'text-tertiary', usage: 'Subtle text, captions' },
					{ key: 'text-hint', name: 'text-hint', usage: 'Placeholders, tooltips, hints' },
					{
						key: 'text-disabled',
						name: 'text-disabled',
						usage: 'Disabled states, unavailable options'
					},
					{ key: 'text-accent', name: 'text-accent', usage: 'Accent colored text, links' }
				]
			},
			{
				name: 'Border Colors',
				tokens: [
					{ key: 'border-light', name: 'border-light', usage: 'Subtle borders, dividers' },
					{ key: 'border-normal', name: 'border-normal', usage: 'Standard borders, form inputs' },
					{ key: 'border-accent', name: 'border-accent', usage: 'Accent borders, focus states' },
					{ key: 'border-selected', name: 'border-selected', usage: 'Selected element borders' }
				]
			},
			{
				name: 'Reserved Colors',
				tokens: [
					{
						key: 'reserved-ai',
						name: 'ai-primary',
						usage: 'AI features, magic wand icon, AI-powered functionality'
					}
				]
			},
			{
				name: 'Feedback Colors',
				tokens: [
					{
						key: 'green-500',
						name: 'success',
						usage: 'Success states, positive feedback, completed actions',
						hex: tailwindColors['green-500'],
						tailwindClass: 'green-500'
					},
					{
						key: 'yellow-500',
						name: 'warning',
						usage: 'Warning states, caution messages, pending actions',
						hex: tailwindColors['yellow-500'],
						tailwindClass: 'yellow-500'
					},
					{
						key: 'red-500',
						name: 'error',
						usage: 'Error states, failed actions, destructive operations',
						hex: tailwindColors['red-500'],
						tailwindClass: 'red-500'
					},
					{
						key: 'blue-500',
						name: 'info',
						usage: 'Information states, neutral notifications',
						hex: tailwindColors['blue-500'],
						tailwindClass: 'blue-500'
					}
				]
			}
		];

		let table = '\n| Token | Light Mode | Dark Mode | Tailwind Class | Usage |\n';
		table += '|-------|------------|-----------|----------------|-------|\n';

		colorCategories.forEach((category) => {
			// Add category separator
			table += `| **${category.name}** | | | | |\n`;

			category.tokens.forEach((token) => {
				let lightHex, darkHex;

				if (token.hex) {
					// For feedback colors, use the same hex for both light and dark modes
					lightHex = token.hex;
					darkHex = token.hex;
				} else {
					// For theme tokens, use appropriate light/dark values
					lightHex = lightTokens[token.key] || 'N/A';
					darkHex = darkTokens[token.key] || 'N/A';
				}

				const tailwindClass = token.tailwindClass
					? `\`${token.tailwindClass}\``
					: `\`${token.name}\``;

				table += `| ${token.name} | ${lightHex} | ${darkHex} | ${tailwindClass} | ${token.usage} |\n`;
			});

			table += '| | | | | |\n'; // Empty row for spacing
		});

		return table;
	}

	convertComponents(content) {
		// Convert ExampleImageDisplay components
		content = content.replace(
			/<ExampleImageDisplay[^>]*lightImageSrc="([^"]+)"[^>]*darkImageSrc="([^"]+)"[^>]*altTextPrefix="([^"]+)"[^>]*\/>/g,
			(_match, lightSrc, darkSrc, altText) => {
				// If src has already been processed (contains brand-guidelines-assets), use it directly
				if (lightSrc.includes('brand-guidelines-assets')) {
					return `![${altText} (Light mode)](${lightSrc})\n\n*Light mode example*`;
				} else if (darkSrc.includes('brand-guidelines-assets')) {
					return `![${altText} (Dark mode)](${darkSrc})\n\n*Dark mode example*`;
				}

				// Otherwise, process the original paths
				const lightFullPath = path.join(this.staticDir, lightSrc.replace(/^\//, ''));
				const darkFullPath = path.join(this.staticDir, darkSrc.replace(/^\//, ''));

				const lightImage = this.processImagePath(lightFullPath);
				const darkImage = this.processImagePath(darkFullPath);

				if (lightImage) {
					return `![${altText} (Light mode)](${lightImage})\n\n*Light mode example*`;
				} else if (darkImage) {
					return `![${altText} (Dark mode)](${darkImage})\n\n*Dark mode example*`;
				}
				return `*[${altText} - Images not available]*`;
			}
		);

		// Convert ColorDisplay components (simplified)
		content = content.replace(
			/<ColorDisplay[^>]*\/>/g,
			'*[Color palette display - see original documentation for interactive colors]*'
		);

		// Remove TypographyTable components (skip them entirely)
		content = content.replace(/<TypographyTable[\s\S]*?\/>/g, '');

		// Convert ColorReferenceTable components with actual color data
		content = content.replace(/<ColorReferenceTable[^>]*\/>/g, this.generateColorReferenceTable());

		// Convert img tags to markdown BEFORE removing JSX attributes (handle multiline)
		content = content.replace(
			/<img[\s\S]*?src="([^"]+)"[\s\S]*?alt="([^"]*)"[\s\S]*?\/?>/g,
			(_match, src, alt) => {
				return `![${alt}](${src})`;
			}
		);
		content = content.replace(
			/<img[\s\S]*?alt="([^"]*)"[\s\S]*?src="([^"]+)"[\s\S]*?\/?>/g,
			(_match, alt, src) => {
				return `![${alt}](${src})`;
			}
		);

		// Remove JSX-style attributes completely
		content = content.replace(/\s*style=\{[^}]*\}/g, '');
		content = content.replace(/\s*className=\{[^}]*\}/g, '');
		content = content.replace(/\s*[a-zA-Z]+={[^}]*}/g, '');

		// Clean up HTML tags with React-style attributes
		content = content.replace(/<([a-z][a-zA-Z0-9]*)[^>]*>/g, '<$1>');

		// Remove remaining React components and JSX
		content = content.replace(/<[A-Z][^>]*>[\s\S]*?<\/[A-Z][^>]*>/g, '');
		content = content.replace(/<[A-Z][^>]*\/>/g, '');

		// Convert simple HTML elements to markdown where possible
		content = content.replace(/<h3[^>]*>(.*?)<\/h3>/g, '### $1');
		content = content.replace(/<h2[^>]*>(.*?)<\/h2>/g, '## $1');
		content = content.replace(/<h1[^>]*>(.*?)<\/h1>/g, '# $1');
		content = content.replace(/<p[^>]*>(.*?)<\/p>/g, '$1\n');
		content = content.replace(/<div[^>]*>([\s\S]*?)<\/div>/g, '$1');

		// Clean up orphaned closing tags and malformed HTML
		content = content.replace(/<\/[^>]+>/g, '');
		content = content.replace(/<[^>]*>/g, '');

		// Fix broken markdown images
		content = content.replace(/\s*\}\s*/g, '');

		return content;
	}
}

// Helper function to show usage
function showUsage() {
	console.log(`
📖 Windmill Brand Guidelines Generator

Usage: node generate-brand-guidelines.js [options]

Options:
  --link-images    Generate linked images in assets folder instead of base64 embedding
  --help          Show this help message

Examples:
  node generate-brand-guidelines.js                 # Generate with base64 embedded images
  node generate-brand-guidelines.js --link-images   # Generate with linked images in assets folder

Output:
  - brand-guidelines.md                             # Main brand guidelines document
  - brand-guidelines-assets/                        # Images folder (with --link-images)
`);
}

// Run the generator
if (require.main === module) {
	// Parse command line arguments
	const args = process.argv.slice(2);

	if (args.includes('--help') || args.includes('-h')) {
		showUsage();
		process.exit(0);
	}

	const linkImages = args.includes('--link-images');

	const options = {
		imageMode: linkImages ? 'link' : 'embed'
	};

	console.log(`📖 Image mode: ${options.imageMode === 'link' ? 'File paths' : 'Base64 embedding'}`);

	const generator = new BrandGuidelinesGenerator(options);
	generator.generate().catch(console.error);
}

module.exports = BrandGuidelinesGenerator;
