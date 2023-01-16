import { SearchData } from "@fwoosh/utils";
import * as React from "react";

export function ProductionSearchIndex() {
  React.useLayoutEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      return;
    }

    if (!window.FWOOSH_SEARCH_INDEX) {
      window.FWOOSH_SEARCH_INDEX = {};
    }

    fetch("/search.json")
      .then((res) => res.json())
      .then((data) => {
        Object.entries(data).forEach(([key, value]) => {
          window.FWOOSH_SEARCH_INDEX[key] = value as SearchData[];
        });
      });
  }, []);

  return <></>;
}
