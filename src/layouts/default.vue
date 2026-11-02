<script setup lang="ts">
	/**
	 * Default content layout — Slidev's content layout with the soft drifting
	 * living-gradient auroras (AuroraGlow) behind the content, mirroring the
	 * statement slide aesthetic while preserving full content legibility.
	 */
</script>

<template>
	<div class="slidev-layout default paper-bg relative overflow-hidden">
		<!-- soft drifting brand-colour auroras (living-gradient backdrop) -->
		<AuroraGlow />

		<div class="relative z-10 h-full">
			<slot />
		</div>
	</div>
</template>
