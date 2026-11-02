<script setup lang="ts">
	/**
	 * Ambient background decoration — glowing accent streaks that flow along soft
	 * curves ("snake" lines), in the official corporate INACAP palette.
	 * Purely decorative; the motion pauses under `prefers-reduced-motion`.
	 * Drop it inside any `relative overflow-hidden` surface (cover / section / end layouts).
	 */
</script>

<template>
	<svg
		class="snake-lines pointer-events-none absolute inset-0 h-full w-full"
		viewBox="0 0 1280 720"
		preserveAspectRatio="none"
		fill="none"
		aria-hidden="true"
	>
		<path class="snake snake-1" d="M-80 160 C 280 70, 640 280, 1360 150" />
		<path class="snake snake-2" d="M-80 300 C 360 220, 760 420, 1360 280" />
		<path class="snake snake-3" d="M-80 430 C 320 360, 820 540, 1360 430" />
		<path class="snake snake-4" d="M-80 560 C 380 640, 720 440, 1360 600" />
		<path class="snake snake-5" d="M-80 230 C 420 320, 880 120, 1360 250" />
	</svg>
</template>

<style scoped>
	.snake {
		fill: none;
		stroke-width: 2.5;
		stroke-linecap: round;
		stroke-dasharray: 90 540;
		opacity: 0.65;
		animation: snake-travel 6s linear infinite;
	}

	.snake-1 {
		stroke: var(--inacap-primary);
		filter: drop-shadow(0 0 6px var(--inacap-primary));
	}

	.snake-2 {
		stroke: var(--inacap-red-alt);
		filter: drop-shadow(0 0 8px var(--inacap-red-alt));
		animation-duration: 7.5s;
		animation-delay: -2s;
	}

	.snake-3 {
		stroke: var(--inacap-crimson);
		filter: drop-shadow(0 0 6px var(--inacap-crimson));
		animation-duration: 9s;
		animation-delay: -4s;
		animation-direction: reverse;
	}

	.snake-4 {
		stroke: var(--inacap-navy);
		filter: drop-shadow(0 0 6px var(--inacap-navy));
		animation-duration: 8s;
		animation-delay: -1s;
	}

	.snake-5 {
		stroke: var(--inacap-red);
		filter: drop-shadow(0 0 6px var(--inacap-red));
		opacity: 0.6;
		animation-duration: 6.5s;
		animation-delay: -3s;
		animation-direction: reverse;
	}

	@keyframes snake-travel {
		from {
			stroke-dashoffset: 630;
		}

		to {
			stroke-dashoffset: 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.snake {
			animation: none !important;
		}
	}
</style>
