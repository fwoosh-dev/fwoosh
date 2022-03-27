declare module "@fwoosh/app/stories" {
  export interface Stories {
    [key: string]: {
      title: string;
      slug: string;
      grouping: string;
      component: any;
    };
  }

  export const stories: Stories;
}

declare module "@fwoosh/app/render" {
  export function render(id: string, slug: string): void;
}
