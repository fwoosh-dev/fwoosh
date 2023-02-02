# v0.0.111 (Thu Feb 02 2023)

#### ⚠️ Pushed to `main`

- `@fwoosh/app`, `fwoosh`, `@fwoosh/components`, `@fwoosh/link`, `@fwoosh/styling`, `@fwoosh/test`, `@fwoosh/types`, `@fwoosh/virtual-file`, `@fwoosh/decorator-centered`, `@fwoosh/panel-actions`, `@fwoosh/panel-designs`, `@fwoosh/panel-props`, `@fwoosh/panel-source`, `@fwoosh/panel-story-description`, `@fwoosh/react`, `@fwoosh/theme-default`, `@fwoosh/tool-github`, `@fwoosh/tool-measure`, `@fwoosh/tool-viewport`, `@fwoosh/tool-zoom`
  - Merge branch 'codehike' ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `fwoosh`, `@fwoosh/types`
  - add way to configure syntax highlighting ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `fwoosh`, `@fwoosh/styling`, `@fwoosh/types`, `@fwoosh/theme-default`
  - refactor theme into list of objects ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/panel-source`
  - fix source panel border radius ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/types`, `@fwoosh/theme-default`
  - rename type ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`, `@fwoosh/panel-source`
  - fix panels in built code ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `fwoosh`
  - update shiki theme to dark ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`, `fwoosh`, `@fwoosh/components`, `@fwoosh/virtual-file`, `@fwoosh/decorator-centered`, `@fwoosh/panel-actions`, `@fwoosh/panel-designs`, `@fwoosh/panel-props`, `@fwoosh/panel-source`, `@fwoosh/panel-story-description`, `@fwoosh/react`, `@fwoosh/tool-github`, `@fwoosh/tool-measure`, `@fwoosh/tool-viewport`, `@fwoosh/tool-zoom`
  - use code hike more ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`, `@fwoosh/components`, `@fwoosh/panel-story-description`
  - refactor all usage to MDXContent ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `fwoosh`, `@fwoosh/components`, `@fwoosh/panel-source`
  - move mdxcontent and style for source panel ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`, `fwoosh`, `@fwoosh/link`, `@fwoosh/test`, `@fwoosh/panel-source`
  - get it kinda working ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.110 (Tue Jan 31 2023)

#### ⚠️ Pushed to `main`

- `@fwoosh/app`
  - dont include mdx as stories and don't show open stories group if there are none closes #39 ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - fix trees showing up in open story commands ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - center shape once done measuring ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - fix canvas measurement ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - fix add undefined class ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - upgrade react arborist ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/react`
  - fix canvas mode stories not rendering ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - reuse react root if we can ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`, `@fwoosh/styling`, `@fwoosh/types`
  - Let user apply light/dark class (closes #27) ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.109 (Mon Jan 30 2023)

#### ⚠️ Pushed to `main`

- `@fwoosh/app`
  - improve ui flashing on nav ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/react`
  - use createRoot if available ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.108 (Mon Jan 30 2023)

#### ⚠️ Pushed to `main`

- `@fwoosh/app`
  - Fix storybook toolbar not rendering (closes #46) ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `fwoosh`
  - fix workbench showing first docs page as default (closes #55) ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.107 (Mon Jan 30 2023)

#### ⚠️ Pushed to `main`

- `@fwoosh/app`
  - save active panel id (closes #37) ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - fix panel resizer reseting to old position on change + route change (closes #40) ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.106 (Mon Jan 30 2023)

#### ⚠️ Pushed to `main`

- fix build ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `fwoosh`
  - actually fix build ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`
  - fix mdx stories at root ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - improve layout ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`, `fwoosh`
  - fix build command ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`, `@fwoosh/react`
  - fix story rendering in docs view ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`, `@fwoosh/components`
  - fix all overlapping while loading ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`, `@fwoosh/components`, `@fwoosh/react`
  - rename story ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`, `@fwoosh/utils`
  - improve measuring ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.105 (Sat Jan 28 2023)

#### ⚠️ Pushed to `main`

- `@fwoosh/app`
  - don't render tree groups if they're empty ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.104 (Sat Jan 28 2023)

#### ⚠️ Pushed to `main`

- remove file ([@hipstersmoothie](https://github.com/hipstersmoothie))
- remove todo file and move to issues ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`, `fwoosh`
  - build time shapes ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`
  - fix tests ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - improve loading behavior ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - add reset zoom and style controls more ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - fix clicking group in canvas mode ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - fix corners ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - switch back to story nodes ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - cleanup ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - render stories correnctly ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - fix double render ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - slightly improve layout ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - get tree sorting workig ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - fix height bug ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - add some tests and fix 1 nested group ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - improve canvas perf further ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - improve perf ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - remove logs ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - add zoom controls ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - fix dark mode ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - add some spacing ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - 1 level of grouping working ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`, `@fwoosh/tool-viewport`
  - Merge branch 'groups' ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/tool-viewport`
  - format ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.97 (Tue Jan 24 2023)

#### ⚠️ Pushed to `main`

- give token release rights ([@hipstersmoothie](https://github.com/hipstersmoothie))
- reset change ([@hipstersmoothie](https://github.com/hipstersmoothie))
- switch to GH_TOKEN ([@hipstersmoothie](https://github.com/hipstersmoothie))
- fix link ([@hipstersmoothie](https://github.com/hipstersmoothie))
- remove basename ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add description ([@hipstersmoothie](https://github.com/hipstersmoothie))
- change copy ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`
  - fix build ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - remove rsync ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - fix root canvas route ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - switch to box shadow for active story ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.96 (Tue Jan 24 2023)

#### ⚠️ Pushed to `main`

- iterate on description ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`
  - fix shape centering based one route ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - add switch to wrokbench ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - add open in canvas command ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - improve canvas first render ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - add gutter ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - add commands to switch between modes ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`, `@fwoosh/components`
  - add commands to open canvas ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`, `@fwoosh/hooks`
  - working on nav ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`, `@fwoosh/components`, `@fwoosh/utils`, `@fwoosh/pages`, `@fwoosh/theme-default`
  - basic canvas mode working ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`, `@fwoosh/hooks`, `@fwoosh/link`
  - factor out useIsWorkbench ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`, `fwoosh`, `@fwoosh/types`, `@fwoosh/utils`
  - default to not showing docs pages in workbench mode ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`, `fwoosh`, `@fwoosh/hooks`, `@fwoosh/link`, `@fwoosh/test`, `@fwoosh/types`, `@fwoosh/pages`, `@fwoosh/panel-designs`, `@fwoosh/panel-props`, `@fwoosh/panel-source`, `@fwoosh/panel-story-description`, `@fwoosh/tool-measure`
  - Rename storybook to workbench ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/types`
  - fix build ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `fwoosh`
  - ensure 1 instance of react-router ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.95 (Sat Jan 21 2023)

#### ⚠️ Pushed to `main`

- fix lock file ([@hipstersmoothie](https://github.com/hipstersmoothie))
- fix creating docs file for new package ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `fwoosh`, `@fwoosh/types`
  - add option to skip indexing on mdx page ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/tool-viewport`
  - fix lock file ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`
  - fix sidebar rerendering ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - factor out story docs page ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - add another suspense boundary ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - fix pages with no heading ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`, `@fwoosh/pages`
  - add fwoosh/pages ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`, `@fwoosh/types`
  - add fullPage option ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/hooks`, `@fwoosh/tool-viewport`
  - Viewports tool ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`, `@fwoosh/test`, `@fwoosh/react`
  - pass params to more of the storybook ui and through to renderer ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/react`
  - let decorators render tooltips ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - fix decorator order switching ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/components`
  - add select component ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - fix menu overflow ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - add dropdown component ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`, `@fwoosh/decorator-centered`, `@fwoosh/react`
  - fix rendering multiple decorators ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`, `@fwoosh/components`, `@fwoosh/tool-github`, `@fwoosh/tool-measure`, `@fwoosh/tool-zoom`
  - add tooltip ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.94 (Fri Jan 20 2023)

#### ⚠️ Pushed to `main`

- `fwoosh`, `@fwoosh/types`
  - add ability to fallback to default sorting ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.93 (Fri Jan 20 2023)

#### ⚠️ Pushed to `main`

- `@fwoosh/tool-github`
  - organize docs more ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - add github plugin ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`, `@fwoosh/tool-github`
  - fix dark mode attach ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`
  - show global tools on docs mode ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - add support for global toolbar buttons ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `fwoosh`
  - fix bug with spaceing in names ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`, `fwoosh`, `@fwoosh/types`, `@fwoosh/tool-measure`, `@fwoosh/tool-zoom`
  - refactor toolbar plugin config ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.92 (Tue Jan 17 2023)

#### ⚠️ Pushed to `main`

- update todos ([@hipstersmoothie](https://github.com/hipstersmoothie))
- udpate lock ([@hipstersmoothie](https://github.com/hipstersmoothie))
- fix create script ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add todos ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/panel-designs`
  - update lock ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - add no designs message ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`, `fwoosh`, `@fwoosh/types`, `@fwoosh/panel-actions`, `@fwoosh/panel-designs`, `@fwoosh/panel-props`, `@fwoosh/panel-source`, `@fwoosh/panel-story-description`
  - add panel disabling ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`, `fwoosh`, `@fwoosh/types`, `@fwoosh/panel-designs`
  - add panel hiding and docs for params ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`, `@fwoosh/panel-designs`, `@fwoosh/react`
  - set up designs plugin and use ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`
  - pass down decorators over context ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/hooks`, `@fwoosh/types`, `@fwoosh/react`
  - add type support for params ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/react`
  - fix deps ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `fwoosh`, `@fwoosh/utils`
  - move resolve meta into util ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/test`
  - add test package ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.91 (Mon Jan 16 2023)

#### ⚠️ Pushed to `main`

- `@fwoosh/app`
  - click overlay to close command pallette ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.90 (Mon Jan 16 2023)

#### ⚠️ Pushed to `main`

- update todos ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`
  - fix it more ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.89 (Mon Jan 16 2023)

#### ⚠️ Pushed to `main`

- `@fwoosh/app`
  - fix search index path ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`, `@fwoosh/components`
  - lighter font ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.88 (Mon Jan 16 2023)

#### ⚠️ Pushed to `main`

- `@fwoosh/app`, `@fwoosh/components`
  - lighter font ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.87 (Mon Jan 16 2023)

#### ⚠️ Pushed to `main`

- `@fwoosh/app`, `fwoosh`
  - fix build ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`
  - load search index from basename ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - fix crash ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.86 (Mon Jan 16 2023)

#### ⚠️ Pushed to `main`

- `@fwoosh/app`
  - scroll to has after loading mdx page ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - move more styles into app ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - move error boundary ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - fix first story redirect ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/components`
  - fix sticky quick nav ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`, `fwoosh`, `@fwoosh/utils`
  - build all search pages at build time ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `fwoosh`
  - add serve command ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - fix dev mode base name ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`, `fwoosh`, `@fwoosh/hooks`, `@fwoosh/link`, `@fwoosh/utils`
  - detect invalid links during build ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`, `@fwoosh/components`
  - set up root error element ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - fix margin collapse ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - fix show code button in wrong place ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - fix page switch buttons to bottom ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/hooks`
  - add error for bad path ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.85 (Sun Jan 15 2023)

#### ⚠️ Pushed to `main`

- `@fwoosh/app`, `fwoosh`
  - add SPA redirects for gh-pages ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.84 (Sun Jan 15 2023)

#### ⚠️ Pushed to `main`

- use basname option ([@hipstersmoothie](https://github.com/hipstersmoothie))
- document docgen ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`, `fwoosh`, `@fwoosh/types`
  - add basename option ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.83 (Sun Jan 15 2023)

#### ⚠️ Pushed to `main`

- add base-url for prod ([@hipstersmoothie](https://github.com/hipstersmoothie))
- remove extra build ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.82 (Sun Jan 15 2023)

#### ⚠️ Pushed to `main`

- add docs deploy ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`, `fwoosh`, `@fwoosh/components`, `@fwoosh/hooks`, `@fwoosh/styling`, `@fwoosh/types`, `@fwoosh/panel-props`, `@fwoosh/react`
  - Merge branch 'build' ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `fwoosh`
  - factor out getConfig function ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - working ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`, `fwoosh`
  - set up mdx searching ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`, `fwoosh`, `@fwoosh/react`
  - improve first story in docs page causing jump ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`
  - make page jump a little less ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `fwoosh`, `@fwoosh/styling`, `@fwoosh/types`
  - build time docs ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`, `fwoosh`, `@fwoosh/components`, `@fwoosh/panel-props`
  - rename to useDocgen ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `fwoosh`, `@fwoosh/hooks`
  - highlight code at build time in prod mode ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`, `fwoosh`, `@fwoosh/hooks`, `@fwoosh/types`
  - embed sort order in build instead of using websocket (makes build simpler) ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`, `fwoosh`, `@fwoosh/components`
  - got build to pass - still doens't work ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.81 (Fri Jan 13 2023)

#### ⚠️ Pushed to `main`

- update lock ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`, `fwoosh`, `@fwoosh/components`, `@fwoosh/hooks`, `@fwoosh/link`, `@fwoosh/types`, `@fwoosh/panel-actions`, `@fwoosh/react`, `@fwoosh/tool-measure`, `@fwoosh/tool-zoom`
  - Merge branch 'canary' ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`, `fwoosh`, `@fwoosh/components`, `@fwoosh/hooks`, `@fwoosh/link`, `@fwoosh/styling`, `@fwoosh/panel-actions`, `@fwoosh/react`, `@fwoosh/tool-measure`, `@fwoosh/tool-zoom`
  - move react back to peer ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/react`
  - add vite react plugin ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `fwoosh`, `@fwoosh/types`
  - add modifyViteConfig hook ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `fwoosh`
  - fix build ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - fix optimize deps ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - update include and exclude ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/types`
  - upgrade vite ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/panel-actions`
  - fix actions panel ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - add missing dep ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`
  - close command pallette ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/tool-measure`, `@fwoosh/tool-zoom`
  - add missing deps ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/components`
  - add missing dep ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`, `fwoosh`, `@fwoosh/components`, `@fwoosh/hooks`, `@fwoosh/styling`, `@fwoosh/react`
  - move react to non peer dep ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.80 (Fri Jan 13 2023)

#### ⚠️ Pushed to `main`

- `fwoosh`
  - add chokidar ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.79 (Fri Jan 13 2023)

#### ⚠️ Pushed to `main`

- `@fwoosh/app`, `@fwoosh/hooks`, `@fwoosh/panel-actions`, `@fwoosh/panel-props`, `@fwoosh/panel-source`, `@fwoosh/panel-story-description`, `@fwoosh/tool-measure`
  - fix missing react-router-dom ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.78 (Fri Jan 13 2023)

#### ⚠️ Pushed to `main`

- `@fwoosh/app`, `@fwoosh/link`, `@fwoosh/panel-source`
  - fix more deps ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`, `@fwoosh/panel-source`
  - add missing deps ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/react`
  - fix types export ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.77 (Fri Jan 13 2023)

#### ⚠️ Pushed to `main`

- remove canary script ([@hipstersmoothie](https://github.com/hipstersmoothie))
- change action name ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add canary script ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `fwoosh`
  - add perf import ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`, `fwoosh`
  - add ts-node ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - dynamic title for each page ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`, `@fwoosh/components`
  - implement story comment search ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - add story comment search ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`, `@fwoosh/components`, `@fwoosh/hooks`, `@fwoosh/styling`, `@fwoosh/theme-default`
  - add command palette and story switching ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`, `fwoosh`, `@fwoosh/components`, `@fwoosh/hooks`, `@fwoosh/types`
  - switch to rehype toc so that we also parse markdown headings ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `fwoosh`, `@fwoosh/components`, `@fwoosh/hooks`
  - fix errors ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.76 (Tue Jan 10 2023)

#### ⚠️ Pushed to `main`

- fix build ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add panel tempalte ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add create tool script ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add decorator template ([@hipstersmoothie](https://github.com/hipstersmoothie))
- refactor create script ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add centered docs and reorganize ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add create package script ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add todo ([@hipstersmoothie](https://github.com/hipstersmoothie))
- rename file ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`, `fwoosh`, `@fwoosh/components`, `@fwoosh/styling`, `@fwoosh/types`, `@fwoosh/decorator-centered`, `@fwoosh/panel-actions`, `@fwoosh/panel-props`, `@fwoosh/panel-source`, `@fwoosh/panel-story-description`, `@fwoosh/theme-default`
  - add component override theming ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/components`
  - update breakpoint ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - fix cod preview scrolling ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - fix tall quick navs ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - improve quick nav colors ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`, `fwoosh`, `@fwoosh/components`, `@fwoosh/types`, `@fwoosh/theme-default`
  - add token theming ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`, `@fwoosh/components`, `@fwoosh/panel-props`
  - rely on theme more ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/panel-actions`, `@fwoosh/panel-props`, `@fwoosh/panel-source`, `@fwoosh/panel-story-description`, `@fwoosh/tool-measure`, `@fwoosh/tool-zoom`
  - unify naming scheme ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/types`
  - adds docs for react hooks ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/decorator-centered`
  - document decorators ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `fwoosh`, `@fwoosh/decorator-centered`, `@fwoosh/react`
  - add support for global decorators ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `fwoosh`, `@fwoosh/hooks`, `@fwoosh/types`, `@fwoosh/decorator-centered`, `@fwoosh/react`
  - story + meta decorators ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/react`
  - fix error ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - add plugin tempalte ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - add more docs stubs ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`, `fwoosh`, `@fwoosh/components`, `@fwoosh/hooks`, `@fwoosh/link`, `@fwoosh/types`, `@fwoosh/utils`, `@fwoosh/react`
  - add more readmes ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`, `fwoosh`, `@fwoosh/hooks`
  - fix docs bug: click folder header open first page ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`, `fwoosh`, `@fwoosh/components`, `@fwoosh/hooks`, `@fwoosh/link`, `@fwoosh/types`, `@fwoosh/utils`
  - move more types ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`, `fwoosh`, `@fwoosh/hooks`, `@fwoosh/types`, `@fwoosh/virtual-file`, `@fwoosh/react`
  - improve virtual file loading experience ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `fwoosh`
  - add cli reference ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - fix front matter parsing when there are front multiple things that look like frontmatters ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`
  - only show stories nav item when there are stories ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - only use last part of slug for docs name ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`, `fwoosh`
  - improve docs ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - fix casing of items ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - add hideNav option ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/hooks`
  - fix multiple mdx files not at root ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.75 (Sat Jan 07 2023)

#### ⚠️ Pushed to `main`

- iterate on docs ([@hipstersmoothie](https://github.com/hipstersmoothie))
- delete old docs ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`, `@fwoosh/components`
  - add current heading highlight ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - add root error boundary ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/components`
  - make gutter widths even ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - fix props link ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - fix chevron alignment ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`
  - improve welcome page ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - semantic html ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - fix first story link to ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - fix active highlight for nested mdx story ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - make sidebar groups open first story/mdx child ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`, `fwoosh`, `@fwoosh/hooks`
  - fix story matching ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`, `@fwoosh/components`, `@fwoosh/hooks`, `@fwoosh/utils`
  - add prev/next page buttons ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`, `fwoosh`, `@fwoosh/components`
  - get quick nav working for mdx pages ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`, `fwoosh`
  - add clickable link to headings ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/link`
  - add title hash support for mdx links ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`, `@fwoosh/hooks`, `@fwoosh/link`
  - fix finding first story in mdx heavy storybook ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `fwoosh`
  - fix docs for components from packages ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - highlight code in mdx ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - support named config export ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/components`, `@fwoosh/hooks`
  - more docs ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/hooks`
  - fix folder name casing ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`, `fwoosh`, `@fwoosh/components`, `@fwoosh/hooks`, `@fwoosh/link`, `@fwoosh/utils`, `@fwoosh/source-panel`
  - add links feature ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `fwoosh`, `@fwoosh/story-description-panel`
  - document config options ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `fwoosh`, `@fwoosh/react`
  - support TS configuration ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/props-panel`
  - default to meta.component in props panel ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.74 (Fri Jan 06 2023)

#### ⚠️ Pushed to `main`

- remove unneeded config ([@hipstersmoothie](https://github.com/hipstersmoothie))
- update todos ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`, `fwoosh`, `@fwoosh/utils`
  - support mdx pages at any level ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`
  - factor out url helper ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - add support for mdx only pages in storybook mode ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - add page wrapper to mdx pages ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`, `fwoosh`
  - improve default sorting behavior ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `fwoosh`
  - improve default story glob ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - add more logs ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.73 (Fri Jan 06 2023)

#### ⚠️ Pushed to `main`

- `@fwoosh/props-panel`
  - fix props panel displaying nothing ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.72 (Thu Jan 05 2023)

#### ⚠️ Pushed to `main`

- fix clean script to include all tsbuildinfo files ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/react`
  - add error boundary around react story ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`, `@fwoosh/components`
  - move error boundary into components ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.71 (Thu Jan 05 2023)

#### ⚠️ Pushed to `main`

- `fwoosh`
  - fix navigations causing an error and a reload ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.70 (Thu Jan 05 2023)

#### ⚠️ Pushed to `main`

- `@fwoosh/app`
  - remove nav links ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.69 (Thu Jan 05 2023)

#### ⚠️ Pushed to `main`

- `@fwoosh/app`, `fwoosh`
  - add setup file option ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.68 (Thu Jan 05 2023)

#### ⚠️ Pushed to `main`

- `fwoosh`
  - load metas as needed instead of all up front ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.67 (Thu Jan 05 2023)

#### ⚠️ Pushed to `main`

- `fwoosh`
  - move get-docs to WS ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - improve open flag ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - rename function ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - generate virtual story file less often ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - improve logging ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - fix always opening ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - add "fwoosh dev --open" ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - fix mangling multiline comments ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - fix parsing story comments ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`
  - fix prop tables not being shown ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - simplify code + fix bug ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - simplify logic ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`, `fwoosh`
  - switch sorting to websockets to make it really fast ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - more type work ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - fix startup ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `fwoosh`, `@fwoosh/utils`
  - add trace logger option ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.66 (Thu Jan 05 2023)

#### ⚠️ Pushed to `main`

- `fwoosh`
  - eww: swc not handling comments really makes things hard ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.65 (Thu Jan 05 2023)

#### ⚠️ Pushed to `main`

- `fwoosh`
  - fix string sanitization ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.64 (Thu Jan 05 2023)

#### ⚠️ Pushed to `main`

- `@fwoosh/app`, `fwoosh`, `@fwoosh/utils`, `@fwoosh/source-panel`
  - fix indentation of souce code ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `fwoosh`, `@fwoosh/utils`
  - improve logging ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `fwoosh`
  - add better timing info ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.63 (Wed Jan 04 2023)

#### ⚠️ Pushed to `main`

- `fwoosh`
  - fix deprecation warning ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - move startup to info log ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - add logs for other hooks ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.62 (Wed Jan 04 2023)

#### ⚠️ Pushed to `main`

- `fwoosh`
  - add info log for docs generating ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/react`
  - re-us ts.Program to speed up type generation ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.61 (Wed Jan 04 2023)

#### ⚠️ Pushed to `main`

- `fwoosh`
  - improve default sort - respect story definition order ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`, `@fwoosh/utils`
  - improve typing ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.60 (Wed Jan 04 2023)

#### ⚠️ Pushed to `main`

- `fwoosh`
  - fix parsing comment in parallel ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `fwoosh`, `@fwoosh/utils`
  - add logging util ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.59 (Wed Jan 04 2023)

#### ⚠️ Pushed to `main`

- `fwoosh`
  - fix getting comment ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - add coode back ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.58 (Wed Jan 04 2023)

#### ⚠️ Pushed to `main`

- update example name ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`
  - fix build ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - simplify logic for displaying props tables for stories and root ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - decrease text size in actions panel ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - organize code ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `fwoosh`
  - improve startup speed by loading stories in parallel ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - add alphabetic sort as default ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - turn on hmr for storeis file ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - reload stories on changes ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - mix stories with same name creating collisions ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`, `fwoosh`, `@fwoosh/props-panel`
  - don't fallback to meta.component when not on a story ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/utils`
  - fix sorting sub tree ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/components`
  - add tabs docs ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - fix chevron size/color ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - add stories for testing ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`, `@fwoosh/components`
  - clean up spinners ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/components`, `@fwoosh/source-panel`
  - align spacing across panels ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.57 (Tue Jan 03 2023)

#### ⚠️ Pushed to `main`

- `fwoosh`, `@fwoosh/components`
  - render pop table descriptions from markdown to html ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`, `@fwoosh/components`
  - minor layout improvements ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.56 (Tue Jan 03 2023)

#### ⚠️ Pushed to `main`

- `fwoosh`
  - fix newlines in src/ files breaking app ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.55 (Tue Jan 03 2023)

#### ⚠️ Pushed to `main`

- add todos ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`
  - fix suspending too much ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.54 (Tue Jan 03 2023)

#### ⚠️ Pushed to `main`

- `@fwoosh/app`, `fwoosh`
  - add missing deps ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.53 (Tue Jan 03 2023)

#### ⚠️ Pushed to `main`

- `fwoosh`
  - fix dep location ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.52 (Tue Jan 03 2023)

#### ⚠️ Pushed to `main`

- remove completed todos ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`
  - fix build ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - fix errors sticking when navigating ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `fwoosh`
  - add support for meta in default ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - rename config option ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`, `fwoosh`, `@fwoosh/utils`
  - get story sort function working ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`, `fwoosh`, `@fwoosh/props-panel`, `@fwoosh/source-panel`, `@fwoosh/story-description-panel`
  - MDX only pages ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/components`, `@fwoosh/props-panel`
  - add props loading placeholder ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/story-description-panel`
  - add no description message ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`, `@fwoosh/components`
  - more ui improvements ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.51 (Mon Jan 02 2023)

#### ⚠️ Pushed to `main`

- `@fwoosh/components`, `@fwoosh/source-panel`
  - improve ui a lil ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.50 (Mon Jan 02 2023)

#### ⚠️ Pushed to `main`

- `@fwoosh/app`
  - reset scroll position for content when navigating ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - switch to nav links ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - reset panels when story changes ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - switch to new style router ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `fwoosh`
  - add more dep to optimize ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.49 (Mon Jan 02 2023)

#### ⚠️ Pushed to `main`

- `@fwoosh/app`, `@fwoosh/components`
  - organize code and fix header in docs mode ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`, `@fwoosh/components`, `@fwoosh/props-panel`
  - improve sidebar tree rendering ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`
  - fix each story re-rendering props table ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - add root redirect ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.48 (Sat Dec 31 2022)

#### ⚠️ Pushed to `main`

- `fwoosh`
  - fix prop loading ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.47 (Sat Dec 31 2022)

#### ⚠️ Pushed to `main`

- `@fwoosh/react`
  - support custom ts compiler options ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.46 (Sat Dec 31 2022)

#### ⚠️ Pushed to `main`

- `@fwoosh/source-panel`, `@fwoosh/story-description-panel`
  - fix long source overflow ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.45 (Sat Dec 31 2022)

#### ⚠️ Pushed to `main`

- `@fwoosh/app`, `@fwoosh/components`
  - upgrade radix ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`
  - add keys to links ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.44 (Sat Dec 31 2022)

#### ⚠️ Pushed to `main`

- `@fwoosh/app`
  - fix docs/ show code button ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - add error handling to docs pages ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - add root redirects ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`, `@fwoosh/react`
  - add error page for story not found ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.43 (Sat Dec 31 2022)

#### ⚠️ Pushed to `main`

- `@fwoosh/app`, `@fwoosh/source-panel`, `@fwoosh/story-description-panel`
  - tighten panel scrolling ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.42 (Sat Dec 31 2022)

#### ⚠️ Pushed to `main`

- `fwoosh`
  - fix first char not being there ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - refix parse offsets ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - add html to asset include ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`
  - fix panel height ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.41 (Sat Dec 31 2022)

#### ⚠️ Pushed to `main`

- `fwoosh`
  - remove parsed entirely ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.40 (Sat Dec 31 2022)

#### ⚠️ Pushed to `main`

- `fwoosh`
  - simplify comment finding ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - upgrade swc ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/components`
  - remove extra char ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.39 (Sat Dec 31 2022)

#### ⚠️ Pushed to `main`

- `@fwoosh/app`
  - make story fill pane ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.38 (Sat Dec 31 2022)

#### ⚠️ Pushed to `main`

- `@fwoosh/components`
  - fix long story list ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.37 (Sat Dec 31 2022)

#### ⚠️ Pushed to `main`

- `fwoosh`
  - fix template string in code example ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.36 (Fri Dec 30 2022)

#### ⚠️ Pushed to `main`

- `@fwoosh/app`
  - make panel resizable ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `fwoosh`
  - update deprecated option usage ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.35 (Fri Dec 30 2022)

#### ⚠️ Pushed to `main`

- `fwoosh`
  - reload page when stories added/removed ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - factor out get story list funciton ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - upgrade vite ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.34 (Fri Dec 30 2022)

#### ⚠️ Pushed to `main`

- `@fwoosh/app`
  - only render extra stories if there are some ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - fix multiple stories rendering ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.33 (Fri Dec 30 2022)

#### ⚠️ Pushed to `main`

- `fwoosh`
  - improve story comment finding ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - fix crash when no story and fetching docs ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`, `@fwoosh/components`
  - only render properties title when there are properties ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/components`
  - add bottom margin to h3 ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.32 (Thu Dec 29 2022)

#### ⚠️ Pushed to `main`

- `fwoosh`
  - add ability to modify vite config directly ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.31 (Thu Dec 29 2022)

#### ⚠️ Pushed to `main`

- `@fwoosh/app`, `fwoosh`
  - switch away from shadow roots, styles too encapsulated ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.30 (Thu Dec 29 2022)

#### ⚠️ Pushed to `main`

- `fwoosh`
  - try register in a different way ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - add esbuild register back ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.29 (Tue Dec 27 2022)

#### ⚠️ Pushed to `main`

- update lock ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`, `@fwoosh/components`
  - make react a peer dep ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.28 (Tue Dec 27 2022)

#### ⚠️ Pushed to `main`

- `@fwoosh/actions`
  - update devtools-ds ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.27 (Tue Dec 27 2022)

#### ⚠️ Pushed to `main`

- fix start ([@hipstersmoothie](https://github.com/hipstersmoothie))
- update lcok file ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `fwoosh`
  - test fix ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - fix running as a package ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - fix undefined comment ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - exclude more files from docs ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/components`
  - fix build ([@hipstersmoothie](https://github.com/hipstersmoothie))
  - update page spacing ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.26 (Mon Dec 05 2022)

#### ⚠️ Pushed to `main`

- `@fwoosh/react`
  - switch typescript jsx output (lisowski54@gmail.com)

#### Authors: 1

- Andrew Lisowski (lisowski54@gmail.com)

---

# v0.0.25 (Mon Dec 05 2022)

#### ⚠️ Pushed to `main`

- `fwoosh`
  - add node modules to ignore (lisowski54@gmail.com)

#### Authors: 1

- Andrew Lisowski (lisowski54@gmail.com)

---

# v0.0.24 (Mon Dec 05 2022)

#### ⚠️ Pushed to `main`

- `@fwoosh/app`
  - point to dist files (lisowski54@gmail.com)
- `@fwoosh/app`, `fwoosh`
  - switch to build.json (lisowski54@gmail.com)
- `@fwoosh/react`
  - add missing peer dep (lisowski54@gmail.com)

#### Authors: 1

- Andrew Lisowski (lisowski54@gmail.com)

---

# v0.0.23 (Mon Dec 05 2022)

#### ⚠️ Pushed to `main`

- `fwoosh`
  - add missing dep (lisowski54@gmail.com)

#### Authors: 1

- Andrew Lisowski (lisowski54@gmail.com)

---

# v0.0.22 (Sun Dec 04 2022)

#### ⚠️ Pushed to `main`

- `@fwoosh/app`, `fwoosh`, `@fwoosh/components`
  - fix dep (lisowski54@gmail.com)

#### Authors: 1

- Andrew Lisowski (lisowski54@gmail.com)

---

# v0.0.16 (Sun Dec 04 2022)

#### ⚠️ Pushed to `main`

- remove versions ([@hipstersmoothie](https://github.com/hipstersmoothie))
- fix private ([@hipstersmoothie](https://github.com/hipstersmoothie))
- make examples private ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add license ([@hipstersmoothie](https://github.com/hipstersmoothie))
- update lerna ([@hipstersmoothie](https://github.com/hipstersmoothie))
- update auto ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`, `fwoosh`, `@fwoosh/components`, `@fwoosh/actions`, `@fwoosh/tool-measure`, `@fwoosh/props-panel`, `@fwoosh/react`, `@fwoosh/source-panel`, `@fwoosh/story-description-panel`, `@fwoosh/zoom`
  - add publish config ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.16 (Sun Dec 04 2022)

#### ⚠️ Pushed to `main`

- remove versions ([@hipstersmoothie](https://github.com/hipstersmoothie))
- fix private ([@hipstersmoothie](https://github.com/hipstersmoothie))
- make examples private ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add license ([@hipstersmoothie](https://github.com/hipstersmoothie))
- update lerna ([@hipstersmoothie](https://github.com/hipstersmoothie))
- update auto ([@hipstersmoothie](https://github.com/hipstersmoothie))
- `@fwoosh/app`, `fwoosh`, `@fwoosh/components`, `@fwoosh/actions`, `@fwoosh/tool-measure`, `@fwoosh/props-panel`, `@fwoosh/react`, `@fwoosh/source-panel`, `@fwoosh/story-description-panel`, `@fwoosh/zoom`
  - add publish config ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.16 (Sun Dec 04 2022)

#### ⚠️ Pushed to `main`

- remove versions (lisowski54@gmail.com)
- fix private (lisowski54@gmail.com)
- make examples private (lisowski54@gmail.com)
- add license (lisowski54@gmail.com)
- update lerna (lisowski54@gmail.com)
- update auto (lisowski54@gmail.com)

#### Authors: 1

- Andrew Lisowski (lisowski54@gmail.com)

---

# v0.0.16 (Sun Dec 04 2022)

#### ⚠️ Pushed to `main`

- fix private (lisowski54@gmail.com)
- make examples private (lisowski54@gmail.com)
- add license (lisowski54@gmail.com)
- update lerna (lisowski54@gmail.com)
- update auto (lisowski54@gmail.com)

#### Authors: 1

- Andrew Lisowski (lisowski54@gmail.com)

---

# v0.0.16 (Sun Dec 04 2022)

#### ⚠️ Pushed to `main`

- make examples private (lisowski54@gmail.com)
- add license (lisowski54@gmail.com)
- update lerna (lisowski54@gmail.com)
- update auto (lisowski54@gmail.com)

#### Authors: 1

- Andrew Lisowski (lisowski54@gmail.com)

---

# v0.0.16 (Sun Dec 04 2022)

#### ⚠️ Pushed to `main`

- update lerna (lisowski54@gmail.com)
- update auto (lisowski54@gmail.com)

#### Authors: 1

- Andrew Lisowski (lisowski54@gmail.com)

---

# v0.0.16 (Sun Dec 04 2022)

#### ⚠️ Pushed to `main`

- update lerna (lisowski54@gmail.com)
- update auto (lisowski54@gmail.com)

#### Authors: 1

- Andrew Lisowski (lisowski54@gmail.com)

---

# v0.0.16 (Sun Dec 04 2022)

#### ⚠️ Pushed to `main`

- update auto (lisowski54@gmail.com)

#### Authors: 1

- Andrew Lisowski (lisowski54@gmail.com)

---

# v0.0.15 (Sun Dec 04 2022)

#### ⚠️ Pushed to `main`

- update gitignore ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add author ([@hipstersmoothie](https://github.com/hipstersmoothie))
- fix shadow root ([@hipstersmoothie](https://github.com/hipstersmoothie))
- fix buttons ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add story type ([@hipstersmoothie](https://github.com/hipstersmoothie))
- upgrade typescript ([@hipstersmoothie](https://github.com/hipstersmoothie))
- solve style encapsulation ([@hipstersmoothie](https://github.com/hipstersmoothie))
- fix story view ([@hipstersmoothie](https://github.com/hipstersmoothie))
- get docs mode working again ([@hipstersmoothie](https://github.com/hipstersmoothie))
- styled spinner ([@hipstersmoothie](https://github.com/hipstersmoothie))
- fix props ([@hipstersmoothie](https://github.com/hipstersmoothie))
- story description plugin ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add todo ([@hipstersmoothie](https://github.com/hipstersmoothie))
- fix falling back to meta ([@hipstersmoothie](https://github.com/hipstersmoothie))
- slightly improve docgen speed ([@hipstersmoothie](https://github.com/hipstersmoothie))
- use suspense in docs loading ([@hipstersmoothie](https://github.com/hipstersmoothie))
- working ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add color mode context ([@hipstersmoothie](https://github.com/hipstersmoothie))
- fix clearing actions too early ([@hipstersmoothie](https://github.com/hipstersmoothie))
- improve measure ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add measure plugin ([@hipstersmoothie](https://github.com/hipstersmoothie))
- actions panel ([@hipstersmoothie](https://github.com/hipstersmoothie))
- make icon buttons smaller ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add source panel ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add sidebar title to docs view ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add panel plugins ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add toolbar plugins ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add quick nav to docs ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add title + add config loading ([@hipstersmoothie](https://github.com/hipstersmoothie))
- dark mode toggle ([@hipstersmoothie](https://github.com/hipstersmoothie))
- use layout components ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add more styles ([@hipstersmoothie](https://github.com/hipstersmoothie))
- switching to stitches ([@hipstersmoothie](https://github.com/hipstersmoothie))
- code previews for stories ([@hipstersmoothie](https://github.com/hipstersmoothie))
- clean up deps ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add setup ([@hipstersmoothie](https://github.com/hipstersmoothie))
- fix mulptiple stories bugs ([@hipstersmoothie](https://github.com/hipstersmoothie))
- working on making it pretty ([@hipstersmoothie](https://github.com/hipstersmoothie))
- fix swc bug ([@hipstersmoothie](https://github.com/hipstersmoothie))
- Merge origin/main into main ([@hipstersmoothie](https://github.com/hipstersmoothie))
- markdown formatting for comments ([@hipstersmoothie](https://github.com/hipstersmoothie))
- docgen ([@hipstersmoothie](https://github.com/hipstersmoothie))
- get comments working ([@hipstersmoothie](https://github.com/hipstersmoothie))
- split modes ([@hipstersmoothie](https://github.com/hipstersmoothie))
- move react render into plugin ([@hipstersmoothie](https://github.com/hipstersmoothie))
- progress ([@hipstersmoothie](https://github.com/hipstersmoothie))
- pivot ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.15 (Sun Dec 04 2022)

#### ⚠️ Pushed to `main`

- add author ([@hipstersmoothie](https://github.com/hipstersmoothie))
- fix shadow root ([@hipstersmoothie](https://github.com/hipstersmoothie))
- fix buttons ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add story type ([@hipstersmoothie](https://github.com/hipstersmoothie))
- upgrade typescript ([@hipstersmoothie](https://github.com/hipstersmoothie))
- solve style encapsulation ([@hipstersmoothie](https://github.com/hipstersmoothie))
- fix story view ([@hipstersmoothie](https://github.com/hipstersmoothie))
- get docs mode working again ([@hipstersmoothie](https://github.com/hipstersmoothie))
- styled spinner ([@hipstersmoothie](https://github.com/hipstersmoothie))
- fix props ([@hipstersmoothie](https://github.com/hipstersmoothie))
- story description plugin ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add todo ([@hipstersmoothie](https://github.com/hipstersmoothie))
- fix falling back to meta ([@hipstersmoothie](https://github.com/hipstersmoothie))
- slightly improve docgen speed ([@hipstersmoothie](https://github.com/hipstersmoothie))
- use suspense in docs loading ([@hipstersmoothie](https://github.com/hipstersmoothie))
- working ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add color mode context ([@hipstersmoothie](https://github.com/hipstersmoothie))
- fix clearing actions too early ([@hipstersmoothie](https://github.com/hipstersmoothie))
- improve measure ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add measure plugin ([@hipstersmoothie](https://github.com/hipstersmoothie))
- actions panel ([@hipstersmoothie](https://github.com/hipstersmoothie))
- make icon buttons smaller ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add source panel ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add sidebar title to docs view ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add panel plugins ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add toolbar plugins ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add quick nav to docs ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add title + add config loading ([@hipstersmoothie](https://github.com/hipstersmoothie))
- dark mode toggle ([@hipstersmoothie](https://github.com/hipstersmoothie))
- use layout components ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add more styles ([@hipstersmoothie](https://github.com/hipstersmoothie))
- switching to stitches ([@hipstersmoothie](https://github.com/hipstersmoothie))
- code previews for stories ([@hipstersmoothie](https://github.com/hipstersmoothie))
- clean up deps ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add setup ([@hipstersmoothie](https://github.com/hipstersmoothie))
- fix mulptiple stories bugs ([@hipstersmoothie](https://github.com/hipstersmoothie))
- working on making it pretty ([@hipstersmoothie](https://github.com/hipstersmoothie))
- fix swc bug ([@hipstersmoothie](https://github.com/hipstersmoothie))
- Merge origin/main into main ([@hipstersmoothie](https://github.com/hipstersmoothie))
- markdown formatting for comments ([@hipstersmoothie](https://github.com/hipstersmoothie))
- docgen ([@hipstersmoothie](https://github.com/hipstersmoothie))
- get comments working ([@hipstersmoothie](https://github.com/hipstersmoothie))
- split modes ([@hipstersmoothie](https://github.com/hipstersmoothie))
- move react render into plugin ([@hipstersmoothie](https://github.com/hipstersmoothie))
- progress ([@hipstersmoothie](https://github.com/hipstersmoothie))
- pivot ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.14 (Sun Mar 21 2021)

#### ⚠️ Pushed to `main`

- update copy ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.14 (Sun Mar 21 2021)

#### ⚠️ Pushed to `main`

- add logo and favicon support ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.12 (Wed Mar 10 2021)

#### ⚠️ Pushed to `main`

- improve docs ([@hipstersmoothie](https://github.com/hipstersmoothie))
- testing out navbar layout ([@hipstersmoothie](https://github.com/hipstersmoothie))
- fix dev builds ([@hipstersmoothie](https://github.com/hipstersmoothie))
- expose pages to layouts via context ([@hipstersmoothie](https://github.com/hipstersmoothie))
- only insert layout if it doesn't exist ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add matchDirectory option to layout plugin ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add layout.match hook ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.11 (Tue Mar 09 2021)

#### ⚠️ Pushed to `main`

- twind TS plugin ([@hipstersmoothie](https://github.com/hipstersmoothie))
- more twind ([@hipstersmoothie](https://github.com/hipstersmoothie))
- add tailwind plugin to our fwoosh config ([@hipstersmoothie](https://github.com/hipstersmoothie))
- move dark background to twind preflight ([@hipstersmoothie](https://github.com/hipstersmoothie))
- load official plugins ([@hipstersmoothie](https://github.com/hipstersmoothie))
- move all tailwind to a plugin ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.10 (Sun Mar 07 2021)

#### ⚠️ Pushed to `main`

- get tailwind integrated ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.9 (Sun Mar 07 2021)

#### ⚠️ Pushed to `main`

- better mobile layout ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.8 (Sun Mar 07 2021)

#### ⚠️ Pushed to `main`

- testing ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.7 (Sun Mar 07 2021)

#### ⚠️ Pushed to `main`

- fix vercel build ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.6 (Sun Mar 07 2021)

#### ⚠️ Pushed to `main`

- add vercel build ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.5 (Sun Mar 07 2021)

#### ⚠️ Pushed to `main`

- add registry ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.4 (Sat Mar 06 2021)

#### ⚠️ Pushed to `main`

- update docs (lisowski54@gmail.com)

#### Authors: 1

- Andrew Lisowski (lisowski54@gmail.com)

---

# v0.0.3 (Sat Mar 06 2021)

#### ⚠️ Pushed to `main`

- add auto gh-pages plugin (lisowski54@gmail.com)
- make website (lisowski54@gmail.com)
- export frontMatter type (lisowski54@gmail.com)
- support all files on dev server (lisowski54@gmail.com)
- add frontMatter to tsx/jsx files if they don't have it (lisowski54@gmail.com)
- fix loading with no config (lisowski54@gmail.com)
- fix build (lisowski54@gmail.com)

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.2 (Sat Mar 06 2021)

#### ⚠️ Pushed to `main`

- add env to gitignore (lisowski54@gmail.com)
- add release (lisowski54@gmail.com)
- add readme (lisowski54@gmail.com)
- remove existsSync (lisowski54@gmail.com)
- remove fs-extra (lisowski54@gmail.com)
- add assets hook (lisowski54@gmail.com)
- merge page builder and fwoosh class (lisowski54@gmail.com)
- refactor, add plugin system (lisowski54@gmail.com)
- config (lisowski54@gmail.com)
- add layouts (lisowski54@gmail.com)
- move files around (lisowski54@gmail.com)
- intelligent default for out-dir (lisowski54@gmail.com)
- add clean command (lisowski54@gmail.com)
- fix build command (lisowski54@gmail.com)
- hyrdate the dom with JS (lisowski54@gmail.com)
- gett code splitting working (lisowski54@gmail.com)
- get hot reloading working (lisowski54@gmail.com)
- use esbuild for rebuild (lisowski54@gmail.com)
- add dev command (lisowski54@gmail.com)
- get markdown rendering (lisowski54@gmail.com)
- front matter parsing (lisowski54@gmail.com)
- measure exec time (lisowski54@gmail.com)
- kinda working (lisowski54@gmail.com)

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))
