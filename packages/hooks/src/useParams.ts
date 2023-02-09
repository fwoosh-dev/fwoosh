import * as React from "react";
import { StoryParameters } from "@fwoosh/types";
import { useLocation, useParams } from "react-router-dom";

export function useStoryId() {
  return useParams<{ storyId: string }>().storyId;
}

export function useDocsPath() {
  return useParams<{ docsPath: string }>().docsPath;
}

export const ParameterContext = React.createContext<StoryParameters>({});

export function useParameters<T = StoryParameters>() {
  return React.useContext(ParameterContext) as T;
}

export function useIsWorkbench() {
  const location = useLocation();
  return location.pathname.startsWith("/workbench");
}

export function useIsDocs() {
  const location = useLocation();
  return location.pathname.startsWith("/docs/");
}
