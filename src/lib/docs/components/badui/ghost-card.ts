import type { ComponentDoc } from "../../types.js";

export const ghostCard: ComponentDoc = {
  name: "Ghost Card",
  slug: "ghost-card",
  emoji: "👻",
  category: "badui",
  tagline: "A card that randomly vanishes and reappears broken",
  description:
    "Displays content in a card that periodically disappears, then reappears in a glitched state — mirrored, sliced via clip-path, hue-rotated, or offset. Simulates unreliable rendering with visual corruption effects.",
  usage: `<script lang="ts">
  import { GhostCard } from '@gigo-ui/components';
</script>

<GhostCard
  title="Important Info"
  description="This content may vanish at any moment."
/>`,
  props: [
    {
      name: "title",
      type: "string",
      default: "'Ghost Card'",
      description: "Card heading text",
    },
    {
      name: "description",
      type: "string",
      default: "''",
      description: "Card body text",
    },
    {
      name: "class",
      type: "string",
      default: "''",
      description: "Additional CSS classes",
    },
    {
      name: "disappearMinMs",
      type: "number",
      default: "2000",
      description: "Minimum time before disappearing (ms)",
    },
    {
      name: "disappearMaxMs",
      type: "number",
      default: "5000",
      description: "Maximum time before disappearing (ms)",
    },
    {
      name: "glitchChance",
      type: "number",
      default: "0.6",
      description: "Probability of glitch on reappear (0-1)",
    },
  ],
};
