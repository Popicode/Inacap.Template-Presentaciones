import { defineConfig, presetIcons } from 'unocss';

/**
 * UnoCSS configuration for the official INACAP Slidev template.
 *
 * Slidev ships its own UnoCSS presets (wind / attributify / icons); this file
 * is deep-merged on top, so here we only extend the design tokens: official INACAP
 * red corporate palette, typography and reusable shortcuts.
 *
 * @see https://sli.dev/custom/config-unocss
 */
export default defineConfig({
	presets: [presetIcons({ scale: 1.2, warn: true })],
	theme: {
		colors: {
			// SECTION: official INACAP corporate palette
			'brand-red': '#E11927',
			'brand-red-alt': '#FCA5A5',
			'brand-red-dark': '#991B1B',
			'brand-navy': '#0A2540',
			'brand-navy-alt': '#93C5FD',
			'brand-navy-dark': '#030D18',
			'brand-crimson': '#991B1B',
			'brand-crimson-alt': '#FECACA',
			'brand-crimson-dark': '#450A0A',

			// Backward compatibility aliases mapped to official palette
			'brand-pink': '#E11927',
			'brand-pink-alt': '#FCA5A5',
			'brand-pink-dark': '#991B1B',
			'brand-rose': '#991B1B',
			'brand-rose-alt': '#FECACA',
			'brand-rose-dark': '#450A0A',
			'brand-fuchsia': '#0A2540',
			'brand-fuchsia-alt': '#93C5FD',
			'brand-fuchsia-dark': '#030D18',

			// lead corporate accent (INACAP Red)
			primary: '#E11927',
			// clean corporate surfaces used on covers and section dividers
			cream: '#F8FAFC',
			'cream-alt': '#F1F5F9',
			// neutral text tones (body copy / muted labels)
			ink: '#1E293B',
			'ink-soft': '#64748B',
			// status palette (tables, badges)
			warning: '#f59e0b',
			danger: '#be123c',
			// dark-mode page surface used by the statement layout
			'paper-dark': '#0F172A',
		},
		fontFamily: {
			sans: '"Poppins", ui-sans-serif, system-ui, sans-serif',
			serif: '"Playfair Display", ui-serif, Georgia, serif',
		},
	},
	shortcuts: {
		// SECTION: layout helpers reused across slides and components
		'flex-center': 'flex items-center justify-center',
		'flex-between': 'flex items-center justify-between',
		'abs-center':
			'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
		// SECTION: surfaces — solid card with a uniform, consistent shadow
		card: 'rounded-2xl bg-white/80 dark:bg-white/5 backdrop-blur-md shadow-lg ring-1 ring-black/5 dark:ring-white/10 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-xl',
		'card-glass':
			'rounded-2xl bg-white/10 backdrop-blur-xl ring-1 ring-white/20 shadow-2xl',
		// rounded icon tile with a subtle brand-tinted gradient
		tile: 'flex-center shrink-0 rounded-xl ring-1 ring-black/5',
		// SECTION: typography
		// display-word gradient — INACAP red flow. The actual colour
		// stops live in styles/layout.css `.brand-gradient` so it can be a
		// symmetric, seamlessly-looping image; here the shortcut only clips
		// that fill to the text.
		'brand-gradient': 'bg-clip-text text-transparent',
		// eyebrow kicker — brand-toned label; --accent-label stays legible on light
		// and dark surfaces (deep in light, bright in dark)
		eyebrow:
			'text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent-label)]',
		// SECTION: pills / chips
		chip: 'inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium',
	},
	safelist: [
		// dynamic brand classes built at runtime inside components
		...[
			'red',
			'navy',
			'crimson',
			'pink',
			'rose',
			'fuchsia',
			'primary',
		].flatMap((c) => [
			`text-brand-${c}`,
			`bg-brand-${c}`,
			`from-brand-${c}`,
			`to-brand-${c}`,
		]),
		// theme-switcher icons (bound dynamically, so not statically detected)
		'i-mdi-white-balance-sunny',
		'i-mdi-weather-night',
		'i-mdi-circle',
	],
});
