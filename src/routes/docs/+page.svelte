<script lang="ts">
	import { categories, getComponentsByCategory } from '$lib/docs/component-data.js';

	const quickStartCode = `<script lang="ts">
  import { GhostCard, CatchSubmit } from '@gigo-ui/components';
<\/script>

<GhostCard
  title="Important Data"
  description="This will vanish when you need it most."
/>

<CatchSubmit
  label="Submit"
  onsubmit={() => alert('Caught!')}
/>`;
</script>

<div class="mx-auto max-w-3xl space-y-12">
	<div>
		<h1 class="text-3xl font-black tracking-tight">Getting Started</h1>
		<p class="mt-3 text-(--muted-foreground) leading-relaxed">
			GIGO UI is a Svelte 5 component library of intentionally terrible UI patterns. Every component is a fully functional, production-quality implementation of the worst UX ideas from <em>r/badUIbattles</em>.
		</p>
	</div>

	<!-- Installation -->
	<section class="space-y-4">
		<h2 class="text-xl font-bold tracking-tight">Installation</h2>
		<div class="rounded-lg border border-(--border) bg-(--surface-1) p-4">
			<pre class="font-mono text-sm text-(--foreground)"><span class="text-(--muted-foreground)">$</span> npm install @gigo-ui/components</pre>
		</div>
		<p class="text-sm text-(--muted-foreground)">Or with your preferred package manager:</p>
		<div class="space-y-2">
			<div class="rounded-lg border border-(--border) bg-(--surface-1) p-3">
				<pre class="font-mono text-sm"><span class="text-(--muted-foreground)">$</span> pnpm add @gigo-ui/components</pre>
			</div>
			<div class="rounded-lg border border-(--border) bg-(--surface-1) p-3">
				<pre class="font-mono text-sm"><span class="text-(--muted-foreground)">$</span> yarn add @gigo-ui/components</pre>
			</div>
		</div>
	</section>

	<!-- Quick Start -->
	<section class="space-y-4">
		<h2 class="text-xl font-bold tracking-tight">Quick Start</h2>
		<p class="text-sm text-(--muted-foreground)">Import any component and start frustrating your users immediately:</p>
		<div class="rounded-lg border border-(--border) bg-(--surface-1) overflow-hidden">
			<div class="border-b border-(--border) bg-(--surface-2) px-4 py-2">
				<span class="text-xs font-mono text-(--muted-foreground)">App.svelte</span>
			</div>
			<pre class="p-4 font-mono text-sm leading-relaxed overflow-x-auto text-(--foreground)">{quickStartCode}</pre>
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

	<!-- Components Overview -->
	<section class="space-y-6">
		<h2 class="text-xl font-bold tracking-tight">Components</h2>
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
