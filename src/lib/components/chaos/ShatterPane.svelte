<!-- Glass shatter wrapper — Voronoi fracture engine -->
<script lang="ts">
  import { onDestroy } from 'svelte';
  import type { Snippet } from 'svelte';
  import { captureSnapshot } from '$lib/utils/destruction-engine.js';

  export interface ShatterPaneProps {
    isShattered?: boolean;
    shardCount?: number;
    intensity?: number;
    tint?: string;
    debugMode?: boolean;
    class?: string;
    children: Snippet;
  }

  let {
    isShattered = $bindable(false),
    shardCount = 48,
    intensity = 7,
    tint = 'rgba(180,220,255,0.08)',
    debugMode = false,
    class: className = '',
    children,
  }: ShatterPaneProps = $props();

  let wrapper: HTMLDivElement | undefined = $state();
  let snapshotData: string | null         = $state(null);
  let snapshotRect: DOMRect | null        = $state(null);
  let isCapturing                         = $state(false);
  let EngineComponent: any                = $state(null);
  let hidden                              = $state(false);

  $effect(() => {
    if (isShattered && !snapshotData && !isCapturing && wrapper) {
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
      hidden = true;
      const mod = await import('./internal/ShatterEngine.svelte');
      EngineComponent = mod.default;
    } catch (err) {
      if (debugMode) console.error('[ShatterPane] capture failed', err);
      hidden = false;
    } finally {
      isCapturing = false;
    }
  }

  export function shatter() { if (wrapper) { isShattered = true; doCapture(); } }
  export function restore() {
    isShattered = false;
    hidden = false; snapshotData = null; snapshotRect = null; EngineComponent = null;
  }
</script>

<div
  bind:this={wrapper}
  class={className}
  style:visibility={hidden ? 'hidden' : 'visible'}
  data-gigo-shatter="true"
>
  {@render children()}
</div>

{#if EngineComponent && snapshotData && snapshotRect}
  {@const Engine = EngineComponent}
  <Engine
    snapshot={snapshotData}
    rect={snapshotRect}
    {shardCount}
    {intensity}
    {tint}
    {debugMode}
  />
{/if}
