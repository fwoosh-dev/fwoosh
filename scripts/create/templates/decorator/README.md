# `@fwoosh/decorator-{{kebab}}`

{{description}}

## Installation

To use this decorator install the package.

```sh
npm i --save-dev @fwoosh/decorator-{{kebab}}`
# or
yarn add -D @fwoosh/decorator-{{kebab}}`
```

## Usage

This decorator work at the story level:

```tsx
import { centered } from "@fwoosh/decorator-{{kebab}}";

export const Example: Story = () => <div>Foo</div>;

Example.decorator = [centered];
```

At the file level:

```tsx
import { centered } from "@fwoosh/decorator-{{kebab}}";

export const meta: StoryMeta = {
  title: "Components/Example",
  component: Example,
  decorators: [centered],
};
```

And globally in a setup file:

```tsx
import { centered } from "@fwoosh/decorator-{{kebab}}";
import { Decorator } from "@fwoosh/react";

export const decorators: Decorator[] = [centered];
```
