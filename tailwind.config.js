/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx}'
	],
	theme: {
		extend: {
			fontSize: {
				// Modern typographic scale with refined line heights
				'display-2xl': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.03em', fontWeight: '700' }], // 81px - Hero titles
				'display-xl': ['3.75rem', { lineHeight: '1', letterSpacing: '-0.025em', fontWeight: '700' }], // 67.5px
				'display-lg': ['3rem', { lineHeight: '1.05', letterSpacing: '-0.02em', fontWeight: '700' }], // 54px
				'h1': ['2.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }], // 45px
				'h2': ['2rem', { lineHeight: '1.2', letterSpacing: '-0.015em', fontWeight: '600' }], // 36px
				'h3': ['1.5rem', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '600' }], // 27px
				'h4': ['1.25rem', { lineHeight: '1.4', letterSpacing: '0em', fontWeight: '600' }], // 22.5px
				'h5': ['1.125rem', { lineHeight: '1.4', letterSpacing: '0em', fontWeight: '600' }], // 20.25px
				'lead': ['1.25rem', { lineHeight: '1.6', letterSpacing: '0em' }], // 22.5px - Intro text
				'body-lg': ['1.125rem', { lineHeight: '1.625', letterSpacing: '0em' }], // 20.25px
				'base': ['1rem', { lineHeight: '1.625', letterSpacing: '0em' }], // 18px
				'body-sm': ['0.9375rem', { lineHeight: '1.6', letterSpacing: '0em' }], // 16.875px
				'sm': ['0.875rem', { lineHeight: '1.5', letterSpacing: '0em' }], // 15.75px
				'xs': ['0.8125rem', { lineHeight: '1.5', letterSpacing: '0em' }], // 14.625px
							'caption': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.025em' }], // 13.5px
		},
		fontFamily: {
			// All variants map to Satoshi
			'sans': ['Satoshi', 'system-ui', 'sans-serif'],
			'satoshi': ['Satoshi', 'system-ui', 'sans-serif'],
			'display': ['Satoshi', 'system-ui', 'sans-serif'],
			'heading': ['Satoshi', 'system-ui', 'sans-serif'],
			'body': ['Satoshi', 'system-ui', 'sans-serif'],
			'ui': ['Satoshi', 'system-ui', 'sans-serif'],
			'mono': ['Satoshi', 'system-ui', 'sans-serif'],
			'code': ['Satoshi', 'system-ui', 'sans-serif'],
			
			// Legacy aliases for backward compatibility
			'plex': ['Satoshi', 'system-ui', 'sans-serif'],
			'jetbrains': ['Satoshi', 'system-ui', 'sans-serif'],
			
			// Barcode font only for branding
			'barcode': ['Libre Barcode 39', 'monospace']
		},
		colors: {
			},
			fontFamily: {
				// All variants map to Space Grotesk (Satoshi)
				'sans': ['"Space Grotesk"', 'system-ui', 'sans-serif'],
				'satoshi': ['"Space Grotesk"', 'system-ui', 'sans-serif'],
				'display': ['"Space Grotesk"', 'system-ui', 'sans-serif'],
				'heading': ['"Space Grotesk"', 'system-ui', 'sans-serif'],
				'body': ['"Space Grotesk"', 'system-ui', 'sans-serif'],
				'ui': ['"Space Grotesk"', 'system-ui', 'sans-serif'],
				'mono': ['"Space Grotesk"', 'system-ui', 'sans-serif'],
				'code': ['"Space Grotesk"', 'system-ui', 'sans-serif'],
				
				// Legacy aliases for backward compatibility
				'plex': ['"Space Grotesk"', 'system-ui', 'sans-serif'],
				'jetbrains': ['"Space Grotesk"', 'system-ui', 'sans-serif'],
				
				// Barcode font only for branding
				'barcode': ['Libre Barcode 39', 'monospace']
			},
			colors: {
				// Brand colors
				brand: {
					50: 'var(--brand-50)',
					100: 'var(--brand-100)',
					200: 'var(--brand-200)',
					300: 'var(--brand-300)',
					400: 'var(--brand-400)',
					500: 'var(--brand-500)',
					600: 'var(--brand-600)',
					700: 'var(--brand-700)',
					800: 'var(--brand-800)',
					900: 'var(--brand-900)',
					950: 'var(--brand-950)',
					DEFAULT: 'var(--brand)',
					hover: 'var(--brand-hover)',
					active: 'var(--brand-active)',
					subtle: 'var(--brand-subtle)',
					muted: 'var(--brand-muted)',
				},
				// Accent colors
				accent: {
					50: 'var(--accent-50)',
					100: 'var(--accent-100)',
					200: 'var(--accent-200)',
					300: 'var(--accent-300)',
					400: 'var(--accent-400)',
					500: 'var(--accent-500)',
					600: 'var(--accent-600)',
					700: 'var(--accent-700)',
					800: 'var(--accent-800)',
					900: 'var(--accent-900)',
					DEFAULT: 'var(--accent)',
					hover: 'var(--accent-hover)',
				},
				// Neutral scale
				neutral: {
					50: 'var(--neutral-50)',
					100: 'var(--neutral-100)',
					200: 'var(--neutral-200)',
					300: 'var(--neutral-300)',
					400: 'var(--neutral-400)',
					500: 'var(--neutral-500)',
					600: 'var(--neutral-600)',
					700: 'var(--neutral-700)',
					800: 'var(--neutral-800)',
					900: 'var(--neutral-900)',
					950: 'var(--neutral-950)',
				},
				// Slate scale (cool-toned)
				slate: {
					50: 'var(--slate-50)',
					100: 'var(--slate-100)',
					200: 'var(--slate-200)',
					300: 'var(--slate-300)',
					400: 'var(--slate-400)',
					500: 'var(--slate-500)',
					600: 'var(--slate-600)',
					700: 'var(--slate-700)',
					800: 'var(--slate-800)',
					900: 'var(--slate-900)',
					950: 'var(--slate-950)',
				},
				// Semantic tokens
				canvas: 'var(--bg-canvas)',
				paper: 'var(--bg-paper)',
				surface: 'var(--bg-surface)',
				elevated: 'var(--bg-elevated)',
				dark: 'var(--bg-dark)',
				darker: 'var(--bg-darker)',
				'text-primary': 'var(--text-primary)',
				'text-secondary': 'var(--text-secondary)',
				'text-muted': 'var(--text-muted)',
				'text-subtle': 'var(--text-subtle)',
				'text-on-dark': 'var(--text-on-dark)',
				'text-on-brand': 'var(--text-on-brand)',
				'text-on-accent': 'var(--text-on-accent)',
				structure: 'var(--border-subtle)',
				'border-muted': 'var(--border-muted)',
				'border-strong': 'var(--border-strong)',
			},
			boxShadow: {
				'xs': 'var(--shadow-xs)',
				'sm': 'var(--shadow-sm)',
				'md': 'var(--shadow-md)',
				'lg': 'var(--shadow-lg)',
				'xl': 'var(--shadow-xl)',
			},
			borderRadius: {
				'xs': 'var(--radius-xs)',
				'sm': 'var(--radius-sm)',
				'md': 'var(--radius-md)',
				'lg': 'var(--radius-lg)',
				'xl': 'var(--radius-xl)',
				'2xl': 'var(--radius-2xl)',
				'full': 'var(--radius-full)',
			},
			maxWidth: {
				'content': 'var(--content-max-width)'
			},
			transitionTimingFunction: {
				'smooth': 'var(--ease-smooth)',
			},
			transitionDuration: {
				'fast': 'var(--duration-fast)',
				'base': 'var(--duration-base)',
				'slow': 'var(--duration-slow)',
				'slower': 'var(--duration-slower)',
			}
		}
	},
	plugins: []
}
