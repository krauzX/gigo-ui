// Shared helpers for Breaker Overlay engines

export interface DOMRect4 {
  left: number;
  top: number;
  width: number;
  height: number;
}

// DOM px -> NDC [-1,1]
export function domToNDC(
  x: number,
  y: number,
  viewportW: number,
  viewportH: number,
): [number, number] {
  return [(x / viewportW) * 2 - 1, -(y / viewportH) * 2 + 1];
}

// Grid cell -> NDC centre
export function cellToNDC(
  rect: DOMRect4,
  col: number,
  row: number,
  cols: number,
  rows: number,
  viewportW: number,
  viewportH: number,
): [number, number] {
  const cellW = rect.width / cols;
  const cellH = rect.height / rows;
  const cx = rect.left + col * cellW + cellW / 2;
  const cy = rect.top + row * cellH + cellH / 2;
  return domToNDC(cx, cy, viewportW, viewportH);
}

// Scroll-aware Y
export function scrollAwareY(domY: number, scrollY: number): number {
  return domY - scrollY;
}

// UV offset/repeat for one grid cell
export function cellUV(
  col: number,
  row: number,
  cols: number,
  rows: number,
): { offsetX: number; offsetY: number; repeatX: number; repeatY: number } {
  return {
    offsetX: col / cols,
    offsetY: 1 - (row + 1) / rows, // flip Y for WebGL
    repeatX: 1 / cols,
    repeatY: 1 / rows,
  };
}

export interface SnapshotResult {
  dataURL: string;
  width: number;
  height: number;
  rect: DOMRect;
}

// Snapshot element as PNG data URL (lazy imports html-to-image)
export async function captureSnapshot(
  el: HTMLElement,
): Promise<SnapshotResult> {
  const { toPng } = await import("html-to-image");
  const rect = el.getBoundingClientRect();
  const dpr = window.devicePixelRatio ?? 1;

  const dataURL = await toPng(el, {
    pixelRatio: dpr,
    width: rect.width,
    height: rect.height,
    style: {
      margin: "0",
      padding: "0",
      transform: "none",
      borderRadius: "0",
    },
  });

  return { dataURL, width: rect.width * dpr, height: rect.height * dpr, rect };
}

// data URL -> HTMLImageElement

export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

// Fixed overlay canvas on document.body
export function mountPortalCanvas(
  width: number,
  height: number,
  zIndex = 9999,
): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  Object.assign(canvas.style, {
    position: "fixed",
    inset: "0",
    width: "100vw",
    height: "100vh",
    pointerEvents: "none",
    zIndex: String(zIndex),
  });
  document.body.appendChild(canvas);
  return canvas;
}

export function rand(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

export function randSign(): number {
  return Math.random() > 0.5 ? 1 : -1;
}
