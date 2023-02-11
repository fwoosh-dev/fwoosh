import * as React from "react";

import { Link } from "./Link";

export const meta: ReactMeta = {
  title: "Components/Buttons/Link",
  component: Link,
};

/**
 * A link leads to another page on the internet.
 */
export const Playground: ReactStory = () => {
  return <Link href="http://google.com">Open link</Link>;
};

/**
 * A Link can open in a new window
 */
export const WithDisabled: ReactStory = () => {
  return (
    <Link href="http://google.com" newWindow={true}>
      Open link in new window
    </Link>
  );
};
