import type { ComponentDoc } from "../../types.js";

export const gravityInput: ComponentDoc = {
  name: "Gravity Input",
  slug: "gravity-input",
  emoji: "🪂",
  category: "badui",
  tagline: "Catch falling characters to type",
  description:
    "Characters fall from the top of a drop zone with simulated gravity. Click a character before it falls off screen to append it to the input value. Features real physics simulation with requestAnimationFrame.",
  usage: `<script lang="ts">
  import { GravityInput } from '@gigo-ui/components';
  let value = $state('');
</script>

<GravityInput
  bind:value
  placeholder="Catch characters to type..."
  spawnInterval={300}
  maxFalling={20}
  arenaHeight={280}
/>`,
  props: [
    {
      name: "value",
      type: "string",
      default: "''",
      description: "Current input value (bindable)",
    },
    {
      name: "placeholder",
      type: "string",
      default: "''",
      description: "Placeholder text when empty",
    },
    {
      name: "spawnInterval",
      type: "number",
      default: "400",
      description: "Milliseconds between character spawns",
    },
    {
      name: "maxFalling",
      type: "number",
      default: "15",
      description: "Maximum simultaneous falling characters",
    },
    {
      name: "characters",
      type: "string",
      default: "'0-9a-zA-Z@.!?#$%'",
      description: "Character pool for falling glyphs",
    },
    {
      name: "arenaHeight",
      type: "number",
      default: "224",
      description: "Height of the drop zone in pixels",
    },
    {
      name: "class",
      type: "string",
      default: "''",
      description: "Additional CSS classes",
    },
  ],
};
