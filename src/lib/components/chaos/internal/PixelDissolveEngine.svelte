<!-- Per-pixel dissolution with wave contagion — Canvas2D -->
<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { mountPortalCanvas, loadImage, rand, randSign } from '$lib/utils/destruction-engine.js';

  interface Props {
    snapshot: string;
    rect: DOMRect;
    resolution?: number;   // pixel sample step (1 = full, 2 = half, 4 = quarter)
    waveSeed?: number;     // number of initial wave-infection seeds
    intensity?: number;
    debugMode?: boolean;
  }

  let {
    snapshot, rect,
    resolution = 3,
    waveSeed = 8,
    intensity = 7,
    debugMode = false,
  }: Props = $props();

  let destroyed = false;
  let rafId = 0;
  let disposeCallbacks: Array<() => void> = [];

  onMount(async () => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const dpr = window.devicePixelRatio ?? 1;

    const canvas = mountPortalCanvas(vw * dpr, vh * dpr);
    canvas.style.width  = '100vw';
    canvas.style.height = '100vh';
    disposeCallbacks.push(() => canvas.remove());

    const ctx   = canvas.getContext('2d')!;
    ctx.scale(dpr, dpr);

    // Sample the snapshot at reduced resolution
    const offscreen   = new OffscreenCanvas(Math.ceil(rect.width / resolution), Math.ceil(rect.height / resolution));
    const offCtx      = offscreen.getContext('2d')!;
    const img         = await loadImage(snapshot);
    offCtx.drawImage(img, 0, 0, offscreen.width, offscreen.height);
    const imgData     = offCtx.getImageData(0, 0, offscreen.width, offscreen.height);
    const pixels      = imgData.data;

    const cols = offscreen.width;
    const rows = offscreen.height;

    interface Particle {
      x: number; y: number;       // canvas coords
      vx: number; vy: number;
      r: number; g: number; b: number; a: number;
      alive: boolean;
      dissolving: boolean;
      dissolveDelay: number;      // frames before it starts moving
    }

    // Build particle grid
    const grid: (Particle | null)[] = new Array(cols * rows).fill(null);

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const pIdx = (row * cols + col) * 4;
        const a = pixels[pIdx + 3];
        if (a < 10) continue;
        grid[row * cols + col] = {
          x: rect.left + col * resolution,
          y: rect.top  + row * resolution,
          vx: 0, vy: 0,
          r: pixels[pIdx],
          g: pixels[pIdx + 1],
          b: pixels[pIdx + 2],
          a: a / 255,
          alive: true,
          dissolving: false,
          dissolveDelay: 0,
        };
      }
    }

    // Infect initial seeds
    function infect(idx: number, delay = 0) {
      const p = grid[idx];
      if (!p || p.dissolving) return;
      p.dissolving = true;
      p.dissolveDelay = delay;
      const angle = rand(0, Math.PI * 2);
      const speed = rand(0.3, 2.5) * (1 + intensity * 0.15);
      p.vx = Math.cos(angle) * speed * 0.3 + randSign() * rand(0, 0.2);
      p.vy = rand(-speed * 0.5, 0);  // slight upward burst then gravity
    }

    // Wave propagation — spread infection to neighbours each frame
    let infectionFrontiers: number[] = [];

    for (let i = 0; i < waveSeed; i++) {
      const idx = Math.floor(rand(0, cols * rows));
      infect(idx);
      infectionFrontiers.push(idx);
    }

    let frame = 0;
    const gravAccel = 0.12 * (1 + intensity * 0.1);
    const spread = Math.max(1, Math.round(intensity * 0.6));

    function tick() {
      if (destroyed) return;
      frame++;
      ctx.clearRect(0, 0, vw, vh);

      // Spread infection
      const nextFrontier: number[] = [];
      infectionFrontiers.forEach((idx) => {
        const row = Math.floor(idx / cols);
        const col = idx % cols;
        const delayBase = rand(2, 8);
        [[-1, 0], [1, 0], [0, -1], [0, 1]].forEach(([dr, dc]) => {
          if (Math.random() > 0.6) return; // stochastic — looks organic
          const nr = row + dr, nc = col + dc;
          if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) return;
          const nIdx = nr * cols + nc;
          const n = grid[nIdx];
          if (n && !n.dissolving) {
            infect(nIdx, delayBase);
            nextFrontier.push(nIdx);
          }
        });
      });
      infectionFrontiers = nextFrontier;

      let anyAlive = false;
      const pw = resolution;

      for (let i = 0; i < grid.length; i++) {
        const p = grid[i];
        if (!p || !p.alive) continue;

        if (p.dissolving) {
          if (p.dissolveDelay > 0) { p.dissolveDelay--; }
          else {
            p.vy += gravAccel;
            p.vx *= 0.98;
            p.x  += p.vx;
            p.y  += p.vy;
            p.a  -= 0.004;
            if (p.a <= 0 || p.y > vh + 20) { p.alive = false; continue; }
          }
        }

        anyAlive = true;
        ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${p.a})`;
        ctx.fillRect(p.x, p.y, pw, pw);
      }

      if (anyAlive) rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);
  });

  onDestroy(() => {
    destroyed = true;
    cancelAnimationFrame(rafId);
    disposeCallbacks.forEach((fn) => fn());
  });
</script>
