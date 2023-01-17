import { useStoryId } from "@fwoosh/hooks";
import { stories } from "@fwoosh/app/stories";
import { useQuery } from "react-query";
import { resolveStoryMeta } from "@fwoosh/utils";

export const useParameters = () => {
  const storyId = useStoryId();
  const story = storyId ? stories[storyId] : undefined;

  const { data } = useQuery(
    `params-${storyId}`,
    async () => {
      const meta = await resolveStoryMeta(story?.meta);

      return {
        ...meta?.parameters,
        ...story?.component?._payload?._result?.default?.parameters,
      };
    },
    { suspense: false }
  );

  return data;
};
