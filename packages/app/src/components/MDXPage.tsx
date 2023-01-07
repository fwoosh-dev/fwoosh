import React from "react";
import {
  components,
  DocsLayout,
  PageWrapper,
  QuickNav,
} from "@fwoosh/components";
import { MDXStoryData, stories } from "@fwoosh/app/stories";
import { MDXProvider } from "@mdx-js/react";
import { MDXPageTreeItem } from "@fwoosh/app/ui";
import { useQuery } from "react-query";
import { PageSwitchButton } from "./PageSwitchButtons";
import { useActiveHeader } from "../hooks/useActiveHeader";

function TableOfContentsGroup({
  entry,
}: {
  entry: MDXStoryData["toc"][number];
}) {
  return (
    <>
      <QuickNav.Item>
        <QuickNav.Link href={`#${entry.attributes.id}`}>
          {entry.value}
        </QuickNav.Link>
      </QuickNav.Item>
      {entry.children.length > 0 && (
        <QuickNav.Group>
          {entry.children.map((item) => (
            <TableOfContentsGroup key={item.value + item.depth} entry={item} />
          ))}
        </QuickNav.Group>
      )}
    </>
  );
}

function TableOfContents({ data }: { data: MDXStoryData["toc"] }) {
  const quickNavRef = React.useRef<HTMLDivElement>(null);

  useActiveHeader(quickNavRef);

  return (
    <QuickNav.Root ref={quickNavRef}>
      <QuickNav.Header>
        <QuickNav.Title>Quick nav</QuickNav.Title>
      </QuickNav.Header>
      {data.length === 1 && data[0].depth === 1 ? (
        <ol>
          {data[0].children.map((item) => (
            <TableOfContentsGroup key={item.value + item.depth} entry={item} />
          ))}
        </ol>
      ) : (
        <ol>
          {data.map((item) => (
            <TableOfContentsGroup key={item.value + item.depth} entry={item} />
          ))}
        </ol>
      )}
    </QuickNav.Root>
  );
}

type MDXComponents = React.ComponentProps<typeof MDXProvider>["components"];

export const MDXPage = ({ page }: { page: MDXPageTreeItem }) => {
  const { component: MDXPage, meta } = stories[page.id] as MDXStoryData;
  const { data } = useQuery(`toc-${page.id}`, () => page.story.toc);

  let content = (
    <PageWrapper>
      <MDXPage />
      <PageSwitchButton current={page.id} />
    </PageWrapper>
  );

  if (data && !meta.hideNav) {
    content = (
      <DocsLayout>
        {content}
        {data && !meta.hideNav && <TableOfContents data={data} />}
      </DocsLayout>
    );
  }

  return (
    <MDXProvider components={components as MDXComponents}>
      {content}
    </MDXProvider>
  );
};
