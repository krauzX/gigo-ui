import type { ComponentDoc } from "../../types.js";

export const blackHoleSink: ComponentDoc = {
  name: "BlackHoleSink",
  slug: "black-hole-sink",
  emoji: "🌑",
  category: "chaos",
  tagline: "Swallows your UI into a gravitational singularity",
  description:
    "Captures the slot element as pixels and draws each one as a particle that spirals inward toward the element's centre with exponentially growing gravitational pull. Features a shimmering accretion-disk glow ring, a growing dark core, and gravitational redshift colouring (particles heat to orange-red as they approach the event horizon). Pure Canvas2D — broad compatibility, zero WebGL.",
  usage: `<script lang="ts">
  import { BlackHoleSink } from '@gigo-ui/components';

  let hole: BlackHoleSink;
  let eaten = $state(false);
</script>

<!-- Reactive -->
<BlackHoleSink bind:isConsumed={eaten} intensity={8} glowColor="rgba(255,120,0,0.7)">
  <Dashboard />
</BlackHoleSink>
<button onclick={() => eaten = true}>Consume</button>

<!-- Imperative -->
<BlackHoleSink bind:this={hole}>
  <Widget />
</BlackHoleSink>
<button onclick={() => hole.consume()}>Eat</button>
<button onclick={() => hole.restore()}>Restore</button>`,
  props: [
    {
      name: "isConsumed",
      type: "boolean",
      default: "false",
      description: "Trigger event horizon",
    },
    {
      name: "resolution",
      type: "number",
      default: "4",
      description: "Pixel sampling density",
    },
    {
      name: "intensity",
      type: "number",
      default: "7",
      description: "Gravitational pull 0–10",
    },
    {
      name: "glowColor",
      type: "string",
      default: "'rgba(255,120,0,0.7)'",
      description: "Accretion disk CSS colour",
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
      description: "Slot content to consume",
    },
  ],
};
