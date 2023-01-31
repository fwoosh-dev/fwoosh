import React, { useMemo } from "react";
import { components } from "@fwoosh/components";
import * as mdx from "@mdx-js/react";
import * as jsxRuntime from "react/jsx-runtime";
import { CH } from "@code-hike/mdx/components";

// requestIdleCallback types found here: https://github.com/microsoft/TypeScript/issues/21309
type RequestIdleCallbackHandle = number;
type RequestIdleCallbackOptions = {
  timeout?: number;
};
type RequestIdleCallbackDeadline = {
  readonly didTimeout: boolean;
  timeRemaining: () => number;
};

declare global {
  interface Window {
    requestIdleCallback: (
      callback: (deadline: RequestIdleCallbackDeadline) => void,
      opts?: RequestIdleCallbackOptions
    ) => RequestIdleCallbackHandle;
    cancelIdleCallback: (handle: RequestIdleCallbackHandle) => void;
  }
}

const allComponents = {
  ...components,
  CH,
};

/**
 * Renders compiled source from next-mdx-remote/serialize.
 */
export function MDXRemote({ compiledSource }: { compiledSource: string }) {
  const Content: React.ElementType = useMemo(() => {
    const fullScope = Object.assign({ opts: { ...mdx, ...jsxRuntime } });
    const keys = Object.keys(fullScope);
    const values = Object.values(fullScope);

    // now we eval the source code using a function constructor
    // in order for this to work we need to have React, the mdx createElement,
    // and all our components in scope for the function, which is the case here
    // we pass the names (via keys) in as the function's args, and execute the
    // function with the actual values.
    console.log("compiledSource", compiledSource);
    const hydrateFn = Reflect.construct(
      Function,
      keys.concat(`${compiledSource}`)
    );

    return hydrateFn.apply(hydrateFn, values).default;
  }, [compiledSource]);

  // wrapping the content with MDXProvider will allow us to customize the standard
  // markdown components (such as "h1" or "a") with the "components" object
  return (
    <mdx.MDXProvider components={allComponents as any}>
      <Content />
    </mdx.MDXProvider>
  );
}
