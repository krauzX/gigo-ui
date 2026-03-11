import type { ComponentDoc } from "../../types.js";

export const modal: ComponentDoc = {
  name: "Modal",
  slug: "modal",
  emoji: "💬",
  category: "standard",
  tagline: "Dialog that fights being closed",
  description:
    "A glassmorphism modal dialog with chaos features: resists closing (requires 3 attempts), Escape key moves the modal instead of closing it, spawns additional nested modals, and adds fake close buttons.",
  usage: `<script lang="ts">
  import { Button, Modal } from '@gigo-ui/components';
  let open = $state(false);
</script>

<Button onclick={() => (open = true)}>Open Modal</Button>
<Modal bind:open title="Example" chaos resistClose spawnMoreModals>
  {#snippet children()}
    <p>Try closing this.</p>
  {/snippet}
</Modal>`,
  props: [
    {
      name: "open",
      type: "boolean",
      default: "false",
      description: "Open state (bindable)",
    },
    {
      name: "title",
      type: "string",
      default: "'Modal'",
      description: "Modal title",
    },
    {
      name: "chaos",
      type: "boolean",
      default: "false",
      description: "Enable chaos mode",
    },
    {
      name: "resistClose",
      type: "boolean",
      default: "false",
      description: "Requires multiple close attempts",
    },
    {
      name: "escapeModal",
      type: "boolean",
      default: "false",
      description: "Escape key offsets instead of closing",
    },
    {
      name: "spawnMoreModals",
      type: "boolean",
      default: "false",
      description: "Spawns nested modals on close",
    },
    {
      name: "fakeCloseButtons",
      type: "boolean",
      default: "false",
      description: "Adds non-functional close buttons",
    },
  ],
};
