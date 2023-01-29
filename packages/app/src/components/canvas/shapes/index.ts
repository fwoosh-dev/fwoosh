import { StoryShape, StoryUtil } from "./story";
import { GroupShape, GroupUtil } from "./group";

export * from "./story";

export type Shape = StoryShape | GroupShape;

export const shapeUtils = {
  story: new StoryUtil(),
  group: new GroupUtil(),
};
