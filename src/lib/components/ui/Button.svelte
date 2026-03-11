<script lang="ts">
	import { cn, chaosClasses, randomGarbageText, chaosRandom } from '$lib/utils/cn.js';
	import type { GigoButtonProps, ButtonVariant, ButtonSize } from '$lib/types/index.js';

	let {
		variant = 'default',
		size = 'md',
		disabled = false,
		loading = false,
		chaos = false,
		chaosLevel = 5,
		educational = false,
		a11yWarning = false,
		escapeOnHover = false,
		randomizeText = false,
		multiClickRequired = 1,
		children,
		onclick,
		class: className,
		...restProps
	}: GigoButtonProps = $props();

	let clickCount = $state(0);
	let displayText = $state('');
	let offsetX = $state(0);
	let offsetY = $state(0);
	let showWarning = $state(false);
	let ripples = $state<Array<{ id: number; x: number; y: number; size: number }>>([]);
	let nextRippleId = $state(0);

	const variantClasses: Record<ButtonVariant, string> = {
		default:
			'bg-(--primary) text-(--primary-foreground) hover:shadow-(--glow-primary) hover:brightness-110',
		destructive:
			'bg-(--destructive) text-(--destructive-foreground) hover:shadow-(--glow-destructive) hover:brightness-110',
		outline:
			'border border-(--border) bg-transparent text-(--foreground) hover:bg-(--accent) hover:border-(--primary)/40',
		secondary:
			'bg-(--secondary) text-(--secondary-foreground) hover:bg-(--accent) hover:text-(--accent-foreground)',
		ghost:
			'text-(--foreground) hover:bg-(--accent)',
		link:
			'text-gigo-cyan underline-offset-4 hover:underline decoration-gigo-cyan/50',
		'chaos-primary':
			'bg-linear-to-r from-gigo-magenta via-gigo-cyan to-gigo-lime bg-[length:200%_auto] animate-gigo-gradient text-white font-semibold shadow-(--glow-primary)',
		'chaos-destructive':
			'bg-gigo-red text-white animate-gigo-shake shadow-(--glow-destructive)',
		'chaos-nightmare':
			'bg-linear-to-r from-gigo-magenta via-gigo-pink to-gigo-orange bg-[length:300%_auto] animate-gigo-gradient text-white font-bold animate-gigo-nightmare shadow-(--glow-primary)'
	};

	const sizeClasses: Record<ButtonSize, string> = {
		xs: 'h-7 px-2.5 text-xs rounded-md',
		sm: 'h-8 px-3.5 text-sm rounded-md',
		md: 'h-9 px-5 text-sm rounded-lg',
		lg: 'h-10 px-6 text-base rounded-lg',
		xl: 'h-12 px-8 text-lg rounded-xl',
		'chaos-sm': 'h-6 px-1 text-[10px] rounded-none',
		'chaos-lg': 'h-16 px-12 text-2xl rounded-full',
		'chaos-xl': 'h-20 px-16 text-4xl rounded-3xl'
	};

	$effect(() => {
		if (!chaos || !randomizeText) return;
		const interval = setInterval(() => {
			displayText = randomGarbageText();
		}, 1200);
		return () => clearInterval(interval);
	});

	function handleMouseEnter() {
		if (!chaos || !escapeOnHover) return;
		offsetX = (Math.random() - 0.5) * 200;
		offsetY = (Math.random() - 0.5) * 200;
	}

	function spawnRipple(e: MouseEvent) {
		const btn = e.currentTarget as HTMLElement;
		const rect = btn.getBoundingClientRect();
		const size = Math.max(rect.width, rect.height);
		const id = nextRippleId++;
		ripples = [...ripples, {
			id,
			x: e.clientX - rect.left - size / 2,
			y: e.clientY - rect.top - size / 2,
			size
		}];
		setTimeout(() => {
			ripples = ripples.filter(r => r.id !== id);
		}, 600);
	}

	function handleClick(e: MouseEvent) {
		spawnRipple(e);

		if (chaos && multiClickRequired > 1) {
			clickCount++;
			if (clickCount < multiClickRequired) {
				showWarning = true;
				return;
			}
			clickCount = 0;
			showWarning = false;
		}
		onclick?.(e as MouseEvent & { currentTarget: EventTarget & HTMLButtonElement });
	}

	let computedClass = $derived(
		cn(
			'gigo-ripple relative inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-300 ease-out cursor-pointer select-none',
			'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ring) focus-visible:ring-offset-2 focus-visible:ring-offset-(--background)',
			'disabled:pointer-events-none disabled:opacity-40',
			'active:scale-[0.97] hover:scale-[1.02]',
			variantClasses[variant],
			sizeClasses[size],
			chaos && chaosClasses(chaosLevel),
			className
		)
	);
</script>

<button
	class={computedClass}
	{disabled}
	aria-disabled={disabled || loading}
	style:transform="translate({offsetX}px, {offsetY}px)"
	style:transition="transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)"
	onmouseenter={handleMouseEnter}
	onclick={handleClick}
	{...restProps}
>
	{#each ripples as ripple (ripple.id)}
		<span
			class="gigo-ripple-circle"
			style:width="{ripple.size}px"
			style:height="{ripple.size}px"
			style:left="{ripple.x}px"
			style:top="{ripple.y}px"
		></span>
	{/each}

	{#if loading}
		<svg class="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
			<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
			<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
		</svg>
	{/if}

	{#if chaos && randomizeText && displayText}
		{displayText}
	{:else if children}
		{@render children()}
	{:else}
		Button
	{/if}
</button>

{#if showWarning && educational}
	<span class="ml-2 text-xs text-gigo-magenta animate-gigo-pulse-glow font-mono">
		{multiClickRequired - clickCount} more click(s)
	</span>
{/if}
