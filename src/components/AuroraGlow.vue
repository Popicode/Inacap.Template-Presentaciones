<script setup lang="ts">
	import { computed } from 'vue';
	import { type BrandAccent, resolveAccent } from './brand-accents';

	/**
	 * Ambient background decoration — large, heavily-blurred brand-colour orbs
	 * ("auroras") that drift and breathe very slowly behind the content for a
	 * premium "living gradient" feel. Purely decorative; the motion freezes under
	 * `prefers-reduced-motion`. Drop it inside any `relative overflow-hidden`
	 * surface (cover / section / end / statement layouts).
	 *
	 * `accent` tints the lead orb so a section divider keeps its per-chapter
	 * colour; without it the lead orb leads in corporate red.
	 */
	const props = withDefaults(defineProps<{ accent?: BrandAccent }>(), {
		accent: undefined,
	});

	/** Lead orb colour: the chapter accent when given, else corporate red. */
	const leadColor = computed(() =>
		props.accent ? resolveAccent(props.accent).solid : 'var(--inacap-red)',
	);
</script>

<template>
	<div class="aurora pointer-events-none absolute inset-0" aria-hidden="true">
		<div
			class="orb orb-1 blur-3xl"
			:style="{
				background: `radial-gradient(circle, ${leadColor}, transparent 70%)`,
			}"
		/>
		<div class="orb orb-2 blur-3xl" />
		<div class="orb orb-3 blur-3xl" />
	</div>
</template>

<style scoped>
	.orb {
		position: absolute;
		border-radius: 9999px;
		will-change: transform, opacity;
	}

	/* corporate red / accent — top-left, the widest sweep */
	.orb-1 {
		left: -10%;
		top: -16%;
		height: 40rem;
		width: 40rem;
		opacity: 0.16;
		animation: aurora-drift-1 26s ease-in-out infinite alternate;
	}

	/* bright primary — top-right */
	.orb-2 {
		right: -12%;
		top: -10%;
		height: 34rem;
		width: 34rem;
		background: radial-gradient(
			circle,
			var(--inacap-primary),
			transparent 70%
		);
		opacity: 0.14;
		animation: aurora-drift-2 32s ease-in-out -6s infinite alternate;
	}

	/* crimson / navy counterpoint — bottom */
	.orb-3 {
		left: 28%;
		bottom: -22%;
		height: 38rem;
		width: 38rem;
		background: radial-gradient(
			circle,
			var(--inacap-crimson),
			transparent 70%
		);
		opacity: 0.12;
		animation: aurora-drift-3 38s ease-in-out -12s infinite alternate;
	}

	@keyframes aurora-drift-1 {
		from {
			transform: translate3d(0, 0, 0) scale(1);
			opacity: 0.12;
		}

		to {
			transform: translate3d(7%, 5%, 0) scale(1.12);
			opacity: 0.18;
		}
	}

	@keyframes aurora-drift-2 {
		from {
			transform: translate3d(0, 0, 0) scale(1.08);
			opacity: 0.1;
		}

		to {
			transform: translate3d(-6%, 6%, 0) scale(0.96);
			opacity: 0.16;
		}
	}

	@keyframes aurora-drift-3 {
		from {
			transform: translate3d(0, 0, 0) scale(0.94);
			opacity: 0.08;
		}

		to {
			transform: translate3d(5%, -4%, 0) scale(1.06);
			opacity: 0.14;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.orb {
			animation: none !important;
		}
	}
</style>
