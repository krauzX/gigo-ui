import type { ComponentDoc } from "../../types.js";

export const passwordPeekhole: ComponentDoc = {
  name: "Password Peekhole",
  slug: "password-peekhole",
  emoji: "🔒",
  category: "badui",
  tagline: "See your password through a draggable peephole",
  description:
    "A password input completely hidden behind an opaque overlay. A tiny circular peephole can be dragged around to reveal portions of the text. Uses CSS clip-path for the reveal effect.",
  usage: `<script lang="ts">
  import { PasswordPeekhole } from '@gigo-ui/components';
  let password = $state('');
</script>

<PasswordPeekhole
  bind:value={password}
  placeholder="Enter your secret..."
  holeSize={50}
  accentColor="#18ffff"
/>`,
  props: [
    {
      name: "value",
      type: "string",
      default: "''",
      description: "Current password value (bindable)",
    },
    {
      name: "placeholder",
      type: "string",
      default: "''",
      description: "Placeholder text",
    },
    {
      name: "holeSize",
      type: "number",
      default: "40",
      description: "Radius of the draggable peephole in pixels",
    },
    {
      name: "accentColor",
      type: "string",
      default: "'#e040fb'",
      description: "Accent color for the peephole handle and indicators",
    },
    {
      name: "class",
      type: "string",
      default: "''",
      description: "Additional CSS classes",
    },
  ],
};
