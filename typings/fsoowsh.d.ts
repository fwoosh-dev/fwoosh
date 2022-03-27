declare module "@fwoosh/app/stories" {
  export interface Stories {
    [key: string]: {
      title: string;
      slug: string;
      grouping: string;
      component: any;
      comment?: string;
    };
  }

  export const stories: Stories;
}

declare module "@fwoosh/app/render" {
  export function render(id: string, slug: string): void;
}

declare module "@fwoosh/app/docs" {
  import type { ComponentDoc } from "react-docgen-typescript";
  export function useDocs(file?: string): ComponentDoc[];
}
