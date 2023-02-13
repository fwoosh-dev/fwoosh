# v0.0.117 (Mon Feb 13 2023)

#### 🐛 Bug Fix

- Startup Speed Improvements [#67](https://github.com/fwoosh-dev/fwoosh/pull/67) ([@hipstersmoothie](https://github.com/hipstersmoothie))
- don't load all stories to get their metas. be more lazy ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.116 (Sun Feb 12 2023)

#### 🐛 Bug Fix

- Upgrade Deps [#68](https://github.com/fwoosh-dev/fwoosh/pull/68) ([@hipstersmoothie](https://github.com/hipstersmoothie))
- upgrade deps ([@hipstersmoothie](https://github.com/hipstersmoothie))

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
- show tools in docs ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add ability to hide panels/tools in docs mode ([@hipstersmoothie](https://github.com/hipstersmoothie))
- basic rendering of tools in docs ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.111 (Thu Feb 02 2023)

#### ⚠️ Pushed to `main`

- Merge branch 'codehike' ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add way to configure syntax highlighting ([@hipstersmoothie](https://github.com/hipstersmoothie))
- refactor theme into list of objects ([@hipstersmoothie](https://github.com/hipstersmoothie))
- rename type ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.110 (Tue Jan 31 2023)

#### ⚠️ Pushed to `main`

- Let user apply light/dark class (closes #27) ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.96 (Tue Jan 24 2023)

#### ⚠️ Pushed to `main`

- default to not showing docs pages in workbench mode ([@hipstersmoothie](https://github.com/hipstersmoothie))
- Rename storybook to workbench ([@hipstersmoothie](https://github.com/hipstersmoothie))
- fix build ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.95 (Sat Jan 21 2023)

#### ⚠️ Pushed to `main`

- add option to skip indexing on mdx page ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add fullPage option ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.94 (Fri Jan 20 2023)

#### ⚠️ Pushed to `main`

- add ability to fallback to default sorting ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.93 (Fri Jan 20 2023)

#### ⚠️ Pushed to `main`

- refactor toolbar plugin config ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.92 (Tue Jan 17 2023)

#### ⚠️ Pushed to `main`

- add panel disabling ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add panel hiding and docs for params ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add type support for params ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.84 (Sun Jan 15 2023)

#### ⚠️ Pushed to `main`

- add basename option ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.82 (Sun Jan 15 2023)

#### ⚠️ Pushed to `main`

- build time docs ([@hipstersmoothie](https://github.com/hipstersmoothie))
- embed sort order in build instead of using websocket (makes build simpler) ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.81 (Fri Jan 13 2023)

#### ⚠️ Pushed to `main`

- add modifyViteConfig hook ([@hipstersmoothie](https://github.com/hipstersmoothie))
- upgrade vite ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.77 (Fri Jan 13 2023)

#### ⚠️ Pushed to `main`

- switch to rehype toc so that we also parse markdown headings ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.75 (Tue Jan 10 2023)

#### ⚠️ Pushed to `main`

- add component override theming ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add token theming ([@hipstersmoothie](https://github.com/hipstersmoothie))
- adds docs for react hooks ([@hipstersmoothie](https://github.com/hipstersmoothie))
- story + meta decorators ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add more readmes ([@hipstersmoothie](https://github.com/hipstersmoothie))
- move more types ([@hipstersmoothie](https://github.com/hipstersmoothie))
- improve virtual file loading experience ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))
