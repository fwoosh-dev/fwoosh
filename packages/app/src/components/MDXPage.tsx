import React from "react";
import { components, PageWrapper, styled } from "@fwoosh/components";
import { stories } from "@fwoosh/app/stories";
import { MDXProvider } from "@mdx-js/react";

const MDXPageWrapper = styled("div", {
  mt: 12,
  mb: 20,
});

export const MDXPage = ({ id }: { id: string }) => {
  const { component: MDXPage } = stories[id];

  return (
    <MDXProvider
      components={
        components as React.ComponentProps<typeof MDXProvider>["components"]
      }
    >
      <MDXPageWrapper>
        <PageWrapper>
          <MDXPage />
        </PageWrapper>
      </MDXPageWrapper>
    </MDXProvider>
  );
};
