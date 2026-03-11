import type { ComponentDoc } from "../../types.js";

export const termsSidescroll: ComponentDoc = {
  name: "Terms Sidescroll",
  slug: "terms-sidescroll",
  emoji: "📜",
  category: "badui",
  tagline: "Terms & conditions that scroll sideways and scramble",
  description:
    "A terms and conditions box that scrolls horizontally instead of vertically. Text rotates as you scroll, characters randomly scramble, and the accept checkbox only works 50% of the time.",
  usage: `<script lang="ts">
  import { TermsSidescroll } from '@gigo-ui/components';
  let accepted = $state(false);
</script>

<TermsSidescroll bind:accepted />`,
  props: [
    {
      name: "content",
      type: "string",
      default: "'...'",
      description: "Terms text content",
    },
    {
      name: "accepted",
      type: "boolean",
      default: "false",
      description: "Accept state (bindable)",
    },
    {
      name: "rotateText",
      type: "boolean",
      default: "true",
      description: "Text rotates on scroll",
    },
    {
      name: "scrambleOnScroll",
      type: "boolean",
      default: "true",
      description: "Characters scramble while scrolling",
    },
    {
      name: "sidewaysScroll",
      type: "boolean",
      default: "true",
      description: "Scroll horizontally instead of vertically",
    },
  ],
};
