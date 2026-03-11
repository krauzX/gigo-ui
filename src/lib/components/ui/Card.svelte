<script lang="ts">
	import { cn, chaosClasses, chaosRandom } from '$lib/utils/cn.js';
	import type { GigoCardProps } from '$lib/types/index.js';

	let {
		title = '',
		description = '',
		chaos = false,
		chaosLevel = 5,
		educational = false,
		a11yWarning = false,
		randomRotation = false,
		resistClicks = false,
		zIndexWar = false,
		children,
		header,
		footer,
		onclick,
		class: className,
		...restProps
	}: GigoCardProps = $props();

	let rotation = $state(0);
	let clickCount = $state(0);
	let currentZ = $state(1);
	let tiltX = $state(0);
	let tiltY = $state(0);
	let spotlightX = $state(50);
	let spotlightY = $state(50);
	let isHovered = $state(false);
	let cardEl: HTMLDivElement | undefined = $state();

	$effect(() => {
		if (!chaos || !randomRotation) return;
		const interval = setInterval(() => {
			rotation = (Math.random() - 0.5) * 20;
		}, 2000);
		return () => clearInterval(interval);
	});

	function handleMouseMove(e: MouseEvent) {
		if (!cardEl) return;
		const rect = cardEl.getBoundingClientRect();
		const x = (e.clientX - rect.left) / rect.width;
		const y = (e.clientY - rect.top) / rect.height;
		tiltX = (y - 0.5) * -12;
		tiltY = (x - 0.5) * 12;
		spotlightX = x * 100;
		spotlightY = y * 100;
	}

	function handleMouseEnter() { isHovered = true; }
	function handleMouseLeave() {
		isHovered = false;
		tiltX = 0;
		tiltY = 0;
	}

	function handleClick(e: MouseEvent) {
		if (chaos && resistClicks) {
			clickCount++;
			if (clickCount < 3) return;
			clickCount = 0;
		}

		if (chaos && zIndexWar) {
			currentZ = chaosRandom(100) + 1;
		}

		onclick?.(e as MouseEvent & { currentTarget: EventTarget & HTMLDivElement });
	}

	let cardClass = $derived(
		cn(
			'relative overflow-hidden rounded-xl border border-(--border) bg-(--surface-1) text-(--foreground) transition-all duration-300 ease-out',
			'hover:border-(--surface-border-hover)',
			chaos && chaosClasses(chaosLevel),
			className
		)
	);
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="group"
	style:perspective="800px"
	style:z-index={zIndexWar ? currentZ : undefined}
>
	<div
		bind:this={cardEl}
		class={cardClass}
		style:transform="rotate({rotation}deg) rotateX({tiltX}deg) rotateY({tiltY}deg)"
		style:transition="transform 0.2s ease-out, border-color 0.3s, box-shadow 0.3s"
		style:box-shadow={isHovered ? '0 0 30px rgba(224, 64, 251, 0.1), 0 20px 40px rgba(0, 0, 0, 0.3)' : '0 4px 20px rgba(0, 0, 0, 0.2)'}
		onmousemove={handleMouseMove}
		onmouseenter={handleMouseEnter}
		onmouseleave={handleMouseLeave}
		onclick={handleClick}
		{...restProps}
	>
		<!-- Spotlight overlay -->
		<div
			class="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
			style:background="radial-gradient(circle at {spotlightX}% {spotlightY}%, rgba(224, 64, 251, 0.08), transparent 60%)"
		></div>

		{#if header}
			<div class="relative z-20 border-b border-(--border) p-4">
				{@render header()}
			</div>
		{/if}

		<div class="relative z-20 p-6">
			{#if title}
				<h3 class="text-lg font-semibold leading-none tracking-tight">{title}</h3>
			{/if}
			{#if description}
				<p class="mt-2 text-sm text-(--muted-foreground) leading-relaxed">{description}</p>
			{/if}

			{#if children}
				<div class="mt-4">
					{@render children()}
				</div>
			{/if}
		</div>

		{#if footer}
			<div class="relative z-20 border-t border-(--border) p-4">
				{@render footer()}
			</div>
		{/if}

		{#if educational && chaos && resistClicks && clickCount > 0}
			<p class="relative z-20 px-6 pb-4 text-xs text-gigo-magenta font-mono animate-gigo-entrance">
				Click {3 - clickCount} more time(s) to actually interact!
			</p>
		{/if}
	</div>
</div>
