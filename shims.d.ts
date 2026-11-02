// Ambient declarations so `vue-tsc` understands Slidev's virtual modules and
// CSS side-effect imports (Vite/Slidev resolve these for real at build time).

declare module '*.css';

declare module '@slidev/client' {
	import type { ComputedRef } from 'vue';

	/** Slidev navigation state exposed to global layers and components. */
	export function useNav(): {
		currentPage: ComputedRef<number>;
		currentSlideNo: ComputedRef<number>;
		total: ComputedRef<number>;
		next: () => Promise<void>;
		prev: () => Promise<void>;
	};

	/** True only while this slide is the currently active one. */
	export function useIsSlideActive(): ComputedRef<boolean>;
}
