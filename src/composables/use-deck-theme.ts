import { ref, type Ref } from 'vue';

/**
 * Selectable background style for the deck.
 *
 * The chosen style swaps the *surface* tokens (see styles/themes.css) via a
 * `theme-<id>` class on <html>; dark styles also carry the `.dark` class so the
 * existing contrast layer (text, headings, cards, mesh) applies unchanged.
 */
export type ThemeId = 'amoled' | 'beige' | 'dark';

interface ThemeDef {
	/** stable id, also the CSS class suffix (`theme-<id>`) */
	id: ThemeId;
	/** human label shown in the switcher tooltip */
	label: string;
	/** whether this style belongs to the dark family (adds `.dark`) */
	dark: boolean;
	/** Iconify MDI class for the switcher button (safelisted in uno.config.ts) */
	icon: string;
}

/** Available background styles, in switcher order (light → dark → amoled). */
export const THEMES: readonly ThemeDef[] = [
	{
		id: 'beige',
		label: 'Claro',
		dark: false,
		icon: 'i-mdi-white-balance-sunny',
	},
	{ id: 'dark', label: 'Dark', dark: true, icon: 'i-mdi-weather-night' },
	{ id: 'amoled', label: 'AMOLED', dark: true, icon: 'i-mdi-circle' },
];

/**
 * Deck-wide default style. This is the source of truth on first load and for
 * headless exports (PDF/PPTX/PNG), where no browser storage exists — change
 * this one line to publish the deck in another style.
 */
export const DEFAULT_THEME: ThemeId = 'beige';

const STORAGE_KEY = 'inacap-deck-theme';
const THEME_CLASSES = THEMES.map((t) => `theme-${t.id}`);

/** Reads the persisted style, falling back to the deck default. */
function readStored(): ThemeId {
	if (typeof window === 'undefined') return DEFAULT_THEME;

	const stored = window.localStorage.getItem(STORAGE_KEY);

	return THEMES.some((t) => t.id === stored)
		? (stored as ThemeId)
		: DEFAULT_THEME;
}

/** Applies a style by toggling the surface + dark classes on <html>. */
function apply(id: ThemeId): void {
	if (typeof document === 'undefined') return;

	const root = document.documentElement;
	const isDark = THEMES.find((t) => t.id === id)?.dark ?? false;

	root.classList.remove(...THEME_CLASSES);
	root.classList.add(`theme-${id}`);
	root.classList.toggle('dark', isDark);
}

// singleton reactive state shared across all components and slides
const current = ref<ThemeId>(readStored());

/**
 * Provides the active background style and a setter that toggles the classes on
 * <html> and persists to localStorage.
 */
export function useDeckTheme(): {
	/** active background style (reactive) */
	theme: Ref<ThemeId>;
	/** all available styles, in presentation order */
	themes: readonly ThemeDef[];
	/** switches the style, updating <html> and localStorage */
	setTheme: (id: ThemeId) => void;
} {
	function setTheme(id: ThemeId): void {
		current.value = id;
		apply(id);
		try {
			window.localStorage.setItem(STORAGE_KEY, id);
		} catch {
			/* storage may fail in restricted/private contexts */
		}
	}

	// ensure <html> carries the classes matching the initial state
	apply(current.value);

	return {
		theme: current,
		themes: THEMES,
		setTheme,
	};
}
