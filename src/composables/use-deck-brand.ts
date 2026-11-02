import * as slidevClient from '@slidev/client';

import {
	activeBrand,
	type BrandAccent,
	DECK_BRANDS,
} from '../components/brand-accents';

/**
 * Deck-wide brand accent, chosen once per presentation in the headmatter:
 *
 * ```yaml
 * themeConfig:
 *   brand: red   # red (default) | navy | crimson | pink | rose | fuchsia
 * ```
 *
 * The value is surfaced by Slidev as `$slidev.themeConfigs.brand`; this composable
 * reads it, validates it against {@link DECK_BRANDS} and toggles an `accent-<brand>`
 * class on `<html>`. That class remaps the semantic `--accent-*` CSS variables (see
 * styles/layout.css) and `activeBrand` feeds `resolveAccent`, so every brand-driven
 * surface — titles, links, markers, eyebrow, gradient, layout glows and components
 * without an explicit `accent` — follows the chosen brand.
 *
 * Unlike the surface style (`useDeckTheme`, light/dark), the brand is **not** live
 * switchable: it is fixed by the deck frontmatter, which also keeps headless exports
 * (PDF/PPTX/PNG) on-brand since the headmatter is parsed at build time.
 */

/**
 * Brand used when the headmatter omits `themeConfig.brand` (and the export fallback).
 */
export const DEFAULT_BRAND: BrandAccent = 'red';

const BRAND_CLASSES = DECK_BRANDS.map((b) => `accent-${b}`);

/** Narrows an arbitrary headmatter value to a selectable deck brand. */
function isDeckBrand(value: unknown): value is (typeof DECK_BRANDS)[number] {
	return (
		typeof value === 'string' &&
		(DECK_BRANDS as readonly string[]).includes(value)
	);
}

/** Applies a brand by swapping the `accent-*` class on `<html>`. */
function apply(brand: BrandAccent): void {
	if (typeof document === 'undefined') return;

	const root = document.documentElement;

	root.classList.remove(...BRAND_CLASSES);
	root.classList.add(`accent-${brand}`);
}

/**
 * Reads the deck brand from the headmatter and applies it. Call once from the
 * global layer (`global-top.vue`) so it runs on every slide and during export.
 *
 * @returns the reactive active brand
 */
export function useDeckBrand(): { brand: typeof activeBrand } {
	// `useSlideContext` is a runtime export of @slidev/client but is missing from
	// its published type declarations across versions; reach it through the
	// namespace so vue-tsc stays clean.
	const { $slidev } = (
		slidevClient as unknown as {
			useSlideContext: () => {
				$slidev: { themeConfigs?: Record<string, unknown> };
			};
		}
	).useSlideContext();

	// `themeConfig.brand` from the headmatter — Slidev surfaces it here (`?.` guards
	// decks that omit `themeConfig`, where the value is undefined at runtime).
	const raw = $slidev.themeConfigs?.brand;
	const brand = isDeckBrand(raw) ? raw : DEFAULT_BRAND;

	activeBrand.value = brand;
	apply(brand);

	return { brand: activeBrand };
}
