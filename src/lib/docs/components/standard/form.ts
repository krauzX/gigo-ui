import type { ComponentDoc } from "../../types.js";

export const form: ComponentDoc = {
  name: "Form",
  slug: "form",
  emoji: "📋",
  category: "standard",
  tagline: "Form that sabotages submissions",
  description:
    "A composable form with configurable fields that optionally resets random fields, shows fake validation, always fails submission, and shuffles field order periodically.",
  usage: `<script lang="ts">
  import { Form } from '@gigo-ui/components';
  import type { FormField } from '@gigo-ui/components';

  const fields: FormField[] = [
    { id: 'name', label: 'Name', type: 'text', required: true },
    { id: 'email', label: 'Email', type: 'email', required: true },
  ];
</script>

<Form {fields} chaos randomReset alwaysFails />`,
  props: [
    {
      name: "fields",
      type: "FormField[]",
      default: "[]",
      description: "Form field definitions",
    },
    {
      name: "chaos",
      type: "boolean",
      default: "false",
      description: "Enable chaos mode",
    },
    {
      name: "randomReset",
      type: "boolean",
      default: "false",
      description: "Randomly clears fields",
    },
    {
      name: "fakeValidation",
      type: "boolean",
      default: "false",
      description: "Shows fake errors",
    },
    {
      name: "alwaysFails",
      type: "boolean",
      default: "false",
      description: "Submission always fails",
    },
    {
      name: "shuffleFields",
      type: "boolean",
      default: "false",
      description: "Reorders fields periodically",
    },
  ],
};
