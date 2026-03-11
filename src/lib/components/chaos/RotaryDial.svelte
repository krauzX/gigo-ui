<script lang="ts">
	import { cn } from '$lib/utils/cn.js';

	let {
		value = $bindable(''),
		maxDigits = 10,
		dialSize = 260,
		class: className,
		...restProps
	}: {
		value?: string;
		maxDigits?: number;
		dialSize?: number;
		class?: string;
		[key: string]: unknown;
	} = $props();

	let rotation = $state(0);
	let isDragging = $state(false);
	let dialEl: SVGSVGElement | undefined = $state();
	let startAngle = $state(0);
	let startRotation = $state(0);
	let selectedDigit = $state<number | null>(null);
	let isAnimatingReturn = $state(false);

	let CENTER = $derived(dialSize / 2);
	let HOLE_RADIUS = $derived(dialSize * 18 / 260);
	let RING_RADIUS = $derived(dialSize * 95 / 260);
	const STOPPER_ANGLE = 30;

	// Digit positions (0-9) arranged clockwise starting from bottom-right
	// Real rotary phones: 1 at ~330°, going clockwise to 0 at ~210°
	const digitAngles = [
		240, // 0
		330, // 1
		310, // 2
		290, // 3
		270, // 4
		250, // 5
		230, // 6
		210, // 7
		190, // 8
		170, // 9
	];

	function getDigitPos(angle: number) {
		const rad = ((angle - 90) * Math.PI) / 180;
		return {
			x: CENTER + RING_RADIUS * Math.cos(rad),
			y: CENTER + RING_RADIUS * Math.sin(rad)
		};
	}

	function getAngleFromCenter(clientX: number, clientY: number) {
		if (!dialEl) return 0;
		const rect = dialEl.getBoundingClientRect();
		const cx = rect.left + rect.width / 2;
		const cy = rect.top + rect.height / 2;
		return Math.atan2(clientY - cy, clientX - cx) * (180 / Math.PI) + 90;
	}

	function onPointerDown(e: PointerEvent, digitIndex: number) {
		if (isAnimatingReturn) return;
		if (value.length >= maxDigits) return;
		isDragging = true;
		selectedDigit = digitIndex;
		startAngle = getAngleFromCenter(e.clientX, e.clientY);
		startRotation = rotation;
		(e.target as HTMLElement)?.setPointerCapture?.(e.pointerId);
	}

	function onPointerMove(e: PointerEvent) {
		if (!isDragging || selectedDigit === null) return;
		const currentAngle = getAngleFromCenter(e.clientX, e.clientY);
		let delta = currentAngle - startAngle;

		// Only allow clockwise rotation (positive delta)
		if (delta < -180) delta += 360;
		if (delta > 180) delta -= 360;

		// Clamp to clockwise only
		const newRotation = Math.max(0, Math.min(startRotation + delta, 360 - digitAngles[selectedDigit] + STOPPER_ANGLE));
		rotation = Math.max(0, newRotation);
	}

	function onPointerUp() {
		if (!isDragging || selectedDigit === null) return;
		isDragging = false;

		// Check if rotated far enough
		const requiredRotation = 360 - digitAngles[selectedDigit];
		if (rotation >= requiredRotation * 0.75) {
			// Digit entered!
			value += String(selectedDigit);
		}

		// Animate return
		isAnimatingReturn = true;
		const returnStart = rotation;
		const duration = 400 + rotation * 2; // longer return for bigger rotations
		const startTime = performance.now();

		function animateReturn(now: number) {
			const elapsed = now - startTime;
			const progress = Math.min(elapsed / duration, 1);
			// Ease out
			const eased = 1 - Math.pow(1 - progress, 3);
			rotation = returnStart * (1 - eased);

			if (progress < 1) {
				requestAnimationFrame(animateReturn);
			} else {
				rotation = 0;
				isAnimatingReturn = false;
				selectedDigit = null;
			}
		}
		requestAnimationFrame(animateReturn);
	}

	function removeLastDigit() {
		value = value.slice(0, -1);
	}
</script>

<div class={cn('flex flex-col items-center gap-4', className)} {...restProps}>
	<!-- Value display -->
	<div class="flex items-center gap-2 rounded-xl border border-(--border) bg-(--secondary) px-4 py-2 min-w-50">
		<span class="font-mono text-lg text-(--foreground) flex-1 text-center tracking-[0.3em]">
			{#if value}
				{value}
			{:else}
				<span class="text-(--muted-foreground) tracking-normal text-sm">Dial a number...</span>
			{/if}
		</span>
		{#if value}
			<button
				class="text-xs text-(--muted-foreground) hover:text-gigo-red transition-colors"
				onclick={removeLastDigit}
			>&#x232b;</button>
		{/if}
	</div>

	<!-- Rotary dial -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<svg
		bind:this={dialEl}
		width={dialSize}
		height={dialSize}
		viewBox="0 0 {dialSize} {dialSize}"
		class="select-none touch-none"
		role="group"
		aria-label="Rotary dial"
		onpointermove={onPointerMove}
		onpointerup={onPointerUp}
		onpointerleave={onPointerUp}
	>
		<!-- Outer ring -->
		<circle cx={CENTER} cy={CENTER} r={dialSize / 2 - 4} fill="none" stroke="var(--border)" stroke-width="2" />

		<circle cx={CENTER} cy={CENTER} r={dialSize / 2 - 8} fill="var(--card)" />

		<!-- Center circle -->
		<circle cx={CENTER} cy={CENTER} r="35" fill="var(--secondary)" stroke="var(--border)" stroke-width="1" />

		<!-- Center label -->
		<text x={CENTER} y={CENTER + 4} text-anchor="middle" font-size="10" font-family="monospace" fill="var(--muted-foreground)">GIGO</text>

		<!-- Stopper -->
		{#if true}
			{@const stopPos = getDigitPos(STOPPER_ANGLE + 340)}
			<rect
				x={stopPos.x - 4}
				y={stopPos.y - 12}
			width="8"
			height="24"
			rx="3"
				fill="var(--muted-foreground)"
				opacity="0.3"
			/>
		{/if}

		<!-- Rotating group -->
		<g transform="rotate({rotation}, {CENTER}, {CENTER})">
			{#each [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as digit}
				{@const pos = getDigitPos(digitAngles[digit])}
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<circle
					cx={pos.x}
					cy={pos.y}
					r={HOLE_RADIUS}
					fill={selectedDigit === digit ? 'rgba(224, 64, 251, 0.15)' : 'var(--secondary)'}
					stroke={selectedDigit === digit ? '#e040fb' : 'var(--border)'}
					stroke-width={selectedDigit === digit ? 2 : 1}
					class="cursor-pointer"
					role="button"
					tabindex="0"
					aria-label="Digit {digit}"
					style="filter: {selectedDigit === digit ? 'drop-shadow(0 0 6px rgba(224, 64, 251, 0.4))' : 'none'}"
					onpointerdown={(e) => onPointerDown(e, digit)}
				/>
				<text
					x={pos.x}
					y={pos.y + 5}
					text-anchor="middle"
					font-size="16"
					font-weight="bold"
					font-family="monospace"
					fill={selectedDigit === digit ? '#e040fb' : 'var(--foreground)'}
					class="pointer-events-none select-none"
				>
					{digit}
				</text>
			{/each}
		</g>
	</svg>

	<p class="text-[10px] font-mono text-(--muted-foreground) text-center max-w-65">
		Drag a digit clockwise to the stopper, then release. Just like grandma used to do.
	</p>
</div>
