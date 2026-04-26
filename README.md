# 🌀 @gigo-ui/components

### _High-Performance Components for Low-Performance Experiences._

[![Svelte](https://img.shields.io/badge/Svelte-5.0+-FF3E00?logo=svelte&logoColor=white)](https://svelte.dev)
[![SvelteKit](https://img.shields.io/badge/SvelteKit-2.0+-FF3E00?logo=svelte&logoColor=white)](https://svelte.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4.0+-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A Svelte 5 component library of intentionally terrible UI patterns. Every component is production-quality code implementing the worst UX ideas imaginable.

Built with modern runes (`$state`, `$derived`, `$effect`, `$bindable`), TypeScript, and Tailwind CSS 4.

---

## Install

```bash
pnpm add @gigo-ui/components
```

## Styles (Required)

Import the package stylesheet once near your app root:

```svelte
<script lang="ts">
  import '@gigo-ui/components/globals.css';
</script>
```

The stylesheet includes Tailwind v4 directives and `@source` scanning for this package, so utility classes used inside components are generated in consumer builds.

To customize theme tokens, override variables after importing the package CSS:

```css
/* app.css */
@import "@gigo-ui/components/globals.css";

:root {
  --primary: #2563eb;
  --background: #ffffff;
  --foreground: #111827;
}
```

## Quick Start

```svelte
<script lang="ts">
  import '@gigo-ui/components/globals.css';
  import { ShatterPane, CatchSubmit } from '@gigo-ui/components';

  let broken = $state(false);
</script>

<ShatterPane bind:isShattered={broken}>
  <div class="card">
    <h2>Fragile Content</h2>
    <CatchSubmit label="Submit" />
  </div>
</ShatterPane>

<button onclick={() => broken = true}>Break it</button>
```

---

## Components

### 🌪 Chaos (Destruction Overlays)

Wrap any component. One function call and it's physically destroyed.

| Component         | Effect                           | Engine                                 |
| :---------------- | :------------------------------- | :------------------------------------- |
| **GigoCompactor** | Voxel crush implosion            | Three.js InstancedMesh + Rapier3D WASM |
| **ShatterPane**   | Voronoi glass fracture           | Canvas2D + physics sim                 |
| **PixelDissolve** | Per-pixel wave contagion         | Canvas2D particle system               |
| **BlackHoleSink** | Gravitational singularity        | Canvas2D warp + accretion glow         |
| **ChaosButton**   | Button with random chaos effects | CSS transforms                         |
| **ChaosForm**     | Form that fights back            | DOM manipulation                       |

### 😈 BadUI (Hostile Interactions)

Technically functional. Emotionally devastating.

| Component            | What it does                              |
| :------------------- | :---------------------------------------- |
| **RotaryDial**       | Rotary phone dial for number input        |
| **GravityInput**     | Characters fall with gravity as you type  |
| **PasswordPeekhole** | Tiny draggable circle to view password    |
| **ProgressDoom**     | Progress bar that regresses randomly      |
| **CatchSubmit**      | Submit button that runs from your cursor  |
| **SliderPhone**      | Single slider for entering phone numbers  |
| **GhostCard**        | Cards that vanish and reappear corrupted  |
| **DropdownCalc**     | Dropdown menus for basic arithmetic       |
| **VolumeSlider**     | Deliberately confusing volume control     |
| **ColorPickerWrong** | Color picker that picks the wrong color   |
| **TermsSidescroll**  | Terms of service in a horizontal scroller |
| **CookieMonster**    | Cookie banner from hell with dark patterns |
| **NotificationStorm**| Toast notifications that multiply on dismiss|
| **CaptchaFromHell**  | Impossible multi-stage CAPTCHA verification |

### 🛠 Standard (The Bait)

Normal, usable components to lull users into a false sense of security.

| Component      | Purpose         |
| :------------- | :-------------- |
| **Button**     | Standard button |
| **Card**       | Content card    |
| **Carousel**   | Image carousel  |
| **Form**       | Form container  |
| **Input**      | Text input      |
| **Modal**      | Dialog overlay  |
| **Navigation** | Nav component   |

---

## Breaker Overlays

The destruction overlays are the flagship feature. They snapshot any wrapped content, then destroy it with real physics:

```svelte
<script lang="ts">
  import { GigoCompactor } from '@gigo-ui/components';

  let compactor: GigoCompactor;
</script>

<GigoCompactor bind:this={compactor} cols={20} rows={20} intensity={8}>
  <div class="card">This will be voxelized</div>
</GigoCompactor>

<button onclick={() => compactor.crush()}>Crush</button>
<button onclick={() => compactor.restore()}>Restore</button>
```

Each overlay lazy-loads its engine only when triggered. Three.js, Rapier WASM, and html-to-image are all dynamically imported — zero cost until destruction begins.

| Overlay       | Method                     | Prop          | Size                  |
| :------------ | :------------------------- | :------------ | :-------------------- |
| GigoCompactor | `crush()` / `restore()`    | `isGarbage`   | ~180KB (Three+Rapier) |
| ShatterPane   | `shatter()` / `restore()`  | `isShattered` | ~2KB                  |
| PixelDissolve | `dissolve()` / `restore()` | `isDead`      | ~2KB                  |
| BlackHoleSink | `consume()` / `restore()`  | `isConsumed`  | ~2KB                  |

---

## Requirements

- Svelte 5.0+
- SvelteKit 2.0+
- Tailwind CSS 4.0+
- TypeScript 5.0+

## License

MIT
