<script setup lang="ts">
	/**
	 * Global footer injected on every slide by Slidev.
	 *
	 * Shows the page indicator in the bottom-right corner on content slides
	 * (hidden on the cover so it stays clean), mirroring the deck layout. The
	 * corporate isotype lives in the top-right corner (see global-top.vue).
	 * https://sli.dev/custom/directory-structure#global-layers
	 */
	import { useNav } from '@slidev/client';

	const { currentPage, total } = useNav();
</script>

<template>
	<footer
		v-if="currentPage > 1"
		class="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-end px-6 py-3 text-xs print:hidden"
	>
		<span class="font-medium tabular-nums text-ink-soft dark:text-white/55">
			{{ currentPage }} / {{ total }}
		</span>
	</footer>
</template>
