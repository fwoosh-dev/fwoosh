/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { createStorySlug } from "@fwoosh/utils";
import {
  expect as playwrightExpect,
  Fixtures,
  test as base,
} from "@playwright/test";
import { Page, Locator } from "playwright";

playwrightExpect.extend({
  isBefore: async (first: Locator, second: Locator) => {
    const firstBox = (await first.boundingBox())!;
    const secondBox = (await second.boundingBox())!;
    const pass = firstBox.y + firstBox.height <= secondBox.y;

    if (pass) {
      return { message: () => "passed", pass: true };
    } else {
      return { message: () => "failed", pass: false };
    }
  },
  isAfter: async (first: Locator, second: Locator) => {
    const firstBox = (await first.boundingBox())!;
    const secondBox = (await second.boundingBox())!;
    const pass = firstBox.y >= secondBox.y + secondBox.height;

    if (pass) {
      return { message: () => "passed", pass: true };
    } else {
      return { message: () => "failed", pass: false };
    }
  },
});

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace PlaywrightTest {
    interface Matchers<R> {
      isBefore(second: Locator): Promise<R>;
      isAfter(second: Locator): Promise<R>;
    }
  }
}

export class Workbench {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(slug: string) {
    const parts = slug.split("/");
    const storyName = parts.pop()!;
    const storyGroup = parts.join("/");
    const url = `http://localhost:3000/story/${createStorySlug(
      storyGroup,
      storyName
    )}`;

    await this.page.goto(url);
  }
}

type ElectronTestFixtures = {
  workbench: Workbench;
  page: Page;
};

export { expect } from "@playwright/test";

export const electronFixtures: Fixtures<ElectronTestFixtures> = {
  workbench: async ({ page }, use) => {
    const workbench = new Workbench(page);

    await use(workbench);
  },
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore some error about a string type now having `undefined` as part of it's union
export const test = base.extend<ElectronTestFixtures>(electronFixtures);
export { Page, Locator } from "playwright";
