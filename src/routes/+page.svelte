<script lang="ts">
	import { GhostCard, CatchSubmit, PasswordPeekhole, GravityInput } from '$lib/index.js';
	import { categories, getComponentsByCategory } from '$lib/docs/component-data.js';

	let passwordValue = $state('');
	let gravityValue = $state('');
</script>

<!-- Landing Page -->
<div>
	<!-- Hero -->
	<header class="relative overflow-hidden border-b border-(--border)">
		<div class="gigo-mesh-bg absolute inset-0 opacity-60"></div>
		<div class="absolute inset-0 opacity-[0.03]" style="background-image: linear-gradient(var(--surface-3) 1px, transparent 1px), linear-gradient(90deg, var(--surface-3) 1px, transparent 1px); background-size: 60px 60px;"></div>

		<div class="relative mx-auto max-w-4xl px-6 py-24 text-center sm:py-32">
			<div class="mb-6 inline-flex items-center gap-2 rounded-full border border-(--surface-border-hover) bg-(--surface-1)/60 backdrop-blur-sm px-4 py-1.5 text-xs font-medium text-(--muted-foreground)">
				<span class="gigo-dot"></span>
				Svelte 5 &middot; SvelteKit 2 &middot; Tailwind CSS 4
			</div>

			<h1 class="gigo-gradient-text text-6xl font-black tracking-tighter sm:text-7xl lg:text-8xl">
				GIGO UI
			</h1>

			<p class="mx-auto mt-4 max-w-2xl text-xl text-(--muted-foreground) leading-relaxed">
				<strong class="text-(--foreground)">Garbage In, Garbage Out</strong> — A Svelte 5 component library of intentionally terrible UI patterns. Every interaction is designed to frustrate.
			</p>

			<div class="mt-8 inline-flex items-center gap-3 rounded-xl border border-(--border) bg-(--surface-1)/80 backdrop-blur-sm px-5 py-3">
				<span class="text-xs text-(--muted-foreground) font-mono">$</span>
				<code class="font-mono text-sm text-(--foreground)">npm i <span class="text-gigo-magenta">@gigo-ui/components</span></code>
			</div>

			<div class="mt-8 flex items-center justify-center gap-4">
				<a href="/docs" class="inline-flex items-center gap-2 rounded-lg bg-gigo-magenta px-6 py-2.5 text-sm font-semibold text-black transition-all hover:shadow-[var(--glow-primary)] hover:scale-105">
					Get Started
					<span>→</span>
				</a>
				<a href="/docs/ghost-card" class="inline-flex items-center gap-2 rounded-lg border border-(--border) bg-(--surface-1) px-6 py-2.5 text-sm font-medium text-(--foreground) transition-all hover:border-(--surface-border-hover) hover:bg-(--surface-2)">
					Browse Components
				</a>
			</div>
		</div>
	</header>

	<main class="mx-auto max-w-6xl px-6">
		<!-- Stats -->
		<section class="grid grid-cols-2 gap-4 py-16 sm:grid-cols-4">
			{#each [
				{ value: '20', label: 'Components', color: 'text-gigo-magenta' },
				{ value: '11', label: 'BadUI Patterns', color: 'text-gigo-cyan' },
				{ value: 'v5', label: 'Svelte', color: 'text-gigo-lime' },
				{ value: '0', label: 'Good UX', color: 'text-gigo-pink' },
			] as stat}
				<div class="rounded-xl border border-(--border) bg-(--surface-1) p-5 text-center">
					<div class="text-3xl font-black {stat.color}">{stat.value}</div>
					<div class="mt-1 text-xs font-medium text-(--muted-foreground)">{stat.label}</div>
				</div>
			{/each}
		</section>

		<div class="gigo-divider"></div>

		<!-- Categories -->
		<section class="py-16">
			<h2 class="text-center text-2xl font-bold tracking-tight">Three Flavors of Frustration</h2>
			<p class="mx-auto mt-2 max-w-lg text-center text-sm text-(--muted-foreground)">
				Pick your poison. Every category is designed to make users question reality.
			</p>
			<div class="mt-10 grid gap-6 sm:grid-cols-3">
				{#each categories as cat}
					{@const components = getComponentsByCategory(cat.id)}
					<a href="/docs/{components[0].slug}" class="group rounded-xl border border-(--border) bg-(--surface-1) p-6 transition-all hover:border-(--surface-border-hover) hover:bg-(--surface-2)">
						<div class="text-lg font-bold">{cat.label}</div>
						<p class="mt-1 text-sm text-(--muted-foreground)">{cat.description}</p>
						<div class="mt-4 flex flex-wrap gap-1.5">
							{#each components as comp}
								<span class="rounded-md bg-(--surface-3) px-2 py-0.5 text-xs text-(--muted-foreground)">{comp.emoji} {comp.name}</span>
							{/each}
						</div>
					</a>
				{/each}
			</div>
		</section>

		<div class="gigo-divider"></div>

		<!-- Featured Demos -->
		<section class="py-16 space-y-16">
			<div class="text-center">
				<h2 class="text-2xl font-bold tracking-tight">Try Them Live</h2>
				<p class="mt-2 text-sm text-(--muted-foreground)">No setup needed. Just interact and suffer.</p>
			</div>

			<div class="space-y-4">
				<div>
					<h3 class="text-lg font-semibold">👻 Ghost Card</h3>
					<p class="text-sm text-(--muted-foreground)">Cards that randomly vanish and reappear in a corrupted state.</p>
				</div>
				<div class="grid gap-4 sm:grid-cols-3">
					<GhostCard title="Important Data" description="This will vanish when you need it most." />
					<GhostCard title="Terms of Service" description="You agreed to something. We won't say what." />
					<GhostCard title="Your Progress" description="Saved? Maybe. Probably not." />
				</div>
			</div>

			<div class="space-y-4">
				<div>
					<h3 class="text-lg font-semibold">🏃 Catch Submit</h3>
					<p class="text-sm text-(--muted-foreground)">The submit button that runs away from your cursor.</p>
				</div>
				<CatchSubmit label="Submit Form" onsubmit={() => alert('You caught it! 🎉')} />
			</div>

			<div class="space-y-4">
				<div>
					<h3 class="text-lg font-semibold">🪂 Gravity Input</h3>
					<p class="text-sm text-(--muted-foreground)">Characters fall with gravity. Click them before they disappear.</p>
				</div>
				<div class="max-w-lg">
					<GravityInput bind:value={gravityValue} placeholder="Catch characters to type..." />
					{#if gravityValue}
						<p class="mt-2 text-xs font-mono text-(--muted-foreground)">Captured: <span class="text-gigo-cyan">{gravityValue}</span></p>
					{/if}
				</div>
			</div>

			<div class="space-y-4">
				<div>
					<h3 class="text-lg font-semibold">🔒 Password Peekhole</h3>
					<p class="text-sm text-(--muted-foreground)">Drag the tiny peephole to see your password. Peak security.</p>
				</div>
				<div class="max-w-sm">
					<PasswordPeekhole bind:value={passwordValue} placeholder="Enter your secret..." />
				</div>
			</div>
		</section>
	</main>

	<!-- Footer -->
	<footer class="border-t border-(--border)">
		<div class="mx-auto max-w-6xl px-6 py-10 text-center">
			<p class="text-sm text-(--muted-foreground)">
				<span class="font-semibold text-(--foreground)">GIGO UI</span> — Built with Svelte 5, SvelteKit 2, and Tailwind CSS v4
			</p>
			<p class="mt-2 text-xs text-(--muted-foreground)">
				Every interaction is designed to make you question your life choices.
			</p>
		</div>
	</footer>
</div>
