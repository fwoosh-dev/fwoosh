import * as React from "react";
import type { StoryMeta } from "fwoosh";
import { components } from "@fwoosh/components";

export const meta: StoryMeta = {
  title: "Components/Text",
};

/**
 * All the Headings.
 */
export const Headings = () => {
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
export const UnorderedList = () => {
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
export const OrderedList = () => {
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
export const Blockquote = () => {
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
export const InlineCode = () => {
  return (
    <components.p>
      Text with an <components.code>inline code block</components.code>
    </components.p>
  );
};

InlineCode.component = [components.code];

/**
 * Use a blockquote to quote text or call out important information.
 */
export const Anchor = () => {
  return (
    <components.p>
      Text{" "}
      <components.a href="https://www.google.com">with a link</components.a>
    </components.p>
  );
};

Anchor.component = [components.a];
