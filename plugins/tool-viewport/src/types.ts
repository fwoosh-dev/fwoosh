import devices from "devices-viewport-size";

export interface Size {
  width: number;
  height: number;
  name: string;
}

export type Device = keyof typeof devices;

export const SetSizeEvent = "fwoosh-viewport:set-size";

export interface ViewportParameters {
  defaultSize?: Device | Device[];
}
