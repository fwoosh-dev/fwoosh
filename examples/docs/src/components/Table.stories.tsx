import * as React from "react";
import type { StoryMeta, Story } from "fwoosh";
import { components } from "@fwoosh/components/src/components.js";

export const meta: StoryMeta = {
  title: "Theming/Components/Table",
  component: [components.table, components.td, components.th, components.tr],
};

/**
 * A basic table.
 */
export const Basic: Story = () => {
  return (
    <components.table>
      <tbody>
        <components.tr>
          <components.td>Alfreds Futterkiste</components.td>
          <components.td>Maria Anders</components.td>
          <components.td>Germany</components.td>
        </components.tr>
        <components.tr>
          <components.td>Centro comercial Moctezuma</components.td>
          <components.td>Francisco Chang</components.td>
          <components.td>Mexico</components.td>
        </components.tr>
      </tbody>
    </components.table>
  );
};

/**
 * Optionally use headers
 */
export const Headers: Story = () => {
  return (
    <components.table>
      <thead>
        <components.tr>
          <components.th>Company</components.th>
          <components.th>Contact</components.th>
          <components.th>Country</components.th>
        </components.tr>
      </thead>
      <tbody>
        <components.tr>
          <components.td>Alfreds Futterkiste</components.td>
          <components.td>Maria Anders</components.td>
          <components.td>Germany</components.td>
        </components.tr>
        <components.tr>
          <components.td>Centro comercial Moctezuma</components.td>
          <components.td>Francisco Chang</components.td>
          <components.td>Mexico</components.td>
        </components.tr>
      </tbody>
    </components.table>
  );
};
