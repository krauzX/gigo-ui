import type { ComponentDoc } from "../../types.js";

export const colorPickerWrong: ComponentDoc = {
  name: "Color Picker Wrong",
  slug: "color-picker-wrong",
  emoji: "🎨",
  category: "badui",
  tagline: "Pick a color, get the wrong one",
  description:
    "A color picker that channel-swaps and hue-shifts every color you select. You pick red, you get teal. You pick blue, you get orange. Includes delayed updates and lying color names.",
  usage: `<script lang="ts">
  import { ColorPickerWrong } from '@gigo-ui/components';
  let color = $state('#e040fb');
</script>

<ColorPickerWrong bind:value={color} />`,
  props: [
    {
      name: "value",
      type: "string",
      default: "'#e040fb'",
      description: "Output color hex (bindable, always wrong)",
    },
    {
      name: "offsetHue",
      type: "boolean",
      default: "true",
      description: "Shift hue channels",
    },
    {
      name: "swapChannels",
      type: "boolean",
      default: "true",
      description: "Swap RGB channels",
    },
    {
      name: "delayUpdate",
      type: "boolean",
      default: "true",
      description: "Delay color update randomly",
    },
  ],
};
