# v0.0.121 (Wed Feb 15 2023)

#### 🐛 Bug Fix

- Dev setup [#73](https://github.com/fwoosh-dev/fwoosh/pull/73) ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add dep linting ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add import linting ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add hooks plugin ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add eslint ([@hipstersmoothie](https://github.com/hipstersmoothie))
- set up turbo ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.117 (Mon Feb 13 2023)

#### 🐛 Bug Fix

- Startup Speed Improvements [#67](https://github.com/fwoosh-dev/fwoosh/pull/67) ([@hipstersmoothie](https://github.com/hipstersmoothie))
- attempt to solve mismatched tooltip providers ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.116 (Sun Feb 12 2023)

#### 🐛 Bug Fix

- Upgrade Deps [#68](https://github.com/fwoosh-dev/fwoosh/pull/68) ([@hipstersmoothie](https://github.com/hipstersmoothie))
- upgrade deps ([@hipstersmoothie](https://github.com/hipstersmoothie))
- switch to workspace:* ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.114 (Sat Feb 11 2023)

### Release Notes

#### Render tools and panels in docs ([#62](https://github.com/fwoosh-dev/fwoosh/pull/62))

### Panel/Tools in Docs

Instead of the prop tables and source code we used to render in the docs:

<img width="968" alt="CleanShot 2023-02-09 at 01 26 10@2x" src="https://user-images.githubusercontent.com/1192452/217771843-0ca1539b-6624-44e9-bb8c-703966ed9d2b.png">

Now it reuses the panels and tools from the workbench:

<img width="858" alt="CleanShot 2023-02-09 at 01 26 59@2x" src="https://user-images.githubusercontent.com/1192452/217772104-0bd4a745-d6f7-4a54-99ae-313502744af8.png">

Panels and tools can be configured to be hidden in the docs view. This way you can have dev only plugins for `/workbench`.

### Improved Meta and Story Types

Meta and story types just became a whole lot easier!

Instead of having to import every decorator type to use on `fwoosh`'s generic `Story` and `Meta` you can provide your `config` to them and declare the types globally!

```tsx
import type { FwooshOptions } from "fwoosh";
import type {
  StoryMeta as ReactStoryMeta,
  Story as ReactStory,
} from "@fwoosh/react";

const config = {
   // your config
} satisfies FwooshOptions;

declare module "fwoosh" {
  type Meta = ReactStoryMeta<typeof config>;
  type Story = ReactStory<Meta>;
}
```

Now writing stories is clean and you don't have to worry about types.

```tsx
import * as React from "react";
import type { StoryMeta, Story } from "fwoosh";
import { Button } from "./Button";

export const meta: StoryMeta = {
  title: "Components/Buttons/Button",
  component: Button,
  parameters: {
    designs: "https://www.figma.com/file/LKQ4FJ4bTnCSjedbRpk931/Sample-File",
  },
};

/**
 * The default story.
 */
export const Playground: StoryMeta = () => {
  return <Button onClick={action("onClick")}>Click me</Button>;
};
```

---

#### 🐛 Bug Fix

- Render tools and panels in docs [#62](https://github.com/fwoosh-dev/fwoosh/pull/62) ([@hipstersmoothie](https://github.com/hipstersmoothie))
- Merge remote-tracking branch 'origin/main' into tools-in-docs ([@hipstersmoothie](https://github.com/hipstersmoothie))
- basic rendering of tools in docs ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.111 (Thu Feb 02 2023)

#### ⚠️ Pushed to `main`

- Merge branch 'codehike' ([@hipstersmoothie](https://github.com/hipstersmoothie))
- use code hike more ([@hipstersmoothie](https://github.com/hipstersmoothie))
- refactor all usage to MDXContent ([@hipstersmoothie](https://github.com/hipstersmoothie))
- move mdxcontent and style for source panel ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.106 (Mon Jan 30 2023)

#### ⚠️ Pushed to `main`

- fix all overlapping while loading ([@hipstersmoothie](https://github.com/hipstersmoothie))
- rename story ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.96 (Tue Jan 24 2023)

#### ⚠️ Pushed to `main`

- add commands to open canvas ([@hipstersmoothie](https://github.com/hipstersmoothie))
- basic canvas mode working ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.95 (Sat Jan 21 2023)

#### ⚠️ Pushed to `main`

- add select component ([@hipstersmoothie](https://github.com/hipstersmoothie))
- fix menu overflow ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add dropdown component ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add tooltip ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.89 (Mon Jan 16 2023)

#### ⚠️ Pushed to `main`

- lighter font ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.88 (Mon Jan 16 2023)

#### ⚠️ Pushed to `main`

- lighter font ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.86 (Mon Jan 16 2023)

#### ⚠️ Pushed to `main`

- fix sticky quick nav ([@hipstersmoothie](https://github.com/hipstersmoothie))
- set up root error element ([@hipstersmoothie](https://github.com/hipstersmoothie))
- fix margin collapse ([@hipstersmoothie](https://github.com/hipstersmoothie))
- fix show code button in wrong place ([@hipstersmoothie](https://github.com/hipstersmoothie))
- fix page switch buttons to bottom ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.82 (Sun Jan 15 2023)

#### ⚠️ Pushed to `main`

- rename to useDocgen ([@hipstersmoothie](https://github.com/hipstersmoothie))
- got build to pass - still doens't work ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.81 (Fri Jan 13 2023)

#### ⚠️ Pushed to `main`

- move react back to peer ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add missing dep ([@hipstersmoothie](https://github.com/hipstersmoothie))
- move react to non peer dep ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.77 (Fri Jan 13 2023)

#### ⚠️ Pushed to `main`

- implement story comment search ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add story comment search ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add command palette and story switching ([@hipstersmoothie](https://github.com/hipstersmoothie))
- switch to rehype toc so that we also parse markdown headings ([@hipstersmoothie](https://github.com/hipstersmoothie))
- fix errors ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.76 (Tue Jan 10 2023)

#### ⚠️ Pushed to `main`

- add component override theming ([@hipstersmoothie](https://github.com/hipstersmoothie))
- update breakpoint ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add token theming ([@hipstersmoothie](https://github.com/hipstersmoothie))
- rely on theme more ([@hipstersmoothie](https://github.com/hipstersmoothie))
- fix cod preview scrolling ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add more readmes ([@hipstersmoothie](https://github.com/hipstersmoothie))
- move more types ([@hipstersmoothie](https://github.com/hipstersmoothie))
- fix tall quick navs ([@hipstersmoothie](https://github.com/hipstersmoothie))
- improve quick nav colors ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.75 (Sat Jan 07 2023)

#### ⚠️ Pushed to `main`

- add current heading highlight ([@hipstersmoothie](https://github.com/hipstersmoothie))
- make gutter widths even ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add prev/next page buttons ([@hipstersmoothie](https://github.com/hipstersmoothie))
- get quick nav working for mdx pages ([@hipstersmoothie](https://github.com/hipstersmoothie))
- fix props link ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add root error boundary ([@hipstersmoothie](https://github.com/hipstersmoothie))
- more docs ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add links feature ([@hipstersmoothie](https://github.com/hipstersmoothie))
- fix chevron alignment ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.72 (Thu Jan 05 2023)

#### ⚠️ Pushed to `main`

- move error boundary into components ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.58 (Wed Jan 04 2023)

#### ⚠️ Pushed to `main`

- add tabs docs ([@hipstersmoothie](https://github.com/hipstersmoothie))
- clean up spinners ([@hipstersmoothie](https://github.com/hipstersmoothie))
- fix chevron size/color ([@hipstersmoothie](https://github.com/hipstersmoothie))
- align spacing across panels ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add stories for testing ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.57 (Tue Jan 03 2023)

#### ⚠️ Pushed to `main`

- render pop table descriptions from markdown to html ([@hipstersmoothie](https://github.com/hipstersmoothie))
- minor layout improvements ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.52 (Tue Jan 03 2023)

#### ⚠️ Pushed to `main`

- add props loading placeholder ([@hipstersmoothie](https://github.com/hipstersmoothie))
- more ui improvements ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.51 (Mon Jan 02 2023)

#### ⚠️ Pushed to `main`

- improve ui a lil ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.49 (Mon Jan 02 2023)

#### ⚠️ Pushed to `main`

- organize code and fix header in docs mode ([@hipstersmoothie](https://github.com/hipstersmoothie))
- improve sidebar tree rendering ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.45 (Sat Dec 31 2022)

#### ⚠️ Pushed to `main`

- upgrade radix ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.40 (Sat Dec 31 2022)

#### ⚠️ Pushed to `main`

- remove extra char ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.38 (Sat Dec 31 2022)

#### ⚠️ Pushed to `main`

- fix long story list ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.33 (Fri Dec 30 2022)

#### ⚠️ Pushed to `main`

- only render properties title when there are properties ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add bottom margin to h3 ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.29 (Tue Dec 27 2022)

#### ⚠️ Pushed to `main`

- make react a peer dep ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.27 (Tue Dec 27 2022)

#### ⚠️ Pushed to `main`

- fix build ([@hipstersmoothie](https://github.com/hipstersmoothie))
- update page spacing ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.22 (Sun Dec 04 2022)

#### ⚠️ Pushed to `main`

- fix dep (lisowski54@gmail.com)

#### Authors: 1

- Andrew Lisowski (lisowski54@gmail.com)

---

# v0.0.20 (Sun Dec 04 2022)

#### 🐛 Bug Fix

- Bump version to: v0.0.19 \[skip ci\] ([@hipstersmoothie](https://github.com/hipstersmoothie))
- Bump version to: v0.0.18 \[skip ci\] ([@hipstersmoothie](https://github.com/hipstersmoothie))
- Bump version to: v0.0.17 \[skip ci\] ([@hipstersmoothie](https://github.com/hipstersmoothie))
- Bump version to: v0.0.16 \[skip ci\] ([@hipstersmoothie](https://github.com/hipstersmoothie))
- Update CHANGELOG.md \[skip ci\] ([@hipstersmoothie](https://github.com/hipstersmoothie))
- Bump version to: v0.0.15 \[skip ci\] ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### ⚠️ Pushed to `main`

- add publish config ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.16 (Sun Dec 04 2022)

#### 🐛 Bug Fix

- Bump version to: v0.0.15 \[skip ci\] (lisowski54@gmail.com)

#### Authors: 1

- Andrew Lisowski (lisowski54@gmail.com)
