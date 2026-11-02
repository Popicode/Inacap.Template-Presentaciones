// @ts-check
/**
 * Overflow checker for the Slidev deck.
 *
 * The Slidev canvas is a FIXED 980×552 box (16:9) that never scrolls — anything
 * taller is clipped on export (PDF/PPTX/PNG). This script drives the live deck one
 * slide at a time via `nav.go(n, 999)` (activating each slide at the canvas size
 * with EVERY `v-click` revealed — the worst case for height) and measures the
 * extent of in-flow content against the 552px canvas. Decorative absolute elements
 * (glows, oversized watermarks, dynamic backdrops) are excluded, since they are
 * clipped by design and don't represent real content overflow.
 *
 * Usage:  pnpm check:overflow            # boots a dev server, checks, exits
 *         pnpm check:overflow --port 3055
 *         pnpm check:overflow --keep     # leave server running (debug)
 *
 * Exits non-zero when any slide overflows, so it can gate CI / `/verify`.
 * Driven by playwright-core against the system browser (Chrome/Edge) — no
 * bundled-browser download. Falls back across channels and a known Edge path.
 */

import { spawn } from 'node:child_process';
import process from 'node:process';
import { setTimeout as sleep } from 'node:timers/promises';
import { chromium } from 'playwright-core';

const args = process.argv.slice(2);
const portArg = args.indexOf('--port');
const PORT = portArg !== -1 ? Number(args[portArg + 1]) : 3033;
const KEEP = args.includes('--keep');
const deckArg = args.indexOf('--deck');
const DECK = deckArg !== -1 ? args[deckArg + 1] : 'src/slides.md';
const THRESHOLD = 2; // px over the canvas before it counts as overflow
const TIGHT = 24; // px of remaining headroom below which a slide is "tight"
const BASE = `http://localhost:${PORT}`;

/** Candidate ways to launch a system Chromium-family browser, in order. */
const LAUNCHERS = [
	{ label: 'msedge channel', opts: { channel: 'msedge' } },
	{ label: 'chrome channel', opts: { channel: 'chrome' } },
	{
		label: 'Edge (Program Files x86)',
		opts: {
			executablePath:
				'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
		},
	},
];

/** Launch the first browser that works. */
async function launchBrowser() {
	let lastError;
	for (const { label, opts } of LAUNCHERS) {
		try {
			return await chromium.launch({ headless: true, ...opts });
		} catch (error) {
			lastError = error;
			console.warn(`  · ${label} unavailable, trying next…`);
		}
	}
	throw new Error(
		`No system Chromium/Edge could be launched. Install Chrome or Edge, ` +
			`or run \`pnpm exec playwright install chromium\`. Last error: ${lastError}`,
	);
}

/** Poll the dev server until it answers (or time out). */
async function waitForServer(url, timeoutMs = 60_000) {
	const deadline = Date.now() + timeoutMs;
	while (Date.now() < deadline) {
		try {
			const res = await fetch(url);
			if (res.ok) return;
		} catch {
			/* not up yet */
		}
		await sleep(500);
	}
	throw new Error(`Dev server did not start at ${url} within ${timeoutMs}ms`);
}

/**
 * Drive the live deck slide by slide and return the measured content height of
 * each slide (in unscaled layout px) against the fixed 552px canvas.
 */
async function measureSlides(page) {
	await page.goto(`${BASE}/1`, { waitUntil: 'networkidle' });
	await page.waitForFunction(() => !!window.__slidev__?.nav, {
		timeout: 30_000,
	});
	await sleep(800); // let fonts/icons load so heights are final

	const total = await page.evaluate(() => {
		const v = window.__slidev__.nav.total;
		return v && typeof v === 'object' && 'value' in v ? v.value : v;
	});

	const slides = [];
	for (let n = 1; n <= total; n++) {
		const m = await page.evaluate(async (slideNo) => {
			const nav = window.__slidev__.nav;
			await nav.go(slideNo, 999); // activate slide, reveal all clicks
			await new Promise((resolve) => setTimeout(resolve, 450));
			// The active slide is the only `.slidev-layout` sized to the canvas;
			// match it by its `data-slidev-no` ancestor (others collapse to 0).
			const layouts = [...document.querySelectorAll('.slidev-layout')];
			const isActive = (el) => {
				let a = el;
				for (let k = 0; k < 6 && a; k++) {
					if (a.getAttribute?.('data-slidev-no') === String(slideNo))
						return true;
					a = a.parentElement;
				}
				return false;
			};
			const el =
				layouts.find(isActive) ||
				layouts.find((l) => l.clientHeight > 0);
			if (!el) return null;
			// Measure the extent of IN-FLOW content only. Decorative elements
			// (glows, oversized §/" watermarks, dynamic backdrops) are
			// position:absolute and clipped by design — they must not count as
			// overflow. The real content lives in normal-flow (relative/static)
			// wrappers, so the lowest in-flow box bottom is the true content end.
			const base = el.getBoundingClientRect();
			// The slide is CSS-transform-scaled to fit the viewport, so
			// getBoundingClientRect() is in SCALED px while clientHeight is in
			// unscaled layout px. Normalise everything to layout px via scale.
			const scale = base.width / el.clientWidth || 1;
			let contentBottom = base.top;
			const walk = (node) => {
				for (const child of node.children) {
					const cs = getComputedStyle(child);
					if (cs.position === 'absolute' || cs.position === 'fixed')
						continue;
					if (child.getAttribute('aria-hidden') === 'true') continue;
					const r = child.getBoundingClientRect();
					if (r.height > 0 && r.bottom > contentBottom)
						contentBottom = r.bottom;
					walk(child);
				}
			};
			walk(el);
			const contentHeight = Math.round(
				(contentBottom - base.top) / scale,
			);
			const heading = el.querySelector('h1, h2');
			return {
				title: (heading?.textContent || '(sin título)')
					.trim()
					.replace(/\s+/g, ' ')
					.slice(0, 42),
				clientHeight: el.clientHeight,
				contentHeight,
				overflowPx: Math.max(0, contentHeight - el.clientHeight),
			};
		}, n);
		slides.push({
			index: n,
			title: m?.title ?? '(no medible)',
			clientHeight: m?.clientHeight ?? 0,
			contentHeight: m?.contentHeight ?? 0,
			overflowPx: m?.overflowPx ?? 0,
		});
	}
	return slides;
}

/** Print the per-slide table + summary; return the overflowing slides. */
function report(slides) {
	const overflowing = [];
	const tight = [];
	console.info(`\n  #   ${'título'.padEnd(42)}  alto (cont/caja)  estado`);
	console.info(`  ${'─'.repeat(74)}`);
	for (const s of slides) {
		const headroom = s.clientHeight - s.contentHeight;
		const over = s.overflowPx > THRESHOLD;
		if (over) overflowing.push(s);
		else if (headroom < TIGHT) tight.push({ ...s, headroom });
		const box = `${s.contentHeight}/${s.clientHeight}`.padStart(13);
		const flag = over
			? `OVERFLOW +${s.overflowPx}px↓`
			: headroom < TIGHT
				? `ajustado (${headroom}px libres)`
				: 'ok';
		console.info(
			`  ${String(s.index).padStart(2)}  ${s.title.padEnd(42)}  ${box}   ${flag}`,
		);
	}

	console.info(`\n  ${'─'.repeat(74)}`);
	if (overflowing.length === 0) {
		console.info(
			`✓ Sin overflow: las ${slides.length} slides caben en el lienzo.`,
		);
	} else {
		console.info(
			`✗ ${overflowing.length}/${slides.length} slide(s) con overflow:`,
		);
		for (const s of overflowing) {
			console.info(
				`   · #${s.index} "${s.title}" (+${s.overflowPx}px de alto)`,
			);
		}
	}
	if (tight.length > 0) {
		console.info(
			`\n⚠ ${tight.length} slide(s) ajustada(s) (< ${TIGHT}px de margen) — revisa al editar:`,
		);
		for (const s of tight) {
			console.info(
				`   · #${s.index} "${s.title}" (${s.headroom}px libres)`,
			);
		}
	}
	return overflowing;
}

async function main() {
	console.info(`▶ Booting Slidev dev server on :${PORT} …`);
	const server = spawn(
		'pnpm',
		['exec', 'slidev', DECK, '--port', String(PORT)],
		{ stdio: 'ignore', shell: true },
	);

	let browser;
	try {
		await waitForServer(`${BASE}/`);
		console.info('▶ Server up. Launching browser …');
		browser = await launchBrowser();
		const page = await browser.newPage({
			viewport: { width: 1400, height: 1000 },
		});

		// Off-screen slides collapse to height 0 in the stacked `/print` view, so
		// measure the live slideshow one slide at a time instead.
		const slides = await measureSlides(page);
		const overflowing = report(slides);

		if (!KEEP) {
			await browser.close();
			browser = undefined;
		}
		return overflowing.length === 0 ? 0 : 1;
	} finally {
		if (browser && !KEEP) await browser.close();
		if (!KEEP) {
			// kill the whole process tree on Windows
			if (process.platform === 'win32' && server.pid) {
				spawn('taskkill', ['/pid', String(server.pid), '/t', '/f'], {
					stdio: 'ignore',
					shell: true,
				});
			} else {
				server.kill('SIGTERM');
			}
		}
	}
}

main()
	.then((code) => {
		if (!KEEP) process.exit(code);
	})
	.catch((error) => {
		console.error('\n✗ check-overflow falló:', error.message);
		process.exit(2);
	});
