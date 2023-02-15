import { expect, describe, test } from "vitest";

import twoTree from "./data/two-tree.json";

import { createGroup, packShapesIntoGroups } from "../utils";

describe("packShapesIntoGroups", () => {
  test("it should group two shapes", () => {
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

  test("it should wrap single item in nested group", () => {
    const group1 = createGroup({ id: "1", childIndex: 1 });
    group1.size = [100, 100];

    const group2 = createGroup({ id: "2", childIndex: 2 });
    group2.size = [100, 100];

    group1.children = [group2.id];

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

  test("it should wrap single item in nested group with content size", () => {
    const group1 = createGroup({ id: "1", childIndex: 1 });
    group1.size = [100, 100];
    group1.contentSize = [100, 100];

    const group2 = createGroup({ id: "2", childIndex: 2 });
    group2.size = [100, 100];

    group1.children = [group2.id];

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

  test("it should be correct for a group with two children beside each other", () => {
    const group1 = createGroup({ id: "1", childIndex: 1 });
    group1.size = [100, 100];
    group1.contentSize = [100, 100];

    const group2 = createGroup({ id: "2", childIndex: 2 });
    group2.size = [100, 100];

    const group3 = createGroup({ id: "3", childIndex: 2 });
    group3.size = [100, 100];

    group1.children = [group2.id, group3.id];

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

  test("it should work with 2 levels of nesting", () => {
    const group1 = createGroup({ id: "1", childIndex: 1 });
    group1.size = [100, 100];
    group1.contentSize = [100, 100];

    const group2 = createGroup({ id: "2", childIndex: 2 });
    group2.size = [100, 100];
    group2.contentSize = [100, 100];

    const group3 = createGroup({ id: "3", childIndex: 2 });
    group3.size = [100, 100];

    group2.children = [group3.id];
    group1.children = [group2.id];

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

  test("it should work with 2 groups of 2 levels of nesting", () => {
    const group1 = createGroup({ id: "1", childIndex: 1 });
    group1.size = [100, 100];
    group1.contentSize = [100, 100];

    const group2 = createGroup({ id: "2", childIndex: 2 });
    group2.size = [100, 100];
    group2.contentSize = [100, 100];

    const group3 = createGroup({ id: "3", childIndex: 3 });
    group3.size = [100, 100];

    const group4 = createGroup({ id: "4", childIndex: 4 });
    group4.size = [100, 100];
    group4.contentSize = [100, 100];

    const group5 = createGroup({ id: "5", childIndex: 5 });
    group5.size = [100, 100];

    group2.children = [group3.id];
    group4.children = [group5.id];
    group1.children = [group2.id, group4.id];

    const shapes = {
      1: group1,
      2: group2,
      3: group3,
      4: group4,
      5: group5,
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
            {
              id: "4",
              children: [{ id: "5", children: [], name: "five", type: "tree" }],
              name: "four",
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

  test("it should work long and wide children", () => {
    packShapesIntoGroups(twoTree.tree as any, twoTree.shapes as any);
    expect(twoTree.shapes).toMatchSnapshot();
  });
});
