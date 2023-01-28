import { DocsShape, DocsUtil } from "./docs";
import { GroupShape, GroupUtil } from "./group";

export * from "./docs";

export type Shape = DocsShape | GroupShape;

export const shapeUtils = {
  docs: new DocsUtil(),
  group: new GroupUtil(),
};
