import "@fwoosh/app/setup";
import React from "react";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import { Story } from "./components/Story";
import { Storybook } from "./components/Storybook";
import { Docs } from "./components/Docs";
import { DocsPage } from "./components/DocsPage";
import "./index.css";
import {
  AppWrapper,
  ColorMode,
  ColorModeContext,
  getInitialColorMode,
  Spinner,
} from "@fwoosh/components";
import { getFirstStory, useStoryTree } from "./hooks/useStoryTree";
import { StoryWithTools } from "./components/StoryWithTools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

const FirstDocsPage = () => {
  const tree = useStoryTree();

  return (
    <Navigate
      to={"/docs/" + getFirstStory(tree).grouping.replace(/\//g, "-")}
    />
  );
};

const FirstStory = () => {
  const tree = useStoryTree();

  return <Navigate to={"/storybook/" + getFirstStory(tree).slug} />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AppWrapper>
        <Outlet />
        <ScrollRestoration />
      </AppWrapper>
    ),
    children: [
      {
        index: true,
        element: (
          <React.Suspense fallback={<Spinner delay={2000} />}>
            <FirstDocsPage />
          </React.Suspense>
        ),
      },
      {
        path: "story/:storyId",
        element: <Story />,
      },
      {
        path: "storybook",
        element: <Storybook />,
        children: [
          {
            index: true,
            element: (
              <React.Suspense fallback={<Spinner delay={2000} />}>
                <FirstStory />
              </React.Suspense>
            ),
          },
          {
            path: ":storyId",
            element: <StoryWithTools />,
          },
          {
            path: "docs/:docsPath",
            element: <DocsPage />,
          },
        ],
      },
      {
        path: "docs",
        element: <Docs />,
        children: [
          {
            index: true,
            element: (
              <React.Suspense fallback={<Spinner delay={2000} />}>
                <FirstDocsPage />
              </React.Suspense>
            ),
          },
          {
            path: ":docsPath",
            element: <DocsPage />,
          },
        ],
      },
    ],
  },
]);

export const App = () => {
  const [colorMode, colorModeSet] = React.useState<ColorMode | undefined>();

  React.useEffect(() => {
    colorModeSet(getInitialColorMode());

    window.addEventListener("fwoosh-color-mode-change", (e) =>
      colorModeSet((e as CustomEvent).detail.colorMode)
    );
  }, []);

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ColorModeContext.Provider value={colorMode}>
          <AppWrapper data-color-mode={colorMode}>
            <RouterProvider router={router} />
          </AppWrapper>
        </ColorModeContext.Provider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};
