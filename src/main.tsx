import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import ToolList from "./pages/Tools/List/index.tsx";
import CreateTool from "./pages/Tools/Create/index.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/">
        <Route index element={<ToolList />} />
        <Route path="create" element={<CreateTool />} />
      </Route>
    </Routes>
  </BrowserRouter>,
);
