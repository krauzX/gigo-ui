import type { ComponentDoc } from "../../types.js";

export const progressDoom: ComponentDoc = {
  name: "Progress Doom",
  slug: "progress-doom",
  emoji: "⏳",
  category: "badui",
  tagline: "A progress bar that lies, stalls, and goes backwards",
  description:
    "A progress bar that shows three different values — real, displayed, and claimed — none of which agree. It goes backwards randomly, stalls at inconvenient moments, and lies about completion.",
  usage: `<script lang="ts">
  import { ProgressDoom } from '@gigo-ui/components';
</script>

<ProgressDoom
  targetMs={5000}
  onComplete={() => alert('Done!')}
/>`,
  props: [
    {
      name: "targetMs",
      type: "number",
      default: "5000",
      description: "Target duration in milliseconds",
    },
    {
      name: "goBackwards",
      type: "boolean",
      default: "true",
      description: "Progress randomly goes backwards",
    },
    {
      name: "stall",
      type: "boolean",
      default: "true",
      description: "Progress randomly stalls",
    },
    {
      name: "lieAboutCompletion",
      type: "boolean",
      default: "true",
      description: "Displayed percentage lies",
    },
    {
      name: "onComplete",
      type: "() => void",
      default: "undefined",
      description: "Callback when actually complete",
    },
  ],
};
