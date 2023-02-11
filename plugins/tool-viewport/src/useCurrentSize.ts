import * as React from "react";
import devices from "devices-viewport-size";

import { Device, SetSizeEvent, Size, ViewportParameters } from "./types";
import { useParameters } from "@fwoosh/hooks";

export const sizes: Size[] = Object.entries(devices).map(
  ([name, { width, height }]) => ({
    name,
    width,
    height,
  })
);

interface CustomEventMap {
  "fwoosh-viewport:set-size": CustomEvent<Size[]>;
}

declare global {
  interface Document {
    //adds definition to Document, but you can do the same with HTMLElement
    addEventListener<K extends keyof CustomEventMap>(
      type: K,
      listener: (this: Document, ev: CustomEventMap[K]) => void
    ): void;
    removeEventListener<K extends keyof CustomEventMap>(
      type: K,
      listener: (this: Document, ev: CustomEventMap[K]) => void
    ): void;
  }
}

function arrayify<T>(value: T | T[] | undefined): T[] {
  if (value === undefined) {
    return [];
  }

  return Array.isArray(value) ? value : [value];
}

export function useCurrentSize(defaultValueProp?: Device | Device[]) {
  const params = useParameters<{ viewport: ViewportParameters }>();
  const defaultValue: Device[] = React.useMemo(() => {
    return defaultValueProp
      ? arrayify(defaultValueProp)
      : arrayify(params?.viewport?.defaultSize);
  }, [defaultValueProp, params?.viewport?.defaultSize]);

  const [size, setSize] = React.useState<Size[]>(
    sizes.filter((s) => defaultValue.some((v) => v === s.name))
  );

  // React to changes in the default value
  React.useEffect(() => {
    setSize(sizes.filter((s) => defaultValue.some((v) => v === s.name)));
  }, [defaultValue]);

  // Listen for the custom event
  React.useEffect(() => {
    function onSizeSet(event: CustomEvent<Size[]>) {
      setSize(event.detail);
    }

    document.addEventListener(SetSizeEvent, onSizeSet);

    return () => {
      document.removeEventListener(SetSizeEvent, onSizeSet);
    };
  }, []);

  const onSizeChange = React.useCallback((newSizes: Size[]) => {
    setSize(newSizes);

    // Dispatch event to doc so that toolbar can update
    document.dispatchEvent(
      new CustomEvent(SetSizeEvent, {
        detail: newSizes,
      })
    );
  }, []);

  return [size, onSizeChange] as const;
}
