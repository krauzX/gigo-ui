import type { ComponentDoc } from "../../types.js";

export const rotaryDial: ComponentDoc = {
  name: "Rotary Dial",
  slug: "rotary-dial",
  emoji: "☎️",
  category: "badui",
  tagline: "Enter numbers by rotating a dial",
  description:
    "An SVG rotary phone dial for number entry. Uses atan2 calculations for rotation tracking, enforces clockwise-only rotation, and animates the return spring. Each digit requires a full rotation cycle.",
  usage: `<script lang="ts">
  import { RotaryDial } from '@gigo-ui/components';
  let value = $state('');
</script>

<RotaryDial bind:value maxDigits={10} dialSize={300} />`,
  props: [
    {
      name: "value",
      type: "string",
      default: "''",
      description: "Current dialed number (bindable)",
    },
    {
      name: "maxDigits",
      type: "number",
      default: "10",
      description: "Maximum digits allowed",
    },
    {
      name: "dialSize",
      type: "number",
      default: "260",
      description: "Diameter of the rotary dial in pixels",
    },
    {
      name: "class",
      type: "string",
      default: "''",
      description: "Additional CSS classes",
    },
  ],
};
