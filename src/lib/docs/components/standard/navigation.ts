import type { ComponentDoc } from "../../types.js";

export const navigation: ComponentDoc = {
  name: "Navigation",
  slug: "navigation",
  emoji: "🧭",
  category: "standard",
  tagline: "Nav bar with deceptive links",
  description:
    "A horizontal navigation bar where chaos mode makes links navigate to wrong destinations, reorders items periodically, and shows fake loading spinners before navigating.",
  usage: `<script lang="ts">
  import { Navigation } from '@gigo-ui/components';
  import type { NavItem } from '@gigo-ui/components';

  const items: NavItem[] = [
    { id: 'home', label: 'Home', href: '/', icon: '🏠' },
    { id: 'about', label: 'About', href: '/about', icon: '📄' },
  ];
</script>

<Navigation {items} chaos wrongDestinations fakeLoading />`,
  props: [
    {
      name: "items",
      type: "NavItem[]",
      default: "[]",
      description: "Navigation items array",
    },
    {
      name: "chaos",
      type: "boolean",
      default: "false",
      description: "Enable chaos mode",
    },
    {
      name: "wrongDestinations",
      type: "boolean",
      default: "false",
      description: "Links go to wrong places",
    },
    {
      name: "randomReorder",
      type: "boolean",
      default: "false",
      description: "Items reorder periodically",
    },
    {
      name: "fakeLoading",
      type: "boolean",
      default: "false",
      description: "Shows fake loading spinner",
    },
  ],
};
