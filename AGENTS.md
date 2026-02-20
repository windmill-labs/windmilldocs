# AI rules for Windmill documentation

These guidelines ensure consistency and quality when writing or modifying Windmill documentation.

## Content

- The doc should focus on the user experience, not on the engineering behind it, unless it's important (e.g. feature related to performance)
- **Before writing documentation, review @writing_style_guide.md for guidance about how to write good documentation**

## File structure and naming

- Use `.mdx` extension for documentation files
- Main section pages should be named `index.mdx`
- Folders should follow numeric prefixing for ordering (e.g., `0_scripts_quickstart`, `1_typescript_quickstart`)
- Use underscores to separate words in file and folder names

## Markdown formatting

- Use proper heading hierarchy (# for main title, ## for sections, etc.)
- Include relevant imports at the top of the file
- Use code blocks with appropriate language specification (`ts, `python, etc.)
- Avoid bold font, unless already used in the document
- Titles, subtiles and docs in general follow sentence case ('Like this')
- On docs, nothing shouldfollow title case ('Like This')

## Component usage

- Import and use DocCard components for navigation links
- Follow the grid layout pattern for card navigation (typically 2 columns)
- Use video elements with proper className for tutorials
- Import and use Tabs and TabItem components for tabs (for example to show code examples in different languages)

## Media and assets

- Store images in the same directory as the related MDX file
- Include both PNG and optimized WebP versions of images
- Use meaningful names for image files that describe their content
- Apply proper className to media elements for consistent styling
- If a file / illustration / video would be useful but you don't have it, add a placeholder in comment to the file

## Content organization

- Each major feature has its own directory
- Content progresses from basic to advanced concepts
- Quickstart guides should be concise and focused on immediate results
- Link to related documentation using relative paths
- If a new page is added, make sure it appears in sidebars.js and check if its worth adding to core_concepts/index.mdx
- New features shall have a dedicated changelog page and directory, like [this](./changelog/2025-08-19-kubernetes-native-autoscaling/index.md)
- Changelogs should have tags (in Sentence case). In particular follow the color titles referenced in @src/theme/BlogPostItem/Container/index.js: (like 'App editor', 'Flow editor', 'Enterprise')
- Major features shall be referenced in the [features list](./src/components/pricing/FeatureList.js), in particular if they are Enterprise features

## Cross-referencing and backlinks

- Use relative paths for internal links (e.g., `../../8_triggers/index.mdx`) when a concept is mentioned for the first time in the document and has not been backlinked yet in the document
- Use absolute paths for external links (e.g., `https://www.docker.com/`) when linking to external websites and there is no dedicated page in the documentation
- Using backlinks is very important to help users navigate the documentation and for SEO
- Use backlinks in particular in the introduction of a document or section to reference the main related pages
- When a page or section is deleted or renamed, update all backlinks to the new page or section
- When a feature is Enterprise, Cloud or Pro only, mention it in the introduction of the document or section
- Reference to main related pages using DocCard components
- Reference to same-page sections using `#` anchors
- Maintain consistent linking patterns throughout documentation
- Also when adding a feature, reference its dedicated page from related pages, using backinks and relative paths

## Code examples

- Include complete, working code examples that can be copied directly
- Add explanatory comments to complex code sections
- Use consistent indentation and formatting in code blocks
- Show both input and expected output where appropriate

## Metadata and SEO

- URLs are derived from the file or folder name (e.g. `windmilldocs/docs/core_concepts/20_jobs/index.mdx` will become `https://www.windmill.dev/docs/core_concepts/jobs`)
- Use descriptive titles that include keywords
- If a new page is to be created, keep URLs clean and descriptive

## Structured data and descriptions for AEO

### Frontmatter descriptions in .mdx/.md files
- Every `.mdx` and `.md` file **must** have a `description` field in its frontmatter
- Descriptions are used as the page meta description, feed into JSON-LD schemas, and are the primary text AI systems and search engines extract
- Keep descriptions between 120–160 characters for docs/changelog, up to ~300 characters for blog posts and case studies
- Write descriptions as direct, factual statements — not marketing copy (see `writing_style_guide.md`)
- **Prefer question-based descriptions** to match how users and AI systems query for information (e.g. "How do I deploy Windmill on Kubernetes?" rather than "Guide to deploying Windmill on Kubernetes")
- For integration pages, use the pattern: "How do I connect X to Windmill? [What you can do]."
- For docs pages, use a question that the page answers (e.g. "How do I set up workers in Windmill? Configure worker groups, assign tags, and scale compute.")
- For changelog entries, summarize the feature in one sentence

### JSON-LD structured data
Every non-doc page should include a `<script type="application/ld+json">` block inside `<Head>` for search engine and AI extraction. Follow these patterns:

### Blog posts
- Handled automatically by `src/theme/BlogPostItem/Container/index.js` — no action needed

### Case studies
- Create a data object in `src/data/case-studies/<name>.js` with `company`, `title`, `description`, `author`, `date`, `link`
- Pass it as `caseStudyData` prop to `CaseStudyLayout` in the page file
- Add it to `src/data/case-studies/index.js` so it appears in the ItemList schema on the listing page

### Landing/marketing pages
- **Product pages** → `SoftwareApplication` schema (see `src/pages/pricing.jsx`)
- **FAQ sections** → `FAQPage` schema (see `src/components/pricing/PricingFAQ.js`); each question needs a `textAnswer` plain-text field alongside the JSX `answer`
- **List pages** → `ItemList` schema (see `src/pages/case-studies.jsx`)

### General rules
- Always include `publisher` with `{ "@type": "Organization", "name": "Windmill", "logo": { "@type": "ImageObject", "url": "https://www.windmill.dev/img/windmill.svg" } }`
- Use absolute URLs (`https://www.windmill.dev/...`) in all schema fields
- Keep a plain-text version of any rich/JSX content for schema fields (e.g. `textAnswer` for FAQs)
- The Organization schema on the homepage (`src/pages/index.js`) is the canonical source for company-level structured data
