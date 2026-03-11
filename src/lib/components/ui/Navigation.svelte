<script lang="ts">
	import { cn, chaosClasses, chaosRandom, chaosPickOne } from '$lib/utils/cn.js';
	import type { GigoNavProps, NavItem } from '$lib/types/index.js';

	let {
		items = [],
		chaos = false,
		chaosLevel = 5,
		educational = false,
		a11yWarning = false,
		wrongDestinations = false,
		randomReorder = false,
		fakeLoading = false,
		class: className,
		...restProps
	}: GigoNavProps = $props();

	let displayItems = $state<NavItem[]>([]);
	let loadingItem = $state<string | null>(null);

	// Random reorder
	$effect(() => {
		displayItems = [...items];
		if (!chaos || !randomReorder) return;
		const timer = setInterval(() => {
			displayItems = [...displayItems].sort(() => Math.random() - 0.5);
		}, 3000);
		return () => clearInterval(timer);
	});

	function getHref(item: NavItem): string {
		if (chaos && wrongDestinations) {
			const otherItems = items.filter((i) => i.id !== item.id);
			return otherItems.length > 0 ? chaosPickOne(otherItems).href : item.href;
		}
		return item.href;
	}

	function handleClick(item: NavItem, e: MouseEvent) {
		if (chaos && fakeLoading) {
			e.preventDefault();
			loadingItem = item.id;
			setTimeout(() => {
				loadingItem = null;
				// Actually navigate after fake delay
				const href = getHref(item);
				window.location.href = href;
			}, 1500 + chaosRandom(2000));
		}
	}

	let navClass = $derived(
		cn(
			'flex items-center gap-1 rounded-xl border border-(--border) bg-(--surface-1)/80 backdrop-blur-md p-2',
			chaos && chaosClasses(chaosLevel),
			className
		)
	);
</script>

<nav class={navClass} {...restProps}>
	{#each displayItems as item (item.id)}
		<a
			href={getHref(item)}
			class={cn(
				'group/link relative inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-(--muted-foreground) transition-all duration-200 hover:text-(--foreground) hover:bg-(--surface-2)',
				loadingItem === item.id && 'pointer-events-none opacity-40'
			)}
			onclick={(e) => handleClick(item, e)}
		>
			{#if item.icon}
				<span class="text-base transition-transform duration-200 group-hover/link:scale-110">{item.icon}</span>
			{/if}
			{item.label}
			{#if loadingItem === item.id}
				<svg class="ml-1 h-3 w-3 animate-spin" viewBox="0 0 24 24" fill="none">
					<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
					<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
				</svg>
			{/if}
			<!-- Hover underline -->
			<span class="absolute bottom-1 left-3 right-3 h-px bg-linear-to-r from-gigo-magenta to-gigo-cyan scale-x-0 transition-transform duration-200 group-hover/link:scale-x-100 origin-left"></span>
		</a>
	{/each}

	{#if educational && chaos}
		<span class="ml-auto text-xs text-(--muted-foreground) italic font-mono px-2">
			links may lie
		</span>
	{/if}
</nav>
