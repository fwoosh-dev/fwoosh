import { HEADING_SELECTOR } from "./constants.js";

function getHeadingNode(node: Element) {
  let headingNode = node;

  if (headingNode.hasAttribute("data-link-group")) {
    const subHeading = headingNode.querySelector(HEADING_SELECTOR);

    if (subHeading) {
      headingNode = subHeading;
    }
  }

  return headingNode;
}

function getHeadingLevel(node: Element) {
  const headingNode = getHeadingNode(node);
  let lvl: string;

  if (headingNode.nodeName.match(/^H\d$/)) {
    lvl = headingNode.nodeName.replace("H", "");
  } else {
    lvl = headingNode.getAttribute("data-level") ?? "";
  }

  if (!lvl) {
    return;
  }

  return parseInt(lvl);
}

const getHeadingsBeforeNextHeading = (node: Element, lvl: number) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

    if (
      node.nodeName === "PRE" ||
      node.nodeName === "SCRIPT" ||
      node.getAttribute("data-type") === "preview"
    ) {
      continue;
    }

    const clone = node.cloneNode(true) as HTMLElement;

    clone.querySelectorAll(".ch-codeblock").forEach((el) => {
      el.remove();
    });

    content += `\n${clone.textContent}`;
  }

  return content.trim();
};

export interface SearchData {
  path: string[];
  url: string;
  content: string;
}

export const buildSearchIndex = (
  parents: string[],
  node: HTMLHeadingElement
): SearchData[] => {
  const lvl = getHeadingLevel(node);
  const nextHeadings = lvl ? getHeadingsBeforeNextHeading(node, lvl) : [];
  const path = [
    ...parents,
    node.querySelector(HEADING_SELECTOR)?.textContent ?? node.textContent ?? "",
  ];
  const id = node.getAttribute("data-level-id");
  const currentNode = {
    path,
    url: `${location.pathname}${id ? `#${id}` : ""}`,
    content: getContentBeforeNextHeading(node),
  };

  return [
    ...(currentNode.content ? [currentNode] : []),
    ...nextHeadings.reduce(
      (acc, heading) => [...acc, ...buildSearchIndex(path, heading)],
      []
    ),
  ];
};
