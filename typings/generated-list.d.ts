declare module "@fwoosh/app/stories" {
  export const stories: {
    [key: string]: {
      title: string;
      slug: string;
      component: React.FunctionComponent | React.ComponentClass;
    };
  };
}
