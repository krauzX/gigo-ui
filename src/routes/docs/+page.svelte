<script lang="ts">
	import { categories, getComponentsByCategory } from '$lib/docs/component-data.js';

	const quickStartCode = `<script lang="ts">
  import { ShatterPane, CatchSubmit } from '@gigo-ui/components';

  let broken = $state(false);
<\/script>

<ShatterPane bind:isShattered={broken}>
  <div class="card">
    <h2>Fragile Content</h2>
    <CatchSubmit label="Submit" />
  </div>
</ShatterPane>

<button onclick={() => broken = true}>
  Break it
</button>`;
</script>

<div class="mx-auto max-w-3xl space-y-12">
	<div>
		<h1 class="text-3xl font-black tracking-tight">Getting Started</h1>
		<p class="mt-3 text-(--muted-foreground) leading-relaxed">
			GIGO UI is a Svelte 5 component library of intentionally terrible UI patterns. Every component is production-quality code implementing the worst UX ideas imaginable.
		</p>
	</div>

	<!-- Installation -->
	<section class="space-y-4">
		<h2 class="text-xl font-bold tracking-tight">Installation</h2>
		<div class="rounded-lg border border-(--border) bg-(--surface-1) p-4">
			<pre class="font-mono text-sm text-(--foreground)"><span class="text-(--muted-foreground)">$</span> pnpm add @gigo-ui/components</pre>
		</div>
		<p class="text-sm text-(--muted-foreground)">Works with npm, yarn, and bun too.</p>
	</section>

	<!-- Quick Start -->
	<section class="space-y-4">
		<h2 class="text-xl font-bold tracking-tight">Quick Start</h2>
		<p class="text-sm text-(--muted-foreground)">Import, wrap, destroy:</p>
		<div class="rounded-lg border border-(--border) bg-(--surface-1) overflow-hidden">
			<div class="border-b border-(--border) bg-(--surface-2) px-4 py-2">
				<span class="text-xs font-mono text-(--muted-foreground)">App.svelte</span>
			</div>
			<pre class="p-4 font-mono text-sm leading-relaxed overflow-x-auto text-(--foreground)">{quickStartCode}</pre>
		</div>
	</section>

	<!-- Breaker Overlays — featured -->
	<section class="space-y-4">
		<div>
			<p class="text-xs font-semibold uppercase tracking-widest text-gigo-cyan">New</p>
			<h2 class="mt-1 text-xl font-bold tracking-tight">Breaker Overlays</h2>
			<p class="mt-1 text-sm text-(--muted-foreground)">
				Wrap any component. One call and it's physically destroyed with real-time physics. Broken things stay broken.
			</p>
		</div>
		<div class="grid gap-3 sm:grid-cols-2">
			{#each [
				{ slug: 'gigo-compactor', emoji: '🧊', name: 'GigoCompactor', desc: 'Three.js voxel crush with Rapier rigid bodies' },
				{ slug: 'shatter-pane', emoji: '🪟', name: 'ShatterPane', desc: 'Voronoi glass fracture, cracks outward and falls' },
				{ slug: 'pixel-dissolve', emoji: '🌫️', name: 'PixelDissolve', desc: 'Per-pixel dissolution in contagion waves' },
				{ slug: 'black-hole-sink', emoji: '🕳️', name: 'BlackHoleSink', desc: 'Singularity with accretion disk and redshift' },
			] as card}
				<a
					href="/docs/{card.slug}"
					class="flex items-start gap-3 rounded-lg border border-gigo-cyan/20 bg-gigo-cyan/5 p-4 transition-all hover:border-gigo-cyan/40 hover:bg-gigo-cyan/10"
				>
					<span class="text-xl">{card.emoji}</span>
					<div>
						<div class="text-sm font-bold">{card.name}</div>
						<div class="text-xs text-(--muted-foreground)">{card.desc}</div>
					</div>
				</a>
			{/each}
		</div>
	</section>

	<!-- Requirements -->
	<section class="space-y-4">
		<h2 class="text-xl font-bold tracking-tight">Requirements</h2>
		<div class="grid gap-3 sm:grid-cols-2">
			{#each [
				{ label: 'Svelte', version: '5.0+', icon: '🔥' },
				{ label: 'SvelteKit', version: '2.0+', icon: '📦' },
				{ label: 'Tailwind CSS', version: '4.0+', icon: '🎨' },
				{ label: 'TypeScript', version: '5.0+', icon: '📝' },
			] as req}
				<div class="flex items-center gap-3 rounded-lg border border-(--border) bg-(--surface-1) p-3">
					<span>{req.icon}</span>
					<div>
						<div class="text-sm font-medium">{req.label}</div>
						<div class="text-xs text-(--muted-foreground)">{req.version}</div>
					</div>
				</div>
			{/each}
		</div>
	</section>

	<!-- All Components -->
	<section class="space-y-6">
		<h2 class="text-xl font-bold tracking-tight">All Components</h2>
		{#each categories as cat}
			{@const components = getComponentsByCategory(cat.id)}
			<div class="space-y-3">
				<h3 class="text-base font-semibold">{cat.label}</h3>
				<p class="text-sm text-(--muted-foreground)">{cat.description}</p>
				<div class="grid gap-2 sm:grid-cols-2">
					{#each components as comp}
						<a
							href="/docs/{comp.slug}"
							class="flex items-center gap-3 rounded-lg border border-(--border) bg-(--surface-1) p-3 transition-all hover:border-(--surface-border-hover) hover:bg-(--surface-2)"
						>
							<span>{comp.emoji}</span>
							<div>
								<div class="text-sm font-medium">{comp.name}</div>
								<div class="text-xs text-(--muted-foreground)">{comp.tagline}</div>
							</div>
						</a>
					{/each}
				</div>
			</div>
		{/each}
	</section>
</div>
