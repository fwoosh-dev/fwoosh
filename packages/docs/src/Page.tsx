import { Suspense } from "react";
import { components, Spinner, PageWrapper } from "@fwoosh/components";
import { useParams } from "react-router-dom";

import { modules } from "./utils/get-docs";

export const Page = () => {
  const params = useParams<{ page: string }>();
  let page = null;

  if (params.page) {
    const Page = modules[params.page];
    page = <Page components={components as any} />;
  }

  return (
    <Suspense fallback={<Spinner delay={1000} />}>
      <PageWrapper>{page}</PageWrapper>
    </Suspense>
  );
};
