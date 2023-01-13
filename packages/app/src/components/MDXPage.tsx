import React from "react";
import {
  components,
  DocsLayout,
  PageWrapper,
  QuickNav,
} from "@fwoosh/components";
import { stories } from "@fwoosh/app/stories";
import { MDXStoryData, MDXPageTreeItem, TocEntry } from "@fwoosh/types";
import { MDXProvider } from "@mdx-js/react";
import { useQuery } from "react-query";
import { PageSwitchButton } from "./PageSwitchButtons";
import { useActiveHeader, HEADING_SELECTOR } from "../hooks/useActiveHeader";
import { useLocation } from "react-router-dom";
import { CONTENT_ID } from "@fwoosh/utils";

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

  return items.map((item) => {
    const anchor = item.querySelector<HTMLAnchorElement>(
      "a"
    ) as HTMLAnchorElement;
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
  });
}

function TableOfContents() {
  const quickNavRef = React.useRef<HTMLDivElement>(null);
  const [toc, setToc] = React.useState<TocEntry[]>([]);
  const location = useLocation();

  useActiveHeader(quickNavRef);

  React.useEffect(() => {
    const main = document.querySelector<HTMLElement>("main");

    if (!main) {
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

function getHeadingLevel(node: Element) {
  let lvl: string;

  if (node.nodeName.match(/^H\d$/)) {
    lvl = node.nodeName.replace("H", "");
  } else {
    lvl = node.getAttribute("data-level") || "";
  }

  if (!lvl) {
    return;
  }

  return parseInt(lvl);
}

const getHeadingsBeforeNextHeading = (node: Element, lvl: number) => {
  const titles: any[] = [];

  while (node.nextElementSibling) {
    node = node.nextElementSibling;

    const headingLevel = getHeadingLevel(node);

    if (headingLevel === lvl) {
      break;
    }

    if (headingLevel === lvl + 1) {
      titles.push(node);
    }
  }

  return titles;
};

const getContentBeforeNextHeading = (node: Element) => {
  let content = "";

  while (node.nextElementSibling) {
    node = node.nextElementSibling;
    const headingLevel = getHeadingLevel(node);

    if (typeof headingLevel !== "undefined") {
      break;
    }

    if (node.nodeName === "PRE" || node.nodeName === "SCRIPT") {
      continue;
    }

    content += `\n${node.textContent}`;
  }

  return content.trim();
};

export interface SearchData {
  path: string[];
  url: string;
  content: string;
}

const buildSearchIndex = (
  parents: string[],
  node: HTMLHeadingElement
): SearchData[] => {
  const lvl = getHeadingLevel(node);
  const nextHeadings = lvl ? getHeadingsBeforeNextHeading(node, lvl) : [];
  const path = [
    ...parents,
    node.querySelector(HEADING_SELECTOR)?.textContent || node.textContent || "",
  ];
  const id = node.getAttribute("data-level-id");
  const currentNode = {
    path,
    url: `${location.pathname}${id ? `#${id}` : ""}`,
    content: getContentBeforeNextHeading(node),
  };

  return [
    currentNode,
    ...nextHeadings.reduce(
      (acc, heading) => [...acc, ...buildSearchIndex(path, heading)],
      []
    ),
  ];
};

type MDXComponents = React.ComponentProps<typeof MDXProvider>["components"];

declare global {
  interface Window {
    FWOOSH_SEARCH_INDEX: Record<string, SearchData[]>;
  }
}

export const MDXPage = ({ page }: { page: MDXPageTreeItem }) => {
  const { component: MDXPage, meta, slug } = stories[page.id] as MDXStoryData;
  // TODO
  const { data } = useQuery(`toc-${page.id}`, () => []);

  React.useEffect(() => {
    const [lvl0, ...rest] = meta.title.split("/");
    // The leaf story name we don't care about. Instead we'll use
    // the H1 from the MDX page.
    rest.pop();
    let lvl1 = rest.join(" / ");

    const headingNodes = document
      ?.getElementById(CONTENT_ID)
      ?.querySelectorAll<HTMLHeadingElement>(HEADING_SELECTOR);

    if (!headingNodes) {
      return;
    }

    const headings = Array.from(headingNodes);
    const levels = [lvl0];

    if (lvl1) {
      levels.push(lvl1);
    }

    if (!window.FWOOSH_SEARCH_INDEX) {
      window.FWOOSH_SEARCH_INDEX = {};
    }

    window.FWOOSH_SEARCH_INDEX[slug] = buildSearchIndex(levels, headings[0]);
  }, [meta, slug]);

  let content = (
    <PageWrapper>
      <div>
        <MDXPage />
      </div>
      <PageSwitchButton current={page.id} />
    </PageWrapper>
  );

  if (data && !meta.hideNav) {
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
