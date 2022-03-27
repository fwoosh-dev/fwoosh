import React, { Suspense } from "react";
import { render } from "@fwoosh/app/render";
import { useParams } from "react-router-dom";
import dlv from "dlv";
import { useId } from "@radix-ui/react-id";

import ErrorBoundary from "./ErrorBoundary";
import { Spinner } from "./Spinner";
import { useStoryTree } from "../hooks/useStoryTree";
import { Stories } from "@fwoosh/app/stories";

const StoryDiv = React.memo(({ slug }: { slug: string }) => {
  const id = useId();

  React.useEffect(() => {
    render(id, slug);
  }, [id, slug]);

  return <div id={id} />;
});

export const DocsPage = () => {
  const tree = useStoryTree();
  const params = useParams<{ docsPath: string }>();
  const stories = React.useMemo(() => {
    if (!params.docsPath) {
      return [];
    }

    const path = params.docsPath.split("-");
    return dlv(tree, path) as Stories[string][];
  }, [params.docsPath]);

  return (
    <ErrorBoundary>
      <Suspense fallback={<Spinner delay={300} />}>
        <div>
          {stories.map((story) => {
            console.log(story);
            return (
              <div>
                <h2>{story.title}</h2>
                {story.comment && <p>{story.comment}</p>}
                <StoryDiv key={story.slug} slug={story.slug} />
              </div>
            );
          })}
        </div>
      </Suspense>
    </ErrorBoundary>
  );
};
