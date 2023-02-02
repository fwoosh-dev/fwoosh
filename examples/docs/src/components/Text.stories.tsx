import * as React from "react";
import type { StoryMeta } from "fwoosh";
// todo make this work right
import type { Story } from "@fwoosh/react/dist/types";
import { components } from "@fwoosh/components";

export const meta: StoryMeta = {
  title: "Theming/Components/Text",
};

/**
 * All the Headings.
 */
export const Headings: Story = () => {
  return (
    <>
      <components.h1>Heading Level 1</components.h1>
      <components.h2>Heading Level 2</components.h2>
      <components.h3>Heading Level 3</components.h3>
      <components.h4>Heading Level 4</components.h4>
      <components.h5>Heading Level 5</components.h5>
      <components.h6>Heading Level 6</components.h6>
    </>
  );
};

Headings.component = [
  components.h1,
  components.h2,
  components.h3,
  components.h4,
  components.h5,
  components.h6,
];

/**
 * An unordered list of items.
 */
export const UnorderedList: Story = () => {
  return (
    <components.ul>
      <components.li>A list</components.li>
      <components.li>Of unordered</components.li>
      <components.li>Items</components.li>
    </components.ul>
  );
};

UnorderedList.component = [components.ul, components.li];

/**
 * An ordered list of items.
 */
export const OrderedList: Story = () => {
  return (
    <components.ol>
      <components.li>A list</components.li>
      <components.li>Of ordered</components.li>
      <components.li>Items</components.li>
    </components.ol>
  );
};

OrderedList.component = [components.ol, components.li];

/**
 * Use a blockquote to quote text or call out important information.
 */
export const Anchor: Story = () => {
  return (
    <components.p>
      Text{" "}
      <components.a href="https://www.google.com">with a link</components.a>
    </components.p>
  );
};

Anchor.component = [components.a];
