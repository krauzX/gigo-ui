import type { ComponentDoc } from "../../types.js";

export const captchaFromHell: ComponentDoc = {
  name: "CaptchaFromHell",
  slug: "captcha-from-hell",
  emoji: "🤖",
  category: "badui",
  tagline: "CAPTCHA verification designed to never pass",
  description:
    "A multi-stage impossible verification flow. Stage 1: select grid images containing abstract concepts like 'existential dread'. Stage 2: solve unsolvable math (0÷0, P=NP). Stage 3: match a slider target under impossible time pressure. Every answer is wrong. After enough failed attempts, a tiny shame-filled skip button appears.",
  usage: `<script lang="ts">
  import { CaptchaFromHell } from '@gigo-ui/components';
</script>

<CaptchaFromHell
  onverify={() => console.log('Somehow verified')}
/>`,
  props: [
    {
      name: "onverify",
      type: "() => void",
      default: "undefined",
      description: "Fires when user finally passes (unlikely)",
    },
    {
      name: "class",
      type: "string",
      default: "''",
      description: "Additional CSS classes",
    },
  ],
};
