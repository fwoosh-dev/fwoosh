import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

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
                  </Route>
                  <Route path="docs" element={<Docs />}>
                    <Route path=":docsPath" element={<DocsPage />} />
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
