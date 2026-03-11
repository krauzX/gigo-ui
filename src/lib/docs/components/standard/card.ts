import type { ComponentDoc } from "../../types.js";

export const card: ComponentDoc = {
  name: "Card",
  slug: "card",
  emoji: "🃏",
  category: "standard",
  tagline: "3D tilt card with chaos rotation",
  description:
    "A content card with interactive 3D tilt on hover using perspective transforms and a dynamic spotlight effect. Chaos features include random rotation, click resistance, and z-index fighting.",
  usage: `<script lang="ts">
  import { Card } from '@gigo-ui/components';
</script>

<Card title="My Card" description="Hover for 3D tilt.">
  {#snippet children()}
    <p>Card content goes here.</p>
  {/snippet}
</Card>`,
  props: [
    {
      name: "title",
      type: "string",
      default: "''",
      description: "Card title",
    },
    {
      name: "description",
      type: "string",
      default: "''",
      description: "Card description",
    },
    {
      name: "chaos",
      type: "boolean",
      default: "false",
      description: "Enable chaos mode",
    },
    {
      name: "randomRotation",
      type: "boolean",
      default: "false",
      description: "Card rotates randomly",
    },
    {
      name: "resistClicks",
      type: "boolean",
      default: "false",
      description: "Requires 3 clicks to trigger",
    },
    {
      name: "zIndexWar",
      type: "boolean",
      default: "false",
      description: "Random z-index changes",
    },
  ],
};
