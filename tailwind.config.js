/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    // Override default breakpoints to match our design system
    screens: {
      xs: '360px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },

    extend: {
      /* ================================================================
         DESIGN TOKEN INTEGRATION
         All values reference CSS variables from tokens.css
         ================================================================ */

      // === COLORS ===
      colors: {
        // Top-level inverse mapping for token-driven text set
        inverse: 'var(--color-text-inverse)',
        // Coquelicot Noir palette bridges
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        surface2: 'var(--surface-2)',
        ink: 'var(--text)',
        muted: 'var(--muted)',
        line: 'var(--line)',
        accent: 'var(--accent)',

        // Neutral scale
        neutral: {
          0: 'var(--color-neutral-0)',
          50: 'var(--color-neutral-50)',
          100: 'var(--color-neutral-100)',
          200: 'var(--color-neutral-200)',
          300: 'var(--color-neutral-300)',
          400: 'var(--color-neutral-400)',
          500: 'var(--color-neutral-500)',
          600: 'var(--color-neutral-600)',
          700: 'var(--color-neutral-700)',
          800: 'var(--color-neutral-800)',
          900: 'var(--color-neutral-900)',
          950: 'var(--color-neutral-950)',
          1000: 'var(--color-neutral-1000)',
        },

        // Refined palette
        cream: 'var(--color-cream-bg)',
        ink: 'var(--color-ink)',
        muted: 'var(--color-muted)',
        'accent-mint': 'var(--color-accent-mint)',
        shadow: 'var(--color-shadow)',

        // Brand colors
        brand: {
          50: 'var(--color-brand-50)',
          100: 'var(--color-brand-100)',
          200: 'var(--color-brand-200)',
          300: 'var(--color-brand-300)',
          400: 'var(--color-brand-400)',
          500: 'var(--color-brand-500)',
          600: 'var(--color-brand-600)',
          700: 'var(--color-brand-700)',
          800: 'var(--color-brand-800)',
          900: 'var(--color-brand-900)',
          950: 'var(--color-brand-950)',
          DEFAULT: 'var(--color-interactive-primary)',
        },

        // Accent colors
        accent: {
          50: 'var(--color-accent-50)',
          100: 'var(--color-accent-100)',
          200: 'var(--color-accent-200)',
          300: 'var(--color-accent-300)',
          400: 'var(--color-accent-400)',
          500: 'var(--color-accent-500)',
          600: 'var(--color-accent-600)',
          700: 'var(--color-accent-700)',
          800: 'var(--color-accent-800)',
          900: 'var(--color-accent-900)',
        },

        // Semantic background colors
        bg: {
          canvas: 'var(--color-bg-canvas)',
          surface: 'var(--color-bg-surface)',
          elevated: 'var(--color-bg-elevated)',
          overlay: 'var(--color-bg-overlay)',
          muted: 'var(--color-bg-muted)',
          glass: 'var(--color-bg-glass)',
          panel: 'var(--color-bg-panel)',
        },

        // Semantic text colors
        text: {
          primary: 'var(--color-text-primary)',
          'primary-80': 'var(--color-text-primary-80)',
          'primary-88': 'var(--color-text-primary-88)',
          secondary: 'var(--color-text-secondary)',
          muted: 'var(--color-text-muted)',
          subtle: 'var(--color-text-subtle)',
          'on-brand': 'var(--color-text-on-brand)',
          inverse: 'var(--color-text-inverse)',
        },

        // Semantic border colors
        border: {
          subtle: 'var(--color-border-subtle)',
          DEFAULT: 'var(--color-border-default)',
          strong: 'var(--color-border-strong)',
          brand: 'var(--color-border-brand)',
          error: 'var(--color-border-error)',
        },

        // Interactive colors
        interactive: {
          primary: {
            DEFAULT: 'var(--color-interactive-primary)',
            hover: 'var(--color-interactive-primary-hover)',
            active: 'var(--color-interactive-primary-active)',
          },
          secondary: {
            DEFAULT: 'var(--color-interactive-secondary)',
            hover: 'var(--color-interactive-secondary-hover)',
            active: 'var(--color-interactive-secondary-active)',
          },
          ghost: {
            DEFAULT: 'var(--color-interactive-ghost)',
            hover: 'var(--color-interactive-ghost-hover)',
            active: 'var(--color-interactive-ghost-active)',
          },
          disabled: 'var(--color-interactive-disabled)',
          focus: 'var(--color-interactive-focus)',
        },

        // Status colors
        success: {
          light: 'var(--color-success-light)',
          DEFAULT: 'var(--color-success)',
          dark: 'var(--color-success-dark)',
        },
        warning: {
          light: 'var(--color-warning-light)',
          DEFAULT: 'var(--color-warning)',
          dark: 'var(--color-warning-dark)',
        },
        error: {
          light: 'var(--color-error-light)',
          DEFAULT: 'var(--color-error)',
          dark: 'var(--color-error-dark)',
        },
        info: {
          light: 'var(--color-info-light)',
          DEFAULT: 'var(--color-info)',
          dark: 'var(--color-info-dark)',
        },
      },

      // === SPACING ===
      spacing: {
        0: 'var(--space-0)',
        1: 'var(--space-1)',
        2: 'var(--space-2)',
        3: 'var(--space-3)',
        4: 'var(--space-4)',
        5: 'var(--space-5)',
        6: 'var(--space-6)',
        8: 'var(--space-8)',
        10: 'var(--space-10)',
        12: 'var(--space-12)',
        14: 'var(--space-14)',
        16: 'var(--space-16)',
        18: 'var(--space-18)',
        20: 'var(--space-20)',
        24: 'var(--space-24)',
        32: 'var(--space-32)',
        40: 'var(--space-40)',
        48: 'var(--space-48)',
        56: 'var(--space-56)',
        64: 'var(--space-64)',
      },

      // === TYPOGRAPHY ===
      fontSize: {
        // Utility sizes
        caption: [
          'var(--font-size-caption)',
          { lineHeight: 'var(--line-height-normal)' },
        ], // 13px
        small: ['var(--font-size-small)', { lineHeight: 'var(--line-height-normal)' }], // 14px
        base: ['var(--font-size-base)', { lineHeight: 'var(--line-height-normal)' }], // 16px
        lg: ['var(--font-size-lg)', { lineHeight: 'var(--line-height-normal)' }], // 18px

        // 2025 Spec-Compliant Semantic Headings
        h1: [
          'var(--font-size-h1)',
          {
            lineHeight: 'var(--line-height-tight)',
            letterSpacing: 'var(--letter-spacing-tight)',
          },
        ], // 22-32px
        h2: [
          'var(--font-size-h2)',
          {
            lineHeight: 'var(--line-height-tight)',
            letterSpacing: 'var(--letter-spacing-tight)',
          },
        ], // 20-28px
        h3: [
          'var(--font-size-h3)',
          {
            lineHeight: 'var(--line-height-snug)',
            letterSpacing: 'var(--letter-spacing-normal)',
          },
        ], // 18-24px

        // Legacy sizes (for backwards compatibility)
        xl: ['var(--font-size-xl)', { lineHeight: 'var(--line-height-snug)' }],
        '2xl': ['var(--font-size-2xl)', { lineHeight: 'var(--line-height-snug)' }],
        '3xl': ['var(--font-size-3xl)', { lineHeight: 'var(--line-height-tight)' }],
        '4xl': ['var(--font-size-4xl)', { lineHeight: 'var(--line-height-tight)' }],
        '5xl': ['var(--font-size-5xl)', { lineHeight: 'var(--line-height-tight)' }],
        '6xl': ['var(--font-size-6xl)', { lineHeight: 'var(--line-height-tight)' }],

        // Semantic display & heading sizes wired to CSS tokens
        'display-2xl': [
          'var(--font-display-2xl-size)',
          {
            lineHeight: 'var(--font-display-2xl-line)',
            letterSpacing: 'var(--font-display-2xl-track)',
          },
        ],
        'display-xl': [
          'var(--font-display-xl-size)',
          {
            lineHeight: 'var(--font-display-xl-line)',
            letterSpacing: 'var(--font-display-xl-track)',
          },
        ],
        'heading-l': [
          'var(--font-heading-l-size)',
          {
            lineHeight: 'var(--font-heading-l-line)',
            letterSpacing: 'var(--font-heading-l-track)',
          },
        ],
        'heading-m': [
          'var(--font-heading-m-size)',
          {
            lineHeight: 'var(--font-heading-m-line)',
            letterSpacing: 'var(--font-heading-m-track)',
          },
        ],
        body: ['var(--font-body-size)', { lineHeight: 'var(--font-body-line)' }],
        meta: [
          'var(--font-meta-size)',
          {
            lineHeight: 'var(--font-body-line)',
            letterSpacing: 'var(--font-meta-track)',
          },
        ],
      },

      // Expose display weight as a named font-weight so you can use `font-display`
      fontWeight: {
        display: 'var(--display-weight)',
      },

      fontWeight: {
        light: 'var(--font-weight-light)',
        normal: 'var(--font-weight-normal)',
        medium: 'var(--font-weight-medium)',
        semibold: 'var(--font-weight-semibold)',
        bold: 'var(--font-weight-bold)',
        black: 'var(--font-weight-black)',
      },

      lineHeight: {
        none: 'var(--line-height-none)',
        tight: 'var(--line-height-tight)',
        snug: 'var(--line-height-snug)',
        normal: 'var(--line-height-normal)',
        relaxed: 'var(--line-height-relaxed)',
        loose: 'var(--line-height-loose)',
      },

      letterSpacing: {
        tighter: 'var(--letter-spacing-tighter)',
        tight: 'var(--letter-spacing-tight)',
        normal: 'var(--letter-spacing-normal)',
        wide: 'var(--letter-spacing-wide)',
        wider: 'var(--letter-spacing-wider)',
        widest: 'var(--letter-spacing-widest)',
      },

      fontFamily: {
        // Use CSS variables so runtime font-family can be swapped without rebuilding
        sans: ['var(--font-sans-family)'],
        satoshi: ['var(--font-sans-family)'],
        // Semantic font stacks (display uses the serif token)
        display: ['var(--font-display-family)'],
        body: ['var(--font-sans-family)'],
        barcode: ['Libre Barcode 39', 'monospace'], // Only for branding
      },

      // === BORDER RADIUS ===
      borderRadius: {
        xs: 'var(--radius-xs)',
        sm: 'var(--radius-sm)',
        DEFAULT: 'var(--radius-md)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        soft: 'var(--radius-soft)',
        '2xl': 'var(--radius-2xl)',
        '3xl': 'var(--radius-3xl)',
        pill: 'var(--radius-pill)',
        full: 'var(--radius-full)',
      },

      // === SHADOWS ===
      boxShadow: {
        xs: 'var(--shadow-xs)',
        sm: 'var(--shadow-sm)',
        DEFAULT: 'var(--shadow-md)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
        '2xl': 'var(--shadow-2xl)',
        low: 'var(--shadow-low)',
        elev: 'var(--shadow-elev)',
        elev1: 'var(--shadow-1)',
        none: 'none',
      },

      // === TRANSITIONS ===
      transitionDuration: {
        instant: 'var(--duration-instant)',
        fast: 'var(--duration-fast)',
        DEFAULT: 'var(--duration-normal)',
        normal: 'var(--duration-normal)',
        moderate: 'var(--duration-moderate)',
        slow: 'var(--duration-slow)',
        slower: 'var(--duration-slower)',
        slowest: 'var(--duration-slowest)',
      },

      transitionTimingFunction: {
        DEFAULT: 'var(--ease-out)',
        linear: 'var(--ease-linear)',
        in: 'var(--ease-in)',
        out: 'var(--ease-out)',
        'in-out': 'var(--ease-in-out)',
        smooth: 'var(--ease-smooth)',
      },

      // === LAYOUT ===
      maxWidth: {
        content: 'var(--content-max-width)',
        'content-narrow': 'var(--content-max-width-narrow)',
        'content-wide': 'var(--content-max-width-wide)',
        line: 'var(--content-max-line-length)',
      },

      height: {
        nav: 'var(--nav-height)',
        'nav-mobile': 'var(--nav-height-mobile)',
      },

      backdropBlur: {
        16: '16px',
      },

      // === ASPECT RATIOS ===
      aspectRatio: {
        '1/1': '1 / 1',
        '3/2': '3 / 2',
        '4/3': '4 / 3',
        '16/9': '16 / 9',
        '21/9': '21 / 9',
        '9/16': '9 / 16',
        '4/5': '4 / 5',
      },

      // === ANIMATIONS ===
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        'slide-in-up': {
          '0%': { transform: 'translateY(16px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-in-down': {
          '0%': { transform: 'translateY(-16px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-in-left': {
          '0%': { transform: 'translateX(-16px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(16px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        'fade-in': 'fade-in var(--duration-normal) var(--ease-out)',
        'fade-out': 'fade-out var(--duration-normal) var(--ease-out)',
        'slide-in-up': 'slide-in-up var(--duration-moderate) var(--ease-out)',
        'slide-in-down': 'slide-in-down var(--duration-moderate) var(--ease-out)',
        'slide-in-left': 'slide-in-left var(--duration-moderate) var(--ease-out)',
        'slide-in-right': 'slide-in-right var(--duration-moderate) var(--ease-out)',
        'scale-in': 'scale-in var(--duration-moderate) var(--ease-out)',
      },
    },
  },

  plugins: [
    // Container queries plugin
    require('@tailwindcss/container-queries'),
  ],
};
