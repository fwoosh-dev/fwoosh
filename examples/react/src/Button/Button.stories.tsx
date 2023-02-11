import * as React from "react";
import type { Meta, Story } from "fwoosh";
import { action } from "@fwoosh/panel-actions";

import { Button } from "./Button";

export const meta: Meta = {
  title: "Components/Buttons/Button",
  component: Button,
  parameters: {
    designs: "https://www.figma.com/file/LKQ4FJ4bTnCSjedbRpk931/Sample-File",
  },
};

/**
 * The default story.
 *
 * Describe you **stories** with the _full power of markdown_!
 *
 * > Even quote things!
 */
export const Playground: Story = () => {
  return <Button onClick={action("onClick")}>Click me</Button>;
};

Playground.parameters = {
  designs: {
    spec: "https://www.figma.com/file/LKQ4FJ4bTnCSjedbRpk931/Sample-File?node-id=1%3A2",
  },
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

WithDisabled.parameters = {
  designs: false,
};

/** Add custom styles to a button */
export const WithStyle: Story = () => {
  return (
    <Button variant="destructive" onClick={action("onClick")}>
      Click me
    </Button>
  );
};

WithStyle.parameters = {
  viewport: {
    defaultSize: "iPhone SE",
  },
};

/** Add custom styles to a button */
export const WithoutStyle: Story = () => {
  return <button onClick={action("onClick")}>Click me</button>;
};

WithoutStyle.parameters = {
  viewport: {
    defaultSize: ["iPhone SE", "Pixel 5"],
  },
};
