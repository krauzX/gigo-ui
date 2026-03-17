import type { ComponentDoc } from "../../types.js";

export const pixelDissolve: ComponentDoc = {
  name: "PixelDissolve",
  slug: "pixel-dissolve",
  emoji: "✨",
  category: "chaos",
  tagline: "Snaps your UI into drifting pixel dust",
  description:
    "Samples the slot content at configurable resolution and treats every pixel as an independent particle. Dissolution spreads as a contagion wave from random seed points — neighbouring pixels crumble in sequence for an organic, sand-eroding effect. Particles drift with gravity and fade out. Pure Canvas2D with OffscreenCanvas sampling — no WebGL needed.",
  usage: `<script lang="ts">
  import { PixelDissolve } from '@gigo-ui/components';

  let snap: PixelDissolve;
  let gone = $state(false);
</script>

<!-- Reactive -->
<PixelDissolve bind:isDead={gone} resolution={2} waveSeed={12} intensity={6}>
  <ProfileCard />
</PixelDissolve>
<button onclick={() => gone = true}>Snap</button>

<!-- Imperative -->
<PixelDissolve bind:this={snap}>
  <ProfileCard />
</PixelDissolve>
<button onclick={() => snap.dissolve()}>Dissolve</button>
<button onclick={() => snap.restore()}>Restore</button>`,
  props: [
    {
      name: "isDead",
      type: "boolean",
      default: "false",
      description: "Trigger dissolution",
    },
    {
      name: "resolution",
      type: "number",
      default: "3",
      description: "Pixel group size (1=full quality, 6=coarse)",
    },
    {
      name: "waveSeed",
      type: "number",
      default: "8",
      description: "Number of initial infection origins",
    },
    {
      name: "intensity",
      type: "number",
      default: "7",
      description: "Gravity / drift speed 0–10",
    },
    {
      name: "debugMode",
      type: "boolean",
      default: "false",
      description: "Debug logging",
    },
    {
      name: "class",
      type: "string",
      default: "''",
      description: "Additional CSS classes",
    },
    {
      name: "children",
      type: "Snippet",
      default: "required",
      description: "Slot content to dissolve",
    },
  ],
};
