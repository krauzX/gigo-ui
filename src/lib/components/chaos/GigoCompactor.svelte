
<script lang="ts">
  import { onDestroy } from 'svelte';
  import type { Snippet } from 'svelte';
  import { captureSnapshot } from '$lib/utils/destruction-engine.js';

  export interface GigoCompactorProps {
    isGarbage?: boolean;
    cols?: number;
    rows?: number;
    intensity?: number;   // 0–10
    debugMode?: boolean;
    class?: string;
    children: Snippet;
  }

  let {
    isGarbage = $bindable(false),
    cols = 20,
    rows = 20,
    intensity = 7,
    debugMode = false,
    class: className = '',
    children,
  }: GigoCompactorProps = $props();


  let wrapper: HTMLDivElement | undefined = $state();
  let snapshotData: string | null        = $state(null);
  let snapshotRect: DOMRect | null       = $state(null);
  let isCapturing                        = $state(false);
  let EngineComponent: any               = $state(null);
  let hidden                             = $state(false);


  $effect(() => {
    if (isGarbage && !snapshotData && !isCapturing && wrapper) {
      doCapture();
    }
  });

  async function doCapture() {
    if (!wrapper || isCapturing) return;
    isCapturing = true;

    try {
      const result = await captureSnapshot(wrapper);
      snapshotRect = result.rect;
      snapshotData = result.dataURL;
      hidden = true; // preserve layout, hide original

      // Lazy-load the engine only now
      const mod = await import('./internal/CompactorEngine.svelte');
      EngineComponent = mod.default;
    } catch (err) {
      if (debugMode) console.error('[GigoCompactor] capture failed', err);
      // fail-safe: show original again
      hidden = false;
    } finally {
      isCapturing = false;
    }
  }

  export function crush() { if (wrapper) { isGarbage = true; doCapture(); } }
  export function restore() {
    isGarbage = false;
    hidden = false; snapshotData = null; snapshotRect = null; EngineComponent = null;
  }

  onDestroy(() => {
    restore()
  });
</script>

<!-- Original slot content — hidden once physics takes over -->
<div
  bind:this={wrapper}
  class={className}
  style:visibility={hidden ? 'hidden' : 'visible'}
  data-gigo-compactor="true"
>
  {@render children()}
</div>

{#if debugMode}
  <div class="
    fixed inset-0 pointer-events-none z-10000
    ring-2 ring-offset-[-2px] ring-red-500/60
  "></div>
{/if}

<!-- Physics engine — mounted lazily after snapshot is ready -->
{#if EngineComponent && snapshotData && snapshotRect}
  {@const Engine = EngineComponent}
  <Engine
    snapshot={snapshotData}
    rect={snapshotRect}
    {cols}
    {rows}
    {intensity}
    {debugMode}
  />
{/if}
