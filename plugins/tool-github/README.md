# `@fwoosh/tool-github`

Add a button to open the websites GitHub repo.

## Installation

To use this plugin first install the package:

```sh
npm i --save-dev @fwoosh/tool-github`
# or
yarn add -D @fwoosh/tool-github`
```

Then add it to your `fwoosh.config.ts`:

```ts
import GitHubPlugin from "@fwoosh/tool-github";

export const config: FwooshConfig = {
  plugins: [
    new GitHubPlugin({ repo: "fwooshjs/fwoosh" }),
    // or
    new GitHubPlugin({ repo: "https://github.com/fwooshjs/fwoosh" }),
  ],
};
```
