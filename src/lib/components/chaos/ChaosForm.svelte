<script lang="ts">
	import { cn, chaosClasses, chaosRandom, chaosPickOne, randomGarbageText } from '$lib/utils/cn.js';
	import type { GigoChaosFormProps } from '$lib/types/index.js';

	let {
		chaos = true,
		chaosLevel = 8,
		educational = false,
		a11yWarning = false,
		autoSubmit = false,
		autoSubmitInterval = 12000,
		corruptionInterval = 3000,
		shuffleInterval = 4000,
		onsubmit,
		class: className,
		...restProps
	}: GigoChaosFormProps & {
		autoSubmit?: boolean;
		autoSubmitInterval?: number;
		corruptionInterval?: number;
		shuffleInterval?: number;
	} = $props();

	interface ChaosField {
		id: string;
		label: string;
		value: string;
		type: string;
	}

	let fields = $state<ChaosField[]>([
		{ id: 'name', label: 'Name', value: '', type: 'text' },
		{ id: 'email', label: 'Email', value: '', type: 'email' },
		{ id: 'message', label: 'Message', value: '', type: 'text' }
	]);

	let submitButtons = $state(1);
	let nestedForms = $state(0);
	let validationMessages = $state<string[]>([]);
	let isSubmitting = $state(false);
	let corruptionLog = $state<string[]>([]);

	const LYING_VALIDATIONS = [
		'✓ Looks great! (it doesn\'t)',
		'✓ Perfect format! (we didn\'t check)',
		'✓ Field validated! (lie)',
		'✓ Excellent input! (it\'s garbage)',
		'✓ Approved! (by nobody)'
	];

	$effect(() => {
		const timer = setInterval(() => {
			if (fields.length === 0) return;
			const idx = chaosRandom(fields.length);
			const field = fields[idx];
			if (field.value.length > 0) {
				const corruption = randomGarbageText();
				const pos = chaosRandom(field.value.length + 1);
				fields[idx] = {
					...field,
					value: field.value.slice(0, pos) + corruption + field.value.slice(pos)
				};
				corruptionLog = [...corruptionLog.slice(-4), `Corrupted "${field.label}" with "${corruption}"`];
			}
		}, corruptionInterval);
		return () => clearInterval(timer);
	});

	$effect(() => {
		const timer = setInterval(() => {
			fields = [...fields].sort(() => Math.random() - 0.5);
		}, shuffleInterval);
		return () => clearInterval(timer);
	});

	// Multiply submit buttons
	$effect(() => {
		const timer = setInterval(() => {
			if (submitButtons < 8) submitButtons++;
		}, 6000);
		return () => clearInterval(timer);
	});

	// Lying validation on every input change
	function handleInput(fieldId: string, value: string) {
		const idx = fields.findIndex((f) => f.id === fieldId);
		if (idx >= 0) {
			fields[idx] = { ...fields[idx], value };
		}
		validationMessages = fields.map(() => chaosPickOne(LYING_VALIDATIONS));
	}

	$effect(() => {
		if (!autoSubmit) return;
		const timer = setInterval(() => {
			if (Math.random() > 0.7) {
				handleSubmit();
			}
		}, autoSubmitInterval);
		return () => clearInterval(timer);
	});

	async function handleSubmit() {
		isSubmitting = true;
		await new Promise((r) => setTimeout(r, 1000));

		// Spawn nested form
		if (nestedForms < 3) nestedForms++;

		const data: Record<string, string> = {};
		for (const f of fields) {
			data[f.id] = f.value;
		}
		onsubmit?.(data);
		isSubmitting = false;
	}

	let formClass = $derived(
		cn(
			'relative space-y-5 rounded-2xl border border-(--surface-border-hover) bg-(--surface-1) p-6 overflow-hidden',
			chaosClasses(chaosLevel),
			className
		)
	);
</script>

<form
	class={formClass}
	onsubmit={(e) => {
		e.preventDefault();
		handleSubmit();
	}}
	{...restProps}
>
	<!-- Scanline CRT effect -->
	<div class="gigo-scanlines pointer-events-none absolute inset-0 z-30 opacity-20"></div>

	<h3 class="relative z-10 text-lg font-bold text-(--foreground)">
		<span class="bg-linear-to-r from-gigo-magenta via-gigo-red to-gigo-pink bg-clip-text text-transparent">Chaos Form</span>
	</h3>

	{#each fields as field, i (field.id)}
		<div class="relative z-10 space-y-2 animate-gigo-entrance" style:animation-delay="{i * 0.05}s">
			<label for={field.id} class="text-sm font-medium text-(--foreground)">
				{field.label}
			</label>
			<input
				id={field.id}
				type={field.type}
				value={field.value}
				oninput={(e) => handleInput(field.id, (e.target as HTMLInputElement).value)}
				class="flex h-10 w-full rounded-lg border border-transparent bg-(--secondary) px-4 py-2 text-sm text-(--foreground) transition-all duration-300 placeholder:text-(--muted-foreground) focus:outline-none focus:border-gigo-magenta focus:shadow-[0_0_15px_rgba(224,64,251,0.15)]"
			/>
			{#if validationMessages[i]}
				<p class="text-xs text-gigo-lime font-mono animate-gigo-entrance">{validationMessages[i]}</p>
			{/if}
		</div>
	{/each}

	<!-- Multiple submit buttons that multiply over time -->
	<div class="relative z-10 flex flex-wrap gap-2">
		{#each Array(submitButtons) as _, i}
			<button
				type="submit"
				disabled={isSubmitting}
				class={cn(
					'rounded-xl px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:scale-[1.03] active:scale-[0.97] disabled:opacity-40 animate-gigo-entrance',
					i === 0
						? 'bg-linear-to-r from-gigo-magenta to-gigo-pink hover:shadow-[0_0_20px_rgba(224,64,251,0.4)]'
						: 'bg-(--surface-2) text-(--muted-foreground) border border-(--border)'
				)}
				style:animation-delay="{i * 0.08}s"
			>
				{i === 0 ? 'Submit' : randomGarbageText()}
			</button>
		{/each}
	</div>

	<!-- Corruption log -->
	{#if educational && corruptionLog.length > 0}
		<div class="relative z-10 rounded-xl bg-gigo-red/5 border border-gigo-red/20 p-4 text-xs font-mono">
			<p class="font-bold text-gigo-red mb-2">Corruption Log:</p>
			{#each corruptionLog as log}
				<p class="text-gigo-red/80 animate-gigo-entrance">{log}</p>
			{/each}
		</div>
	{/if}

	<!-- Nested spawned forms -->
	{#each Array(nestedForms) as _, i}
		<div class="relative z-10 ml-4 rounded-xl border border-dashed border-gigo-magenta/30 bg-gigo-magenta/5 p-4 animate-gigo-entrance" style:animation-delay="{i * 0.1}s">
			<p class="text-xs font-bold text-gigo-magenta">Spawned Form #{i + 1}</p>
			<input
				type="text"
				placeholder="More data to corrupt..."
				class="mt-2 flex h-9 w-full rounded-lg bg-(--secondary) border border-transparent px-3 text-xs text-(--foreground) focus:outline-none focus:border-gigo-magenta"
			/>
		</div>
	{/each}

	{#if educational}
		<p class="relative z-10 text-xs text-(--muted-foreground) italic font-mono">
			corrupts + shuffles + multiplies + lies + auto-submits + spawns
		</p>
	{/if}
</form>
