<script lang="ts">
	import {
		CatchSubmit,
		RotaryDial,
		GravityInput,
		ProgressDoom,
		PasswordPeekhole,
		NotificationStorm,
		CaptchaFromHell,
		CookieMonster,
		GhostCard,
		ShatterPane,
		Button
	} from '$lib/index.js';
	import { categories, getComponentsByCategory } from '$lib/docs/component-data.js';

	const testimonials = [
		{ name: 'Sarah K.', role: 'UX Lead, Fortune 500', quote: "I showed this to my team. Three people resigned." },
		{ name: 'Dave M.', role: 'Frontend Dev', quote: "The Gravity Input made my PM cry. 10/10 would deploy again." },
		{ name: 'Anonymous', role: 'QA Engineer', quote: "I filed 47 bug reports before I read the README." },
		{ name: 'Rachel P.', role: 'Accessibility Consultant', quote: "This library is the reason I drink." },
		{ name: 'Jake T.', role: 'Intern', quote: "They told me to build a form with this. I'm updating my LinkedIn." },
		{ name: 'Lena W.', role: 'Product Manager', quote: "Our NPS score went from 72 to -4. Impressive, honestly." },
	];

	// Demo states
	let rotaryValue = $state('');
	let gravityValue = $state('');
	let passwordValue = $state('');
	let cookieVisible = $state(false);
	let shatterRef: any = $state(null);
	let shatterTriggered = $state(false);
</script>

<div>
	<!-- Hero — clean, breathing room -->
	<header class="relative overflow-hidden border-b border-(--border)">
		<div class="gigo-mesh-bg absolute inset-0 opacity-40"></div>

		<div class="relative mx-auto max-w-3xl px-6 py-28 text-center sm:py-36">
			<div class="mb-8 inline-flex items-center gap-2 rounded-full border border-(--surface-border-hover) bg-(--surface-1)/60 backdrop-blur-sm px-4 py-1.5 text-xs font-medium text-(--muted-foreground)">
				<span class="gigo-dot"></span>
				Svelte 5 &middot; Runes &middot; Tailwind CSS 4
			</div>

			<h1 class="gigo-gradient-text text-6xl font-black tracking-tighter sm:text-7xl lg:text-8xl leading-none">
				GIGO UI
			</h1>

			<p class="mx-auto mt-6 max-w-xl text-lg text-(--muted-foreground) leading-relaxed">
				A component library where every interaction is designed to frustrate. Built with Svelte 5 runes, TypeScript, and questionable intentions.
			</p>

			<div class="mt-10 flex items-center justify-center gap-4">
				<a href="/docs" class="inline-flex items-center gap-2 rounded-lg bg-gigo-magenta px-6 py-2.5 text-sm font-semibold text-black transition-all hover:shadow-[var(--glow-primary)] hover:scale-105">
					Get Started →
				</a>
				<a href="/docs" class="inline-flex items-center gap-2 rounded-lg border border-(--border) bg-(--surface-1) px-6 py-2.5 text-sm font-medium text-(--foreground) transition-all hover:border-(--surface-border-hover) hover:bg-(--surface-2)">
					Browse Components
				</a>
			</div>

			<div class="mt-8 inline-flex items-center gap-3 rounded-lg border border-(--border) bg-(--surface-0)/60 backdrop-blur-sm px-4 py-2">
				<span class="text-xs text-(--muted-foreground) font-mono">$</span>
				<code class="font-mono text-sm text-(--foreground)">pnpm add <span class="text-gigo-magenta">@gigo-ui/components</span></code>
			</div>
		</div>
	</header>

	<main class="mx-auto max-w-5xl px-6">
		<!-- Stats — compact strip -->
		<section class="grid grid-cols-4 gap-3 py-12">
			{#each [
				{ value: '27', label: 'Components', color: 'text-gigo-magenta' },
				{ value: '4', label: 'Breaker Overlays', color: 'text-gigo-cyan' },
				{ value: 'v5', label: 'Svelte', color: 'text-gigo-lime' },
				{ value: '0', label: 'Good UX', color: 'text-gigo-pink' },
			] as stat}
				<div class="rounded-lg border border-(--border) bg-(--surface-1) p-4 text-center">
					<div class="text-2xl font-black {stat.color}">{stat.value}</div>
					<div class="mt-0.5 text-[11px] font-medium text-(--muted-foreground)">{stat.label}</div>
				</div>
			{/each}
		</section>

		<div class="gigo-divider"></div>

		<!-- Categories -->
		<section class="py-14">
			<h2 class="text-center text-2xl font-bold tracking-tight">Three Flavors of Frustration</h2>
			<div class="mt-8 grid gap-5 sm:grid-cols-3">
				{#each categories as cat}
					{@const components = getComponentsByCategory(cat.id)}
					<a href="/docs" class="group rounded-xl border border-(--border) bg-(--surface-1) p-5 transition-all hover:border-(--surface-border-hover) hover:bg-(--surface-2)">
						<div class="text-base font-bold">{cat.label}</div>
						<p class="mt-1 text-sm text-(--muted-foreground) leading-snug">{cat.description}</p>
						<div class="mt-3 flex flex-wrap gap-1.5">
							{#each components.slice(0, 4) as comp}
								<span class="rounded-md bg-(--surface-3) px-2 py-0.5 text-xs text-(--muted-foreground)">{comp.emoji} {comp.name}</span>
							{/each}
							{#if components.length > 4}
								<span class="rounded-md bg-(--surface-3) px-2 py-0.5 text-xs text-(--muted-foreground)">+{components.length - 4} more</span>
							{/if}
						</div>
					</a>
				{/each}
			</div>
		</section>

		<div class="gigo-divider"></div>

		<!-- Breaker Overlays highlight -->
		<section class="py-14">
			<div class="text-center">
				<p class="text-xs font-semibold uppercase tracking-widest text-gigo-cyan">New</p>
				<h2 class="mt-2 text-2xl font-bold tracking-tight">Breaker Overlays</h2>
				<p class="mx-auto mt-2 max-w-lg text-sm text-(--muted-foreground)">
					Wrap any component. One function call and it's physically destroyed — voxel crush, glass shatter, pixel dissolve, or sucked into a black hole.
				</p>
			</div>
			<div class="mt-8 grid gap-4 sm:grid-cols-2">
				{#each [
					{ emoji: '🧊', name: 'GigoCompactor', desc: 'Voxel crush with Three.js + Rapier physics', href: '/docs/gigo-compactor' },
					{ emoji: '🪟', name: 'ShatterPane', desc: 'Voronoi glass fracture with 2D physics', href: '/docs/shatter-pane' },
					{ emoji: '🌫️', name: 'PixelDissolve', desc: 'Per-pixel disintegration in spreading waves', href: '/docs/pixel-dissolve' },
					{ emoji: '🕳️', name: 'BlackHoleSink', desc: 'Gravitational singularity with accretion glow', href: '/docs/black-hole-sink' },
				] as card}
					<a href={card.href} class="flex items-start gap-4 rounded-xl border border-(--border) bg-(--surface-1) p-5 transition-all hover:border-(--surface-border-hover) hover:bg-(--surface-2)">
						<span class="text-2xl">{card.emoji}</span>
						<div>
							<div class="text-sm font-bold">{card.name}</div>
							<p class="mt-0.5 text-xs text-(--muted-foreground)">{card.desc}</p>
						</div>
					</a>
				{/each}
			</div>
		</section>

		<div class="gigo-divider"></div>

		<!-- ═══════════════════════════════════════════════ -->
		<!-- INTERACTIVE DEMOS SHOWCASE                      -->
		<!-- ═══════════════════════════════════════════════ -->
		<section class="py-14">
			<div class="text-center">
				<p class="text-xs font-semibold uppercase tracking-widest text-gigo-magenta">Live Playground</p>
				<h2 class="mt-2 text-2xl font-bold tracking-tight">Try the Madness</h2>
				<p class="mx-auto mt-2 max-w-lg text-sm text-(--muted-foreground)">
					Every component below is fully interactive. Go ahead — try to accomplish something simple.
				</p>
			</div>

			<div class="mt-10 grid gap-6 sm:grid-cols-2">
				<!-- Demo 1: CatchSubmit -->
				<div class="rounded-xl border border-(--border) bg-(--surface-1) overflow-hidden">
					<div class="border-b border-(--border) bg-(--surface-2) px-4 py-2.5 flex items-center gap-2">
						<span class="text-xs">🏃</span>
						<span class="text-xs font-semibold">CatchSubmit</span>
						<span class="ml-auto text-[10px] text-(--muted-foreground)">Try to click it</span>
					</div>
					<div class="p-6 flex items-center justify-center" style="min-height: 120px;">
						<CatchSubmit label="Submit Form" onsubmit={() => alert('You caught it! 🎉')} />
					</div>
				</div>

				<!-- Demo 2: RotaryDial -->
				<div class="rounded-xl border border-(--border) bg-(--surface-1) overflow-hidden">
					<div class="border-b border-(--border) bg-(--surface-2) px-4 py-2.5 flex items-center gap-2">
						<span class="text-xs">📞</span>
						<span class="text-xs font-semibold">RotaryDial</span>
						<span class="ml-auto text-[10px] text-(--muted-foreground)">Drag to dial</span>
					</div>
					<div class="p-6 flex flex-col items-center gap-3">
						<RotaryDial bind:value={rotaryValue} />
						{#if rotaryValue}
							<p class="text-xs font-mono text-(--muted-foreground)">
								Dialed: <span class="text-gigo-cyan">{rotaryValue}</span>
							</p>
						{/if}
					</div>
				</div>

				<!-- Demo 3: GravityInput -->
				<div class="rounded-xl border border-(--border) bg-(--surface-1) overflow-hidden">
					<div class="border-b border-(--border) bg-(--surface-2) px-4 py-2.5 flex items-center gap-2">
						<span class="text-xs">🌍</span>
						<span class="text-xs font-semibold">GravityInput</span>
						<span class="ml-auto text-[10px] text-(--muted-foreground)">Characters have weight</span>
					</div>
					<div class="p-6">
						<GravityInput bind:value={gravityValue} placeholder="Type something..." />
						{#if gravityValue}
							<p class="mt-3 text-xs font-mono text-(--muted-foreground)">
								Captured: <span class="text-gigo-cyan">{gravityValue}</span>
							</p>
						{/if}
					</div>
				</div>

				<!-- Demo 4: PasswordPeekhole -->
				<div class="rounded-xl border border-(--border) bg-(--surface-1) overflow-hidden">
					<div class="border-b border-(--border) bg-(--surface-2) px-4 py-2.5 flex items-center gap-2">
						<span class="text-xs">🔑</span>
						<span class="text-xs font-semibold">PasswordPeekhole</span>
						<span class="ml-auto text-[10px] text-(--muted-foreground)">Drag the peephole</span>
					</div>
					<div class="p-6">
						<PasswordPeekhole bind:value={passwordValue} placeholder="Enter your secret..." />
					</div>
				</div>

				<!-- Demo 5: ProgressDoom (full width) -->
				<div class="sm:col-span-2 rounded-xl border border-(--border) bg-(--surface-1) overflow-hidden">
					<div class="border-b border-(--border) bg-(--surface-2) px-4 py-2.5 flex items-center gap-2">
						<span class="text-xs">📊</span>
						<span class="text-xs font-semibold">ProgressDoom</span>
						<span class="ml-auto text-[10px] text-(--muted-foreground)">Watch it never finish</span>
					</div>
					<div class="p-6 max-w-lg mx-auto">
						<ProgressDoom targetMs={10000} onComplete={() => alert('Somehow it finished!')} />
					</div>
				</div>

				<!-- Demo 6: GhostCard -->
				<div class="rounded-xl border border-(--border) bg-(--surface-1) overflow-hidden">
					<div class="border-b border-(--border) bg-(--surface-2) px-4 py-2.5 flex items-center gap-2">
						<span class="text-xs">👻</span>
						<span class="text-xs font-semibold">GhostCard</span>
						<span class="ml-auto text-[10px] text-(--muted-foreground)">Now you see it...</span>
					</div>
					<div class="p-6">
						<GhostCard title="Important Data" description="This content may vanish at any moment. Try reading it quickly." />
					</div>
				</div>

				<!-- Demo 7: ShatterPane -->
				<div class="rounded-xl border border-(--border) bg-(--surface-1) overflow-hidden">
					<div class="border-b border-(--border) bg-(--surface-2) px-4 py-2.5 flex items-center gap-2">
						<span class="text-xs">🪟</span>
						<span class="text-xs font-semibold">ShatterPane</span>
						<span class="ml-auto text-[10px] text-(--muted-foreground)">Break it</span>
					</div>
					<div class="p-6 flex flex-col items-center gap-4">
						<ShatterPane bind:this={shatterRef} bind:isShattered={shatterTriggered} shardCount={48} intensity={7}>
							<div class="rounded-lg border border-(--border) bg-(--surface-2) p-4 text-center">
								<div class="text-2xl mb-1">🏗️</div>
								<p class="text-xs font-semibold">Structurally Sound™</p>
								<p class="text-[10px] text-(--muted-foreground)">Definitely safe.</p>
							</div>
						</ShatterPane>
						{#if !shatterTriggered}
							<Button variant="destructive" onclick={() => shatterRef?.shatter()}>🪟 Shatter</Button>
						{:else}
							<button class="text-xs text-(--muted-foreground) underline" onclick={() => { shatterRef?.restore(); shatterTriggered = false; }}>Reset</button>
						{/if}
					</div>
				</div>
			</div>
		</section>

		<div class="gigo-divider"></div>

		<!-- ═══════════════════════════════════════════════ -->
		<!-- NEW: Trending BadUI Showcase                    -->
		<!-- ═══════════════════════════════════════════════ -->
		<section class="py-14">
			<div class="text-center">
				<p class="text-xs font-semibold uppercase tracking-widest text-gigo-orange">Trending</p>
				<h2 class="mt-2 text-2xl font-bold tracking-tight">Dark Pattern Hall of Fame</h2>
				<p class="mx-auto mt-2 max-w-lg text-sm text-(--muted-foreground)">
					Inspired by the internet's worst UX offenders. These components are love letters to dark patterns.
				</p>
			</div>

			<div class="mt-10 space-y-6">
				<!-- Cookie Monster -->
				<div class="rounded-xl border border-(--border) bg-(--surface-1) overflow-hidden">
					<div class="border-b border-(--border) bg-(--surface-2) px-4 py-2.5 flex items-center gap-2">
						<span class="text-xs">🍪</span>
						<span class="text-xs font-semibold">CookieMonster</span>
						<span class="ml-auto rounded-md bg-gigo-orange/10 px-2 py-0.5 text-[10px] font-medium text-gigo-orange">New</span>
					</div>
					<div class="p-6 flex flex-col items-center gap-3">
						<p class="text-sm text-(--muted-foreground) text-center max-w-md">
							The cookie consent banner from hell. Giant "Accept All", microscopic fleeing "Reject", and a fake ✕ that secretly accepts.
						</p>
						<Button onclick={() => cookieVisible = true}>🍪 Unleash the Cookie Banner</Button>
						<CookieMonster
							bind:visible={cookieVisible}
							onaccept={() => alert('Cookies accepted! (Or were they? 😈)')}
							onreject={() => alert('You actually rejected? Impossible!')}
						/>
					</div>
				</div>

				<!-- Notification Storm + Captcha side by side -->
				<div class="grid gap-6 sm:grid-cols-2">
					<div class="rounded-xl border border-(--border) bg-(--surface-1) overflow-hidden">
						<div class="border-b border-(--border) bg-(--surface-2) px-4 py-2.5 flex items-center gap-2">
							<span class="text-xs">🔔</span>
							<span class="text-xs font-semibold">NotificationStorm</span>
							<span class="ml-auto rounded-md bg-gigo-orange/10 px-2 py-0.5 text-[10px] font-medium text-gigo-orange">New</span>
						</div>
						<div class="p-4">
							<NotificationStorm autoStart maxVisible={5} />
						</div>
					</div>

					<div class="rounded-xl border border-(--border) bg-(--surface-1) overflow-hidden">
						<div class="border-b border-(--border) bg-(--surface-2) px-4 py-2.5 flex items-center gap-2">
							<span class="text-xs">🤖</span>
							<span class="text-xs font-semibold">CaptchaFromHell</span>
							<span class="ml-auto rounded-md bg-gigo-orange/10 px-2 py-0.5 text-[10px] font-medium text-gigo-orange">New</span>
						</div>
						<div class="p-4">
							<CaptchaFromHell onverify={() => alert('Verified! ...how?!')} />
						</div>
					</div>
				</div>
			</div>
		</section>

		<div class="gigo-divider"></div>

		<!-- Code Example Showcase -->
		<section class="py-14">
			<div class="text-center">
				<h2 class="text-2xl font-bold tracking-tight">Ship of Horrors in 3 Lines</h2>
				<p class="mt-2 text-sm text-(--muted-foreground)">Every component follows the same clean Svelte 5 patterns.</p>
			</div>
			<div class="mx-auto mt-8 max-w-2xl overflow-hidden rounded-xl border border-(--border) bg-(--surface-1)">
				<div class="flex items-center gap-2 border-b border-(--border) bg-(--surface-2) px-4 py-2">
					<span class="h-2.5 w-2.5 rounded-full bg-gigo-red/60"></span>
					<span class="h-2.5 w-2.5 rounded-full bg-gigo-yellow/60"></span>
					<span class="h-2.5 w-2.5 rounded-full bg-gigo-lime/60"></span>
					<span class="ml-2 text-xs font-mono text-(--muted-foreground)">App.svelte</span>
				</div>
				<pre class="overflow-x-auto p-5 font-mono text-sm leading-relaxed"><span class="text-gigo-magenta">&lt;script lang="ts"&gt;</span>
  <span class="text-(--muted-foreground)">import</span> {'{'} <span class="text-gigo-cyan">ShatterPane</span>, <span class="text-gigo-cyan">CatchSubmit</span>, <span class="text-gigo-cyan">CookieMonster</span> {'}'} <span class="text-(--muted-foreground)">from</span> <span class="text-gigo-lime">'@gigo-ui/components'</span>;

  <span class="text-(--muted-foreground)">let</span> broken = <span class="text-gigo-magenta">$state</span>(<span class="text-gigo-cyan">false</span>);
<span class="text-gigo-magenta">&lt;/script&gt;</span>

<span class="text-gigo-cyan">&lt;ShatterPane</span> <span class="text-gigo-lime">bind:isShattered</span>={'{'}broken{'}'}<span class="text-gigo-cyan">&gt;</span>
  <span class="text-(--muted-foreground)">&lt;div class="card"&gt;</span>
    <span class="text-(--foreground)">&lt;h2&gt;Fragile Content&lt;/h2&gt;</span>
    <span class="text-gigo-cyan">&lt;CatchSubmit</span> <span class="text-gigo-lime">label</span>="Submit" <span class="text-gigo-cyan">/&gt;</span>
  <span class="text-(--muted-foreground)">&lt;/div&gt;</span>
<span class="text-gigo-cyan">&lt;/ShatterPane&gt;</span>

<span class="text-gigo-cyan">&lt;CookieMonster</span> <span class="text-gigo-lime">onaccept</span>={'{'}() => console.log('gotcha'){'}'} <span class="text-gigo-cyan">/&gt;</span></pre>
			</div>
		</section>

		<div class="gigo-divider"></div>

		<!-- Testimonials -->
		<section class="py-14">
			<h2 class="text-center text-2xl font-bold tracking-tight">What People Are Saying</h2>
			<p class="mx-auto mt-2 max-w-md text-center text-sm text-(--muted-foreground)">Real feedback from real victims.</p>

			<div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{#each testimonials as t}
					<div class="rounded-xl border border-(--border) bg-(--surface-1) p-5">
						<p class="text-sm text-(--foreground) italic leading-relaxed">"{t.quote}"</p>
						<div class="mt-3 flex items-center gap-2">
							<div class="h-6 w-6 rounded-full bg-(--surface-3)"></div>
							<div>
								<div class="text-xs font-semibold text-(--foreground)">{t.name}</div>
								<div class="text-[11px] text-(--muted-foreground)">{t.role}</div>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</section>
	</main>

	<footer class="border-t border-(--border)">
		<div class="mx-auto max-w-5xl px-6 py-8 text-center">
			<p class="text-sm text-(--muted-foreground)">
				<span class="font-semibold text-(--foreground)">GIGO UI</span> — Svelte 5 · SvelteKit 2 · Tailwind CSS 4
			</p>
			<p class="mt-1 text-xs text-(--muted-foreground)">
				Every interaction is designed to make you question your life choices.
			</p>
			<p class="mt-2 text-[10px] text-(--muted-foreground)/50">
				<a href="/llms.txt" class="hover:text-gigo-magenta transition-colors">llms.txt</a> · <a href="/llms-full.txt" class="hover:text-gigo-magenta transition-colors">llms-full.txt</a> · MIT License
			</p>
		</div>
	</footer>
</div>
