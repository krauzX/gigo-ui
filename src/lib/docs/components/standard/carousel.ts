import type { ComponentDoc } from "../../types.js";

export const carousel: ComponentDoc = {
  name: "Carousel",
  slug: "carousel",
  emoji: "🎠",
  category: "standard",
  tagline: "Slide carousel with lying navigation",
  description:
    "A content carousel with autoplay that features deceptive navigation buttons (prev does next and vice versa), reverse autoplay direction, random slide jumps, and a fake slide counter that inflates.",
  usage: `<script lang="ts">
  import { Carousel } from '@gigo-ui/components';

  const slides = [
    { id: '1', content: 'Slide 1' },
    { id: '2', content: 'Slide 2' },
    { id: '3', content: 'Slide 3' },
  ];
</script>

<Carousel {slides} autoplay chaos lyingNavigation />`,
  props: [
    {
      name: "slides",
      type: "CarouselSlide[]",
      default: "[]",
      description: "Slide data array",
    },
    {
      name: "autoplay",
      type: "boolean",
      default: "false",
      description: "Auto-advance slides",
    },
    {
      name: "interval",
      type: "number",
      default: "3000",
      description: "Autoplay interval (ms)",
    },
    {
      name: "chaos",
      type: "boolean",
      default: "false",
      description: "Enable chaos mode",
    },
    {
      name: "lyingNavigation",
      type: "boolean",
      default: "false",
      description: "Prev/Next buttons do the opposite",
    },
    {
      name: "reverseDirection",
      type: "boolean",
      default: "false",
      description: "Autoplay goes backwards",
    },
    {
      name: "randomJumps",
      type: "boolean",
      default: "false",
      description: "Jumps to random slides",
    },
  ],
};
