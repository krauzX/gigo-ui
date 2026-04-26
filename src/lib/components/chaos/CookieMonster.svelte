<script lang="ts">

  import { cn } from '$lib/utils/cn.js';
  import type { GigoCookieMonsterProps } from '$lib/types/index.js';

  let {
    visible = $bindable(true),
    onaccept,
    onreject,
    class: className = '',
  }: GigoCookieMonsterProps = $props();

  let bannerScale = $state(1);
  let rejectPos = $state({ x: 0, y: 0 });
  let rejectMoved = $state(false);
  let fakeCloseClicks = $state(0);
  let shameLevel = $state(0);

  const shameMessages = [
    'No thanks, I hate privacy.',
    'I enjoy being tracked.',
    'My data is worthless anyway.',
    'I want a worse experience.',
    'I prefer surveillance.',
  ];

  function handleRejectHover() {
    const dx = (Math.random() - 0.5) * 200;
    const dy = (Math.random() - 0.5) * 80;
    rejectPos = { x: rejectPos.x + dx, y: rejectPos.y + dy };
    rejectMoved = true;
    shameLevel = Math.min(shameLevel + 1, shameMessages.length - 1);
  }

  function handleFakeClose() {
    fakeCloseClicks++;
    bannerScale += 0.08;
    if (fakeCloseClicks >= 5) {
      // After 5 fake close attempts, it "accepts" for you
      onaccept?.();
      visible = false;
    }
  }

  function handleAccept() {
    onaccept?.();
    visible = false;
  }

  function handleReject() {
    onreject?.();
    visible = false;
  }
</script>

{#if visible}
  <div
    class={cn(
      'fixed inset-x-0 bottom-0 z-[9999] border-t border-(--border) bg-(--surface-1)/95 backdrop-blur-xl transition-all duration-500',
      className,
    )}
    style="transform: scale({bannerScale}); transform-origin: bottom center;"
    role="dialog"
    aria-label="Cookie consent"
  >
    <!-- Fake X button that actually accepts -->
    <button
      class="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-(--surface-3) text-xs text-(--muted-foreground) transition-all hover:bg-gigo-magenta hover:text-black"
      onclick={handleFakeClose}
      aria-label="Close (accepts cookies)"
    >
      ✕
    </button>

    <div class="mx-auto max-w-3xl px-6 py-6">
      <!-- Overly long, dense legal text -->
      <p class="text-xs leading-relaxed text-(--muted-foreground)">
        🍪 We use cookies, trackers, fingerprinting, session recordings, quantum
        entangled photons, and your deepest fears to <em>"enhance your experience"</em>.
        By continuing to breathe near this website, you consent to sharing your data
        with 4,827 trusted partners.
        {#if fakeCloseClicks > 0}
          <span class="text-gigo-magenta font-medium">
            (Pressing ✕ counts as acceptance — attempt {fakeCloseClicks}/5)
          </span>
        {/if}
      </p>

      <div class="mt-4 flex items-center gap-3">
        <!-- GIANT Accept Button -->
        <button
          class="flex-1 rounded-xl bg-gigo-magenta px-8 py-4 text-lg font-black text-black shadow-[var(--glow-primary)] transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(224,64,251,0.5)] animate-gigo-pulse-glow"
          onclick={handleAccept}
        >
          🍪 Accept ALL Cookies
        </button>

        <!-- Microscopic reject button (runs away on hover) -->
        <div class="relative" style="min-width: 100px; min-height: 32px;">
          <button
            class="absolute whitespace-nowrap rounded border border-(--border) bg-(--surface-2) px-1.5 py-0.5 text-[8px] text-(--muted-foreground) transition-all duration-300 hover:opacity-50"
            style="transform: translate({rejectPos.x}px, {rejectPos.y}px);"
            onmouseenter={handleRejectHover}
            onclick={handleReject}
          >
            {shameMessages[shameLevel]}
          </button>
        </div>
      </div>

      {#if rejectMoved}
        <p class="mt-2 text-[9px] text-gigo-orange/70 italic">
          Why are you running? Just accept the cookies. Everyone does.
        </p>
      {/if}

      <!-- Guilt-trip preferences link -->
      <div class="mt-3 text-center">
        <button
          class="text-[9px] text-(--muted-foreground)/40 underline decoration-dotted transition-opacity hover:opacity-50"
          onclick={() => alert('Preferences require a 47-step verification. Just accept.')}
        >
          Manage preferences (estimated time: 45 minutes)
        </button>
      </div>
    </div>
  </div>
{/if}
