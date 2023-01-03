import * as React from "react";
import type { StoryMeta } from "fwoosh";

import type { Story } from "@fwoosh/react/dist/types";
import { Spinner } from "@fwoosh/components";

export const meta: StoryMeta = {
  title: "Components/Spinner",
  component: [Spinner],
};

/**
 * A spinner is a simple loading indicator.
 */
export const Basic: Story = () => {
  return <Spinner delay={0} />;
};

/**
 * The spinner can be delayed from being shown for a certain amount of time.
 * This is useful when the spinner is used as a fallback for a suspense boundary.
 */
export const Delay: Story = () => {
  return <Spinner delay={2000} />;
};

/**
 * A spinner can be displayed at any of the design system sizes.
 */
export const Size: Story = () => {
  return <Spinner delay={0} size={6} />;
};

/**
 * A spinner can have a message displayed below it.
 *
 * Use this to provide more context to the user about what is happening.
 */
export const Message: Story = () => {
  return <Spinner delay={0}>Loading the thing...</Spinner>;
};
