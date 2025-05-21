# Cursor Rules for Windmill Documentation

These guidelines ensure consistency and quality when writing or modifying Windmill documentation.

## File Structure and Naming

- Use `.mdx` extension for documentation files
- Main section pages should be named `index.mdx`
- Folders should follow numeric prefixing for ordering (e.g., `0_scripts_quickstart`, `1_typescript_quickstart`)
- Use underscores to separate words in file and folder names

## Markdown Formatting

- Start each main page with appropriate frontmatter (title and slug)
- Use proper heading hierarchy (# for main title, ## for sections, etc.)
- Include relevant imports at the top of the file
- Use code blocks with appropriate language specification (`ts, `python, etc.)

## Component Usage

- Import and use DocCard components for navigation links
- Follow the grid layout pattern for card navigation (typically 2 columns)
- Include appropriate icons when using DocCard components
- Use video elements with proper className for tutorials

## Media and Assets

- Store images in the same directory as the related MDX file
- Include both PNG and optimized WebP versions of images
- Use meaningful names for image files that describe their content
- Apply proper className to media elements for consistent styling

## Content Organization

- Each major feature has its own directory
- Content progresses from basic to advanced concepts
- Quickstart guides should be concise and focused on immediate results
- Link to related documentation using relative paths

## Cross-Referencing

- Use relative paths for internal links (e.g., `../../8_triggers/index.mdx`)
- Include "Related Documents" sections using DocCard components
- Maintain consistent linking patterns throughout documentation

## Code Examples

- Include complete, working code examples that can be copied directly
- Add explanatory comments to complex code sections
- Use consistent indentation and formatting in code blocks
- Show both input and expected output where appropriate

## Metadata and SEO

- Include appropriate frontmatter with title and slug
- Use descriptive titles that include keywords
- Keep URLs clean and descriptive
