<script setup lang="ts">
	/**
	 * Closing layout — animated cream mesh with flowing "snake" accent lines.
	 * The INACAP isotype is shown by the global header (`global-top.vue`) on
	 * every slide, so it isn't repeated here. Calm, ambient motion.
	 */
</script>

<template>
	<div
		class="slidev-layout bg-inacap-mesh paper-bg flex-center relative h-full w-full overflow-hidden"
	>
		<AuroraGlow />

		<DailyRoutineSymbols />

		<div class="relative z-10 flex flex-col items-center gap-7 text-center">
			<div class="anim-fade-up">
				<slot />
			</div>
		</div>
	</div>
</template>
