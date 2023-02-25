import * as React from "react";
import {
  components,
  DocsLayout,
  PageWrapper,
  QuickNav,
} from "@fwoosh/components";
import { stories } from "@fwoosh/app/stories";
import { MDXStoryData, StoryTreeItem, TocEntry } from "@fwoosh/types";
import { MDXProvider } from "@mdx-js/react";
import { useQuery } from "react-query";
import { PageSwitchButton } from "./PageSwitchButtons";
import { useActiveHeader } from "../hooks/useActiveHeader";
import { useLocation } from "react-router-dom";
import { SearchData } from "@fwoosh/utils";
import { useBuildSearchIndex } from "../hooks/useBuildSearchIndex";
import useLayoutEffect from "@react-hook/passive-layout-effect";
import { Title } from "react-head";

function TableOfContentsGroup({ entry }: { entry: TocEntry }) {
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

function getTocFromNav(el: HTMLElement, level: number) {
  const items = Array.from(
    el.querySelectorAll<HTMLElement>(`.toc-level-${level} > .toc-item`)
  );

  return items
    .map((item) => {
      const anchor = item.querySelector<HTMLAnchorElement>("a");

      if (!anchor) {
        return null;
      }

      const href = anchor.getAttribute("href");
      let id = "";

      if (href) {
        const hrefUrl = new URL(href, window.location.href);
        id = hrefUrl.hash.replace("#", "");
      }

      const entry: TocEntry = {
        value: anchor.text,
        attributes: {
          id: id,
        },
        children: getTocFromNav(item, level + 1),
        depth: level,
      };

      return entry;
    })
    .filter((x): x is TocEntry => Boolean(x));
}

function TableOfContents() {
  const quickNavRef = React.useRef<HTMLDivElement>(null);
  const [toc, setToc] = React.useState<TocEntry[]>([]);
  const location = useLocation();

  useActiveHeader(quickNavRef);

  React.useEffect(() => {
    const main = document.querySelector<HTMLElement>("main");

    if (!main || typeof window === "undefined") {
      return;
    }

    function getTocs(el: HTMLElement) {
      const navs = Array.from(el.querySelectorAll<HTMLElement>("nav.toc"));

      for (const nav of navs) {
        const toc = getTocFromNav(nav, 1);

        if (toc.length) {
          setToc(toc);
          break;
        }
      }
    }

    const mutationObserver = new MutationObserver((entries) => {
      getTocs(entries[0].target as HTMLElement);
    });

    mutationObserver.observe(main, { childList: true, subtree: true });

    getTocs(main);

    return () => {
      mutationObserver.disconnect();
    };
  }, [location]);

  if (!toc.length) {
    return null;
  }

  return (
    <QuickNav.Root ref={quickNavRef}>
      <QuickNav.Header>
        <QuickNav.Title>Quick nav</QuickNav.Title>
      </QuickNav.Header>
      {toc.map((item) => (
        <TableOfContentsGroup key={item.value + item.depth} entry={item} />
      ))}
    </QuickNav.Root>
  );
}

type MDXComponents = React.ComponentProps<typeof MDXProvider>["components"];

declare global {
  interface Window {
    FWOOSH_SEARCH_INDEX: Record<string, SearchData[]>;
  }
}

export const MDXPage = ({ page }: { page: StoryTreeItem }) => {
  const location = useLocation();
  const story = stories[page.id] as MDXStoryData;
  const { component: MDXPage, meta } = story;
  // TODO
  const { data } = useQuery(`toc-${page.id}`, () => []);

  useBuildSearchIndex(story);

  useLayoutEffect(() => {
    location.hash && document.querySelector(location.hash)?.scrollIntoView();
  }, [location.hash]);

  const hasWrapper =
    !("fullPage" in page.story.meta) || page.story.meta.fullPage !== true;
  let content = <MDXPage />;

  if (hasWrapper) {
    content = (
      <PageWrapper>
        <Title>{page.name}</Title>
        <div>{content}</div>
        <PageSwitchButton current={page.id} />
      </PageWrapper>
    );
  }

  if (data && hasWrapper && !meta.hideNav) {
    content = (
      <DocsLayout>
        {content}
        {data && !meta.hideNav && <TableOfContents />}
      </DocsLayout>
    );
  }

  return (
    <MDXProvider components={components as MDXComponents}>
      {content}
    </MDXProvider>
  );
};
