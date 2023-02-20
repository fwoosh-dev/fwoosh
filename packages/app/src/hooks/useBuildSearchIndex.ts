import { buildSearchIndex, CONTENT_ID, HEADING_SELECTOR } from "@fwoosh/utils";
import { useEffect } from "react";

export function useBuildSearchIndex({
  title,
  slug,
}: {
  title: string;
  slug: string;
}) {
  useEffect(() => {
    if (
      process.env.NODE_ENV !== "production" ||
      window.FWOOSH_SEARCH_INDEX?.[slug]
    ) {
      return;
    }

    const [lvl0, ...rest] = title.split("/");
    // The leaf story name we don't care about. Instead we'll use
    // the H1 from the MDX page.
    rest.pop();
    const lvl1 = rest.join(" / ");

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

    window.FWOOSH_SEARCH_INDEX[slug] =
      headings.length > 0 ? buildSearchIndex(levels, headings[0]) : [];

    // This log is used to communicate the search index to the
    // built app.
    console.log(
      "window.FWOOSH_SEARCH_INDEX",
      slug,
      window.FWOOSH_SEARCH_INDEX[slug]
    );
  }, [title, slug]);
}
