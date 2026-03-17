<!-- Voxel crush engine — Three.js InstancedMesh + Rapier3D rigid bodies -->
<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import {
    mountPortalCanvas,
    loadImage,
    cellUV,
    rand,
    randSign,
  } from '$lib/utils/destruction-engine.js';

  interface Props {
    snapshot: string;
    rect: DOMRect;
    cols?: number;
    rows?: number;
    intensity?: number;
    debugMode?: boolean;
  }

  let {
    snapshot, rect,
    cols = 20, rows = 20,
    intensity = 7,
    debugMode = false,
  }: Props = $props();

  let canvas: HTMLCanvasElement | null = null;
  let rafId = 0;
  let destroyed = false;
  let cleanup: Array<() => void> = [];

  onMount(async () => {
    const [THREE, RAPIER] = await Promise.all([
      import('three'),
      import('@dimforge/rapier3d-compat'),
    ]);
    await RAPIER.init();
    if (destroyed) return;

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const dpr = window.devicePixelRatio ?? 1;

    // portal canvas — fixed overlay
    canvas = mountPortalCanvas(vw * dpr, vh * dpr);
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';

    const renderer = new THREE.WebGLRenderer({
      canvas, alpha: true, antialias: true, powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(dpr);
    renderer.setSize(vw, vh, false);
    cleanup.push(() => renderer.dispose());

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 1000);
    camera.position.z = 10;

    // texture from snapshot
    const img = await loadImage(snapshot);
    const texture = new THREE.Texture(img);
    texture.needsUpdate = true;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    cleanup.push(() => texture.dispose());

    // cell dimensions in NDC space
    const cellW = (rect.width / vw) * 2 / cols;
    const cellH = (rect.height / vh) * 2 / rows;
    const depth = Math.min(cellW, cellH) * 0.5;
    const total = cols * rows;

    const geo = new THREE.BoxGeometry(cellW, cellH, depth);
    cleanup.push(() => geo.dispose());

    // per-instance UV data so each shard shows its own slice
    const uvOff = new Float32Array(total * 2);
    const uvRep = new Float32Array(total * 2);
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const i = r * cols + c;
        const uv = cellUV(c, r, cols, rows);
        uvOff[i * 2] = uv.offsetX;
        uvOff[i * 2 + 1] = uv.offsetY;
        uvRep[i * 2] = uv.repeatX;
        uvRep[i * 2 + 1] = uv.repeatY;
      }
    }

    const material = new THREE.ShaderMaterial({
      uniforms: { uTexture: { value: texture } },
      vertexShader: `
        attribute vec2 instanceUVOffset;
        attribute vec2 instanceUVRepeat;
        varying vec2 vUV;
        void main() {
          vUV = uv * instanceUVRepeat + instanceUVOffset;
          gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(position, 1.0);
        }`,
      fragmentShader: `
        uniform sampler2D uTexture;
        varying vec2 vUV;
        void main() {
          gl_FragColor = texture2D(uTexture, vUV);
          if (gl_FragColor.a < 0.01) discard;
        }`,
      transparent: true,
    });
    cleanup.push(() => material.dispose());

    const mesh = new THREE.InstancedMesh(geo, material, total);
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    geo.setAttribute('instanceUVOffset', new THREE.InstancedBufferAttribute(uvOff, 2));
    geo.setAttribute('instanceUVRepeat', new THREE.InstancedBufferAttribute(uvRep, 2));
    scene.add(mesh);

    // physics
    const world = new RAPIER.World({ x: 0, y: -9.81 * (1 + intensity * 0.3), z: 0 });
    cleanup.push(() => world.free());

    // floor
    world.createCollider(RAPIER.ColliderDesc.cuboid(10, 0.01, 10).setTranslation(0, -1.05, 0));

    // rect origin in NDC
    const ndcL = (rect.left / vw) * 2 - 1;
    const ndcT = -((rect.top / vh) * 2 - 1);
    const cx = ndcL + (rect.width / vw);
    const cy = ndcT - (rect.height / vh);

    const dummy = new THREE.Object3D();
    const bodies: ReturnType<typeof world.createRigidBody>[] = [];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = ndcL + (c + 0.5) * cellW;
        const y = ndcT - (r + 0.5) * cellH;

        const body = world.createRigidBody(
          RAPIER.RigidBodyDesc.dynamic()
            .setTranslation(x, y, 0)
            .setLinearDamping(0.2)
            .setAngularDamping(0.3)
        );

        world.createCollider(
          RAPIER.ColliderDesc.cuboid(cellW * 0.45, cellH * 0.45, depth * 0.45)
            .setRestitution(0.25).setFriction(0.6),
          body
        );

        // implosion toward centre
        const dx = cx - x, dy = cy - y;
        const dist = Math.sqrt(dx * dx + dy * dy) + 0.001;
        const str = intensity * 0.8;
        body.applyImpulse({ x: (dx / dist) * str, y: (dy / dist) * str, z: rand(-0.1, 0.1) }, true);
        body.applyTorqueImpulse({ x: randSign() * rand(0, 0.05), y: randSign() * rand(0, 0.05), z: randSign() * rand(0, 0.3) }, true);

        bodies.push(body);
      }
    }

    // gravity kick after implosion phase
    setTimeout(() => {
      if (destroyed) return;
      bodies.forEach((b) => b.applyImpulse({ x: 0, y: -intensity * 0.4, z: 0 }, true));
    }, 500);

    function tick() {
      if (destroyed) return;
      world.step();
      for (let i = 0; i < total; i++) {
        const t = bodies[i].translation();
        const q = bodies[i].rotation();
        dummy.position.set(t.x, t.y, t.z);
        dummy.quaternion.set(q.x, q.y, q.z, q.w);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
      }
      mesh.instanceMatrix.needsUpdate = true;
      renderer.render(scene, camera);
      rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);
  });

  onDestroy(() => {
    destroyed = true;
    cancelAnimationFrame(rafId);
    cleanup.forEach((fn) => fn());
    canvas?.remove();
  });
</script>
