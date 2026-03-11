<script lang="ts">
	import { cn } from '$lib/utils/cn.js';

	let {
		value = $bindable(''),
		digitCount = 10,
		formatPattern = '(XXX) XXX-XXXX',
		class: className,
		...restProps
	}: {
		value?: string;
		digitCount?: number;
		formatPattern?: string;
		class?: string;
		[key: string]: unknown;
	} = $props();

	let sliderValues = $state<number[]>([]);

	$effect(() => {
		if (sliderValues.length !== digitCount) {
			sliderValues = Array(digitCount).fill(0);
		}
	});

	// Sync value from sliders
	$effect(() => {
		value = sliderValues.map(v => Math.round(v)).join('');
	});

	function formatPhoneDisplay(raw: string): string {
		const digits = raw.padEnd(digitCount, '_');
		let result = '';
		let di = 0;
		for (const ch of formatPattern) {
			if (ch === 'X') {
				result += digits[di] ?? '_';
				di++;
			} else {
				result += ch;
			}
		}
		if (di < digits.length) {
			result += digits.slice(di);
		}
		return result;
	}

	function setSliderValue(index: number, newVal: number) {
		sliderValues = sliderValues.map((v, i) => i === index ? newVal : v);
	}
</script>

<div class={cn('space-y-4 max-w-md', className)} {...restProps}>
	<!-- Phone display -->
	<div class="rounded-xl border border-(--border) bg-(--secondary) px-4 py-3 text-center">
		<span class="font-mono text-xl tracking-[0.15em] text-(--foreground)">
			{formatPhoneDisplay(value)}
		</span>
	</div>

	<!-- Sliders grid -->
	<div class="grid gap-2">
		{#each sliderValues as sv, i}
			<div class="flex items-center gap-3 rounded-lg border border-(--border) bg-(--card) px-3 py-2">
				<span class="text-[10px] font-mono text-(--muted-foreground) min-w-14">
					Digit {i + 1}
				</span>
				<input
					type="range"
					min="0"
					max="9"
					step="1"
					value={sv}
					oninput={(e) => setSliderValue(i, Number((e.target as HTMLInputElement).value))}
					class="flex-1 h-2 rounded-full appearance-none cursor-pointer
						[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gigo-magenta [&::-webkit-slider-thumb]:shadow-[0_0_8px_rgba(224,64,251,0.5)] [&::-webkit-slider-thumb]:cursor-pointer
						[&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-gigo-magenta [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:cursor-pointer"
					style="background: linear-gradient(to right, rgba(224,64,251,0.3) {sv * 11.11}%, var(--secondary) {sv * 11.11}%)"
				/>
				<span class="text-lg font-mono font-bold min-w-5 text-center"
					style:color={sv > 0 ? '#e040fb' : 'var(--muted-foreground)'}>
					{Math.round(sv)}
				</span>
			</div>
		{/each}
	</div>

	<p class="text-[10px] font-mono text-(--muted-foreground) text-center">
		Slide each digit individually. The future of phone number entry is here.
	</p>
</div>
