import type { ComponentDoc } from "../../types.js";

export const dropdownCalc: ComponentDoc = {
  name: "Dropdown Calculator",
  slug: "dropdown-calc",
  emoji: "🔢",
  category: "badui",
  tagline: "Every digit selected via dropdown menus",
  description:
    "A calculator where every digit of both operands and the operator must be selected from individual dropdown menus. Supports +, -, ×, ÷ with proper division-by-zero handling.",
  usage: `<script lang="ts">
  import { DropdownCalc } from '@gigo-ui/components';
  let value = $state('');
</script>

<DropdownCalc bind:value />`,
  props: [
    {
      name: "value",
      type: "string",
      default: "''",
      description: "Current calculation result (bindable)",
    },
    {
      name: "class",
      type: "string",
      default: "''",
      description: "Additional CSS classes",
    },
  ],
};
