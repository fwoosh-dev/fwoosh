import * as React from "react";
import path from "path";
import { SearchData } from "@fwoosh/utils";

export function ProductionSearchIndex() {
  React.useLayoutEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      return;
    }

    if (!window.FWOOSH_SEARCH_INDEX) {
      window.FWOOSH_SEARCH_INDEX = {};
    }

    fetch(path.join(process.env.FWOOSH_BASE_NAME || "/", "search-index.json"))
      .then((res) => res.json())
      .then((data) => {
        Object.entries(data).forEach(([key, value]) => {
          window.FWOOSH_SEARCH_INDEX[key] = value as SearchData[];
        });
      });
  }, []);

  return <></>;
}
