import "@fwoosh/app/setup";
import React from "react";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
  ScrollRestoration,
  useRouteError,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { HelmetProvider } from "react-helmet-async";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { Story } from "./components/Story";
import { Storybook } from "./components/Storybook";
import { Docs } from "./components/Docs";
import { DocsPage } from "./components/DocsPage";
import "./index.css";
import { AppWrapper, Spinner, ErrorBoundary } from "@fwoosh/components";
import {
  ColorMode,
  ColorModeContext,
  getInitialColorMode,
  globalCss,
} from "@fwoosh/styling";
import { tree } from "@fwoosh/app/stories";
import { StoryWithTools } from "./components/StoryWithTools";
import { getFirstStory, convertMetaTitleToUrlParam } from "@fwoosh/utils";
import { Head } from "./components/Head";
import { CommandPallette } from "./components/CommandPallette";
import { ProductionSearchIndex } from "./components/ProductionSearchIndex";
import { darkTheme } from "@fwoosh/styling";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

const FirstDocsPage = () => {
  const firstStory = getFirstStory(tree);

  if (!firstStory) {
    throw new Error('No stories found. Did you forget to add a "meta" export?');
  }

  return (
    <Navigate to={"/docs/" + convertMetaTitleToUrlParam(firstStory.grouping)} />
  );
};

const FirstStory = () => {
  const firstStory = getFirstStory(tree);

  if (!firstStory) {
    throw new Error('No stories found. Did you forget to add a "meta" export?');
  }

  if (firstStory.type === "mdx") {
    return <Navigate to={"/storybook/docs/" + firstStory.slug} />;
  }

  return <Navigate to={"/storybook/" + firstStory.slug} />;
};

function RouteError() {
  const error = useRouteError();
  return <ErrorBoundary error={error as Error} />;
}

const router = createBrowserRouter(
  [
    {
      path: "/",
      errorElement: <RouteError />,
      element: (
        <TooltipPrimitive.Provider>
          <HelmetProvider>
            <ErrorBoundary fullScreen>
              <ProductionSearchIndex />
              <AppWrapper>
                <Head />
                <Outlet />
                <ScrollRestoration />
                <React.Suspense>
                  <CommandPallette />
                </React.Suspense>
              </AppWrapper>
            </ErrorBoundary>
          </HelmetProvider>
        </TooltipPrimitive.Provider>
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
          element: (
            <ErrorBoundary>
              <Story />
            </ErrorBoundary>
          ),
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
              path: "docs",
              children: [
                {
                  path: ":docsPath",
                  element: <DocsPage />,
                },
              ],
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
  ],
  {
    basename: process.env.FWOOSH_BASE_NAME,
  }
);

const globalStyles = globalCss({
  mark: { background: "$primary6" },
  html: { background: "$gray1" },
  "html, body, #root": { height: "100%" },

  ".syntax-dark": {
    display: "none",
  },

  [`.${darkTheme} .syntax-light`]: {
    display: "none",
  },

  [`.${darkTheme} .syntax-dark`]: {
    display: "block",
  },
});

export const App = () => {
  const [colorMode, colorModeSet] = React.useState<ColorMode | undefined>();

  globalStyles();

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
