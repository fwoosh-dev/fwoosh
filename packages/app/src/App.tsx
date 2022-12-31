import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
} from "@fwoosh/components";
import { getFirstStory, useStoryTree } from "./hooks/useStoryTree";

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
          <AppWrapper>
            <BrowserRouter>
              <Routes>
                <Route path="/">
                  <Route index />
                  <Route path="story">
                    <Route path=":storyId" element={<Story />} />
                  </Route>
                  <Route path="storybook" element={<Storybook />}>
                    <Route path=":storyId" element={<Story />} />
                    <Route index element={<FirstStory />} />
                  </Route>
                  <Route path="docs" element={<Docs />}>
                    <Route path=":docsPath" element={<DocsPage />} />
                    <Route index element={<FirstDocsPage />} />
                  </Route>
                </Route>
              </Routes>
            </BrowserRouter>
          </AppWrapper>
        </ColorModeContext.Provider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};
