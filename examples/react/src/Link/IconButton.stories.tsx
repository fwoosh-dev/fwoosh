import * as React from "react";
import { Plus } from "react-feather";

import type { Story, StoryMeta } from "@fwoosh/react";
import { IconButton } from "@fwoosh/components";
import { action } from "@fwoosh/panel-actions";

export const meta: StoryMeta = {
  title: "Components/IconButton",
  component: IconButton,
};

/**
 * A button that only displays an icon.
 */
export const Basic: Story = () => {
  return (
    <IconButton title="Add" onClick={action("onClick")}>
      <Plus />
    </IconButton>
  );
};
