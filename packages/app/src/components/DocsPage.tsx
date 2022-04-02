import React, { Suspense } from "react";
import makeClass from "clsx";
import { render } from "@fwoosh/app/render";
import { useParams } from "react-router-dom";
import dlv from "dlv";
import { useId } from "@radix-ui/react-id";
import { Stories } from "@fwoosh/app/stories";
import { useDocs } from "@fwoosh/app/docs";
import { components, css, PageWrapper } from "@fwoosh/components";
import * as Collapsible from "@radix-ui/react-collapsible";

import ErrorBoundary from "./ErrorBoundary";
import { Spinner } from "./Spinner";
import { useStoryTree } from "../hooks/useStoryTree";
import { StyledMarkdown } from "./StyledMarkdown";
import * as styles from "./DocsPage.module.css";

interface PropsTableProps {
  docs: ReturnType<typeof useDocs>;
}

const PropsTable = ({ docs }: PropsTableProps) => {
  return (
    <>
      {docs?.map((doc) => (
        <React.Fragment key={doc.displayName}>
          <components.h4>{doc.displayName} Props</components.h4>
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
                  <components.td>
                    <components.code>{prop}</components.code>
                  </components.td>
                  <components.td>
                    {propDoc.type.name && (
                      <components.code>{propDoc.type.name}</components.code>
                    )}
                  </components.td>
                  <components.td>
                    {propDoc.defaultValue?.value && (
                      <components.code>
                        {propDoc.defaultValue?.value}
                      </components.code>
                    )}
                  </components.td>
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

const StoryDiv = React.memo(
  ({ slug, code }: { slug: string; code: string }) => {
    const id = useId();
    const [codeShowing, codeShowingSet] = React.useState(false);

    React.useEffect(() => {
      render(id, slug);
    }, [id, slug]);

    return (
      <Collapsible.Root open={codeShowing} onOpenChange={codeShowingSet}>
        <div className="relative">
          <div
            className={makeClass(
              "border border-gray-400 px-4 py-8",
              codeShowing ? "rounded-t-md" : "rounded-md"
            )}
            id={id}
          />
          <Collapsible.Trigger asChild={true}>
            <button className="absolute border bottom-0 right-0 px-2 rounded-tl">
              {codeShowing ? "Hide" : "Show"} code
            </button>
          </Collapsible.Trigger>
        </div>
        <Collapsible.Content>
          <StyledMarkdown className={codeShowing && styles.showingCode}>
            {code}
          </StyledMarkdown>
        </Collapsible.Content>
      </Collapsible.Root>
    );
  }
);

export const DocsPage = () => {
  const tree = useStoryTree();
  const params = useParams<{ docsPath: string }>();
  const docs = useDocs(params.docsPath);
  const [, name] = params.docsPath?.split("-") || [];
  const [firstStory, ...stories] = React.useMemo(() => {
    if (!params.docsPath) {
      return [];
    }

    const path = params.docsPath.split("-");
    return dlv(tree, path) as Stories[string][];
  }, [params.docsPath]);

  return (
    <ErrorBoundary>
      <Suspense fallback={<Spinner delay={300} />}>
        <PageWrapper>
          <components.h1>{name}</components.h1>
          {firstStory && (
            <>
              {firstStory.comment && (
                <StyledMarkdown>{firstStory.comment}</StyledMarkdown>
              )}
              <StoryDiv slug={firstStory.slug} code={firstStory.code} />
            </>
          )}
          <PropsTable docs={docs} />
          <components.h2>Stories</components.h2>
          {stories.map((story) => {
            return (
              <div key={story.slug}>
                <components.h3>{story.title}</components.h3>
                {story.comment && (
                  <StyledMarkdown>{story.comment}</StyledMarkdown>
                )}
                <StoryDiv slug={story.slug} code={story.code} />
              </div>
            );
          })}
        </PageWrapper>
      </Suspense>
    </ErrorBoundary>
  );
};
