import * as React from "react";
import type { StoryMeta, Story } from "fwoosh";
import { components } from "@fwoosh/components";

export const meta: StoryMeta = {
  title: "Theming/Components/Text/Special",
};

/**
 * Use a blockquote to quote text or call out important information.
 */
export const Blockquote: Story = () => {
  return (
    <components.blockquote>
      <components.p>A blockquote</components.p>
    </components.blockquote>
  );
};

Blockquote.component = [components.blockquote];

/**
 * Use the `code` component to display inline code snippets.
 */
export const InlineCode: Story = () => {
  return (
    <components.p>
      Text with an <components.code>inline code block</components.code>
    </components.p>
  );
};

InlineCode.component = [components.code];
