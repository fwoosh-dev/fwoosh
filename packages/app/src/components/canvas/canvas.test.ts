import { expect, describe, it, vi } from "vitest";

import { createGroup, packShapesIntoGroups } from "./utils";

describe("packShapesIntoGroups", () => {
  it("it should group two shapes", () => {
    const group1 = createGroup({ id: "1", childIndex: 1 });
    group1.size = [100, 100];
    const group2 = createGroup({ id: "2", childIndex: 2 });
    group2.size = [100, 100];

    const shapes = {
      1: group1,
      2: group2,
    };

    packShapesIntoGroups(
      [
        { id: "1", children: [], name: "one", type: "tree" },
        { id: "2", children: [], name: "two", type: "tree" },
      ],
      {
        1: group1,
        2: group2,
      }
    );

    expect(shapes).toMatchSnapshot();
  });

  it("it should wrap single item in nested group", () => {
    const group1 = createGroup({ id: "1", childIndex: 1 });
    group1.size = [100, 100];
    const group2 = createGroup({ id: "2", childIndex: 2 });
    group2.size = [100, 100];

    const shapes = {
      1: group1,
      2: group2,
    };

    packShapesIntoGroups(
      [
        {
          id: "1",
          children: [{ id: "2", children: [], name: "two", type: "tree" }],
          name: "one",
          type: "tree",
        },
      ],
      shapes
    );

    expect(shapes).toMatchSnapshot();
  });

  it("it should wrap single item in nested group with content size", () => {
    const group1 = createGroup({ id: "1", childIndex: 1 });
    group1.size = [100, 100];
    group1.contentSize = [100, 100];
    const group2 = createGroup({ id: "2", childIndex: 2 });
    group2.size = [100, 100];

    const shapes = {
      1: group1,
      2: group2,
    };

    packShapesIntoGroups(
      [
        {
          id: "1",
          children: [{ id: "2", children: [], name: "two", type: "tree" }],
          name: "one",
          type: "tree",
        },
      ],
      shapes
    );

    expect(shapes).toMatchSnapshot();
  });

  it("it should be correct for a group with two children beside each other", () => {
    const group1 = createGroup({ id: "1", childIndex: 1 });
    group1.size = [100, 100];
    group1.contentSize = [100, 100];

    const group2 = createGroup({ id: "2", childIndex: 2 });
    group2.size = [100, 100];

    const group3 = createGroup({ id: "3", childIndex: 2 });
    group3.size = [100, 100];

    const shapes = {
      1: group1,
      2: group2,
      3: group3,
    };

    packShapesIntoGroups(
      [
        {
          id: "1",
          children: [
            { id: "2", children: [], name: "two", type: "tree" },
            { id: "3", children: [], name: "three", type: "tree" },
          ],
          name: "one",
          type: "tree",
        },
      ],
      shapes
    );

    expect(shapes).toMatchSnapshot();
  });

  it("it should work with 2 levels of nesting", () => {
    const group1 = createGroup({ id: "1", childIndex: 1 });
    group1.size = [100, 100];
    group1.contentSize = [100, 100];

    const group2 = createGroup({ id: "2", childIndex: 2 });
    group2.size = [100, 100];
    group2.contentSize = [100, 100];

    const group3 = createGroup({ id: "3", childIndex: 2 });
    group3.size = [100, 100];

    const shapes = {
      1: group1,
      2: group2,
      3: group3,
    };

    packShapesIntoGroups(
      [
        {
          id: "1",
          children: [
            {
              id: "2",
              children: [
                { id: "3", children: [], name: "three", type: "tree" },
              ],
              name: "two",
              type: "tree",
            },
          ],
          name: "one",
          type: "tree",
        },
      ],
      shapes
    );

    expect(shapes).toMatchSnapshot();
  });
});
