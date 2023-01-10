import * as React from "react";
import { StoryMeta as BaseStoryMeta } from "@fwoosh/types";

type Component = React.FunctionComponent<any> | React.ClassicComponent<any>;
export type Decorator = (story: () => JSX.Element) => JSX.Element;

export interface Story {
  (): JSX.Element;
  /** The component(s) docs should be generated for */
  component?: Component | Component[];
  /** Decorators the render around the story */
  decorators?: Decorator[];
}

export interface StoryMeta extends BaseStoryMeta {
  /** The component docs should be generated for */
  component?: React.ComponentType<any> | React.ComponentType<any>[];
  /** Decorators the render around all of the stories associated with this meta */
  decorators?: Decorator[];
}
