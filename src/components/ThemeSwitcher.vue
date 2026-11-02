<script setup lang="ts">
	/**
	 * Discreet background-style picker, mounted globally via global-top.vue.
	 *
	 * Collapsed it shows a single circle with the *current* style; on hover it
	 * expands to reveal the other styles (Beige / Dark / AMOLED). The choice
	 * persists in localStorage. Hidden in print/export (`print:hidden`), so
	 * PDF/PPTX render in the deck default (see `DEFAULT_THEME`).
	 */
	import { computed } from 'vue';

	import { useDeckTheme } from '../composables/use-deck-theme';

	const { theme, themes, setTheme } = useDeckTheme();

	// active style first so it stays as the visible "face" while collapsed;
	// the rest stay width-0 until the group is hovered, then expand out.
	const orderedThemes = computed(() => [
		...themes.filter((style) => style.id === theme.value),
		...themes.filter((style) => style.id !== theme.value),
	]);
</script>

<template>
	<div
		class="group pointer-events-auto absolute left-4 top-3 z-20 flex items-center overflow-hidden rounded-full bg-black/5 p-0.5 opacity-20 backdrop-blur-sm transition-opacity duration-300 hover:opacity-100 dark:bg-white/10 print:hidden"
		role="group"
		aria-label="Estilo de fondo"
	>
		<button
			v-for="style in orderedThemes"
			:key="style.id"
			type="button"
			:title="`Estilo: ${style.label}`"
			:aria-label="`Estilo ${style.label}`"
			:aria-pressed="theme === style.id"
			class="flex-center h-5 shrink-0 rounded-full text-xs transition-all duration-300"
			:class="
				theme === style.id
					? 'w-5 bg-primary text-white'
					: 'ml-0 w-0 text-ink-soft opacity-0 group-hover:ml-0.5 group-hover:w-5 group-hover:opacity-100 hover:bg-black/5 dark:text-white/70 dark:hover:bg-white/10'
			"
			@click="setTheme(style.id)"
		>
			<div :class="style.icon" />
		</button>
	</div>
</template>
