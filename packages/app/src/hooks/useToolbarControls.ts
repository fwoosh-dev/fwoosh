import { toolbarControls } from "@fwoosh/app/ui";

import { useParameters } from "../hooks/useParameters";

export const useToolbarControls = () => {
  const parameters = useParameters();
  const activeControls = toolbarControls.filter((Control) => {
    const paramValue = Control.paramKey
      ? parameters?.[Control.paramKey]
      : undefined;

    if ((Control.hideWithoutParams && !paramValue) || paramValue === false) {
      return false;
    }

    return true;
  });

  return {
    storyControls: activeControls.filter(
      (Control) => Control.scope === "story"
    ),
    globalControls: activeControls.filter(
      (Control) => Control.scope === "global"
    ),
  };
};
