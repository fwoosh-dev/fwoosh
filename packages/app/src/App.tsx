import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Story } from "./components/Story";
import { Storybook } from "./components/Storybook";
import { Docs } from "./components/Docs";
import { DocsPage } from "./components/DocsPage";

export const App = () => {
  return (
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
  );
};
