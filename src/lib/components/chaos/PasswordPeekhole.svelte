<script lang="ts">
	import { cn } from '$lib/utils/cn.js';

	let {
		value = $bindable(''),
		placeholder = 'Type your password...',
		holeSize = 40,
		accentColor = '#e040fb',
		class: className,
		...restProps
	}: {
		value?: string;
		placeholder?: string;
		holeSize?: number;
		accentColor?: string;
		class?: string;
		[key: string]: unknown;
	} = $props();

	let holeX = $state(60);
	let holeY = $state(20);
	let isDragging = $state(false);
	let dragOffset = $state({ x: 0, y: 0 });
	let containerEl: HTMLDivElement | undefined = $state();
	let inputEl: HTMLInputElement | undefined = $state();
	let isFocused = $state(false);

	let holeCenterX = $derived(holeX + holeSize / 2);
	let holeCenterY = $derived(holeY + holeSize / 2);

	function onHolePointerDown(e: PointerEvent) {
		isDragging = true;
		const rect = (e.target as HTMLElement).getBoundingClientRect();
		dragOffset = {
			x: e.clientX - rect.left - holeSize / 2,
			y: e.clientY - rect.top - holeSize / 2
		};
		(e.target as HTMLElement).setPointerCapture(e.pointerId);
	}

	function onPointerMove(e: PointerEvent) {
		if (!isDragging || !containerEl) return;
		const container = containerEl.getBoundingClientRect();
		holeX = Math.max(0, Math.min(e.clientX - container.left - dragOffset.x - holeSize / 2,
			container.width - holeSize));
		holeY = Math.max(0, Math.min(e.clientY - container.top - dragOffset.y - holeSize / 2,
			container.height - holeSize));
	}

	function onPointerUp() {
		isDragging = false;
	}

	function focusInput() {
		inputEl?.focus();
	}
</script>

<div class={cn('space-y-3 max-w-sm', className)} {...restProps}>
	<!-- Password field container -->
	<div
		bind:this={containerEl}
		class="relative rounded-xl border overflow-hidden cursor-text"
		role="textbox"
		tabindex="-1"
		style:border-color={isFocused ? accentColor : 'var(--border)'}
		style:box-shadow={isFocused ? `0 0 0 2px ${accentColor}26` : 'none'}
		onclick={focusInput}
		onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') focusInput(); }}
		onpointermove={onPointerMove}
		onpointerup={onPointerUp}
	>
		<!-- Real input -->
		<input
			bind:this={inputEl}
			type="text"
			bind:value
			{placeholder}
			onfocus={() => isFocused = true}
			onblur={() => isFocused = false}
			class="w-full px-4 py-3 bg-(--card) font-mono text-base text-transparent caret-transparent outline-none selection:bg-transparent"
			style="color: transparent;"
			autocomplete="off"
			spellcheck="false"
		/>

		<!-- Visible text layer underneath the overlay -->
		<div
			class="absolute inset-0 flex items-center px-4 pointer-events-none font-mono text-base"
		>
			<span class="text-(--foreground)">
				{#if value}
					{value}
				{:else}
					<span class="text-(--muted-foreground)">{placeholder}</span>
				{/if}
			</span>
		</div>

		<!-- Overlay with circular hole cut out via CSS mask -->
		<div
			class="absolute inset-0 pointer-events-none bg-(--card)"
			style:-webkit-mask-image="radial-gradient(circle {holeSize / 2}px at {holeCenterX}px {holeCenterY}px, transparent {holeSize / 2}px, black {holeSize / 2}px)"
			style:mask-image="radial-gradient(circle {holeSize / 2}px at {holeCenterX}px {holeCenterY}px, transparent {holeSize / 2}px, black {holeSize / 2}px)"
		>
		</div>

		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<!-- Peephole handle (draggable) -->
		<div
			role="slider"
			aria-label="Peephole position"
			aria-valuenow={Math.round(holeX)}
			tabindex="0"
			class="absolute rounded-full border-2 cursor-grab active:cursor-grabbing z-10"
			style:width="{holeSize}px"
			style:height="{holeSize}px"
			style:left="{holeX}px"
			style:top="{holeY}px"
			style:border-color={isDragging ? accentColor : `${accentColor}66`}
			style:box-shadow={isDragging ? `0 0 16px ${accentColor}66` : `0 0 8px ${accentColor}33`}
			style:background="transparent"
			onpointerdown={onHolePointerDown}
		>
			<div class="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 rounded-tl" style:border-color={accentColor}></div>
			<div class="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 rounded-tr" style:border-color={accentColor}></div>
			<div class="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 rounded-bl" style:border-color={accentColor}></div>
			<div class="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 rounded-br" style:border-color={accentColor}></div>
		</div>
	</div>

	<!-- Character count -->
	<div class="flex items-center justify-between text-xs font-mono text-(--muted-foreground)">
		<span>{value.length} chars (probably)</span>
		<span class="text-gigo-magenta/60">⬡ drag peephole to peek</span>
	</div>

	<p class="text-[10px] font-mono text-(--muted-foreground) text-center">
		Your password is hidden. Drag the peephole to see what you typed. Security! 🔒
	</p>
</div>
