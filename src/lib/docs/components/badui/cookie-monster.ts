import type { ComponentDoc } from "../../types.js";

export const cookieMonster: ComponentDoc = {
  name: "CookieMonster",
  slug: "cookie-monster",
  emoji: "🍪",
  category: "badui",
  tagline: "The cookie banner from everyone's nightmares",
  description:
    "A cookie consent overlay that embodies every dark pattern in the book: a massive pulsing 'Accept All' button, a microscopic reject button that physically runs from your cursor, a fake ✕ that secretly accepts cookies, shame-based decline copy, and the banner actually grows larger with each failed dismissal attempt.",
  usage: `<script lang="ts">
  import { CookieMonster } from '@gigo-ui/components';

  let showCookies = $state(true);
</script>

<CookieMonster
  bind:visible={showCookies}
  onaccept={() => console.log('Accepted (or tricked into it)')}
  onreject={() => console.log('Somehow escaped')}
/>`,
  props: [
    {
      name: "visible",
      type: "boolean",
      default: "true",
      description: "Controls banner visibility (bindable)",
    },
    {
      name: "onaccept",
      type: "() => void",
      default: "undefined",
      description: "Fires when user accepts (or is tricked into accepting)",
    },
    {
      name: "onreject",
      type: "() => void",
      default: "undefined",
      description: "Fires if user somehow manages to reject",
    },
    {
      name: "class",
      type: "string",
      default: "''",
      description: "Additional CSS classes",
    },
  ],
};
