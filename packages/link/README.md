# `@fwoosh/link`

A component to help linking between pages in your fwoosh website.

Sometimes you want to link to another page in your website.
You can do this by using the following syntax:

```tsx
<Link to="Title/Path">Go to path</Link>
```

## Installation

To install the package.

```sh
npm i --save-dev @fwoosh/link
# or
yarn add -D @fwoosh/link
```

## Usage

You can use a `Link` in javscript or typescript

```tsx
import { Link } from "@fwoosh/link";

export const Example = () => {
  return <Link to="Welcome">Go to welcome page</Link>;
};
```

Or in MDX:

```mdx
import { Link } from "@fwoosh/link";

<Link to="Welcome">Go to welcome page</Link>
```

## Examples

### MDX page

Given the following MDX file:

```mdx
---
title: Getting Started/Welcome
---
```

You can link to it from another page:

```tsx
<Link to="Getting Started/Welcome">Go to path</Link>
```

### Story page

Given the following story file:

```tsx
export const meta: StoryMeta = {
  title: "Components/Button",
};
```

You can link to it from another page:

```tsx
<Link to="Components/Button">Go to path</Link>
```

> NOTE: In workbench mode this will link to the first story,
> and in docs mode will link to the story's generated docs page.

### Specific Story

Given the following story file:

```tsx
export const meta: StoryMeta = {
  title: "Components/Button",
};

export const Basic = () => <div />;
```

You can link to it from another page:

```tsx
<Link to="Components/Button/Basic">Go to path</Link>
```
