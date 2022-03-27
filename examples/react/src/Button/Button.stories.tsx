import * as React from "react";
import type { StoryMeta } from "fwoosh";
import { Button } from "./Button";

export const meta: StoryMeta = {
  title: "Components/Button",
};

/** The default story. */
export const Playground = () => {
  return <Button>Click me</Button>;
};

/** A button can be disabled. */
export const WithDisabled = () => {
  return <Button disabled>Click me</Button>;
};

/** Add custom styles to a button */
export const WithStyle = () => {
  return <Button style={{ background: "red" }}>Click me</Button>;
};
