/** The designs panel makes it easy to view a component's design along with it's documentation. */
export type DesignsPanelParameters =
  | string
  | {
      /** A url to the design to render inside the panel */
      spec?: string | false;
    };
