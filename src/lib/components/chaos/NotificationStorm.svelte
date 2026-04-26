<script lang="ts">

  import { cn } from '$lib/utils/cn.js';
  import type { GigoNotificationStormProps } from '$lib/types/index.js';

  let {
    autoStart = true,
    maxVisible = 8,
    class: className = '',
  }: GigoNotificationStormProps = $props();

  interface Toast {
    id: number;
    message: string;
    type: 'info' | 'warning' | 'error' | 'success' | 'chaos';
    offset: number;
  }

  let nextId = $state(1);
  let toasts = $state<Toast[]>([]);
  let totalDismissed = $state(0);

  const messages = [
    { msg: '📬 You have unread messages (you don\'t)', type: 'info' as const },
    { msg: '⚠️ Your session expires in -3 minutes', type: 'warning' as const },
    { msg: '🔴 Critical: Everything is probably fine', type: 'error' as const },
    { msg: '✅ Successfully failed to load', type: 'success' as const },
    { msg: '🔔 Someone you don\'t know did something', type: 'info' as const },
    { msg: '💀 Error: Success', type: 'error' as const },
    { msg: '🎉 Congratulations on your 0th purchase!', type: 'success' as const },
    { msg: '⏰ Reminder: You forgot to remember', type: 'warning' as const },
    { msg: '📊 Your engagement is at 0%. Keep it up!', type: 'info' as const },
    { msg: '🚨 Alert: This alert is alerting you', type: 'error' as const },
    { msg: '🌟 You\'ve been selected for nothing', type: 'success' as const },
    { msg: '🔥 Trending: You dismissing notifications', type: 'info' as const },
    { msg: '⚡ Breaking: Nothing happened', type: 'chaos' as const },
    { msg: '🍕 Your pizza is NOT on the way', type: 'warning' as const },
    { msg: '💩 New feature: More notifications', type: 'chaos' as const },
  ];

  const typeColors: Record<string, string> = {
    info: 'border-gigo-cyan/30 bg-gigo-cyan/5',
    warning: 'border-gigo-yellow/30 bg-gigo-yellow/5',
    error: 'border-gigo-red/30 bg-gigo-red/5',
    success: 'border-gigo-lime/30 bg-gigo-lime/5',
    chaos: 'border-gigo-magenta/30 bg-gigo-magenta/5',
  };

  function spawnToast() {
    const pick = messages[Math.floor(Math.random() * messages.length)];
    const toast: Toast = {
      id: nextId++,
      message: pick.msg,
      type: pick.type,
      offset: Math.random() * 20 - 10,
    };
    toasts = [...toasts.slice(-(maxVisible - 1)), toast];
  }

  function dismiss(id: number) {
    toasts = toasts.filter((t) => t.id !== id);
    totalDismissed++;

    // Spawn 2 more for every 1 dismissed
    setTimeout(() => spawnToast(), 200);
    setTimeout(() => spawnToast(), 500);
  }

  function markAllRead() {
    toasts = [];
    // "Mark All Read" spawns 10 more
    for (let i = 0; i < 10; i++) {
      setTimeout(() => spawnToast(), i * 150);
    }
  }

  function clearAll() {
    toasts = [];
    totalDismissed = 0;
    nextId = 1;
  }

  // Auto-spawn initial notifications
  $effect(() => {
    if (!autoStart) return;
    const t1 = setTimeout(() => spawnToast(), 400);
    const t2 = setTimeout(() => spawnToast(), 900);
    const t3 = setTimeout(() => spawnToast(), 1400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  });
</script>

<div class={cn('relative', className)}>
  <!-- Header bar -->
  <div class="flex items-center justify-between rounded-t-xl border border-(--border) bg-(--surface-2) px-4 py-2">
    <div class="flex items-center gap-2">
      <span class="text-sm font-semibold">🔔 Notifications</span>
      {#if toasts.length > 0}
        <span class="flex h-5 min-w-5 items-center justify-center rounded-full bg-gigo-red px-1 text-[10px] font-bold text-white animate-gigo-pulse-glow">
          {toasts.length}
        </span>
      {/if}
    </div>
    <div class="flex items-center gap-2">
      <button
        class="rounded bg-(--surface-3) px-2 py-0.5 text-[10px] font-medium text-(--muted-foreground) transition-colors hover:bg-gigo-magenta/20 hover:text-gigo-magenta"
        onclick={markAllRead}
      >
        Mark All Read
      </button>
      <button
        class="rounded bg-(--surface-3) px-2 py-0.5 text-[10px] font-medium text-(--muted-foreground) transition-colors hover:bg-gigo-cyan/20 hover:text-gigo-cyan"
        onclick={clearAll}
      >
        Actually Clear
      </button>
    </div>
  </div>

  <!-- Toast stack -->
  <div class="space-y-1.5 rounded-b-xl border border-t-0 border-(--border) bg-(--surface-1) p-3" style="min-height: 120px;">
    {#if toasts.length === 0}
      <p class="py-6 text-center text-xs text-(--muted-foreground) italic">
        No notifications... yet. 😈
      </p>
    {:else}
      {#each toasts as toast (toast.id)}
        <div
          class="flex items-start gap-2 rounded-lg border p-2.5 transition-all duration-300 animate-gigo-entrance {typeColors[toast.type]}"
          style="transform: translateX({toast.offset}px);"
        >
          <p class="flex-1 text-xs leading-snug text-(--foreground)">{toast.message}</p>
          <button
            class="shrink-0 rounded-md bg-(--surface-3) px-1.5 py-0.5 text-[9px] font-medium text-(--muted-foreground) transition-colors hover:bg-gigo-red/20 hover:text-gigo-red"
            onclick={() => dismiss(toast.id)}
          >
            ✕
          </button>
        </div>
      {/each}
    {/if}
  </div>

  <!-- Stats -->
  {#if totalDismissed > 0}
    <p class="mt-2 text-center text-[10px] font-mono text-(--muted-foreground)">
      Dismissed: <span class="text-gigo-magenta">{totalDismissed}</span> · Spawned:
      <span class="text-gigo-cyan">{totalDismissed * 2}</span> ·
      Current: <span class="text-gigo-lime">{toasts.length}</span>
    </p>
  {/if}
</div>
