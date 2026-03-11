<script lang="ts">
	import { cn, chaosClasses, chaosRandom, randomGarbageText } from '$lib/utils/cn.js';
	import type { GigoChaosButtonProps } from '$lib/types/index.js';

	let {
		label = 'Click me',
		chaos = true,
		chaosLevel = 8,
		educational = false,
		a11yWarning = false,
		onclick,
		class: className,
		...restProps
	}: GigoChaosButtonProps = $props();

	let posX = $state(0);
	let posY = $state(0);
	let currentLabel = $state('Click me');
	let requiredClicks = $state(1);

	$effect(() => { currentLabel = label; });
	let clicksSoFar = $state(0);
	let fakeButtons = $state<Array<{ id: number; x: number; y: number; text: string }>>([]);
	let nextFakeId = $state(0);

	// Teleport every 2 seconds
	$effect(() => {
		const timer = setInterval(() => {
			posX = (Math.random() - 0.5) * 400;
			posY = (Math.random() - 0.5) * 300;
		}, 2000);
		return () => clearInterval(timer);
	});

	// Randomize text every 1 second
	$effect(() => {
		const timer = setInterval(() => {
			currentLabel = randomGarbageText();
		}, 1000);
		return () => clearInterval(timer);
	});

	// Set random click requirement
	$effect(() => {
		requiredClicks = chaosRandom(10) + 1;
	});

	function spawnFakeButton() {
		const id = nextFakeId++;
		fakeButtons = [
			...fakeButtons,
			{
				id,
				x: (Math.random() - 0.5) * 600,
				y: (Math.random() - 0.5) * 400,
				text: randomGarbageText()
			}
		];

		// Auto-remove after 3s
		setTimeout(() => {
			fakeButtons = fakeButtons.filter((b) => b.id !== id);
		}, 3000);
	}

	function handleClick(e: MouseEvent) {
		clicksSoFar++;

		// Spawn a fake button on every click
		spawnFakeButton();

		if (clicksSoFar < requiredClicks) return;

		// Success! Reset and invoke callback
		clicksSoFar = 0;
		requiredClicks = chaosRandom(10) + 1;
		onclick?.(e as MouseEvent & { currentTarget: EventTarget & HTMLButtonElement });
	}

	let buttonClass = $derived(
		cn(
			'absolute rounded-xl px-6 py-3 text-lg font-bold text-white shadow-lg transition-all duration-300 cursor-pointer',
			'bg-linear-to-r from-gigo-magenta to-gigo-pink',
			'hover:shadow-[0_0_30px_rgba(224,64,251,0.5)] hover:scale-110 active:scale-95',
			chaosClasses(chaosLevel),
			className
		)
	);
</script>

<div class="relative h-96 w-full overflow-hidden rounded-2xl border border-(--surface-border-hover) bg-(--surface-0) p-4">
	<!-- Arena background glow -->
	<div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(224,64,251,0.05),transparent_60%)] pointer-events-none"></div>
	<!-- Grid pattern -->
	<div class="absolute inset-0 opacity-[0.03] pointer-events-none" style="background-image: linear-gradient(var(--surface-3) 1px, transparent 1px), linear-gradient(90deg, var(--surface-3) 1px, transparent 1px); background-size: 40px 40px;"></div>

	{#if educational}
		<div class="relative z-10 mb-2 rounded-lg bg-gigo-magenta/10 border border-gigo-magenta/20 px-3 py-1.5 text-xs text-gigo-magenta font-mono inline-block">
			Clicks: {clicksSoFar}/{requiredClicks} | Decoys: {fakeButtons.length}
		</div>
	{/if}

	<!-- Real button -->
	<button
		class={buttonClass}
		style:transform="translate({posX}px, {posY}px)"
		style:transition="transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)"
		onclick={handleClick}
		{...restProps}
	>
		<!-- Pulse ring -->
		<span class="absolute inset-0 rounded-xl animate-gigo-pulse-glow" style="box-shadow: 0 0 15px rgba(224, 64, 251, 0.4);"></span>
		{currentLabel}
	</button>

	<!-- Fake decoy buttons -->
	{#each fakeButtons as fake (fake.id)}
		<button
			class="absolute rounded-xl bg-(--surface-2) border border-(--border) px-4 py-2 text-sm text-(--muted-foreground) transition-all duration-300 hover:border-(--surface-border-hover) hover:text-(--foreground) animate-gigo-entrance"
			style:transform="translate({fake.x}px, {fake.y}px)"
			onclick={() => spawnFakeButton()}
		>
			{fake.text}
		</button>
	{/each}

	{#if educational}
		<p class="absolute bottom-3 left-3 right-3 text-xs text-(--muted-foreground) italic font-mono">
			teleports + text mutates + random click threshold + decoy spawns
		</p>
	{/if}
</div>
