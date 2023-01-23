import { DocsShape, DocsUtil } from "./docs";

export * from "./docs";

export type Shape = DocsShape;

export const shapeUtils = {
  docs: new DocsUtil(),
};
