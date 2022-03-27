import * as React from "react";
import type { StoryMeta } from "fwoosh";
import { Link } from "./Link";

export const meta: StoryMeta = {
  title: "Components/Link",
  component: Link,
};

/**
 * A link leads to another page on the internet.
 */
export const Playground = () => {
  return <Link href="http://google.com">Open link</Link>;
};

/**
 * A Link can open in a new window
 */
export const WithDisabled = () => {
  return (
    <Link href="http://google.com" newWindow={true}>
      Open link in new window
    </Link>
  );
};
