<script lang="ts">
	import { page } from '$app/state';
	import { getComponentBySlug, componentDocs } from '$lib/docs/component-data.js';
	import {
		GhostCard,
		GravityInput,
		RotaryDial,
		SliderPhone,
		CatchSubmit,
		DropdownCalc,
		PasswordPeekhole,
		ChaosButton,
		ChaosForm,
		VolumeSlider,
		ProgressDoom,
		ColorPickerWrong,
		TermsSidescroll,
		GigoCompactor,
		ShatterPane,
		PixelDissolve,
		BlackHoleSink,
		CookieMonster,
		NotificationStorm,
		CaptchaFromHell,
		Button,
		Input,
		Modal,
		Card,
		Carousel,
		Form,
		Navigation
	} from '$lib/index.js';
	import type { CarouselSlide, FormField, NavItem } from '$lib/types/index.js';

	let slug = $derived(page.params.slug ?? '');
	let doc = $derived(getComponentBySlug(slug));

	// Demo state
	let gravityValue = $state('');
	let rotaryValue = $state('');
	let sliderValue = $state('');
	let passwordValue = $state('');
	let calcValue = $state('');
	let inputValue = $state('');
	let modalOpen = $state(false);
	let volumeValue = $state(50);
	let colorValue = $state('#e040fb');
	let termsAccepted = $state(false);

	// New component states
	let cookieVisible = $state(false);

	// Breaker Overlay demo states
	let compactorTriggered = $state(false);
	let shatterTriggered    = $state(false);
	let dissolveTriggered   = $state(false);
	let blackholeTriggered  = $state(false);

	// Breaker refs for imperative control
	let compactorRef: any = $state(null);
	let shatterRef: any   = $state(null);
	let dissolveRef: any  = $state(null);
	let blackholeRef: any = $state(null);

	const demoSlides: CarouselSlide[] = [
		{ id: '1', content: 'Slide 1 — Everything is fine.' },
		{ id: '2', content: 'Slide 2 — Probably fine.' },
		{ id: '3', content: 'Slide 3 — Definitely not fine.' }
	];

	const demoFields: FormField[] = [
		{ id: 'name', label: 'Name', type: 'text', placeholder: 'Your name', required: true },
		{
			id: 'email',
			label: 'Email',
			type: 'email',
			placeholder: 'you@example.com',
			required: true
		}
	];

	const demoNavItems: NavItem[] = [
		{ id: 'home', label: 'Home', href: '/', icon: '🏠' },
		{ id: 'about', label: 'About', href: '/about', icon: '📄' },
		{ id: 'docs', label: 'Docs', href: '/docs', icon: '📚' }
	];

	// Prev/Next navigation
	let currentIndex = $derived(componentDocs.findIndex((c) => c.slug === slug));
	let prevComponent = $derived(currentIndex > 0 ? componentDocs[currentIndex - 1] : null);
	let nextComponent = $derived(
		currentIndex < componentDocs.length - 1 ? componentDocs[currentIndex + 1] : null
	);
</script>

{#if doc}
	<div class="mx-auto max-w-3xl space-y-10">
		<!-- Header -->
		<div>
			<div class="text-xs font-medium uppercase tracking-wider text-(--muted-foreground)">
				{doc.category === 'badui'
					? 'BadUI Collection'
					: doc.category === 'chaos'
						? 'Classic Chaos'
						: 'Standard UI'}
			</div>
			<h1 class="mt-2 text-3xl font-black tracking-tight">
				<span class="mr-2">{doc.emoji}</span>{doc.name}
			</h1>
			<p class="mt-1 text-sm font-medium text-gigo-magenta">{doc.tagline}</p>
			<p class="mt-3 text-(--muted-foreground) leading-relaxed">{doc.description}</p>
		</div>

		<!-- Interactive Demo -->
		<section class="space-y-4">
			<h2 class="text-lg font-bold tracking-tight">Interactive Demo</h2>
			<div class="rounded-xl border border-(--border) bg-(--surface-1) p-6">
				{#if slug === 'ghost-card'}
					<div class="grid gap-4 sm:grid-cols-2">
						<GhostCard title="Ghost Card" description="I might vanish at any moment." />
						<GhostCard title="Another Ghost" description="You'll never catch me." />
					</div>
				{:else if slug === 'gravity-input'}
					<div class="max-w-md">
						<GravityInput
							bind:value={gravityValue}
							placeholder="Catch characters to type..."
						/>
						{#if gravityValue}
							<p class="mt-3 text-xs font-mono text-(--muted-foreground)">
								Captured: <span class="text-gigo-cyan">{gravityValue}</span>
							</p>
						{/if}
					</div>
				{:else if slug === 'rotary-dial'}
					<div class="flex justify-center">
						<RotaryDial bind:value={rotaryValue} />
					</div>
					{#if rotaryValue}
						<p class="mt-3 text-center text-xs font-mono text-(--muted-foreground)">
							Dialed: <span class="text-gigo-cyan">{rotaryValue}</span>
						</p>
					{/if}
				{:else if slug === 'slider-phone'}
					<div class="mx-auto max-w-md">
						<SliderPhone bind:value={sliderValue} />
					</div>
				{:else if slug === 'catch-submit'}
					<CatchSubmit
						label="Submit Form"
						onsubmit={() => alert('You caught it! 🎉')}
					/>
				{:else if slug === 'dropdown-calc'}
					<div class="mx-auto max-w-lg">
						<DropdownCalc bind:value={calcValue} />
					</div>
				{:else if slug === 'password-peekhole'}
					<div class="mx-auto max-w-sm">
						<PasswordPeekhole
							bind:value={passwordValue}
							placeholder="Enter your secret..."
						/>
					</div>
				{:else if slug === 'chaos-button'}
					<ChaosButton label="Try to Click Me" onclick={() => alert('Caught!')} />
				{:else if slug === 'chaos-form'}
					<div class="max-w-lg">
						<ChaosForm onsubmit={(data) => console.log('Submitted:', data)} />
					</div>
				{:else if slug === 'button'}
					<div class="space-y-4">
						<div class="flex flex-wrap gap-3">
							<Button variant="default">Default</Button>
							<Button variant="destructive">Destructive</Button>
							<Button variant="outline">Outline</Button>
							<Button variant="secondary">Secondary</Button>
							<Button variant="ghost">Ghost</Button>
						</div>
						<div class="flex flex-wrap gap-3">
							<Button variant="chaos-primary" chaos escapeOnHover>Escape</Button>
							<Button variant="chaos-nightmare" chaos multiClickRequired={5}
								>Multi-Click (5x)</Button
							>
						</div>
					</div>
				{:else if slug === 'input'}
					<div class="max-w-md space-y-4">
						<Input placeholder="Normal input..." bind:value={inputValue} />
						<Input
							placeholder="Chaos input — good luck..."
							chaos
							randomDelete
							fakeValidation
						/>
					</div>
				{:else if slug === 'modal'}
					<div>
						<Button onclick={() => (modalOpen = true)}>Open Modal</Button>
						<Modal
							bind:open={modalOpen}
							title="Chaos Modal"
							chaos
							resistClose
							escapeModal
							fakeCloseButtons
							spawnMoreModals
						>
							{#snippet children()}
								<p class="text-(--muted-foreground)">Try closing this. I dare you.</p>
							{/snippet}
							{#snippet footer()}
								<Button variant="outline" onclick={() => (modalOpen = false)}
									>Cancel</Button
								>
								<Button onclick={() => (modalOpen = false)}>Confirm</Button>
							{/snippet}
						</Modal>
					</div>
				{:else if slug === 'card'}
					<div class="grid gap-4 sm:grid-cols-2">
						<Card title="Normal Card" description="Hover for 3D tilt effect.">
							{#snippet children()}
								<p class="text-sm text-(--muted-foreground)">
									Beautiful glassmorphism card.
								</p>
							{/snippet}
						</Card>
						<Card title="Chaos Card" description="Good luck." chaos randomRotation>
							{#snippet children()}
								<p class="text-sm text-(--muted-foreground)">
									Rotates unpredictably.
								</p>
							{/snippet}
						</Card>
					</div>
				{:else if slug === 'carousel'}
					<Carousel
						slides={demoSlides}
						autoplay
						chaos
						lyingNavigation
						reverseDirection
					/>
				{:else if slug === 'form'}
					<div class="max-w-lg">
						<Form
							fields={demoFields}
							chaos
							randomReset
							fakeValidation
							alwaysFails
							shuffleFields
							onsubmit={(data) => console.log('Form:', data)}
						/>
					</div>
				{:else if slug === 'navigation'}
					<Navigation
						items={demoNavItems}
						chaos
						wrongDestinations
						randomReorder
						fakeLoading
					/>
				{:else if slug === 'volume-slider'}
					<div class="max-w-sm mx-auto">
						<VolumeSlider bind:value={volumeValue} />
						<p class="mt-3 text-xs font-mono text-(--muted-foreground) text-center">
							Actual value: <span class="text-gigo-cyan">{volumeValue}</span>
						</p>
					</div>
				{:else if slug === 'progress-doom'}
					<div class="max-w-md mx-auto">
						<ProgressDoom
							targetMs={8000}
							onComplete={() => alert('Somehow it finished!')}
						/>
					</div>
				{:else if slug === 'color-picker-wrong'}
					<div class="max-w-sm mx-auto">
						<ColorPickerWrong bind:value={colorValue} />
					</div>
				{:else if slug === 'terms-sidescroll'}
					<div class="max-w-lg mx-auto">
						<TermsSidescroll bind:accepted={termsAccepted} />
						<p class="mt-3 text-xs font-mono text-(--muted-foreground) text-center">
							Accepted: <span class="{termsAccepted ? 'text-gigo-lime' : 'text-gigo-magenta'}">{termsAccepted}</span>
						</p>
					</div>

				{:else if slug === 'gigo-compactor'}
					<div class="flex flex-col items-center gap-6">
						<GigoCompactor bind:this={compactorRef} bind:isGarbage={compactorTriggered} cols={22} rows={22} intensity={8}>
							<div class="rounded-xl border border-(--border) bg-(--surface-1) p-6 max-w-sm text-center">
								<div class="text-4xl mb-3">🏗️</div>
								<h3 class="font-bold text-lg mb-1">Structurally Sound</h3>
								<p class="text-sm text-(--muted-foreground)">This card is definitely safe. Nothing bad will happen.</p>
							</div>
						</GigoCompactor>
						<div class="flex items-center gap-4">
							{#if !compactorTriggered}
								<Button variant="destructive" onclick={() => compactorRef?.crush()}>💥 Demolish</Button>
							{:else}
								<button class="text-xs text-(--muted-foreground) underline" onclick={() => { compactorRef?.restore(); compactorTriggered = false; }}>Reset</button>
							{/if}
						</div>
					</div>

				{:else if slug === 'shatter-pane'}
					<div class="flex flex-col items-center gap-6">
						<ShatterPane bind:this={shatterRef} bind:isShattered={shatterTriggered} shardCount={64} intensity={8}>
							<div class="rounded-xl border border-(--border) bg-(--surface-1) p-6 max-w-sm text-center">
								<div class="text-4xl mb-3">🪟</div>
								<h3 class="font-bold text-lg mb-1">Tempered Glass</h3>
								<p class="text-sm text-(--muted-foreground)">Rated for 10,000 accidental taps.</p>
							</div>
						</ShatterPane>
						<div class="flex items-center gap-4">
							{#if !shatterTriggered}
								<Button variant="destructive" onclick={() => shatterRef?.shatter()}>🪟 Shatter</Button>
							{:else}
								<button class="text-xs text-(--muted-foreground) underline" onclick={() => { shatterRef?.restore(); shatterTriggered = false; }}>Reset</button>
							{/if}
						</div>
					</div>

				{:else if slug === 'pixel-dissolve'}
					<div class="flex flex-col items-center gap-6">
						<PixelDissolve bind:this={dissolveRef} bind:isDead={dissolveTriggered} resolution={2} waveSeed={12} intensity={7}>
							<div class="rounded-xl border border-(--border) bg-(--surface-1) p-6 max-w-sm text-center">
								<div class="text-4xl mb-3">✨</div>
								<h3 class="font-bold text-lg mb-1">Dusted</h3>
								<p class="text-sm text-(--muted-foreground)">Half the universe, disintegrated.</p>
							</div>
						</PixelDissolve>
						<div class="flex items-center gap-4">
							{#if !dissolveTriggered}
								<Button variant="destructive" onclick={() => dissolveRef?.dissolve()}>✨ Snap</Button>
							{:else}
								<button class="text-xs text-(--muted-foreground) underline" onclick={() => { dissolveRef?.restore(); dissolveTriggered = false; }}>Reset</button>
							{/if}
						</div>
					</div>

				{:else if slug === 'black-hole-sink'}
					<div class="flex flex-col items-center gap-6">
						<BlackHoleSink bind:this={blackholeRef} bind:isConsumed={blackholeTriggered} intensity={8} glowColor="rgba(255,140,0,0.8)">
							<div class="rounded-xl border border-(--border) bg-(--surface-1) p-6 max-w-sm text-center">
								<div class="text-4xl mb-3">🌑</div>
								<h3 class="font-bold text-lg mb-1">Event Horizon</h3>
								<p class="text-sm text-(--muted-foreground)">Not even light can escape this card.</p>
							</div>
						</BlackHoleSink>
						<div class="flex items-center gap-4">
							{#if !blackholeTriggered}
								<Button variant="destructive" onclick={() => blackholeRef?.consume()}>🌑 Consume</Button>
							{:else}
								<button class="text-xs text-(--muted-foreground) underline" onclick={() => { blackholeRef?.restore(); blackholeTriggered = false; }}>Reset</button>
							{/if}
						</div>
					</div>
				{:else if slug === 'cookie-monster'}
					<div class="flex flex-col items-center gap-4">
						<p class="text-sm text-(--muted-foreground)">Click below to unleash the cookie banner from hell.</p>
						<Button onclick={() => cookieVisible = true}>🍪 Show Cookie Banner</Button>
						<CookieMonster
							bind:visible={cookieVisible}
							onaccept={() => alert('You accepted (or were tricked). Either way, we win.')}
							onreject={() => alert('Impossible! You actually rejected?!')}
						/>
					</div>

				{:else if slug === 'notification-storm'}
					<div class="max-w-md mx-auto">
						<NotificationStorm autoStart maxVisible={6} />
					</div>

				{:else if slug === 'captcha-from-hell'}
					<div class="max-w-sm mx-auto">
						<CaptchaFromHell onverify={() => alert('Verified! ...somehow.')} />
					</div>
				{/if}
			</div>
		</section>

		<!-- Usage Code -->
		<section class="space-y-4">
			<h2 class="text-lg font-bold tracking-tight">Usage</h2>
			<div class="overflow-hidden rounded-xl border border-(--border) bg-(--surface-1)">
				<div
					class="flex items-center justify-between border-b border-(--border) bg-(--surface-2) px-4 py-2"
				>
					<span class="text-xs font-mono text-(--muted-foreground)">svelte</span>
				</div>
				<pre
					class="overflow-x-auto p-4 font-mono text-sm leading-relaxed text-(--foreground)">{doc.usage}</pre>
			</div>
		</section>

		<!-- Props Table -->
		{#if doc.props.length > 0}
			<section class="space-y-4">
				<h2 class="text-lg font-bold tracking-tight">Props</h2>
				<div class="overflow-x-auto rounded-xl border border-(--border)">
					<table class="w-full text-sm">
						<thead>
							<tr class="border-b border-(--border) bg-(--surface-2)">
								<th class="px-4 py-3 text-left font-semibold">Prop</th>
								<th class="px-4 py-3 text-left font-semibold">Type</th>
								<th class="px-4 py-3 text-left font-semibold">Default</th>
								<th class="px-4 py-3 text-left font-semibold">Description</th>
							</tr>
						</thead>
						<tbody>
							{#each doc.props as prop, i}
								<tr
									class="border-b border-(--border) last:border-0 {i % 2 === 0
										? 'bg-(--surface-1)'
										: ''}"
								>
									<td class="px-4 py-3 font-mono text-xs text-gigo-magenta"
										>{prop.name}</td
									>
									<td class="px-4 py-3 font-mono text-xs text-gigo-cyan"
										>{prop.type}</td
									>
									<td class="px-4 py-3 font-mono text-xs text-(--muted-foreground)"
										>{prop.default}</td
									>
									<td class="px-4 py-3 text-(--muted-foreground)"
										>{prop.description}</td
									>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</section>
		{/if}

		<!-- Prev / Next Navigation -->
		<nav class="flex items-center justify-between border-t border-(--border) pt-6">
			{#if prevComponent}
				<a
					href="/docs/{prevComponent.slug}"
					class="group flex items-center gap-2 text-sm text-(--muted-foreground) transition-colors hover:text-(--foreground)"
				>
					<span class="transition-transform group-hover:-translate-x-1">←</span>
					<span>{prevComponent.emoji} {prevComponent.name}</span>
				</a>
			{:else}
				<div></div>
			{/if}
			{#if nextComponent}
				<a
					href="/docs/{nextComponent.slug}"
					class="group flex items-center gap-2 text-sm text-(--muted-foreground) transition-colors hover:text-(--foreground)"
				>
					<span>{nextComponent.emoji} {nextComponent.name}</span>
					<span class="transition-transform group-hover:translate-x-1">→</span>
				</a>
			{:else}
				<div></div>
			{/if}
		</nav>
	</div>
{:else}
	<div class="mx-auto max-w-3xl py-20 text-center">
		<h1 class="text-2xl font-bold">Component not found</h1>
		<p class="mt-2 text-(--muted-foreground)">
			That component doesn't exist.
			<a href="/docs" class="text-gigo-magenta hover:underline">Back to docs</a>.
		</p>
	</div>
{/if}
