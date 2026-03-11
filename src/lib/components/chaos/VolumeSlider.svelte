<script lang="ts">
	import { cn } from '$lib/utils/cn.js';

	let {
		value = $bindable(50),
		min = 0,
		max = 100,
		step = 1,
		invertDirection = true,
		jumpAround = true,
		fakeLabels = true,
		class: className,
		...restProps
	}: {
		value?: number;
		min?: number;
		max?: number;
		step?: number;
		invertDirection?: boolean;
		jumpAround?: boolean;
		fakeLabels?: boolean;
		class?: string;
		[key: string]: unknown;
	} = $props();

	let displayValue = $state(50);
	let labelText = $state('50%');
	let isGrabbing = $state(false);
	let shakeClass = $state('');
	let jumpTimer = $state(0);

	const FAKE_LABELS = [
		'Quiet-ish', 'MAXIMUM', 'Whisper mode', '🔇 Muted (not really)',
		'Ear damage', 'Perfect', 'Too much', 'Not enough',
		'Your neighbors hate this', '???', 'Yes', 'No',
	];

	$effect(() => {
		displayValue = invertDirection ? max - value + min : value;
		const pct = Math.round(((value - min) / (max - min)) * 100);
		labelText = fakeLabels
			? FAKE_LABELS[Math.floor((pct / 100) * FAKE_LABELS.length) % FAKE_LABELS.length]
			: `${pct}%`;
	});

	$effect(() => {
		if (!jumpAround) return;
		const timer = setInterval(() => {
			if (!isGrabbing && Math.random() > 0.6) {
				const offset = (Math.random() - 0.5) * 20;
				value = Math.max(min, Math.min(max, value + offset));
				shakeClass = 'animate-gigo-shake';
				setTimeout(() => { shakeClass = ''; }, 300);
			}
		}, 3000);
		return () => clearInterval(timer);
	});

	function handleInput(e: Event) {
		const raw = Number((e.target as HTMLInputElement).value);
		value = invertDirection ? max - raw + min : raw;
		isGrabbing = true;
	}

	function handleChange() {
		isGrabbing = false;
	}

	let sliderDisplayVal = $derived(invertDirection ? max - value + min : value);
	let fillPct = $derived(((sliderDisplayVal - min) / (max - min)) * 100);
</script>

<div class={cn('space-y-3 max-w-xs', shakeClass, className)} {...restProps}>
	<div class="flex items-center justify-between">
		<span class="text-xs font-mono text-(--muted-foreground)">Volume</span>
		<span class="text-xs font-mono font-bold text-gigo-magenta">{labelText}</span>
	</div>

	<div class="relative">
		<input
			type="range"
			{min}
			{max}
			{step}
			value={sliderDisplayVal}
			oninput={handleInput}
			onchange={handleChange}
			class="w-full h-3 rounded-full appearance-none cursor-pointer
				[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gigo-magenta [&::-webkit-slider-thumb]:shadow-[0_0_12px_rgba(224,64,251,0.5)] [&::-webkit-slider-thumb]:cursor-grab [&::-webkit-slider-thumb]:active:cursor-grabbing
				[&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-gigo-magenta [&::-moz-range-thumb]:border-none"
			style="background: linear-gradient(to right, rgba(224,64,251,0.4) {fillPct}%, var(--secondary) {fillPct}%)"
		/>
	</div>

	<div class="flex justify-between text-[9px] font-mono text-(--muted-foreground)">
		<span>{invertDirection ? '🔊 MAX' : '🔇 MIN'}</span>
		<span>{invertDirection ? '🔇 MIN' : '🔊 MAX'}</span>
	</div>

	<div class="flex items-center gap-2 rounded-lg border border-(--border) bg-(--card) px-3 py-2">
		<span class="text-xs text-(--muted-foreground)">Actual value:</span>
		<span class="font-mono text-sm font-bold text-gigo-cyan">{Math.round(value)}</span>
		<div class="flex-1"></div>
		{#each Array(5) as _, i}
			<div
				class="w-1 rounded-full transition-all duration-200"
				style:height="{4 + i * 4}px"
				style:background={i < Math.ceil((value / max) * 5) ? '#e040fb' : 'var(--secondary)'}
			></div>
		{/each}
	</div>

	<p class="text-[10px] font-mono text-(--muted-foreground) text-center">
		The slider is inverted. The labels lie. It jumps on its own. Enjoy.
	</p>
</div>
