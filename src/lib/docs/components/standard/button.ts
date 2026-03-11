import type { ComponentDoc } from "../../types.js";

export const button: ComponentDoc = {
  name: "Button",
  slug: "button",
  emoji: "🔘",
  category: "standard",
  tagline: "9 variants with optional chaos behaviors",
  description:
    "A fully-featured button with 9 style variants (default, destructive, outline, secondary, ghost, link, chaos-primary, chaos-destructive, chaos-nightmare) and optional chaos features like hover escape, text randomization, and multi-click requirements.",
  usage: `<script lang="ts">
  import { Button } from '@gigo-ui/components';
</script>

<Button variant="default">Click me</Button>
<Button variant="chaos-primary" chaos escapeOnHover>
  Try to click me
</Button>`,
  props: [
    {
      name: "variant",
      type: "ButtonVariant",
      default: "'default'",
      description: "Visual style variant",
    },
    {
      name: "size",
      type: "ButtonSize",
      default: "'md'",
      description: "Button size",
    },
    {
      name: "chaos",
      type: "boolean",
      default: "false",
      description: "Enable chaos mode",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Disabled state",
    },
    {
      name: "escapeOnHover",
      type: "boolean",
      default: "false",
      description: "Button moves away on hover",
    },
    {
      name: "randomizeText",
      type: "boolean",
      default: "false",
      description: "Text changes randomly",
    },
    {
      name: "multiClickRequired",
      type: "number",
      default: "1",
      description: "Clicks needed to trigger onclick",
    },
    {
      name: "onclick",
      type: "() => void",
      default: "undefined",
      description: "Click handler",
    },
  ],
};
