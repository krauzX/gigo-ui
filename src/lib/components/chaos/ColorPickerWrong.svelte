<script lang="ts">
	import { cn } from '$lib/utils/cn.js';

	let {
		value = $bindable('#e040fb'),
		offsetHue = true,
		swapChannels = true,
		delayUpdate = true,
		class: className,
		...restProps
	}: {
		value?: string;
		offsetHue?: boolean;
		swapChannels?: boolean;
		delayUpdate?: boolean;
		class?: string;
		[key: string]: unknown;
	} = $props();

	let pickerValue = $state('#e040fb');
	let displayColor = $state('#e040fb');
	let actualColor = $state('#e040fb');
	let labelLie = $state('');

	const COLOR_NAMES: Record<string, string> = {
		red: 'Definitely Blue', blue: 'Clearly Red', green: 'Obviously Purple',
		yellow: 'Totally Black', black: 'Pure White', white: 'Deep Black',
		pink: 'Forest Green', orange: 'Ocean Blue', purple: 'Grass Green',
		cyan: 'Warm Orange', magenta: 'Cool Teal', lime: 'Hot Pink',
	};

	function hexToRgb(hex: string): [number, number, number] {
		const h = hex.replace('#', '');
		return [
			parseInt(h.substring(0, 2), 16),
			parseInt(h.substring(2, 4), 16),
			parseInt(h.substring(4, 6), 16),
		];
	}

	function rgbToHex(r: number, g: number, b: number): string {
		return '#' + [r, g, b].map(c => Math.max(0, Math.min(255, Math.round(c))).toString(16).padStart(2, '0')).join('');
	}

	function corruptColor(hex: string): string {
		let [r, g, b] = hexToRgb(hex);

		if (swapChannels) {
			[r, g, b] = [b, r, g];
		}

		if (offsetHue) {
			r = (r + 128) % 256;
			g = (g + 64) % 256;
			b = (b + 192) % 256;
		}

		return rgbToHex(r, g, b);
	}

	function getClosestColorName(hex: string): string {
		const [r, g, b] = hexToRgb(hex);
		const names = Object.keys(COLOR_NAMES);
		const hue = Math.atan2(Math.sqrt(3) * (g - b), 2 * r - g - b) * 180 / Math.PI;
		const idx = Math.abs(Math.round(hue / 30)) % names.length;
		return COLOR_NAMES[names[idx]] || 'Unknown Color';
	}

	function handlePick(e: Event) {
		const raw = (e.target as HTMLInputElement).value;
		pickerValue = raw;

		const corrupted = corruptColor(raw);

		if (delayUpdate) {
			setTimeout(() => {
				displayColor = corrupted;
				actualColor = raw;
				value = corrupted;
				labelLie = getClosestColorName(raw);
			}, 300 + Math.random() * 500);
		} else {
			displayColor = corrupted;
			actualColor = raw;
			value = corrupted;
			labelLie = getClosestColorName(raw);
		}
	}
</script>

<div class={cn('space-y-4 max-w-xs', className)} {...restProps}>
	<div class="flex items-center justify-between">
		<span class="text-xs font-mono text-(--muted-foreground)">Pick a color</span>
		{#if labelLie}
			<span class="text-xs font-mono text-gigo-cyan">{labelLie}</span>
		{/if}
	</div>

	<div class="flex items-center gap-4">
		<input
			type="color"
			value={pickerValue}
			oninput={handlePick}
			class="w-16 h-16 rounded-xl border border-(--border) cursor-pointer bg-transparent
				[&::-webkit-color-swatch-wrapper]:p-1 [&::-webkit-color-swatch]:rounded-lg [&::-webkit-color-swatch]:border-none
				[&::-moz-color-swatch]:rounded-lg [&::-moz-color-swatch]:border-none"
		/>

		<div class="flex-1 space-y-2">
			<div class="flex items-center gap-2">
				<div class="w-8 h-8 rounded-lg border border-(--border)" style:background={actualColor}></div>
				<span class="text-[10px] font-mono text-(--muted-foreground)">You picked</span>
				<span class="font-mono text-xs">{actualColor}</span>
			</div>
			<div class="flex items-center gap-2">
				<div class="w-8 h-8 rounded-lg border border-(--border)" style:background={displayColor}></div>
				<span class="text-[10px] font-mono text-(--muted-foreground)">You get</span>
				<span class="font-mono text-xs text-gigo-magenta">{displayColor}</span>
			</div>
		</div>
	</div>

	<div
		class="h-20 w-full rounded-xl border border-(--border) transition-colors duration-500"
		style:background={displayColor}
	>
		<div class="flex h-full items-center justify-center">
			<span
				class="text-sm font-mono font-bold px-3 py-1 rounded-lg"
				style:background="rgba(0,0,0,0.5)"
				style:color="white"
			>
				{displayColor}
			</span>
		</div>
	</div>

	<p class="text-[10px] font-mono text-(--muted-foreground) text-center">
		Every color you pick gets channel-swapped and hue-shifted. Good luck matching anything.
	</p>
</div>
