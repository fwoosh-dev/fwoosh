import React, { useMemo } from "react";
import * as mdx from "@mdx-js/react";
import * as jsxRuntime from "react/jsx-runtime";
import { CH } from "@code-hike/mdx/components";

import { components } from "./components.js";

const allComponents = {
  ...components,
  CH,
};

export function MDXContent({ compiledSource }: { compiledSource: string }) {
  const Content: React.ElementType = useMemo(() => {
    const fullScope = Object.assign({ opts: { ...mdx, ...jsxRuntime } });
    const keys = Object.keys(fullScope);
    const values = Object.values(fullScope);

    // now we eval the source code using a function constructor
    // in order for this to work we need to have React, the mdx createElement,
    // and all our components in scope for the function, which is the case here
    // we pass the names (via keys) in as the function's args, and execute the
    // function with the actual values.
    const hydrateFn = Reflect.construct(
      Function,
      keys.concat(`${compiledSource}`)
    );

    return hydrateFn.apply(hydrateFn, values).default;
  }, [compiledSource]);

  // wrapping the content with MDXProvider will allow us to customize the standard
  // markdown components (such as "h1" or "a") with the "components" object
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <mdx.MDXProvider components={allComponents as any}>
      <Content />
    </mdx.MDXProvider>
  );
}
