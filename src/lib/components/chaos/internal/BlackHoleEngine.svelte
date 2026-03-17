<!-- Gravitational singularity — Canvas2D particle warp -->
<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { mountPortalCanvas, loadImage, rand } from '$lib/utils/destruction-engine.js';

  interface Props {
    snapshot: string;
    rect: DOMRect;
    resolution?: number;
    intensity?: number;   // 0–10 suck speed
    glowColor?: string;   // CSS colour for the accretion ring
    debugMode?: boolean;
  }

  let {
    snapshot, rect,
    resolution = 4,
    intensity = 7,
    glowColor = 'rgba(255,120,0,0.7)',
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

    const ctx = canvas.getContext('2d')!;
    ctx.scale(dpr, dpr);

    const img = await loadImage(snapshot);

    // Sample at resolution
    const cols = Math.ceil(rect.width  / resolution);
    const rows = Math.ceil(rect.height / resolution);

    const offscreen  = new OffscreenCanvas(cols, rows);
    const offCtx     = offscreen.getContext('2d')!;
    offCtx.drawImage(img, 0, 0, cols, rows);
    const imgData    = offCtx.getImageData(0, 0, cols, rows);
    const pixels     = imgData.data;

    // Singularity centre in canvas coords
    const bx = rect.left + rect.width  / 2;
    const by = rect.top  + rect.height / 2;

    interface Particle {
      x: number; y: number;
      ox: number; oy: number; // origin
      r: number; g: number; b: number; a: number;
      alive: boolean;
    }

    const particles: Particle[] = [];

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const pIdx = (row * cols + col) * 4;
        if (pixels[pIdx + 3] < 10) continue;
        const px = rect.left + col * resolution;
        const py = rect.top  + row * resolution;
        particles.push({
          x: px, y: py, ox: px, oy: py,
          r: pixels[pIdx], g: pixels[pIdx + 1], b: pixels[pIdx + 2],
          a: pixels[pIdx + 3] / 255,
          alive: true,
        });
      }
    }

    const pw = resolution;
    let t = 0;  // normalised time 0→1

    // Accretion glow ring radii
    let ringR = Math.max(rect.width, rect.height) * 0.55;

    function tick() {
      if (destroyed) return;
      ctx.clearRect(0, 0, vw, vh);

      t += 0.012 * (1 + intensity * 0.08);

      // Strength grows exponentially — slow suck at first, violent at end
      const s = Math.pow(t, 2.2) * intensity * 0.18;

      // ── Accretion disk glow ──────────────────────────────────────────────
      ringR = Math.max(rect.width, rect.height) * 0.55 * (1 - t * 0.9);
      if (ringR > 1) {
        const grad = ctx.createRadialGradient(bx, by, ringR * 0.3, bx, by, ringR);
        grad.addColorStop(0,   'transparent');
        grad.addColorStop(0.6, glowColor);
        grad.addColorStop(1,   'transparent');
        ctx.globalAlpha = Math.min(t * 2, 1) * 0.8;
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(bx, by, ringR, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      // ── Dark core that grows ─────────────────────────────────────────────
      const coreR = ringR * 0.25 * t;
      if (coreR > 0.5) {
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(bx, by, coreR, 0, Math.PI * 2);
        ctx.fill();
      }

      let anyAlive = false;

      particles.forEach((p) => {
        if (!p.alive) return;

        const dx = bx - p.x;
        const dy = by - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy) + 0.001;

        // Gravitational acceleration (stronger near centre)
        const accel = s * (1 / (dist * 0.05 + 1));
        p.x += (dx / dist) * accel;
        p.y += (dy / dist) * accel;

        // Swirl tangential component (accretion disk spin)
        const swirl = s * 0.5;
        p.x += (-dy / dist) * swirl;
        p.y +=  (dx / dist) * swirl;

        // Fade as they approach centre
        const newDist = Math.sqrt((bx - p.x) ** 2 + (by - p.y) ** 2);
        p.a = Math.max(0, p.a - (newDist < 8 ? 0.1 : 0.002));

        if (newDist < 3 || p.a <= 0) { p.alive = false; return; }

        anyAlive = true;

        // Particle redness increases near singularity (gravitational redshift effect)
        const heat = Math.min((1 - newDist / Math.max(rect.width, rect.height)) * 2, 1);
        const rs = Math.min(255, p.r + heat * 80);
        const gs = Math.max(0, p.g  - heat * 60);
        const bs = Math.max(0, p.b  - heat * 120);

        ctx.fillStyle = `rgba(${rs|0},${gs|0},${bs|0},${p.a})`;
        ctx.fillRect(p.x, p.y, pw, pw);
      });

      if (anyAlive || t < 1) rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);
  });

  onDestroy(() => {
    destroyed = true;
    cancelAnimationFrame(rafId);
    disposeCallbacks.forEach((fn) => fn());
  });
</script>
