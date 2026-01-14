# AI rules for Windmill documentation

These guidelines ensure consistency and quality when writing or modifying Windmill documentation.

## Content

- The doc should focus on the user experience, not on the engineering behind it, unless it's important (e.g. feature related to performance)
- **Before writing new documentation, review @writing_style_guide.md for guidance about how to write good documentation**

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

## Component usage

- Import and use DocCard components for navigation links
- Follow the grid layout pattern for card navigation (typically 2 columns)
- Use video elements with proper className for tutorials

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
- Major features shall have a dedicated changelog page and directory, like [this](./changelog/2025-08-19-kubernetes-native-autoscaling/index.md).
- Major features shall be referenced in the [features list](./src/components/pricing/FeatureList.js).

## Cross-referencing

- Use relative paths for internal links (e.g., `../../8_triggers/index.mdx`)
- Reference to useful pages using DocCard components
- Maintain consistent linking patterns throughout documentation
- Also when adding a feature, you can reference its dedicated page from related pages, using backink

## Code examples

- Include complete, working code examples that can be copied directly
- Add explanatory comments to complex code sections
- Use consistent indentation and formatting in code blocks
- Show both input and expected output where appropriate

## Metadata and SEO

- URLs are derived from the file or folder name
- Use descriptive titles that include keywords
- If a new page is to be created, keep URLs clean and descriptive