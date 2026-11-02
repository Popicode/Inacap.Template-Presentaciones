<script setup lang="ts">
	/**
	 * Global header injected on every slide by Slidev.
	 *
	 * Shows the corporate INACAP isotype in the top-right corner on every slide
	 * (cover included) so the mark stays consistent across the whole deck.
	 * https://sli.dev/custom/directory-structure#global-layers
	 *
	 * Also applies the deck-wide brand accent chosen in the headmatter
	 * (`themeConfig.brand`) — see `useDeckBrand`.
	 */
	import { useDeckBrand } from './composables/use-deck-brand';

	// apply the frontmatter brand (pink | rose | fuchsia) deck-wide + on export
	useDeckBrand();
</script>

<template>
	<!-- live background-style picker (discreet, hidden in print/export) -->
	<ThemeSwitcher />

	<header
		class="pointer-events-none absolute right-6 top-4 z-10 print:hidden"
	>
		<BrandLogo :size="16" class="opacity-80" />
	</header>
</template>
