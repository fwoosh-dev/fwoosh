import { expect, test } from "@fwoosh/test";

test.describe.parallel("Button", () => {
  test("should toggle on/off when toggle is clicked", async ({
    page,
    storybook,
  }) => {
    await storybook.goto("Components/Button/Playground");

    const button = page.locator("text=Click me");

    await expect(button).toBeVisible();
    await button.click();
  });
});
