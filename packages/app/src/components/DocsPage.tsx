import React, { Suspense } from "react";
import { render } from "@fwoosh/app/render";
import { useParams } from "react-router-dom";
import dlv from "dlv";
import { useId } from "@radix-ui/react-id";
import { Stories } from "@fwoosh/app/stories";
import { useDocs } from "@fwoosh/app/docs";
import { components } from "@fwoosh/components";
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
          <components.h3>{doc.displayName}</components.h3>
          <components.table>
            <thead>
              <components.tr>
                <components.th>Prop</components.th>
                <components.th>Type</components.th>
                <components.th>Default</components.th>
                <components.th>Description</components.th>
              </components.tr>
            </thead>
            <tbody>
              {Object.entries(doc.props).map(([prop, propDoc]) => (
                <components.tr key={`${doc.displayName}-${prop}`}>
                  <components.td>{prop}</components.td>
                  <components.td>{propDoc.type.name}</components.td>
                  <components.td>{propDoc.defaultValue?.value}</components.td>
                  <components.td>{propDoc.description}</components.td>
                </components.tr>
              ))}
            </tbody>
          </components.table>
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
            return (
              <div>
                <components.h2>{story.title}</components.h2>
                {story.comment && (
                  <Markdown options={{ overrides: components }}>
                    {story.comment}
                  </Markdown>
                )}
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
