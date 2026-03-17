export type { PropDoc, ComponentDoc } from "./types.js";
export { categories } from "./categories.js";

import { ghostCard } from "./components/badui/ghost-card.js";
import { gravityInput } from "./components/badui/gravity-input.js";
import { rotaryDial } from "./components/badui/rotary-dial.js";
import { sliderPhone } from "./components/badui/slider-phone.js";
import { catchSubmit } from "./components/badui/catch-submit.js";
import { dropdownCalc } from "./components/badui/dropdown-calc.js";
import { passwordPeekhole } from "./components/badui/password-peekhole.js";
import { volumeSlider } from "./components/badui/volume-slider.js";
import { progressDoom } from "./components/badui/progress-doom.js";
import { colorPickerWrong } from "./components/badui/color-picker-wrong.js";
import { termsSidescroll } from "./components/badui/terms-sidescroll.js";
import { chaosButton } from "./components/chaos/chaos-button.js";
import { chaosForm } from "./components/chaos/chaos-form.js";
import { gigoCompactor } from "./components/chaos/gigo-compactor.js";
import { shatterPane } from "./components/chaos/shatter-pane.js";
import { pixelDissolve } from "./components/chaos/pixel-dissolve.js";
import { blackHoleSink } from "./components/chaos/black-hole-sink.js";
import { button } from "./components/standard/button.js";
import { input } from "./components/standard/input.js";
import { modal } from "./components/standard/modal.js";
import { card } from "./components/standard/card.js";
import { carousel } from "./components/standard/carousel.js";
import { form } from "./components/standard/form.js";
import { navigation } from "./components/standard/navigation.js";

import type { ComponentDoc } from "./types.js";

export const componentDocs: ComponentDoc[] = [
  ghostCard,
  gravityInput,
  rotaryDial,
  sliderPhone,
  catchSubmit,
  dropdownCalc,
  passwordPeekhole,
  volumeSlider,
  progressDoom,
  colorPickerWrong,
  termsSidescroll,
  chaosButton,
  chaosForm,
  gigoCompactor,
  shatterPane,
  pixelDissolve,
  blackHoleSink,
  button,
  input,
  modal,
  card,
  carousel,
  form,
  navigation,
];

export function getComponentsByCategory(
  category: ComponentDoc["category"],
): ComponentDoc[] {
  return componentDocs.filter((c) => c.category === category);
}

export function getComponentBySlug(slug: string): ComponentDoc | undefined {
  return componentDocs.find((c) => c.slug === slug);
}
