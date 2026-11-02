<script setup lang="ts">
	import { computed } from 'vue';
	import {
		type BrandAccent,
		resolveAccent,
	} from '../components/brand-accents';

	/**
	 * Section divider layout — flat corporate cream band used to break the deck
	 * into chapters. The accent (bar, watermark and glow) is driven by the slide
	 * frontmatter `accent` so each chapter gets its own brand colour rhythm.
	 * Content (an `## Heading` + optional lead) renders in the slot.
	 */
	const props = withDefaults(defineProps<{ accent?: BrandAccent }>(), {
		accent: 'red',
	});

	const tokens = computed(() => resolveAccent(props.accent));
</script>

<template>
	<div class="slidev-layout paper-bg relative h-full w-full overflow-hidden">
		<!-- soft drifting auroras; lead orb tinted with the chapter accent -->
		<AuroraGlow :accent="accent" />

		<!-- on-brand backdrop: rhythm wave + drifting ambient markers -->
		<DailyRoutineSymbols />

		<!-- oversized index watermark in the chapter accent -->
		<div
			class="pointer-events-none absolute -bottom-16 left-6 select-none text-[20rem] font-extrabold leading-none opacity-10"
			:style="{ color: tokens.solid }"
		>
			§
		</div>

		<div class="relative z-10 flex h-full flex-col justify-center px-16">
			<div
				class="mb-6 h-1.5 w-24 origin-left rounded-full"
				:style="{
					background: tokens.solid,
					animation:
						'inacap-grow-x 0.6s cubic-bezier(0.22, 1, 0.36, 1) both',
				}"
			/>
			<div class="anim-fade-up">
				<slot />
			</div>
		</div>
	</div>
</template>
