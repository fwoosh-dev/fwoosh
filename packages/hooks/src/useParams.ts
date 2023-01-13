import { useParams } from "react-router-dom";

export function useStoryId() {
  return useParams<{ storyId: string }>().storyId;
}

export function useDocsPath() {
  return useParams<{ docsPath: string }>().docsPath;
}
