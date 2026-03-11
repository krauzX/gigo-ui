<script lang="ts">
	import { cn } from '$lib/utils/cn.js';

	let {
		label = 'Submit',
		onsubmit,
		arenaHeight = 256,
		tauntsArray = [
			'Too slow!', 'Almost!', 'Nope!', 'Try harder!', 'Not today!',
			'🏃💨', "Can't catch me!", 'Haha!', 'Over here!', 'Nice try!',
			'So close... not.', 'LOL', 'Git gud', 'Skill issue',
		],
		class: className,
		...restProps
	}: {
		label?: string;
		onsubmit?: () => void;
		arenaHeight?: number;
		tauntsArray?: string[];
		class?: string;
		[key: string]: unknown;
	} = $props();

	let x = $state(0);
	let y = $state(0);
	let escapeCount = $state(0);
	let caught = $state(false);
	let containerEl: HTMLDivElement | undefined = $state();
	let btnEl: HTMLButtonElement | undefined = $state();
	let taunts = $state('');
	let trailDots = $state<Array<{ x: number; y: number }>>([]);

	function flee() {
		if (caught || !containerEl || !btnEl) return;

		const container = containerEl.getBoundingClientRect();
		const btn = btnEl.getBoundingClientRect();
		const maxX = container.width - btn.width - 8;
		const maxY = container.height - btn.height - 8;

		// Random position away from current
		let newX: number, newY: number;
		let attempts = 0;
		do {
			newX = Math.random() * maxX;
			newY = Math.random() * maxY;
			attempts++;
		} while (
			Math.abs(newX - x) < 60 &&
			Math.abs(newY - y) < 60 &&
			attempts < 10
		);

		x = newX;
		y = newY;
		escapeCount++;
		taunts = tauntsArray[Math.floor(Math.random() * tauntsArray.length)];
		trailDots = [...trailDots, { x: newX + 20, y: newY + 10 }].slice(-20);
	}

	function handleClick() {
		// Only reachable if they somehow click it
		caught = true;
		taunts = 'Fine, you win. 😤';
		onsubmit?.();
	}

	// Place button randomly on mount
	$effect(() => {
		if (containerEl && btnEl) {
			const container = containerEl.getBoundingClientRect();
			const btn = btnEl.getBoundingClientRect();
			x = Math.random() * (container.width - btn.width - 8);
			y = Math.random() * (container.height - btn.height - 8);
		}
	});
</script>

<div class={cn('space-y-3', className)} {...restProps}>
	<!-- Stats bar -->
	<div class="flex items-center justify-between rounded-lg border border-(--border) bg-(--secondary) px-3 py-1.5 text-xs font-mono">
		<span class="text-(--muted-foreground)">Escape count: <span class="text-gigo-magenta font-bold">{escapeCount}</span></span>
		{#if taunts}
			<span class="text-gigo-cyan animate-pulse">{taunts}</span>
		{/if}
		<span class="text-(--muted-foreground)">
			Status: {caught ? '✅ Caught' : '🏃 Fleeing'}
		</span>
	</div>

	<!-- Chase arena -->
	<div
		bind:this={containerEl}
		class="relative w-full rounded-2xl border border-(--border) bg-(--card) overflow-hidden"
		style:height="{arenaHeight}px"
	>
		<!-- Grid background -->
		<div class="absolute inset-0 opacity-[0.03]" style="background-image: linear-gradient(var(--muted-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--muted-foreground) 1px, transparent 1px); background-size: 24px 24px;"></div>

		<!-- Trail dots -->
		{#if trailDots.length > 0}
			<div class="absolute inset-0 pointer-events-none overflow-hidden">
				{#each trailDots as dot, i}
					<div
						class="absolute w-1.5 h-1.5 rounded-full bg-gigo-magenta/20"
						style:left="{dot.x}px"
						style:top="{dot.y}px"
						style:opacity={0.1 + (i / trailDots.length) * 0.4}
					></div>
				{/each}
			</div>
		{/if}

		<!-- The elusive button -->
		<button
			bind:this={btnEl}
			class="absolute px-6 py-2.5 rounded-xl font-mono text-sm font-bold
				transition-all duration-150 ease-out select-none cursor-pointer"
			style:left="{x}px"
			style:top="{y}px"
			style:background={caught ? 'rgba(118, 255, 3, 0.2)' : 'rgba(224, 64, 251, 0.15)'}
			style:border="1px solid {caught ? '#76ff03' : '#e040fb'}"
			style:color={caught ? '#76ff03' : '#e040fb'}
			style:box-shadow={caught ? '0 0 20px rgba(118, 255, 3, 0.3)' : '0 0 12px rgba(224, 64, 251, 0.2)'}
			onpointerenter={caught ? undefined : flee}
			onclick={handleClick}
			disabled={caught}
		>
			{caught ? '✓ Submitted!' : label}
		</button>

		{#if !caught && escapeCount > 5}
			<div class="absolute bottom-3 left-0 right-0 text-center">
				<span class="text-[10px] font-mono text-(--muted-foreground) opacity-50">
					Hint: Try using Tab key 😏
				</span>
			</div>
		{/if}
	</div>

	<p class="text-[10px] font-mono text-(--muted-foreground) text-center">
		Hover over the button to submit. Should be easy... right?
	</p>
</div>
