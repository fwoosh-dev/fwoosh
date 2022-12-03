type Component = React.FunctionComponent<any> | React.ClassicComponent<any>;

export interface Story {
  (): JSX.Element;
  /** The component(s) docs should be generated for */
  component?: Component | Component[];
}
