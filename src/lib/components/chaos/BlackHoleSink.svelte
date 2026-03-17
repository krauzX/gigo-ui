<!-- Black hole wrapper — singularity + accretion engine -->
<script lang="ts">
  import type { Snippet } from 'svelte';
  import { captureSnapshot } from '$lib/utils/destruction-engine.js';

  export interface BlackHoleSinkProps {
    isConsumed?: boolean;
    resolution?: number;
    intensity?: number;
    glowColor?: string;
    debugMode?: boolean;
    class?: string;
    children: Snippet;
  }

  let {
    isConsumed = $bindable(false),
    resolution = 4,
    intensity = 7,
    glowColor = 'rgba(255,120,0,0.7)',
    debugMode = false,
    class: className = '',
    children,
  }: BlackHoleSinkProps = $props();

  let wrapper: HTMLDivElement | undefined = $state();
  let snapshotData: string | null         = $state(null);
  let snapshotRect: DOMRect | null        = $state(null);
  let isCapturing                         = $state(false);
  let EngineComponent: any                = $state(null);
  let hidden                              = $state(false);

  $effect(() => {
    if (isConsumed && !snapshotData && !isCapturing && wrapper) doCapture();
  });

  async function doCapture() {
    if (!wrapper || isCapturing) return;
    isCapturing = true;
    try {
      const result = await captureSnapshot(wrapper);
      snapshotRect = result.rect;
      snapshotData = result.dataURL;
      hidden = true;
      const mod = await import('./internal/BlackHoleEngine.svelte');
      EngineComponent = mod.default;
    } catch (err) {
      if (debugMode) console.error('[BlackHoleSink] capture failed', err);
      hidden = false;
    } finally {
      isCapturing = false;
    }
  }

  export function consume() { if (wrapper) { isConsumed = true; doCapture(); } }
  export function restore() {
    isConsumed = false;
    hidden = false; snapshotData = null; snapshotRect = null; EngineComponent = null;
  }
</script>

<div
  bind:this={wrapper}
  class={className}
  style:visibility={hidden ? 'hidden' : 'visible'}
  data-gigo-blackhole="true"
>
  {@render children()}
</div>

{#if EngineComponent && snapshotData && snapshotRect}
  {@const Engine = EngineComponent}
  <Engine
    snapshot={snapshotData}
    rect={snapshotRect}
    {resolution}
    {intensity}
    {glowColor}
    {debugMode}
  />
{/if}
