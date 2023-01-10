import * as React from "react";
import type { Story, StoryMeta } from "@fwoosh/react";

import { Link } from "./Link";

export const meta: StoryMeta = {
  title: "Components/Link",
  component: Link,
};

/**
 * A link leads to another page on the internet.
 */
export const Playground: Story = () => {
  return <Link href="http://google.com">Open link</Link>;
};

/**
 * A Link can open in a new window
 */
export const WithDisabled: Story = () => {
  return (
    <Link href="http://google.com" newWindow={true}>
      Open link in new window
    </Link>
  );
};
