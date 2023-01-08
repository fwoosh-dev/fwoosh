import React from "react";
import {
  components,
  DocsLayout,
  PageWrapper,
  QuickNav,
} from "@fwoosh/components";
import { stories } from "@fwoosh/app/stories";
import { MDXStoryData } from "@fwoosh/types";
import { MDXProvider } from "@mdx-js/react";
import { MDXPageTreeItem } from "@fwoosh/app/ui";
import { useQuery } from "react-query";
import { PageSwitchButton } from "./PageSwitchButtons";
import { HEADING_SELECTOR, useActiveHeader } from "../hooks/useActiveHeader";
import { CONTENT_ID } from "@fwoosh/utils";

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
  const [toc, setToc] = React.useState(data);

  useActiveHeader(quickNavRef);

  React.useEffect(() => {
    if (data.length > 0) {
      return;
    }

    const content = document.getElementById(CONTENT_ID);

    function getHeadings() {
      if (!content) {
        return;
      }

      const generatedToc = Array.from(
        content.querySelectorAll(HEADING_SELECTOR)
      ).map((heading): MDXStoryData["toc"][number] => {
        return {
          depth: parseInt(heading.tagName.replace("H", "")),
          value: heading.textContent || "",
          children: [],
          attributes: {
            id: heading.getAttribute("id") || "",
          },
        };
      });

      setToc(generatedToc);
    }

    setTimeout(getHeadings, 500);
  }, [data]);

  if (!toc.length) {
    return null;
  }

  return (
    <QuickNav.Root ref={quickNavRef}>
      <QuickNav.Header>
        <QuickNav.Title>Quick nav</QuickNav.Title>
      </QuickNav.Header>
      {toc.length === 1 && toc[0].depth === 1 ? (
        <ol>
          {toc[0].children.map((item) => (
            <TableOfContentsGroup key={item.value + item.depth} entry={item} />
          ))}
        </ol>
      ) : (
        <ol>
          {toc.map((item) => (
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
