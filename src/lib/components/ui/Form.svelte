<script lang="ts">
	import { cn, chaosClasses, chaosRandom, chaosPickOne, randomGarbageText } from '$lib/utils/cn.js';
	import type { GigoFormProps, FormField } from '$lib/types/index.js';

	let {
		fields = [],
		submitLabel = 'Submit',
		chaos = false,
		chaosLevel = 5,
		educational = false,
		a11yWarning = false,
		randomReset = false,
		fakeValidation = false,
		alwaysFails = false,
		shuffleFields = false,
		onsubmit,
		class: className,
		...restProps
	}: GigoFormProps = $props();

	let formData = $state<Record<string, string>>({});
	let displayFields = $state<FormField[]>([]);
	let errors = $state<Record<string, string>>({});
	let submitMessage = $state('');
	let isSubmitting = $state(false);

	// Initialize form data
	$effect(() => {
		const initial: Record<string, string> = {};
		for (const field of fields) {
			initial[field.id] = formData[field.id] ?? '';
		}
		formData = initial;
		displayFields = [...fields];
	});

	// Random reset
	$effect(() => {
		if (!chaos || !randomReset) return;
		const timer = setInterval(() => {
			const keys = Object.keys(formData);
			if (keys.length > 0) {
				const key = chaosPickOne(keys);
				formData[key] = '';
			}
		}, 4000);
		return () => clearInterval(timer);
	});

	// Shuffle fields
	$effect(() => {
		if (!chaos || !shuffleFields) return;
		const timer = setInterval(() => {
			displayFields = [...displayFields].sort(() => Math.random() - 0.5);
		}, 5000);
		return () => clearInterval(timer);
	});

	const FAKE_ERRORS = [
		'Field is too honest',
		'Expected a lie here',
		'Must contain at least one regret',
		'This field has given up',
		'Exceeds maximum hope',
		'Not enough chaos',
		'Please try harder'
	];

	function validate(): boolean {
		errors = {};

		if (chaos && fakeValidation) {
			for (const field of fields) {
				if (Math.random() > 0.5) {
					errors[field.id] = chaosPickOne(FAKE_ERRORS);
				}
			}
			return Object.keys(errors).length === 0;
		}

		// Real validation for non-chaos mode
		for (const field of fields) {
			if (field.required && !formData[field.id]?.trim()) {
				errors[field.id] = `${field.label} is required`;
			}
		}
		return Object.keys(errors).length === 0;
	}

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		isSubmitting = true;
		submitMessage = '';

		if (chaos && alwaysFails) {
			await new Promise((r) => setTimeout(r, 800));
			submitMessage = '💀 Submission failed (as designed)';
			isSubmitting = false;
			return;
		}

		if (!validate()) {
			isSubmitting = false;
			return;
		}

		await new Promise((r) => setTimeout(r, 500));
		onsubmit?.({ ...formData });
		submitMessage = chaos ? randomGarbageText() : 'Submitted successfully!';
		isSubmitting = false;
	}

	let formClass = $derived(
		cn(
			'space-y-5 rounded-xl border border-(--border) bg-(--surface-1) p-6',
			chaos && chaosClasses(chaosLevel),
			className
		)
	);
</script>

<form class={formClass} onsubmit={handleSubmit} {...restProps}>
	{#each displayFields as field, idx (field.id)}
		<div
			class="space-y-2 animate-gigo-entrance"
			style:animation-delay="{idx * 0.05}s"
		>
			<label for={field.id} class="text-sm font-medium text-(--foreground)">
				{field.label}
				{#if field.required}
					<span class="text-gigo-magenta">*</span>
				{/if}
			</label>
			<div class="relative group">
				<input
					id={field.id}
					type={field.type}
					placeholder={field.placeholder ?? ''}
					value={formData[field.id] ?? ''}
					oninput={(e) => {
						formData[field.id] = (e.target as HTMLInputElement).value;
					}}
					class={cn(
						'flex h-10 w-full rounded-lg border border-transparent bg-(--secondary) px-4 py-2 text-sm text-(--foreground) transition-all duration-300 ease-out placeholder:text-(--muted-foreground) focus:outline-none focus:border-(--primary) focus:shadow-(--glow-primary)',
						errors[field.id] ? 'border-gigo-red shadow-(--glow-destructive)' : ''
					)}
				/>
				<div class="absolute bottom-0 left-1/2 h-0.5 w-0 bg-linear-to-r from-gigo-magenta via-gigo-cyan to-gigo-lime transition-all duration-300 ease-out rounded-full group-focus-within:w-full group-focus-within:-ml-[50%]"></div>
			</div>
			{#if errors[field.id]}
				<p class="text-xs text-gigo-red font-mono animate-gigo-entrance">{errors[field.id]}</p>
			{/if}
		</div>
	{/each}

	<button
		type="submit"
		disabled={isSubmitting}
		class="group/submit relative inline-flex h-10 w-full items-center justify-center overflow-hidden rounded-lg bg-(--primary) px-4 text-sm font-medium text-(--primary-foreground) transition-all duration-200 hover:scale-[1.01] hover:shadow-(--glow-primary) active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none"
	>
		{#if isSubmitting}
			<svg class="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
			Submitting...
		{:else}
			{submitLabel}
		{/if}
	</button>

	{#if submitMessage}
		<p class="text-center text-sm animate-gigo-entrance {chaos && alwaysFails ? 'text-gigo-red font-mono' : 'text-gigo-lime'}">{submitMessage}</p>
	{/if}

	{#if educational && chaos}
		<p class="text-xs text-(--muted-foreground) italic font-mono">
			chaos: {[randomReset && 'resetting', fakeValidation && 'lying', alwaysFails && 'failing', shuffleFields && 'shuffling'].filter(Boolean).join(' + ')}
		</p>
	{/if}
</form>
