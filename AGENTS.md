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
