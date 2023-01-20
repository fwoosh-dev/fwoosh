# `@fwoosh/{{kebab}}`

{{description}}

## Installation

To use this decorator install the package.

```sh
npm i --save-dev @fwoosh/{{kebab}}`
# or
yarn add -D @fwoosh/{{kebab}}`
```

## Usage

This decorator work at the story level:

```tsx
import { centered } from "@fwoosh/{{kebab}}";

export const Example: Story = () => <div>Foo</div>;

Example.decorator = [centered];
```

At the file level:

```tsx
import { centered } from "@fwoosh/{{kebab}}";

export const meta: StoryMeta = {
  title: "Components/Example",
  component: Example,
  decorators: [centered],
};
```

And globally in a setup file:

```tsx
import { centered } from "@fwoosh/{{kebab}}";
import { Decorator } from "@fwoosh/react";

export const decorators: Decorator[] = [centered];
```
