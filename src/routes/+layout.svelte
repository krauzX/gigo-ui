<script lang="ts">
	import '$lib/styles/globals.css';
	import { page } from '$app/state';

	let { children } = $props();

	let isDocsPage = $derived(page.url.pathname.startsWith('/docs'));
</script>

<svelte:head>
	<title>GIGO UI — Deliberately Terrible UI Components</title>
	<meta name="description" content="Garbage In, Garbage Out — A Svelte 5 component library of intentionally terrible UI patterns for educational entertainment." />
</svelte:head>

<div class="min-h-screen bg-(--background) text-(--foreground)">
	<!-- Global Navigation -->
	<nav class="sticky top-0 z-50 border-b border-(--border) bg-(--background)/80 backdrop-blur-xl">
		<div class="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
			<a href="/" class="flex items-center gap-2.5 group">
				<span class="text-xl">🗑️</span>
				<span class="font-black text-lg tracking-tight bg-linear-to-r from-gigo-magenta to-gigo-cyan bg-clip-text text-transparent group-hover:from-gigo-cyan group-hover:to-gigo-magenta transition-all duration-500">GIGO UI</span>
				<span class="hidden sm:inline-block rounded-md border border-(--border) bg-(--surface-1) px-1.5 py-0.5 text-[10px] font-mono text-(--muted-foreground)">v1.0.0</span>
			</a>
			<div class="flex items-center gap-1">
				<a
					href="/docs"
					class="rounded-lg px-3 py-1.5 text-sm font-medium transition-colors {isDocsPage ? 'text-(--foreground) bg-(--surface-2)' : 'text-(--muted-foreground) hover:text-(--foreground) hover:bg-(--surface-1)'}"
				>
					Documentation
				</a>
				<a
					href="/docs/ghost-card"
					class="rounded-lg px-3 py-1.5 text-sm font-medium text-(--muted-foreground) hover:text-(--foreground) hover:bg-(--surface-1) transition-colors"
				>
					Components
				</a>
				<a
					href="https://github.com/gigo-ui/components"
					target="_blank"
					rel="noopener noreferrer"
					class="rounded-lg px-3 py-1.5 text-sm font-medium text-(--muted-foreground) hover:text-(--foreground) hover:bg-(--surface-1) transition-colors"
				>
					GitHub
				</a>
			</div>
		</div>
	</nav>

	{@render children()}
</div>
