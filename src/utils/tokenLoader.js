import tokens from '../data/tokens.json';

/**
 * Get tokens for a specific theme
 * @param {'light'|'dark'} theme - Theme to get tokens for
 * @returns {object} Theme tokens
 */
export const getThemeTokens = (theme = 'light') => {
  const themeKey = theme === 'dark' ? 'dark-3' : 'light';
  return tokens.tokens[themeKey] || {};
};

/**
 * Organize color tokens into categories for display
 * @param {'light'|'dark'} theme - Theme to organize tokens for
 * @returns {object} Organized color data by category
 */
export const organizeColorTokens = (theme = 'light') => {
  const themeTokens = getThemeTokens(theme);

  const accentColors = [
    {
      name: 'accent-primary',
      hex: themeTokens['surface-accent-primary'],
      description: 'Primary accent color for buttons, links, active states'
    },
    {
      name: 'accent-hover',
      hex: themeTokens['surface-accent-hover'],
      description: 'Hover state for interactive accent elements'
    },
    {
      name: 'accent-clicked',
      hex: themeTokens['surface-accent-clicked'],
      description: 'Active/pressed state for accent elements'
    },
    {
      name: 'accent-secondary',
      hex: themeTokens['surface-accent-secondary'],
      description: 'Secondary accent for subtle emphasis'
    },
    {
      name: 'accent-secondary-hover',
      hex: themeTokens['surface-accent-secondary-hover'],
      description: 'Hover state for accent secondary elements'
    },
    {
      name: 'accent-secondary-clicked',
      hex: themeTokens['surface-accent-secondary-clicked'],
      description: 'Active/pressed state for accent secondary elements'
    },
    {
      name: 'accent-selected',
      hex: themeTokens['surface-accent-selected'],
      description: 'Selected state background'
    }
  ];

  const surfaceColors = [
    {
      name: 'surface-primary',
      hex: themeTokens['surface-primary'],
      description: 'Main application background'
    },
    {
      name: 'surface-secondary',
      hex: themeTokens['surface-secondary'],
      description: 'Secondary backgrounds, sections'
    },
    {
      name: 'surface-tertiary',
      hex: themeTokens['surface-tertiary'],
      description: 'Cards, modals, elevated surfaces'
    },
    {
      name: 'surface-hover',
      hex: themeTokens['surface-hover'],
      description: 'Hover states for neutral elements'
    },
    {
      name: 'surface-selected',
      hex: themeTokens['surface-selected'],
      description: 'Selected neutral elements'
    },
    {
      name: 'surface-disabled',
      hex: themeTokens['surface-disabled'],
      description: 'Disabled elements, inactive states'
    },
    {
      name: 'surface-sunken',
      hex: themeTokens['surface-sunken'],
      description: 'Sunken or inset surfaces'
    },
    {
      name: 'surface-input',
      hex: themeTokens['surface-input'],
      description: 'Input field backgrounds'
    }
  ];

  const textColors = [
    {
      name: 'text-primary',
      hex: themeTokens['text-primary'],
      description: 'Default text, body content'
    },
    {
      name: 'text-emphasis',
      hex: themeTokens['text-emphasis'],
      description: 'Headers, labels, emphasized content'
    },
    {
      name: 'text-secondary',
      hex: themeTokens['text-secondary'],
      description: 'Supporting information, metadata'
    },
    {
      name: 'text-tertiary',
      hex: themeTokens['text-tertiary'],
      description: 'Subtle text, captions'
    },
    {
      name: 'text-hint',
      hex: themeTokens['text-hint'],
      description: 'Placeholders, tooltips, hints'
    },
    {
      name: 'text-disabled',
      hex: themeTokens['text-disabled'],
      description: 'Disabled states, unavailable options'
    },
    {
      name: 'text-accent',
      hex: themeTokens['text-accent'],
      description: 'Accent colored text, links'
    }
  ];

  const borderColors = [
    {
      name: 'border-light',
      hex: themeTokens['border-light'],
      description: 'Subtle borders, dividers'
    },
    {
      name: 'border-normal',
      hex: themeTokens['border-normal'],
      description: 'Standard borders, form inputs'
    },
    {
      name: 'border-accent',
      hex: themeTokens['border-accent'],
      description: 'Accent borders, focus states'
    },
    {
      name: 'border-selected',
      hex: themeTokens['border-selected'],
      description: 'Selected element borders'
    }
  ];

  const reservedColors = [
    {
      name: 'ai-primary',
      hex: themeTokens['reserved-ai'],
      description: 'AI features, magic wand icon, AI-powered functionality'
    }
  ];

  const feedbackColors = [
    {
      name: 'success',
      hex: '#22C55E',
      description: 'Success states, positive feedback, completed actions (green-500)'
    },
    {
      name: 'warning',
      hex: '#EAB308',
      description: 'Warning states, caution messages, pending actions (yellow-500)'
    },
    {
      name: 'error',
      hex: '#EF4444',
      description: 'Error states, failed actions, destructive operations (red-500)'
    },
    {
      name: 'info',
      hex: '#3B82F6',
      description: 'Information states, neutral notifications (blue-500)'
    }
  ];

  const webMarketingColors = [
    {
      name: 'brand-vibrant',
      hex: '#3B82F6',
      description: 'Marketing primary, website headers, brand materials'
    },
    {
      name: 'brand-secondary',
      hex: '#1E40AF',
      description: 'Marketing accent, call-to-action buttons on website'
    },
    {
      name: 'brand-tertiary',
      hex: '#DBEAFE',
      description: 'Marketing backgrounds, website sections'
    }
  ];

  const componentColors = [
    {
      name: 'button-accent-secondary',
      hex: themeTokens['component-button-accent-secondary'],
      description: 'Secondary accent button text color'
    },
    {
      name: 'virtual-node',
      hex: themeTokens['component-virtual-node'],
      description: 'Virtual node component background'
    }
  ];

  return {
    accent: accentColors,
    surface: surfaceColors,
    text: textColors,
    border: borderColors,
    reserved: reservedColors,
    feedback: feedbackColors,
    webMarketing: webMarketingColors,
    component: componentColors
  };
};

/**
 * Get all color tokens organized for both light and dark themes
 * @returns {object} Object with light and dark theme colors organized by category
 */
export const getAllColorTokens = () => {
  return {
    light: organizeColorTokens('light'),
    dark: organizeColorTokens('dark')
  };
};

/**
 * Create color data for ColorDisplay component
 * @param {string} category - Color category (accent, surface, text, border, reserved, component)
 * @returns {object} Object with colors and darkColors arrays for ColorDisplay
 */
export const getColorDisplayData = (category) => {
  const allTokens = getAllColorTokens();

  return {
    colors: allTokens.light[category] || [],
    darkColors: allTokens.dark[category] || []
  };
};