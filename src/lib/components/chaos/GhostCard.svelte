<script lang="ts">
	import { cn } from '$lib/utils/cn.js';

	let {
		title = 'Ghost Card',
		description = '',
		children,
		disappearMinMs = 2000,
		disappearMaxMs = 5000,
		glitchChance = 0.6,
		class: className,
		...restProps
	}: {
		title?: string;
		description?: string;
		children?: import('svelte').Snippet;
		disappearMinMs?: number;
		disappearMaxMs?: number;
		glitchChance?: number;
		class?: string;
		[key: string]: unknown;
	} = $props();

	let visible = $state(true);
	let glitching = $state(false);
	let offsetX = $state(0);
	let offsetY = $state(0);
	let rotation = $state(0);
	let scaleX = $state(1);
	let clipPath = $state('none');
	let hueShift = $state(0);
	let containerEl: HTMLDivElement | undefined = $state();

	let glitchContentOpacity = $state(1);
	let glitchTitleStrike = $state(false);
	let glitchTitleText = $state('');
	let glitchScanlineTop = $state(50);

	const GLITCH_CLIPS = [
		'polygon(0 0, 100% 0, 100% 45%, 0 45%)',
		'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)',
		'polygon(0 0, 60% 0, 60% 100%, 0 100%)',
		'polygon(20% 10%, 80% 10%, 80% 90%, 20% 90%)',
		'inset(10% 0 10% 0)',
		'polygon(0 0, 100% 0, 100% 30%, 70% 30%, 70% 70%, 100% 70%, 100% 100%, 0 100%)',
	];

	function corruptTitle(text: string): string {
		return text.split('').map(c =>
			Math.random() > 0.7 ? String.fromCharCode(c.charCodeAt(0) + Math.floor(Math.random() * 5)) : c
		).join('');
	}

	$effect(() => {
		const disappear = () => {
			const nextDisappear = disappearMinMs + Math.random() * (disappearMaxMs - disappearMinMs);

			const timer = setTimeout(() => {
				visible = false;

				const reappearDelay = 500 + Math.random() * 2000;
				setTimeout(() => {
					offsetX = (Math.random() - 0.5) * 60;
					offsetY = (Math.random() - 0.5) * 40;
					rotation = (Math.random() - 0.5) * 12;

					if (Math.random() < glitchChance) {
						glitching = true;
						scaleX = Math.random() > 0.5 ? -1 : 1;
						clipPath = Math.random() > 0.3 ? GLITCH_CLIPS[Math.floor(Math.random() * GLITCH_CLIPS.length)] : 'none';
						hueShift = Math.random() * 360;
						glitchContentOpacity = Math.random() > 0.5 ? 0.6 : 1;
						glitchTitleStrike = Math.random() > 0.5;
						glitchTitleText = Math.random() > 0.6 ? corruptTitle(title) : '';
						glitchScanlineTop = Math.random() * 100;

						setTimeout(() => {
							glitching = false;
							scaleX = 1;
							clipPath = 'none';
							hueShift = 0;
							glitchContentOpacity = 1;
							glitchTitleStrike = false;
							glitchTitleText = '';
						}, 800 + Math.random() * 1500);
					}

					visible = true;
					disappear();
				}, reappearDelay);
			}, nextDisappear);

			return timer;
		};

		const t = disappear();
		return () => clearTimeout(t);
	});
</script>

<div
	class="relative"
	bind:this={containerEl}
>
	<div
		class={cn(
			'relative rounded-2xl border bg-(--card) p-6 transition-all duration-500',
			visible ? 'opacity-100' : 'opacity-0 scale-75',
			glitching ? 'border-gigo-red/50' : 'border-(--border)',
			className
		)}
		style:transform="translate({offsetX}px, {offsetY}px) rotate({rotation}deg) scaleX({scaleX})"
		style:clip-path={clipPath}
		style:filter="hue-rotate({hueShift}deg)"
		style:transition="opacity 0.3s, transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), clip-path 0.2s, filter 0.3s"
		{...restProps}
	>
		{#if glitching}
			<div class="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl z-10">
				<div class="absolute inset-0 bg-gigo-red/5"></div>
				<div
					class="absolute w-full h-0.5 bg-gigo-cyan/30"
					style:top="{glitchScanlineTop}%"
					style:animation="gigo-shimmer 0.5s linear infinite"
				></div>
			</div>
		{/if}

		<div class="relative z-0" style:opacity={glitchContentOpacity}>
			{#if title}
				<h3 class="text-lg font-semibold text-(--foreground)" class:line-through={glitchTitleStrike}>
					{glitchTitleText || title}
				</h3>
			{/if}
			{#if description}
				<p class="mt-2 text-sm text-(--muted-foreground)">{description}</p>
			{/if}
			{#if children}
				<div class="mt-4">
					{@render children()}
				</div>
			{/if}
		</div>

		<!-- Ghost status indicator -->
		<div class="absolute top-3 right-3 flex items-center gap-1.5">
			<div
				class="w-2 h-2 rounded-full transition-colors duration-300"
				style:background={glitching ? '#ff1744' : visible ? '#76ff03' : '#7a7a8e'}
				style:box-shadow={glitching ? '0 0 8px rgba(255, 23, 68, 0.6)' : 'none'}
			></div>
			<span class="text-[10px] font-mono text-(--muted-foreground)">
				{glitching ? 'CORRUPT' : visible ? 'STABLE' : 'GONE'}
			</span>
		</div>
	</div>
</div>
