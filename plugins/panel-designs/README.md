# `@fwoosh/panel-designs`

Display your designs for you component right along with your stories

## Installation

To use this plugin first install the package:

```sh
npm i --save-dev @fwoosh/panel-designs`
# or
yarn add -D @fwoosh/panel-designs`
```

Then add it to your `fwoosh.config.ts`:

```ts
export const config: FwooshConfig = {
  plugins: ["@fwoosh/panel-designs`"],
};
```

## Usage

To use this plugin you can either configure a link to your design in the file meta:

```tsx
export const meta: StoryMeta = {
  parameters: {
    designs: "https://figma.com/file/ASDF",
  },
};
```

or directly on a story:

```tsx
export const BasicStory = () => {};

BasicStory.parameters = {
  designs: "https://figma.com/file/ASDF",
};
```

## Options

### `hideWithoutParams`

Only show the panel if there are parameters configured for the story.

```tsx
import { FwooshOptions } from "fwoosh";
import DesignsPanel from "@fwoosh/panel-designs";

export const config: FwooshOptions = {
  plugins: [new DesignsPanel({ hideWithoutParams: true })],
};
```
