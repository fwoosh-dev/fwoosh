import * as React from "react";
import { SearchData } from "@fwoosh/utils";
import useLayoutEffect from "@react-hook/passive-layout-effect";

export function ProductionSearchIndex() {
  useLayoutEffect(() => {
    if (
      process.env.NODE_ENV !== "production" ||
      typeof window === "undefined"
    ) {
      return;
    }

    if (!window.FWOOSH_SEARCH_INDEX) {
      window.FWOOSH_SEARCH_INDEX = {};
    }

    fetch(
      process.env.FWOOSH_BASE_NAME
        ? `${process.env.FWOOSH_BASE_NAME}/search.json`
        : "search.json"
    )
      .then((res) => res.json())
      .then((data) => {
        Object.entries(data).forEach(([key, value]) => {
          window.FWOOSH_SEARCH_INDEX[key] = value as SearchData[];
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return <></>;
}
