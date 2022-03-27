import * as React from "react";
import type { StoryMeta } from "fwoosh";
import { Button } from "./Button";

export const meta: StoryMeta = {
  title: "Components/Button",
  component: Button,
};

/**
 * The default story.
 *
 * Describe you **stories** with the _full power of markdown_!

 */
export const Playground = () => {
  return <Button>Click me</Button>;
};

/**
 * A button can be disabled.
 *
 * ```tsx
 * console.log("Woah!");
 * ```
 */
export const WithDisabled = () => {
  return <Button disabled>Click me</Button>;
};

/** Add custom styles to a button */
export const WithStyle = () => {
  return <Button variant="destructive">Click me</Button>;
};
