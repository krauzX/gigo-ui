<script lang="ts">
	import { cn, chaosClasses, randomGarbageText, chaosRandom, chaosPickOne } from '$lib/utils/cn.js';
	import type { GigoInputProps, InputType } from '$lib/types/index.js';

	let {
		type = 'text',
		value = $bindable(''),
		placeholder = '',
		disabled = false,
		required = false,
		name = '',
		chaos = false,
		chaosLevel = 5,
		educational = false,
		a11yWarning = false,
		randomDelete = false,
		escapeOnFocus = false,
		fakeValidation = false,
		randomizeType = false,
		oninput,
		onchange,
		class: className,
		...restProps
	}: GigoInputProps = $props();

	let offsetX = $state(0);
	let offsetY = $state(0);
	let fakeError = $state('');
	let currentType = $state<InputType>('text');
	let isFocused = $state(false);

	$effect(() => { currentType = type; });

	const FAKE_ERRORS = [
		'Invalid soul detected',
		'Too much ambition in this field',
		'Password must contain a haiku',
		'Email not sad enough',
		'Enter a valid existential crisis',
		'Field must be left blank to continue',
		'Input exceeds hope threshold'
	];

	const INPUT_TYPES: InputType[] = ['text', 'email', 'password', 'number', 'tel', 'url', 'search'];

	$effect(() => {
		if (!chaos || !randomDelete || !value) return;
		const interval = setInterval(() => {
			if (value.length > 0 && Math.random() > 0.5) {
				const pos = chaosRandom(value.length);
				value = value.slice(0, pos) + value.slice(pos + 1);
			}
		}, 2000);
		return () => clearInterval(interval);
	});

	$effect(() => {
		if (!chaos || !randomizeType) return;
		const interval = setInterval(() => {
			currentType = chaosPickOne(INPUT_TYPES);
		}, 3000);
		return () => clearInterval(interval);
	});

	function handleFocus() {
		isFocused = true;
		if (chaos && escapeOnFocus) {
			offsetX = (Math.random() - 0.5) * 300;
			offsetY = (Math.random() - 0.5) * 150;
		}
		if (chaos && fakeValidation) {
			fakeError = chaosPickOne(FAKE_ERRORS);
		}
	}

	function handleBlur() {
		isFocused = false;
		if (chaos && fakeValidation && Math.random() > 0.4) {
			fakeError = chaosPickOne(FAKE_ERRORS);
		}
	}

	let computedClass = $derived(
		cn(
			'peer flex h-10 w-full rounded-lg bg-(--secondary) px-4 py-2 text-sm text-(--foreground) transition-all duration-300 ease-out',
			'placeholder:text-(--muted-foreground)',
			'border border-transparent',
			'focus:outline-none focus:border-(--primary) focus:shadow-(--glow-primary)',
			'disabled:cursor-not-allowed disabled:opacity-40',
			fakeError && chaos ? 'border-gigo-red shadow-(--glow-destructive)' : '',
			chaos && chaosClasses(chaosLevel),
			className
		)
	);
</script>

<div
	class="relative group"
	style:transform="translate({offsetX}px, {offsetY}px)"
	style:transition="transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)"
>
	<input
		type={chaos && randomizeType ? currentType : type}
		class={computedClass}
		bind:value
		{placeholder}
		{disabled}
		{required}
		{name}
		onfocus={handleFocus}
		onblur={handleBlur}
		{oninput}
		{onchange}
		{...restProps}
	/>

	<!-- Animated focus underline -->
	<div
		class="absolute bottom-0 left-1/2 h-0.5 bg-linear-to-r from-gigo-magenta via-gigo-cyan to-gigo-lime transition-all duration-300 ease-out rounded-full"
		style:width={isFocused ? '100%' : '0%'}
		style:margin-left={isFocused ? '-50%' : '0'}
	></div>

	{#if fakeError && chaos}
		<p class="mt-1.5 text-xs text-gigo-red font-mono animate-gigo-entrance" role="alert">
			{fakeError}
		</p>
	{/if}

	{#if educational && chaos}
		<p class="mt-1.5 text-xs text-(--muted-foreground) italic font-mono">
			chaos: {[randomDelete && 'deleting', escapeOnFocus && 'escaping', fakeValidation && 'lying', randomizeType && 'morphing'].filter(Boolean).join(' + ')}
		</p>
	{/if}
</div>
