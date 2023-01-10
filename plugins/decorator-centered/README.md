# `@fwoosh/decorator-centered`

Center a story in the preview area.

## Installation

To use this decorator install the package:

```sh
npm i --save-dev @fwoosh/decorator-centered`
# or
yarn add -D @fwoosh/decorator-centered`
```

## Usage

This decorator work at the story level:

```tsx
import { centered } from "@fwoosh/decorator-centered";

export const Example = () => <div>Foo</div>;

Example.decorator = [centered];
```

At the file level:

```tsx
import { centered } from "@fwoosh/decorator-centered";

export const meta: StoryMeta = {
  title: "Components/Example",
  component: Example,
  decorators: [centered],
};
```
