import type { ComponentDoc } from "../../types.js";

export const chaosForm: ComponentDoc = {
  name: "Chaos Form",
  slug: "chaos-form",
  emoji: "📝",
  category: "chaos",
  tagline: "Corrupts data, shuffles fields, CRT scanlines",
  description:
    "A form that actively sabotages user input: injects garbage text, shuffles field order, multiplies submit buttons, shows fake validation, auto-submits randomly, and nests additional forms on submit. Features CRT scanline overlay.",
  usage: `<script lang="ts">
  import { ChaosForm } from '@gigo-ui/components';
</script>

<ChaosForm
  autoSubmit
  autoSubmitInterval={10000}
  corruptionInterval={2000}
  onsubmit={(data) => console.log('Submitted:', data)}
/>`,
  props: [
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
      name: "onsubmit",
      type: "(data: Record<string, string>) => void",
      default: "undefined",
      description: "Submit callback with form data",
    },
    {
      name: "autoSubmit",
      type: "boolean",
      default: "false",
      description: "Enable random auto-submission",
    },
    {
      name: "autoSubmitInterval",
      type: "number",
      default: "12000",
      description: "Max milliseconds between auto-submits",
    },
    {
      name: "corruptionInterval",
      type: "number",
      default: "3000",
      description: "Milliseconds between data corruption cycles",
    },
    {
      name: "shuffleInterval",
      type: "number",
      default: "4000",
      description: "Milliseconds between field order shuffles",
    },
    {
      name: "class",
      type: "string",
      default: "''",
      description: "Additional CSS classes",
    },
  ],
};
