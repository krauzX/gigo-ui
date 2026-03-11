<script lang="ts">
	import { cn } from '$lib/utils/cn.js';

	let {
		value = $bindable(''),
		placeholder = 'Catch the digits...',
		spawnInterval = 400,
		maxFalling = 15,
		characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@.!?#$%',
		arenaHeight = 224,
		class: className,
		...restProps
	}: {
		value?: string;
		placeholder?: string;
		spawnInterval?: number;
		maxFalling?: number;
		characters?: string;
		arenaHeight?: number;
		class?: string;
		[key: string]: unknown;
	} = $props();

	interface FallingDigit {
		id: number;
		char: string;
		x: number;
		y: number;
		speed: number;
		caught: boolean;
	}

	let digits = $state<FallingDigit[]>([]);
	let nextId = $state(0);
	let containerEl: HTMLDivElement | undefined = $state();
	let containerWidth = $state(400);
	let containerHeight = $state(200);

	$effect(() => {
		const timer = setInterval(() => {
			if (digits.length > maxFalling) return;
			const id = nextId++;
			const w = containerEl?.offsetWidth ?? 400;
			digits = [...digits, {
				id,
				char: characters[Math.floor(Math.random() * characters.length)],
				x: 20 + Math.random() * (w - 60),
				y: -30,
				speed: 0.6 + Math.random() * 1.5,
				caught: false
			}];
		}, spawnInterval);
		return () => clearInterval(timer);
	});

	// Gravity animation frame
	$effect(() => {
		let running = true;
		const h = containerEl?.offsetHeight ?? 200;

		function tick() {
			if (!running) return;
			digits = digits
				.map(d => ({
					...d,
					y: d.caught ? d.y : d.y + d.speed
				}))
				.filter(d => d.y < h + 40 || d.caught);
			requestAnimationFrame(tick);
		}
		requestAnimationFrame(tick);
		return () => { running = false; };
	});

	// Update container dimensions
	$effect(() => {
		if (!containerEl) return;
		const obs = new ResizeObserver(entries => {
			for (const e of entries) {
				containerWidth = e.contentRect.width;
				containerHeight = e.contentRect.height;
			}
		});
		obs.observe(containerEl);
		return () => obs.disconnect();
	});

	function catchDigit(digit: FallingDigit) {
		if (digit.caught) return;
		value += digit.char;
		digits = digits.filter(d => d.id !== digit.id);
	}

	function removeLastChar() {
		value = value.slice(0, -1);
	}
</script>

<div class={cn('space-y-3', className)}>
	<!-- Display current value -->
	<div class="flex items-center gap-2 rounded-xl border border-(--border) bg-(--secondary) px-4 py-2.5 min-h-10.5">
		<span class="text-sm text-(--foreground) font-mono flex-1 break-all">
			{#if value}
				{value}
			{:else}
				<span class="text-(--muted-foreground)">{placeholder}</span>
			{/if}
		</span>
		{#if value}
			<button
				class="text-xs text-(--muted-foreground) hover:text-gigo-red transition-colors px-1.5 py-0.5 rounded"
				onclick={removeLastChar}
			>
				&#x232b;
			</button>
		{/if}
	</div>

	<!-- Falling digit arena -->
	<div
		bind:this={containerEl}
		class="relative w-full overflow-hidden rounded-2xl border border-(--border) bg-(--card)"
		style:height="{arenaHeight}px"
		{...restProps}
	>
		<!-- Background grid -->
		<div class="absolute inset-0 opacity-[0.03]" style="background-image: linear-gradient(var(--muted-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--muted-foreground) 1px, transparent 1px); background-size: 32px 32px;"></div>

		<!-- Catch zone at bottom -->
		<div class="absolute bottom-0 left-0 right-0 h-10 bg-linear-to-t from-gigo-magenta/10 to-transparent pointer-events-none flex items-end justify-center pb-1">
			<span class="text-[10px] font-mono text-gigo-magenta/50 uppercase tracking-widest">catch zone</span>
		</div>

		<!-- Falling digits -->
		{#each digits as digit (digit.id)}
			<button
				class="absolute flex items-center justify-center w-9 h-9 rounded-lg text-sm font-mono font-bold cursor-pointer transition-all duration-100 hover:scale-125 active:scale-90 select-none"
				style:left="{digit.x}px"
				style:top="{digit.y}px"
				style:background={digit.y > (containerHeight - 60) ? 'rgba(224, 64, 251, 0.2)' : 'rgba(255, 255, 255, 0.05)'}
				style:border="1px solid {digit.y > (containerHeight - 60) ? 'rgba(224, 64, 251, 0.5)' : 'rgba(255, 255, 255, 0.1)'}"
				style:color={digit.y > (containerHeight - 60) ? '#e040fb' : 'var(--foreground)'}
				style:box-shadow={digit.y > (containerHeight - 60) ? '0 0 12px rgba(224, 64, 251, 0.3)' : 'none'}
				onclick={() => catchDigit(digit)}
			>
				{digit.char}
			</button>
		{/each}

		<!-- Instructions -->
		{#if digits.length === 0 && !value}
			<div class="absolute inset-0 flex items-center justify-center text-sm text-(--muted-foreground)">
				Digits spawning...
			</div>
		{/if}
	</div>

	<p class="text-[10px] font-mono text-(--muted-foreground) text-center">
		Click falling characters to type. Good luck spelling anything useful.
	</p>
</div>
