<script lang="ts">
  /**
   * CaptchaFromHell — Impossible verification that was never meant to pass.
   *
   * Trending dark pattern: CAPTCHA with absurd prompts like "select all
   * images containing existential dread", impossible math, and a timer
   * that's too fast. Successfully solving it generates a new, harder puzzle.
   *
   * @module CaptchaFromHell
   * @category badui
   * @since 1.1.0
   */
  import { cn } from '$lib/utils/cn.js';
  import type { GigoCaptchaFromHellProps } from '$lib/types/index.js';

  let {
    onverify,
    class: className = '',
  }: GigoCaptchaFromHellProps = $props();

  type ChallengeType = 'grid' | 'math' | 'slider';

  let attempts = $state(0);
  let verified = $state(false);
  let currentChallenge = $state<ChallengeType>('grid');
  let selectedCells = $state<Set<number>>(new Set());
  let mathAnswer = $state('');
  let sliderValue = $state(50);
  let timerMs = $state(5000);
  let timerActive = $state(false);
  let timeLeft = $state(100);

  const gridPrompts = [
    'Select all squares containing existential dread',
    'Select all images with imposter syndrome',
    'Click every pixel that sparks joy',
    'Identify all squares where gravity is optional',
    'Select every image that smells purple',
    'Click all tiles that are thinking about you',
    'Select squares containing the will to live',
    'Identify images that have been to space',
  ];

  const gridEmojis = ['🌫️', '🫥', '😶', '⬜', '🔲', '💭', '🫠', '❓', '🌀'];

  const mathProblems = [
    { q: '∫₀^∞ e^(-x²) dx = ?', a: 'impossible' },
    { q: 'What is 0 ÷ 0?', a: 'impossible' },
    { q: 'If i² = -1, what is i^i?', a: 'impossible' },
    { q: 'Solve: x = x + 1', a: 'impossible' },
    { q: '√(-1) × ∞ = ?', a: 'impossible' },
    { q: 'P = NP? (yes/no)', a: 'impossible' },
  ];

  let promptIndex = $state(0);
  let mathIndex = $state(0);

  let currentPrompt = $derived(gridPrompts[promptIndex % gridPrompts.length]);
  let currentMath = $derived(mathProblems[mathIndex % mathProblems.length]);

  function toggleCell(i: number) {
    const next = new Set(selectedCells);
    if (next.has(i)) {
      next.delete(i);
    } else {
      next.add(i);
    }
    selectedCells = next;
  }

  function submitGrid() {
    attempts++;
    // Always fail — the answer is inherently unknowable
    selectedCells = new Set();
    promptIndex++;

    if (attempts >= 3) {
      currentChallenge = 'math';
    }
  }

  function submitMath() {
    attempts++;
    mathAnswer = '';
    mathIndex++;

    if (attempts >= 6) {
      currentChallenge = 'slider';
      startSliderTimer();
    }
  }

  function startSliderTimer() {
    timerActive = true;
    timeLeft = 100;
    const interval = setInterval(() => {
      timeLeft -= 2;
      if (timeLeft <= 0) {
        clearInterval(interval);
        timerActive = false;
        attempts++;
        // Reset slider target
        timeLeft = 100;
        setTimeout(() => startSliderTimer(), 500);
      }
    }, 50);
  }

  // The slider target moves — impossible to match
  let sliderTarget = $derived(Math.round(50 + Math.sin(attempts * 1.7) * 40));

  function submitSlider() {
    attempts++;
    // Within 2 of target? Still fail, but give hope
    if (Math.abs(sliderValue - sliderTarget) < 2) {
      // Fake success, then immediately revoke
      verified = true;
      setTimeout(() => {
        verified = false;
        attempts = 0;
        currentChallenge = 'grid';
      }, 1500);
    }
  }

  function actuallyVerify() {
    verified = true;
    onverify?.();
  }
</script>

<div class={cn('rounded-xl border border-(--border) bg-(--surface-1) overflow-hidden', className)}>
  <!-- Header -->
  <div class="flex items-center gap-2 border-b border-(--border) bg-(--surface-2) px-4 py-2.5">
    <div class="flex h-5 w-5 items-center justify-center rounded bg-gigo-cyan/20 text-xs">🤖</div>
    <span class="text-sm font-semibold">Verify you're human</span>
    <span class="ml-auto text-[10px] font-mono text-(--muted-foreground)">Attempt #{attempts + 1}</span>
  </div>

  <div class="p-4">
    {#if verified}
      <!-- Brief moment of false hope -->
      <div class="py-6 text-center">
        <div class="text-3xl mb-2">✅</div>
        <p class="text-sm font-semibold text-gigo-lime">Verification Complete!</p>
        <p class="text-xs text-(--muted-foreground) mt-1">Just kidding. Starting over...</p>
      </div>

    {:else if currentChallenge === 'grid'}
      <!-- Grid Challenge -->
      <p class="text-xs font-medium text-(--foreground) mb-3">{currentPrompt}</p>
      <div class="grid grid-cols-3 gap-1.5 mb-3">
        {#each Array(9) as _, i}
          <button
            class="flex h-16 items-center justify-center rounded-lg border transition-all duration-200 text-xl
              {selectedCells.has(i)
                ? 'border-gigo-magenta bg-gigo-magenta/15 scale-95'
                : 'border-(--border) bg-(--surface-2) hover:bg-(--surface-3) hover:scale-105'}"
            onclick={() => toggleCell(i)}
          >
            {gridEmojis[(i + promptIndex) % gridEmojis.length]}
          </button>
        {/each}
      </div>
      <button
        class="w-full rounded-lg bg-gigo-cyan/20 py-2 text-sm font-semibold text-gigo-cyan transition-all hover:bg-gigo-cyan/30"
        onclick={submitGrid}
      >
        Verify ({selectedCells.size} selected)
      </button>
      {#if attempts > 0}
        <p class="mt-2 text-[10px] text-gigo-red text-center">❌ Incorrect. You clearly don't understand {currentPrompt.toLowerCase().replace('select all squares containing ', '').replace('click every pixel that ', '')}.</p>
      {/if}

    {:else if currentChallenge === 'math'}
      <!-- Math Challenge -->
      <p class="text-xs font-medium text-(--foreground) mb-1">Solve this to continue:</p>
      <p class="text-lg font-mono font-bold text-gigo-cyan mb-3">{currentMath.q}</p>
      <input
        type="text"
        bind:value={mathAnswer}
        placeholder="Enter your answer..."
        class="w-full rounded-lg border border-(--border) bg-(--surface-2) px-3 py-2 text-sm text-(--foreground) placeholder:text-(--muted-foreground) focus:border-gigo-cyan focus:outline-none"
      />
      <button
        class="mt-3 w-full rounded-lg bg-gigo-cyan/20 py-2 text-sm font-semibold text-gigo-cyan transition-all hover:bg-gigo-cyan/30"
        onclick={submitMath}
      >
        Submit Answer
      </button>
      <p class="mt-2 text-[10px] text-gigo-orange/70 text-center italic">
        Hint: The answer is unknowable, but we need you to try.
      </p>

    {:else if currentChallenge === 'slider'}
      <!-- Slider Challenge -->
      <p class="text-xs font-medium text-(--foreground) mb-1">
        Move the slider to exactly <span class="font-mono text-gigo-magenta">{sliderTarget}</span>
      </p>
      <input
        type="range"
        min="0"
        max="100"
        bind:value={sliderValue}
        class="w-full accent-gigo-magenta"
      />
      <div class="flex justify-between text-[10px] font-mono text-(--muted-foreground) mt-1">
        <span>Current: <span class="text-gigo-cyan">{sliderValue}</span></span>
        <span>Target: <span class="text-gigo-magenta">{sliderTarget}</span></span>
      </div>
      {#if timerActive}
        <div class="mt-2 h-1 w-full rounded-full bg-(--surface-3) overflow-hidden">
          <div
            class="h-full bg-gigo-magenta transition-all duration-100"
            style="width: {timeLeft}%"
          ></div>
        </div>
        <p class="text-[10px] text-gigo-red mt-1 text-center">⏰ Hurry! Timer running out...</p>
      {/if}
      <button
        class="mt-3 w-full rounded-lg bg-gigo-magenta/20 py-2 text-sm font-semibold text-gigo-magenta transition-all hover:bg-gigo-magenta/30"
        onclick={submitSlider}
      >
        Submit
      </button>
    {/if}

    <!-- Emergency escape -->
    {#if attempts >= 4}
      <button
        class="mt-3 w-full rounded-lg border border-dashed border-(--border) py-1.5 text-[10px] text-(--muted-foreground) transition-opacity hover:opacity-70"
        onclick={actuallyVerify}
      >
        I am a human being with rights (skip)
      </button>
    {/if}
  </div>
</div>
