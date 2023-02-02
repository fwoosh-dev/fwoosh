# `@fwoosh/virtual-file`

Utility function to help create virtual files for fwoosh. Enables authoring in TS but being loaded in a virtual files as plain JS.

## Usage

The following will load the contents of `my-file.ts` as ESM JS.

```js example.js
import { loadVirtualFile } from "@fwoosh/virtual-file";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

// NOTE: Use the .js extension even if it's .ts
await loadVirtualFile(require.resolve("./my-file.js"));
```

## Variables

You can inject variables into loaded files by using `process.env.YOUR_VARIABLE` in your file.

Give this file:

```tsx my-file.ts
export function getVariable() {
  return process.env.YOUR_VARIABLE;
}
```

And this usage:

```tsx my-usage.ts
await loadVirtualFile(require.resolve("./my-file.js"), {
  YOUR_VARIABLE: 1000,
});
```

The virtual file will be:

```tsx output.ts
export function getVariable() {
  return 1000;
}
```
