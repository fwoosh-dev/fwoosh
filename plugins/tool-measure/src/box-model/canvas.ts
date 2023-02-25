interface Size {
  width: number;
  height: number;
}

interface CanvasState {
  canvas?: HTMLCanvasElement;
  context?: CanvasRenderingContext2D;
  width?: number;
  height?: number;
}

function getDocumentWidthAndHeight(el: HTMLElement) {
  const height = Math.max(el.scrollHeight, el.offsetHeight);
  const width = Math.max(el.scrollWidth, el.offsetWidth);
  return { width, height };
}

function createCanvas(id: string): CanvasState {
  const canvas = document.createElement("canvas");
  canvas.id = "fwoosh-addon-measure";
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Canvas is not supported in this browser");
  }

  const el = document.getElementById(id);

  if (!el) {
    throw new Error("Can't find element with id " + id);
  }

  // Set canvas width & height
  const { width, height } = getDocumentWidthAndHeight(el);
  setCanvasWidthAndHeight(canvas, context, { width, height });
  // Position canvas
  canvas.style.position = "absolute";
  canvas.style.left = "0";
  canvas.style.top = "0";
  canvas.style.zIndex = "2147483647";
  // Disable any user interactions
  canvas.style.pointerEvents = "none";
  el.appendChild(canvas);

  return { canvas, context, width, height };
}

function setCanvasWidthAndHeight(
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  { width, height }: Size
) {
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  // Scale
  const scale = typeof window === "undefined" ? 1 : window.devicePixelRatio;
  canvas.width = Math.floor(width * scale);
  canvas.height = Math.floor(height * scale);

  // Normalize coordinate system to use css pixels.
  context.scale(scale, scale);
}

let state: CanvasState = {};

export function init(id: string) {
  if (!state.canvas) {
    state = createCanvas(id);
  }
}

export function clear() {
  if (
    state.context &&
    typeof state.width !== "undefined" &&
    typeof state.height !== "undefined"
  ) {
    state.context.clearRect(0, 0, state.width, state.height);
  }
}

export function draw(callback: (context: CanvasRenderingContext2D) => void) {
  clear();
  if (state.context) {
    callback(state.context);
  }
}

export function rescale(id: string) {
  if (!state.canvas || !state.context) {
    throw new Error("Canvas is not initialized");
  }

  // First reset so that the canvas size doesn't impact the container size
  setCanvasWidthAndHeight(state.canvas, state.context, { width: 0, height: 0 });

  const el = document.getElementById(id);

  if (!el) {
    throw new Error("Can't find element with id " + id);
  }

  const { width, height } = getDocumentWidthAndHeight(el);
  setCanvasWidthAndHeight(state.canvas, state.context, { width, height });

  // update state
  state.width = width;
  state.height = height;
}

export function destroy() {
  if (state.canvas?.parentNode) {
    clear();
    state.canvas.parentNode.removeChild(state.canvas);
    state = {};
  }
}
