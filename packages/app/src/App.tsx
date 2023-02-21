// import "@fwoosh/app/setup";
import * as React from "react";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  ScrollRestoration,
  useRouteError,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { HeadProvider } from "react-head";

import "./index.css";
import {
  AppWrapper,
  Spinner,
  ErrorBoundary,
  TooltipProvider,
} from "@fwoosh/components";
import {
  ColorMode,
  ColorModeContext,
  getInitialColorMode,
  globalCss,
  darkTheme,
} from "@fwoosh/styling";
import { tree } from "@fwoosh/app/stories";
import { getFirstStory, convertMetaTitleToUrlParam } from "@fwoosh/utils";
import { Head } from "./components/Head";
import { CommandPallette } from "./components/CommandPallette";
import { ProductionSearchIndex } from "./components/ProductionSearchIndex";

const WorkBenchCanvas = React.lazy(() =>
  import("./components/canvas/WorkbenchCanvas").then((m) => ({
    default: m.WorkbenchCanvas,
  }))
);

const DocsCanvas = React.lazy(() =>
  import("./components/canvas/DocsCanvas").then((m) => ({
    default: m.DocsCanvas,
  }))
);

const DocsPage = React.lazy(() =>
  import("./components/DocsPage").then((m) => ({
    default: m.DocsPage,
  }))
);

const Docs = React.lazy(() =>
  import("./components/Docs").then((m) => ({
    default: m.Docs,
  }))
);

const Workbench = React.lazy(() =>
  import("./components/Workbench").then((m) => ({
    default: m.Workbench,
  }))
);

const Story = React.lazy(() =>
  import("./components/Story").then((m) => ({
    default: m.Story,
  }))
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

const FirstDocsPage = () => {
  const firstStory = getFirstStory(tree, { mdx: true });

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
    return <Navigate to={"/workbench/docs/" + firstStory.slug} />;
  }

  return <Navigate to={"/workbench/" + firstStory.slug} />;
};

function RouteError() {
  const error = useRouteError();
  return <ErrorBoundary error={error as Error} />;
}

export const router = createBrowserRouter(
  [
    {
      path: "/",
      errorElement: <RouteError />,
      element: (
        <>
          <Head />
          <Outlet />
          <ScrollRestoration />
          <React.Suspense>
            <CommandPallette />
          </React.Suspense>
        </>
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
            <React.Suspense fallback={<Spinner delay={2000} />}>
              <ErrorBoundary>
                <Story />
              </ErrorBoundary>
            </React.Suspense>
          ),
        },
        {
          path: "workbench",
          element: (
            <React.Suspense fallback={<Spinner delay={2000} />}>
              <Workbench />
            </React.Suspense>
          ),
          children: [
            {
              index: true,
              element: <FirstStory />,
            },
            {
              path: ":storyId",
              element: <Story />,
            },
          ],
        },
        {
          path: "docs",
          element: (
            <React.Suspense fallback={<Spinner delay={2000} />}>
              <Docs />
            </React.Suspense>
          ),
          children: [
            {
              index: true,
              element: <FirstDocsPage />,
            },
            {
              path: ":docsPath",
              element: <DocsPage />,
            },
          ],
        },
        {
          path: "canvas",
          children: [
            {
              path: "workbench/:storyId?",
              element: (
                <React.Suspense fallback={<Spinner delay={2000} />}>
                  <WorkBenchCanvas />
                </React.Suspense>
              ),
            },
            {
              path: "docs/:docsPath?",
              element: (
                <React.Suspense fallback={<Spinner delay={2000} />}>
                  <DocsCanvas />
                </React.Suspense>
              ),
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

  ".ch-codeblock.ch-codeblock, .ch-codegroup.ch-codegroup, .ch-preview.ch-preview":
    { margin: "$9 0" },
  ".ch-codeblock > *, .ch-codegroup > *, .ch-preview > *": {
    borderRadius: "6px",
  },
  ".ch-codeblock .ch-code-button": {
    display: "none",
  },
  ".ch-codeblock:hover .ch-code-button": {
    display: "block",
  },
});

export const App = ({ children }: { children: React.ReactNode }) => {
  const [colorMode, colorModeSet] = React.useState<ColorMode | undefined>();

  globalStyles();

  React.useEffect(() => {
    colorModeSet(getInitialColorMode());

    window.addEventListener("fwoosh-color-mode-change", (e) =>
      colorModeSet((e as CustomEvent).detail.colorMode)
    );
  }, []);

  return (
    <TooltipProvider>
      <HeadProvider>
        <QueryClientProvider client={queryClient}>
          <ColorModeContext.Provider value={colorMode}>
            <ErrorBoundary fullScreen>
              <AppWrapper>
                <ProductionSearchIndex />
                {children}
              </AppWrapper>
            </ErrorBoundary>
          </ColorModeContext.Provider>
        </QueryClientProvider>
      </HeadProvider>
    </TooltipProvider>
  );
};
