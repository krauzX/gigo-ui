<script lang="ts">
	import { page } from '$app/state';
	import { categories, getComponentsByCategory } from '$lib/docs/component-data.js';

	let { children } = $props();

	let sidebarOpen = $state(false);
</script>

<div class="mx-auto flex max-w-7xl">
	<!-- Desktop Sidebar -->
	<aside class="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-64 shrink-0 overflow-y-auto border-r border-(--border) px-4 py-8 lg:block">
		<nav class="space-y-6">
			<div>
				<a
					href="/docs"
					class="block rounded-md px-2.5 py-1.5 text-sm font-semibold transition-colors {page.url.pathname === '/docs' ? 'text-(--foreground) bg-(--surface-2)' : 'text-(--muted-foreground) hover:text-(--foreground) hover:bg-(--surface-1)'}"
				>
					Getting Started
				</a>
			</div>

			{#each categories as cat}
				<div>
					<h3 class="mb-2 px-2.5 text-xs font-semibold uppercase tracking-wider text-(--muted-foreground)">{cat.label}</h3>
					<ul class="space-y-0.5">
						{#each getComponentsByCategory(cat.id) as comp}
							<li>
								<a
									href="/docs/{comp.slug}"
									class="flex items-center gap-2 rounded-md px-2.5 py-1.5 text-sm transition-colors {page.url.pathname === `/docs/${comp.slug}` ? 'bg-(--surface-2) text-(--foreground) font-medium' : 'text-(--muted-foreground) hover:text-(--foreground) hover:bg-(--surface-1)'}"
								>
									<span class="text-xs">{comp.emoji}</span>
									{comp.name}
								</a>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</nav>
	</aside>

	<!-- Mobile sidebar toggle -->
	<button
		class="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-gigo-magenta text-black shadow-lg lg:hidden"
		onclick={() => (sidebarOpen = !sidebarOpen)}
		aria-label="Toggle sidebar"
	>
		☰
	</button>

	<!-- Mobile sidebar overlay -->
	{#if sidebarOpen}
		<div class="fixed inset-0 z-30 lg:hidden">
			<button class="absolute inset-0 bg-black/50" onclick={() => (sidebarOpen = false)} aria-label="Close sidebar"></button>
			<aside class="absolute left-0 top-14 h-[calc(100vh-3.5rem)] w-64 overflow-y-auto border-r border-(--border) bg-(--background) px-4 py-8">
				<nav class="space-y-6">
					<div>
						<a
							href="/docs"
							class="block rounded-md px-2.5 py-1.5 text-sm font-semibold transition-colors {page.url.pathname === '/docs' ? 'text-(--foreground) bg-(--surface-2)' : 'text-(--muted-foreground) hover:text-(--foreground) hover:bg-(--surface-1)'}"
							onclick={() => (sidebarOpen = false)}
						>
							Getting Started
						</a>
					</div>

					{#each categories as cat}
						<div>
							<h3 class="mb-2 px-2.5 text-xs font-semibold uppercase tracking-wider text-(--muted-foreground)">{cat.label}</h3>
							<ul class="space-y-0.5">
								{#each getComponentsByCategory(cat.id) as comp}
									<li>
										<a
											href="/docs/{comp.slug}"
											class="flex items-center gap-2 rounded-md px-2.5 py-1.5 text-sm transition-colors {page.url.pathname === `/docs/${comp.slug}` ? 'bg-(--surface-2) text-(--foreground) font-medium' : 'text-(--muted-foreground) hover:text-(--foreground) hover:bg-(--surface-1)'}"
											onclick={() => (sidebarOpen = false)}
										>
											<span class="text-xs">{comp.emoji}</span>
											{comp.name}
										</a>
									</li>
								{/each}
							</ul>
						</div>
					{/each}
				</nav>
			</aside>
		</div>
	{/if}

	<!-- Main Content -->
	<main class="min-w-0 flex-1 px-6 py-10 lg:px-12">
		{@render children()}
	</main>
</div>
