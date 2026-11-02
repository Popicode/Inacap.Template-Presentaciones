import { ref } from 'vue';

import { useDeckTheme } from '../composables/use-deck-theme';

/**
 * Official INACAP accent tokens shared by interactive components.
 *
 * Keeps the corporate brand palette in a single typed place so every component exposes
 * the same `accent` prop contract.
 */
export type BrandAccent =
	'crimson' | 'fuchsia' | 'navy' | 'pink' | 'primary' | 'red' | 'rose';

interface AccentTokens {
	dark: string;
	soft: string;
	solid: string;
}

interface ResolvedAccent extends AccentTokens {
	/** on-surface label tone: `dark` on light surfaces, `soft` on dark/AMOLED — mirrors `--accent-label`. */
	label: string;
}

const ACCENTS: Record<BrandAccent, AccentTokens> = {
	// Official INACAP red (Pantone 485 C)
	red: { solid: '#E11927', soft: '#FCA5A5', dark: '#991B1B' },
	// Alias of the lead red for per-component use
	primary: { solid: '#E11927', soft: '#FCA5A5', dark: '#991B1B' },
	// Deep crimson / dark corporate red
	crimson: { solid: '#991B1B', soft: '#FECACA', dark: '#450A0A' },
	// Corporate institutional / technical navy blue
	navy: { solid: '#1E3A8A', soft: '#BFDBFE', dark: '#0A2540' },

	// Backward compatibility aliases mapped to the official palette
	pink: { solid: '#E11927', soft: '#FCA5A5', dark: '#991B1B' },
	rose: { solid: '#991B1B', soft: '#FECACA', dark: '#450A0A' },
	fuchsia: { solid: '#0A2540', soft: '#93C5FD', dark: '#030D18' },
};

/**
 * Brand accents selectable as the **deck-wide** brand. Set via the
 * `themeConfig.brand` headmatter and applied by `useDeckBrand`.
 */
export const DECK_BRANDS = [
	'red',
	'navy',
	'crimson',
	'pink',
	'rose',
	'fuchsia',
] as const satisfies readonly BrandAccent[];

/**
 * Active deck brand — the single source of truth for the *default* accent across
 * the deck. `useDeckBrand` sets it from the frontmatter; components that don't pin
 * an explicit `accent` inherit it through `resolveAccent`'s default.
 */
export const activeBrand = ref<BrandAccent>('red');

const { theme, themes } = useDeckTheme();

/**
 * Resolves the hex tokens for a given accent. When no accent is provided it falls
 * back to the active deck brand (so unspecified component accents follow the deck);
 * an unknown value falls back to the lead red.
 *
 * @param accent - one of the supported brand accents; omit to inherit the deck brand
 * @returns solid / soft / dark hex tokens for that accent, plus the theme-aware `label` tone
 */
export function resolveAccent(
	accent: BrandAccent = activeBrand.value,
): ResolvedAccent {
	const tokens = ACCENTS[accent] ?? ACCENTS.red;
	const isDark = themes.find((t) => t.id === theme.value)?.dark ?? false;

	return { ...tokens, label: isDark ? tokens.soft : tokens.dark };
}
