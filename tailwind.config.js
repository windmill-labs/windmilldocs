const plugin = require('tailwindcss/plugin');

module.exports = {
	darkMode: ['class', '[data-theme="dark"]'],
	content: ['./src/**/*.{html,js,jsx,tsx}'],
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
