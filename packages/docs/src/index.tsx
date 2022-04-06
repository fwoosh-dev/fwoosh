import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "inter-ui/inter.css";
import "../../app/src/index.css";

import { App } from "./App";
import { Page } from "./Page";
import { Home } from "./Home";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="docs" element={<App />}>
          <Route path=":page" element={<Page />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
