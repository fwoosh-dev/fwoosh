import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Story } from "./components/Story";
import { Docs } from "./components/Docs";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index />
          <Route path="story">
            <Route path=":storyId" element={<Story />} />
          </Route>
          <Route path="docs" element={<Docs />}>
            <Route path=":storyId" element={<Story />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
