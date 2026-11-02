<script setup lang="ts">
	/**
	 * Decorative background for software development presentations:
	 * flowing data bus line with floating developer icons (terminal, code brackets,
	 * database storage, git branch, security shield) — on-brand for INACAP engineering.
	 * Place inside any `relative overflow-hidden` surface. Pauses under prefers-reduced-motion.
	 *
	 * `subtle` renders a calm, static watermark (no bright sweep, dimmed icons)
	 * for use behind content slides.
	 */
	const props = withDefaults(defineProps<{ subtle?: boolean }>(), {
		subtle: false,
	});

	const baseline = 580;
	const amplitude = 38;
	const period = 360;

	/** Smooth, repeating wave rhythm representing data/network flow along the bottom. */
	let wavePath = `M-60 ${baseline}`;
	for (let x = -60; x < 1340; x += period) {
		wavePath += ` C ${x + period * 0.25} ${baseline - amplitude}, ${x + period * 0.75} ${baseline + amplitude}, ${x + period} ${baseline}`;
	}
</script>

<template>
	<svg
		class="routinesym pointer-events-none absolute inset-0 h-full w-full"
		:class="{ 'is-subtle': props.subtle }"
		viewBox="0 0 1280 720"
		preserveAspectRatio="xMidYMid slice"
		fill="none"
		aria-hidden="true"
	>
		<!-- data bus path + sweeping signal pulse in official INACAP red -->
		<path
			class="wave-base"
			:d="wavePath"
			stroke="var(--inacap-red)"
			stroke-width="1.8"
		/>
		<path
			v-if="!props.subtle"
			class="wave-sweep"
			:d="wavePath"
			stroke="var(--inacap-red-alt)"
			stroke-width="2.5"
		/>

		<g fill="none" stroke-linecap="round" stroke-linejoin="round">
			<!-- 1. Terminal / CLI Prompt (Top Left Margin) -->
			<g
				class="dev-icon icon-1"
				transform="translate(55 150) scale(1.05)"
				stroke="var(--inacap-primary)"
				stroke-width="2"
			>
				<rect
					x="-24"
					y="-16"
					width="48"
					height="32"
					rx="5"
					fill="none"
				/>
				<line
					x1="-24"
					y1="-6"
					x2="24"
					y2="-6"
					opacity="0.6"
					stroke-width="1.5"
				/>
				<circle
					cx="-17"
					cy="-11"
					r="1.5"
					fill="var(--inacap-primary)"
					stroke="none"
				/>
				<circle
					cx="-12"
					cy="-11"
					r="1.5"
					fill="var(--inacap-primary)"
					stroke="none"
				/>
				<polyline
					points="-15,1 -10,5 -15,9"
					fill="none"
					stroke-width="2.2"
				/>
				<line x1="-6" y1="9" x2="4" y2="9" stroke-width="2.2" />
			</g>

			<!-- 2. Code Brackets < / > (Upper Right) -->
			<g
				class="dev-icon icon-2"
				transform="translate(1080 180) scale(1.15)"
				stroke="var(--inacap-primary)"
				stroke-width="2.2"
			>
				<polyline points="-8,-14 -18,0 -8,14" fill="none" />
				<polyline points="8,-14 18,0 8,14" fill="none" />
				<line
					x1="4"
					y1="-15"
					x2="-4"
					y2="15"
					stroke-width="1.8"
					opacity="0.75"
				/>
			</g>

			<!-- 3. Database / Storage (Mid Right) -->
			<g
				class="dev-icon icon-3"
				transform="translate(1140 370) scale(1.1)"
				stroke="var(--inacap-primary)"
				stroke-width="2"
			>
				<ellipse cx="0" cy="-12" rx="19" ry="6" fill="none" />
				<path
					d="M-19 -12 v8 c0 3.3 8.5 6 19 6 s19 -2.7 19 -6 v-8"
					fill="none"
				/>
				<path
					d="M-19 -4 v8 c0 3.3 8.5 6 19 6 s19 -2.7 19 -6 v-8"
					fill="none"
				/>
				<path
					d="M-19 4 v8 c0 3.3 8.5 6 19 6 s19 -2.7 19 -6 v-8"
					fill="none"
				/>
			</g>

			<!-- 4. Git Branch & Commits (Mid-Lower Left Margin) -->
			<g
				class="dev-icon icon-4"
				transform="translate(52 460) scale(1.1)"
				stroke="var(--inacap-primary)"
				stroke-width="2"
			>
				<!-- Main branch trunk -->
				<line x1="-12" y1="-20" x2="-12" y2="20" />
				<circle
					cx="-12"
					cy="-13"
					r="4.2"
					fill="var(--inacap-primary)"
				/>
				<circle cx="-12" cy="13" r="4.2" fill="var(--inacap-primary)" />
				<!-- Feature branch -->
				<path d="M-12 -3 C -4 -3, 12 4, 12 11" fill="none" />
				<circle cx="12" cy="11" r="4.2" fill="var(--inacap-primary)" />
			</g>

			<!-- 5. Security Shield / RBAC Key (Lower Right) -->
			<g
				class="dev-icon icon-5"
				transform="translate(1080 570) scale(1.05)"
				stroke="var(--inacap-primary)"
				stroke-width="2"
			>
				<path
					d="M0 -17 L15 -10 V3 C15 12 0 19 0 19 C0 19 -15 12 -15 3 V-10 Z"
					fill="none"
				/>
				<circle cx="0" cy="-1" r="2.5" fill="var(--inacap-primary)" />
				<line x1="0" y1="2" x2="0" y2="8" stroke-width="2.2" />
			</g>
		</g>
	</svg>
</template>

<style scoped>
	.wave-base {
		opacity: 0.1;
	}

	.wave-sweep {
		opacity: 0.75;
		stroke-dasharray: 160 2600;
		filter: drop-shadow(0 0 6px var(--inacap-red-alt));
		animation: wave-sweep 5.5s linear infinite;
	}

	.dev-icon {
		opacity: 0.16;
		animation: icon-pulse 5s ease-in-out infinite;
	}

	.icon-1 {
		animation-duration: 5.5s;
		animation-delay: -0.5s;
	}

	.icon-2 {
		animation-duration: 6.5s;
		animation-delay: -1.5s;
	}

	.icon-3 {
		animation-duration: 7s;
		animation-delay: -3s;
	}

	.icon-4 {
		animation-duration: 5.5s;
		animation-delay: -2s;
	}

	.icon-5 {
		animation-duration: 6s;
		animation-delay: -2.5s;
	}

	/* calm static watermark behind content slides */
	.is-subtle .wave-base {
		opacity: 0.05;
	}

	.is-subtle .dev-icon {
		opacity: 0.06;
		animation: none;
	}

	@keyframes wave-sweep {
		from {
			stroke-dashoffset: 2760;
		}

		to {
			stroke-dashoffset: 0;
		}
	}

	@keyframes icon-pulse {
		0%,
		100% {
			opacity: 0.1;
		}

		50% {
			opacity: 0.3;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.wave-sweep {
			animation: none;
			stroke-dasharray: none;
			opacity: 0.25;
		}

		.dev-icon {
			animation: none;
			opacity: 0.16;
		}
	}
</style>
