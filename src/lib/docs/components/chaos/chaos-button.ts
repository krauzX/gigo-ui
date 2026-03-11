import type { ComponentDoc } from "../../types.js";

export const chaosButton: ComponentDoc = {
  name: "Chaos Button",
  slug: "chaos-button",
  emoji: "🎯",
  category: "chaos",
  tagline: "Teleports, spawns decoys, and mutates text",
  description:
    "A button trapped in a container that teleports every 2 seconds, changes its label randomly, requires a random number of clicks (1-10), and spawns fake decoy buttons on each click attempt.",
  usage: `<script lang="ts">
  import { ChaosButton } from '@gigo-ui/components';
</script>

<ChaosButton
  label="Click Me"
  onclick={() => console.log('Caught!')}
/>`,
  props: [
    {
      name: "label",
      type: "string",
      default: "'Click me'",
      description: "Initial button label",
    },
    {
      name: "chaos",
      type: "boolean",
      default: "true",
      description: "Enable chaos behaviors",
    },
    {
      name: "chaosLevel",
      type: "number",
      default: "8",
      description: "Chaos intensity (0-10)",
    },
    {
      name: "onclick",
      type: "() => void",
      default: "undefined",
      description: "Click handler (fires after required clicks met)",
    },
    {
      name: "class",
      type: "string",
      default: "''",
      description: "Additional CSS classes",
    },
  ],
};
