<script setup lang="ts">
	/**
	 * Renders the official INACAP logo — a single fixed-colour raster mark
	 * (src/public/logo-inacap.png). Never recoloured per deck brand accent: the
	 * real corporate mark stays as-is (see BRAND.md).
	 */
	defineProps<{
		/** rendered height in pixels */
		size?: number;
		/** optional caption shown next to the mark */
		label?: string;
	}>();
</script>

<template>
	<span class="inline-flex items-center gap-3">
		<img
			src="/logo-inacap.png"
			alt="INACAP"
			:style="{ height: `${size ?? 24}px`, width: 'auto' }"
			class="select-none"
			draggable="false"
		/>
		<span
			v-if="label"
			class="text-sm font-semibold tracking-wide text-brand-red-dark dark:text-white"
		>
			{{ label }}
		</span>
	</span>
</template>
