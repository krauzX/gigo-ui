import type { ComponentDoc } from "../../types.js";

export const gigoCompactor: ComponentDoc = {
  name: "GigoCompactor",
  slug: "gigo-compactor",
  emoji: "💥",
  category: "chaos",
  tagline: "Voxel-crushes your UI into 3-D physics debris",
  description:
    "Renders any slot content normally. On activation it captures a pixel-perfect screenshot, hides the original DOM node (preserving layout), then teleports an instanced Three.js mesh onto document.body and simulates a demolition implosion followed by gravity-driven collapse. Shards persist on scroll — once broken, stays broken. Uses Rapier3D for realistic rigid-body physics and a custom GLSL shader so every shard displays its exact slice of your UI texture.",
  usage: `<script lang="ts">
  import { GigoCompactor } from '@gigo-ui/components';

  let compactor: GigoCompactor;
  let crushed = $state(false);
</script>

<!-- Reactive: setting the prop triggers the effect -->
<GigoCompactor bind:isGarbage={crushed} cols={24} rows={24} intensity={8}>
  <div class="card">Fragile content</div>
</GigoCompactor>
<button onclick={() => crushed = true}>Demolish</button>

<!-- Imperative: call methods directly -->
<GigoCompactor bind:this={compactor}>
  <div class="card">Also fragile</div>
</GigoCompactor>
<button onclick={() => compactor.crush()}>Crush</button>
<button onclick={() => compactor.restore()}>Restore</button>`,
  props: [
    {
      name: "isGarbage",
      type: "boolean",
      default: "false",
      description: "Trigger the crush",
    },
    {
      name: "cols",
      type: "number",
      default: "20",
      description: "Voxel grid columns",
    },
    {
      name: "rows",
      type: "number",
      default: "20",
      description: "Voxel grid rows",
    },
    {
      name: "intensity",
      type: "number",
      default: "7",
      description: "Crush force 0–10",
    },
    {
      name: "debugMode",
      type: "boolean",
      default: "false",
      description: "Show bounding box ring",
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
      description: "Slot content to wrap and destroy",
    },
  ],
};
