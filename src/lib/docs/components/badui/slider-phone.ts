import type { ComponentDoc } from "../../types.js";

export const sliderPhone: ComponentDoc = {
  name: "Slider Phone",
  slug: "slider-phone",
  emoji: "📱",
  category: "badui",
  tagline: "Enter a phone number with individual sliders",
  description:
    "10 range sliders (0-9 each) for entering a phone number one digit at a time. Displays the result formatted as (XXX) XXX-XXXX. The ultimate in tedious data entry.",
  usage: `<script lang="ts">
  import { SliderPhone } from '@gigo-ui/components';
  let value = $state('');
</script>

<SliderPhone bind:value digitCount={10} formatPattern="(XXX) XXX-XXXX" />`,
  props: [
    {
      name: "value",
      type: "string",
      default: "''",
      description: "Current phone number (bindable)",
    },
    {
      name: "digitCount",
      type: "number",
      default: "10",
      description: "Number of digit sliders",
    },
    {
      name: "formatPattern",
      type: "string",
      default: "'(XXX) XXX-XXXX'",
      description: "Display format pattern (X = digit placeholder)",
    },
    {
      name: "class",
      type: "string",
      default: "''",
      description: "Additional CSS classes",
    },
  ],
};
