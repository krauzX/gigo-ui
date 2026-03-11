export interface PropDoc {
  name: string;
  type: string;
  default: string;
  description: string;
}

export interface ComponentDoc {
  name: string;
  slug: string;
  emoji: string;
  category: "badui" | "chaos" | "standard";
  tagline: string;
  description: string;
  usage: string;
  props: PropDoc[];
}
