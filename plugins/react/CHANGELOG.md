# v0.0.117 (Mon Feb 13 2023)

#### 🐛 Bug Fix

- Startup Speed Improvements [#67](https://github.com/fwoosh-dev/fwoosh/pull/67) ([@hipstersmoothie](https://github.com/hipstersmoothie))
- fix effects ([@hipstersmoothie](https://github.com/hipstersmoothie))
- fix startup errors ([@hipstersmoothie](https://github.com/hipstersmoothie))
- fix access error ([@hipstersmoothie](https://github.com/hipstersmoothie))

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

# v0.0.115 (Sat Feb 11 2023)

### Release Notes

#### Fix some react issues ([#66](https://github.com/fwoosh-dev/fwoosh/pull/66))

This release will fix some errors at the console for incompatibilities between react versions it should now always use the user's version of react without errors.

---

#### 🐛 Bug Fix

- Fix some react issues [#66](https://github.com/fwoosh-dev/fwoosh/pull/66) ([@hipstersmoothie](https://github.com/hipstersmoothie))
- support user react version better ([@hipstersmoothie](https://github.com/hipstersmoothie))

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

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.113 (Sat Feb 11 2023)

#### 🐛 Bug Fix

- fix(docs): show `FwooshOptions` in docs [#64](https://github.com/fwoosh-dev/fwoosh/pull/64) ([@msutkowski](https://github.com/msutkowski) [@hipstersmoothie](https://github.com/hipstersmoothie))
- typo: lightening -> lightning ([@msutkowski](https://github.com/msutkowski))
- rename FwooshConfig to FwooshOptions in docs ([@msutkowski](https://github.com/msutkowski))

#### Authors: 2

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))
- Matt Sutkowski ([@msutkowski](https://github.com/msutkowski))

---

# v0.0.111 (Thu Feb 02 2023)

#### ⚠️ Pushed to `main`

- Merge branch 'codehike' ([@hipstersmoothie](https://github.com/hipstersmoothie))
- use code hike more ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.110 (Tue Jan 31 2023)

#### ⚠️ Pushed to `main`

- fix canvas mode stories not rendering ([@hipstersmoothie](https://github.com/hipstersmoothie))
- reuse react root if we can ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.109 (Mon Jan 30 2023)

#### ⚠️ Pushed to `main`

- use createRoot if available ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.106 (Mon Jan 30 2023)

#### ⚠️ Pushed to `main`

- fix story rendering in docs view ([@hipstersmoothie](https://github.com/hipstersmoothie))
- rename story ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.104 (Sat Jan 28 2023)

#### ⚠️ Pushed to `main`

- Merge branch 'groups' ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.95 (Sat Jan 21 2023)

#### ⚠️ Pushed to `main`

- pass params to more of the storybook ui and through to renderer ([@hipstersmoothie](https://github.com/hipstersmoothie))
- let decorators render tooltips ([@hipstersmoothie](https://github.com/hipstersmoothie))
- fix decorator order switching ([@hipstersmoothie](https://github.com/hipstersmoothie))
- fix rendering multiple decorators ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.92 (Tue Jan 17 2023)

#### ⚠️ Pushed to `main`

- set up designs plugin and use ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add type support for params ([@hipstersmoothie](https://github.com/hipstersmoothie))
- fix deps ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.82 (Sun Jan 15 2023)

#### ⚠️ Pushed to `main`

- improve first story in docs page causing jump ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.81 (Fri Jan 13 2023)

#### ⚠️ Pushed to `main`

- move react back to peer ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add vite react plugin ([@hipstersmoothie](https://github.com/hipstersmoothie))
- move react to non peer dep ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.78 (Fri Jan 13 2023)

#### ⚠️ Pushed to `main`

- fix types export ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.76 (Tue Jan 10 2023)

#### ⚠️ Pushed to `main`

- add support for global decorators ([@hipstersmoothie](https://github.com/hipstersmoothie))
- story + meta decorators ([@hipstersmoothie](https://github.com/hipstersmoothie))
- fix error ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add plugin tempalte ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add more readmes ([@hipstersmoothie](https://github.com/hipstersmoothie))
- improve virtual file loading experience ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add more docs stubs ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.75 (Sat Jan 07 2023)

#### ⚠️ Pushed to `main`

- support TS configuration ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.72 (Thu Jan 05 2023)

#### ⚠️ Pushed to `main`

- add error boundary around react story ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.62 (Wed Jan 04 2023)

#### ⚠️ Pushed to `main`

- re-us ts.Program to speed up type generation ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.47 (Sat Dec 31 2022)

#### ⚠️ Pushed to `main`

- support custom ts compiler options ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.44 (Sat Dec 31 2022)

#### ⚠️ Pushed to `main`

- add error page for story not found ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.26 (Mon Dec 05 2022)

#### ⚠️ Pushed to `main`

- switch typescript jsx output (lisowski54@gmail.com)

#### Authors: 1

- Andrew Lisowski (lisowski54@gmail.com)

---

# v0.0.24 (Mon Dec 05 2022)

#### ⚠️ Pushed to `main`

- add missing peer dep (lisowski54@gmail.com)

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
