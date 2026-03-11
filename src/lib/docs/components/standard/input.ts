import type { ComponentDoc } from "../../types.js";

export const input: ComponentDoc = {
  name: "Input",
  slug: "input",
  emoji: "✏️",
  category: "standard",
  tagline: "Text input with chaos features",
  description:
    "A styled text input that optionally deletes characters randomly, escapes when focused, shows fake validation errors, and changes its type (text/password/email) unpredictably.",
  usage: `<script lang="ts">
  import { Input } from '@gigo-ui/components';
  let value = $state('');
</script>

<Input bind:value placeholder="Type here..." />
<Input bind:value chaos randomDelete fakeValidation />`,
  props: [
    {
      name: "type",
      type: "InputType",
      default: "'text'",
      description: "Input type",
    },
    {
      name: "value",
      type: "string",
      default: "''",
      description: "Current value (bindable)",
    },
    {
      name: "placeholder",
      type: "string",
      default: "''",
      description: "Placeholder text",
    },
    {
      name: "chaos",
      type: "boolean",
      default: "false",
      description: "Enable chaos mode",
    },
    {
      name: "randomDelete",
      type: "boolean",
      default: "false",
      description: "Randomly deletes characters",
    },
    {
      name: "escapeOnFocus",
      type: "boolean",
      default: "false",
      description: "Input moves when focused",
    },
    {
      name: "fakeValidation",
      type: "boolean",
      default: "false",
      description: "Shows fake error messages",
    },
    {
      name: "randomizeType",
      type: "boolean",
      default: "false",
      description: "Changes input type randomly",
    },
  ],
};
