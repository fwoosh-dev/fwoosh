import * as React from "react";

/**
 * Track whether a value has changed during render.
 *
 * @example
 * function Component({ value }) {
 *   if (useDidChange(value)) {
 *      // do something
 *   }
 *
 *   return <div />
 * }
 */
export function useDidChange<T>(value: T) {
  const prevValue = React.useRef(value);

  if (value !== prevValue.current) {
    prevValue.current = value;
    return true;
  }

  return false;
}
