/**
 * Utility functions for dynamic color selection based on theme and background
 */

/**
 * Get the appropriate text color classes based on background
 * @param {string} background - Background color hex or identifier
 * @param {boolean} isDarkMode - Whether dark mode is active
 * @returns {object} Object with title and description classes
 */
export const getTextClasses = (background, isDarkMode = false) => {
	// Determine if background is dark based on color value
	const isDarkBackground =
		background === '#2d3748' ||
		background.toLowerCase().includes('dark') ||
		(background.startsWith('#') && parseInt(background.slice(1), 16) < 0x808080);

	if (isDarkBackground) {
		return {
			title: 'text-text-emphasis-dark',
			description: 'text-text-secondary-dark'
		};
	} else {
		return {
			title: 'text-text-emphasis-light',
			description: 'text-text-secondary-light'
		};
	}
};

/**
 * Get button state classes for different statuses
 * @param {string} status - Button status (downloading, success, error, opened, default)
 * @returns {string} Tailwind classes for button styling
 */
export const getButtonClasses = (status) => {
	switch (status) {
		case 'downloading':
			return 'bg-gray-400';
		case 'success':
			return 'bg-feedback-success';
		case 'error':
			return 'bg-feedback-error';
		case 'opened':
			return 'bg-feedback-warning';
		default:
			return 'bg-accent-primary hover:bg-accent-hover';
	}
};

/**
 * Get surface color class based on variant and theme
 * @param {string} variant - Surface variant (primary, secondary, tertiary, hover, selected, disabled)
 * @param {boolean} isDarkMode - Whether dark mode is active
 * @returns {string} Tailwind class for surface color
 */
export const getSurfaceClass = (variant = 'primary', isDarkMode = false) => {
	const theme = isDarkMode ? 'dark-3' : 'light';
	return `bg-surface-${variant}-${theme}`;
};

/**
 * Get text color class based on variant and theme
 * @param {string} variant - Text variant (primary, emphasis, secondary, tertiary, hint, disabled)
 * @param {boolean} isDarkMode - Whether dark mode is active
 * @returns {string} Tailwind class for text color
 */
export const getTextClass = (variant = 'primary', isDarkMode = false) => {
	const theme = isDarkMode ? 'dark-3' : 'light';
	return `text-text-${variant}-${theme}`;
};

/**
 * Get border color class based on variant and theme
 * @param {string} variant - Border variant (light, normal, accent)
 * @param {boolean} isDarkMode - Whether dark mode is active
 * @returns {string} Tailwind class for border color
 */
export const getBorderClass = (variant = 'normal', isDarkMode = false) => {
	const theme = isDarkMode ? 'dark-3' : 'light';
	return `border-border-${variant}-${theme}`;
};

/**
 * Get accent color class based on variant
 * @param {string} variant - Accent variant (primary, hover, clicked)
 * @returns {string} Tailwind class for accent color
 */
export const getAccentClass = (variant = 'primary') => {
	return `bg-accent-${variant}`;
};

/**
 * Get feedback color class based on type
 * @param {string} type - Feedback type (success, warning, error, info)
 * @returns {string} Tailwind class for feedback color
 */
export const getFeedbackClass = (type) => {
	return `bg-feedback-${type}`;
};
