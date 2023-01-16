import * as React from "react";
import type { StoryMeta, Story } from "@fwoosh/react";
import { action } from "@fwoosh/panel-actions";
import type { DesignsPanelParameters } from "@fwoosh/panel-designs";

import { Button } from "./Button";

export const meta: StoryMeta<DesignsPanelParameters> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    design: "https://www.figma.com/file/LKQ4FJ4bTnCSjedbRpk931/Sample-File",
  },
};

/**
 * The default story.
 *
 * Describe you **stories** with the _full power of markdown_!
 *
 * > Even quote things!
 */
export const Playground: Story<DesignsPanelParameters> = () => {
  return <Button onClick={action("onClick")}>Click me</Button>;
};

/**
 * A button can be disabled.
 *
 * ```tsx
 * console.log("Woah!");
 *
 * const Example = () => {
 *   return <Button disabled>Click me</Button>;
 * }
 * ```
 */
export const WithDisabled: Story = () => {
  return (
    <Button disabled onClick={action("onClick")}>
      Click me
    </Button>
  );
};

/** Add custom styles to a button */
export const WithStyle: Story = () => {
  return (
    <Button variant="destructive" onClick={action("onClick")}>
      Click me
    </Button>
  );
};

/** Add custom styles to a button */
export const WithoutStyle: Story = () => {
  return <button onClick={action("onClick")}>Click me</button>;
};
