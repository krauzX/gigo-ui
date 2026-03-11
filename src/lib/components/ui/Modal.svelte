<script lang="ts">
	import { cn, chaosClasses, chaosRandom } from '$lib/utils/cn.js';
	import type { GigoModalProps } from '$lib/types/index.js';

	let {
		open = $bindable(false),
		title = 'Modal',
		chaos = false,
		chaosLevel = 5,
		educational = false,
		a11yWarning = false,
		resistClose = false,
		escapeModal = false,
		fakeCloseButtons = false,
		spawnMoreModals = false,
		onclose,
		children,
		footer,
		class: className,
		...restProps
	}: GigoModalProps = $props();

	let closeAttempts = $state(0);
	let modalOffsetX = $state(0);
	let modalOffsetY = $state(0);
	let spawnedModals = $state(0);
	let showSpawned = $state(false);

	function handleClose() {
		if (chaos && resistClose) {
			closeAttempts++;
			if (closeAttempts < 3) return;
			closeAttempts = 0;
		}

		if (chaos && spawnMoreModals && spawnedModals < 3) {
			spawnedModals++;
			showSpawned = true;
			return;
		}

		open = false;
		spawnedModals = 0;
		showSpawned = false;
		onclose?.();
	}

	function handleFakeClose() {
		if (chaos && escapeModal) {
			modalOffsetX = (Math.random() - 0.5) * 200;
			modalOffsetY = (Math.random() - 0.5) * 200;
		}
	}

	function handleBackdropClick() {
		handleClose();
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			if (chaos && escapeModal) {
				modalOffsetX = (Math.random() - 0.5) * 300;
				modalOffsetY = (Math.random() - 0.5) * 300;
				return;
			}
			handleClose();
		}
	}

	let overlayClass = $derived(
		cn(
			'fixed inset-0 z-50 flex items-center justify-center transition-all duration-300',
			!open && 'pointer-events-none opacity-0'
		)
	);

	let panelClass = $derived(
		cn(
			'relative w-full max-w-lg rounded-2xl border border-(--surface-border-hover) p-6 transition-all duration-300 ease-out',
			'bg-(--surface-1)/80 backdrop-blur-xl',
			'shadow-[0_0_40px_rgba(224,64,251,0.08),0_20px_60px_rgba(0,0,0,0.5)]',
			chaos && chaosClasses(chaosLevel),
			className
		)
	);
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class={overlayClass} onclick={handleBackdropClick}>
		<!-- Backdrop with blur -->
		<div class="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class={panelClass}
			style:transform="translate({modalOffsetX}px, {modalOffsetY}px) scale(1)"
			style:transition="transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)"
			style:animation="gigo-entrance 0.3s ease-out"
			role="dialog"
			aria-modal="true"
			aria-label={title}
			onclick={(e) => e.stopPropagation()}
			{...restProps}
		>
			<!-- Top glow line -->
			<div class="absolute top-0 left-[10%] right-[10%] h-px bg-linear-to-r from-transparent via-gigo-magenta/50 to-transparent"></div>

			<div class="flex items-center justify-between mb-4">
				<h2 class="text-lg font-semibold text-(--foreground)">{title}</h2>
				<button
					class="group/close rounded-lg p-1.5 text-(--muted-foreground) hover:text-(--foreground) hover:bg-(--surface-2) transition-all duration-200"
					onclick={handleClose}
					aria-label="Close"
				>
					<svg class="h-4 w-4 transition-transform duration-200 group-hover/close:rotate-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M18 6L6 18M6 6l12 12" />
					</svg>
				</button>
			</div>

			<div class="text-(--foreground)">
				{#if children}
					{@render children()}
				{/if}
			</div>

			{#if footer}
				<div class="mt-6 flex justify-end gap-3">
					{@render footer()}
				</div>
			{/if}

			{#if chaos && fakeCloseButtons}
				<div class="mt-4 flex gap-2">
					{#each Array(3) as _, i}
						<button
							class="rounded-lg bg-(--surface-2) px-3 py-1.5 text-sm text-(--foreground) hover:bg-(--surface-3) transition-colors duration-200"
							onclick={handleFakeClose}
						>
							{['Close', 'OK', 'Dismiss', 'Cancel', 'Done'][i % 5]}
						</button>
					{/each}
				</div>
			{/if}

			{#if educational && chaos && resistClose && closeAttempts > 0}
				<p class="mt-3 text-xs text-gigo-magenta font-mono animate-gigo-entrance">
					Close attempt {closeAttempts}/3 — this modal resists closure!
				</p>
			{/if}
		</div>
	</div>

	{#if showSpawned && chaos}
		{#each Array(spawnedModals) as _, i}
			<div
				class="fixed rounded-2xl border border-(--surface-border-hover) bg-(--surface-1)/90 backdrop-blur-xl p-5 shadow-[0_0_30px_rgba(224,64,251,0.1)]"
				style:z-index={60 + i}
				style:top="{20 + i * 30}%"
				style:left="{20 + i * 15}%"
				style:animation="gigo-entrance 0.3s ease-out {i * 0.1}s both"
			>
				<p class="text-sm font-semibold text-(--foreground)">Surprise Modal #{i + 1}</p>
				<p class="text-xs text-(--muted-foreground) mt-1">You wanted to close? Here's another!</p>
			</div>
		{/each}
	{/if}
{/if}
