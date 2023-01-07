import * as React from "react";
import type { StoryMeta } from "fwoosh";

import type { Story } from "@fwoosh/react/dist/types";
import { styled, Tabs } from "@fwoosh/components";

const Panel = styled("div", { p: 4, color: "$gray11" });

export const meta: StoryMeta = {
  title: "Components/Tabs",
  component: [Tabs.Root, Tabs.List, Tabs.Trigger, Tabs.Content],
};

/**
 * You can use tabs to switch between different views.
 *
 * This is useful for displaying different content in the same space.
 */
export const Basic: Story = () => {
  return (
    <Tabs.Root defaultValue="1">
      <Tabs.List>
        <Tabs.Trigger value="1">One</Tabs.Trigger>
        <Tabs.Trigger value="2">Two</Tabs.Trigger>
        <Tabs.Trigger value="3">Three</Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="1">
        <Panel>One</Panel>
      </Tabs.Content>
      <Tabs.Content value="2">
        <Panel>Two</Panel>
      </Tabs.Content>
      <Tabs.Content value="3">
        <Panel>Three</Panel>
      </Tabs.Content>
    </Tabs.Root>
  );
};
