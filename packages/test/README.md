# `@fwoosh/test`

Easily test your fwoosh stories using [playwright](https://playwright.dev).

## Installation

To install the package.

```sh
npm i --save-dev @fwoosh/test
# or
yarn add -D @fwoosh/test
```

## Configuration

To use this you must first install `@playwright/test`:

```sh
npm i --save-dev @playwright/test
# or
yarn add -D @playwright/test
```

Then create a `playwright.config.ts`:

```ts
import { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  testMatch: ["**/*.spec.tsx"],
};

export default config;
```

## Writing Tests

Once you have `@fwoosh/test` configured you can start writing tests.

**`Button.spec.ts`:**

```tsx
import { expect, test } from "@fwoosh/test";

test.describe.parallel("Button", () => {
  test("should be clickable", async ({ page, storybook }) => {
    await storybook.goto("Components/Button/Playground");

    const button = page.locator("text=Click me");

    await expect(button).toBeVisible();
    await button.click();
  });
});
```

or if you have lots of tests for the same story:

```tsx
import { expect, test } from "@fwoosh/test";

test.beforeEach(async ({ storybook }) => {
  await storybook.goto("Components/Button/Playground");
});

test.describe.parallel("Button", () => {
  test("should be clickable", async ({ page }) => {
    const button = page.locator("text=Click me");

    await expect(button).toBeVisible();
    await button.click();
  });
});
```
