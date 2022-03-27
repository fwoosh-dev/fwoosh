import * as React from "react";
import type { StoryMeta } from "fwoosh";
import { Button } from "./Button";

export const meta: StoryMeta = {
  title: "Components/Button",
};

export const Playground = () => {
  return <Button>Click me</Button>;
};

export const WithDisabled = () => {
  return <Button disabled>Click me</Button>;
};

export const WithStyle = () => {
  return <Button style={{ background: "red" }}>Click me</Button>;
};
