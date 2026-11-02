<script setup lang="ts">
	/**
	 * Statement layout — a single, centered editorial sentence (serif) for
	 * vision / mission / key-takeaway slides, framed by an oversized quotation
	 * mark and a soft brand glow.
	 */
</script>

<template>
	<div
		class="slidev-layout flex-center relative h-full w-full overflow-hidden paper-bg"
	>
		<!-- soft drifting brand-colour auroras (living-gradient backdrop) -->
		<AuroraGlow />

		<!-- oversized decorative quote mark in tinted red -->
		<div
			class="anim-scale-in pointer-events-none absolute left-1/2 top-[12%] -translate-x-1/2 select-none font-serif text-[16rem] leading-none text-brand-red/10"
		>
			“
		</div>

		<div
			class="anim-fade-up relative z-10 max-w-4xl px-12 text-center font-serif text-4xl font-medium leading-relaxed tracking-tight text-balance text-brand-red-dark dark:text-white md:text-5xl"
		>
			<slot />
		</div>
	</div>
</template>
