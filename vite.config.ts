import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Isolate Three.js into its own async chunk — only loaded by engines
          if (id.includes("node_modules/three")) return "vendor-three";
          // Rapier WASM bundle in its own chunk
          if (id.includes("@dimforge/rapier3d-compat")) return "vendor-rapier";
          // html-to-image utility
          if (id.includes("html-to-image")) return "vendor-screenshot";
        },
      },
    },
    // Raise warning threshold — Three.js is intentionally large and lazy-loaded
    chunkSizeWarningLimit: 900,
  },
});
