import React, { Suspense } from "react";
import { render } from "@fwoosh/app/render";
import { useParams } from "react-router-dom";
import dlv from "dlv";
import { useId } from "@radix-ui/react-id";
import { Stories } from "@fwoosh/app/stories";
import { useDocs } from "@fwoosh/app/docs";
import Markdown from "markdown-to-jsx";

import ErrorBoundary from "./ErrorBoundary";
import { Spinner } from "./Spinner";
import { useStoryTree } from "../hooks/useStoryTree";

interface PropsTableProps {
  docs: ReturnType<typeof useDocs>;
}

const PropsTable = ({ docs }: PropsTableProps) => {
  return (
    <>
      {docs?.map((doc) => (
        <React.Fragment key={doc.displayName}>
          <h3>{doc.displayName}</h3>
          <table>
            <thead>
              <tr>
                <th>Prop</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(doc.props).map(([prop, propDoc]) => (
                <tr key={`${doc.displayName}-${prop}`}>
                  <td>{prop}</td>
                  <td>{propDoc.type.name}</td>
                  <td>{propDoc.defaultValue?.value}</td>
                  <td>{propDoc.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </React.Fragment>
      ))}
    </>
  );
};

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
  const docs = useDocs(params.docsPath);
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
          {stories.map((story, index) => {
            console.log(story);
            return (
              <div>
                <h2>{story.title}</h2>
                {story.comment && <Markdown>{story.comment}</Markdown>}
                <StoryDiv key={story.slug} slug={story.slug} />
                {index === 0 && <PropsTable docs={docs} />}
              </div>
            );
          })}
        </div>
      </Suspense>
    </ErrorBoundary>
  );
};
