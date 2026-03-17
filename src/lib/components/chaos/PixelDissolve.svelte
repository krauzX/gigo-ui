<!-- Pixel dissolve wrapper — wave contagion engine -->
<script lang="ts">
  import type { Snippet } from 'svelte';
  import { captureSnapshot } from '$lib/utils/destruction-engine.js';

  export interface PixelDissolveProps {
    isDead?: boolean;
    resolution?: number;
    waveSeed?: number;
    intensity?: number;
    debugMode?: boolean;
    class?: string;
    children: Snippet;
  }

  let {
    isDead = $bindable(false),
    resolution = 3,
    waveSeed = 8,
    intensity = 7,
    debugMode = false,
    class: className = '',
    children,
  }: PixelDissolveProps = $props();

  let wrapper: HTMLDivElement | undefined = $state();
  let snapshotData: string | null         = $state(null);
  let snapshotRect: DOMRect | null        = $state(null);
  let isCapturing                         = $state(false);
  let EngineComponent: any                = $state(null);
  let hidden                              = $state(false);

  $effect(() => {
    if (isDead && !snapshotData && !isCapturing && wrapper) doCapture();
  });

  async function doCapture() {
    if (!wrapper || isCapturing) return;
    isCapturing = true;
    try {
      const result = await captureSnapshot(wrapper);
      snapshotRect = result.rect;
      snapshotData = result.dataURL;
      hidden = true;
      const mod = await import('./internal/PixelDissolveEngine.svelte');
      EngineComponent = mod.default;
    } catch (err) {
      if (debugMode) console.error('[PixelDissolve] capture failed', err);
      hidden = false;
    } finally {
      isCapturing = false;
    }
  }

  export function dissolve() { if (wrapper) { isDead = true; doCapture(); } }
  export function restore() {
    isDead = false;
    hidden = false; snapshotData = null; snapshotRect = null; EngineComponent = null;
  }
</script>

<div
  bind:this={wrapper}
  class={className}
  style:visibility={hidden ? 'hidden' : 'visible'}
  data-gigo-dissolve="true"
>
  {@render children()}
</div>

{#if EngineComponent && snapshotData && snapshotRect}
  {@const Engine = EngineComponent}
  <Engine
    snapshot={snapshotData}
    rect={snapshotRect}
    {resolution}
    {waveSeed}
    {intensity}
    {debugMode}
  />
{/if}
