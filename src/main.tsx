import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import App from "./App.tsx";
import ToolList from "./pages/Tools/List/index.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="tools">
        <Route index element={<ToolList />} />
        <Route path="create" element={<ToolList />} />
      </Route>
    </Routes>
  </BrowserRouter>,
);
