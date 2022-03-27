declare module "@fwoosh/app/stories" {
  export interface Stories {
    [key: string]: {
      title: string;
      slug: string;
      component: any;
    };
  }

  export const stories: Stories;
}

declare module "@fwoosh/app/render" {
  export function render(slug: string): void;
}
