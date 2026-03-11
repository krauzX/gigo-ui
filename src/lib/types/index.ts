import type { Snippet } from "svelte";
import type {
  HTMLAttributes,
  HTMLButtonAttributes,
  HTMLInputAttributes,
  HTMLFormAttributes,
} from "svelte/elements";

export interface GigoBaseProps {
  chaos?: boolean;
  chaosLevel?: number; // 0-10
  educational?: boolean;
  a11yWarning?: boolean;
  class?: string;
}

export type ButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link"
  | "chaos-primary"
  | "chaos-destructive"
  | "chaos-nightmare";

export type ButtonSize =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "chaos-sm"
  | "chaos-lg"
  | "chaos-xl";

export interface GigoButtonProps extends GigoBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  escapeOnHover?: boolean;
  randomizeText?: boolean;
  multiClickRequired?: number;
  children?: Snippet;
  onclick?: HTMLButtonAttributes["onclick"];
}

export type InputType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "tel"
  | "url"
  | "search";

export interface GigoInputProps extends GigoBaseProps {
  type?: InputType;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  randomDelete?: boolean;
  escapeOnFocus?: boolean;
  fakeValidation?: boolean;
  randomizeType?: boolean;
  oninput?: HTMLInputAttributes["oninput"];
  onchange?: HTMLInputAttributes["onchange"];
}

export interface GigoModalProps extends GigoBaseProps {
  open?: boolean;
  title?: string;
  resistClose?: boolean;
  escapeModal?: boolean;
  fakeCloseButtons?: boolean;
  spawnMoreModals?: boolean;
  onclose?: () => void;
  children?: Snippet;
  footer?: Snippet;
}

export interface GigoCardProps extends GigoBaseProps {
  title?: string;
  description?: string;
  randomRotation?: boolean;
  resistClicks?: boolean;
  zIndexWar?: boolean;
  children?: Snippet;
  header?: Snippet;
  footer?: Snippet;
  onclick?: HTMLAttributes<HTMLDivElement>["onclick"];
}

export interface CarouselSlide {
  id: string;
  content: string;
  image?: string;
}

export interface GigoCarouselProps extends GigoBaseProps {
  slides: CarouselSlide[];
  autoplay?: boolean;
  interval?: number;
  lyingNavigation?: boolean;
  reverseDirection?: boolean;
  randomJumps?: boolean;
  infiniteFakeSlides?: boolean;
  onslidechange?: (index: number) => void;
}

export interface FormField {
  id: string;
  label: string;
  type: InputType;
  placeholder?: string;
  required?: boolean;
}

export interface GigoFormProps extends GigoBaseProps {
  fields: FormField[];
  submitLabel?: string;
  randomReset?: boolean;
  fakeValidation?: boolean;
  alwaysFails?: boolean;
  shuffleFields?: boolean;
  onsubmit?: (data: Record<string, string>) => void;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon?: string;
}

export interface GigoNavProps extends GigoBaseProps {
  items: NavItem[];
  wrongDestinations?: boolean;
  randomReorder?: boolean;
  fakeLoading?: boolean;
}

export interface GigoChaosButtonProps extends GigoBaseProps {
  label?: string;
  onclick?: HTMLButtonAttributes["onclick"];
}

export interface GigoChaosFormProps extends GigoBaseProps {
  onsubmit?: (data: Record<string, string>) => void;
}

export interface GigoGhostCardProps {
  title?: string;
  description?: string;
  class?: string;
}

export interface GigoGravityInputProps {
  value?: string;
  placeholder?: string;
  class?: string;
}

export interface GigoRotaryDialProps {
  value?: string;
  maxDigits?: number;
  class?: string;
}

export interface GigoSliderPhoneProps {
  value?: string;
  digitCount?: number;
  class?: string;
}

export interface GigoCatchSubmitProps {
  label?: string;
  onsubmit?: () => void;
  class?: string;
}

export interface GigoDropdownCalcProps {
  value?: string;
  class?: string;
}

export interface GigoPasswordPeepholeProps {
  value?: string;
  placeholder?: string;
  class?: string;
}

export interface GigoVolumeSliderProps {
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  invertDirection?: boolean;
  jumpAround?: boolean;
  fakeLabels?: boolean;
  class?: string;
}

export interface GigoProgressDoomProps {
  targetMs?: number;
  goBackwards?: boolean;
  stall?: boolean;
  lieAboutCompletion?: boolean;
  onComplete?: () => void;
  class?: string;
}

export interface GigoColorPickerWrongProps {
  value?: string;
  offsetHue?: boolean;
  swapChannels?: boolean;
  delayUpdate?: boolean;
  class?: string;
}

export interface GigoTermsSidescrollProps {
  content?: string;
  accepted?: boolean;
  rotateText?: boolean;
  scrambleOnScroll?: boolean;
  sidewaysScroll?: boolean;
  class?: string;
}

export type ChaosIntensity = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
