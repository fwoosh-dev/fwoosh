import React from "react";
import { components, PageWrapper } from "@fwoosh/components";
import { stories } from "@fwoosh/app/stories";
import { MDXProvider } from "@mdx-js/react";

type MDXComponents = React.ComponentProps<typeof MDXProvider>["components"];

export const MDXPage = ({ id }: { id: string }) => {
  const { component: MDXPage } = stories[id];

  return (
    <MDXProvider components={components as MDXComponents}>
      <PageWrapper css={{ pb: 20 }}>
        <MDXPage />
      </PageWrapper>
    </MDXProvider>
  );
};
