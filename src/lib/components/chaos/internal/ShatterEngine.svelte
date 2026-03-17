<!-- Voronoi glass shatter — Canvas2D physics -->
<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import {
    mountPortalCanvas,
    loadImage,
    rand,
    randSign,
  } from '$lib/utils/destruction-engine.js';

  interface Props {
    snapshot: string;
    rect: DOMRect;
    shardCount?: number;
    intensity?: number;
    tint?: string;        // CSS colour for glass tint overlay
    debugMode?: boolean;
  }

  let {
    snapshot,
    rect,
    shardCount = 48,
    intensity = 7,
    tint = 'rgba(180,220,255,0.08)',
    debugMode = false,
  }: Props = $props();

  let destroyed = false;
  let rafId = 0;
  let disposeCallbacks: Array<() => void> = [];

  // approximate Voronoi cells from random seeds
  function generateShards(w: number, h: number, n: number) {
    // Random seed points
    const seeds = Array.from({ length: n }, () => ({ x: rand(0, w), y: rand(0, h) }));

    // Simple Lloyd's relaxation (1 pass) for better distribution
    const relaxed = seeds.map((s) => {
      const neighbors = seeds.filter((o) => {
        const dx = o.x - s.x, dy = o.y - s.y;
        return dx * dx + dy * dy < (w * h) / n * 4;
      });
      const cx = neighbors.reduce((a, b) => a + b.x, 0) / neighbors.length;
      const cy = neighbors.reduce((a, b) => a + b.y, 0) / neighbors.length;
      return { x: (s.x + cx) / 2, y: (s.y + cy) / 2 };
    });

    // For each seed, approximate its Voronoi cell with 16 boundary samples
    return relaxed.map((seed) => {
      const angles = Array.from({ length: 16 }, (_, i) => (i / 16) * Math.PI * 2);
      const verts = angles.map((angle) => {
        // March outward until we're closer to another seed
        let r = 2;
        const step = Math.max(w, h) / 100;
        while (r < Math.max(w, h)) {
          const px = seed.x + Math.cos(angle) * r;
          const py = seed.y + Math.sin(angle) * r;
          const distSelf = (px - seed.x) ** 2 + (py - seed.y) ** 2;
          const closerExists = relaxed.some((other) => {
            if (other === seed) return false;
            return (px - other.x) ** 2 + (py - other.y) ** 2 < distSelf;
          });
          if (closerExists) return { x: seed.x + Math.cos(angle) * (r - step), y: seed.y + Math.sin(angle) * (r - step) };
          r += step;
        }
        return { x: seed.x + Math.cos(angle) * r, y: seed.y + Math.sin(angle) * r };
      });
      return { seed, verts };
    });
  }


  interface PhysicsShard {
    verts: Array<{ x: number; y: number }>;
    cx: number; cy: number;
    vx: number; vy: number;
    angV: number;
    angle: number;
    opacity: number;
    // snapshot clip region for this shard
    imgOffX: number; imgOffY: number;
  }

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

    // Scale rect to fit canvas coord space (canvas is already dpr-scaled via ctx.scale)
    const rx = rect.left, ry = rect.top, rw = rect.width, rh = rect.height;

    const rawShards = generateShards(rw, rh, shardCount);
    const g = intensity / 10;  // gravity multiplier 0–1

    // Build physics state
    const shards: PhysicsShard[] = rawShards.map(({ seed, verts }) => {
      const cx = rx + seed.x;
      const cy = ry + seed.y;
      // Outward impulse from element centre
      const ecx = rx + rw / 2;
      const ecy = ry + rh / 2;
      const dx = cx - ecx, dy = cy - ecy;
      const dist = Math.sqrt(dx * dx + dy * dy) + 0.001;
      const speed = rand(1, 5) * (1 + g * 3);
      return {
        verts: verts.map((v) => ({ x: rx + v.x, y: ry + v.y })),
        cx, cy,
        vx: (dx / dist) * speed,
        vy: (dy / dist) * speed * 0.5 - rand(0, 3),
        angV: randSign() * rand(0.005, 0.04) * (1 + g),
        angle: 0,
        opacity: 1,
        imgOffX: rx,
        imgOffY: ry,
      };
    });

    let startTime: number | null = null;

    function tick(ts: number) {
      if (destroyed) return;
      if (startTime === null) startTime = ts;

      const elapsed = (ts - startTime) / 1000; // seconds

      ctx.clearRect(0, 0, vw, vh);

      let allSettled = true;

      shards.forEach((s) => {
        // Physics step
        s.vy += 9.81 * intensity * 0.05;  // gravity
        s.cx += s.vx;
        s.cy += s.vy;
        s.angle += s.angV;
        s.vx *= 0.995;  // air resistance
        s.vy *= 0.995;
        s.angV *= 0.99;

        // Floor bounce-then-settle
        if (s.cy > vh + 200) {
          s.opacity = Math.max(0, s.opacity - 0.02);
        }

        if (s.opacity > 0) allSettled = false;

        if (s.opacity <= 0) return;

        ctx.save();
        ctx.translate(s.cx, s.cy);
        ctx.rotate(s.angle);
        ctx.translate(-s.cx, -s.cy);
        ctx.globalAlpha = s.opacity;

        // Clip to shard polygon
        ctx.beginPath();
        s.verts.forEach((v, i) => {
          if (i === 0) ctx.moveTo(v.x, v.y);
          else ctx.lineTo(v.x, v.y);
        });
        ctx.closePath();
        ctx.clip();

        // Draw snapshot slice
        ctx.drawImage(img, -s.imgOffX + s.cx - s.cx, -s.imgOffY + s.cy - s.cy,
          // Actually simply draw full image and let clip do the work
          rw, rh,
          rx - s.imgOffX + 0, ry - s.imgOffY + 0, // offset is already in verts
          rw, rh
        );

        // Tint overlay (glass effect)
        ctx.fillStyle = tint;
        ctx.fill();

        // Crack line highlight
        ctx.strokeStyle = 'rgba(255,255,255,0.35)';
        ctx.lineWidth = 0.8;
        ctx.stroke();

        ctx.restore();
      });

      if (!allSettled) {
        rafId = requestAnimationFrame(tick);
      }
    }

    rafId = requestAnimationFrame(tick);
  });

  onDestroy(() => {
    destroyed = true;
    cancelAnimationFrame(rafId);
    disposeCallbacks.forEach((fn) => fn());
  });
</script>
