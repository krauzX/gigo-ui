<script lang="ts">
	import { CatchSubmit } from '$lib/index.js';
	import { categories, getComponentsByCategory } from '$lib/docs/component-data.js';

	const testimonials = [
		{ name: 'Sarah K.', role: 'UX Lead, Fortune 500', quote: "I showed this to my team. Three people resigned." },
		{ name: 'Dave M.', role: 'Frontend Dev', quote: "The Gravity Input made my PM cry. 10/10 would deploy again." },
		{ name: 'Anonymous', role: 'QA Engineer', quote: "I filed 47 bug reports before I read the README." },
		{ name: 'Rachel P.', role: 'Accessibility Consultant', quote: "This library is the reason I drink." },
		{ name: 'Jake T.', role: 'Intern', quote: "They told me to build a form with this. I'm updating my LinkedIn." },
		{ name: 'Lena W.', role: 'Product Manager', quote: "Our NPS score went from 72 to -4. Impressive, honestly." },
	];
</script>

<div>
	<!-- Hero — clean, breathing room -->
	<header class="relative overflow-hidden border-b border-(--border)">
		<div class="gigo-mesh-bg absolute inset-0 opacity-40"></div>

		<div class="relative mx-auto max-w-3xl px-6 py-28 text-center sm:py-36">
			<div class="mb-8 inline-flex items-center gap-2 rounded-full border border-(--surface-border-hover) bg-(--surface-1)/60 backdrop-blur-sm px-4 py-1.5 text-xs font-medium text-(--muted-foreground)">
				<span class="gigo-dot"></span>
				Svelte 5 &middot; Runes &middot; Tailwind CSS 4
			</div>

			<h1 class="gigo-gradient-text text-6xl font-black tracking-tighter sm:text-7xl lg:text-8xl leading-none">
				GIGO UI
			</h1>

			<p class="mx-auto mt-6 max-w-xl text-lg text-(--muted-foreground) leading-relaxed">
				A component library where every interaction is designed to frustrate. Built with Svelte 5 runes, TypeScript, and questionable intentions.
			</p>

			<div class="mt-10 flex items-center justify-center gap-4">
				<a href="/docs" class="inline-flex items-center gap-2 rounded-lg bg-gigo-magenta px-6 py-2.5 text-sm font-semibold text-black transition-all hover:shadow-[var(--glow-primary)] hover:scale-105">
					Get Started →
				</a>
				<a href="/docs" class="inline-flex items-center gap-2 rounded-lg border border-(--border) bg-(--surface-1) px-6 py-2.5 text-sm font-medium text-(--foreground) transition-all hover:border-(--surface-border-hover) hover:bg-(--surface-2)">
					Browse Components
				</a>
			</div>

			<div class="mt-8 inline-flex items-center gap-3 rounded-lg border border-(--border) bg-(--surface-0)/60 backdrop-blur-sm px-4 py-2">
				<span class="text-xs text-(--muted-foreground) font-mono">$</span>
				<code class="font-mono text-sm text-(--foreground)">pnpm add <span class="text-gigo-magenta">@gigo-ui/components</span></code>
			</div>
		</div>
	</header>

	<main class="mx-auto max-w-5xl px-6">
		<!-- Stats — compact strip -->
		<section class="grid grid-cols-4 gap-3 py-12">
			{#each [
				{ value: '24', label: 'Components', color: 'text-gigo-magenta' },
				{ value: '4', label: 'Breaker Overlays', color: 'text-gigo-cyan' },
				{ value: 'v5', label: 'Svelte', color: 'text-gigo-lime' },
				{ value: '0', label: 'Good UX', color: 'text-gigo-pink' },
			] as stat}
				<div class="rounded-lg border border-(--border) bg-(--surface-1) p-4 text-center">
					<div class="text-2xl font-black {stat.color}">{stat.value}</div>
					<div class="mt-0.5 text-[11px] font-medium text-(--muted-foreground)">{stat.label}</div>
				</div>
			{/each}
		</section>

		<div class="gigo-divider"></div>

		<!-- Categories -->
		<section class="py-14">
			<h2 class="text-center text-2xl font-bold tracking-tight">Three Flavors of Frustration</h2>
			<div class="mt-8 grid gap-5 sm:grid-cols-3">
				{#each categories as cat}
					{@const components = getComponentsByCategory(cat.id)}
					<a href="/docs" class="group rounded-xl border border-(--border) bg-(--surface-1) p-5 transition-all hover:border-(--surface-border-hover) hover:bg-(--surface-2)">
						<div class="text-base font-bold">{cat.label}</div>
						<p class="mt-1 text-sm text-(--muted-foreground) leading-snug">{cat.description}</p>
						<div class="mt-3 flex flex-wrap gap-1.5">
							{#each components.slice(0, 4) as comp}
								<span class="rounded-md bg-(--surface-3) px-2 py-0.5 text-xs text-(--muted-foreground)">{comp.emoji} {comp.name}</span>
							{/each}
							{#if components.length > 4}
								<span class="rounded-md bg-(--surface-3) px-2 py-0.5 text-xs text-(--muted-foreground)">+{components.length - 4} more</span>
							{/if}
						</div>
					</a>
				{/each}
			</div>
		</section>

		<div class="gigo-divider"></div>

		<!-- Breaker Overlays highlight -->
		<section class="py-14">
			<div class="text-center">
				<p class="text-xs font-semibold uppercase tracking-widest text-gigo-cyan">New</p>
				<h2 class="mt-2 text-2xl font-bold tracking-tight">Breaker Overlays</h2>
				<p class="mx-auto mt-2 max-w-lg text-sm text-(--muted-foreground)">
					Wrap any component. One function call and it's physically destroyed — voxel crush, glass shatter, pixel dissolve, or sucked into a black hole.
				</p>
			</div>
			<div class="mt-8 grid gap-4 sm:grid-cols-2">
				{#each [
					{ emoji: '🧊', name: 'GigoCompactor', desc: 'Voxel crush with Three.js + Rapier physics', href: '/docs/gigo-compactor' },
					{ emoji: '🪟', name: 'ShatterPane', desc: 'Voronoi glass fracture with 2D physics', href: '/docs/shatter-pane' },
					{ emoji: '🌫️', name: 'PixelDissolve', desc: 'Per-pixel disintegration in spreading waves', href: '/docs/pixel-dissolve' },
					{ emoji: '🕳️', name: 'BlackHoleSink', desc: 'Gravitational singularity with accretion glow', href: '/docs/black-hole-sink' },
				] as card}
					<a href={card.href} class="flex items-start gap-4 rounded-xl border border-(--border) bg-(--surface-1) p-5 transition-all hover:border-(--surface-border-hover) hover:bg-(--surface-2)">
						<span class="text-2xl">{card.emoji}</span>
						<div>
							<div class="text-sm font-bold">{card.name}</div>
							<p class="mt-0.5 text-xs text-(--muted-foreground)">{card.desc}</p>
						</div>
					</a>
				{/each}
			</div>
		</section>

		<div class="gigo-divider"></div>

		<!-- One live demo — keep it tight -->
		<section class="py-14">
			<div class="text-center">
				<h2 class="text-2xl font-bold tracking-tight">Try It</h2>
				<p class="mt-2 text-sm text-(--muted-foreground)">Go ahead. Try to submit the form.</p>
			</div>
			<div class="mx-auto mt-8 max-w-md">
				<CatchSubmit label="Submit Form" onsubmit={() => alert('You caught it! 🎉')} />
			</div>
		</section>

		<div class="gigo-divider"></div>

		<!-- Testimonials -->
		<section class="py-14">
			<h2 class="text-center text-2xl font-bold tracking-tight">What People Are Saying</h2>
			<p class="mx-auto mt-2 max-w-md text-center text-sm text-(--muted-foreground)">Real feedback from real victims.</p>

			<div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{#each testimonials as t}
					<div class="rounded-xl border border-(--border) bg-(--surface-1) p-5">
						<p class="text-sm text-(--foreground) italic leading-relaxed">"{t.quote}"</p>
						<div class="mt-3 flex items-center gap-2">
							<div class="h-6 w-6 rounded-full bg-(--surface-3)"></div>
							<div>
								<div class="text-xs font-semibold text-(--foreground)">{t.name}</div>
								<div class="text-[11px] text-(--muted-foreground)">{t.role}</div>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</section>
	</main>

	<footer class="border-t border-(--border)">
		<div class="mx-auto max-w-5xl px-6 py-8 text-center">
			<p class="text-sm text-(--muted-foreground)">
				<span class="font-semibold text-(--foreground)">GIGO UI</span> — Svelte 5 · SvelteKit 2 · Tailwind CSS 4
			</p>
			<p class="mt-1 text-xs text-(--muted-foreground)">
				Every interaction is designed to make you question your life choices.
			</p>
		</div>
	</footer>
</div>
