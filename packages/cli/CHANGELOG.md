# v0.0.117 (Mon Feb 13 2023)

#### 🐛 Bug Fix

- Startup Speed Improvements [#67](https://github.com/fwoosh-dev/fwoosh/pull/67) ([@hipstersmoothie](https://github.com/hipstersmoothie))
- ignore common root dirs ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add mdx dep to optimize ([@hipstersmoothie](https://github.com/hipstersmoothie))
- don't load all stories to get their metas. be more lazy ([@hipstersmoothie](https://github.com/hipstersmoothie))
- fix story paths ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add panels and toolbars too ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add stories as entries ([@hipstersmoothie](https://github.com/hipstersmoothie))
- default to opening workbench ([@hipstersmoothie](https://github.com/hipstersmoothie))
- fix startup errors ([@hipstersmoothie](https://github.com/hipstersmoothie))
- fix inserting env var in hooks package ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add cache for story parse ([@hipstersmoothie](https://github.com/hipstersmoothie))
- cache html generation ([@hipstersmoothie](https://github.com/hipstersmoothie))
- improve initial load by generating mdx on demand ([@hipstersmoothie](https://github.com/hipstersmoothie))
- switch to grey-matter for speed. improves MDX front matter parsing ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add --perf flag ([@hipstersmoothie](https://github.com/hipstersmoothie))
- fix running clean before build ([@hipstersmoothie](https://github.com/hipstersmoothie))

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
- fix react-dom-client alias ([@hipstersmoothie](https://github.com/hipstersmoothie))
- support user react version better ([@hipstersmoothie](https://github.com/hipstersmoothie))
- fix warning about react-dom not being installed to optimize ([@hipstersmoothie](https://github.com/hipstersmoothie))

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
- add story expander ([@hipstersmoothie](https://github.com/hipstersmoothie))
- basic rendering of tools in docs ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.113 (Sat Feb 11 2023)

#### 🐛 Bug Fix

- fix(docs): show `FwooshOptions` in docs [#64](https://github.com/fwoosh-dev/fwoosh/pull/64) ([@msutkowski](https://github.com/msutkowski) [@hipstersmoothie](https://github.com/hipstersmoothie))
- typo: lightening -> lightning ([@msutkowski](https://github.com/msutkowski))

#### Authors: 2

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))
- Matt Sutkowski ([@msutkowski](https://github.com/msutkowski))

---

# v0.0.111 (Thu Feb 02 2023)

#### ⚠️ Pushed to `main`

- Merge branch 'codehike' ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add way to configure syntax highlighting ([@hipstersmoothie](https://github.com/hipstersmoothie))
- refactor theme into list of objects ([@hipstersmoothie](https://github.com/hipstersmoothie))
- update shiki theme to dark ([@hipstersmoothie](https://github.com/hipstersmoothie))
- use code hike more ([@hipstersmoothie](https://github.com/hipstersmoothie))
- move mdxcontent and style for source panel ([@hipstersmoothie](https://github.com/hipstersmoothie))
- get it kinda working ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.108 (Mon Jan 30 2023)

#### ⚠️ Pushed to `main`

- fix workbench showing first docs page as default (closes #55) ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.106 (Mon Jan 30 2023)

#### ⚠️ Pushed to `main`

- actually fix build ([@hipstersmoothie](https://github.com/hipstersmoothie))
- fix build command ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.104 (Sat Jan 28 2023)

#### ⚠️ Pushed to `main`

- build time shapes ([@hipstersmoothie](https://github.com/hipstersmoothie))
- Merge branch 'groups' ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.96 (Tue Jan 24 2023)

#### ⚠️ Pushed to `main`

- default to not showing docs pages in workbench mode ([@hipstersmoothie](https://github.com/hipstersmoothie))
- Rename storybook to workbench ([@hipstersmoothie](https://github.com/hipstersmoothie))
- ensure 1 instance of react-router ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.95 (Sat Jan 21 2023)

#### ⚠️ Pushed to `main`

- add option to skip indexing on mdx page ([@hipstersmoothie](https://github.com/hipstersmoothie))

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

- fix bug with spaceing in names ([@hipstersmoothie](https://github.com/hipstersmoothie))
- refactor toolbar plugin config ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.92 (Tue Jan 17 2023)

#### ⚠️ Pushed to `main`

- add panel disabling ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add panel hiding and docs for params ([@hipstersmoothie](https://github.com/hipstersmoothie))
- move resolve meta into util ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.87 (Mon Jan 16 2023)

#### ⚠️ Pushed to `main`

- fix build ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.86 (Mon Jan 16 2023)

#### ⚠️ Pushed to `main`

- build all search pages at build time ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add serve command ([@hipstersmoothie](https://github.com/hipstersmoothie))
- detect invalid links during build ([@hipstersmoothie](https://github.com/hipstersmoothie))
- fix dev mode base name ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.85 (Sun Jan 15 2023)

#### ⚠️ Pushed to `main`

- add SPA redirects for gh-pages ([@hipstersmoothie](https://github.com/hipstersmoothie))

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

- factor out getConfig function ([@hipstersmoothie](https://github.com/hipstersmoothie))
- set up mdx searching ([@hipstersmoothie](https://github.com/hipstersmoothie))
- improve first story in docs page causing jump ([@hipstersmoothie](https://github.com/hipstersmoothie))
- build time docs ([@hipstersmoothie](https://github.com/hipstersmoothie))
- rename to useDocgen ([@hipstersmoothie](https://github.com/hipstersmoothie))
- highlight code at build time in prod mode ([@hipstersmoothie](https://github.com/hipstersmoothie))
- embed sort order in build instead of using websocket (makes build simpler) ([@hipstersmoothie](https://github.com/hipstersmoothie))
- got build to pass - still doens't work ([@hipstersmoothie](https://github.com/hipstersmoothie))
- working ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.81 (Fri Jan 13 2023)

#### ⚠️ Pushed to `main`

- move react back to peer ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add modifyViteConfig hook ([@hipstersmoothie](https://github.com/hipstersmoothie))
- fix build ([@hipstersmoothie](https://github.com/hipstersmoothie))
- fix optimize deps ([@hipstersmoothie](https://github.com/hipstersmoothie))
- update include and exclude ([@hipstersmoothie](https://github.com/hipstersmoothie))
- move react to non peer dep ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.80 (Fri Jan 13 2023)

#### ⚠️ Pushed to `main`

- add chokidar ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.77 (Fri Jan 13 2023)

#### ⚠️ Pushed to `main`

- add perf import ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add ts-node ([@hipstersmoothie](https://github.com/hipstersmoothie))
- dynamic title for each page ([@hipstersmoothie](https://github.com/hipstersmoothie))
- switch to rehype toc so that we also parse markdown headings ([@hipstersmoothie](https://github.com/hipstersmoothie))
- fix errors ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.76 (Tue Jan 10 2023)

#### ⚠️ Pushed to `main`

- add component override theming ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add token theming ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add support for global decorators ([@hipstersmoothie](https://github.com/hipstersmoothie))
- story + meta decorators ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add more readmes ([@hipstersmoothie](https://github.com/hipstersmoothie))
- fix docs bug: click folder header open first page ([@hipstersmoothie](https://github.com/hipstersmoothie))
- move more types ([@hipstersmoothie](https://github.com/hipstersmoothie))
- improve virtual file loading experience ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add cli reference ([@hipstersmoothie](https://github.com/hipstersmoothie))
- improve docs ([@hipstersmoothie](https://github.com/hipstersmoothie))
- fix casing of items ([@hipstersmoothie](https://github.com/hipstersmoothie))
- fix front matter parsing when there are front multiple things that look like frontmatters ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add hideNav option ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.75 (Sat Jan 07 2023)

#### ⚠️ Pushed to `main`

- fix story matching ([@hipstersmoothie](https://github.com/hipstersmoothie))
- get quick nav working for mdx pages ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add clickable link to headings ([@hipstersmoothie](https://github.com/hipstersmoothie))
- fix docs for components from packages ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add links feature ([@hipstersmoothie](https://github.com/hipstersmoothie))
- document config options ([@hipstersmoothie](https://github.com/hipstersmoothie))
- highlight code in mdx ([@hipstersmoothie](https://github.com/hipstersmoothie))
- support TS configuration ([@hipstersmoothie](https://github.com/hipstersmoothie))
- support named config export ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.74 (Fri Jan 06 2023)

#### ⚠️ Pushed to `main`

- support mdx pages at any level ([@hipstersmoothie](https://github.com/hipstersmoothie))
- improve default sorting behavior ([@hipstersmoothie](https://github.com/hipstersmoothie))
- improve default story glob ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add more logs ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.71 (Thu Jan 05 2023)

#### ⚠️ Pushed to `main`

- fix navigations causing an error and a reload ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.69 (Thu Jan 05 2023)

#### ⚠️ Pushed to `main`

- add setup file option ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.68 (Thu Jan 05 2023)

#### ⚠️ Pushed to `main`

- load metas as needed instead of all up front ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.67 (Thu Jan 05 2023)

#### ⚠️ Pushed to `main`

- move get-docs to WS ([@hipstersmoothie](https://github.com/hipstersmoothie))
- improve open flag ([@hipstersmoothie](https://github.com/hipstersmoothie))
- switch sorting to websockets to make it really fast ([@hipstersmoothie](https://github.com/hipstersmoothie))
- more type work ([@hipstersmoothie](https://github.com/hipstersmoothie))
- rename function ([@hipstersmoothie](https://github.com/hipstersmoothie))
- generate virtual story file less often ([@hipstersmoothie](https://github.com/hipstersmoothie))
- improve logging ([@hipstersmoothie](https://github.com/hipstersmoothie))
- fix always opening ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add "fwoosh dev --open" ([@hipstersmoothie](https://github.com/hipstersmoothie))
- fix mangling multiline comments ([@hipstersmoothie](https://github.com/hipstersmoothie))
- fix parsing story comments ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add trace logger option ([@hipstersmoothie](https://github.com/hipstersmoothie))
- fix startup ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.66 (Thu Jan 05 2023)

#### ⚠️ Pushed to `main`

- eww: swc not handling comments really makes things hard ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.65 (Thu Jan 05 2023)

#### ⚠️ Pushed to `main`

- fix string sanitization ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.64 (Thu Jan 05 2023)

#### ⚠️ Pushed to `main`

- fix indentation of souce code ([@hipstersmoothie](https://github.com/hipstersmoothie))
- improve logging ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add better timing info ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.63 (Wed Jan 04 2023)

#### ⚠️ Pushed to `main`

- fix deprecation warning ([@hipstersmoothie](https://github.com/hipstersmoothie))
- move startup to info log ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add logs for other hooks ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.62 (Wed Jan 04 2023)

#### ⚠️ Pushed to `main`

- add info log for docs generating ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.61 (Wed Jan 04 2023)

#### ⚠️ Pushed to `main`

- improve default sort - respect story definition order ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.60 (Wed Jan 04 2023)

#### ⚠️ Pushed to `main`

- fix parsing comment in parallel ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add logging util ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.59 (Wed Jan 04 2023)

#### ⚠️ Pushed to `main`

- fix getting comment ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add coode back ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.58 (Wed Jan 04 2023)

#### ⚠️ Pushed to `main`

- improve startup speed by loading stories in parallel ([@hipstersmoothie](https://github.com/hipstersmoothie))
- don't fallback to meta.component when not on a story ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add alphabetic sort as default ([@hipstersmoothie](https://github.com/hipstersmoothie))
- turn on hmr for storeis file ([@hipstersmoothie](https://github.com/hipstersmoothie))
- reload stories on changes ([@hipstersmoothie](https://github.com/hipstersmoothie))
- mix stories with same name creating collisions ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.57 (Tue Jan 03 2023)

#### ⚠️ Pushed to `main`

- render pop table descriptions from markdown to html ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.56 (Tue Jan 03 2023)

#### ⚠️ Pushed to `main`

- fix newlines in src/ files breaking app ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.54 (Tue Jan 03 2023)

#### ⚠️ Pushed to `main`

- add missing deps ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.53 (Tue Jan 03 2023)

#### ⚠️ Pushed to `main`

- fix dep location ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.52 (Tue Jan 03 2023)

#### ⚠️ Pushed to `main`

- add support for meta in default ([@hipstersmoothie](https://github.com/hipstersmoothie))
- get story sort function working ([@hipstersmoothie](https://github.com/hipstersmoothie))
- rename config option ([@hipstersmoothie](https://github.com/hipstersmoothie))
- MDX only pages ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.50 (Mon Jan 02 2023)

#### ⚠️ Pushed to `main`

- add more dep to optimize ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.48 (Sat Dec 31 2022)

#### ⚠️ Pushed to `main`

- fix prop loading ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.42 (Sat Dec 31 2022)

#### ⚠️ Pushed to `main`

- fix first char not being there ([@hipstersmoothie](https://github.com/hipstersmoothie))
- refix parse offsets ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add html to asset include ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.41 (Sat Dec 31 2022)

#### ⚠️ Pushed to `main`

- remove parsed entirely ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.40 (Sat Dec 31 2022)

#### ⚠️ Pushed to `main`

- simplify comment finding ([@hipstersmoothie](https://github.com/hipstersmoothie))
- upgrade swc ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.37 (Sat Dec 31 2022)

#### ⚠️ Pushed to `main`

- fix template string in code example ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.36 (Fri Dec 30 2022)

#### ⚠️ Pushed to `main`

- update deprecated option usage ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.35 (Fri Dec 30 2022)

#### ⚠️ Pushed to `main`

- reload page when stories added/removed ([@hipstersmoothie](https://github.com/hipstersmoothie))
- factor out get story list funciton ([@hipstersmoothie](https://github.com/hipstersmoothie))
- upgrade vite ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.33 (Fri Dec 30 2022)

#### ⚠️ Pushed to `main`

- improve story comment finding ([@hipstersmoothie](https://github.com/hipstersmoothie))
- fix crash when no story and fetching docs ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.32 (Thu Dec 29 2022)

#### ⚠️ Pushed to `main`

- add ability to modify vite config directly ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.31 (Thu Dec 29 2022)

#### ⚠️ Pushed to `main`

- switch away from shadow roots, styles too encapsulated ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.30 (Thu Dec 29 2022)

#### ⚠️ Pushed to `main`

- try register in a different way ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add esbuild register back ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.27 (Tue Dec 27 2022)

#### ⚠️ Pushed to `main`

- test fix ([@hipstersmoothie](https://github.com/hipstersmoothie))
- fix running as a package ([@hipstersmoothie](https://github.com/hipstersmoothie))
- fix undefined comment ([@hipstersmoothie](https://github.com/hipstersmoothie))
- exclude more files from docs ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.25 (Mon Dec 05 2022)

#### ⚠️ Pushed to `main`

- add node modules to ignore (lisowski54@gmail.com)

#### Authors: 1

- Andrew Lisowski (lisowski54@gmail.com)

---

# v0.0.24 (Mon Dec 05 2022)

#### ⚠️ Pushed to `main`

- switch to build.json (lisowski54@gmail.com)

#### Authors: 1

- Andrew Lisowski (lisowski54@gmail.com)

---

# v0.0.23 (Mon Dec 05 2022)

#### ⚠️ Pushed to `main`

- add missing dep (lisowski54@gmail.com)

#### Authors: 1

- Andrew Lisowski (lisowski54@gmail.com)

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
