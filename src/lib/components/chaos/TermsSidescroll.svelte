<script lang="ts">
	import { cn } from '$lib/utils/cn.js';

	let {
		content = 'By using this software, you agree to surrender all your snacks, your firstborn WiFi password, and any hope of understanding what you just agreed to. This agreement is binding in all dimensions, including but not limited to: the physical realm, the digital void, and that weird dream you had last Tuesday. You may not reverse-engineer, disassemble, or even think too hard about this product without express written consent from our team of legally trained hamsters. The company reserves the right to change these terms at any time, for any reason, or for no reason at all — because chaos is the only true constant. Any disputes shall be settled by a coin flip performed by a blindfolded intern. By scrolling this far, you have already agreed twice.',
		accepted = $bindable(false),
		rotateText = true,
		scrambleOnScroll = true,
		sidewaysScroll = true,
		class: className,
		...restProps
	}: {
		content?: string;
		accepted?: boolean;
		rotateText?: boolean;
		scrambleOnScroll?: boolean;
		sidewaysScroll?: boolean;
		class?: string;
		[key: string]: unknown;
	} = $props();

	let scrollPos = $state(0);
	let textRotation = $state(0);
	let scrambledContent = $state('');
	let containerEl: HTMLDivElement | undefined = $state();
	let hasScrolledToEnd = $state(false);
	let checkboxDisabled = $state(true);

	$effect(() => {
		scrambledContent = content;
	});

	function handleScroll(e: Event) {
		const el = e.target as HTMLElement;
		if (sidewaysScroll) {
			scrollPos = el.scrollLeft;
			const maxScroll = el.scrollWidth - el.clientWidth;
			hasScrolledToEnd = maxScroll > 0 && el.scrollLeft >= maxScroll - 10;
		} else {
			scrollPos = el.scrollTop;
			const maxScroll = el.scrollHeight - el.clientHeight;
			hasScrolledToEnd = maxScroll > 0 && el.scrollTop >= maxScroll - 10;
		}

		if (hasScrolledToEnd) checkboxDisabled = false;

		if (rotateText) {
			textRotation = Math.sin(scrollPos * 0.02) * 8;
		}

		if (scrambleOnScroll && Math.random() > 0.7) {
			const chars = content.split('');
			const count = Math.floor(Math.random() * 5) + 1;
			for (let i = 0; i < count; i++) {
				const idx = Math.floor(Math.random() * chars.length);
				if (chars[idx] !== ' ') {
					chars[idx] = String.fromCharCode(33 + Math.floor(Math.random() * 94));
				}
			}
			scrambledContent = chars.join('');
		}
	}

	function handleCheckbox() {
		if (checkboxDisabled) return;
		if (Math.random() > 0.5) {
			accepted = !accepted;
		}
	}
</script>

<div class={cn('space-y-3 max-w-md', className)} {...restProps}>
	<div class="flex items-center justify-between">
		<span class="text-sm font-bold text-(--foreground)">Terms & Conditions</span>
		<span class="text-[10px] font-mono text-(--muted-foreground)">
			{hasScrolledToEnd ? '✓ Scrolled to end' : '← Scroll to read all →'}
		</span>
	</div>

	<div
		bind:this={containerEl}
		class="rounded-xl border border-(--border) bg-(--card) p-4 text-sm text-(--muted-foreground) leading-relaxed font-mono"
		style:max-height="160px"
		style:overflow={sidewaysScroll ? 'auto hidden' : 'hidden auto'}
		style:white-space={sidewaysScroll ? 'nowrap' : 'normal'}
		onscroll={handleScroll}
	>
		<div style:transform="rotate({textRotation}deg)" style:transform-origin="center" style:transition="transform 0.15s">
			{scrambledContent}
		</div>
	</div>

	<div class="flex items-center gap-3">
		<button
			type="button"
			class="flex items-center justify-center w-5 h-5 rounded border cursor-pointer transition-all"
			style:border-color={accepted ? '#76ff03' : checkboxDisabled ? 'var(--border)' : '#e040fb'}
			style:background={accepted ? 'rgba(118, 255, 3, 0.15)' : 'transparent'}
			style:opacity={checkboxDisabled ? 0.4 : 1}
			onclick={handleCheckbox}
			disabled={checkboxDisabled}
			aria-checked={accepted}
			role="checkbox"
		>
			{#if accepted}
				<span class="text-xs text-gigo-lime">✓</span>
			{/if}
		</button>
		<span class="text-xs text-(--muted-foreground)">
			{checkboxDisabled
				? 'Scroll to the end to enable'
				: accepted
					? 'Accepted (maybe — the checkbox has a 50% fail rate)'
					: 'I agree to these incomprehensible terms'}
		</span>
	</div>

	<p class="text-[10px] font-mono text-(--muted-foreground) text-center">
		Scrolls sideways. Text rotates as you scroll. Characters scramble. Checkbox works half the time.
	</p>
</div>
