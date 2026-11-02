<script setup lang="ts">
	import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
	import { type BrandAccent, resolveAccent } from './brand-accents';

	/**
	 * Animated metric card with a count-up effect when it enters the viewport.
	 *
	 * @example
	 * <StatCard :value="98" suffix="%" label="Cobertura" accent="pink" icon="i-mdi-shield-check" />
	 */
	const props = withDefaults(
		defineProps<{
			/** target numeric value to count up to */
			value: number;
			/** caption under the number */
			label: string;
			/** symbol appended to the value (%, x, k…) */
			suffix?: string;
			/** brand accent */
			accent?: BrandAccent;
			/** iconify class, e.g. i-mdi-rocket-launch */
			icon?: string;
			/** count-up duration in ms */
			duration?: number;
		}>(),
		{ suffix: '', accent: 'pink', duration: 1400 },
	);

	const tokens = computed(() => resolveAccent(props.accent));
	const display = ref(0);
	const root = ref<HTMLElement>();
	let frame = 0;
	let observer: IntersectionObserver | undefined;

	function animate() {
		const start = performance.now();
		const tick = (now: number) => {
			const progress = Math.min((now - start) / props.duration, 1);
			// easeOutCubic for a snappy, premium feel
			const eased = 1 - (1 - progress) ** 3;
			display.value = Math.round(eased * props.value);
			if (progress < 1) frame = requestAnimationFrame(tick);
		};
		frame = requestAnimationFrame(tick);
	}

	onMounted(() => {
		if (!root.value) return;
		observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					animate();
					observer?.disconnect();
				}
			},
			{ threshold: 0.4 },
		);
		observer.observe(root.value);
	});

	onBeforeUnmount(() => {
		cancelAnimationFrame(frame);
		observer?.disconnect();
	});
</script>

<template>
	<div
		ref="root"
		class="card anim-scale-in flex flex-col gap-2 p-5"
		:style="{
			borderTop: `4px solid ${tokens.solid}`,
		}"
	>
		<div
			v-if="icon"
			class="flex-center h-11 w-11 rounded-xl text-2xl text-white"
			:style="{
				background: `linear-gradient(135deg, ${tokens.solid}, ${tokens.dark})`,
			}"
		>
			<div :class="icon" />
		</div>

		<div class="flex items-baseline gap-1">
			<span
				class="text-5xl font-extrabold tabular-nums"
				:style="{ color: tokens.solid }"
			>
				{{ display }}
			</span>
			<span class="text-2xl font-bold" :style="{ color: tokens.solid }">
				{{ suffix }}
			</span>
		</div>

		<span class="text-sm font-medium text-gray-600 dark:text-gray-300">
			{{ label }}
		</span>
	</div>
</template>
