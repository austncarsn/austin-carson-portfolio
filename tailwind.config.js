/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx}'
	],
	theme: {
		extend: {
			fontSize: {
				// Typographic scale (based on 18px root)
				'h1': ['4rem', { lineHeight: '1.05' }], // 72px
				'h2': ['2.666667rem', { lineHeight: '1.1' }], // 48px
				'h3': ['2.222222rem', { lineHeight: '1.08' }], // 40px
				'h4': ['1.777778rem', { lineHeight: '1.12' }], // 32px
				'h5': ['1.333333rem', { lineHeight: '1.2' }], // 24px
				'lead': ['1.125rem', { lineHeight: '1.6' }], // ~20px
				'base': ['1rem', { lineHeight: '1.6' }], // 18px base
				'sm': ['0.777778rem', { lineHeight: '1.5' }], // ~14px
			},
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
