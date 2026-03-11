import type { ComponentDoc } from "../../types.js";

export const catchSubmit: ComponentDoc = {
  name: "Catch Submit",
  slug: "catch-submit",
  emoji: "🏃",
  category: "badui",
  tagline: "The submit button runs away from your cursor",
  description:
    "A submit button that teleports to a random position whenever the cursor enters it. Tracks escape count, shows trail dots, displays taunting messages, and reveals a hint after 5+ escapes.",
  usage: `<script lang="ts">
  import { CatchSubmit } from '@gigo-ui/components';
</script>

<CatchSubmit
  label="Submit Form"
  arenaHeight={300}
  onsubmit={() => alert('You caught it!')}
/>`,
  props: [
    {
      name: "label",
      type: "string",
      default: "'Submit'",
      description: "Button label text",
    },
    {
      name: "onsubmit",
      type: "() => void",
      default: "undefined",
      description: "Callback when button is finally clicked",
    },
    {
      name: "arenaHeight",
      type: "number",
      default: "256",
      description: "Height of the escape arena in pixels",
    },
    {
      name: "tauntsArray",
      type: "string[]",
      default: "[...defaults]",
      description: "Array of taunting messages shown during escapes",
    },
    {
      name: "class",
      type: "string",
      default: "''",
      description: "Additional CSS classes",
    },
  ],
};
