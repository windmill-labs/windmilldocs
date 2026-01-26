const plugin = require('tailwindcss/plugin');
const tokens = require('./src/data/tokens.json');

// Theme selector - change this to switch between dark themes
const DARK_THEME = 'dark-3';

// Helper function to generate theme colors from tokens
function generateThemeColors() {
	const lightTokens = tokens.tokens.light;
	const darkTokens = tokens.tokens[DARK_THEME];

	return {
		// Surface colors
		surface: {
			'primary-light': lightTokens['surface-primary'],
			'primary-dark': darkTokens['surface-primary'],
			'secondary-light': lightTokens['surface-secondary'],
			'secondary-dark': darkTokens['surface-secondary'],
			'tertiary-light': lightTokens['surface-tertiary'],
			'tertiary-dark': darkTokens['surface-tertiary'],
			'hover-light': lightTokens['surface-hover'],
			'hover-dark': darkTokens['surface-hover'],
			'selected-light': lightTokens['surface-selected'],
			'selected-dark': darkTokens['surface-selected'],
			'disabled-light': lightTokens['surface-disabled'],
			'disabled-dark': darkTokens['surface-disabled'],
			'sunken-light': lightTokens['surface-sunken'],
			'sunken-dark': darkTokens['surface-sunken'],
			'input-light': lightTokens['surface-input'],
			'input-dark': darkTokens['surface-input']
		},
		// Text colors
		text: {
			'primary-light': lightTokens['text-primary'],
			'primary-dark': darkTokens['text-primary'],
			'emphasis-light': lightTokens['text-emphasis'],
			'emphasis-dark': darkTokens['text-emphasis'],
			'secondary-light': lightTokens['text-secondary'],
			'secondary-dark': darkTokens['text-secondary'],
			'tertiary-light': lightTokens['text-tertiary'],
			'tertiary-dark': darkTokens['text-tertiary'],
			'hint-light': lightTokens['text-hint'],
			'hint-dark': darkTokens['text-hint'],
			'disabled-light': lightTokens['text-disabled'],
			'disabled-dark': darkTokens['text-disabled'],
			'accent-light': lightTokens['text-accent'],
			'accent-dark': darkTokens['text-accent']
		},
		// Border colors
		border: {
			'light-light': lightTokens['border-light'],
			'light-dark': darkTokens['border-light'],
			'normal-light': lightTokens['border-normal'],
			'normal-dark': darkTokens['border-normal'],
			'accent-light': lightTokens['border-accent'],
			'accent-dark': darkTokens['border-accent'],
			'selected-light': lightTokens['border-selected'],
			'selected-dark': darkTokens['border-selected']
		},
		// Accent colors (shared between themes)
		accent: {
			primary: lightTokens['surface-accent-primary'],
			hover: lightTokens['surface-accent-hover'],
			clicked: lightTokens['surface-accent-clicked'],
			'secondary-light': lightTokens['surface-accent-secondary'],
			'secondary-dark': darkTokens['surface-accent-secondary'],
			'selected-light': lightTokens['surface-accent-selected'],
			'selected-dark': darkTokens['surface-accent-selected']
		}
	};
}

module.exports = {
	darkMode: ['class', '[data-theme="dark"]'],
	content: ['./src/**/*.{html,js,jsx,tsx,mdx}'],
	safelist: [
		// Surface utility classes that work with ! flag
		'!bg-primary-light',
		'!bg-primary-dark',
		'!bg-secondary-light',
		'!bg-secondary-dark',
		'!bg-tertiary-light',
		'!bg-tertiary-dark',
		'!bg-hover-light',
		'!bg-hover-dark',
		'!bg-selected-light',
		'!bg-selected-dark',
		'!bg-disabled-light',
		'!bg-disabled-dark',
		'!bg-sunken-light',
		'!bg-sunken-dark',
		'!bg-input-light',
		'!bg-input-dark',
		// Regular surface classes without ! flag
		'bg-primary-light',
		'bg-primary-dark',
		'bg-secondary-light',
		'bg-secondary-dark',
		'bg-tertiary-light',
		'bg-tertiary-dark',
		'bg-hover-light',
		'bg-hover-dark',
		'bg-selected-light',
		'bg-selected-dark',
		'bg-disabled-light',
		'bg-disabled-dark',
		'bg-sunken-light',
		'bg-sunken-dark',
		'bg-input-light',
		'bg-input-dark',
		// New text utility classes that work with ! flag
		'!text-primary-light',
		'!text-primary-dark',
		'!text-emphasis-light',
		'!text-emphasis-dark',
		'!text-secondary-light',
		'!text-secondary-dark',
		'!text-tertiary-light',
		'!text-tertiary-dark',
		'!text-hint-light',
		'!text-hint-dark',
		'!text-disabled-light',
		'!text-disabled-dark',
		'!text-accent-light',
		'!text-accent-dark',
		// Regular versions without ! flag
		'text-primary-light',
		'text-primary-dark',
		'text-emphasis-light',
		'text-emphasis-dark',
		'text-secondary-light',
		'text-secondary-dark',
		'text-tertiary-light',
		'text-tertiary-dark',
		'text-hint-light',
		'text-hint-dark',
		'text-disabled-light',
		'text-disabled-dark',
		'text-accent-light',
		'text-accent-dark',
		'border-border-light-light',
		'border-border-light-dark',
		'border-border-normal-light',
		'border-border-normal-dark',
		'border-border-accent-light',
		'border-border-accent-dark',
		'border-border-selected-light',
		'border-border-selected-dark',
		'bg-accent-primary',
		'bg-accent-hover',
		'bg-accent-clicked',
		'bg-accent-secondary-light',
		'bg-accent-secondary-dark',
		'bg-accent-selected-light',
		'bg-accent-selected-dark',
		'bg-feedback-success',
		'bg-feedback-warning',
		'bg-feedback-error',
		'bg-feedback-info',
		// Typography classes used in guidelines
		'text-2xl',
		'text-lg',
		'text-sm',
		'text-xs',
		'text-2xs',
		'font-normal',
		'font-medium',
		'font-semibold',
		'font-mono'
	],
	extend: {
		height: {
			'80v': '80vh',
			'1/2': '50vh'
		},
		width: {
			'9/10': '90%'
		},
		maxWidth: {
			'80v': '80vw',
			'1/3': '33%'
		},
		fontFamily: {
			// add double quotes if there is space in font name
			main: ['Inter', 'Arial'],
			mono: [
				'ui-monospace',
				'SFMono-Regular',
				'Menlo',
				'Monaco',
				'Consolas',
				'"Liberation Mono"',
				'"Courier New"',
				'monospace'
			]
		},
		fontSize: {
			'2xs': ['11px', { lineHeight: '16px' }]
		}
	},
	theme: {
		extend: {
			keyframes: {
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(4px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				}
			},
			animation: {
				'fade-in': 'fade-in 0.3s ease-out'
			},
			colors: {
				gray: {
					50: '#f3f6f8',
					100: '#e0e7ed',
					200: '#c5d0dc',
					300: '#9dafc3',
					400: '#6e87a2',
					500: '#536c87',
					600: '#475973',
					700: '#3e4c60',
					800: '#394251',
					900: '#2e3440',
					950: '#1e232e',
					1000: '#181c24'
				},
				// Dynamic colors from tokens.json
				...generateThemeColors(),
				// Feedback colors (same for light/dark)
				feedback: {
					success: '#22C55E',
					warning: '#EAB308',
					error: '#EF4444',
					info: '#3B82F6'
				},
				// Reserved colors
				ai: {
					primary: tokens.tokens.light['reserved-ai']
				},
				// Web/Marketing colors (not for app use)
				brand: {
					vibrant: '#3B82F6',
					secondary: '#1E40AF',
					tertiary: '#DBEAFE'
				}
			}
		}
	},
	plugins: [
		require('@tailwindcss/forms'),
		plugin(({ addBase }) => {
			addBase({
				// Sets the style of the titles in the article list
				'h2 > a[href*="/blog/"]': {
					fontSize: '1.8rem',
					lineHeight: '105%',
					fontWeight: '500'
				}
			});
		}),
		// Custom plugin to generate text utilities that work with ! flag
		plugin(({ addUtilities, theme }) => {
			const textColors = theme('colors.text');
			const surfaceColors = theme('colors.surface');
			const utilities = {};

			// Generate text utilities that work with ! flag
			Object.keys(textColors).forEach((key) => {
				utilities[`.text-${key}`] = {
					color: textColors[key]
				};
			});

			// Generate surface/background utilities that work with ! flag
			Object.keys(surfaceColors).forEach((key) => {
				utilities[`.bg-${key}`] = {
					backgroundColor: surfaceColors[key]
				};
			});

			addUtilities(utilities);
		})
	]
};
