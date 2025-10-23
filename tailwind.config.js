/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx}'
	],
	theme: {
		extend: {
			fontFamily: {
				// Keep the existing utility names but map them to the new typefaces
				'satoshi': ['"Space Grotesk"', 'sans-serif'], // H1 / major headings
				'plex': ['"IBM Plex Sans"', 'sans-serif'], // body & UI
				'jetbrains': ['"JetBrains Mono"', 'monospace'], // code snippets
				'barcode': ['Libre Barcode 39', 'monospace']
			},
			colors: {
				brand: 'var(--brand)',
				accent: 'var(--accent)',
				paper: 'var(--bg-paper)',
				surface: 'var(--bg-surface)',
				dark: 'var(--bg-dark)',
				'text-primary': 'var(--text-primary)',
				'text-muted': 'var(--text-muted)',
				'text-on-dark': 'var(--text-on-dark)',
				structure: 'var(--border)'
			},
			maxWidth: {
				'content': '1280px'
			}
		}
	},
	plugins: []
}
