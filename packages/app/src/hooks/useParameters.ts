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
      const component =
        typeof story?.component?._payload?._result === "function"
          ? await story?.component?._payload?._result()
          : await story?.component?._payload?._result;

      return {
        ...(meta?.parameters ?? {}),
        ...component?.default?.parameters,
      };
    },
    { suspense: false }
  );

  return data;
};
