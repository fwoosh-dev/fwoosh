/** The designs panel makes it easy to view a component's design along with it's documentation. */
export interface DesignsPanelParametersObject {
  /** A url to the design to render inside the panel */
  spec?: string | false;
}
export type DesignsPanelParameters = string | DesignsPanelParametersObject;
