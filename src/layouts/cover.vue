<script setup lang="ts">
	/**
	 * Cover layout — flat corporate cream surface with the title block
	 * centered. The INACAP isotype is shown by the global header
	 * (`global-top.vue`) on every slide, cover included.
	 *
	 * Slide content (title, subtitle, meta) is provided as markdown and rendered
	 * through the default slot.
	 */
</script>

<template>
	<div
		class="slidev-layout bg-inacap-mesh paper-bg relative h-full w-full overflow-hidden"
	>
		<!-- soft drifting brand-colour auroras (backmost living-gradient layer) -->
		<AuroraGlow />

		<!-- on-brand backdrop: daily-rhythm wave + drifting routine icons -->
		<DailyRoutineSymbols />

		<div class="relative z-10 flex h-full items-center px-16 md:px-24">
			<div class="max-w-3xl">
				<slot />
			</div>
		</div>
	</div>
</template>
