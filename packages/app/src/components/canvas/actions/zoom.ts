import { TLPointerInfo } from "@tldraw/core";
import Vec from "@tldraw/vec";
import type { Action } from "../constants";
import { mutables } from "../mutables.js";

export const zoomIn: Action = (data) => {
  const { camera } = data.pageState;
  const i = Math.round((data.pageState.camera.zoom * 100) / 25);
  const zoom = Math.min(5, (i + 1) * 0.25);
  const center = [
    mutables.rendererBounds.width / 2,
    mutables.rendererBounds.height / 2,
  ];
  const p0 = Vec.sub(Vec.div(center, camera.zoom), center);
  const p1 = Vec.sub(Vec.div(center, zoom), center);
  const point = Vec.toFixed(Vec.add(camera.point, Vec.sub(p1, p0)));

  data.pageState.camera.zoom = zoom;
  data.pageState.camera.point = point;
};

export const zoomOut: Action = (data) => {
  const { camera } = data.pageState;
  const i = Math.round((data.pageState.camera.zoom * 100) / 25);
  const zoom = Math.max(0.25, (i - 1) * 0.25);
  const center = [
    mutables.rendererBounds.width / 2,
    mutables.rendererBounds.height / 2,
  ];
  const p0 = Vec.sub(Vec.div(center, camera.zoom), center);
  const p1 = Vec.sub(Vec.div(center, zoom), center);
  const point = Vec.toFixed(Vec.add(camera.point, Vec.sub(p1, p0)));

  data.pageState.camera.zoom = zoom;
  data.pageState.camera.point = point;
};

export const pinchCamera: Action = (data, payload: TLPointerInfo) => {
  const { camera } = data.pageState;
  const nextZoom = payload.delta[2];
  const nextPoint = Vec.sub(camera.point, Vec.div(payload.delta, camera.zoom));
  const p0 = Vec.sub(Vec.div(payload.point, camera.zoom), nextPoint);
  const p1 = Vec.sub(Vec.div(payload.point, nextZoom), nextPoint);
  data.pageState.camera.point = Vec.toFixed(
    Vec.add(nextPoint, Vec.sub(p1, p0))
  );
  data.pageState.camera.zoom = nextZoom;
};

export const panCamera: Action = (data, payload: TLPointerInfo) => {
  const { point, zoom } = data.pageState.camera;
  data.pageState.camera.point = Vec.sub(point, Vec.div(payload.delta, zoom));
};
