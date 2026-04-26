import type { ComponentDoc } from "../../types.js";

export const notificationStorm: ComponentDoc = {
  name: "NotificationStorm",
  slug: "notification-storm",
  emoji: "🔔",
  category: "badui",
  tagline: "Dismiss one, spawn two — a hydra of toasts",
  description:
    "A notification panel where every dismissed toast spawns two replacements. Features increasingly absurd messages, color-coded severity levels, a 'Mark All Read' button that generates 10 more, and real-time stats tracking your futile battle against the notification hydra.",
  usage: `<script lang="ts">
  import { NotificationStorm } from '@gigo-ui/components';
</script>

<NotificationStorm autoStart maxVisible={6} />`,
  props: [
    {
      name: "autoStart",
      type: "boolean",
      default: "true",
      description: "Spawn initial notifications automatically",
    },
    {
      name: "maxVisible",
      type: "number",
      default: "8",
      description: "Maximum toasts visible at once",
    },
    {
      name: "class",
      type: "string",
      default: "''",
      description: "Additional CSS classes",
    },
  ],
};
