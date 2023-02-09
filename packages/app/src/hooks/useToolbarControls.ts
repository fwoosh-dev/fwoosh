import { toolbarControls } from "@fwoosh/app/ui";
import { useIsDocs } from "@fwoosh/hooks";

import { useParameters } from "../hooks/useParameters";

export const useToolbarControls = () => {
  const parameters = useParameters();
  const isDocs = useIsDocs();
  const activeControls = toolbarControls.filter((Control) => {
    const paramValue = Control.paramKey
      ? parameters?.[Control.paramKey]
      : undefined;

    if (
      (Control.hideWithoutParams && !paramValue) ||
      paramValue === false ||
      (isDocs && Control.hideInDocs)
    ) {
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
