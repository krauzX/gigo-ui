import type { ComponentDoc } from "../../types.js";

export const shatterPane: ComponentDoc = {
  name: "ShatterPane",
  slug: "shatter-pane",
  emoji: "🪟",
  category: "chaos",
  tagline: "Fractures your UI into Voronoi glass shards",
  description:
    "Renders slot content normally. On trigger, captures a DOM snapshot and shatters it into irregular Voronoi polygons — each clipped with its own texture slice, highlighted with a glass-crack edge and an iridescent tint. Shards explode outward from their centre, spin, and fall. Pure Canvas2D (no WebGL dependency) for fast load and broad compatibility.",
  usage: `<script lang="ts">
  import { ShatterPane } from '@gigo-ui/components';

  let pane: ShatterPane;
  let broken = $state(false);
</script>

<!-- Reactive -->
<ShatterPane bind:isShattered={broken} shardCount={60} intensity={8}>
  <div class="card">Glass content</div>
</ShatterPane>
<button onclick={() => broken = true}>Shatter</button>

<!-- Imperative -->
<ShatterPane bind:this={pane}>
  <div class="card">Also glass</div>
</ShatterPane>
<button onclick={() => pane.shatter()}>Break</button>
<button onclick={() => pane.restore()}>Fix</button>`,
  props: [
    {
      name: "isShattered",
      type: "boolean",
      default: "false",
      description: "Trigger fracture",
    },
    {
      name: "shardCount",
      type: "number",
      default: "48",
      description: "Number of Voronoi polygons",
    },
    {
      name: "intensity",
      type: "number",
      default: "7",
      description: "Explosion force 0–10",
    },
    {
      name: "tint",
      type: "string",
      default: "'rgba(180,220,255,0.08)'",
      description: "Glass iridescence CSS colour",
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
      description: "Slot content to wrap and shatter",
    },
  ],
};
