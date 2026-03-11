import type { ComponentDoc } from "../../types.js";

export const volumeSlider: ComponentDoc = {
  name: "Volume Slider",
  slug: "volume-slider",
  emoji: "🔊",
  category: "badui",
  tagline: "A volume control that lies, inverts, and jumps",
  description:
    "A volume slider where dragging left increases volume and right decreases it. Labels lie about the current level, and the slider randomly jumps to new positions on its own.",
  usage: `<script lang="ts">
  import { VolumeSlider } from '@gigo-ui/components';
  let volume = $state(50);
</script>

<VolumeSlider bind:value={volume} />`,
  props: [
    {
      name: "value",
      type: "number",
      default: "50",
      description: "Current volume (bindable)",
    },
    {
      name: "min",
      type: "number",
      default: "0",
      description: "Minimum value",
    },
    {
      name: "max",
      type: "number",
      default: "100",
      description: "Maximum value",
    },
    {
      name: "invertDirection",
      type: "boolean",
      default: "true",
      description: "Invert slider direction",
    },
    {
      name: "jumpAround",
      type: "boolean",
      default: "true",
      description: "Slider randomly jumps",
    },
    {
      name: "fakeLabels",
      type: "boolean",
      default: "true",
      description: "Show lying volume labels",
    },
  ],
};
