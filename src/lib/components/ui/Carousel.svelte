<script lang="ts">
	import { cn, chaosClasses, chaosRandom, randomGarbageText } from '$lib/utils/cn.js';
	import type { GigoCarouselProps } from '$lib/types/index.js';

	let {
		slides = [],
		autoplay = false,
		interval = 3000,
		chaos = false,
		chaosLevel = 5,
		educational = false,
		a11yWarning = false,
		lyingNavigation = false,
		reverseDirection = false,
		randomJumps = false,
		infiniteFakeSlides = false,
		onslidechange,
		class: className,
		...restProps
	}: GigoCarouselProps = $props();

	let currentIndex = $state(0);
	let fakeSlideCount = $state(0);
	let direction = $state<'left' | 'right'>('right');

	const totalSlides = $derived(slides.length + (chaos && infiniteFakeSlides ? fakeSlideCount : 0));

	$effect(() => {
		if (!autoplay || slides.length === 0) return;
		const timer = setInterval(() => { goNext(); }, interval);
		return () => clearInterval(timer);
	});

	$effect(() => {
		if (!chaos || !randomJumps || slides.length === 0) return;
		const timer = setInterval(() => {
			currentIndex = chaosRandom(slides.length);
			onslidechange?.(currentIndex);
		}, 4000);
		return () => clearInterval(timer);
	});

	$effect(() => {
		if (!chaos || !infiniteFakeSlides) return;
		const timer = setInterval(() => { fakeSlideCount++; }, 5000);
		return () => clearInterval(timer);
	});

	function goNext() {
		if (slides.length === 0) return;
		direction = 'right';
		if (chaos && reverseDirection) {
			currentIndex = (currentIndex - 1 + slides.length) % slides.length;
		} else {
			currentIndex = (currentIndex + 1) % slides.length;
		}
		onslidechange?.(currentIndex);
	}

	function goPrev() {
		if (slides.length === 0) return;
		direction = 'left';
		if (chaos && reverseDirection) {
			currentIndex = (currentIndex + 1) % slides.length;
		} else {
			currentIndex = (currentIndex - 1 + slides.length) % slides.length;
		}
		onslidechange?.(currentIndex);
	}

	function handlePrevClick() {
		if (chaos && lyingNavigation) { goNext(); } else { goPrev(); }
	}

	function handleNextClick() {
		if (chaos && lyingNavigation) { goPrev(); } else { goNext(); }
	}

	let containerClass = $derived(
		cn(
			'relative w-full overflow-hidden rounded-xl border border-(--border) bg-(--surface-1)',
			chaos && chaosClasses(chaosLevel),
			className
		)
	);
</script>

<div class={containerClass} {...restProps}>
	<!-- Slide area -->
	<div class="relative h-64 w-full overflow-hidden">
		{#each slides as slide, i}
			<div
				class={cn(
					'absolute inset-0 flex items-center justify-center p-8 transition-all duration-500 ease-out',
					i === currentIndex
						? 'opacity-100 translate-x-0 scale-100'
						: i < currentIndex || (currentIndex === 0 && i === slides.length - 1 && direction === 'left')
							? 'opacity-0 -translate-x-full scale-95 pointer-events-none'
							: 'opacity-0 translate-x-full scale-95 pointer-events-none'
				)}
			>
				{#if slide.image}
					<img src={slide.image} alt={slide.content} class="max-h-full max-w-full object-contain rounded-lg" />
				{:else}
					<p class="text-lg text-(--foreground) text-center leading-relaxed">{slide.content}</p>
				{/if}
			</div>
		{/each}

		{#if chaos && infiniteFakeSlides && fakeSlideCount > 0}
			<div class="absolute bottom-3 right-3 text-xs text-gigo-magenta font-mono animate-gigo-entrance">
				+{fakeSlideCount} totally real slide(s)
			</div>
		{/if}

		<!-- Gradient edges -->
		<div class="absolute inset-y-0 left-0 w-12 bg-linear-to-r from-(--surface-1) to-transparent pointer-events-none"></div>
		<div class="absolute inset-y-0 right-0 w-12 bg-linear-to-l from-(--surface-1) to-transparent pointer-events-none"></div>
	</div>

	<!-- Navigation -->
	<div class="flex items-center justify-between border-t border-(--border) p-3">
		<button
			class="group/nav flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-(--muted-foreground) hover:text-(--foreground) hover:bg-(--surface-2) transition-all duration-200"
			onclick={handlePrevClick}
			aria-label="Previous slide"
		>
			<svg class="h-4 w-4 transition-transform duration-200 group-hover/nav:-translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
			Prev
		</button>

		<div class="flex gap-2 items-center">
			{#each slides as _, i}
				<button
					class="relative h-2 rounded-full transition-all duration-300"
					style:width={i === currentIndex ? '24px' : '8px'}
					style:background={i === currentIndex ? 'linear-gradient(90deg, #e040fb, #18ffff)' : 'var(--surface-3)'}
					onclick={() => {
						currentIndex = chaos && lyingNavigation
							? (slides.length - 1 - i) % slides.length
							: i;
						onslidechange?.(currentIndex);
					}}
					aria-label="Go to slide {i + 1}"
				></button>
			{/each}
		</div>

		<button
			class="group/nav flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-(--muted-foreground) hover:text-(--foreground) hover:bg-(--surface-2) transition-all duration-200"
			onclick={handleNextClick}
			aria-label="Next slide"
		>
			Next
			<svg class="h-4 w-4 transition-transform duration-200 group-hover/nav:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
		</button>
	</div>

	{#if educational && chaos}
		<p class="border-t border-(--border) px-4 py-2.5 text-xs text-(--muted-foreground) italic font-mono">
			chaos: {[lyingNavigation && 'lying', reverseDirection && 'reversed', randomJumps && 'jumping', infiniteFakeSlides && 'spawning'].filter(Boolean).join(' + ')}
		</p>
	{/if}
</div>
