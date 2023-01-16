import { HEADING_SELECTOR } from "./constants.js";

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

export const buildSearchIndex = (
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
