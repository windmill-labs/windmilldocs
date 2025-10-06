const plugin = require('tailwindcss/plugin');

module.exports = {
	darkMode: ['class', '[data-theme="dark"]'],
	content: ['./src/**/*.{html,js,jsx,tsx}'],
	safelist: [
		// Brand color classes that may be generated dynamically
		'bg-surface-primary-light',
		'bg-surface-primary-dark',
		'bg-surface-secondary-light',
		'bg-surface-secondary-dark',
		'bg-surface-tertiary-light',
		'bg-surface-tertiary-dark',
		'bg-surface-hover-light',
		'bg-surface-hover-dark',
		'bg-surface-selected-light',
		'bg-surface-selected-dark',
		'bg-surface-disabled-light',
		'bg-surface-disabled-dark',
		'text-text-primary-light',
		'text-text-primary-dark',
		'text-text-emphasis-light',
		'text-text-emphasis-dark',
		'text-text-secondary-light',
		'text-text-secondary-dark',
		'text-text-tertiary-light',
		'text-text-tertiary-dark',
		'text-text-hint-light',
		'text-text-hint-dark',
		'text-text-disabled-light',
		'text-text-disabled-dark',
		'border-border-light-light',
		'border-border-light-dark',
		'border-border-normal-light',
		'border-border-normal-dark',
		'border-border-accent-light',
		'border-border-accent-dark',
		'bg-accent-primary',
		'bg-accent-hover',
		'bg-accent-clicked',
		'bg-accent-secondary-light',
		'bg-accent-secondary-dark',
		'bg-feedback-success',
		'bg-feedback-warning',
		'bg-feedback-error',
		'bg-feedback-info'
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
		}
	},
	theme: {
		extend: {
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
				// Brand accent colors
				accent: {
					primary: '#758FF8',
					hover: '#5074F6',
					clicked: '#2C5BEB',
					'secondary-light': '#293676',
					'secondary-dark': '#E8EBFB',
					'selected-light': 'rgba(191, 219, 254, 0.3)',
					'selected-dark': 'rgba(37, 99, 235, 0.3)'
				},
				// Surface colors - flattened for proper Tailwind class generation
				surface: {
					'primary-light': '#FBFBFD',
					'primary-dark': '#3B4252',
					'secondary-light': '#EFEFF4',
					'secondary-dark': '#2E3440',
					'tertiary-light': '#FFFFFF',
					'tertiary-dark': '#434C5E',
					'hover-light': '#EEEEF5',
					'hover-dark': '#454F64',
					'selected-light': '#FFFFFF',
					'selected-dark': '#434C5E',
					'disabled-light': '#D8D8E4',
					'disabled-dark': '#212732'
				},
				// Text colors - flattened for proper Tailwind class generation
				text: {
					'primary-light': '#4A5568',
					'primary-dark': '#D4D8DD',
					'emphasis-light': '#2D3748',
					'emphasis-dark': '#F3F4F6',
					'secondary-light': '#718096',
					'secondary-dark': '#AAB0BB',
					'tertiary-light': '#A4A9B2',
					'tertiary-dark': '#A8A9AC',
					'hint-light': '#757E8F',
					'hint-dark': '#9196A1',
					'disabled-light': '#A0AEC0',
					'disabled-dark': '#FFFFFF'
				},
				// Border colors - flattened for proper Tailwind class generation
				border: {
					'light-light': '#E5E7EB',
					'light-dark': '#495A72',
					'normal-light': '#9CA3AF',
					'normal-dark': '#AAB0BB',
					'accent-light': '#758FF8',
					'accent-dark': '#FFFFFF'
				},
				// Feedback colors (same for light/dark)
				feedback: {
					success: '#22C55E',
					warning: '#EAB308',
					error: '#EF4444',
					info: '#3B82F6'
				},
				// Reserved colors
				ai: {
					primary: '#8B5CF6'
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
		})
	]
};
